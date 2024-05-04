const home = document.getElementById('home')
const darkMode = document.getElementById('dark-mode')
const theme = document.getElementById('theme')

;(function init() {
  // local storage 預設為light模式
  setTheme()
  home.addEventListener('click', onRedirectHome)
  darkMode.addEventListener('click', onToggleMode)
})()

// #監聽器函式: Home鍵
function onRedirectHome() {
  const currentPath = window.location.href
  const fileName = currentPath.split('/').slice(-1)[0]
  if (fileName === 'home.html') {
    window.location.href = currentPath
  } else {
    window.location.href = '../home/home.html'
  }
}

// #監聽器函式: 黑暗模式切換
function onToggleMode() {
  toggleMode()
  if (storage.get('theme') === 'light') {
    storage.set('theme', 'dark')
  } else if (storage.get('theme') === 'dark') {
    storage.set('theme', 'light')
  }
}

// 其他函式: 黑暗模式圖示切換
function toggleMode() {
  const icon = darkMode.children[0]
  // toggle icon
  icon.classList.toggle('fa-sun')
  icon.classList.toggle('fa-moon')
  // toggle theme
  theme.classList.toggle('dark')
}

// 其他函式: 黑暗模式切換(local storage)
function setTheme() {
  if (!storage.get('theme')) {
    storage.set('theme', 'light')
  } else if (storage.get('theme') === 'dark') {
    toggleMode()
  }
}
