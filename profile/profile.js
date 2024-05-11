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
  userArticlesRequest()
  
  renderProfileInfo()
})()

function userArticlesRequest() {
    axios
    .get(`${USER_API}/${user.id}/articles`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      const data = response.data
      articles.push(...data.articles)
      console.log(articles)
      renderUserArticles()
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
  articles.forEach((article)=>{
    htmlContent += `<div class="article-title">${article.title}</div>`
  })
  userArticles.innerHTML = htmlContent
}
