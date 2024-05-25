'use strict'

// HTML元素
const commentAreas = document.querySelectorAll('.comment')
const commentBtn = document.querySelector('.comment-btn-container')
const textArea = document.querySelector('#user-comment')
const article = document.querySelector('article')

// 留言區狀態
let isTextareaActive = false

const articleData = []

// 索取cookie值
const id = cookie.get('articleId')

// 初始函式
;(function init() {
  getArticle()
  // 監聽器: 登入狀態
  nav.addEventListener('click', onLoginState)
  // 監聽器: 留言區
  body.addEventListener('click', onTextarea)
})()

function getArticle() {
  // 索取id頁面資料
  axios
    .get(BASE_URL + '/articles/' + id)
    .then((response) => {
      const data = response.data
      console.log(data)
      articleData.push(data)
      renderArticle(articleData[0])
    })
    .catch((error) => {
      console.log(error)
    })
}

// 重新渲染頁面
function renderArticle(articleData) {
  let rawHTML = ``
  const categories = articleData.categories

  rawHTML += `<h2 class="title">${articleData.title}</h2>
        <div class="user">
          <img src="${articleData.picture}" alt="avatar" />
          <a href="#" class="username"> ${articleData.user.username}</a>
          <ul class="categories">`

  rawHTML += renderCategories(categories)

  rawHTML += `</ul>
          </div>
          <img class="article-img" src="${articleData.picture}"
            alt="article-image" />
          <div class="article-content">
            ${articleData.content}
          </div>`

  article.innerHTML = rawHTML
}

function renderCategories(categories) {
  let rawHTML = ''
  categories.forEach((e) => {
    rawHTML += `<li><a class="category" href="#">${e.category}</a></li>`
  })
  return rawHTML
}

// 監聽器函式: 登入狀態
function onLoginState(event) {
  const target = event.target
  if (target.classList.contains('sign-in')) {
    isLoggedIn = true
    switchCommentArea()
  } else if (target.classList.contains('sign-up')) {
    isLoggedIn = false
    switchCommentArea()
  }
}

//監聽器函式: 留言區狀態
function onTextarea(event) {
  const target = event.target

  if (target.tagName === 'TEXTAREA' && !isTextareaActive) {
    isTextareaActive = true
    textArea.classList.add('textarea-clicked')
    commentBtn.classList.remove('hidden')
  }

  if (target.tagName !== 'TEXTAREA' && !textArea.value) {
    isTextareaActive = false
    textArea.classList.remove('textarea-clicked')
    commentBtn.classList.add('hidden')
  } else if (target.classList.contains('comment-cancel')) {
    commentBtn.classList.add('hidden')
    textArea.value = ''
    textArea.classList.remove('textarea-clicked')
  }
}

// 函式: 留言區樣式轉換
function switchCommentArea() {
  commentAreas.forEach((comment) => {
    comment.classList.toggle('hidden')
  })
}
