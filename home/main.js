'use strict'

// API
const ARTICLES_URL = `${BASE_URL}/articles`

// HTML元素
const articlesContainer = document.querySelector('.articles-container')
// const pagination = document.querySelector('.pagination')
const allPageBtn = document.querySelector('.page-button-container')
const firstPageBtn = document.querySelector('.first-page')
const previousPageBtn = document.querySelector('.previous-page')
const nextPageBtn = document.querySelector('.next-page')
const lastPageBtn = document.querySelector('.last-page')
const searchForm = document.querySelector('.search-bar-container')
const searchInput = document.querySelector('#search')
const userContent = document.querySelector('.main-wrap')

// 儲存全部文章
const articles = []
// 省略比數
let offset = 0
//每頁顯示頁數
let size = 1
// 所在頁碼
let currentPage = 1
// 總文章數
let totalArticle
// 開始頁碼
let startPage
// 結束頁碼
let endPage
// 計算後的總頁數
let totalPage
// 搜尋關鍵字
let keyword = cookie.get('keyword') || ''
// 篩選類別
let filter = cookie.get('filter') || ''

// 初始函式
;(function init() {
   // 取得文章資料
  getArticles()  
  // 渲染分頁器
  renderPaginator()
  // 文章標題 => 文章細節
  articlesContainer.addEventListener('click', onTitleRedirect)
  // 搜尋關鍵字
  searchForm.addEventListener('submit', onSearch)
  // 篩選類別
  userContent.addEventListener('click', onFilter)
  // 移動到第一頁
  firstPageBtn.addEventListener('click', () => changePage('<<'));
  // 前一頁
  previousPageBtn.addEventListener('click', () => changePage('<'));
  // 下一頁
  nextPageBtn.addEventListener('click', () => changePage('>'));
  // 移動到最後一頁
  lastPageBtn.addEventListener('click', () => changePage('>>'));
})()

// API: 取得文章資料
function getArticles() {
  // 清空
  articles.length = 0;
  // 代表從第X筆資料開始
  let offset = (currentPage - 1) * size; 
  const PAGINATION_URL = `${ARTICLES_URL}?offset=${offset}&size=${size}`  

  // 從後端拿文章總數
   axios.get(ARTICLES_URL)
    .then((response) => {
      const totalArticles = parseInt(response.data.total);
      // 總頁數=取得的文章總數/每頁顯示頁數
      totalPage = Math.ceil(totalArticles / size);
      // console.log("totalPage" +totalPage)

  // 根據總文章總數重新計算總頁數後，再從分頁取得文章
    axios.get(PAGINATION_URL)
      .then((response) => {
       const data = response.data;
       const main = data.main;
  // 儲存全部文章
       articles.push(...main);
       console.log('儲存資料: ', articles);

   // 清空文章容器，然後再渲染全部文章
       articlesContainer.innerHTML = '';
       renderArticles(articles);  
       renderPaginator();
       })

      .catch((error) => {
       console.log(error);
       });
    })
      .catch((error) => {
       console.log(error);
    });
}

// 渲染全部文章
function renderArticles(articles) {
  let rawHTML = ''
  articles.forEach((article) => {
    rawHTML += `<div class="article-overview">
    <div class="article-left">
      <div class="user">
        <img src="${article.user.avatar}" alt="avatar">
        <a href="#" class="username">${article.user.username}</a>
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
    rawHTML += `<li class="category">${e.category}</li>`
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

// 監聽器函式: 搜尋關鍵字
async function onSearch(event) {
  // 阻止瀏覽器的默認行為
  event.preventDefault()
  // 更新關鍵字變數
  keyword = searchInput.value.trim()
  // 取得符合關鍵字文章
  await getArticles()
}

// 監聽器函式: 篩選類別
async function onFilter(event) {
  const target = event.target
  // 篩選分類
  if (target.matches('.category')) {
    filter = 'categories'
    keyword = target.textContent
  } 
  // 篩選用戶
  else if (target.matches('.username')) {
    filter = 'user'
    keyword = target.textContent
  }
  // 取得符合篩選條件文章
  await getArticles()
}

function changePage(action) {
  switch(action) {
    case "<<":
      if (currentPage !== 1) {
        currentPage = 1
      }
      break;
    case "<":
      if (currentPage > 1) {
        currentPage--
      }
      break;
    case ">":
      if (currentPage < totalPage) {
        currentPage++
      }
      break;
    case ">>":
      if (currentPage !== totalPage) {
        currentPage = totalPage
      }
      break;

      default:
      console.log('ERROR');
      return; 
  }
      getArticles()
      renderPaginator()        
}

// 更新頁碼按鈕
function updatePagination() { 
  //總頁數<5時，頁碼顯示 "1~總頁數"
  if (totalPage <= 5) {
    startPage = 1
    endPage = totalPage
    
  } else {
  //總頁數>5時，所在頁碼在3以下時，頁碼顯示1-5
    if (currentPage <= 3) {
      startPage = 1
      endPage = 5
  //所在頁碼+2會大於等於總頁碼時
    } else if (currentPage + 2 >= totalPage) {
      startPage = totalPage - 4
      endPage = totalPage
    } else {
      startPage = currentPage - 2
      endPage = currentPage + 2
    }    
    }    
  }

//渲染頁碼
function renderPaginator(){   
  let rawHTML = ''
   updatePagination()
   //動態產生頁碼
   for (let page = startPage; page <= endPage; page++) {
    rawHTML += `<button class="page-button ${page === currentPage ? 'active' : ''}" data-page="${page}">${page}</button>`;
  }  
  allPageBtn.innerHTML = rawHTML;
  
  //監聽按鈕，點擊時跳至該頁面並渲染取得的文章
  const pageButtons = document.querySelectorAll('.page-button');
  pageButtons.forEach(button => {
    button.addEventListener('click', () => {
      currentPage = Number(button.dataset.page); 
      getArticles() 
      renderPaginator();
    });
  });
}