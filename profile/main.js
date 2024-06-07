"use strict";

// HTML 元素
const userArticles = document.querySelector(".user-articles");

// 初始函式
(function init() {
  // 取得文章資料
  getUserArticles();
})();

// API: 取得用戶文章資料
function getUserArticles() {
  axios
    .get(`${USERS_API}/${user.id}/articles`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((responses) => {
      const articlesData = responses.data.articles;
      console.log(articlesData);
      renderUserArticles(articlesData);
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderUserArticles(articlesData) {
  let rawHTML = "";
  articlesData.forEach((article) => {
    console.log(article);
    rawHTML += `<li><a href="../edit/index.html">${article.title}</a></li>`;
  });
  userArticles.innerHTML = rawHTML;
}
