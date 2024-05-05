const title = document.getElementById('title')
const avatar = document.querySelector('.avatar img')
const username = document.querySelector('.username')
const categoryContainer = document.getElementById('category-container')
const picture = document.querySelector('#picture img')
const content = document.getElementById('content')
const commentSection = document.getElementById('comment-section')
const commentButtons = document.getElementById('comment-buttons')
const historyContainer = document.getElementById('history-container')

const ARTICLES_API = `${BASE_URL}/articles`
const COMMENTS_API = `${BASE_URL}/comments`
const article = []
const comments = []
let isTextareaActive = false
const id = cookie.get('articleId')
console.log('articleId: ', id)


;(function init() {
  axios.get(`${ARTICLES_API}/${id}`).then((response) => {
    const data = response.data
    article.push(data)
    renderArticle(...article)
    console.log('本頁文章: ', article[0])
    document.body.addEventListener('click', onClickTextarea)
  })

  axios.get(`${COMMENTS_API}/${id}`).then((response) => {
    const data = response.data
    comments.push(...data)
    renderComments(comments)
    console.log('本頁留言: ', comments)
  })
})()

function renderArticle(article) {
  title.textContent = article.title
  avatar.src = article.avatar
  username.textContent = article.username
  categoryContainer.innerHTML = createCategories(article.category)
  picture.src = article.picture
  content.textContent = article.content
}

function createCategories(categories) {
  let htmlContent = ''
  categories.forEach((category) => {
    htmlContent += `<span class="category">${category}</span>`
  })
  return htmlContent
}

function onClickTextarea(event) {
  const target = event.target
  if (target.id === 'comment-section' && !isTextareaActive) {
    commentSectionState('open')
  } else if (target.id === 'comment-cancel') {
    commentSectionState('close')
    commentSection.value = ''
  } else if (
    target.id !== 'comment-section' &&
    target.id !== 'comment-submit' &&
    isTextareaActive &&
    !commentSection.value
  ) {
    commentSectionState('close')
  }
}

function commentSectionState(state) {
  commentSection.style.height = state === 'open' ? '100px' : '50px'
  commentButtons.style.display = state === 'open' ? 'flex' : 'none'
  isTextareaActive = state === 'open' ? true : false
}

function renderComments(comments) {
  let htmlContent = ''
  comments.forEach((comment)=>{
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
