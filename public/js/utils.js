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
