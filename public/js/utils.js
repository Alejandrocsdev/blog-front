const BASE_URL = 'http://localhost:5000/v1'

class Storage {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get(key) {
    const value = JSON.parse(localStorage.getItem(key))
    return value
  }
}

const storage = new Storage()

class Cookie {
  constructor() {
    this.name = 'data'
    this.obj = this.get(this.name) || {}
    this.options = 'secure=true; samesite=none; path=/'
  }

  set(key, value) {
    key === this.name ? (this.obj = value) : (this.obj[key] = value)
    document.cookie = `${this.name}=${JSON.stringify(this.obj)}; ${this.options}`
  }

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

  remove(key) {
    delete this.obj[key]
    this.set(this.name, this.obj)
  }
}

const cookie = new Cookie()
