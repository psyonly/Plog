---
title: Golang 结构体tag的相关技巧
permalink: golang-struct-tag
description: "本文介绍了Golang中结构体的tag的相关使用方法和技巧"
cover: https://image.hyoban.cc/file/02e3e5c437e184248f5cb.png
publish: true
date: 2023/06/16 16:44:48
updated: 2023/06/25 17:25:37
tags:
  - golang
  - struct
---

## 结构体 tag

我们都知道在 golang 中，有 tag 这一特性，可以帮助程序简化很多复杂逻辑，比如序列化、字段校验等，其实现依靠的是反射。

### 序列化

使用 tag 来将结构体序列化或是反序列化应该是最为广泛的一种用途，但对于这个特性仍有很多需要注意的地方。

#### 常规序列化

以内部包 `"encoding/json"` 序列化为例，在没有定义结构体字段 tag 时的序列化/反序列化规则是直接将字段名当作序列化后的字段名，不做处理。

```go
type Person struct {
	Name string
	Age  int
}

func main() {
	var p = Person{
		Name: "kim",
		Age:  18,
	}

	if jsonStr, err := json.Marshal(&p); err != nil {
		panic(err)
	} else {
		fmt.Println(string(jsonStr))
	}

	return
}
```

输出结果是：

```txt
{"Name":"kim","Age":18}
```

当为结构体设置 tag 后，序列化时将会以 tag 为准生成对应的数据。

```go
type Person struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

func main() {
	var p = Person{
		Name: "kim",
		Age:  18,
	}

	if jsonStr, err := json.Marshal(&p); err != nil {
		panic(err)
	} else {
		fmt.Println(string(jsonStr))
	}

	return
}
```

输出结果是：

```txt
{"name":"kim","age":18}
```

当为结构体设置 tag 后，在反序列化时，首先会查找与 json 字段名相同的 tag 所绑定的结构体字段，如果存在，则直接将对应的值绑定到字段上。如不存在完全一致的 tag，则会不区分大小写直接查找对应字段，如存在，则同样将值绑定到对应字段上。

```go
type Person struct {
	Name string
	Age  int    `json:"age"`
}

var jsonStr = `{"NamE":"kim","age":18}`

func main() {
	var p Person

	if err := json.Unmarshal([]byte(jsonStr), &p); err != nil {
		panic(err)
	} else {
		fmt.Printf("%+v", p)
	}

	return
}
```

输出结果是：

```txt
{Name:kim Age:18}
```

可以看到，`Name` 字段虽然不存在对应的 tag，但还是成功的将 Json 中的 `NamE` 字段的值绑定上了，因此可以印证，`"encoding/json"` 包具备兼容性反序列化的能力。

#### 序列化顺序

那如果 JSON 中有多个同名字段时又会如何处理呢？（仅大小写不同的字段）

当 JSON 数据中存在多个可解析到同一字段的值时，以从 JSON 中出现的顺序为标准，后出现的会覆盖掉之前的。

```json
{
	"Name": "kim",
	"name": "tim",
	"nAme": "oim"
}
```

以上述 JSON 数据为例，反序列化过程中，首先会将 `kim` 绑定到 `Name` 字段上，接着按顺序依次绑定覆盖，最终会将 `oim` 值确定下来，最终的字段打印结果为：

```golang
{Name:oim}
```
