const article = document.querySelector('article')
let articleData = ''

// 索取cookie值
let id = cookie.get('articleId')
console.log(id)

// 索取id頁面資料
axios.get(BASE_URL + '/articles/' + id)
.then(function(response){
  articleData = response.data
  renderArticle() 
  // console.log(articleData.user.username)
  })
.catch(function(error){
    console.log(error)
  })


  // 重新渲染頁面
function renderArticle() {  
  let rawHTML = ``
  let category = articleData.category

  rawHTML += `<h2 class="title">${articleData.title}</h2>
        <div class="user">
          <img src="${articleData.picture}" alt="avatar" />
          <a href="#" class="username"> ${articleData.user.username}</a>
          <ul class="categories">`

  try {      
      category.forEach(item => {
        rawHTML +=  `<li><a class="category" href="#">${item}</a></li>`
          })
  } catch (error) {
                console.error('no category', error);
            }
  rawHTML +=           
            `</ul>
          </div>
          <img class="article-img" src="${articleData.picture}"
            alt="article-image" />
          <div class="article-content">
            ${articleData.content}
          </div>`

  article.innerHTML = rawHTML

  }
