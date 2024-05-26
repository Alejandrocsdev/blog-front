'use strict'

// <<<---BODY--->>>
const body = document.body
// <<<---HEADER--->>>
// 主題模式
const mode = document.querySelector('.mode i')
// 登入 / 註冊
const sign = document.querySelector('.sign')
// 會員頭像
const profile = document.querySelector('.profile')
// 臨時登入切換按鈕
const loginSwitch = document.getElementById('login-switch')
// 彈跳窗背景
const modalBg = document.querySelector('.modal-bg')
const modalClose = modalBg.querySelector('.modal-close')
const modalForm = modalBg.querySelector('.modal-form')
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
  // 開啟: 彈跳窗(登入 & 註冊)
  sign.addEventListener('click', onSignButton)
  // 關閉: 彈跳窗(登入 & 註冊)
  modalClose.addEventListener('click', () => modalBg.classList.toggle('hidden'))
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

// 監聽器函式: 彈跳窗(登入 & 註冊)
function onSignButton(event) {
  const target = event.target
  if (target.classList.contains('sign-in')) {
    modalForm.action = '/users/login'
    modalForm.innerHTML = createModal('登入')
  } else if (target.classList.contains('sign-up')) {
    modalForm.action = '/users/register'
    modalForm.innerHTML = createModal('註冊')
  }
  modalBg.classList.toggle('hidden')
}

// 新增彈跳窗元素
function createModal(type) {
  return `<h1 class="modal-name">註冊</h1>
  ${createInput('username', '帳號', 'text')}
  ${type === '登入'? '' : createInput('email', '信箱', 'text')}
  ${createInput('password', '密碼', 'password')}
  ${type === '登入'? '' : createInput('re-password', '確認密碼', 'password')}
  <button class="modal-submit" type="submit">提交</button>`
}

// 新增輸入框元素
function createInput(attr, label, type) {
  return `<div>
    <label for="${attr}">${label}</label>
    <span class="colon">:</span>
    <input id="${attr}" name="${attr}" type="${type}">
  </div>`
}
