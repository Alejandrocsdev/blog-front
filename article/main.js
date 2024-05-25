'use strict'

// API
const ARTICLE_URL = `${BASE_URL}/articles`

// HTML元素
const commentBtn = document.querySelector('.comment-btn-container')
const textArea = document.querySelector('#user-comment')
const article = document.querySelector('article')

// 儲存單篇文章
const articleData = []
// 留言區狀態
let isTextareaActive = false
// 索取cookie值
const id = cookie.get('articleId')
console.log('articleId: ', id)

// 初始函式
;(function init() {
  // 取得文章資料
  getArticle()
  // 監聽器: 留言區
  body.addEventListener('click', onTextarea)
})()

// API: 取得文章資料
function getArticle() {
  axios
    .get(`${ARTICLE_URL}/${id}`)
    .then((response) => {
      const data = response.data
      articleData.push(data)
      console.log('回傳資料: ', data)
      console.log('儲存資料: ', articleData)
      // 渲染單篇文章
      renderArticle(articleData[0])
    })
    .catch((error) => {
      console.log(error)
    })
}

// 渲染單篇文章
function renderArticle(articleData) {
  const categories = articleData.categories
  let rawHTML = `<h2 class="title">${articleData.title}</h2>
  <div class="user">
    <img src="${articleData.picture}">
    <a href="#" class="username">${articleData.user.username}</a>
    <ul class="categories">
      ${renderCategories(categories)}
    </ul>
  </div>
  <img class="article-img" src="https://miro.medium.com/v2/resize:fit:786/format:webp/0*qre_fPP-_hEl_YU-" alt="article-image">
  <div class="article-content">
  ${articleData.content}
  </div>`
  article.innerHTML = rawHTML
}

// 渲染單篇文章全部分類
function renderCategories(categories) {
  let rawHTML = ''
  categories.forEach((e) => {
    rawHTML += `<li><a class="category" href="#">${e.category}</a></li>`
  })
  return rawHTML
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
