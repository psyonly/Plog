---
title: Golang 结构体tag的相关技巧
permalink: golang-struct-tag
description: "本文介绍了Golang中结构体的tag的相关使用方法和技巧"
cover: https://image.hyoban.cc/file/02e3e5c437e184248f5cb.png
publish: true
date: 2023/06/16 16:44:48
updated: 2023/06/16 17:52:58
tags:
  - golang
  - struct
---

## 结构体tag

我们都知道在golang中，有tag这一特性，可以帮助程序简化很多复杂逻辑，比如序列化、字段校验等，其实现依靠的是反射。

### 序列化

使用tag来将结构体序列化或是反序列化应该是最为广泛的一种用途，但对于这个特性仍有很多需要注意的地方。

#### 常规序列化

以内部包 `"encoding/json"` 序列化为例，在没有定义结构体字段tag时的序列化/反序列化规则是直接将字段名当作序列化后的字段名，不做处理。

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

当为结构体设置tag后，序列化时将会以tag为准生成对应的数据。

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

当为结构体设置tag后，在反序列化时，首先会查找与json字段名相同的tag所绑定的结构体字段，如果存在，则直接将对应的值绑定到字段上。如不存在完全一致的tag，则会不区分大小写直接查找对应字段，如存在，则同样将值绑定到对应字段上。

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

可以看到，`Name` 字段虽然不存在对应的tag，但还是成功的将Json中的 `NamE` 字段的值绑定上了，因此可以印证，`"encoding/json"` 包具备兼容性反序列化的能力。

那如果Json中有多个同名字段时又会如何处理呢？（仅大小写不同的字段）

...待续
