---
title: Golang Heap包的使用方法
permalink: golang-heap
description: "Golang中 Heap的使用方法和介绍"
cover: https://image.hyoban.cc/file/02e3e5c437e184248f5cb.png
publish: true
date: 2023/5/26 17:29:50
updated: 2023/5/26 17:29:50
tags:
  - golang
  - heap
---

## Heap 的Golang实现

heap包提供了对任意类型（实现了heap.Interface接口）的堆操作。（最小）堆是具有“每个节点都是以其为根的子树中最小值”属性的树。
树的最小元素为其根元素，索引0的位置。

### 样例代码

```go
package main

import (
    "container/heap"
    "fmt"
)

type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }

func (h IntHeap) Less(i, j int) bool { return h[i] > h[j] }

func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *IntHeap) Push(x interface{}) {
    // Push and Pop use pointer receivers because they modify the slice's length,
    // not just its contents.
    *h = append(*h, x.(int))
}

func (h *IntHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func main() {
    h := &IntHeap{2, 1, 5}
    heap.Init(h)
    fmt.Println("Init", h)
    heap.Push(h, 6)
    fmt.Println("Push", h)
    heap.Pop(h)
    fmt.Println("Pop", h)
    // Output:
    // Init: [5 1 2]
    // Push: [6 5 2 1]
    // Pop : [5 1 2]
}
```

如上述代码，实现堆结构时，需要同时实现`5`个接口，他们分别是：

* sort.Interface:
  * Len() int
  * Less(i, j int) bool
  * Swap(i, j int)
* Push(x interface{}) // add x as element Len()
* Pop() interface{}   // remove and return element Len() - 1.

解释：

* 前三个接口是排序索要实现的接口
* Push接口是将数据插入到堆中
* Pop接口是从堆中删除最后一个数据，并将它作为返回值返回（与堆的顺序类型无关）

