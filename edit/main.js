"use strict";
// 取得刪除文章按鈕(還沒有刪除按鈕)
const deleteArticleBtn = document.querySelector(".deleteBtn");
// 監聽刪除文章按鈕
deleteArticleBtn.addEventListener("click", onDeleteArticle);
// 刪除文章函式
function onDeleteArticle(articleId, token) {
  axios
    .delete(`${BASE_URL}/articles/${articleId}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data.message);
      // 重新渲染頁面頁面
      getArticles();
    })
    .catch((error) => {
      alert("發生錯誤，請再試一次");
      console.log(error);
    });
}
