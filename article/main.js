'use strict'

// API
const ARTICLE_URL = `${BASE_URL}/articles`

// HTML元素
const commentBtn = document.querySelector('.comment-btn-container')
const textArea = document.querySelector('.user-comment')
const articleContainer = document.querySelector('article')

// 儲存單篇文章
const article = []
// 留言區狀態
let isTextareaActive = false
console.log('留言區狀態: ', isTextareaActive)
// 索取cookie值
const articleId = cookie.get('articleId')
console.log('文章ID: ', articleId)

// filter
const filterApi ={offset: 0,size: 10,keyword: '',filter: ''}
let API_URL =`${ARTICLES_URL}?offset=${filterApi.offset}&size=${filterApi.size}&keyword=${filterApi.keyword}&filter=${filterApi.filter}`

// 初始函式
;(function init() {
  // 取得文章資料
  getArticle()
  // 監聽器: 留言區
  body.addEventListener('click', onTextarea)
})()

//監聽器
articleContainer.addEventListener("click",filterArticle )

// API: 取得文章資料
function getArticle() {
  axios
    .get(`${ARTICLE_URL}/${articleId}`)
    .then((response) => {
      const data = response.data
      article.push(data)
      console.log('回傳資料: ', data)
      console.log('儲存資料: ', article)
      // 渲染單篇文章
      renderArticle(article[0])
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

//filter監聽器函式
function filterArticle(event) {
  let target = event.target;
//filter categories
  if (target.matches('.category')) {
    filterApi.filter = 'categories'
    filterApi.keyword = target.dataset.text
    updateApiUrl()
    getArticles(API_URL)
//filter user
  } else if (target.matches('.username'))  {
    filterApi.filter = 'user'
    filterApi.keyword = target.dataset.text
    updateApiUrl()
    getArticles(API_URL)
  }
  }

//更新API_URL
function updateApiUrl() {
  API_URL =`${ARTICLES_URL}?offset=${filterApi.offset}&size=${filterApi.size}&keyword=${filterApi.keyword}&filter=${filterApi.filter}`
}
  

