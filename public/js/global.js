'use strict'

// HTML元素
const nav = document.querySelector('#navigation')
const signIn = document.querySelector('.sign-in')
const signUp = document.querySelector('.sign-up')
const guest = document.querySelector('.guest')
const mode = document.querySelector('.darkmode')
const body = document.body

const logInComment = document.querySelector('.log-in-comment')
const logOutComment = document.querySelector('.log-out-comment')

const loginSwitch = document.getElementById('login-switch')

// 變數
let isLoggedIn = cookie.get('isLoggedIn') || false
console.log('isLoggedIn: ', isLoggedIn)

// 初始函式
;(function init() {
  // 切換登入/登出樣式
  toggleLoginView()
  // 切換暗黑模式圖示
  mode.addEventListener('click', onDarkMode)
  // 切換登入狀態
  loginSwitch.addEventListener('click', onSwitchState)
})()

function onDarkMode(event) {
  let target = event.target
  target.classList.toggle('fa-sun')
  target.classList.toggle('fa-moon')
}

// 其他函式: 切換登入/登出樣式
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

function setLoginState() {
  isLoggedIn ? (loginSwitch.textContent = '登入') : (loginSwitch.textContent = '登出')
  cookie.set('isLoggedIn', isLoggedIn)
  console.log(isLoggedIn)
}

function onSwitchState() {
  if (isLoggedIn) {
    loginSwitch.textContent = '登出'
    isLoggedIn = false
  } else {
    loginSwitch.textContent = '登入'
    isLoggedIn = true
  }
  updateState()
  cookie.set('isLoggedIn', isLoggedIn)
  console.log(isLoggedIn)
}

// 更新登入狀態
function updateState() {
  const pathname = window.location.pathname
  if (pathname === '/article/index.html') {
    switchCommentArea()
  } 
}

function switchCommentArea() {
  if (isLoggedIn) {
    logInComment.classList.add('hidden')
    logOutComment.classList.remove('hidden')
  } else {
    logInComment.classList.remove('hidden')
    logOutComment.classList.add('hidden')
  }
}