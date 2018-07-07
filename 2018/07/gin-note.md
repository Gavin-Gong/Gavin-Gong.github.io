# Gin 笔记

## 快速开始

```sh
# 假定以下代码在 example.go 文件
cat example.go
```

```go
package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run() // listen and serve on 0.0.0.0:8080
}
```

示例

### 使用 GET, POST, PUT, PATCH, DELETE 和 OPTIONS 方法

```go
func main() {
	// 禁用输出文本窗口颜色
	// gin.DisableConsoleColor()

	// 创建 gin router 附带默认中间件:
	// logger 和 recovery (crash-free) 中间件
	router := gin.Default()

	router.GET("/someGet", getting)
	router.POST("/somePost", posting)
	router.PUT("/somePut", putting)
	router.DELETE("/someDelete", deleting)
	router.PATCH("/somePatch", patching)
	router.HEAD("/someHead", head)
	router.OPTIONS("/someOptions", options)

	// 默认监听 :8080 除非 PORT 环境变量被指定
	router.Run()
	// router.Run(":3000") 监听3000 端口
}
```

### 路径参数

```go
func main() {
	router := gin.Default()

	// 这个 handler 匹配 /user/john 但是不匹配 /user/ 和 /user
	router.GET("/user/:name", func(c *gin.Context) {
		name := c.Param("name")
		c.String(http.StatusOK, "Hello %s", name)
	})

	// 然而, 这个会匹配 /user/john/ 和  /user/john/send
	// 如果没有其他路由匹配 /user/john, 它将重定向到 /user/john/
	router.GET("/user/:name/*action", func(c *gin.Context) {
		name := c.Param("name")
		action := c.Param("action")
		message := name + " is " + action
		c.String(http.StatusOK, message)
	})

	router.Run(":8080")
}
```

### Querystring 参数

```go
func main() {
	router := gin.Default()

	router.GET("/welcome", func(c *gin.Context) {
		firstname := c.DefaultQuery("firstname", "Guest")
		lastname := c.Query("lastname") // c.Request.URL.Query().Get("lastname")的简写

		c.String(http.StatusOK, "Hello %s %s", firstname, lastname)
	})
	router.Run(":8080")
}
```

### Multipart/Urlencoded Form

表单提交

```go
func main() {
	router := gin.Default()

	router.POST("/form_post", func(c *gin.Context) {
		message := c.PostForm("message")
		nick := c.DefaultPostForm("nick", "anonymous")

		c.JSON(200, gin.H{
			"status":  "posted",
			"message": message,
			"nick":    nick,
		})
	})
	router.Run(":8080")
}
```

### Another example: query + post form

```
POST /post?id=1234&page=1 HTTP/1.1
Content-Type: application/x-www-form-urlencoded

name=manu&message=this_is_great
```

```go
func main() {
	router := gin.Default()

	router.POST("/post", func(c *gin.Context) {

		id := c.Query("id")
		page := c.DefaultQuery("page", "0")
		name := c.PostForm("name")
		message := c.PostForm("message")

		fmt.Printf("id: %s; page: %s; name: %s; message: %s", id, page, name, message)
	})
	router.Run(":8080")
}
```

```
id: 1234; page: 1; name: manu; message: this_is_great
```

### 上传文件

#### 单文件

```go
func main() {
	router := gin.Default()
	// 为 multipart forms 设置一个低内存占用限制 (默认为32 MiB)
	// router.MaxMultipartMemory = 8 << 20  // 8 MiB
	router.POST("/upload", func(c *gin.Context) {
		// 单 file
		file, _ := c.FormFile("file")
		log.Println(file.Filename)

		// 上传文件到路径
		// c.SaveUploadedFile(file, dst)

		c.String(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
	})
	router.Run(":8080")
}
```

How to `curl`:

```bash
curl -X POST http://localhost:8080/upload \
  -F "file=@/Users/appleboy/test.zip" \
  -H "Content-Type: multipart/form-data"
```

#### 多文件

See the detail [example code](examples/upload-file/multiple).

```go
func main() {
	router := gin.Default()
	router.POST("/upload", func(c *gin.Context) {
		// Multipart form
		form, _ := c.MultipartForm()
		files := form.File["upload[]"]

		for _, file := range files {
			log.Println(file.Filename)

			// 上传文件到路径
			// c.SaveUploadedFile(file, dst)
		}
		c.String(http.StatusOK, fmt.Sprintf("%d files uploaded!", len(files)))
	})
	router.Run(":8080")
}
```

How to `curl`:

```bash
curl -X POST http://localhost:8080/upload \
  -F "upload[]=@/Users/appleboy/test1.zip" \
  -F "upload[]=@/Users/appleboy/test2.zip" \
  -H "Content-Type: multipart/form-data"
```

### 组织路由 routes

```go
func main() {
	router := gin.Default()

	// Simple group: v1
	v1 := router.Group("/v1")
	{
		v1.POST("/login", loginEndpoint)
		v1.POST("/submit", submitEndpoint)
		v1.POST("/read", readEndpoint)
	}

	// Simple group: v2
	v2 := router.Group("/v2")
	{
		v2.POST("/login", loginEndpoint)
		v2.POST("/submit", submitEndpoint)
		v2.POST("/read", readEndpoint)
	}

	router.Run(":8080")
}
```

### Blank Gin 不适用默认路由

使用

```go
r := gin.New()
```

而不是

```go
// 默认会顺带 Logger 和 Recovery 这两个中间价
r := gin.Default()
```

### 使用 中间件

```go
func main() {
	// 创建 router 默认不顺带任何中间件
	r := gin.New()

	// 全局中间件
	// Logger 中间件默认写 log到 gin.DefaultWriter 及时你设置 with GIN_MODE=release.
	// 默认 gin.DefaultWriter = os.Stdout
	r.Use(gin.Logger())

	// 一个可以从panic和599 错误中死灰复燃的中间件
	r.Use(gin.Recovery())

	// 每个路由中间件 你可以随意串联多个中间件， 按顺序执行
	r.GET("/benchmark", MyBenchLogger(), benchEndpoint)

	// Authorization 组
	// authorized := r.Group("/", AuthRequired())
	// 等同于:
	authorized := r.Group("/")
	// AuthRequired() 中间件只 "authorized" group生效.
	authorized.Use(AuthRequired())
	{
		authorized.POST("/login", loginEndpoint)
		authorized.POST("/submit", submitEndpoint)
		authorized.POST("/read", readEndpoint)

		// nested group
		testing := authorized.Group("testing")
		testing.GET("/analytics", analyticsEndpoint)
	}

	r.Run(":8080")
}
```

### 如何写入 log 文件

```go
func main() {
    // 写入 log 文件 可以禁用 console 颜色
    gin.DisableConsoleColor()

    // 输出log到文件.
    f, _ := os.Create("gin.log")
    gin.DefaultWriter = io.MultiWriter(f)

    // 如果你需要写 log 文件 与此同时 console的话， 可以这样写
    // gin.DefaultWriter = io.MultiWriter(f, os.Stdout)

    router := gin.Default()
    router.GET("/ping", func(c *gin.Context) {
        c.String(200, "pong")
    })

    router.Run(":8080")
}
```

### 静态服务器

```go
func main() {
	router := gin.Default()
	router.Static("/assets", "./assets")
	router.StaticFS("/more_static", http.Dir("my_file_system"))
	router.StaticFile("/favicon.ico", "./resources/favicon.ico")

	// Listen and serve on 0.0.0.0:8080
	router.Run(":8080")
}
```

### Serving data from reader

```go
func main() {
	router := gin.Default()
	router.GET("/someDataFromReader", func(c *gin.Context) {
		response, err := http.Get("https://raw.githubusercontent.com/gin-gonic/logo/master/color.png")
		if err != nil || response.StatusCode != http.StatusOK {
			c.Status(http.StatusServiceUnavailable)
			return
		}

		reader := response.Body
		contentLength := response.ContentLength
		contentType := response.Header.Get("Content-Type")

		extraHeaders := map[string]string{
			"Content-Disposition": `attachment; filename="gopher.png"`,
		}

		c.DataFromReader(http.StatusOK, contentLength, contentType, reader, extraHeaders)
	})
	router.Run(":8080")
}
```

### 重定向

同时支持内部 location 以及 外部 location 重定向

```go
r.GET("/test", func(c *gin.Context) {
	c.Redirect(http.StatusMovedPermanently, "http://www.google.com/")
})
```

用 `HandleContext` 触发路由重定向.

```go
r.GET("/test", func(c *gin.Context) {
    c.Request.URL.Path = "/test2"
    r.HandleContext(c)
})
r.GET("/test2", func(c *gin.Context) {
    c.JSON(200, gin.H{"hello": "world"})
})
```

### 自定义中间件

```go
func Logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		t := time.Now()

		// 设置 example 变量
		c.Set("example", "12345")

		// 请求前

		c.Next()

		// 请求后
		latency := time.Since(t)
		log.Print(latency)

		// 获取发送的状态
		status := c.Writer.Status()
		log.Println(status)
	}
}

func main() {
	r := gin.New()
	r.Use(Logger())

	r.GET("/test", func(c *gin.Context) {
		example := c.MustGet("example").(string)

		// it would print: "12345"
		log.Println(example)
	})

	r.Run(":8080")
}
```

### 在中间件使用 Goroutines

当在一个中间件或者 router 中开启 Goroutine, 你不应该使用原始的 context, 你必须使用一份只读复制.

```go
func main() {
	r := gin.Default()

	r.GET("/long_async", func(c *gin.Context) {
		// 创建一份副本
		cCp := c.Copy()
		go func() {
			time.Sleep(5 * time.Second)

			// 使用副本
			log.Println("Done! in path " + cCp.Request.URL.Path)
		}()
	})
	r.Run(":8080")
}
```

### 自定义 HTTP 配置

Use `http.ListenAndServe()` directly, like this:

```go
func main() {
	router := gin.Default()
	http.ListenAndServe(":8080", router)
}
```

or

```go
func main() {
	router := gin.Default()

	s := &http.Server{
		Addr:           ":8080",
		Handler:        router,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	s.ListenAndServe()
}
```
