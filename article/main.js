'use strict'

// API
const ARTICLE_URL = `${BASE_URL}/articles`

// HTML元素
const commentBtn = document.querySelector('.comment-btn-container')
const textArea = document.querySelector('.user-comment')
const articleContainer = document.querySelector('article')
const commentHistory = document.querySelector('.comment-history-container')

// 儲存單篇文章
const article = []
// 處存歷史留言
const comments = []

// 留言區狀態
let isTextareaActive = false
console.log('留言區狀態: ', isTextareaActive)
// 索取cookie值
const articleId = cookie.get('articleId')
console.log('文章ID: ', articleId)

// 初始函式
;(function init() {
  // 取得文章資料
  getArticle()
  // 取得留言資料
  getComments()
  // 監聽器: 留言區
  body.addEventListener('click', onTextarea)
})()

// API: 取得文章資料
function getArticle() {
  axios
    .get(`${ARTICLE_URL}/${articleId}`)
    .then((response) => {
      const data = response.data
      article.push(data)
      console.log('回傳文章資料: ', data)
      console.log('儲存文章資料: ', article)
      // 渲染單篇文章
      renderArticle(article[0])
    })
    .catch((error) => {
      console.log(error)
    })
}

// API: 取得留言資料
function getComments() {
  axios
    .get(`${BASE_URL}/comments/${articleId}`)
    .then((response) => {
      const data = response.data
      const main = data.main
      comments.push(...main)
      console.log('回傳留言資料: ', data)
      console.log('主體留言資料: ', main)
      console.log('儲存留言資料: ', comments)
      // 渲染留言
      renderComments(comments)
    })
    .catch((error) => {
      console.log(error)
    })
}

// 渲染單篇文章
function renderArticle(article) {
  const categories = article.categories
  let rawHTML = `<h2 class="title">${article.title}</h2>
  <div class="user">
    <img src="${article.user.avatar}">
    <a href="#" class="username">${article.user.username}</a>
    <ul class="categories">
      ${renderCategories(categories)}
    </ul>
  </div>
  <img class="article-img" src="${article.picture}" alt="article-image">
  <div class="article-content">
  ${article.content}
  </div>`
  articleContainer.innerHTML = rawHTML
}

// 渲染單篇文章全部分類
function renderCategories(categories) {
  let rawHTML = ''
  categories.forEach((e) => {
    rawHTML += `<li><a class="category" href="#">${e.category}</a></li>`
  })
  return rawHTML
}

// 渲染歷史留言
function renderComments(comments) {
  let rawHTML = ''
  comments.forEach((e) => {
    rawHTML += `
      <div class="comment-container ${e.id}">
          <div class="user-info ${e.user.id}">
            <img class="comment-avatar" src="${e.user.avatar}">
            <div class="comment-username">${e.user.username}</div>
          </div>
         <div class="comment-area">
          <span>${e.comment}</span>
        </div>
      </div>`
  })
  commentHistory.innerHTML = rawHTML
}

//監聽器函式: 留言區狀態
function onTextarea(event) {
  const target = event.target

  if (target.tagName === 'TEXTAREA') {
    isTextareaActive = true
    textArea.classList.add('textarea-clicked')
    commentBtn.classList.remove('hidden')
  } else if (target.classList.contains('comment-cancel')) {
    isTextareaActive = false
    textArea.value = ''
    textArea.classList.remove('textarea-clicked')
    commentBtn.classList.add('hidden')
  } else if (!textArea.value) {
    isTextareaActive = false
    textArea.classList.remove('textarea-clicked')
    commentBtn.classList.add('hidden')
  }
}
