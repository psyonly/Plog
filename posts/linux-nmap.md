---
title: nmap命令查询局域网内的联网机器
permalink: linux-nmap
description: 快速查找局域网内的设备IP
cover: 
publish: true
date: 2023/06/29 21:28:35
updated: 2023/06/29 21:42:11
tags:
  - linux
  - nmap
---

## Nmap命令

### 真实案例

很多智能设备由于节省算力，节约成本等原因并不预设视频输出接口，当设备切换网络后开启DHCP时，在没有视频输出接口的情况下无法探测到设备的IP，面对这种情况，可以在服务器上使用nmap命令查询局域网络中所有的IP，在过程中可以热拔插网线以观察推断出所操作设备的IP。  

### nmap查询特定网段IP

```shell
nmap -sP ${IP}/${MASK_bit}
```

其中 `${IP}` 就是要匹配的IP，`${MASK_bit}` 是与之运算的掩码，例如 `nmap -sP 192.168.30.15/24` 就是查询`192.168.30.0 - 192.168.30.255`之间的所有设备。
