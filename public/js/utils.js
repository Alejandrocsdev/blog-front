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

let data = { articleId: 1, categoryId: 1 }
document.cookie = `data=${JSON.stringify(data)}; secure=true; SameSite=none; path=/`

// // Cookie
// class Cookie {
//   constructor() {
//     // cookie名稱
//     this.name = 'data'
//     // 同步當前內容
//     this.obj = this.get(this.name) || {}
//     // cookie參數
//     this.options = 'secure=true; samesite=none; path=/'
//   }

//   // 儲存
//   set(key, value) {
//     key === this.name ? (this.obj = value) : (this.obj[key] = value)
//     document.cookie = `${this.name}=${JSON.stringify(this.obj)}; ${this.options}`
//   }

//   // 取得
//   get(key) {
//     const data = document.cookie
//     const value = data.split('=')[1]
//     if (value) {
//       const parsedValue = JSON.parse(value)
//       return key === this.name ? parsedValue : parsedValue[key]
//     } else {
//       return undefined
//     }
//   }

//   // 刪除
//   remove(key) {
//     delete this.obj[key]
//     this.set(this.name, this.obj)
//   }
// }

// // 宣告Cookie實例
// const cookie = new Cookie()
