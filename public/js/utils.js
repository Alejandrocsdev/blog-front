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