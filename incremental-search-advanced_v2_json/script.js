// ひらがな→カタカナ変換関数
function toKatakana(str) {
  return str.replace(/[\u3041-\u3096]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) + 0x60)
  );
}

// 商品データをJSONから読み込んで処理
fetch("products.json")
  .then(res => res.json())
  .then(products => {
    document.getElementById("searchInput").addEventListener("input", function () {
      const input = this.value.toLowerCase();
      const query = toKatakana(input);

      const results = products.filter(product =>
        product.keywords.some(keyword =>
          toKatakana(keyword.toLowerCase()).includes(query)
        )
      );

      const list = document.getElementById("suggestList");
      list.innerHTML = "";
      results.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.name;
        list.appendChild(li);
      });
    });
  });
