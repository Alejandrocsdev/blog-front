// API
const USERS_API = `${BASE_URL}/users`

// HTML元素
const home = document.getElementById('home')
const darkMode = document.getElementById('dark-mode')
const theme = document.getElementById('theme')
const signIn = document.getElementById('sign-in')
const signUp = document.getElementById('sign-up')
const modalBg = document.createElement('div')

// 初始函式
;(function headerInit() {
  // local storage預設light模式
  setTheme()
  // 監聽器: Home鍵
  home.addEventListener('click', onRedirectHome)
  // 監聽器: 黑暗模式切換
  darkMode.addEventListener('click', onToggleMode)
  // 監聽器: 登入 彈跳窗
  signIn.addEventListener('click', onSigningModal('登入'))
  // 監聽器: 註冊 彈跳窗
  signUp.addEventListener('click', onSigningModal('註冊'))
})()

// #監聽器函式: Home鍵
function onRedirectHome() {
  const currentPath = window.location.href
  const fileName = currentPath.split('/').slice(-1)[0]

  // 從cookie移除keyword & filter
  cookie.remove('keyword')
  cookie.remove('filter')

  if (fileName === 'home.html') {
    // 刷新
    window.location.href = currentPath
  } else {
    // 導向home頁面
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

// #監聽器函式: 註冊 & 登入 彈跳窗
function onSigningModal(type) {
  return () => {
    modalBg.innerHTML = createModal(type)
    modalBg.id = 'modal-bg'
    document.body.appendChild(modalBg)

    const modalClose = document.getElementById('modal-close')
    modalClose.addEventListener('click', () => modalBg.remove())

    const modalForm = document.getElementById('modal-form')
    modalForm.addEventListener('submit', (event) => modalSubmit(event, type))
  }
}

function modalSubmit(event, type) {
  event.preventDefault()

  const formData = new FormData(event.target)

  const username = formData.get('username')
  const email = formData.get('email')
  const password = formData.get('password')
  const rePassword = formData.get('re-password')

  const registerBody = { username, email, password }
  const loginBody = { username, password }

  type === '註冊' ? registerRequest(registerBody) : loginRequest(loginBody)
}

function registerRequest(body) {
  axios.post(`${USERS_API}/register`, body).then((response) => {
    const data = response.data
    console.log('註冊成功')
    console.log(`用戶ID: ${data}`)
  })
}

function loginRequest(body) {
  axios.post(`${USERS_API}/login`, body).then((response) => {
    const data = response.data
  })
}

// 黑暗模式圖示切換
function toggleMode() {
  const icon = darkMode.children[0]
  // toggle icon
  icon.classList.toggle('fa-sun')
  icon.classList.toggle('fa-moon')
  // toggle theme
  theme.classList.toggle('dark')
}

// 黑暗模式切換(local storage)
function setTheme() {
  if (!storage.get('theme')) {
    storage.set('theme', 'light')
  } else if (storage.get('theme') === 'dark') {
    toggleMode()
  }
}

// 新增: 彈跳窗HTML字串
function createModal(name) {
  return `<div id="modal">
<form id="modal-form">
    <button id="modal-close" type="button">X</button>
    <h1 id="modal-name">${name}</h1>
    ${createLabeledInput('username', '帳號')}
    ${name === '註冊' ? createLabeledInput('email', '信箱') : ''}
    ${createLabeledInput('password', '密碼', 'password')}
    ${name === '註冊' ? createLabeledInput('re-password', '確認密碼', 'password') : ''}
    <button id="submit" type="submit">提交</button>
  </form>
</div>`
}

// 新增: 彈跳窗共用input欄位HTML字串
function createLabeledInput(id, text, type = 'text') {
  return `<div>
  <label for="${id}">${text}</label>
  <span>:</span>
  <input id="${id}" name="${id}" type="${type}">
</div>`
}

// 新增(home / article): category元素
function createCategories(data) {
  let htmlContent = ''
  data.forEach((categories) => {
    htmlContent += `<span class="category" data-filter="categories">${categories.category}</span>`
  })

  return htmlContent
}
