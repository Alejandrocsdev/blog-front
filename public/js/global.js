// API
const USERS_API = `${BASE_URL}/users`

// HTML元素(header)
const home = document.getElementById('home')
const darkMode = document.getElementById('dark-mode')
const theme = document.getElementById('theme')
const sign = document.getElementById('sign')
const signIn = document.getElementById('sign-in')
const signUp = document.getElementById('sign-up')
const profileDropdown = document.getElementById('profile-dropdown')
const modalBg = document.getElementById('modal-bg')
const modalClose = document.getElementById('modal-close')
const modalForm = document.getElementById('modal-form')
// HTML元素(登入-article)
const memberAvatar = document.querySelector('#member-avatar img')
const memberUsername = document.getElementById('member-username')
const commentSection = document.getElementById('comment-section')
const emptySection = document.getElementById('empty-section')

// 登入狀態
let isLoggedIn = cookie.get('isLoggedIn') || false
// 從cookie取得user
let user = cookie.get('user') || ''
// 從cookie取得token
let token = cookie.get('token') || ''
// 彈跳窗類別
let modalType
console.log('<<<共用參數>>>')
console.log('登入狀態: ', isLoggedIn)
console.log('會員資訊: ', user)
console.log('會員憑證: ', token)
console.log('視窗類別: ', modalType || '')
console.log('\n')

// 初始函式
;(function init() {
  // local storage預設light模式
  setTheme()
  // 監聽器: Home鍵
  home.addEventListener('click', onRedirectHome)
  // 監聽器: 黑暗模式切換
  darkMode.addEventListener('click', onToggleMode)
  // 監聽器: 登入/註冊 彈跳窗
  sign.addEventListener('click', onSigningModal)
  // 監聽器: 登入/註冊 彈跳窗 開/關
  modalClose.addEventListener('click', onToggleModal)
  // 監聽器: 登入/註冊 彈跳窗 提交表單
  modalForm.addEventListener('submit', modalSubmit)
  // 監聽器: 會員選單
  profileDropdown.addEventListener('click', onProfile)
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

// #監聽器函式: 登入/註冊 彈跳窗
function onSigningModal(event) {
  const target = event.target
  if (target.id === 'sign-in' || target.id === 'sign-up') {
    modalType = target.id === 'sign-in' ? '登入' : '註冊'
    modalForm.innerHTML = createModal(modalType)
    onToggleModal()
  }
}

// #監聽器函式: 登入/註冊 彈跳窗 開/關
function onToggleModal() {
  modalBg.classList.toggle('hide')
}

// #監聽器函式: 登入/註冊 彈跳窗 提交表單
function modalSubmit(event) {
  event.preventDefault()

  const formData = new FormData(event.target)

  const username = formData.get('username')
  const email = formData.get('email')
  const password = formData.get('password')
  const rePassword = formData.get('re-password')

  const registerBody = { username, email, password }
  const loginBody = { username, password }

  modalType === '註冊' ? registerRequest(registerBody) : loginRequest(loginBody)
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
    logoutRequest()
    console.log('logout')
  }
}

// 註冊請求
function registerRequest(body) {
  axios.post(`${USERS_API}/register`, body).then((response) => {
    const data = response.data
    console.log(data)
    console.log('註冊成功')
    // 切換到登入modal
    modalType = '登入'
    modalForm.innerHTML = createModal(modalType)
  })
}

// 登入請求
function loginRequest(body) {
  axios
    .post(`${USERS_API}/login`, body)
    .then((response) => {
      const data = response.data
      token = data.token
      cookie.set('token', token)
      cookie.set('user', data.user)
      user = cookie.get('user')
      cookie.set('isLoggedIn', true)
      isLoggedIn = true
      console.log('登入成功')
      console.log(data)
      // 切換到頁面
      modalType = ''
      onToggleModal()
      // 切換登入登出按鈕
      switchSignButtons()
      // 根據登入狀態渲染會員資料
      updateState()
    })
    .catch((error) => {
      const errorMessage = error.response.data.message
      console.error(errorMessage)
    })
}

// 登出請求
function logoutRequest() {
  axios
    .post(`${USERS_API}/logout`, {}, { headers: { Authorization: `Bearer ${token}` } })
    .then(() => {
      cookie.remove('token')
      cookie.remove('user')
      cookie.remove('isLoggedIn')
      isLoggedIn = false
      console.log('登出成功')
      // 切換登入登出按鈕
      switchSignButtons()
      // 根據登入狀態渲染會員資料
      updateState()
    })
    .catch((error) => {
      console.error('登出失敗', error)
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

// 切換登入登出按鈕
function switchSignButtons() {
  profileDropdown.classList.toggle('hide')
  signIn.classList.toggle('hide')
  signUp.classList.toggle('hide')
}

// 更新登入狀態
function updateState() {
  const pathname = window.location.pathname
  if (pathname === '/article/index.html') {
    updateArticlePageView()
  } else if (pathname !== '/article/index.html' && pathname !== '/home/index.html') {
    window.location.href = '../home/index.html'
  }
}

// 更新登入狀態樣式
function updateArticlePageView() {
  memberAvatar.src = isLoggedIn ? user.avatar : '../public/images/guest/guest.png'
  memberUsername.textContent = isLoggedIn ? user.username : 'Guest'
  emptySection.style.display = isLoggedIn ? 'none' : 'flex'
  commentSection.style.display = isLoggedIn ? 'inline-block' : 'none'
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
  return `<h1 id="modal-name">${name}</h1>
    ${createLabeledInput('username', '帳號')}
    ${name === '註冊' ? createLabeledInput('email', '信箱') : ''}
    ${createLabeledInput('password', '密碼', 'password')}
    ${name === '註冊' ? createLabeledInput('re-password', '確認密碼', 'password') : ''}
    <button id="submit" type="submit">提交</button>`
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
