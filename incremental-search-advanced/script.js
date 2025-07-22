let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const perPage = 20;

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    filteredProducts = allProducts;
    render();
  });

document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  currentPage = 1;
  filteredProducts = allProducts.filter(p =>
    `${p.maker} ${p.name} ${p.size}`.toLowerCase().includes(query)
  );
  render();
});

function render() {
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const paginatedItems = filteredProducts.slice(start, end);

  const ul = document.getElementById("productList");
  ul.innerHTML = "";
  paginatedItems.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.maker} - ${p.name}（${p.size}） ¥${p.price.toLocaleString()}`;
    ul.appendChild(li);
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filteredProducts.length / perPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) {
      btn.disabled = true;
    }
    btn.addEventListener("click", () => {
      currentPage = i;
      render();
    });
    pagination.appendChild(btn);
  }
}
