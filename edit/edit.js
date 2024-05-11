// // API
// const ARTICLES_API = `${BASE_URL}/articles`

// // HTML元素
// const form = document.getElementById('create-form')
// // const submit = document.getElementById('create-submit')

// const token = cookie.get('token') || ''
// const user = cookie.get('user') || ''

// ;(function init() {
//   form.addEventListener('submit', onSubmit)
// })()

// // #監聽器函式: 新增提交
// function onSubmit(event) {
//   event.preventDefault()

//   const formData = new FormData(event.target)

//   const title = formData.get('title')
//   const categories = []

//   for (let i = 0; i < 3; i++) {
//     const category = formData.get(`category_0${i + 1}`)
//     if(category) {
//       categories.push(category)
//     }
//   }

//   const content = formData.get('content')

//   const id = user.id

//   const body = { user: id, title, categories, content }

//   createRequest(body)
// }

// function createRequest(body) {
//   axios
//     .post(`${ARTICLES_API}/${article_id}/edit`, body, { headers: { Authorization: `Bearer ${token}` } })
//     .then((response) => {
//       console.log(response.data)
//     })
//     .catch((error) => {
//       console.error(error)
//     })
// }