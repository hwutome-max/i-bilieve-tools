const images = {
  flash: "assets/hero-cutting-clean.png",
  flashMotion: "assets/hero-cutting-blade-spin.webp?v=20260613-full-disc-v10",
  plant: "assets/catalog/image-002.jpg",
  news1: "assets/catalog/image-003.jpg",
  news2: "assets/catalog/image-001.jpg",
  news3: "assets/catalog/image-050.jpg"
};

const productCatalog = window.PRODUCT_CATALOG;
const representativeProducts = {
  tileStoneBlades: "1169321824311640064",
  constructionBlades: "444",
  grindingWheels: "429",
  coreDrillBits: "424",
  vacuumBrazed: "436",
  laserWelded: "440"
};

const productCategoryDefinitions = productCatalog.groups.map((group) => ({
  ...group,
  image: group.products.find((product) => product.id === representativeProducts[group.key])?.image || group.products[0]?.image
}));

const translations = {
  en: {
    nav: ["Products", "Company", "Quality", "Contact"],
    heroTitle: "Professional diamond tools for precise cutting, drilling and grinding.",
    heroLead: "Since 2014, I Believe Tools has supplied diamond saw blades, grinding wheels and core drill bits for construction and stoneworking.",
    heroKicker: "Scroll to cut",
    heroProof: "A diamond edge stays stable under pressure, leaves a cleaner kerf and keeps working across hard materials.",
    scrollHint: "Scroll",
    inquiry: "Send inquiry",
    catalog: "Open catalog",
    productEyebrow: "Product range",
    productModalIntro: "Verified catalog products",
    productModalClose: "Close",
    catalogNote: "Use the catalog as a selection guide by material, machine type, cutting method and finish requirement.",
    aboutEyebrow: "About us",
    aboutTitle: "Production in Danyang, Jiangsu.",
    aboutCopy: "Danyang I Believe Machinery Tools Co., Ltd. specializes in the production and sales of diamond tool products. The factory is located in Danyang along the Shanghai-Nanjing expressway and high-speed railway.",
    founded: "founded",
    area: "production area",
    capacity: "The product brochure states an annual capacity of more than 2 million pieces, with products sold in Europe, the Americas, Southeast Asia and major Chinese cities.",
    qualityEyebrow: "Quality and equipment",
    qualityTitle: "Testing, production and certification.",
    qualityCopy: "I Believe Tools invests in research, process control and testing equipment to maintain consistent product quality.",
    qualityCards: [
      ["Precise diamond cutting", "Saw blades for tile, stone, concrete, asphalt and demanding construction materials."],
      ["Quality control", "Testing equipment, production machinery and continuous development support stable quality."],
      ["Certified processes", "The brochure mentions ISO9001:2000 and German MPA safety and quality certification."]
    ],
    geoEyebrow: "Reference",
    geoTitle: "Company facts",
    geoCopy: "Key facts for quick buyer review.",
    faqs: [
      ["What does I Believe Tools manufacture?", "Diamond saw blades, grinding wheels, core drill bits, vacuum brazed tools and laser-welded diamond tools."],
      ["Where is the company located?", "Danyang Economic Development Zone, Jiangsu Province, China."],
      ["Which capacity and certifications are stated?", "The brochure states more than 2 million pieces per year and mentions ISO9001:2000 plus German MPA safety and quality certification."]
    ],
    contactEyebrow: "Contact",
    contactTitle: "Talk to I Believe Tools.",
    contactCopy: "For product details, catalogs and quotes, send an inquiry with application, material and preferred specification.",
    placeholders: ["Email(*)", "Name", "Phone / message"],
    submit: "Submit",
    formError: "Please enter a valid email and a message.",
    formSuccess: "The inquiry is ready. Your email app will open.",
    original: "Original website"
  },
  de: {
    nav: ["Produkte", "Unternehmen", "Qualität", "Kontakt"],
    heroTitle: "Professionelle Diamantwerkzeuge für präzises Schneiden, Bohren und Schleifen.",
    heroLead: "Seit 2014 liefert I Believe Tools Diamant-Sägeblätter, Schleiftöpfe und Kernbohrer für Bau und Steinbearbeitung.",
    heroKicker: "Zum Schneiden scrollen",
    heroProof: "Eine Diamantkante bleibt unter Druck stabil, erzeugt eine saubere Schnittfuge und arbeitet zuverlässig in harten Materialien.",
    scrollHint: "Scrollen",
    inquiry: "Anfrage senden",
    catalog: "Katalog öffnen",
    productEyebrow: "Produktsortiment",
    productModalIntro: "Geprüfte Katalogprodukte",
    productModalClose: "Schließen",
    catalogNote: "Nutzen Sie den Katalog zur Auswahl nach Material, Maschinentyp, Schnittart und gewünschter Oberfläche.",
    aboutEyebrow: "Über uns",
    aboutTitle: "Produktion in Danyang, Jiangsu.",
    aboutCopy: "Danyang I Believe Machinery Tools Co., Ltd. ist auf Produktion und Vertrieb von Diamantwerkzeugen spezialisiert. Der Standort liegt in Danyang an der Shanghai-Nanjing-Autobahn und Hochgeschwindigkeitsbahn.",
    founded: "gegründet",
    area: "Betriebsfläche",
    capacity: "Die jährliche Produktionskapazität liegt laut Produktunterlagen bei über 2 Millionen Stück. Die Produkte werden nach Europa, Amerika, Südostasien und in chinesische Städte geliefert.",
    qualityEyebrow: "Qualität und Ausstattung",
    qualityTitle: "Prüfung, Fertigung und Zertifizierung.",
    qualityCopy: "I Believe Tools setzt auf Forschung, Prozesskontrolle und moderne Prüfgeräte, um gleichbleibende Produktqualität zu sichern.",
    qualityCards: [
      ["Präziser Diamantschnitt", "Sägeblätter für Fliesen, Stein, Beton, Asphalt und anspruchsvolle Baustoffe."],
      ["Qualitätskontrolle", "Prüfgeräte, Produktionsausrüstung und kontinuierliche Entwicklung unterstützen stabile Qualität."],
      ["Zertifizierte Prozesse", "Die Unterlagen nennen ISO9001:2000 sowie MPA-Sicherheits- und Qualitätszertifizierung aus Deutschland."]
    ],
    geoEyebrow: "Referenz",
    geoTitle: "Unternehmensdaten",
    geoCopy: "Wichtige Angaben für eine schnelle Käuferprüfung.",
    faqs: [
      ["Was produziert I Believe Tools?", "Diamant-Sägeblätter, Schleiftöpfe, Kernbohrer sowie vakuumgelötete und laser-geschweißte Diamantwerkzeuge."],
      ["Wo befindet sich das Unternehmen?", "In der Danyang Economic Development Zone, Provinz Jiangsu, China."],
      ["Welche Kapazität und Zertifizierungen werden genannt?", "Die Produktunterlagen nennen über 2 Millionen Stück pro Jahr sowie ISO9001:2000 und deutsche MPA-Sicherheits- und Qualitätszertifizierung."]
    ],
    contactEyebrow: "Kontakt",
    contactTitle: "Sprechen Sie mit I Believe Tools.",
    contactCopy: "Für Produktdetails, Kataloge und Angebote senden Sie eine Anfrage mit Einsatzgebiet, Material und gewünschter Spezifikation.",
    placeholders: ["E-Mail(*)", "Name", "Telefon / Nachricht"],
    submit: "Absenden",
    formError: "Bitte geben Sie eine gültige E-Mail-Adresse und eine Nachricht ein.",
    formSuccess: "Die Anfrage wurde vorbereitet. Ihr E-Mail-Programm wird geöffnet.",
    original: "Originalwebsite"
  },
  it: {
    nav: ["Prodotti", "Azienda", "Qualità", "Contatto"],
    heroTitle: "Utensili diamantati professionali per taglio, foratura e smerigliatura di precisione.",
    heroLead: "Dal 2014 I Believe Tools fornisce lame diamantate, mole e punte carotatrici per edilizia e lavorazione della pietra.",
    heroKicker: "Scorri per tagliare",
    heroProof: "Il bordo diamantato resta stabile sotto pressione, lascia un taglio più pulito e lavora su materiali duri.",
    scrollHint: "Scorri",
    inquiry: "Invia richiesta",
    catalog: "Apri catalogo",
    productEyebrow: "Gamma prodotti",
    productModalIntro: "Prodotti verificati nel catalogo",
    productModalClose: "Chiudi",
    catalogNote: "Usa il catalogo per scegliere in base a materiale, macchina, metodo di taglio e finitura richiesta.",
    aboutEyebrow: "Chi siamo",
    aboutTitle: "Produzione a Danyang, Jiangsu.",
    aboutCopy: "Danyang I Believe Machinery Tools Co., Ltd. è specializzata nella produzione e vendita di utensili diamantati. La sede si trova a Danyang, lungo l'autostrada e la linea ferroviaria ad alta velocità Shanghai-Nanchino.",
    founded: "anno di fondazione",
    area: "area produttiva",
    capacity: "Secondo il catalogo, la capacità annua supera i 2 milioni di pezzi. I prodotti sono venduti in Europa, nelle Americhe, nel Sud-est asiatico e nelle principali città cinesi.",
    qualityEyebrow: "Qualità e attrezzature",
    qualityTitle: "Controllo, produzione e certificazioni.",
    qualityCopy: "I Believe Tools investe in ricerca, controllo di processo e apparecchiature di prova per mantenere costante la qualità.",
    qualityCards: [
      ["Taglio diamantato preciso", "Lame per piastrelle, pietra, calcestruzzo, asfalto e materiali da costruzione impegnativi."],
      ["Controllo qualità", "Apparecchiature di prova, impianti produttivi e sviluppo continuo supportano una qualità stabile."],
      ["Processi certificati", "La documentazione indica ISO9001:2000 e certificazione tedesca MPA per sicurezza e qualità."]
    ],
    geoEyebrow: "Riferimento",
    geoTitle: "Dati aziendali",
    geoCopy: "Informazioni essenziali per una rapida verifica da parte degli acquirenti.",
    faqs: [
      ["Che cosa produce I Believe Tools?", "Lame diamantate, mole, punte carotatrici e utensili diamantati brasati sottovuoto o saldati laser."],
      ["Dove si trova l'azienda?", "Nella Danyang Economic Development Zone, provincia di Jiangsu, Cina."],
      ["Quali capacità e certificazioni sono indicate?", "Il catalogo indica oltre 2 milioni di pezzi all'anno e menziona ISO9001:2000 più certificazione tedesca MPA per sicurezza e qualità."]
    ],
    contactEyebrow: "Contatto",
    contactTitle: "Parla con I Believe Tools.",
    contactCopy: "Per dettagli tecnici, cataloghi e offerte, invia una richiesta indicando applicazione, materiale e specifiche desiderate.",
    placeholders: ["E-mail(*)", "Nome", "Telefono / messaggio"],
    submit: "Invia",
    formError: "Inserisci un indirizzo e-mail valido e un messaggio.",
    formSuccess: "La richiesta è pronta. Si aprirà il tuo programma e-mail.",
    original: "Sito originale"
  },
  zh: {
    nav: ["产品", "公司", "质量", "联系"],
    heroTitle: "专业金刚石工具，服务精准切割、钻孔与打磨。",
    heroLead: "自 2014 年起，I Believe Tools 为建筑与石材加工提供金刚石锯片、打磨片和孔钻。",
    heroKicker: "向下滚动开始切割",
    heroProof: "金刚石刃口在压力下保持稳定，切缝更干净，可持续应对硬质材料。",
    scrollHint: "滚动",
    inquiry: "发送询盘",
    catalog: "打开产品目录",
    productEyebrow: "产品范围",
    productModalIntro: "已核对目录产品",
    productModalClose: "关闭",
    catalogNote: "可按材料、设备类型、切割方式和表面效果要求选择对应产品。",
    aboutEyebrow: "关于我们",
    aboutTitle: "江苏丹阳生产基地。",
    aboutCopy: "丹阳市艾比利工具机械有限公司专注金刚石工具产品的生产与销售。公司位于丹阳市，靠近沪宁高速公路和高速铁路。",
    founded: "成立时间",
    area: "厂区面积",
    capacity: "产品资料显示，公司年生产能力超过 200 万件，产品销往欧洲、美洲、东南亚以及国内大中城市。",
    qualityEyebrow: "质量与设备",
    qualityTitle: "检测、生产与认证。",
    qualityCopy: "I Believe Tools 持续投入研发、过程控制和检测设备，以保障稳定的产品质量。",
    qualityCards: [
      ["精准金刚石切割", "适用于瓷砖、石材、混凝土、沥青及高要求建筑材料的锯片。"],
      ["质量控制", "检测设备、生产设备和持续研发共同支撑稳定质量。"],
      ["认证体系", "产品资料提到 ISO9001:2000 以及德国 MPA 安全质量认证。"]
    ],
    geoEyebrow: "参考信息",
    geoTitle: "公司要点",
    geoCopy: "供采购快速核对的基础信息。",
    faqs: [
      ["I Believe Tools 生产什么？", "金刚石锯片、打磨片、孔钻，以及真空钎焊和激光焊金刚石工具。"],
      ["公司在哪里？", "中国江苏省丹阳经济开发区。"],
      ["产品资料中提到哪些产能和认证？", "年产能超过 200 万件，并提到 ISO9001:2000 及德国 MPA 安全质量认证。"]
    ],
    contactEyebrow: "联系",
    contactTitle: "联系 I Believe Tools。",
    contactCopy: "如需产品细节、目录或报价，请发送应用场景、材料和目标规格。",
    placeholders: ["邮箱(*)", "姓名", "电话 / 留言"],
    submit: "提交",
    formError: "请输入有效邮箱和留言内容。",
    formSuccess: "询盘已准备好，将打开邮件客户端。",
    original: "原始网站"
  }
};

const catalogTranslations = {
  en: {
    title: "Diamond tools organized by real product type.",
    copy: "63 verified products from the current online catalog. TCT blades, conventional abrasives, garden tools and cordless accessories are excluded.",
    groups: [
      ["Tile and stone diamond blades", "Continuous-rim, turbo, segmented and tuck-point blades for tile, porcelain, granite, marble and stone.", ["Tile", "Stone", "Masonry"]],
      ["Concrete and asphalt blades", "Professional blades for cured concrete, reinforced concrete, green concrete, asphalt and wall saws.", ["Concrete", "Asphalt", "Wall saw"]],
      ["Diamond grinding wheels", "Cup wheels in turbo, single-row, double-row, arrow and shaped segment designs.", ["Cup wheels", "Surface grinding", "Concrete"]],
      ["Diamond core drill bits", "Core bits and sets for drilling concrete, masonry and stone.", ["Core drilling", "Sets", "Construction"]],
      ["Vacuum brazed diamond tools", "Verified brazed saw blades, core bits, hole saws and grinding wheels from the source catalog.", ["Saw blades", "Hole saws", "Grinding"]],
      ["Laser welded diamond tools", "Laser welded blades and core bits for demanding construction cutting and drilling.", ["Laser welded", "Blades", "Core bits"]]
    ],
    view: "View products",
    products: "products",
    search: "Search products",
    source: "Source detail",
    details: "Product details",
    application: "Application",
    model: "Model example",
    empty: "No matching products",
    sourceLanguage: "Product names and specifications retain the source catalog wording.",
    navLabel: "Main navigation",
    languageLabel: "Languages"
  },
  de: {
    title: "Diamantwerkzeuge nach tatsächlichem Produkttyp.",
    copy: "63 geprüfte Produkte aus dem aktuellen Online-Katalog. TCT-Blätter, konventionelle Schleifmittel, Gartenwerkzeuge und Akku-Zubehör sind ausgeschlossen.",
    groups: [
      ["Diamantblätter für Fliesen und Stein", "Geschlossene, Turbo-, Segment- und Fugenschnittblätter für Fliesen, Porzellan, Granit, Marmor und Stein.", ["Fliesen", "Stein", "Mauerwerk"]],
      ["Beton- und Asphaltblätter", "Professionelle Blätter für Altbeton, Stahlbeton, Frischbeton, Asphalt und Wandsägen.", ["Beton", "Asphalt", "Wandsäge"]],
      ["Diamant-Schleiftöpfe", "Schleiftöpfe mit Turbo-, Einzelreihen-, Doppelreihen-, Pfeil- und Formsegmenten.", ["Schleiftöpfe", "Flächenschliff", "Beton"]],
      ["Diamant-Kernbohrer", "Kernbohrer und Sets für Beton, Mauerwerk und Stein.", ["Kernbohren", "Sets", "Bau"]],
      ["Vakuumgelötete Diamantwerkzeuge", "Geprüfte Sägeblätter, Kernbohrer, Lochsägen und Schleiftöpfe aus dem Quellkatalog.", ["Sägeblätter", "Lochsägen", "Schleifen"]],
      ["Laser-geschweißte Diamantwerkzeuge", "Laser-geschweißte Blätter und Kernbohrer für anspruchsvolle Bauarbeiten.", ["Laser-geschweißt", "Blätter", "Kernbohrer"]]
    ],
    view: "Produkte anzeigen",
    products: "Produkte",
    search: "Produkte suchen",
    source: "Quelldetail",
    details: "Produktdetails",
    application: "Anwendung",
    model: "Modellbeispiel",
    empty: "Keine passenden Produkte",
    sourceLanguage: "Produktnamen und Spezifikationen bleiben in der Sprache des Quellkatalogs.",
    navLabel: "Hauptnavigation",
    languageLabel: "Sprachen"
  },
  it: {
    title: "Utensili diamantati ordinati per tipologia reale.",
    copy: "63 prodotti verificati nel catalogo online attuale. Sono esclusi lame TCT, abrasivi convenzionali, utensili da giardino e accessori cordless.",
    groups: [
      ["Lame diamantate per piastrelle e pietra", "Lame a corona continua, turbo, segmentate e per scanalatura per piastrelle, gres, granito, marmo e pietra.", ["Piastrelle", "Pietra", "Muratura"]],
      ["Lame per calcestruzzo e asfalto", "Lame professionali per calcestruzzo stagionato, armato e fresco, asfalto e taglio a parete.", ["Calcestruzzo", "Asfalto", "Taglio a parete"]],
      ["Mole diamantate", "Mole a tazza turbo, a fila singola o doppia, a freccia e con segmenti sagomati.", ["Mole a tazza", "Smerigliatura", "Calcestruzzo"]],
      ["Punte diamantate", "Punte e set per carotaggio di calcestruzzo, muratura e pietra.", ["Carotaggio", "Set", "Edilizia"]],
      ["Utensili diamantati brasati sottovuoto", "Lame, punte, seghe a tazza e mole verificate nel catalogo sorgente.", ["Lame", "Seghe a tazza", "Mole"]],
      ["Utensili diamantati saldati laser", "Lame e punte saldate laser per taglio e foratura impegnativi in edilizia.", ["Saldatura laser", "Lame", "Punte"]]
    ],
    view: "Vedi prodotti",
    products: "prodotti",
    search: "Cerca prodotti",
    source: "Dettaglio fonte",
    details: "Dettagli prodotto",
    application: "Applicazione",
    model: "Esempio modello",
    empty: "Nessun prodotto corrispondente",
    sourceLanguage: "Nomi e specifiche mantengono la dicitura del catalogo sorgente.",
    navLabel: "Navigazione principale",
    languageLabel: "Lingue"
  },
  zh: {
    title: "按真实产品类型整理的金刚石工具。",
    copy: "依据当前在线产品目录校对并收录 63 款产品，已排除 TCT 合金锯片、普通磨料、园林工具和无绳工具配件。",
    groups: [
      ["瓷砖与石材金刚石锯片", "连续齿、涡轮齿、分段齿及开槽锯片，适用于瓷砖、岩板、花岗岩、大理石和石材。", ["瓷砖", "石材", "砌体"]],
      ["混凝土与沥青金刚石锯片", "用于固化混凝土、钢筋混凝土、新浇混凝土、沥青和墙锯作业的专业锯片。", ["混凝土", "沥青", "墙锯"]],
      ["金刚石打磨片", "涵盖涡轮、单排、双排、箭形和异形分段结构的杯形磨轮。", ["杯形磨轮", "表面打磨", "混凝土"]],
      ["金刚石钻头", "用于混凝土、砌体和石材钻孔的金刚石孔钻及套装。", ["孔钻", "套装", "建筑材料"]],
      ["真空钎焊金刚石工具", "经来源目录核对的钎焊锯片、孔钻、开孔器和磨轮。", ["锯片", "开孔器", "打磨"]],
      ["激光焊金刚石工具", "用于高要求建筑切割与钻孔的激光焊锯片和孔钻。", ["激光焊", "锯片", "孔钻"]]
    ],
    view: "查看产品",
    products: "款产品",
    search: "搜索产品",
    source: "查看原始资料",
    details: "产品详情",
    application: "适用范围",
    model: "型号示例",
    empty: "没有匹配的产品",
    sourceLanguage: "产品英文名称与参数沿用来源目录原文。",
    navLabel: "主导航",
    languageLabel: "语言"
  }
};

const languageNames = { en: "EN", de: "DE", it: "IT", zh: "中文" };
const sections = ["products", "company", "quality", "contact"];
const app = document.querySelector("#app");
let cleanupCutDemo = () => {};
let cleanupModalEvents = () => {};

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("lang");
  if (translations[requested]) return requested;
  const saved = localStorage.getItem("ibelieve-language");
  if (translations[saved]) return saved;
  return "it";
}

function card([title, text, specs = []], image, alt) {
  const specList = specs.length ? `<div class="spec-list">${specs.map((spec) => `<span>${spec}</span>`).join("")}</div>` : "";
  return `<article class="tile"><img src="${image}" alt="${alt}"><div class="tile__body"><h3>${title}</h3><p>${text}</p>${specList}</div></article>`;
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  })[character]);
}

function categoryCard(category, definition, copy) {
  const [title, text, specs = []] = category;
  const specList = specs.length ? `<div class="spec-list">${specs.map((spec) => `<span>${spec}</span>`).join("")}</div>` : "";
  return `
    <article class="tile product-category">
      <a class="product-category__media" href="#${definition.key}" data-category-open="${definition.key}" aria-label="${copy.view}: ${title}">
        <img src="${definition.image}" alt="${title}">
        <span class="product-category__count">${definition.count} ${copy.products}</span>
      </a>
      <div class="tile__body">
        <h3>${title}</h3>
        <p>${text}</p>
        ${specList}
        <a class="category-link" href="#${definition.key}" data-category-open="${definition.key}">${copy.view}</a>
      </div>
    </article>
  `;
}

function productModal(category, definition, t, copy) {
  const [title, text] = category;
  const items = definition.products.map((product) => {
    const model = product.table.flat().find((cell) => /^IB[-\s]/i.test(cell));
    const categoryLabel = product.sourceCategories.at(-1) || title;
    const detailBlocks = [
      product.summary ? `<p>${escapeHtml(product.summary)}</p>` : "",
      product.applications ? `<p><strong>${copy.application}:</strong> ${escapeHtml(product.applications)}</p>` : ""
    ].filter(Boolean).join("");
    const searchTerm = `${product.title} ${product.sourceCategories.join(" ")} ${product.summary}`.toLowerCase();
    return `
      <article class="modal-product" data-product-item data-search-term="${escapeHtml(searchTerm)}">
        <img src="${product.image}" alt="${escapeHtml(product.title)}" loading="lazy">
        <div class="modal-product__body">
          <span class="modal-product__category">${escapeHtml(categoryLabel)}</span>
          <h3>${escapeHtml(product.title)}</h3>
          ${model ? `<p class="modal-product__model"><strong>${copy.model}:</strong> ${escapeHtml(model)}</p>` : ""}
          ${detailBlocks ? `<details><summary>${copy.details}</summary><div>${detailBlocks}</div></details>` : ""}
          <a href="${product.sourceUrl}" target="_blank" rel="noreferrer">${copy.source}</a>
        </div>
      </article>
    `;
  }).join("");

  return `
    <div class="modal" data-product-modal="${definition.key}" hidden>
      <div class="modal__backdrop" data-modal-close></div>
      <section class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="modal-title-${definition.key}" aria-describedby="modal-copy-${definition.key}">
        <div class="modal__header">
          <div>
            <p class="eyebrow">${t.productModalIntro}</p>
            <h2 id="modal-title-${definition.key}">${title}</h2>
            <p id="modal-copy-${definition.key}">${text}</p>
            <p class="modal__source-language">${copy.sourceLanguage}</p>
          </div>
          <button class="modal__close" type="button" data-modal-close aria-label="${t.productModalClose}">×</button>
        </div>
        <div class="modal__tools">
          <label class="modal-search">
            <span class="sr-only">${copy.search}</span>
            <input type="search" placeholder="${copy.search}" data-product-search>
          </label>
          <span class="modal__result-count"><strong data-product-count>${definition.count}</strong> ${copy.products}</span>
          <button class="modal__close modal__close--tools" type="button" data-modal-close aria-label="${t.productModalClose}">×</button>
        </div>
        <div class="modal-products">${items}</div>
        <p class="modal__empty" data-product-empty hidden>${copy.empty}</p>
      </section>
    </div>
  `;
}

function render(lang) {
  cleanupCutDemo();
  cleanupModalEvents();
  const t = translations[lang];
  const catalogCopy = catalogTranslations[lang];
  document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  document.title = `I Believe Tools | ${t.heroTitle}`;
  localStorage.setItem("ibelieve-language", lang);

  app.innerHTML = `
    <header class="nav">
      <a class="brand" href="#top">I Believe Tools</a>
      <nav class="nav__links" aria-label="${catalogCopy.navLabel}">
        ${t.nav.map((label, index) => `<a href="#${sections[index]}">${label}</a>`).join("")}
      </nav>
      <div class="lang" aria-label="${catalogCopy.languageLabel}">
        <label class="sr-only" for="language-select">${catalogCopy.languageLabel}</label>
        <select id="language-select" data-language-select>
          ${Object.keys(translations).map((code) => `<option value="${code}" ${code === lang ? "selected" : ""}>${languageNames[code]}</option>`).join("")}
        </select>
      </div>
    </header>
    <main id="top">
      <section class="hero-cut" data-cut-demo>
        <picture>
          <source srcset="${images.flashMotion}" type="image/webp">
          <img class="flash-image" src="${images.flash}" alt="Diamond saw blade cutting concrete">
        </picture>
        <div class="flash-motion" aria-hidden="true">
          <div class="flash-dust"></div>
          <div class="flash-glow"></div>
          <div class="flash-sparks">
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
        <div class="flash-shade"></div>
        <div class="cut-stage">
          <div class="cut-copy">
            <p class="eyebrow">${t.heroKicker}</p>
            <h1>${t.heroTitle}</h1>
            <p class="lead">${t.heroLead}</p>
            <p class="cut-proof">${t.heroProof}</p>
            <div class="button-row">
              <a class="button button--filled" href="#contact">${t.inquiry}</a>
              <a class="button" href="I%20BELIEVE%20MACHINERY%20TOOLS.pdf">${t.catalog}</a>
            </div>
            <span class="scroll-cue">${t.scrollHint}</span>
          </div>
        </div>
      </section>
      <section class="section section--light" id="products">
        <div class="wrap">
          <div class="section__intro"><div><p class="eyebrow">${t.productEyebrow}</p><h2>${catalogCopy.title}</h2></div><p>${catalogCopy.copy}</p></div>
          <div class="grid">
            ${catalogCopy.groups.map((category, index) => categoryCard(category, productCategoryDefinitions[index], catalogCopy)).join("")}
          </div>
          <p class="catalog-note">${t.catalogNote}</p>
        </div>
      </section>
      <section class="section section--dark" id="company">
        <div class="wrap about">
          <div>
            <p class="eyebrow">${t.aboutEyebrow}</p>
            <h2>${t.aboutTitle}</h2>
            <p>${t.aboutCopy}</p>
            <div class="stats"><div class="stat"><span class="stat__value">2014</span><span class="stat__label">${t.founded}</span></div><div class="stat"><span class="stat__value">3000 m²</span><span class="stat__label">${t.area}</span></div></div>
            <p>${t.capacity}</p>
          </div>
          <img src="${images.plant}" alt="I Believe Tools factory">
        </div>
      </section>
      <section class="section section--white" id="quality">
        <div class="wrap">
          <div class="section__intro"><div><p class="eyebrow">${t.qualityEyebrow}</p><h2>${t.qualityTitle}</h2></div><p>${t.qualityCopy}</p></div>
          <div class="news">
            ${card(t.qualityCards[0], images.news1, t.qualityCards[0][0]).replace("tile", "").replace("tile__body", "news__body")}
            ${card(t.qualityCards[1], images.news2, t.qualityCards[1][0]).replace("tile", "").replace("tile__body", "news__body")}
            ${card(t.qualityCards[2], images.news3, t.qualityCards[2][0]).replace("tile", "").replace("tile__body", "news__body")}
          </div>
        </div>
      </section>
      <section class="section section--light section--subtle" id="geo">
        <div class="wrap">
          <details class="geo-disclosure">
            <summary>
              <span>${t.geoEyebrow}</span>
              <strong>${t.geoTitle}</strong>
              <small>${t.geoCopy}</small>
            </summary>
            <div class="faq-grid faq-grid--compact">
              ${t.faqs.map(([question, answer]) => `<article class="faq"><h3>${question}</h3><p>${answer}</p></article>`).join("")}
            </div>
          </details>
        </div>
      </section>
      <section class="section section--dark" id="contact">
        <div class="wrap contact">
          <div>
            <p class="eyebrow">${t.contactEyebrow}</p>
            <h2>${t.contactTitle}</h2>
            <p>${t.contactCopy}</p>
            <div class="contact-list">
              <span>Danyang Economic Development Zone, Jiangsu Province</span>
              <a href="tel:+8615862924461">+86 158 6292 4461</a>
              <a href="tel:+8618952977678">+86 189 5297 7678</a>
              <a href="mailto:jessica@ibelievetools.com">jessica@ibelievetools.com</a>
            </div>
          </div>
          <form data-contact-form data-error-message="${t.formError}" data-success-message="${t.formSuccess}">
            <input type="email" name="email" placeholder="${t.placeholders[0]}" aria-label="${t.placeholders[0]}" autocomplete="email">
            <input type="text" name="name" placeholder="${t.placeholders[1]}" aria-label="${t.placeholders[1]}" autocomplete="name">
            <textarea name="message" placeholder="${t.placeholders[2]}" aria-label="${t.placeholders[2]}"></textarea>
            <button class="button button--filled" type="submit">${t.submit}</button>
            <p class="form-status" data-form-status aria-live="polite"></p>
          </form>
        </div>
      </section>
    </main>
    <footer class="footer"><div class="wrap"><span>Danyang I Believe Machinery Tools Co., Ltd.</span><a href="http://www.ibelievetools.com">${t.original}</a></div></footer>
    ${catalogCopy.groups.map((category, index) => productModal(category, productCategoryDefinitions[index], t, catalogCopy)).join("")}
  `;

  bindEvents(lang);
  initCutDemo();
}

function initCutDemo() {
  const demo = document.querySelector("[data-cut-demo]");
  if (!demo) return;
  const frame = demo.querySelector(".machine-frame");

  const update = () => {
    const rect = demo.getBoundingClientRect();
    const range = demo.offsetHeight - window.innerHeight;
    const progress = range <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / range));
    const contact = Math.min(1, Math.max(0, (progress - 0.28) / 0.52));
    const spark = progress > 0.28 && progress < 0.82 ? 1 : 0;
    const maxDrop = frame && frame.offsetWidth < 420 ? 128 : 178;

    demo.style.setProperty("--cut-progress", progress.toFixed(4));
    demo.style.setProperty("--head-y", `${Math.round(progress * maxDrop)}px`);
    demo.style.setProperty("--blade-spin", `${Math.round(progress * 1800)}deg`);
    demo.style.setProperty("--cut-depth", `${Math.round(contact * 100)}%`);
    demo.style.setProperty("--spark-opacity", spark);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  cleanupCutDemo = () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
    cleanupCutDemo = () => {};
  };
}

function bindEvents(currentLang) {
  let lastModalTrigger = null;
  const setBackgroundInert = (inert) => {
    document.querySelectorAll("body > #app > header, body > #app > main, body > #app > footer").forEach((element) => {
      element.inert = inert;
    });
  };
  const closeModals = ({ restoreFocus = true } = {}) => {
    document.querySelectorAll("[data-product-modal]").forEach((modal) => {
      modal.hidden = true;
    });
    document.body.classList.remove("modal-open");
    setBackgroundInert(false);
    if (restoreFocus && lastModalTrigger) lastModalTrigger.focus();
  };

  document.querySelectorAll("[data-category-open]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const modal = document.querySelector(`[data-product-modal="${trigger.dataset.categoryOpen}"]`);
      if (!modal) return;
      closeModals({ restoreFocus: false });
      lastModalTrigger = trigger;
      modal.hidden = false;
      document.body.classList.add("modal-open");
      setBackgroundInert(true);
      const initialFocus = modal.querySelector("[data-product-search]") || modal.querySelector("[data-modal-close]");
      if (initialFocus) initialFocus.focus();
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach((trigger) => {
    trigger.addEventListener("click", closeModals);
  });

  document.querySelectorAll("[data-product-search]").forEach((input) => {
    input.addEventListener("input", () => {
      const modal = input.closest("[data-product-modal]");
      const query = input.value.trim().toLowerCase();
      let visibleCount = 0;
      modal.querySelectorAll("[data-product-item]").forEach((item) => {
        const matches = !query || item.dataset.searchTerm.includes(query);
        item.hidden = !matches;
        if (matches) visibleCount += 1;
      });
      modal.querySelector("[data-product-count]").textContent = visibleCount;
      modal.querySelector("[data-product-empty]").hidden = visibleCount !== 0;
    });
  });

  const handleModalKeydown = (event) => {
    const activeModal = Array.from(document.querySelectorAll("[data-product-modal]")).find((modal) => !modal.hidden);
    if (!activeModal) return;
    if (event.key === "Escape") {
      closeModals();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(activeModal.querySelectorAll("button, input, summary, a[href]"))
      .filter((element) => element.offsetParent !== null && !element.closest("[hidden], [aria-hidden='true']") && !element.hasAttribute("disabled"));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  document.addEventListener("keydown", handleModalKeydown);
  cleanupModalEvents = () => {
    document.removeEventListener("keydown", handleModalKeydown);
    cleanupModalEvents = () => {};
  };

  document.querySelectorAll("[data-language-select]").forEach((select) => {
    select.addEventListener("change", () => {
      const nextLang = select.value;
      history.replaceState(null, "", `?lang=${nextLang}`);
      render(nextLang);
    });
  });

  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    const status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = form.querySelector('input[type="email"]').value.trim();
      const message = form.querySelector("textarea").value.trim();
      if (!email.includes("@") || !email.includes(".") || message.length < 8) {
        status.textContent = form.dataset.errorMessage;
        return;
      }
      status.textContent = form.dataset.successMessage;
      const subject = encodeURIComponent(`I Believe Tools inquiry (${currentLang.toUpperCase()})`);
      const body = encodeURIComponent(Array.from(new FormData(form).entries()).map(([key, value]) => `${key}: ${value}`).join("\n"));
      window.location.href = `mailto:jessica@ibelievetools.com?subject=${subject}&body=${body}`;
    });
  });
}

render(getInitialLanguage());
