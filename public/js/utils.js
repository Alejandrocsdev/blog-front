// 起始網址
const BASE_URL = 'http://localhost:5000/v1'
// API
const ARTICLE_URL = `${BASE_URL}/articles`


// filter
const filterApi ={offset: 0,size: 10,keyword: '',filter: ''}
let API_URL =`${ARTICLE_URL}?offset=${filterApi.offset}&size=${filterApi.size}&keyword=${filterApi.keyword}&filter=${filterApi.filter}`


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

// 宣告實例
const storage = new Storage()

// Cookie
class Cookie {
  constructor() {
    // cookie名稱
    this.name = 'data'
    // 同步當前內容
    this.obj = this.get(this.name) || {}
    // cookie參數
    this.options = 'secure=true; samesite=none; path=/'
  }

  // 儲存
  set(key, value) {
    key === this.name ? (this.obj = value) : (this.obj[key] = value)
    document.cookie = `${this.name}=${JSON.stringify(this.obj)}; ${this.options}`
  }

  // 取得
  get(key) {
    const data = document.cookie
    const value = data.split('=')[1]
    if (value) {
      const parsedValue = JSON.parse(value)
      return key === this.name ? parsedValue : parsedValue[key]
    } else {
      return undefined
    }
  }

  // 刪除
  remove(key) {
    delete this.obj[key]
    this.set(this.name, this.obj)
  }
}

// 宣告實例
const cookie = new Cookie()
