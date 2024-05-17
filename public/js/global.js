let loginState = 'Sign_out'

const signIn = document.querySelector('.sign-in')
const signUp = document.querySelector('.sign-up')
const guest = document.querySelector('.guest')

if (loginState === 'Sign_out') {
  signIn.style.display = 'block'
  signUp.style.display = 'block'
  guest.style.display = 'none'
} else if (loginState === 'Sign_in') {
  signIn.style.display = 'none'
  signUp.style.display = 'none'
  guest.style.display = 'block'
}

const mode = document.querySelector('.darkmode')
mode.addEventListener('click', function (event) {
  let target = event.target
  target.classList.toggle('fa-sun')
  target.classList.toggle('fa-moon')
})
