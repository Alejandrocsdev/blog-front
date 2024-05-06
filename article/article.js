// API
const ARTICLES_API = `${BASE_URL}/articles`
const COMMENTS_API = `${BASE_URL}/comments`

// 回傳資料
const article = []
const comments = []

// HTML元素
const title = document.getElementById('title')
const avatar = document.querySelector('.avatar img')
const username = document.querySelector('.username')
const categoryContainer = document.getElementById('category-container')
const picture = document.querySelector('#picture img')
const content = document.getElementById('content')
const commentSection = document.getElementById('comment-section')
const commentButtons = document.getElementById('comment-buttons')
const historyContainer = document.getElementById('history-container')

// 留言區狀態
let isTextareaActive = false

// 從cookie取得articleId
const id = cookie.get('articleId')
console.log('articleId: ', id)

// 初始函式
;(function init() {
  // 取得文章
  getArticle()
  // 取得留言
  getComments()
  // 監聽器: 留言區狀態
  document.body.addEventListener('click', onClickTextarea)
})()

// 取得文章
function getArticle() {
  axios.get(`${ARTICLES_API}/${id}`).then((response) => {
    // 回傳資料
    const data = response.data
    console.log(`文章資訊: `, data)
    // 儲存文章
    article.push(data)
    // 渲染文章
    renderArticle(...article)
  })
}

// 取得留言
function getComments() {
  axios.get(`${COMMENTS_API}/${id}`).then((response) => {
    // 回傳資料
    const data = response.data
    console.log(`留言資訊: `, data)
    // 儲存留言
    comments.push(...data)
    // 渲染留言
    renderComments(comments)
  })
}

// #監聽器函式: 留言區狀態
function onClickTextarea(event) {
  const target = event.target
  // 開啟: 點擊留言區
  if (target.id === 'comment-section' && !isTextareaActive) {
    commentSectionState('open')
  }
  // 關閉: 點擊取消
  else if (target.id === 'comment-cancel') {
    commentSectionState('close')
    commentSection.value = ''
  }
  // 關閉: 點擊頁面其他區塊
  else if (
    target.id !== 'comment-section' &&
    target.id !== 'comment-submit' &&
    isTextareaActive &&
    !commentSection.value
  ) {
    commentSectionState('close')
  }
}

// 文章渲染
function renderArticle(article) {
  title.textContent = article.title
  avatar.src = article.avatar
  username.textContent = article.username
  categoryContainer.innerHTML = createCategories(article.category)
  picture.src = article.picture
  content.textContent = article.content
}

// 留言渲染
function renderComments(comments) {
  let htmlContent = ''

  comments.forEach((comment) => {
    htmlContent += `<div class="history">
    <div class="info">
      <div class="avatar">
        <img src="${comment.avatar}">
      </div>
      <div class="username">${comment.username}</div>
    </div>
    <div class="history-comment">${comment.comment}</div>
  </div>`
  })

  historyContainer.innerHTML = htmlContent
}

// 留言區狀態
function commentSectionState(state) {
  commentSection.style.height = state === 'open' ? '100px' : '50px'
  commentButtons.style.display = state === 'open' ? 'flex' : 'none'
  isTextareaActive = state === 'open' ? true : false
}

// createCategories(categories): global.js
