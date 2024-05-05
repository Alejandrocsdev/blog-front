const articlesContainer = document.getElementById('articles-container')
const paginator = document.getElementById('paginator')
const searchContainer = document.getElementById('search-container')
const ARTICLES_API = `${BASE_URL}/articles`
const articles = []

// paginator variable
let current = 1
const total = 10
console.log('當前頁數: ', current)
console.log('總文章數: ', total)

;(function init() {
  cookie.remove('articleId')

  axios.get(`${ARTICLES_API}`).then((response) => {
    const data = response.data
    articles.push(...data)
    renderArticles(articles)
    console.log('本頁文章: ', articles)
  })

  articlesContainer.addEventListener('click', onRedirectToArticle)

  renderPaginator()

  paginator.addEventListener('click', onPaginator)
  searchContainer.addEventListener('click', onSearch)
})()

function renderArticles(articles) {
  let htmlContent = ''
  articles.forEach((article) => {
    const title =
      article.title.length <= 20 ? article.title : article.title.substring(0, 20) + '...'
    const preview =
      article.content.length <= 60 ? article.content : article.content.substring(0, 60) + '...'
    htmlContent += `<div class="article">
  <div class="main">
    <div class="info">
      <div class="avatar">
        <img src="${article.avatar}">
      </div>
      <div class="username">${article.username}</div>
      <div class="category-container">
        ${createCategories(article.category)}
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

function createCategories(categories) {
  let htmlContent = ''
  categories.forEach((category) => {
    htmlContent += `<span class="category">${category}</span>`
  })
  return htmlContent
}

function onRedirectToArticle(event) {
  const target = event.target
  if (target.classList.contains('title')) {
    const id = target.dataset.id
    cookie.set('articleId', id)
    window.location.href = '../article/article.html'
  }
}

function renderPaginator() {
  const first = current === 1 ? 'inactive' : ''
  const last = current === total ? 'inactive' : ''
  let htmlContent = `<i class="fa-solid fa-backward-fast first ${first}"></i>
  <i class="fa-solid fa-caret-left previous ${first}"></i>`
  for (
    let i = current <= total - 4 ? current : total - 4;
    total >= 5 ? i < current + 5 && i <= total : i <= total;
    i++
  ) {
    htmlContent +=
      i === current
        ? `<div class="number clicked">${i}</div>`
        : i >= 1
        ? `<div class="number">${i}</div>`
        : ''
  }
  htmlContent += `<i class="fa-solid fa-caret-right next ${last}"></i>
  <i class="fa-solid fa-forward-fast last ${last}"></i>`
  paginator.innerHTML = htmlContent
}

function onPaginator(event) {
  const target = event.target
  const targetClass = (type) => target.classList.contains(type)
  switch (true) {
    case targetClass('first'):
      current = 1
      break
    case targetClass('previous'):
      current = current - 1 >= 1 ? current - 1 : current
      break
    case targetClass('next'):
      current = current + 1 <= total ? current + 1 : current
      break
    case targetClass('last'):
      current = total
      break
    case targetClass('number'):
      current = Number(target.textContent)
      break
  }
  renderPaginator()
}

function onSearch(event) {
  const search = searchContainer.children[0]
  const value = search.value
  const target = event.target
  if (value && (target.id === 'search-btn' || target.tagName === 'I')) {
    console.log('搜尋關鍵字: ', value)
    axios.get(`${ARTICLES_API}`, { params: { search: value } }).then((response) => {
      const data = response.data
      articles.length = 0
      articles.push(...data)
      renderArticles(articles)
      console.log('搜尋結果: ', articles)
    })
  }
}
