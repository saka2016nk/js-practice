const products = [
  { name: "X-ICE SNOW", maker: "ミシュラン", size: "225/45R18" },
  { name: "BLIZZAK DM-V3", maker: "ブリヂストン", size: "215/60R17" },
  { name: "iceGUARD 7", maker: "ヨコハマ", size: "195/65R15" },
  { name: "ウィンターマックス 03", maker: "ダンロップ", size: "155/65R14" }
];

// 初期表示
displayProducts(products);

document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const results = products.filter(p =>
    `${p.name} ${p.maker} ${p.size}`.toLowerCase().includes(query)
  );
  displayProducts(results);
});

function displayProducts(list) {
  const ul = document.getElementById("productList");
  ul.innerHTML = "";
  list.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.maker} - ${p.name}（${p.size}）`;
    ul.appendChild(li);
  });
}
