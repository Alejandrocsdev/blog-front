// 登入功能還未完成, 先以點擊按鈕後就出現可以留言示意

// listen to sign-in btn
const commentArea = document.querySelector('.comment-area')

signIn.addEventListener('click', (e)=> {
  target = e.target
  commentArea.innerHTML = `
    <textarea name="user-comment" id="user-comment"></textarea>
    <div class="comment-btn-container">
      <button class="comment-cancel">取消</button>
      <input type="submit" value="確定">
    </div>
  `
})