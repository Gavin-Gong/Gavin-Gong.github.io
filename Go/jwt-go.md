## jwt 机制 & go 实践

> 2018-05-24

### 结构

`JWT`由三部分组成, 以点的形式分割
`Header.Payload.Signature`

#### header

包含 token 类型和加密算法

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### payload(claim)

包含一些声明其实就是附加数据存储, 我们可以选择往里面存储一些用户数据, 也包括一些保留字段和自定义字段

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

一些常用字段

* iss token 拥有者
* exp Expire 过期时间(Unix 时间戳)
* iat Issued At 创建时间(Unix)
* jti JWT Id

#### secret

密匙, 用来加密和解密 token

有了以上三个, 我们就可以生成 token 了, 对 payload 和 header 进行 base64Url 进行编码, 然后拼接 secret, 最后再用 header 指定的加密算法进行加密处理

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

### JWT 使用流程

JWT 真实场景交互流程如图
![JWT CS 交互流程](http://opazkqh2d.bkt.clouddn.com/18-5-25/15302651.jpg "JWT Token")
在客户端获取到`token`后需要将`token`保存起来(例如 `localStorage`), 然后在需要的进行授权的请求的请求头中添加

```
Authorization: Bearer <token>
```

后端读取到 请求头中的`Authorization`, 取出`token`进行解密, 验证提取`token`中存储的信息. `JWT`是一种无状态的授权协议, 因此我们不需要通过数据库来维护一个登陆态, 所有和登陆相关的信息都加密在`token`里面, 我们只需要在服务器保存一个`secret`

### jwt-go

#### 参考链接

[声明保留字](https://www.iana.org/assignments/jwt/jwt.xhtml)
[JWT 规范](https://jwt.io/introduction/)
[Go 实战--golang 中使用 JWT(JSON Web Token)](https://blog.csdn.net/wangshubo1989/article/details/74529333)
