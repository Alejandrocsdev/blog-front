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



const mode = document.querySelector('.darkmode')
mode.addEventListener("click", function (event) {
  let target = event.target;
  target.classList.toggle("fa-sun"); // 切換 fa-sun 類名
  target.classList.toggle("fa-moon"); // 切換 fa-moon 類名
  
})





