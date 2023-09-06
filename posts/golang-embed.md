---
title: go embed包详解
permalink: golang-embed
description: 方便的使用自带的包实现静态资源内嵌
cover: 
publish: true
date: 2023/08/08 20:40:40
updated: 2023/09/06 16:13:13
tags:
  - go
---

## go embed命令详解

在以往的Go开发过程中，当我们出现需要静态文件资源时，一般只有两种方法来实现：

1. 使用 `go-bindata` 等第三方工具来将静态资源打包到程序中。
2. 外置静态资源

但从 `1.16` 版本后，官方包embed添加了对与静态资源的支持，此后可以方便的将静态资源同程序一起打包编译。

### 使用方法

embed的使用非常简单，仅仅需要一个 `//go:embed <file_name>` 指令即可。它通过将静态文件绑定到变量上来实现静态资源的内置，目前支持以下三种变量类型：

1. string
2. []byte
3. fs.FS

#### 单个文件的使用

其中 `string` 和 `[]byte` 这两种变量类型较为相似，这里以 `string` 为例来演示其使用方法。  
这两种方法基本都是将单个文件的内容内嵌到一个变量，基本用来对单个文件进行静态资源管理。  
首先我们先创建一个 `version.txt` 文件来模拟静态资源文件，文件内容如下：

```txt
v23.8.2
```

在其同级目录下创建程序文件 `main.go` ，内容如下：

```go
package main

import (
    _ "embed"
    "fmt"
)

//go:embed version.txt
var version string

func main() {
    fmt.Printf("version %s\n", version)
}

```

编译并运行程序，可以看到输出如下内容：

```shell
version 23.8.2

```

#### 多个文件的使用

之前介绍过，embed也实现了对于文件系统的支持，下文通过一个http后台应用内嵌静态资源的案例来讲解embed对文件系统的支持。  

在以往的http程序开发过程中，对于前端资源往往有两种处理思路：  
1. 通过静态文件实现，比较常见的是通过nginx来对静态资源实现代理，本质上还是依赖于服务器磁盘上的静态资源。
2. 将静态资源通过第三方库来编译到程序中。

以上两种方式都有各自的优缺点。方法1一般会在磁盘上存储一部分静态文件资源，因此部署或维护的过程中需要人工手动来实现文件的替换和处理，比较繁琐，但相对而言较为灵活；方法2以往会引入第三方依赖包，因此可能带来额外的编译代价，对于编码过程可能较为复杂。  

而今天我们所讨论的embed本质上与方法2相同，但因为官方包已经实现对其支持因此不必再依赖第三方包，节省一些编译开销。

```go
package main

import (
	"embed"
	"github.com/gin-gonic/gin"
	"html/template"
	"io/fs"
	"net/http"
)

//go:embed static
var staticFs embed.FS

func main() {
	engine := gin.Default()

	engine := SetHTMLTemplate(template.Must(template.New("").ParseFS(staticFs, "static/**/*")))

	sub, err := fs.Sub(staticFs, "static")
	if err != nil {
		panic(err)
	}

	engine.StaticFS("/static", http.FS(sub))

	engine.StaticFS("/file", http.Dir("./file"))

	engine.NoRoute(func(c *gin.Context) {
		c.HTML(http.StatusOK, "404.html", nil)
	})

	engine.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	if err := engine.Run(":9512"); err != nil {
		panic(err)
	}
}
```

完整的文件结构如下：

```shell
<tree>
```

在上述代码中，通过gin框架的 `engine.StaticFS()` 函数来将一个 `/static` 路由与embed嵌入的 `static` 静态资源绑定。并没有直接绑定，而是使用 `fs.Sub()` 先获取其子目录，这样操作的原因是embed会将目录本身也包括进去，而我们路由访问静态资源时只需要访问其内部的子目录。  
为了和非内嵌式的静态资源做对比，这里用了一个 `/file` 路由和目录下的静态资源 `file` 做了一个绑定。  
编码完成后进行编译，并将生成的程序复制到其他目录运行，排除本地文件的影响，此时我们尝试访问 `http://localhost:9512/static/css/todo.css` ，可以在界面上看到静态目录下的css文件，证明代码可行。  


> [演示实例](https://github.com/psyonly)
