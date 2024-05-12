// API
const USER_API = `${BASE_URL}/users`

// HTML元素
const username = document.getElementById('username')
const email = document.getElementById('email')
const avatar = document.querySelector('#avatar img')
const userArticles = document.getElementById('user-articles')

const articles = []

const token = cookie.get('token') || ''
const user = cookie.get('user') || ''

;(function init() {
  // 從cookie移除article_id
  cookie.remove('article_id')
  // 渲染會員資訊
  renderProfileInfo()
  // 請求會員文章
  userArticlesRequest()
  // 監聽器: 文章標題導向edit頁面
  userArticles.addEventListener('click', onTitleRedirect)
})()

function userArticlesRequest() {
  axios
    .get(`${USER_API}/${user.id}/articles`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      const data = response.data
      console.log(data)
      articles.push(...data.articles)
      // 渲染會員文章
      if (articles.length) {
        renderUserArticles()
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

function renderProfileInfo() {
  avatar.src = user.avatar
  username.textContent = user.username
  email.textContent = user.email
}

function renderUserArticles() {
  let htmlContent = ''
  articles.forEach((article) => {
    htmlContent += `<div class="article-title" data-id="${article.id}">${article.title}</div>`
  })
  userArticles.innerHTML = htmlContent
}

// #監聽器函式: 文章標題導向edit頁面
function onTitleRedirect(event) {
  const target = event.target

  if (target.classList.contains('article-title')) {
    // 於cookie儲存article_id
    const id = target.dataset.id
    cookie.set('article_id', id)
    // 導向edit頁面
    window.location.href = '../edit/index.html'
  }
}
