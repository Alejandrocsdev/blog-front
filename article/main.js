'use strict'

// HTML元素
const commentArea = document.querySelector('.comment-area')

// 登入狀態
let isLoggedIn = false
// 留言區狀態
let isTextareaActive = false

// 初始函式
;(function init() {
  // 監聽器: 登入狀態
  signIn.addEventListener('click', onLoginState)
  //listen to body
  body.addEventListener('click', onTextarea)
})()

// 監聽器函式: 登入狀態
function onLoginState(event) {
  const target = event.target
  commentArea.innerHTML = `
    <textarea name="user-comment" id="user-comment" class="text-area"></textarea>
    <div class="comment-btn-container">
    </div>
  `
}

//listen to body
function onTextarea(event) {
  const commentBtn = document.querySelector('.comment-btn-container')
  const textArea = document.querySelector('#user-comment')
  const target = event.target

  if (target.tagName === 'TEXTAREA') {
    commentBtn.innerHTML = `
      <button class="comment-cancel">取消</button>
      <input type="submit" value="確定">
    `
    textArea.classList.add('textarea-clicked')
  }

  if (target.tagName !== 'TEXTAREA' && !textArea.value) {
    textArea.classList.remove('textarea-clicked')
    commentBtn.innerHTML = ''
  } else if (target.classList.contains('comment-cancel')) {
    textArea.value = ''
    textArea.classList.remove('textarea-clicked')
    commentBtn.innerHTML = ''
  }
}
