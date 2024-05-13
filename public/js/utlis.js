// Local Storage
class Storage {
  // 儲存
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  // 取得
  get(key) {
    const value = JSON.parse(localStorage.getItem(key))
    return value
  }
}

// 宣告Storage實例
const storage = new Storage()

// 按鈕: 記住我的帳號
const btnSet = document.querySelector('#btn-set')
// 按鈕: 登入
const btnSingIn = document.querySelector('#btn-sign-in')
const userList = document.querySelector('#user-list')

// 按鈕: 夜間模式
const btnDarkMode = document.querySelector('#btn-dark-mode')
const btnLightMode = document.querySelector('#btn-light-mode')
const lightModeTags = document.querySelectorAll('.lightMode')
let isDarkMode = false 

//存取使用者帳號
function saveUserId() {
  userId = document.querySelector('#user-Id').value
  localStorage.setItem('userId', userId)
  }

//顯示使用者帳號
function callUserId() {
  let nowUserId = localStorage.getItem('userId')
  userList.value = nowUserId
}

//存取夜間模式
function saveDarkMode () {
  isDarkMode = true
  localStorage.setItem('darkMode', isDarkMode.JSON.stringify)
}


//讀取並顯示夜間模式
function showDarkMode () {
  if ( localStorage.getItem('darkMode').JSON.parse === true ) {
    lightModeTags.forEach((tag) => {
      tag.classList.remove('lighten-mode')
      tag.classList.add('dark-mode')
    })
  }
}

//移除夜間模式
function removeDarkMode () {
  localStorage.removeItem('darkMode')
}

//監聽按鈕: 記住我的帳號
btnSet.addEventListener('click', saveUserId)

//監聽按鈕: 登入
btnSingIn.addEventListener('click', callUserId)

//監聽按鈕: 夜間模式
btnDarkMode.addEventListener('click', saveDarkMode)
btnDarkMode.addEventListener('click', showDarkMode)
//監聽按鈕: 日間模式
btnLightMode.addEventListener('click', removeDarkMode)