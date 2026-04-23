import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const thisDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(thisDir, "..");
const sourcePath = resolve(projectRoot, "Web.config");
const targetPath = resolve(projectRoot, "dist", "Web.config");

await mkdir(dirname(targetPath), { recursive: true });
await copyFile(sourcePath, targetPath);

console.log("[build] Copied Web.config to dist/Web.config");
