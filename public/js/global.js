let loginState = 'Sign_out'

const signIn = document.querySelector('.sign-in')
const signUp = document.querySelector('.sign-up')
const guest = document.querySelector('.guest')

const mode = document.querySelector('.darkmode')
const body = document.querySelector('body')

if (loginState === 'Sign_out') {
  signIn.style.display = 'block'
  signUp.style.display = 'block'
  guest.style.display = 'none'
} else if (loginState === 'Sign_in') {
  signIn.style.display = 'none'
  signUp.style.display = 'none'
  guest.style.display = 'block'
}

//init function
;(function init() {
  if( storage.get("theme") === 'dark' ) {
    switchModeIcon ()
    body.classList.add('dark')
  }
})()

//listen to mode btn
mode.addEventListener('click', function (event) {
  let target = event.target
  switchModeIcon ()
  // dark mode style and set key to local storage
  if ( target.classList.contains('fa-moon') ){  
    body.classList.add('dark')
    storage.set("theme", "dark")
  } else {
    body.classList.remove('dark')
    storage.remove("theme")
  }
})

//switch mode icon function
function switchModeIcon () {
  mode.classList.toggle('fa-sun')
  mode.classList.toggle('fa-moon')
}



