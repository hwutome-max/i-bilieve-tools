import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const crawlRoot = path.join(root, "data", "ibelievetools_product_crawl");
const cleanIndex = JSON.parse(
  await readFile(path.join(crawlRoot, "products_index_clean.json"), "utf8")
);
const outputRoot = path.join(root, "assets", "products");

const groups = [
  {
    key: "tileStoneBlades",
    categories: ["Tile Blade", "Stone Blade", "General Purpose Blade", "Tuck Point Blade"]
  },
  {
    key: "constructionBlades",
    categories: ["Concrete Blade", "Asphalt Blade"]
  },
  {
    key: "grindingWheels",
    categories: ["Diamond Cup Grinding Wheel"]
  },
  {
    key: "coreDrillBits",
    categories: ["Diamond Core Drill Bits", "Diamond Core Drill Bits Set"]
  },
  {
    key: "vacuumBrazed",
    categories: ["Vacuum Brazed Saw Blade", "Vacuum Brazed Products", "Vacuum Core Drill Bits"]
  },
  {
    key: "laserWelded",
    categories: ["Laser Welded Saw Blade"]
  }
];

const targetCategories = new Set(groups.flatMap((group) => group.categories));
const invalidSourceTables = new Set(["1167508825337700352"]);

function cleanText(value = "") {
  return value
    .replace(/\bTrubo\b/gi, "Turbo")
    .replace(/\bNife\b/gi, "Knife")
    .replace(/\bsuperme diamod\b/gi, "supreme diamond")
    .replace(/\bltem\b/g, "Item")
    .replace(/\s+/g, " ")
    .trim();
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function groupFor(record, product) {
  const title = product.title.toLowerCase();
  if (title.includes("laser welded") || title.startsWith("laser ")) return "laserWelded";
  if (title.includes("vacuum")) return "vacuumBrazed";
  return groups.find((group) => group.categories.some((category) => record.categories.includes(category)))?.key;
}

function compactTable(tables = []) {
  const rows = tables[0]?.rows || [];
  return rows
    .map((row) => row.map((cell) => cleanText(String(cell))))
    .filter((row) => row.some(Boolean))
    .slice(0, 8);
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

const products = [];
for (const record of cleanIndex) {
  if (!record.categories.some((category) => targetCategories.has(category))) continue;

  const productPath = path.join(crawlRoot, record.folder, "product.json");
  const product = JSON.parse(await readFile(productPath, "utf8"));
  const group = groupFor(record, product);
  if (!group) continue;

  const primaryImage = product.images.find((image) => image.source === "list") || product.images[0];
  if (!primaryImage) continue;

  const id = product.detail_url.split("/").pop().replace(".html", "");
  const extension = path.extname(primaryImage.file).toLowerCase() || ".png";
  const groupDir = path.join(outputRoot, group);
  const imageName = `${slug(product.title) || "product"}-${id}${extension}`;
  const imagePath = path.join(groupDir, imageName);
  await mkdir(groupDir, { recursive: true });
  await cp(path.join(crawlRoot, record.folder, primaryImage.file), imagePath);

  products.push({
    id,
    group,
    title: cleanText(product.title),
    sourceCategories: record.categories.filter((category) => category !== "Diamond Products"),
    summary: cleanText(product.summary || product.sections?.Features || ""),
    applications: cleanText(product.sections?.Applications || product.sections?.Application || ""),
    machinery: cleanText(product.sections?.Machinery || ""),
    table: invalidSourceTables.has(id) ? [] : compactTable(product.tables),
    image: path.relative(root, imagePath).split(path.sep).join("/"),
    sourceUrl: product.detail_url
  });
}

const preferredOrder = {
  vacuumBrazed: ["435", "436", "437", "432", "465", "464", "466"]
};
products.sort((a, b) => {
  const groupOrder = a.group.localeCompare(b.group);
  if (groupOrder) return groupOrder;
  const ids = preferredOrder[a.group];
  if (ids) return ids.indexOf(a.id) - ids.indexOf(b.id);
  return a.title.localeCompare(b.title) || a.id.localeCompare(b.id);
});
const catalog = {
  source: "http://www.ibelievetools.com/product_list_1/64.html",
  generatedAt: new Date().toISOString(),
  groups: groups.map((group) => ({
    key: group.key,
    count: products.filter((product) => product.group === group.key).length,
    products: products.filter((product) => product.group === group.key)
  }))
};

await writeFile(path.join(root, "data", "site_products.json"), `${JSON.stringify(catalog, null, 2)}\n`);
await writeFile(
  path.join(root, "product-data.js"),
  `window.PRODUCT_CATALOG = ${JSON.stringify(catalog, null, 2)};\n`
);

console.log(JSON.stringify({ total: products.length, groups: Object.fromEntries(catalog.groups.map((group) => [group.key, group.count])) }, null, 2));
