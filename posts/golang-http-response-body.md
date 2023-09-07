---
title: goalng http包中Response.Body的一个坑
permalink: golang-http-response-body
description: 在使用http包进行请求时需要关闭body
cover: 
publish: true
date: 2023/09/07 16:40:52
updated: 2023/09/07 20:32:47
tags:
  - golang
  - http
---

## 背景

对服务程序稳定性进行测试（Windows环境），拟编写一测试工具软件，频繁向服务器发送http请求，观察性能表现。测试工具用官方包http编写，核心代码如下：

```go

func send() {
	_, err := http.Post(url, "application/json", reqJson)
	if err != nil {
		fmt.Println(err)
	}
}

```

当程序运行一段时间，发送大约20000个请求后，检测到服务程序已无法处理http请求，日志查看服务程序已无法连接到pgsql数据库。起初认为是数据库挂死，但经过进程查询发现并没有挂死，而是报错已经没有可用的端口空间，无法建立连接。  
此时怀疑是有程序占用大量端口没有释放，导致服务程序无法同数据库建立连接，用命令查看端口占用，果然发现有10000+端口已经被占用没有释放，所属进程就是测试工具。

## 原因

已经定位到了罪魁祸首，接下来就要分析代码。全篇中只有上面提到的核心部分有端口占用相关逻辑，可以看到代码中没有阻塞住的地方，但代码中没有对response的处理，遂查看response部分文档。

```go
type Response struct {
	......

	// Body represents the response body.
	//
	// The response body is streamed on demand as the Body field
	// is read. If the network connection fails or the server
	// terminates the response, Body.Read calls return an error.
	//
	// The http Client and Transport guarantee that Body is always
	// non-nil, even on responses without a body or responses with
	// a zero-length body. It is the caller's responsibility to
	// close Body. The default HTTP client's Transport may not
	// reuse HTTP/1.x "keep-alive" TCP connections if the Body is
	// not read to completion and closed.
	//
	// The Body is automatically dechunked if the server replied
	// with a "chunked" Transfer-Encoding.
	//
	// As of Go 1.12, the Body will also implement io.Writer
	// on a successful "101 Switching Protocols" response,
	// as used by WebSockets and HTTP/2's "h2c" mode.
	Body io.ReadCloser

	......
}
```

结构体的描述代码中提到，除非Response.Body被读取完成或关闭时才会触发连接复用的操作，因此我们尝试修改代码，添加对body的关闭操作。

```go
func send() {
	resp, err := http.Post(url, "application/json", reqJson)
	if err != nil {
		fmt.Println(err)
	}

	defer resp.Body.Close()
}

```

此时再次测试程序，已经不会出现端口占用不释放的问题，端口占用数处在一个稳定的水平。

> [参考文章&源码分析](https://segmentfault.com/a/1190000020086816)
