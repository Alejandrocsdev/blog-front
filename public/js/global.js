const home = document.getElementById('home')
const darkMode = document.getElementById('dark-mode')

init()

function init() {
  home.addEventListener('click', backToHome)
  darkMode.addEventListener('click', toggleDarkMode)
}

function backToHome(event) {
  const target = event.target
  if (target.id === 'home' || target.tagName === 'IMG') {
    const currentPath = window.location.href
    const fileName = currentPath.split('/').slice(-1)[0]
    if (fileName === 'home.html') {
      window.location.href = currentPath
    } else {
      window.location.href = '../home/home.html'
    }
  }
}

function toggleDarkMode(event) {
  const target = event.target
  const icon = darkMode.children[0]
  if (target.id === 'dark-mode' || target.tagName === 'I') {
    icon.classList.toggle('fa-sun')
    icon.classList.toggle('fa-moon')
  }
}
