---
title: firewalld命令
permalink: linux-firewalld
description: firewalld命令使用方法
cover: 
publish: true
date: 2023/07/31 15:08:16
updated: 2023/07/31 15:44:28
tags:
  - linux
  - centos
  - firewalld
  - firewall-cmd
---

## centos7 防火墙管理

CentOS7中，采用 `firewalld` 服务来进行防火墙管理，本文不定期更新其常用命令及说明。

### 防火墙开启/关闭/重启

```shell
systemctl start firewalld # 防火墙开启

systemctl stop firewalld # 关闭防火墙

systemctl restart firewalld # 重启防火墙

systemctl status firewalld # 防火墙状态查询

systemctl enable firewalld # 启用防火墙

systemctl disable firewalld # 禁用防火墙
```

### 端口管理

#### 查询已开启端口

```shell
firewall-cmd --list-ports
```

此命令及任何 `firewall-cmd` 命令均需要在 `firewalld` 服务开启状态下使用。

#### 开启指定端口

```shell
firewall-cmd --zone=public --add-port=${port}/tcp --permanent
```

`port` 即要开启的端口  
协议部分一般使用 `tcp` 除此之外还支持 `tcp|udp|sctp|dccp` 参数

修改后要使用以下命令重启生效

```shell
firewall-cmd --reload
```
 
