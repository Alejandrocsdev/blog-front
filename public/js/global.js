// HTML元素
const signIn = document.querySelector('.sign-in')
const signUp = document.querySelector('.sign-up')
const guest = document.querySelector('.guest')
const mode = document.querySelector('.darkmode')
const body = document.body

// 變數
let loginState = 'Sign_out'

// 初始函式
;(function init() {
  // 設定暗黑模式狀態
  setTheme()
  // 切換登入/登出樣式
  toggleLoginView()
  // 監聽器: 切換暗黑模式
  mode.addEventListener('click', onToggleMode)
})()

// 監聽器函式: 切換暗黑模式
function onToggleMode(event) {
  const target = event.target
  toggleModeIcon()
  if (target.classList.contains('fa-moon')) {
    storage.set('theme', 'dark')
  } else {
    storage.set('theme', 'light')
  }
}

// 其他函式: 切換暗黑模式圖示
function toggleModeIcon() {
  // 切換圖示
  mode.classList.toggle('fa-sun')
  mode.classList.toggle('fa-moon')
  // 切換主題
  body.classList.toggle('dark')
}

// 其他函式: 設定暗黑模式狀態
function setTheme() {
  if (!storage.get('theme')) {
    storage.set('theme', 'light')
  } else if (storage.get('theme') === 'dark') {
    toggleModeIcon()
    storage.set('theme', 'dark')
  }
}

// 其他函式: 切換登入/登出樣式
function toggleLoginView() {
  if (loginState === 'Sign_out') {
    signIn.style.display = 'block'
    signUp.style.display = 'block'
    guest.style.display = 'none'
  } else if (loginState === 'Sign_in') {
    signIn.style.display = 'none'
    signUp.style.display = 'none'
    guest.style.display = 'block'
  }
}
