---
title: Windows端口转发
permalink: windows-portproxy
description: "使用netsh命令实现Windows上的端口转发"
publish: true
date: 2025/03/19 10:26:30
updated: 2025/03/19 10:26:30
tags:
  - network
  - windows
  - netsh
---

## 背景

一台WinNAS获取到了IPV6，并且配置了域名，想通过IPV6访问SMB服务。由于运营商屏蔽了445端口，因而想通过端口转发的方式，将本地445端口转发到其他端口，实现公网访问。

## netsh命令

`netsh` 命令是Windows提供的一个用于修改多种网络配置的强大工具，其中就包括了现在我们需要用到的端口转发功能。

### 设置端口转发
```bat
# 端口转发
netsh interface portproxy add v6tov4 listenaddress=mydomain.net listenport=4445 connectaddress=127.0.0.1 connectport=445
```
如上命令是设置端口转发的方法，其中`v6tov4`用于将IPV6的请求转发到IPV4地址，转发IP的类型可以任意设置。`listenaddress`值为监听请求的IP或域名，`listenport`值为监听请求的端口。`connectaddress`值为转发到的目的IP或域名，`connectport`值为转发到的目的端口。  
通过上述命令，我们可以设置监听IP为本机IP或域名，并将IPV6的请求转发到网络内的IPV4地址，从而实现了被屏蔽的SMB服务的访问。  

可以通过以下命令查看端口转发设置：

```bat
# 查看端口转发
netsh interface portproxy show all
```
如果添加端口转发无误，并且查看端口转发列表有数据，防火墙相关设置也正常后，此时已经可以通过公网访问该端口，我们可以使用其他工具测试下端口是否连通。  
效果如下：  
[![blog-windows-protproxy_portscan_1.png](https://pic1.imgdb.cn/item/67da36c188c538a9b5c05e75.png)](https://pic1.imgdb.cn/item/67da36c188c538a9b5c05e75.png)

不需要的端口转发设置可以通过以下命令删除：
```bat
# 删除转发规则
netsh interface portproxy delete v6tov4 listenaddress=127.0.0.1 listenport=4445
```