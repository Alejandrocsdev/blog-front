'use strict'

// <<<---BODY--->>>
const body = document.body
// <<<---HEADER--->>>
// 主題模式
const mode = document.querySelector('.mode i')
// 登入 / 註冊
const sign = document.querySelector('.sign')
const signIn = document.querySelector('.sign-in')
const signUp = document.querySelector('.sign-up')
// 會員頭像
const profile = document.querySelector('.profile')
// 臨時登入切換按鈕
const loginSwitch = document.getElementById('login-switch')
// 彈跳窗背景
const modalBg = document.querySelector('.modal-bg')
// <<<---ARTICLE頁面--->>>
// 用戶留言區(登入中)
const logInComment = document.querySelector('.log-in-comment')
// 用戶留言區(未登入)
const logOutComment = document.querySelector('.log-out-comment')

// 初始變數/cookie/storage
// 主題模式
if (!storage.get('theme')) storage.set('theme', 'light')
let theme = storage.get('theme')
console.log('主題模式: ', theme)
// 登入狀態
if (!cookie.get('isLoggedIn')) cookie.set('isLoggedIn', false)
let isLoggedIn = cookie.get('isLoggedIn')
console.log('登入狀態: ', isLoggedIn)
// 當前路徑
const pathname = window.location.pathname

// 初始函式
;(function init() {
  // 設定主題模式
  setTheme()
  // 設定登入樣式
  setView()
  // 切換主題模式
  mode.addEventListener('click', onToggleTheme)
  // 切換登入狀態
  loginSwitch.addEventListener('click', onToggleView)
})()

// 設定主題模式
function setTheme() {
  if (theme === 'light') {
    // light模式
    mode.classList.toggle('fa-sun')
  } else {
    // dark模式
    mode.classList.toggle('fa-moon')
    body.classList.toggle('dark')
  }
}

// 設定登入樣式
function setView() {
  // article頁面樣式
  if (pathname === '/article/index.html') {
    isLoggedIn ? logInComment.classList.toggle('hidden') : logOutComment.classList.toggle('hidden')
  }
  // header樣式
  isLoggedIn ? sign.classList.toggle('hidden') : profile.classList.toggle('hidden')
  // 臨時登入切換按鈕
  loginSwitch.textContent = isLoggedIn ? '登入中' : '未登入'
}

// 監聽器函式: 切換主題模式
function onToggleTheme() {
  // 儲存模式
  theme = theme === 'light' ? 'dark' : 'light'
  storage.set('theme', theme)
  console.log('主題模式: ', theme)
  // 切換模式
  mode.classList.toggle('fa-sun')
  mode.classList.toggle('fa-moon')
  body.classList.toggle('dark')
}

// 監聽器函式: 切換登入樣式
function onToggleView() {
  // 儲存狀態
  isLoggedIn = isLoggedIn ? false : true
  cookie.set('isLoggedIn', isLoggedIn)
  console.log('登入狀態: ', isLoggedIn)
  // 切換article頁面樣式
  if (pathname === '/article/index.html') {
    logInComment.classList.toggle('hidden')
    logOutComment.classList.toggle('hidden')
  }
  // 切換header樣式
  sign.classList.toggle('hidden')
  profile.classList.toggle('hidden')
  // 切換臨時登入切換按鈕
  loginSwitch.textContent = isLoggedIn ? '未登入' : '登入中'
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
