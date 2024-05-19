// HTML元素
const signIn = document.querySelector('.sign-in')
const signUp = document.querySelector('.sign-up')
const guest = document.querySelector('.guest')
const mode = document.querySelector('.darkmode')

// 變數
let loginState = 'Sign_out'

// 初始函式
;(function init() {
  // 切換登入/登出樣式
  toggleLoginView()
  // 切換暗黑模式圖示
  mode.addEventListener('click', onDarkMode)
})()

// 監聽器函式: 切換暗黑模式圖示
function onDarkMode(event) {
  let target = event.target
  target.classList.toggle('fa-sun')
  target.classList.toggle('fa-moon')
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
