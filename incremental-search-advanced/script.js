let allProducts = [];
let aliases = {};
let filteredProducts = [];
let currentPage = 1;
const perPage = 20;

Promise.all([
  fetch("products.json").then(res => res.json()),
  fetch("aliases.json").then(res => res.json())
]).then(([products, aliasData]) => {
  allProducts = products;
  aliases = aliasData;
  filteredProducts = allProducts;
  render();
});

document.getElementById("searchInput").addEventListener("input", function () {
  const raw = this.value;
  const query = normalize(applyAliases(raw));
  currentPage = 1;

  filteredProducts = allProducts.filter(p => {
    const text = normalize(p.maker + p.name + p.size);
    return text.includes(query);
  });

  render();
});

function render() {
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const items = filteredProducts.slice(start, end);

  const list = document.getElementById("productList");
  list.innerHTML = "";
  items.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.maker} - ${p.name}（${p.size}） ¥${p.price.toLocaleString()}`;
    list.appendChild(li);
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const container = document.getElementById("pagination");
  container.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;
    btn.addEventListener("click", () => {
      currentPage = i;
      render();
    });
    container.appendChild(btn);
  }
}

function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0)) // 全角→半角
    .replace(/[\u3041-\u3096]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 0x60)) // ひらがな→カタカナ
    .replace(/[\\s\\-／Ｒ]/g, ""); // 記号除去
}

function applyAliases(input) {
  for (const category in aliases) {
    for (const [standard, alts] of Object.entries(aliases[category])) {
      for (const alt of alts) {
        if (normalize(input).includes(normalize(alt))) {
          return standard;
        }
      }
    }
  }
  return input;
}
