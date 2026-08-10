import {spawn} from "node:child_process";
import path from "node:path";
import {fileURLToPath} from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(scriptDirectory, "..");
const appRoot = path.resolve(siteRoot, "..", "..", "App");
const siteViteCli = path.join(siteRoot, "node_modules", "vite", "bin", "vite.js");
const appViteCli = path.join(appRoot, "node_modules", "vite", "bin", "vite.js");
const processes = [];
let shuttingDown = false;

const startVite = (name, cwd, viteCli, args) => {
  const child = spawn(process.execPath, [viteCli, ...args], {
    cwd,
    env: process.env,
    stdio: "inherit"
  });

  child.on("exit", code => {
    if (!shuttingDown) {
      console.error(`${name} development server stopped${code ? ` with exit code ${code}` : ""}.`);
      shutdown(code ?? 1);
    }
  });

  processes.push(child);
};

const shutdown = exitCode => {
  if (shuttingDown) return;
  shuttingDown = true;

  processes.forEach(child => {
    if (!child.killed) child.kill();
  });

  setTimeout(() => process.exit(exitCode), 100);
};

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

startVite("Bricktextures app", appRoot, appViteCli, [
  "--mode",
  "bricktextures",
  "--host",
  "127.0.0.1",
  "--port",
  "3000",
  "--strictPort"
]);

startVite("Bricktextures website", siteRoot, siteViteCli, [
  "--host",
  "127.0.0.1",
  "--port",
  "5173",
  "--strictPort"
]);
