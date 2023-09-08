---
title: 常见排序算法的go实现
permalink: golang-sort
description: 用go语言实现基本的排序算法
cover: 
publish: true
date: 2023/09/08 16:50:08
updated: 2023/09/08 17:20:15
tags:
  - golang
  - sort
---

## 快速排序

* 特点：由顶层向下逐步分治。  
* 操作：每次排序将待排序序列分成左右两部分，且左半部分的值小于右半部分，再对这两个部分进行子排序，最终整体数据呈有序。  
* 时间复杂度：O(nLogN)  
* 空间复杂度：O(nLogN)  
* 技巧：挖坑法  

```go
func quickSort(arr []int, l, r int) {
	if l >= r {
		return
	}
	var (
		i      = l
		j      = r
		sample = arr[l]
	)
	for i < j {
		for i < j && arr[j] > sample {
			j--
		}
		if i < j {
			arr[i], arr[j] = arr[j], arr[i]
			i++
		}
		for i < j && arr[i] < sample {
			i++
		}
		if i < j {
			arr[i], arr[j] = arr[j], arr[i]
			j--
		}
	}

	quickSort(arr, l, i-1)
	quickSort(arr, j+1, r)
}

```
