import { readFileSync, writeFileSync } from "node:fs";

const source = readFileSync(new URL("../product-data.js", import.meta.url), "utf8");
const json = source.replace(/^window\.PRODUCT_CATALOG\s*=\s*/, "").replace(/;\s*$/, "");
const catalog = JSON.parse(json);
writeFileSync(new URL("../data/products.json", import.meta.url), JSON.stringify(catalog));
console.log(`Wrote ${catalog.groups.reduce((sum, group) => sum + group.products.length, 0)} products`);
