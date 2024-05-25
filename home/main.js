const ARTICLE_URL = BASE_URL + '/articles'
const articlePreviewContainer = document.querySelector('.article-preview-container')
const articles = []

// 假設用這組data
const data = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
  { id: 4, name: 'D' },
  { id: 5, name: 'E' },
  { id: 6, name: 'F' },
  { id: 7, name: 'G' },
  { id: 8, name: 'H' },
  { id: 9, name: 'I' },
  { id: 10, name: 'J' }
]

let pageSize = 1 // 每頁顯示的資料筆數
let currentPage = 1 // 所在頁碼
let totalPages = Math.ceil(data.length / pageSize) // 總頁數

// fetch data
axios.get(ARTICLE_URL).then((responses) => {
  articles.push(...responses.data.main)
  console.log(articles)
  showArticles(articles)
})

// show article
function showArticles(articlesData) {
  let rawHTML = ''
  articlesData.forEach((article) => {
    rawHTML += `
            <div class="article-overview">
            <div class="article-left">
              <div class="user">
                <img src="${article.user.avatar}" alt="avatar" />
                <a href="#" class="username">${article.user.username}</a>
                <ul class="categories">
                  <li><a class="category" href="#">${article.categories[0].category}</a></li>
                  <li><a class="category" href="#">${article.categories[1]}</a></li>
                  <li><a class="category" href="#">${article.categories[2]}</a></li>
                </ul>
              </div>
              <a href="../article/index.html">
                <h2 class="article-title" data-id="${article.id}">${article.title}</h2>
              </a>
              <div class="article-content">
                ${article.content}
              </div>
            </div>
            <div class="article-right">
              <img
                class="article-img"
                src="${article.picture}"
                alt="article-image"
              />
            </div>
          </div>
        `
  })
  articlePreviewContainer.innerHTML = rawHTML
}
// 監聽文章標題
articlePreviewContainer.addEventListener('click', function onTitleClick(event) {
  if (event.target.classList.contains('article-title')) {
    const articleId = Number(event.target.dataset.id)
    cookie.set('articleId', articleId)
  }
})

// 隨自訂每頁顯示資料筆數更新頁面內容
function updateContent() {
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const contentData = data.slice(startIndex, endIndex) //拿startIndex開始到endIndex前的資料

  let contentHTML = ''
  for (const item of contentData) {
    contentHTML += `<p>${item.id} - ${item.name}</p>`
  }

  document.querySelector('#article-content').innerHTML = contentHTML
}

// 更新頁碼按鈕(建立.更新按鈕)
function updatePagination() {
  const pagination = document.querySelector('.pagination')
  pagination.innerHTML = ''

  // *設定分頁按鈕顯示範圍*
  let startPage = 1 // 分頁按鈕顯示的起始頁碼
  let endPage = 1 // 分頁按鈕顯示的最後頁碼
  //總頁數<5時，頁碼顯示 "1~總頁數"
  if (totalPages <= 5) {
    startPage = 1
    endPage = totalPages
  } else {
    //總頁數>5時，
    //所在頁碼在3以下時，頁碼顯示1-5
    if (currentPage <= 3) {
      startPage = 1
      endPage = 5
      //所在頁碼+2會大於等於總頁碼時
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4
      endPage = totalPages
    } else {
      startPage = currentPage - 2
      endPage = currentPage + 2
    }
  }

  // *建立切換到第一頁的按鈕*
  const firstPageButton = document.createElement('button')
  firstPageButton.textContent = '<<'
  firstPageButton.addEventListener('click', () => {
    //點擊時若所在頁碼不在第一頁，直接到第一頁
    if (currentPage !== 1) {
      currentPage = 1
      updateContent()
      updatePagination()
    }
  })
  pagination.appendChild(firstPageButton)

  //*建立上一頁按鈕*
  const previousBtn = document.createElement('button')
  previousBtn.textContent = '<'
  previousBtn.addEventListener('click', () => {
    //如果所在頁碼>1，就可以往上一頁
    if (currentPage > 1) {
      currentPage--
      updateContent()
      updatePagination()
    }
  })
  pagination.appendChild(previousBtn)

  //*建立分頁按鈕*
  for (let page = startPage; page <= endPage; page++) {
    const pageButton = document.createElement('button')
    pageButton.textContent = page
    //如果page和所在頁碼一樣時，加上active
    if (page === currentPage) {
      pageButton.classList.add('active')
    }
    pageButton.addEventListener('click', () => {
      currentPage = page
      updateContent()
      updatePagination()
    })
    pagination.appendChild(pageButton)
  }

  //*建立下一頁按鈕*
  const nextButton = document.createElement('button')
  nextButton.textContent = '>'
  nextButton.addEventListener('click', () => {
    //如果所在頁碼<總頁數>，就往下一頁
    if (currentPage < totalPages) {
      currentPage++
      updateContent()
      updatePagination()
    }
  })
  pagination.appendChild(nextButton)

  // *建立切換到最後一頁的按鈕*
  const lastPageButton = document.createElement('button')
  lastPageButton.textContent = '>>'
  lastPageButton.addEventListener('click', () => {
    if (currentPage !== totalPages) {
      currentPage = totalPages
      updateContent()
      updatePagination()
    }
  })
  pagination.appendChild(lastPageButton)
}

// 初始化
updateContent()
updatePagination()
