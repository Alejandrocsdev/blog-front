'use strict'

// HTML元素
const body = document.body
const nav = document.querySelector('#navigation')
const signIn = document.querySelector('.sign-in')
const signUp = document.querySelector('.sign-up')
const guest = document.querySelector('.guest')
const mode = document.querySelector('.darkmode')
const modalBg = document.querySelector('.modal-bg')
const logInComment = document.querySelector('.log-in-comment')
const logOutComment = document.querySelector('.log-out-comment')
const loginSwitch = document.getElementById('login-switch')

// 變數
let isLoggedIn = cookie.get('isLoggedIn') || false

// 初始函式
;(function init() {
  // 切換登入狀態(初始)
  setLoginState()
  // 切換登入/登出樣式
  toggleLoginView()
  // 切換暗黑模式圖示
  mode.addEventListener('click', onDarkMode)
  // 切換登入狀態(監聽)
  loginSwitch.addEventListener('click', onSwitchState)
})()

// 監聽器函式: 切換暗黑模式圖示
function onDarkMode(event) {
  let target = event.target
  target.classList.toggle('fa-sun')
  target.classList.toggle('fa-moon')
}

// 切換登入/登出樣式
function toggleLoginView() {
  if (isLoggedIn) {
    signIn.style.display = 'none'
    signUp.style.display = 'none'
    guest.style.display = 'block'
  } else {
    signIn.style.display = 'block'
    signUp.style.display = 'block'
    guest.style.display = 'none'
  }
}

// 切換登入狀態(初始)
function setLoginState() {
  loginSwitch.textContent = isLoggedIn ? '登出' : '登入'
  console.log('登入狀態: ', isLoggedIn)
}

// 切換登入狀態(監聽)
function onSwitchState() {
  loginSwitch.textContent = isLoggedIn ? '登入' : '登出'
  isLoggedIn = isLoggedIn ? false : true
  updateLoginView()
  cookie.set('isLoggedIn', isLoggedIn)
  console.log('登入狀態: ', isLoggedIn)
}

// 更新不同頁面登入樣式
function updateLoginView() {
  const pathname = window.location.pathname
  if (pathname === '/article/index.html') {
    switchCommentArea()
  }
}

// 切換留言區狀態(article頁面)
function switchCommentArea() {
  if (isLoggedIn) {
    logInComment.classList.add('hidden')
    logOutComment.classList.remove('hidden')
  } else {
    logInComment.classList.remove('hidden')
    logOutComment.classList.add('hidden')
  }
}

//點擊signIn時，建立並顯示signInModal
signIn.addEventListener('click', function () {
  modalBg.innerHTML = createSignInModal()
  modalBg.classList.toggle('hidden')
  const modalClose = modalBg.querySelector('.modal-close')
  modalClose.addEventListener('click', () => modalBg.classList.toggle('hidden'))
})

// 點擊signUp時，建立並顯示signUpModal
signUp.addEventListener('click', function () {
  modalBg.innerHTML = createSignUpModal()
  modalBg.classList.toggle('hidden')
  const modalClose = modalBg.querySelector('.modal-close')
  modalClose.addEventListener('click', () => modalBg.classList.toggle('hidden'))
})

// 建立signInModal
function createSignInModal() {
  return `<div id="signInModal" class="sign-in-modal-content">
  <div>
    <button class="modal-close">X</button>
  </div>
  <h3 class="sign-up">登入</h3>      
  <div class="sign-in-content-table">
    <div class="content">
      <div class="title">帳號</div>
      <div class="colon">:</div>
      <input type="text">
    </div>
    <div class="content">
      <div class="title">密碼</div>
      <div class="colon">:</div>
      <input type="password">
    </div>
  </div>    
  <div class="submit">
    <button>提交</button>
  </div>
</div>`
}

// 建立signUpModal
function createSignUpModal() {
  return `<div id="signUpModal" class="sign-up-modal-content">
  <div>
    <button class="modal-close">X</button>
  </div>
  <h3 class="sign-up">註冊</h3>
  <div class="sign-up-content-table">
    <div class="content">
      <div class="title">帳號</div>
      <div class="colon">:</div>
      <input type="text">
    </div>
    <div class="content">
      <div class="title">信箱</div>
      <div class="colon">:</div>
      <input type="text">
    </div>
    <div class="content">
      <div class="title">密碼</div>
      <div class="colon">:</div>
      <input type="password">
    </div>
    <div class="content">
      <div class="title">確認密碼</div>
      <div class="colon">:</div>
      <input type="password">
    </div>
  </div>
  <div class="submit">
    <button>提交</button>
  </div>
</div>`
}
