let loginState = 'Sign_out'




const Sign = document.querySelectorAll('.Sign')
const guest = document.querySelector('.guest')

if (loginState === 'Sign_out') {
  
  Sign.forEach( item =>  item.style.display = 'block' )
  guest.style.display = 'none';
} else if (loginState === 'Sign_in') {
   Sign.forEach( item => item.style.display = 'none' )
   guest.style.display = 'block';
  }







