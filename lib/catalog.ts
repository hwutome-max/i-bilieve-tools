import catalog from "@/data/products.json";

export const materials = ["tile", "stone", "general", "concrete", "asphalt", "tuck"] as const;
export const processes = ["sintered", "laser", "brazed"] as const;
export const kinds = ["blade", "cup", "core"] as const;

export type Material = (typeof materials)[number];
export type Process = (typeof processes)[number];
export type Kind = (typeof kinds)[number];

export type CatalogProduct = {
  id: string;
  group: string;
  title: string;
  sourceCategories: string[];
  summary: string;
  applications: string;
  machinery: string;
  table: string[][];
  image: string;
  sourceUrl: string;
  kind: Kind;
  material: Material | null;
  process: Process;
  diameters: number[];
  model?: string;
  imageSrc: string;
};

type RawProduct = Omit<CatalogProduct, "kind" | "material" | "process" | "diameters" | "model" | "imageSrc">;

function classify(product: RawProduct): { kind: Kind; material: Material | null; process: Process } {
  const title = product.title.toLowerCase();
  const category = product.sourceCategories.join(" ").toLowerCase();

  let kind: Kind = "blade";
  if (product.group === "grindingWheels" || title.includes("grinding wheel") || title.includes("cup wheel")) {
    kind = "cup";
  } else if (product.group === "coreDrillBits" || title.includes("core") || title.includes("hole saw")) {
    kind = "core";
  }

  let process: Process = "sintered";
  if (product.group === "laserWelded" || title.includes("laser") || category.includes("laser")) {
    process = "laser";
  } else if (product.group === "vacuumBrazed" || title.includes("vacuum") || title.includes("brazed")) {
    process = "brazed";
  }

  let material: Material | null = null;
  if (kind === "blade") {
    if (category.includes("tuck") || title.includes("concave")) material = "tuck";
    else if (category.includes("asphalt") || title.includes("asphalt")) material = "asphalt";
    else if (title.includes("marble") || title.includes("granite") || category.includes("stone blade")) material = "stone";
    else if (category.includes("tile") || title.includes("tile")) material = "tile";
    else if (category.includes("concrete") || title.includes("concrete") || title.includes("wall saw")) material = "concrete";
    else material = "general";
  }

  return { kind, material, process };
}

export function diametersOf(table: string[][]) {
  const found = new Set<number>();
  for (const cell of table.flat()) {
    const text = cell.trim();
    if (/^\d{3,4}$/.test(text)) {
      const size = Number(text);
      if (size >= 100 && size <= 1200) found.add(size);
    }
  }
  return [...found].sort((a, b) => a - b);
}

export function modelOf(table: string[][]) {
  return table.flat().map((cell) => cell.trim()).find((cell) => /^IB[-\s]/i.test(cell));
}

function enrich(product: RawProduct): CatalogProduct {
  return {
    ...product,
    ...classify(product),
    diameters: diametersOf(product.table),
    model: modelOf(product.table),
    imageSrc: `/${product.image.replace(/^\//, "")}`,
  };
}

export const products: CatalogProduct[] = catalog.groups.flatMap((group) => group.products.map(enrich));

const materialOrder = new Map(materials.map((material, index) => [material, index]));

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function allDiameters() {
  return [...new Set(products.flatMap((product) => product.diameters))].sort((a, b) => a - b);
}

export type CatalogQuery = {
  kind?: string;
  material?: string;
  process?: string;
  d?: string;
  q?: string;
};

export function filterProducts(query: CatalogQuery) {
  const kind = kinds.includes(query.kind as Kind) ? (query.kind as Kind) : query.kind === "all" ? "all" : "blade";
  const material = materials.includes(query.material as Material) ? (query.material as Material) : undefined;
  const process = processes.includes(query.process as Process) ? (query.process as Process) : undefined;
  const diameter = query.d && /^\d{3,4}$/.test(query.d) ? Number(query.d) : undefined;
  const needle = query.q?.trim().toLowerCase() ?? "";

  return products
    .filter((product) => {
      if (kind !== "all" && product.kind !== kind) return false;
      if (material && product.material !== material) return false;
      if (process && product.process !== process) return false;
      if (diameter && !product.diameters.includes(diameter)) return false;
      if (!needle) return true;
      const haystack = [product.title, product.summary, product.applications, product.machinery, product.model, ...product.sourceCategories, ...product.table.flat()]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    })
    .sort((a, b) => {
      const materialDelta = (materialOrder.get(a.material ?? "general") ?? 9) - (materialOrder.get(b.material ?? "general") ?? 9);
      if (materialDelta !== 0) return materialDelta;
      return a.title.localeCompare(b.title);
    });
}

export function normalizeTable(table: string[][]) {
  const source = table.map((row) => row.map((cell) => cell.trim())).filter((row) => row.some(Boolean));
  if (!source.length) return { caption: undefined, headers: [] as string[], rows: [] as { cells: string[]; note: string }[] };

  let caption: string | undefined;
  let rows = source;
  if (rows[0].length === 1 && rows.length > 1) {
    caption = rows[0][0];
    rows = rows.slice(1);
  }

  const headers = rows[0] ?? [];
  const width = headers.length;
  return {
    caption,
    headers,
    rows: rows.slice(1).map((row) => ({
      cells: Array.from({ length: width }, (_, index) => row[index] ?? ""),
      note: row.slice(width).filter(Boolean).join(" · "),
    })),
  };
}

export function firstQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
