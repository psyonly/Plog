---
title: Leetcode No.234
permalink: leetcode-234
description: "leetcode #234 题解"
cover: https://image.hyoban.cc/file/02e3e5c437e184248f5cb.png
publish: true
date: 2023/06/08 21:08:13
updated: 2023/06/08 21:08:13
tags:
  - leetcode
  - linked-list
  - palindrome
  - list-reverse
---

## 234

### 分析

1. 快慢指针找到中间位置
    * 分析题意: 回文串是正着反着读都完全一致的字符串
    * 由于链表无法随机访问，因此通过倒置后半部分链表与前半部分链表比较来操作会快一些
    * 慢指针一次前进一个结点，快指针一次前进两个结点，最终慢指针会指向中间结点
2. 倒置链表
    * 声明: 链表分割为两部分：已转置的链表和未转置的链表
    * 初始化:
		* `head`指针指向已转置链表的头结点
		* `tail`指针指向已转置的链表的尾结点
    	* `next`指针总是指向`tail`结点的下一个结点，即`next = tail.next`
    * 循环:
		* 接续: 先将`tail`指针指向未转置链表的头结点，即`tail.next = next.next`；特殊地：当未转置链表为空时，即`next`指针已是未转置链表的最后一个结点时，`tail`指针将指向空，即`tail.next = null`
		* 前插: 将`next`指针指向已转置链表的头结点，即`next.next = head`
		* 更新: 将`next`指针设置为已转置链表的头结点，即`head = next`

### 高赞解答分析

1. 暂无

### 易错点分析

1. 容易在逆置的过程中忘记要逆置指针的后续结点
