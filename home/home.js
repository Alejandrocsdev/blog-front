const articlesContainer = document.getElementById('articles-container')
const Articles_API = `${BASE_URL}/articles`
const articles = []

;(function init() {
  axios.get(Articles_API).then((response) => {
    const data = response.data
    articles.push(...data)
    renderArticles(articles)
    console.log(articles)
  })
})()

function renderArticles(articles) {
  let htmlContent = ''
  articles.forEach((article) => {
    const title =
      article.title.length <= 20 ? article.title : article.title.substring(0, 20) + '...'
    const preview =
      article.content.length <= 60 ? article.content : article.content.substring(0, 60) + '...'
    htmlContent += `<div class="article">
  <div class="main">
    <div class="info">
      <div class="avatar">
        <img src="${article.avatar}">
      </div>
      <div class="username">${article.username}</div>
      <div class="category-container">
        ${createCategories(article.category)}
      </div>
    </div>
    <a href="../article/article.html?id=${article.id}" class="title">${title}</a>
    <div class="preview">${preview}</div>
  </div>
  <div class="picture">
    <img src="${article.picture}">
  </div>
</div>`
  })
  articlesContainer.innerHTML = htmlContent
}

function createCategories(categories) {
  let htmlContent = ''
  categories.forEach((category) => {
    htmlContent += `<span class="category">${category}</span>`
  })
  return htmlContent
}