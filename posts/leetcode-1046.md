---
title: Leetcode No.1046
permalink: leetcode-1046
description: "leetcode #1046 题解"
cover: https://image.hyoban.cc/file/02e3e5c437e184248f5cb.png
publish: true
date: 2023/06/05 21:21:43
updated: 2023/06/12 20:56:12
tags:
  - leetcode
  - heap
  - priority-queue
---

## 1046

### 分析

1. 理解粉碎的规则 新=重-轻 -> 放回
2. 从取出最重的两块想到排序的方法
    * **常规排序法**: 重新放回导致顺序发生错乱 重新排序
    * **最大堆法**
        * 降低每次插入新数据后的排序复杂度 -> 堆 因为是取最大的元素 采用最大堆
        * 先生成堆 每次Pop两个元素 (最大堆的Pop操作) 计算插值，>0则插入到堆中 (最大堆的Push操作)
        * 排序 N*Log(N) 每次调整Log(n) 共N次

### 高赞解答分析

1. 取出最大石头: 大根堆取出元素
2. 粉碎和放回: 计算差值并放回大根堆
3. 最终结果: 大根堆元素个数为0或1

### 易错点分析

1. 如何从常规排序想到堆

### 相关资料

1. [最大堆的完整讲解](https://blog.csdn.net/u014386899/article/details/108141606)
2. [最大堆操作](https://blog.csdn.net/qq_25343557/article/details/88686833)
