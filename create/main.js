'use strict'
const CREATE_URL = `${BASE_URL}/articles/create`
const titleInput = document.querySelector('.input-title');
const categorySelect = document.querySelector('.dropdown');
const contentTextarea = document.querySelector('.input-content');
const submitButton = document.querySelector('.submit-btn');
const cancelButton = document.querySelector('.cancel-btn')

submitButton.addEventListener('click', articleSubmit)
cancelButton.addEventListener('click', articleCancel)

// 點擊cancel返回文章首頁
function articleCancel(event){
  event.preventDefault(); 
  // 跳到文章首頁
  window.location.href = '../article/index.html';  
};

// 點擊submit新增文章到後端
function articleSubmit(event){
  event.preventDefault(); 

  const title = titleInput.value.trim();
  const category = categorySelect.value;
  const content = contentTextarea.value.trim();

  // 檢查所有欄位是否已填寫
  if (title && category && content) {
    const article = {
      title: title,
      category: category,
      content: content
    };

    // 發送 POST 請求
    axios.post(`${CREATE_URL}`, article, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log(`文章已新增: ${response.data}`);
      // 清空輸入框
      titleInput.value = '';
      categorySelect.selectedIndex = 0;
      contentTextarea.value = '';
      // 更新並重新顯示文章
      getArticles(); 
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  } else {
    alert('請填寫所有欄位');
  }
};