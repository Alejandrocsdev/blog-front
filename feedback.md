### 2024-05-13

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
