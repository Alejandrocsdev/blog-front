const title = document.getElementById('title')
const avatar = document.querySelector('#avatar img')
const username = document.getElementById('username')
const picture = document.querySelector('#picture img')
const content = document.getElementById('content')

const ARTICLE_API = `${BASE_URL}/articles`
const article = []

;(function init() {
  const id = cookie.get('articleId')
  axios.get(`${ARTICLE_API}/${id}`).then((response) => {
    const data = response.data
    article.push(data)
    renderArticle(...article)
    console.log(article[0])
  })
})()

function renderArticle(article) {
  title.textContent = article.title
  avatar.src = article.avatar
  username.textContent = article.username
  picture.src = article.picture
  content.textContent = article.content
}
