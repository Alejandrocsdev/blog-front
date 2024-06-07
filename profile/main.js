'use strict'

// API
const ARTICLES_URL = `${BASE_URL}/articles`

// HTML元素
const userAvatar = document.querySelector('#user-avatar')
const fileUploader = document.querySelector('#file-uploader')
const account = document.querySelector('.user-account')
const email = document.querySelector('.user-email')


let id = user.id


// 初始函式
;(function init() {
getUserdata()
fileUploader.addEventListener('change', onSubmit)

userAvatar.addEventListener('click', function() {
  fileUploader.click()})

})()


// 更新user資料
function getUserdata() {
  user = cookie.get('user') || ''
  if (user.avatar) {
  //頭像設置
  userAvatar.src = user.avatar
  avatar.src =  user.avatar
  }
//會員資料設置
account.textContent = user.username
email.textContent = user.email
  
}



//上傳頭像至後端
function onSubmit(event) {
  if (event) {
    event.preventDefault()
  }
  const file = fileUploader.files[0]
  if (file) {
    let formData = new FormData()
    formData.append('file', file)

    axios
    .patch(`${BASE_URL}/users/${id}/upload`, formData, {
      
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
      
    })

    .then(data => {

        console.log('Success:', data)
        alert('圖片上傳成功!')
        cookie.set('user', data.data.user)
        console.log('已更新cookie')
        getUserdata()

    })
    .catch(error => {
        console.error('Error:', error)
        alert('圖片上傳失敗')
    })
} else {
    alert('請選擇圖片')

  }

}

