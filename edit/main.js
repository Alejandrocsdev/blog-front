"use strict";

let articleId = cookie.get("articleId");

//HTML
const title = document.querySelector('.input-title')
const category = document.querySelector('.category')
const content = document.querySelector('.input-content')
const submitBtn = document.querySelector(".submit-btn");



//
let titleValue = title.value
let contentValue = content.value;


;(function() {
  getEditedArticle();
  submitBtn.addEventListener('click', onSubmitted)
})()

// API:  文章資料

function getEditedArticle() {
  axios
    .get(`${BASE_URL}/articles/${articleId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((responses) => {
      const data = responses.data;
      renderArticle(data)
    })
    .catch((error) => {
      console.log(error);
    });
}

//
function renderArticle(data) {
   title.value = data.title;
   content.value = data.content;
}


// // 監聽器函示: 編輯文章
function onSubmitted (event) {
  event.preventDefault()

  let articleForm = document.querySelector("#article-form");
  let formData = new FormData(articleForm);

  titleValue = formData.get('title')
  contentValue = formData.get('content')
  console.log(titleValue, contentValue);
  
  const body = { title: titleValue, content: contentValue };

  createBody()
  // 更新至後端
  function createBody () {
    axios
      .put(`${BASE_URL}/articles/${articleId}/edit`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((responses) => {
        const data = responses.data;
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });

   }
}

 