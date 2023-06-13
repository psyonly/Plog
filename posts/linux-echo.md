---
title: Linux echo命令
permalink: linux-echo
description: "linux中 echo命令的特殊用法"
cover: https://image.hyoban.cc/file/02e3e5c437e184248f5cb.png
publish: true
date: 2023/06/13 10:17:39
updated: 2023/06/13 11:40:31
tags:
  - linux
  - echo
---

## echo命令的用法

echo 命令常用于输出指定内容，在一些特殊的情况下，往往需要对输出的内容做特殊的处理

## 输出转义

echo 使用`-e`参数可在输出字符串内容时转义特殊字符，例如'\n'。

### 一个例子
```shell
> echo "aaa\nxxx"
> aaa\nxxx

> echo -e "aaa\nxxx"
> aaa
> xxx
```
