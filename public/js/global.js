'use strict'

// HTML元素
const nav = document.querySelector('#navigation')
const signIn = document.querySelector('.sign-in')
const signUp = document.querySelector('.sign-up')
const guest = document.querySelector('.guest')
const body = document.body

// 變數
let isLoggedIn = cookie.get('isLoggedIn') || false

if (isLoggedIn) {
  signIn.style.display = 'none'
  signUp.style.display = 'none'
  guest.style.display = 'block'
} else {
  signIn.style.display = 'block'
  signUp.style.display = 'block'
  guest.style.display = 'none'
}

const mode = document.querySelector('.darkmode')
mode.addEventListener('click', function (event) {
  let target = event.target
  target.classList.toggle('fa-sun')
  target.classList.toggle('fa-moon')
})
