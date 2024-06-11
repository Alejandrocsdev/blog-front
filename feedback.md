### 2024-05-20 (week 2)

# Elva:

### task007-dark-mode

1. `add` & `remove`

- 除非情況需要,不然classList.add/remove可以使用toggle來處理,只要寫一行

- 使用switchModeIcon()的時候都會搭配body.classList.add/remove,合併到函式內讓程式更簡潔

---

2. `local storage`

- 少紀錄light模式與初始狀態,雖然目前沒有實際影響,但實時的狀態紀錄好處多多,主要在除錯或檢查函式的時候

---

### task015-comment-function

---

1. `target = e.target` 忘記宣告

- 小失誤,雖然javascript是個不嚴謹的語言,但萬一原本要使用const,沒有宣告會變成let. 可以在程式上方加上'use strict'開啟嚴格模式讓自己不要忘記

2. `HTML元素`

- 統一放javascript最上方, 方便整理,命名,檢查重複, 剛好在global.js有用到body, 這邊就可以不用再定義一次了. 雖然妳會把
  const commentBtn = document.querySelector('.comment-btn-container')
  const textArea = document.querySelector('#user-comment')
  放在監聽器裡是因為一開始還選不到這兩個元素,但也可以用target.id/classList去選取

- 由於之後submit按鈕也要設監聽器(包含發送請求), 我建議登入登出狀態的textarea一開始就寫在html, 隱藏的用display: none, 再根據狀態切換, 可以在css添加例如.hide {display: none}, 再用toggle切換, 不然為了選到特定的元素, 很多函式不得不寫在一起, 會比較雜

3. `空陣列('')為null`

- length無法取得null或undefined的值

---

### 2024-05-14 (week 1)

# Alex 更新:

`bootstrap`

- `public/css/bootstrap.min.css`

- `public/js/bootstrap.bundle.min.css`

---

# Yen:

### task001-共用: header

---

1. `<header>`是全部頁面共用的, 所以樣式都設定在global.css.

---

2. `fa-solid`

- 避免選用font awesome圖示的class, 很容易跟其他圖示重複.

---

3. `<nav>`

- 移除`margin: 0 auto;`, 沒有影響.

---

4. `max-height` & `max-width`

- Home鍵跟會員頭像設置height跟width就好了, 保持一致, 除非希望像素太低的圖片顯示小於外框可以加max.

---

5. `Sign in` & `Sign up`

- 未來會分別設置不同的監聽器, class要獨立. 

---

### 待完成: 

- Home鍵導向監聽器

- 按黑模式圖示切換監聽器( 太陽 / 月亮 )

---

### task008-載入字體

---

1. `style.css`

- 每個頁面都有獨立的css, 放在public/css的bootstrap, fonts跟global才是全部html共用的

---

2. `link` & `script`

- link嵌入css並放在head, link嵌入javascript並放在body最下方. Font Awesome連結本來就有了,妳的我拿掉囉~ 不過如果妳有付費帳號的話歡迎說一聲, 哈哈~

---

3. `@font-face`

- 如果字體檔名是VariableFont_wght, 不用特別設定font-weight, 它會根據css設定自動延展, 所以它檔案會比檔名為Regular或Bold大一些. 

- font-family不會包含bold或其他weight名稱. 

- font-style都是normal的話可以不用加, 想要使用italic要使用檔名為Italic-VariableFont_wght的檔案.

- font-optical-sizing似乎影響不大, 有機會可以查查它的應用.

---

4. 切換分支

- 如果要切換分支, 但當下分支已經異動過, 可以先commit或是stash再切換. SourceTree有防範機制, 有任何異動不可以切換分支, 如果是輸入指令切換分支會影響新分支內容.

---

### 其他調整

- Home鍵加上cursor

---

### 2024-05-15 (week 1)

# Momo:

### task026-create頁面

---

1. `<label for=""></label>`

- label的for要對上唯一的id

---

2. `align-items` & `margin`

- 擇一調整

---

### 待完成: 

- 文章標題, 文章類別, 文章內容的label跟id對應清楚

---

### 2024-05-17 (week 1)

# Yen:

### task005-basic-color

---

1. `<img href="home.html">`

- `<img>`沒有`href`屬性, `<a>`才有

---

2. `--tertiary-background-color`

- 沒有對應的dark顏色

---