# 後端SERVER

- [Github連結](https://github.com/Alejandrocsdev/blog-back)

- 本地開啟main分支

- 第一次執行:

```
npm install
```

- 每次開啟SERVER執行:

```
npm run dev
```

# Directories

```
.
├── home
|   ├── index.html
|   ├── style.css
|   └── main.js
├── ...(other pages)
|   ├── index.html
|   ├── style.css
|   └── main.js
└── public
    ├── css
    |   ├── bootstrap.min.css
    |   ├── fonts.css
    |   └── global.css
    ├── js
    |   ├── bootstrap.bundle.min.js
    |   ├── utils.js
    |   └── global.js
    ├── fonts
    |   ├── NotoSansTC-VariableFont_wght.woff2
    |   └── ...(other fonts)
    └── images
        ├── logo
        |   ├── logo.png
        |   └── logo.svg
        └── guest
            └── guest.png
```
### utils.js

`cookie, local storage ...`

### global.js

`BASE_URL, dark mode, sign in, sign up...`

### global.css

`header, main, footer, home button...`

### fonts.css

`woff2 format fonts...`

# Wireframe

## 1. Home Page

![Home Page](./public/images/wireframe/home.png)

## 2. Article Preview

![Article Preview](./public/images/wireframe/article-preview.png)

## 3. Article Content

![Article Content](./public/images/wireframe/article-content.png)

## 4. Sign In Modal

![Sign In Modal](./public/images/wireframe/sign-in.png)

## 5. Sign Up Modal

![Sign Up Modal](./public/images/wireframe/sign-up.png)

## 6. Comment Section

![Comment Section](./public/images/wireframe/comment-section.png)

## 7. Comment

![Comment](./public/images/wireframe/comment.png)

- 點擊comment(textarea)時, textarea會增加高度, 同時取消與留言按鈕會跑出來.
- 如textarea已被點擊過, 且comment為空, 被點任何其他地方, textarea會縮小, 按鈕也會隱藏
- 如textarea已被點擊過, 且comment不為空, 被點任何其他地方, textarea維持原狀
- 點擊取消按鈕, 清除textarea及縮小欄位

## 8. Paginator

![Paginator](./public/images/wireframe/paginator.png)

## 8. Paginator Detail

![Paginator Detail](./public/images/wireframe/paginator-detail.png)

- 以總頁數10為例
- 顯示頁數: 5
- 1-6頁時, 當下頁數在最左側
- 頁數7-10, 顯示頁數維持在6-10
- 頁數不足5時, 顯示全部頁數

# API

## Articles

### `全部文章`

**URL :** `BASE_URL/articles?offset=XX&size=XX&keyword=XX&filter=XX`

**Request :** `GET`

**Body :**

**Response :**

```
{
  total: XX,
  offset: XX,
  size: XX,
  main: [
    {
      id: XX,
      title: 'XXXXXX',
      picture: 'XXXXXX',
      content: 'XXXXXX',
      user: [
        { 
          id: XX, 
          avatar: 'XXXXXX', 
          username: 'XXXXXX',
          email: 'XXXXXX',
          password: 'XXXXXX'
        }
      ],
      categories: [
        { 
          id: XX, 
          category: 'XXXXXX'
        }
      ]
    }
  ]
}
```

### `單篇文章`

**URL :** `BASE_URL/articles/:id`

**Request :** `GET`

**Body :**

**Response :**

```
[
  {
    id: XX,
    title: 'XXXXXX',
    picture: 'XXXXXX',
    content: 'XXXXXX',
    user: [
      { 
        id: XX, 
        avatar: 'XXXXXX', 
        username: 'XXXXXX',
        email: 'XXXXXX',
        password: 'XXXXXX'
      }
    ],
    categories: [
      { 
        id: XX, 
        category: 'XXXXXX'
      }
    ]
  }
]
```

### `用戶全部文章`

**URL :** `BASE_URL/users/:id/articles`

**Request :** `GET`

**Body :**

**Headers :** `Authorization: `Bearer ${token}`

**Response :**

```
[
  {
    id: XX,
    title: 'XXXXXX',
    picture: 'XXXXXX',
    content: 'XXXXXX',
    user: XX,
    categories: XX
  }
]
```

### `新增文章`

**URL :** `BASE_URL/articles/:id`

**Request :** `POST`

**Body :**

**Headers :** `Authorization: `Bearer ${token}`

**Response :**

```
{
  message: '新增成功',
  article: { 
              id: XX,
              title: 'XXXXXX',
              picture: 'XXXXXX',
              content: 'XXXXXX',
              user: XX,
              categories: XX
            }
}
```

### `編輯文章`

**URL :** `BASE_URL/articles/:id`

**Request :** `PUT`

**Body :**

**Headers :** `Authorization: `Bearer ${token}`

**Response :**

```
{
  message: '編輯成功',
  article: { 
              id: XX,
              title: 'XXXXXX',
              picture: 'XXXXXX',
              content: 'XXXXXX',
              user: XX,
              categories: XX
            }
}
```

### `刪除文章`

**URL :** `BASE_URL/articles/:id`

**Request :** `DELETE`

**Body :**

**Headers :** `Authorization: `Bearer ${token}`

**Response :**

```
{
  message: '刪除成功',
  article: { 
              id: XX,
              title: 'XXXXXX',
              picture: 'XXXXXX',
              content: 'XXXXXX',
              user: XX,
              categories: XX
            }
}
```

## Comments

### `單篇文章全部留言`

**URL :** `BASE_URL/comments/:id?offset=XX&size=XX`

**Request :** `GET`

**Body :**

**Response :**

```
{
  total: XX,
  offset: XX,
  size: XX,
  main: [
    {
      id: XX,
      article_id: XX,
      comment: "XXXXXX",
      user: [
        { 
          id: XX, 
          avatar: 'XXXXXX', 
          username: 'XXXXXX',
          email: 'XXXXXX',
          password: 'XXXXXX'
        }
      ]
    }
  ]
}
```

### `新增留言`

**URL :** `BASE_URL/comments/:id`

**Request :** `POST`

**Body :**

**Headers :** `Authorization: `Bearer ${token}`

**Response :**

```
{
  message: '新增成功',
  comment: { 
              id: XX,
              article_id: XX,
              comment: "XXXXXX",
            }
}
```

## Users

### `用戶註冊`

**URL :** `BASE_URL/users/register`

**Request :** `POST`

**Body :** `{ username, email, password }`

**Response :**

```
{
  message: '註冊成功'
}
```

### `測試資料`

```
帳號: root
密碼: 12345
```

### `用戶登入`

**URL :** `BASE_URL/users/login`

**Request :** `POST`

**Body :** `{ username, password }`

**Response :**

```
{
  message: '登入成功',
  token: 'XXXXXX',
  user: { 
          id: XX, 
          avatar: 'XXXXXX', 
          username: 'XXXXXX',
          email: 'XXXXXX'
        }
}
```

### `用戶登出`

**URL :** `BASE_URL/users/logout`

**Request :** `POST`

**Body :**

**Headers :** `Authorization: `Bearer ${token}`

**Response :**

```
{
  message: '登出成功',
  token: 'XXXXXX',
  user: { 
          id: XX, 
          avatar: 'XXXXXX', 
          username: 'XXXXXX',
          email: 'XXXXXX'
        }
}
```

### `用戶頭像更新`

**URL :** `BASE_URL/users/:id/upload`

**Request :** `PATCH`

**Body :**

**Headers :** `Authorization: `Bearer ${token}`

**Response :**

```
{
  message: '會員頭像更新成功',
  file: XXXXXXX
  user: { 
          id: XX, 
          avatar: 'XXXXXX', 
          username: 'XXXXXX',
          email: 'XXXXXX'
        }
}
```