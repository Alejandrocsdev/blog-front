'use strict'



// HTML元素
const articlesContainer = document.querySelector('.articles-container')
const pagination = document.querySelector('.pagination')
const usercontent = document.querySelector('.main-wrap')

// 儲存全部文章
let articles = []
// 每頁顯示的資料筆數
let size = 1
// 所在頁碼
let currentPage = 1
// 總頁數
let total = 10





// 初始函式
;(function init() {

  // 取得文章資料
    if (storage.get('API_URL')) {
      API_URL = storage.get('API_URL')
      console.log(API_URL)  
      getArticles(API_URL)
      localStorage.removeItem('API_URL')

    } else {
      console.log('no...API_URL...home')
    
      getArticles(ARTICLE_URL)
    } 
  // 渲染分頁器
  updatePagination()
  // TODO: renderPaginator()
  // 文章標題 => 文章細節
  articlesContainer.addEventListener('click', onTitleRedirect)
})()

//監聽器
usercontent.addEventListener("click",filterArticle )

// API: 取得文章資料
function getArticles(URL) {

  axios
    .get(URL)
    .then((responses) => {
      const data = responses.data
      const main = data.main
      // 儲存全部文章
      articles = []
      articles.push(...main)
      console.log('回傳資料: ', data)
      console.log('主體資料: ', main)
      console.log('儲存資料: ', articles)
      // 渲染全部文章
      renderArticles(articles)
    })
    .catch((error) => {
      console.log(error)
    })

}


// 渲染全部文章
function renderArticles(articles) {
  let rawHTML = ''
  articles.forEach((article) => {
    rawHTML += `<div class="article-overview">
    <div class="article-left">
      <div class="user">
        <img src="${article.user.avatar}" alt="avatar">
        <a href="#" class="username" data-text="${article.user.username}">${article.user.username}</a>
        <ul class="categories">
          ${renderCategories(article.categories)}
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
      <img class="article-img" src="${article.picture}" alt="article-image">
    </div>
  </div>`
  })
  articlesContainer.innerHTML = rawHTML

}

// 渲染單篇文章全部分類
function renderCategories(categories) {
  let rawHTML = ''
  categories.forEach((e) => {
    rawHTML += `<li><a class="category" data-text="${e.category}" href="#">${e.category}</a></li>`
  })
  return rawHTML
}

// 監聽器函式: 文章標題 => 文章細節
function onTitleRedirect(event) {
  const target = event.target
  if (target.classList.contains('article-title')) {
    const articleId = Number(target.dataset.id)
    cookie.set('articleId', articleId)
  }
}

// 更新頁碼按鈕(建立.更新按鈕)
function updatePagination() {
  pagination.innerHTML = ''

  // *設定分頁按鈕顯示範圍*
  let startPage = 1 // 分頁按鈕顯示的起始頁碼
  let endPage = 1 // 分頁按鈕顯示的最後頁碼
  //總頁數<5時，頁碼顯示 "1~總頁數"
  if (total <= 5) {
    startPage = 1
    endPage = total
  } else {
    //總頁數>5時，
    //所在頁碼在3以下時，頁碼顯示1-5
    if (currentPage <= 3) {
      startPage = 1
      endPage = 5
      //所在頁碼+2會大於等於總頁碼時
    } else if (currentPage + 2 >= total) {
      startPage = total - 4
      endPage = total
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
      updatePagination()
    })
    pagination.appendChild(pageButton)
  }

  //*建立下一頁按鈕*
  const nextButton = document.createElement('button')
  nextButton.textContent = '>'
  nextButton.addEventListener('click', () => {
    //如果所在頁碼<總頁數>，就往下一頁
    if (currentPage < total) {
      currentPage++
      updatePagination()
    }
  })
  pagination.appendChild(nextButton)

  // *建立切換到最後一頁的按鈕*
  const lastPageButton = document.createElement('button')
  lastPageButton.textContent = '>>'
  lastPageButton.addEventListener('click', () => {
    if (currentPage !== total) {
      currentPage = total
      updatePagination()
    }
  })
  pagination.appendChild(lastPageButton)
}



//filter監聽器函式
function filterArticle(event) {
  let target = event.target;
//filter categories
  if (target.matches('.category')) {
    filterApi.filter = 'categories'
    filterApi.keyword = target.dataset.text
    renderFilter()
//filter user
  } else if (target.matches('.username'))  {
    filterApi.filter = 'user'
    filterApi.keyword = target.dataset.text
    renderFilter()
  }
  }

//整合filterArticle相同程序
function renderFilter() {
  
  API_URL =`${ARTICLE_URL}?offset=${filterApi.offset}&size=${filterApi.size}&keyword=${filterApi.keyword}&filter=${filterApi.filter}`
  getArticles(API_URL)
}
  


