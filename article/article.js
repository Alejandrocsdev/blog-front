const title = document.getElementById('title')
const avatar = document.querySelector('.avatar img')
const username = document.querySelector('.username')
const picture = document.querySelector('#picture img')
const content = document.getElementById('content')
const commentSection = document.getElementById('comment-section')
const commentButtons = document.getElementById('comment-buttons')

const ARTICLE_API = `${BASE_URL}/articles`
const article = []
let isTextareaActive = false

;(function init() {
  const id = cookie.get('articleId')
  axios.get(`${ARTICLE_API}/${id}`).then((response) => {
    const data = response.data
    article.push(data)
    renderArticle(...article)
    console.log(article[0])
    document.body.addEventListener('click', onClickTextarea)
  })
})()

function renderArticle(article) {
  title.textContent = article.title
  avatar.src = article.avatar
  username.textContent = article.username
  picture.src = article.picture
  content.textContent = article.content
}

function onClickTextarea(event) {
  const target = event.target
  if (target.id === 'comment-section' && !isTextareaActive) {
    commentSectionState('open')
  } else if (target.id === 'comment-cancel') {
    commentSectionState('close')
    commentSection.value = ''
  } else if (target.id !== 'comment-section' && isTextareaActive && !commentSection.value) {
    commentSectionState('close')
  }
}

function commentSectionState(state) {
  commentSection.style.height = state === 'open' ? '100px' : '50px'
  commentButtons.style.display = state === 'open' ? 'flex' : 'none'
  isTextareaActive = state === 'open' ? true : false
}
