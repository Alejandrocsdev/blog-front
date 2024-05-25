'use strict'

// HTML元素
const commentAreas = document.querySelectorAll('.comment')
const commentBtn = document.querySelector('.comment-btn-container')
const textArea = document.querySelector('#user-comment')

// 登入狀態
let isLoggedIn = cookie.get('isLoggedIn') || false
// 留言區狀態
let isTextareaActive = false

// 初始函式
;(function init() {
  // 監聽器: 登入狀態
  nav.addEventListener('click', onLoginState)
  // 監聽器: 留言區
  body.addEventListener('click', onTextarea)
})()

// 監聽器函式: 登入狀態
function onLoginState(event) {
  const target = event.target
  if (target.classList.contains('sign-in')) {
    isLoggedIn = true
    switchCommentArea()
  } else if (target.classList.contains('sign-up')) {
    isLoggedIn = false
    switchCommentArea()
  }
}

//監聽器函式: 留言區狀態
function onTextarea(event) {
  const target = event.target

  if (target.tagName === 'TEXTAREA' && !isTextareaActive) {
    isTextareaActive = true
    textArea.classList.add('textarea-clicked')
    commentBtn.classList.remove('hidden')
  }

  if (target.tagName !== 'TEXTAREA' && !textArea.value) {
    isTextareaActive = false
    textArea.classList.remove('textarea-clicked')
    commentBtn.classList.add('hidden')
  } else if (target.classList.contains('comment-cancel')) {
    commentBtn.classList.add('hidden')
    textArea.value = ''
    textArea.classList.remove('textarea-clicked')
  }
}

// 函式: 留言區樣式轉換
function switchCommentArea() {
  commentAreas.forEach((comment) => {
    comment.classList.toggle('hidden')
  })
}
