const products = ["ブリヂストン", "ミシュラン", "ヨコハマ", "トーヨー", "ダンロップ"];

document.getElementById("searchInput").addEventListener("input", function() {
  const query = this.value.toLowerCase();
  const suggestions = products.filter(p => p.toLowerCase().includes(query));

  const list = document.getElementById("suggestList");
  list.innerHTML = "";
  suggestions.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
});
