---
title: Linux ulimit命令
permalink: linux-ulimit
description: "Linux ulimit命令"
cover: https://image.hyoban.cc/file/02e3e5c437e184248f5cb.png
publish: true
date: 2023/06/13 20:49:43
updated: 2023/06/13 20:55:37
tags:
  - linux
  - ulimit
---

## Linux ulimit

`ulimit -a`命令可以查询相关的系统数量限制

```shell
core file size              (blocks, -c) 0
data seg size               (kbytes, -d) unlimited
scheduling priority                 (-e) 0
file size                   (blocks, -f) unlimited
pending signals                     (-i) 7823
max locked memory           (kbytes, -l) 64
max memory size             (kbytes, -m) unlimited
open files                          (-n) 1024
pipe size                (512 bytes, -p) 8
POSIX message queues         (bytes, -q) 819200
real-time priority                  (-r) 0
stack size                  (kbytes, -s) 8192
cpu time                   (seconds, -t) unlimited
max user processes                  (-u) 7823
virtual memory              (kbytes, -v) unlimited
file locks                          (-x) unlimited
```

其中 'open files' 就是系统支持的打开文件数

### 修改打开文件数

在开发过程中常常会有批量打开多个文件、数据库并发查询的场景，在这些场景下，大多都跟文件的IO操作相关，当操作的文件数超过当前系统限制时，就会抛出异常，那么在这种情况下，就需要修改系统的`打开文件数`

#### 暂时使用

命令 `ulimit -n 65536` 可以短暂的修改打开文件数，当会话退出后失效。

#### 长期使用

添加如下内容到 `/etc/security/limit.conf`文件末尾，即可永久生效

```shell
*  -   nofile  65536
```
