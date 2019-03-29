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
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": [
        {
            "row_number": "1",
            "caid": 389,
            "title": "JavaScript 是如何工作的：模块的构建以及对应的打包工具",
            "date": "2019-03-19T16:00:00.000Z"
        },
        {
            "row_number": "2",
            "caid": 388,
            "title": "HTML执行顺序-一探究竟",
            "date": "2019-03-19T16:00:00.000Z"
        }
    ]
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
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": "14"
}
 ```

### 获取收藏的文章的内容：

- **method**：get
- **uri**: /api/collected_articles/a/{articleId}
- **parameters**: null
- **sample**:

 ```json
 request：get api/collected_articles/a/382
 response:
{
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": {
        "caid": 382,
        "tag": "JS",
        "title": "Js遍历总结",
        "author": "supa同学",
        "content": "\n            <h4>总结一下JS常用的遍历方法</h4>\n<pre><code>// array  object\nconst arr = [1, 2, 3, 4, 5]\nconst obj = {a:1, b:2, c:3}\n</code></pre>\n<h5>for 循环</h5>\n<pre><code>for (let index = 0; index < arr.length; index++) {\n  const element = arr[index]; // 1, 2, 3, 4, 5\n}\n</code></pre>\n<h5>forEach</h5>\n<pre><code>arr.forEach((item, index) => {\n  console.log(item, index) // 1,0  2,1  3,2  4,3  5,4\n})\n\n</code></pre>\n<h5>map</h5>\n<pre><code>arr.map((item, index) => {\n  console.log(item, index) // 1,0  2,1  3,2  4,3  5,4\n})\n</code></pre>\n<h5>filter 过滤 返回一个符合条件的数组</h5>\n<pre><code>const newArr = arr.filter((item, index) => {\n  console.log(item, index) // 1,0  2,1  3,2  4,3  5,4\n  return item > 2\n})\nconsole.log(newArr)  // 3, 4, 5\n</code></pre>\n<h5>some 返回一个布尔值</h5>\n<p>某一个值满足条件返回true</p>\n<pre><code>const result = arr.some((item, index) => {\n  return item > 3\n})\nconsole.log(result) // true\n</code></pre>\n<h5>every 返回一个布尔值</h5>\n<p>所有值满足条件返回true</p>\n<pre><code>const result2 = arr.every((item, index) => {\n  return item > 2\n})\nconsole.log(result2) // false\n</code></pre>\n<h5>reduce array.reduce(callback[, initialValue]);</h5>\n<ol>\n<li>callback : 函数执行在数组中每个值</li>\n<li>initialValue : 对象作为第一个参数回调的第一次调用使用</li>\n</ol>\n<pre><code>// 求和\nvar sum = arr.reduce(function(x, y) {\n  return x + y\n}, 0)\nconsole.log(sum)  //  15 \n\n// 取最大值\nvar max = arr.reduce(function(x, y) {\n  return x > y ? x : y;\n})\nconsole.log(max) // 5\n</code></pre>\n<h4>for...in 与 for...of 使用与区别</h4>\n<ul>\n<li>for...in es5标准 遍历key值 并且会遍历数组所有的可枚举属性 遍历顺序有可能不是按照实际数组的内部顺序 所以for in更适合遍历对象，不要使用for in遍历数组</li>\n</ul>\n<pre><code>for (index in arr) {\n  console.log(index) // 0 1 2 3 4\n}\n\nfor (index in obj) {\n  console.log(index) // a b c\n}\n</code></pre>\n<ul>\n<li>for...of 是es6标准 遍历的是value值</li>\n</ul>\n<pre><code>for (item of arr) {\n  console.log(item) // 0 1 2 3 4\n}\n</code></pre>\n<h5>ES6-对象的扩展-Object.keys()，Object.values()，Object.entries()</h5>\n<ul>\n<li>Object.keys() ES5 引入了 Object.keys 方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。</li>\n</ul>\n<pre><code>Object.keys(obj) // [a, b, c]\n</code></pre>\n<ul>\n<li>Object.values 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。 返回数组的成员顺序是按照key值的大小顺序排列(升序)</li>\n</ul>\n<pre><code>Object.values(obj)  // [1, 2, 3]\n</code></pre>\n<ul>\n<li>Object.entries 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。如果原对象的属性名是一个 Symbol 值，该属性会被忽略。</li>\n</ul>\n<pre><code>Object.entries(obj)  // [['a': 1],['b': 2], ['c': 3]]\n</code></pre>\n\n          ",
        "original_link": "https://www.jianshu.com/p/34d06d3514d9",
        "date": "2019-03-19T16:00:00.000Z"
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
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": [
        {
            "row_number": "1",
            "oaid": 1,
            "title": "sample title",
            "date": "2019-03-22T16:00:00.000Z"
        }
    ]
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
              "title":"title",
              "author":1,
              "content":"content"
          }
 response:
{
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": null
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
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": "2"
}
```

### 获取原创文章内容

- **method**：get
- **uri**: /api/original_articles/{articleId}
- **parameters**: null
- **sample**:

 ```json
 request: get /api/original_articles/1
 response:
{
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": {
        "oaid": 1,
        "title": "sample title",
        "author": 1,
        "content": "<p>sample content</p>",
        "date": "2019-03-22T16:00:00.000Z"
    }
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
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": [
        {
            "row_number": "1",
            "cid": 1,
            "oaid": 1,
            "owner": 1,
            "content": "sample comment",
            "date_time": "2019-03-23T16:49:41.243Z"
        }
    ]
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
              "owner":1,
              "content":"sample comment"
          }
 response:
{
    "succeed": true,
    "errorCode": -1,
    "message": null
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
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": "1"
}
 ```

### 获取回复列表

- **method**：get
- **uri**: /api/original_articles/comments/{commentId}/replys
- **parameters**: start,num
- **json sample**:

```json
 request: get /api/original_articles/comments/1/replys?start=1&num=1
 response:
{
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": [
        {
            "row_number": "1",
            "rid": 1,
            "cid": 1,
            "owner": 1,
            "responder": 1,
            "content": "content",
            "date_time": "2019-03-23T16:54:47.182Z"
        }
    ]
}
```

### 添加回复

- **method**: post
- **uri**: /api/original_articles/comments/{commentId}/replys
- **parameters**:null
- **sample**:

```json
 request: post /api/original_articles/comments/1/replys
          body:{
              "responder":5,
              "owner":2,
              "content":"content"
          }
 response:
{
    "succeed": true,
    "errorCode": -1,
    "message": null
}

```

### 获取回复数量

- **method**：get
- **uri**: /api/original_articles/comments/{commentId}/replys/num
- **parameters**: null
- **sample**:

 ```json
 request: get /api/original_articles/comments/1/replys/num
 response:
{
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": "1"
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
                   "user":"润楠",
                   "password":"smielpf1204."
               }
 response:
 登录成功：
{
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": {
        "uid": 1,
        "nickname": "润楠",
        "unread_num": 2
    }
}
 登录失败：
 {
    "succeed": false,
    "errorCode": 404,
    "message": "用户名或邮箱不存在",
    "data": null
}

{
    "succeed": false,
    "errorCode": -1,
    "message": "密码错误",
    "data": null
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
                   "nickname":"obvious",
                   "password":"123456"
                   "email":"1608272695@qq.com"
               }
 response:
注册成功：
{
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": null
}
注册失败：
{
    "succeed": false,
    "errorCode": 1,
    "message": "该用户名已被注册",
    "data": null
}

{
    "succeed": false,
    "errorCode": 1,
    "message": "该邮箱已被注册",
    "data": null
}
```

### 获取用户信息

- **method**：get
- **uri**: /api/user/:userId/info
- **parameters**: null
- **json sample**:

```json
request /api/user/1/info
response:
{
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": {
        "nickname": "润楠"
    }
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
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": [
        {
            "row_number": "1",
            "content": "content",
            "date_time": "2019-03-23T16:54:47.182Z",
            "owner": 1,
            "oaid": 1
        },
        {
            "row_number": "2",
            "content": "sample comment",
            "date_time": "2019-03-23T16:49:41.243Z",
            "owner": 1,
            "oaid": 1
        }
    ]
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
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": "2"
}
```

### 清空用户的unread_num

- **method**：put
- **uri**: /api/user/:userId/unread_num
- **parameters**: null
- **json sample**:

```json
 request: put /api/user/1/unread_num
 response:
{
    "succeed": true,
    "errorCode": -1,
    "message": null,
    "data": null
}