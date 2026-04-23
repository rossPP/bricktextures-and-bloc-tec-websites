/**
 * Bloc-Tec iframe integration helper.
 *
 * Handles:
 * - iframe bootstrapping from existing iframe src
 * - share URL resolution via postMessage
 * - analytics event forwarding via postMessage
 */
(function () {
  "use strict";

  const CFG = {
    ALLOWED_IFRAME_ORIGINS: ["https://app.bloc-tec.com"],
    STORE_BT_IN_HASH: true,
    ANALYTICS_ENABLED: false,
    IFRAME_SELECTOR: "iframe[data-bt-viewer]"
  };

  const ALLOWED = new Set(CFG.ALLOWED_IFRAME_ORIGINS.map(String));

  function safeDecode(value) {
    if (typeof value !== "string") return null;
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

  function normalizeConfigString(config) {
    if (typeof config !== "string") return "";
    return config.startsWith("?") ? config.slice(1) : config;
  }

  function encodePathSegments(value) {
    return String(value || "")
      .split("/")
      .filter(Boolean)
      .map(seg => encodeURIComponent(seg))
      .join("/");
  }

  function readIframeState(iframeEl) {
    if (!iframeEl) {
      console.error("[bt-iframe-helper] No iframe matched selector:", CFG.IFRAME_SELECTOR);
      return null;
    }
    const rawSrc =
      (typeof iframeEl.getAttribute === "function" && iframeEl.getAttribute("src")) ||
      iframeEl.src ||
      "";
    if (!rawSrc) {
      console.error("[bt-iframe-helper] Iframe has no src. Set src to /account/<account> URL.");
      return null;
    }

    let url;
    try {
      url = new URL(rawSrc, window.location.href);
    } catch {
      console.error("[bt-iframe-helper] Iframe src is not a valid URL:", rawSrc);
      return null;
    }

    const pathMatch = url.pathname.match(/^\/account\/([^/]+)(?:\/(.+))?$/i);
    if (!pathMatch) {
      console.error(
        "[bt-iframe-helper] Iframe src must use /account/<account> or /account/<account>/<category> path.",
      );
      return null;
    }

    const account = safeDecode(pathMatch[1]) || "";
    const category = pathMatch[2]
      ? pathMatch[2]
          .split("/")
          .filter(Boolean)
          .map(seg => safeDecode(seg) || seg)
          .join("/")
      : "";
    const config = (url.search || "").replace(/^\?/, "");

    return {
      appBase: url.origin,
      account,
      category,
      config
    };
  }

  function readBtFromHostUrl() {
    const hash = window.location.hash || "";
    if (hash.startsWith("#")) {
      const params = new URLSearchParams(hash.slice(1));
      const bt = params.get("bt");
      if (bt) return safeDecode(bt);
    }

    const searchParams = new URLSearchParams(window.location.search || "");
    const bt = searchParams.get("bt");
    if (bt) return safeDecode(bt);

    return null;
  }

  function hasSku(configStr) {
    try {
      return new URLSearchParams(normalizeConfigString(configStr)).getAll("c").length > 0;
    } catch {
      return false;
    }
  }

  function buildIframeSrc(appBase, account, category, config) {
    const accountSeg = encodeURIComponent(String(account || "").trim());
    const categorySegs = encodePathSegments(String(category || "").trim());
    const configStr = normalizeConfigString(config);
    const base = String(appBase || "").replace(/\/+$/, "");

    if (!base || !accountSeg) {
      console.error("[bt-iframe-helper] Missing app base or account while rebuilding iframe src.");
      return null;
    }

    const path =
      hasSku(configStr) || !categorySegs
        ? `/account/${accountSeg}`
        : `/account/${accountSeg}/${categorySegs}`;

    const query = configStr ? `?${configStr}` : "";
    return `${base}${path}${query}`;
  }

  function buildHostShareUrl(config) {
    const normalized = normalizeConfigString(config);
    const url = new URL(window.location.href);
    const hashValue = window.location.hash || "";
    const hasExistingHash = hashValue && hashValue !== "#";
    const hashParams = hasExistingHash ? new URLSearchParams(hashValue.slice(1)) : null;
    const hasNonBtHashState = hasExistingHash && (!hashParams || !hashParams.has("bt"));
    const useHash = CFG.STORE_BT_IN_HASH && !hasNonBtHashState;

    if (useHash) {
      url.hash = `bt=${encodeURIComponent(normalized)}`;
      url.searchParams.delete("bt");
    } else {
      url.searchParams.set("bt", normalized);
    }

    return url.toString();
  }

  function shouldForwardAnalytics(msg) {
    if (typeof CFG.ANALYTICS_ENABLED === "function") {
      try {
        return !!CFG.ANALYTICS_ENABLED(msg);
      } catch (error) {
        console.warn("[bt-iframe-helper] Analytics gate failed:", error);
        return false;
      }
    }
    return !!CFG.ANALYTICS_ENABLED;
  }

  function forwardAnalytics(msg) {
    if (!shouldForwardAnalytics(msg)) {
      return;
    }

    const detail = {
      event: msg.event,
      payload: msg.payload || {},
      source: "bloc-tec-iframe"
    };

    try {
      window.dispatchEvent(new CustomEvent("bt:analytics", {detail}));
    } catch (error) {
      console.warn("[bt-iframe-helper] Custom analytics event dispatch failed:", error);
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", msg.event, msg.payload || {});
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: `bt_${msg.event}`,
        blocTecEvent: msg.event,
        blocTecPayload: msg.payload || {}
      });
    }

    if (typeof window.BT_ANALYTICS_HANDLER === "function") {
      try {
        window.BT_ANALYTICS_HANDLER(detail);
      } catch (error) {
        console.warn("[bt-iframe-helper] Custom analytics handler failed:", error);
      }
    }
  }

  function reloadIframeFromHostUrl() {
    const iframe = document.querySelector(CFG.IFRAME_SELECTOR);
    const iframeState = readIframeState(iframe);
    if (!iframeState) return;

    const bt = readBtFromHostUrl() || (iframeState && iframeState.config) || "";
    const src = buildIframeSrc(iframeState.appBase, iframeState.account, iframeState.category, bt);
    if (!src) return;
    iframe.src = src;
    console.info("[bt-iframe-helper] iframe src set:", src);
  }

  function wireHostMessages() {
    window.addEventListener("message", event => {
      if (!event.origin || !ALLOWED.has(event.origin)) return;

      const msg = event.data;
      if (!msg || typeof msg.type !== "string") return;

      if (msg.type === "bt:analytics_event") {
        if (typeof msg.event !== "string" || typeof msg.payload !== "object") return;
        forwardAnalytics(msg);
        return;
      }

      if (msg.type !== "bt:share_request") return;
      if (typeof msg.config !== "string") return;

      const hostUrl = buildHostShareUrl(msg.config);
      const response = {type: "bt:share_response", ok: true, url: hostUrl};

      if (event.source && typeof event.source.postMessage === "function") {
        event.source.postMessage(response, event.origin);
      }
    });
  }

  try {
    wireHostMessages();
    reloadIframeFromHostUrl();
  } catch (error) {
    console.error("[bt-iframe-helper] init failed", error);
  }
})();
