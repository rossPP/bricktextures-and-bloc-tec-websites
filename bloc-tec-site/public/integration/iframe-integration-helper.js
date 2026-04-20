/**
 * Bloc-Tec iframe integration helper.
 *
 * Handles:
 * - iframe bootstrapping from a host `bt` config
 * - share URL resolution via postMessage
 * - analytics event forwarding via postMessage
 *
 * Optional overrides:
 * - define `window.BT_EMBED_CONFIG = { ... }` before loading this script
 * - define `window.BT_ANALYTICS_HANDLER = ({ event, payload }) => { ... }`
 */
(function () {
  "use strict";

  const DEFAULTS = {
    APP_BASE_DEFAULT: "https://app.bloc-tec.com",
    DEFAULT_ACCOUNT: "demo",
    DEFAULT_CATEGORY: "",
    ALLOWED_IFRAME_ORIGINS: ["https://app.bloc-tec.com", "https://app.bloc-tec.xyz"],
    STORE_BT_IN_HASH: true,
    ANALYTICS_ENABLED: true,
    IFRAME_SELECTOR: "iframe[data-bt-viewer]",
    INPUT_APP_BASE_ID: "appBase",
    INPUT_ACCOUNT_ID: "account",
    INPUT_CATEGORY_ID: "category",
    BTN_RELOAD_ID: "reload",
    LOG_ID: "log",
    BTN_CLEAR_LOG_ID: "clearLog"
  };

  const userConfig =
    typeof window !== "undefined" &&
    window.BT_EMBED_CONFIG &&
    typeof window.BT_EMBED_CONFIG === "object"
      ? window.BT_EMBED_CONFIG
      : {};

  const CFG = {
    ...DEFAULTS,
    ...userConfig,
    ALLOWED_IFRAME_ORIGINS: Array.isArray(userConfig.ALLOWED_IFRAME_ORIGINS)
      ? userConfig.ALLOWED_IFRAME_ORIGINS
      : DEFAULTS.ALLOWED_IFRAME_ORIGINS
  };

  const ALLOWED = new Set(CFG.ALLOWED_IFRAME_ORIGINS.map(String));

  function $(id) {
    return document.getElementById(id);
  }

  function log(...args) {
    const el = CFG.LOG_ID ? $(CFG.LOG_ID) : null;
    if (!el) return;
    const line = args
      .map(a => {
        if (typeof a === "string") return a;
        try {
          return JSON.stringify(a);
        } catch {
          return String(a);
        }
      })
      .join(" ");
    el.textContent = (el.textContent ? el.textContent + "\n" : "") + line;
    el.scrollTop = el.scrollHeight;
  }

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

  function normalizeAppBase(appBase) {
    const base = String(appBase || "")
      .trim()
      .replace(/\/+$/, "");
    if (!base) return "";
    if (window.location.protocol === "https:" && base.startsWith("http://")) {
      return "https://" + base.slice("http://".length);
    }
    return base;
  }

  function encodePathSegments(value) {
    return String(value || "")
      .split("/")
      .filter(Boolean)
      .map(seg => encodeURIComponent(seg))
      .join("/");
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
    const base = normalizeAppBase(appBase);
    const accountSeg = encodeURIComponent(String(account || "").trim());
    const categorySegs = encodePathSegments(String(category || "").trim());
    const configStr = normalizeConfigString(config);

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

    if (CFG.STORE_BT_IN_HASH) {
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
        log("[host] analytics gate failed", error);
        return false;
      }
    }
    return !!CFG.ANALYTICS_ENABLED;
  }

  function forwardAnalytics(msg) {
    const detail = {
      event: msg.event,
      payload: msg.payload || {},
      source: "bloc-tec-iframe"
    };

    try {
      window.dispatchEvent(new CustomEvent("bt:analytics", {detail}));
    } catch (error) {
      log("[host] custom analytics dispatch failed", error);
    }

    if (!shouldForwardAnalytics(msg)) {
      log("[host] analytics suppressed", detail);
      return;
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
        log("[host] custom analytics handler failed", error);
      }
    }

    log("[host] analytics_event", detail);
  }

  function getInputs() {
    const appBaseEl = CFG.INPUT_APP_BASE_ID ? $(CFG.INPUT_APP_BASE_ID) : null;
    const accountEl = CFG.INPUT_ACCOUNT_ID ? $(CFG.INPUT_ACCOUNT_ID) : null;
    const categoryEl = CFG.INPUT_CATEGORY_ID ? $(CFG.INPUT_CATEGORY_ID) : null;
    return {appBaseEl, accountEl, categoryEl};
  }

  function setDefaults() {
    const {appBaseEl, accountEl, categoryEl} = getInputs();
    if (appBaseEl && !appBaseEl.value) appBaseEl.value = CFG.APP_BASE_DEFAULT;
    if (accountEl && !accountEl.value) accountEl.value = CFG.DEFAULT_ACCOUNT;
    if (categoryEl && !categoryEl.value) categoryEl.value = CFG.DEFAULT_CATEGORY;
  }

  function reloadIframeFromHostUrl() {
    const iframe = document.querySelector(CFG.IFRAME_SELECTOR);
    if (!iframe) return;

    const {appBaseEl, accountEl, categoryEl} = getInputs();
    const bt = readBtFromHostUrl() || "";
    const appBase = normalizeAppBase((appBaseEl && appBaseEl.value) || CFG.APP_BASE_DEFAULT);
    const account = ((accountEl && accountEl.value) || CFG.DEFAULT_ACCOUNT).trim();
    const category = ((categoryEl && categoryEl.value) || CFG.DEFAULT_CATEGORY).trim();

    const src = buildIframeSrc(appBase, account, category, bt);
    iframe.src = src;
    log("[host] iframe src =", src);
  }

  function wireUi() {
    const reloadBtn = CFG.BTN_RELOAD_ID ? $(CFG.BTN_RELOAD_ID) : null;
    if (reloadBtn) {
      reloadBtn.addEventListener("click", () => reloadIframeFromHostUrl());
    }

    const clearBtn = CFG.BTN_CLEAR_LOG_ID ? $(CFG.BTN_CLEAR_LOG_ID) : null;
    if (clearBtn && CFG.LOG_ID) {
      clearBtn.addEventListener("click", () => {
        const el = $(CFG.LOG_ID);
        if (el) el.textContent = "";
      });
    }
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

      log("[host] share_request from", event.origin, msg);

      const hostUrl = buildHostShareUrl(msg.config);
      const response = {type: "bt:share_response", ok: true, url: hostUrl};

      if (event.source && typeof event.source.postMessage === "function") {
        event.source.postMessage(response, event.origin);
        log("[host] share_response ->", response);
      }
    });
  }

  try {
    setDefaults();
    wireUi();
    wireHostMessages();
    reloadIframeFromHostUrl();
  } catch (error) {
    console.error("[bt-iframe-helper] init failed", error);
  }
})();
