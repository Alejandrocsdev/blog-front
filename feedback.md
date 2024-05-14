### 2024-05-13 (week 1)

# Alex 更新:

`global.css`

- main加上`padding-top: var(--header-height);`

  main才不會跑到header底下

- 每個頁面的javascript統一改成`main.js`


# Elva:

### task002-home頁面: 主容器+搜索欄+文章容器

---

1. `<main>`

- 通用元素不個別調整 ，避免重複調整樣式且維持一致性

  `<main class="main-wrap">` => `<div class="main-wrap">`

---

2. `<div class="main-wrap">`

- `width: 60%;` => `width: 900px;`

  主容器固定長度方便以後調整 *media-query*

- `padding-top: calc(1em + var(--header-height));`

---

3. `.search-input` & `.search-btn`

- 不需要設定z-index或是right(是跟header有關嗎?)

---

4. `.article-preview-container`

- 不限制高度, 讓文章數決定總高度(因為不知道會渲染幾篇文章, 如果限制每次更新渲染篇數就得另外調整總高度)

- `flex/space-around`: 限制高度又使用space-around的情況話, 渲染文章數不同, 間距也會不同, 因此失去一致性. 總高度800px, 單篇文章高度200px, 這樣最多只能渲染4篇文章且會沒有間距. 可以不設置justify-content只設置margin-top或margin-bottom, 但是這樣top或bottom會多出來一節, 所以我會用grid, 可以設置gap.

### 其他調整

- `.search-btn:hover` 

  加上cursor

- `.article-preview-container` 

  `margin: 1em 0;` => `margin-top: 1em;`

---

### task006-新增工具( utils ) local storage

---

1. 希望不是我講解任務的時候讓妳誤會了, 本次任務只要做出可以存儲local storage的class或是function就可以了. 我會傾向用class, 取名比較清楚. 設計這個工具的目的是避免使用向以下兩個例子冗長的程式:

- `localStorage.setItem('darkMode', isDarkMode.JSON.stringify)`

- `localStorage.getItem('darkMode').JSON.parse`

  以我的作法為例:

- `storage.set('darkMode', isDarkMode)`

- `storage.get('darkMode')`

  但重點是妳會正確使用😊

---

# Yen:

### task008-載入字體

---

1. `style.css`

- 每個頁面都有獨立的css, 放在public/css的fonts跟global才是全部html共用的

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