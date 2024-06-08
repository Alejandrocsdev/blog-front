'use strict'

// HTML 元素
const userArticles = document.querySelector('.user-articles')

const articles = []

// 初始函式
;(function init() {
  // 取得文章資料
  getUserArticles()
})()

// API: 取得用戶文章資料
function getUserArticles() {
  axios
    .get(`${USERS_API}/${user.id}/articles`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((responses) => {
      const data = responses.data
      articles.push(...data.articles)
      console.log(articles)
      renderUserArticles(articles)
    })
    .catch((error) => {
      console.log(error)
    })
}

function renderUserArticles(articles) {
  let rawHTML = ''
  articles.forEach((article) => {
    console.log(article)
    rawHTML += `<li><a href="../edit/index.html">${article.title}</a></li>`
  })
  userArticles.innerHTML = rawHTML
}
