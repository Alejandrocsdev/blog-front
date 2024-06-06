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

})()


// 設置user資料
function getUserdata() {
 
  if (user.avatar) {
  //頭像設置
  user = cookie.get('user')
  userAvatar.src = user.avatar
  avatar.src =  user.avatar
  }
//會員資料設置
account.textContent = user.username
email.textContent = user.email
  
}


//監聽器-及時更改頭像
fileUploader.addEventListener('change', (e) => {
  // get file object
  const file = e.target.files[0]
  console.log(file)

    if (file) {
      const reader = new FileReader()
      reader.onload = function(e) {
          userAvatar.src = e.target.result
          avatar.src = e.target.result
      }
      reader.readAsDataURL(file)
      uploadImage()


  }
})

//上傳頭像至後端
function uploadImage() {
  const file = fileUploader.files[0]

    if (file) {
      let form = new FormData()
      form.append('file', file)
// fetchAPI
      fetch(`${BASE_URL}/users/${id}/upload`, {
        method: 'PATCH',
        headers: {
                'Authorization': `Bearer ${token}`
        },
        body: form,
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data)
          alert('Image uploaded successfully!')
      })
      .catch(error => {
          console.error('Error:', error)
          alert('Failed to upload image')
      })
  } else {
      alert('Please select an image file first')

    }

}



