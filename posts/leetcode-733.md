---
title: Leetcode No.733
permalink: leetcode-733
description: "leetcode #733 题解"
cover: https://image.hyoban.cc/file/02e3e5c437e184248f5cb.png
publish: true
date: 2023/06/05 21:19:35
updated: 2023/06/05 21:19:35
tags:
  - leetcode
  - dfs
  - bfs
---

## 733

### 分析

1. 上色目标: 像素值与原始坐标相同的相连地块
2. 判断为图的搜索算法 DFS/BFS
3. DFS: 递归调用（系统隐式栈调用）
    * 编写递归函数
    * 结束条件: 超出范围或目标地块像素值与原始坐标像素值不一致
    * 符合条件的处理: 填充颜色，修改地块像素值为`newColor`
    * 递归处理: 依次对上下左右四个方向的地块进行递归函数调用
4. BFS: 队列
    * 初始化队列: 创建一个存储坐标信息的队列
    * 元素出队: 弹出队列头部坐标，如果是合法坐标则检测弹出元素像素值是否与原始坐标像素值一致
        * 不一致则不需要处理
        * 一致则需要更新地块像素值，将四个方向上相邻的坐标插入队列末尾
    * 不断循环直至队列为空即为处理结束

### 高赞解答分析

1. BFS解法，用数组遍历实现四个方向坐标获取，先判断再入队
2. DFS解法，原色判断，先判断再入队

### 易错点分析

1. 初始地块像素值与目标像素值一致时的处理
