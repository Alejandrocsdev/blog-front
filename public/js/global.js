// API
const USERS_API = `${BASE_URL}/users`

// HTML元素
const home = document.getElementById('home')
const darkMode = document.getElementById('dark-mode')
const theme = document.getElementById('theme')
const sign = document.getElementById('sign')
const modalBg = document.createElement('div')

const memberAvatar = document.getElementById('member-avatar')
const memberUsername = document.getElementById('member-username')

// 登入狀態
let isLoggedIn = cookie.get('isLoggedIn') || false
console.log('登入狀態: ', isLoggedIn)
console.log('\n')

// 從cookie取得user
let user = cookie.get('user') || ''

// 初始函式
;(function init() {
  // local storage預設light模式
  setTheme()
  // 監聽器: Home鍵
  home.addEventListener('click', onRedirectHome)
  // 監聽器: 黑暗模式切換
  darkMode.addEventListener('click', onToggleMode)
  // 根據登入狀態渲染navbar按鈕
  renderSignButtons(isLoggedIn)
})()

// #監聽器函式: Home鍵
function onRedirectHome() {
  const currentPath = window.location.href
  const fileName = currentPath.split('/').slice(-1)[0]

  // 從cookie移除keyword & filter
  cookie.remove('keyword')
  cookie.remove('filter')

  // 導向home頁面
  window.location.href = '../home/index.html'
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

// #監聽器函式: 會員選單
function onProfile(event) {
  const target = event.target
  if (target.id === 'profile') {
    window.location.href = '../profile/index.html'
  } else if (target.id === 'create') {
    window.location.href = '../create/index.html'
  } else if (target.id === 'edit') {
    window.location.href = '../edit/index.html'
  } else if (target.id === 'logout') {
    console.log(logout)
  }
}

// 登入/註冊: 提交
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

// 註冊請求
function registerRequest(body) {
  axios.post(`${USERS_API}/register`, body).then((response) => {
    const data = response.data
    console.log(data)
    console.log('註冊成功')
    // 切換到登入modal
    modalBg.innerHTML = createModal('登入')
    modalBg.id = 'modal-bg'
    document.body.appendChild(modalBg)
  })
}

// 登入請求
function loginRequest(body) {
  axios
    .post(`${USERS_API}/login`, body)
    .then((response) => {
      const data = response.data
      const token = data.token
      cookie.set('token', token)
      cookie.set('user', data.user)
      user = cookie.get('user')
      cookie.set('isLoggedIn', true)
      isLoggedIn = true
      console.log('登入成功')
      console.log(data)
      // 切換到頁面
      modalBg.remove()
      // 根據登入狀態渲染navbar按鈕
      renderSignButtons(isLoggedIn)
      // 根據登入狀態渲染會員資料
      updateState()
    })
    .catch((error) => {
      const errorMessage = error.response.data.message
      console.error(errorMessage)
    })
}

// 登出請求
// function logoutRequest(body) {
//   axios
//     .post(`${USERS_API}/login`, body)
//     .then((response) => {
//       const data = response.data
//       const token = data.token
//       const user = data.user
//       cookie.set('token', token)
//       cookie.set('user', user)
//       cookie.set('isLoggedIn', true)
//       isLoggedIn = true
//       console.log('登入成功')
//       console.log(data)
//       // 切換到頁面
//       modalBg.remove()
//       // 根據登入狀態渲染navbar按鈕
//       renderSignButtons(isLoggedIn)
//     })
//     .catch((error) => {
//       const errorMessage = error.response.data.message
//       console.error(errorMessage)
//     })
// }

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

function renderSignButtons(state) {
  sign.innerHTML = createSignButtons(state)
  if (state) {
    const profileDropdown = document.getElementById('profile-dropdown')
    profileDropdown.addEventListener('click', onProfile)
  } else {
    // 監聽器: 登入 彈跳窗
    const signIn = document.getElementById('sign-in')
    signIn.addEventListener('click', onSigningModal('登入'))
    // 監聽器: 註冊 彈跳窗
    const signUp = document.getElementById('sign-up')
    signUp.addEventListener('click', onSigningModal('註冊'))
  }
}

// 新增: 登入/註冊按鈕HTML字串
function createSignButtons(state) {
  if (state) {
    const user = cookie.get('user')
    const avatar = user.avatar
    return `<div id="profile-dropdown">
    <div id="profile-avatar">
      <img src="${avatar}">
    </div>
    <div id="dropdown-content">
      <div id="profile">後台</div>
      <div id="create">撰寫</div>
      <div id="logout">登出</div>
    </div>
  </div>`
  } else {
    return `<div id="sign-in">
    Sign In
  </div>
  <div id="sign-up">
    Sign Up
  </div>`
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

function updateState() {
  const pathname = window.location.pathname
  if(pathname === '/article/index.html') {
    renderMemberInfo()
  }
}

// 渲染會員資料
function renderMemberInfo() {
  memberAvatar.src = user.avatar
  memberUsername.textContent = user.username
}
