import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const appRoot = path.resolve(projectRoot, "../../App");
const brickTexturesAccountPath = path.join(appRoot, "public", "data", "accounts", "bricktextures.json");
const manufacturersRoot = path.join(appRoot, "public", "data", "manufacturers");
const outputPath = path.join(projectRoot, "src", "generated", "brickTexturesStats.ts");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function normaliseSku(value) {
  return String(value ?? "").trim().toUpperCase();
}

function buildRenameMap(renameSkus) {
  const map = new Map();

  if (!Array.isArray(renameSkus)) {
    return map;
  }

  for (const entry of renameSkus) {
    if (!Array.isArray(entry) || entry.length < 2) {
      continue;
    }

    const [fromSku, toSku] = entry;
    const from = normaliseSku(fromSku);
    const to = normaliseSku(toSku);

    if (from && to) {
      map.set(from, to);
    }
  }

  return map;
}

function getIncludedSizeIndexes(finish, excludeSkus, renameMap) {
  const sizes = Array.isArray(finish?.sizes) ? finish.sizes : [];
  const sizeGroups = Array.isArray(finish?.sizeGroups) ? finish.sizeGroups : [];

  if (sizeGroups.length === 0) {
    return new Set(sizes.map((_, index) => index));
  }

  const includedIndexes = new Set();

  for (const sizeGroup of sizeGroups) {
    const renamedSku = renameMap.get(normaliseSku(sizeGroup?.productSku)) ?? normaliseSku(sizeGroup?.productSku);
    if (!renamedSku || excludeSkus.has(renamedSku)) {
      continue;
    }

    const members = Array.isArray(sizeGroup?.members) ? sizeGroup.members : [];
    for (const member of members) {
      if (Number.isInteger(member) && member >= 0 && member < sizes.length) {
        includedIndexes.add(member);
      }
    }
  }

  return includedIndexes;
}

function getIncludedSkus(finish, excludeSkus, renameMap) {
  const sizeGroups = Array.isArray(finish?.sizeGroups) ? finish.sizeGroups : [];
  const includedSkus = new Set();

  for (const sizeGroup of sizeGroups) {
    const renamedSku = renameMap.get(normaliseSku(sizeGroup?.productSku)) ?? normaliseSku(sizeGroup?.productSku);
    if (!renamedSku || excludeSkus.has(renamedSku)) {
      continue;
    }
    includedSkus.add(renamedSku);
  }

  return includedSkus;
}

function countImagesForSize(size) {
  if (!size) {
    return 0;
  }

  const baseCount = Number.isFinite(size.noOfImages) ? Number(size.noOfImages) + 1 : 0;
  const faceCount = size.face
    ? Number.isFinite(size.face.noOfImages)
      ? Number(size.face.noOfImages) + 1
      : baseCount
    : 0;

  return baseCount + faceCount;
}

function buildBrickTexturesStats() {
  const brickTexturesAccount = readJson(brickTexturesAccountPath);
  const sources = brickTexturesAccount.categories?.flatMap(category => category.sources ?? []) ?? [];

  const manufacturers = new Set();
  let products = 0;
  const skuOptions = new Set();
  let capturedImages = 0;

  for (const source of sources) {
    const manufacturer = source?.manufacturer;
    const fileName = source?.fileName;

    if (!manufacturer || !fileName) {
      continue;
    }

    const manufacturerPath = path.join(manufacturersRoot, manufacturer, `${fileName}.json`);
    if (!fs.existsSync(manufacturerPath)) {
      continue;
    }

    manufacturers.add(manufacturer);

    const manufacturerData = readJson(manufacturerPath);
    const excludeSkus = new Set((source.excludeSkus ?? []).map(normaliseSku));
    const renameMap = buildRenameMap(source.renameSkus);

    for (const product of manufacturerData.products ?? []) {
      let productHasVisibleColour = false;

      for (const colour of product.colours ?? []) {
        for (const finish of colour.finishes ?? []) {
          const includedSizeIndexes = getIncludedSizeIndexes(finish, excludeSkus, renameMap);
          if (includedSizeIndexes.size === 0) {
            continue;
          }

          for (const sku of getIncludedSkus(finish, excludeSkus, renameMap)) {
            skuOptions.add(sku);
          }

          productHasVisibleColour = true;

          for (const sizeIndex of includedSizeIndexes) {
            capturedImages += countImagesForSize(finish.sizes?.[sizeIndex]);
          }
        }
      }

      if (productHasVisibleColour) {
        products += 1;
      }
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    manufacturers: manufacturers.size,
    products,
    skuOptions: skuOptions.size,
    capturedImages,
  };
}

function writeStatsModule(stats) {
  const moduleContents = `export const brickTexturesStats = ${JSON.stringify(stats, null, 2)} as const;\n`;
  ensureDir(path.dirname(outputPath));
  fs.writeFileSync(outputPath, moduleContents, "utf8");
}

const stats = buildBrickTexturesStats();
writeStatsModule(stats);
console.log(`Generated Brick Textures stats: ${stats.manufacturers} manufacturers, ${stats.skuOptions} SKUs, ${stats.capturedImages} images.`);
