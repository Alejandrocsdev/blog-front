// API
const USER_API = `${BASE_URL}/users`

// HTML元素
const username = document.getElementById('username')
const email = document.getElementById('email')
const avatarForm = document.getElementById('avatar-form')
const avatarImg = document.querySelector('#avatar-form img')
const fileInput = document.getElementById('fileInput')
const userArticles = document.getElementById('user-articles')

const articles = []

token = cookie.get('token') || ''
user = cookie.get('user') || ''
;(function init() {
  // 從cookie移除article_id
  cookie.remove('article_id')
  // 渲染會員資訊
  renderProfileInfo()
  // 請求會員文章
  userArticlesRequest()
  // 監聽器: 文章標題導向edit頁面
  userArticles.addEventListener('click', onTitleRedirect)
  // 監聽器: 點擊照片(觸發上傳)
  avatarImg.addEventListener('click', () => fileInput.click())
  // 監聽器: 上傳照片
  fileInput.addEventListener('change', onUpload)
  // 監聽器: 提交表單
  avatarForm.addEventListener('submit', onSubmit)
})()

// 監聽器: 上傳照片
function onUpload() {
  const file = this.files[0]
  if (file) {
    const reader = new FileReader()
    // 監聽器: 更新上傳照片
    reader.onload = (event) => (avatarImg.src = event.target.result)
    // 觸發onload事件
    reader.readAsDataURL(file)
    onSubmit()
  }
}

// 監聽器: 提交表單
function onSubmit(event) {
  if (event) {
    event.preventDefault()
  }
  const file = fileInput.files[0]
  if (file) {
    const formData = new FormData()
    formData.append('file', file)
    uploadImageRequest(formData)
  }
}

// 請求會員文章
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

function uploadImageRequest(formData) {
  axios
    .post(`${USER_API}/${user.id}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      const data = response.data
      console.log(data)
      user = data.user
      cookie.set('user', data.user)
      profileAvatar.src = user.avatar
    })
    .catch((error) => {
      console.error(error)
    })
}

// 渲染會員資訊
function renderProfileInfo() {
  avatarImg.src = user.avatar
  username.textContent = user.username
  email.textContent = user.email
}

// 渲染會員文章
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
