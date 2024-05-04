# Directories

```
.
├── home
|   ├── home.html
|   ├── home.css
|   └── home.js
├── ...(other pages)
|   ├── ....html
|   ├── ....css
|   └── ....js
└── public
    ├── css
    |    ├── fonts.css
    |    └── global.css
    ├── js
    |    ├── utils.js
    |    └── global.js
    ├── fonts
    |    ├── NotoSansTC-Regular.woff2
    |    ├── NotoSansTC-Bold.woff2
    |    └── ...(other fonts)
    └── images
        └── logo
            ├── logo.png
            └── logo.svg
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

# API

## Articles

**URL :** `BASE_URL/articles`

**Request :** `GET`

**Body :**

**Response :**

```
[
  {
    id: XX,
    avatar: 'https://XXXXXX',
    username: 'XXXXXX',
    title: 'XXXXXX',
    category: ['XX', 'XX', 'XX'],
    picture: 'https://XXXXXX',
    content: 'XXXXXX'
  }
]
```