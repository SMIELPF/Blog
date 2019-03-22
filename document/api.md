# 个人博客api

---
注：后台返回前台的接口格式为：

```json
{
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    // 响应具体格式，各个接口各不相同
  }
}

```

## 收藏夹相关

---

### 获取收藏的某个类别文章列表：

- **method**：get
- **uri**: /api/collected_articles/{tag}
- **parameters**: start,num
- **sample**:

 ```json
 request：get api/collected_articles/javaScript?start=1&num=2
 response:
 {
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    // 响应具体格式，各个接口各不相同
  }
}
 ```

### 获取收藏的某个类别文章的数量：

- **method**：get
- **uri**: /api/collected_articles/{tag}/num
- **parameters**:null
- **sample**:

 ```json
 request：get api/collected_articles/javaScript/num
 response:
 {
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    // 响应具体格式，各个接口各不相同
  }
 ```

### 获取收藏的文章的内容：

- **method**：get
- **uri**: /api/collected_articles/a/{articleId}
- **parameters**: null
- **sample**:

 ```json
 request：get api/collected_articles/a/1
 response:
 {
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    // 响应具体格式，各个接口各不相同
  }
}
 ```

## 原创文章相关

---

### 获取原创文章列表

- **method**：get
- **uri**: /api/original_articles
- **parameters**: start,num
- **sample**:

 ```json
 request: get /api/original_articles?start=1&num=3
 response:
 {
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    // 响应具体格式，各个接口各不相同
  }
 ```

### 添加原创文章

- **method**: post
- **uri**: /api/original_articles
- **parameters**:null
- **sample**:

```json
 request: post /api/original_artilces
          body:{
              title:'title',
              author:'aurthor',
              content:'content'
          }
 response:
 {
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    // 响应具体格式，各个接口各不相同
  }

```

### 获取原创文章数量

- **method**：get
- **uri**: /api/original_articles/num
- **parameters**: null
- **sample**:

```json
 request: get /api/original_articles/num
 response:
 {
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    // 响应具体格式，各个接口各不相同
  }
```

### 获取原创文章内容

- **method**：get
- **uri**: /api/original_articles/{articleId}
- **parameters**: null
- **sample**:

 ```json
 request: get /api/original_articles?start=1&num=3
 response:
 {
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    // 响应具体格式，各个接口各不相同
  }
 ```

### 获取评论列表

- **method**：get
- **uri**: /api/original_articles/{articleId}/comments
- **parameters**: start,num
- **sample**:

 ```json
 request: get /api/original_articles/1/comments?start=1&num=2
 response:
  {
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    // 响应具体格式，各个接口各不相同
  }
 ```

### 添加评论

- **method**: post
- **uri**: /api/original_articles/{articleId}/comments
- **parameters**:null
- **sample**:

```json
 request: post /api/original_artilces/1/comments
          body:{
              owner:2,
              content:'content'
          }
 response:
 {
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    // 响应具体格式，各个接口各不相同
  }

```

### 获取评论数量

- **method**：get
- **uri**: /api/original_articles/{articleId}/comments/num
- **parameters**: start,num
- **sample**:

 ```json
 request: get /api/original_articles/1/comments/num
 response:
  {
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    num:5
  }
 ```

### 获取回复列表

- **method**：get
- **uri**: /api/original_articles/comments/{commentId}/replys
- **parameters**: start,num
- **json sample**:

```json
 request: get /api/comments/1/replys?start=1&num=2
 response:
  {
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    // 响应具体格式，各个接口各不相同
  }
```

### 添加回复

- **method**: post
- **uri**: /api/original_articles/comments/{commentId}/replys
- **parameters**:null
- **sample**:

```json
 request: post /api/comments/1/replys
          body:{
              responder:5,
              owner:2,
              content:'content'
          }
 response:
 {
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    // 响应具体格式，各个接口各不相同
  }

```

### 获取回复数量

- **method**：get
- **uri**: /api/original_articles/comments/{commentId}/replys/num
- **parameters**: null
- **sample**:

 ```json
 request: get /api/original_articles/1/comments/num
 response:
  {
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    num:5
  }
 ```

## 用户相关

---

### 登录接口

- **method**：post
- **uri**: /api/user/login
- **parameters**: null
- **json sample**:

```json
 request: post /api/user/login
               body:{
                   nickname:'helloWorld',
                   password:'123456'
               }
 response:
  {
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    // 响应具体格式，各个接口各不相同
  }
```

### 注册接口

- **method**：post
- **uri**: /api/user/register
- **parameters**: null
- **json sample**:

```json
 request: post /api/user/register
               body:{
                   nickname:'helloWorld',
                   password:'123456'
                   email:'1608272694@qq.com'
               }
 response:
  {
    succeed: true,
    errorCode: -1,
    message: null,
    data: {
        // 响应具体格式，各个接口各不相同
  }
```

### 获取与用户相关的消息(回复，评论)

- **method**：get
- **uri**: /api/user/:userId/messages
- **parameters**: start,num
- **json sample**:

```json
 request: get /api/user/1/messages?start=1&num=2
 response:
  {
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    // 响应具体格式，各个接口各不相同
  }
```

### 获取与用户相关的消息的数量

- **method**：get
- **uri**: /api/user/:userId/messages/num
- **parameters**: start,num
- **json sample**:

```json
 request: get /api/user/1/messages/num
 response:
  {
  succeed: true,
  errorCode: -1,
  message: null,
  data: {
    // 响应具体格式，各个接口各不相同
  }
```