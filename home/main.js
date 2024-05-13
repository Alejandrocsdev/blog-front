// API
const ARTICLES_API = `${BASE_URL}/articles`

// 回傳資料
const articles = []

// HTML元素
const articlesContainer = document.getElementById('articles-container')
const paginator = document.getElementById('paginator')
const searchContainer = document.getElementById('search-container')
const search = document.getElementById('search')

// 分頁變數
let page = 1
let totalArticles
let totalPages
let offset = 0
const size = 3
const showPages = 4
console.log('<<<固定參數>>>')
console.log('每頁篇數: ', size)
console.log('顯示分頁: ', showPages)
console.log('\n')
console.log('<<<初始參數>>>')
console.log('當前頁數: ', page)
console.log('\n')

// 搜尋關鍵字 & 篩選類別
let keyword = cookie.get('keyword') || ''
let filter = cookie.get('filter') || ''
console.log('搜尋字串: ', keyword)
console.log('篩選類別: ', filter)
console.log('\n')

// 初始函式
;(function init() {
  // 從cookie移除article_id
  cookie.remove('article_id')
  // 取得文章
  getArticles('載入', keyword)
  // 監聽器: 文章標題導向article頁面
  articlesContainer.addEventListener('click', onTitleRedirect)
  // 監聽器: 篩選文章類別
  articlesContainer.addEventListener('click', onFilter)
  // 監聽器: 切換分頁
  paginator.addEventListener('click', onPaginator)
  // 監聽器: 搜尋內容
  searchContainer.addEventListener('click', onSearch)
  // 監聽器: 搜尋內容(enter鍵)
  search.addEventListener('keydown', onEnterSearch)
})()

// 取得文章
function getArticles(stage, keyword) {
  // 發送全部文章請求
  axios
    .get(`${ARTICLES_API}?offset=${offset}&size=${size}&keyword=${keyword}&filter=${filter}`)
    .then((response) => {
      // 回傳資料
      const data = response.data
      const main = data.main
      console.log(`全部資訊(${stage}): `, data)
      console.log(`本頁文章(${stage}): `, main)
      // 儲存文章
      articles.length = 0
      articles.push(...main)
      // 渲染文章
      renderArticles(articles)
      // 儲存 文章數 & 頁數
      totalArticles = data.total
      totalPages = Math.ceil(totalArticles / size)
      console.log(`總文章數(${stage}): `, totalArticles)
      console.log(`全部頁數(${stage}): `, totalPages)
      // 渲染分頁
      renderPaginator()
      console.log(`當前頁數(${stage}): `, page)
      console.log(`搜尋字串(${stage}): `, keyword)
      console.log(`篩選類別(${stage}): `, filter)
      console.log('\n')
    })
}

// #監聽器函式: 文章標題導向article頁面
function onTitleRedirect(event) {
  const target = event.target

  if (target.classList.contains('title')) {
    // 於cookie儲存article_id
    const id = target.dataset.id
    cookie.set('article_id', id)
    // 導向article頁面
    window.location.href = '../article/index.html'
  }
}

// #監聽器函式: 篩選文章類別
function onFilter(event) {
  const target = event.target

  if (target.classList.contains('username') || target.classList.contains('category')) {
    keyword = target.textContent
    filter = target.dataset.filter
    // 更新offset & page
    offset = 0
    page = 1
    getArticles('篩選', keyword)
  }
}

// #監聽器函式: 切換分頁
function onPaginator(event) {
  const target = event.target
  // 簡化目標函式
  const targetClass = (type) => target.classList.contains(type)
  // 更新當前頁數
  switch (true) {
    case targetClass('first'):
      page = 1
      break
    case targetClass('previous'):
      page = page - 1 >= 1 ? page - 1 : page
      break
    case targetClass('next'):
      page = page + 1 <= totalPages ? page + 1 : page
      break
    case targetClass('last'):
      page = totalPages
      break
    case targetClass('number'):
      page = Number(target.textContent)
      break
  }

  // 更新offset
  offset = (page - 1) * size

  if (!targetClass('inactive')) {
    // 取得文章
    getArticles('分頁', keyword)
  }
}

// #監聽器函式: 搜尋內容
function onSearch(event) {
  const target = event.target

  // 取得搜尋關鍵字
  keyword = search.value

  if (target.id === 'search-btn' || target.tagName === 'I') {
    // 更新offset & page
    offset = 0
    page = 1
    // 更新filter
    filter = ''
    // 取得文章
    getArticles('搜尋', keyword)
  }
}

// #監聽器函式: 搜尋內容(enter鍵)
function onEnterSearch(event) {
  if (event.key === 'Enter') {
    // 取得搜尋關鍵字
    keyword = search.value
    // 更新offset & page
    offset = 0
    page = 1
    // 更新filter
    filter = ''
    // 取得文章
    getArticles('搜尋', keyword)
  }
}

// 文章渲染
function renderArticles(articles) {
  let htmlContent = ''

  articles.forEach((article) => {
    // 限制顯示字數
    const title =
      article.title.length <= 18 ? article.title : article.title.substring(0, 18) + '...'
    const preview =
      article.content.length <= 60 ? article.content : article.content.substring(0, 60) + '...'

    htmlContent += `<div class="article">
  <div class="main">
    <div class="info">
      <div class="avatar">
        <img src="${article.user.avatar}">
      </div>
      <div class="username" data-filter="user">${article.user.username}</div>
      <div class="category-container">
        ${createCategories(article.categories)}
      </div>
    </div>
    <div class="title" data-id=${article.id} class="title">${title}</div>
    <div class="preview">${preview}</div>
  </div>
  <div class="picture">
    <img src="${article.picture}">
  </div>
</div>`
  })
  articlesContainer.innerHTML = htmlContent
}

// 分頁渲染
function renderPaginator() {
  // 更新首末分頁箭頭狀態
  const first = page === 1 ? 'inactive' : ''
  const last = page === totalPages ? 'inactive' : ''

  // first & previous 分頁箭頭
  let htmlContent = `<i class="fa-solid fa-backward-fast first ${first}"></i>
  <i class="fa-solid fa-caret-left previous ${first}"></i>`

  for (
    // 分頁起始值
    let i = page <= totalPages - (showPages - 1) ? page : totalPages - (showPages - 1);
    // 分頁顯示數
    totalPages >= showPages ? i < page + showPages && i <= totalPages : i <= totalPages;
    // 分頁間距
    i++
  ) {
    htmlContent +=
      i === page
        ? // 當前頁數元素(含樣式)
          `<div class="number clicked">${i}</div>`
        : i >= 1
        ? // 其他頁數元素
          `<div class="number">${i}</div>`
        : // 不顯示頁數
          ''
  }
  // next & last 分頁箭頭
  htmlContent += `<i class="fa-solid fa-caret-right next ${last}"></i>
  <i class="fa-solid fa-forward-fast last ${last}"></i>`

  paginator.innerHTML = htmlContent
}

// createCategories(categories): global.js
