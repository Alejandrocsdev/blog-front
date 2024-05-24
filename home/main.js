const ARTICLE_URL = BASE_URL + "/articles";
const articlePreviewContainer = document.querySelector(
  ".article-preview-container"
);
const articles = [];

// fetch data
axios.get(ARTICLE_URL).then((responses) => {
  articles.push(...responses.data.main);
  showArticles(articles);
});

// show article
function showArticles(articlesData) {
  let rawHTML = "";
  articlesData.forEach((article) => {
    rawHTML += `
            <div class="article-overview">
            <div class="article-left">
              <div class="user">
                <img src="${article.user.avatar}" alt="avatar" />
                <a href="#" class="username">${article.user.username}</a>
                <ul class="categories">
                  <li><a class="category" href="#">${article.categories[0]}</a></li>
                  <li><a class="category" href="#">${article.categories[1]}</a></li>
                  <li><a class="category" href="#">${article.categories[2]}</a></li>
                </ul>
              </div>
              <a href="../article/index.html">
                <h2 class="article-title" data-id="${article.id}">${article.title}</h2>
              </a>
              <div class="article-content">
                ${article.content}
              </div>
            </div>
            <div class="article-right">
              <img
                class="article-img"
                src="${article.picture}"
                alt="article-image"
              />
            </div>
          </div>
        `;
  });
  articlePreviewContainer.innerHTML = rawHTML;
}

articlePreviewContainer.addEventListener("click", function onTitleClick(event) {
  if (event.target.classList.contains("article-title")) {
    const articleId = Number(event.target.dataset.id);
    cookie.set("articleId", articleId);
  }
});
