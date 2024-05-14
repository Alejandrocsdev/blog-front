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
const commentButtons = document.getElementById('comment-buttons')
const commentSubmit = document.getElementById('comment-submit')
const historyContainer = document.getElementById('history-container')
const footer = document.getElementById('footer')
const container = document.querySelector('.container')

// 留言變數
let totalComments
let showComments
let offset = 0
const size = 2

// 留言區狀態
let isTextareaActive = false

// 從cookie取得articleId
const articleId = cookie.get('articleId')
// 從cookie取得user
user = cookie.get('user') || ''

// 觀察器: 留言無限下滑
const commentsObserver = new IntersectionObserver(infiniteScroll)

console.log('<<<固定參數>>>')
console.log('顯示留言: ', size)
console.log('\n')
console.log('<<<初始參數>>>')
console.log('留言狀態: ', isTextareaActive)
console.log('articleId: ', articleId)
console.log('\n')

// 初始函式
;(function init() {
  // 從cookie移除keyword & filter
  cookie.remove('keyword')
  cookie.remove('filter')
  // 取得文章
  getArticle()
  // 取得留言
  getComments('載入')
  // 更新登入狀態樣式
  if (user && isLoggedIn) {
    updateArticlePageView()
  }
  // 監聽器: 留言區狀態
  document.body.addEventListener('click', onClickTextarea)
  // 監聽器: 篩選文章類別
  container.addEventListener('click', onFilter)
  // 監聽器: 提交留言
  commentSubmit.addEventListener('click', onSubmitComment)
})()

function onSubmitComment() {
  const value = commentSection.value
  if (value) {
    createComment({ comment: value })
  } else {
    console.log(`Comment can't be empty`)
  }
}

// 取得文章
function getArticle() {
  axios.get(`${ARTICLES_API}/${articleId}`).then((response) => {
    // 回傳資料
    const data = response.data
    console.log(`文章資訊: `, data)
    console.log('\n')
    // 儲存文章
    article.push(data)
    // 渲染文章
    renderArticle(...article)
  })
}

// 取得留言
function getComments(type) {
  axios.get(`${COMMENTS_API}/${articleId}?offset=${offset}&size=${size}`).then((response) => {
    // 回傳資料
    const data = response.data
    const main = data.main
    console.log(`留言資訊(${type}): `, data)
    console.log(`本頁留言(${type}): `, main)
    // 儲存留言
    comments.length = 0
    comments.push(...main)
    // 渲染留言
    renderComments(comments)
    // 儲存 總留言數 & 當前留言數
    totalComments = data.total
    showComments = historyContainer.children.length
    console.log(`總留言數(${type}): `, totalComments)
    console.log(`當前留言(${type}): `, showComments)
    console.log('\n')
    // 更新offset
    if (offset <= totalComments) {
      offset += size
      commentsObserver.observe(footer)
    }
  })
}

// 新增留言
function createComment(body) {
  axios
    .post(`${COMMENTS_API}/user/${user.id}/article/${articleId}`, body, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      // 回傳資料
      const data = response.data
      console.log(`會員: "${user.username}" ${data.message}`)
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

// #監聽器函式: 篩選文章類別
function onFilter(event) {
  const target = event.target

  if (target.classList.contains('username') || target.classList.contains('category')) {
    const keyword = target.textContent
    const filter = target.dataset.filter
    cookie.set('keyword', keyword)
    cookie.set('filter', filter)
    // 導向home頁面
    window.location.href = '../home/index.html'
  }
}

// 觀察器: 留言無限下滑
function infiniteScroll(entries) {
  console.log('留言觀察: ', entries[0].isIntersecting)
  console.log('\n')

  if (entries[0].isIntersecting) {
    getComments('下滑')
  }

  if (totalComments - showComments === 0) {
    commentsObserver.disconnect()
  }
}

// 文章渲染
function renderArticle(article) {
  title.textContent = article.title
  avatar.src = article.user.avatar
  username.textContent = article.user.username
  username.dataset.filter = 'user'
  categoryContainer.innerHTML = createCategories(article.categories)
  picture.src = article.picture
  content.textContent = article.content
}

// 留言渲染
function renderComments(comments) {
  comments.forEach((comment) => {
    const history = document.createElement('div')
    history.classList.add('history')
    const htmlContent = `<div class="info">
    <div class="avatar">
      <img src="${comment.user.avatar}">
    </div>
      <div class="username" data-filter="user">${comment.user.username}</div>
  </div>
  <div class="history-comment">${comment.comment}</div>`
    history.innerHTML = htmlContent
    historyContainer.appendChild(history)
  })
}

// 留言區狀態
function commentSectionState(state) {
  commentSection.style.height = state === 'open' ? '100px' : '50px'
  commentButtons.style.display = state === 'open' ? 'flex' : 'none'
  isTextareaActive = state === 'open' ? true : false
}

// createCategories(categories): global.js
