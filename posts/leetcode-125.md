---
title: Leetcode No.125
permalink: leetcode-125
description: "leetcode #125 题解"
cover: https://image.hyoban.cc/file/02e3e5c437e184248f5cb.png
publish: true
date: 2023/06/05 21:14:54
updated: 2023/06/05 21:14:54
tags:
  - leetcode
  - string
  - palindrome
---

## 125

### 分析

1. 字符串合法化
    * 分析题意: *非字母数字字符* *大写字符转换为小写字符*
    * 开辟等同内存空间 O(n)
    * 原地置换法 O(1)
2. 回文串的判定方法
    * 回文串的特征: 正反遍历结果一致
    * 字符串倒置法 O(n)
    * 原地判定法 (双指针法) O(1)
    * 栈解法

### 高赞解答分析

1. 筛选+倒置判断
2. 双指针原地判断

### 易错点分析

1. 分析题意不完整
    * 数字遗落 大小写转换忽略
