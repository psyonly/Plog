---
title: Linux 修改时区为CST
permalink: linux-cst
description: "Linux 系统如何修改时区为CST"
cover: https://image.hyoban.cc/file/02e3e5c437e184248f5cb.png
publish: true
date: 2023/5/30 21:35:40
updated: 2023/5/30 21:35:40
tags:
  - linux
  - cst
  - shell
---

## 修改时区为CST时区

安装系统后大概率出现日期不对等状况，可以通过以下命令来修改为CST(中国标准时间)

*硬件缺电等原因导致的时间不准无法通过当前方法解决*

```shell
[root@localhost /]# date
Wed Jul 24 02:54:16 EDT 2019
[root@localhost /]# mv /etc/localtime /etc/localtime.bak
[root@localhost /]# ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
[root@localhost /]# date
Wed Jul 24 14:58:03 CST 2019
```
