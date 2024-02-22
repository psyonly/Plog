---
title: Hyper-V远程管理
permalink: hyperv-remote
description: 局域网内远程管理Hyper-V
cover: 
publish: true
date: 2024/02/22 11:29:05
updated: 2024/02/22 17:05:07
tags:
  - hyperv
  - windows
---

## 背景

最近要搭建一个CM服务器，手头有一台Windows的NAS，于是在上面通过Hyper-V部署一个CentOS来运行CM服务器。但是每次都要从

主力机上远程到NAS对Hyper-V进行管理，很不方便，于是想直接从主力机的Hyper-V管理器远程连接上NAS的Hyper-V。
找遍了网上的教程，大多数说的不够清晰明白，于是以我的环境为例，做一篇分享。

## 环境

| 机器 | 系统 | 用途 | IP | 备注 |  
|-|-|-|-|-|  
| 主力机 | Windows LTSC | 日常办公娱乐 | 192.168.1.105 |  |  
| NAS服务器 | Windows LTSC | 存储 | 192.168.1.205 | 已安装好Hyper-V和CentOS服务器 |  


两个服务器均登陆了同一个Microsoft账号。

(image)(两机截图)

两者在同一网段，且可以相互ping通。

(image)(本机ping NAS域名截图)

下文统称主力机为本机，NAS为服务器。

## 服务端配置

打开 `powershell` 运行以下命令：

```shell 
Enable-PSRemoting # 开启远程管理

Enable-WSManCredSSP -role server # 开启CredSSP身份验证

netsh advfirewall set currentprofile state off # 关闭防火墙
```

## 客户端配置

1. 启用Hyper-V管理工具

前往 `设置-程序和功能-启用或关闭Windows功能` 勾选Hyper-V管理工具。

注意，这里本机不安装虚拟机，只连接到服务器的Hyper-V，因此只需要安装管理工具即可，不需要安装Hyper-V平台。

(image)(启用Hyper-V截图)

2. HOSTS记录添加

先用命令ping一下服务器的计算机名，如果可以通就跳过本步骤。

(image)(本机ping服务器计算机名)

如果无法ping通，则添加以下内容到 `C:\Windows\System32\drivers\etc\hosts`

```shell
192.168.1.205		NAS
```

将IP替换为你的服务器地址，域名修改为对应服务器的计算机名。完成后重新ping服务器测试是否成功。

3. 修改组策略

powershell运行 `gpedit.msc`，找到 `计算机配置-管理模板-凭据分配-系统-允许分配新的凭据用于NTLM服务器身份验证`

(image)(gpedit截图)

选择已启用，将以下内容添加到列表：

```shell
WSMAN/*
TERMSRV/*
```

(image)(设置项)

4. Windows远程管理配置

从powershell执行以下命令：

```
winrm quickconfig # 启用winrm

Set-Item WSMan:\localhost\Client\TrustedHosts -Value "NAS" # winrm安全配置 最后的值替换为服务器主机名

Enable-WSManCredSSP -Role client -DelegateComputer "NAS" # winrm身份验证配置
```

5. 连接Hyper-V服务器

打开Hyper-V管理器，在左上方的Hyper-V管理器上右键-连接到服务器在弹出的对话框中选择 `另一台计算机`，一定填写服务器

的计算机名称，不要填IP，勾选下方 `作为另一个用户连接`，输入用户名和密码，点击确定，此时就可以连接上服务器的

Hyper-V了。

(image)(连接到服务器)
(image)(输入用户名)

注意：此时如果选择用户失败，可以在用户名前添加 `.\。`

(image)(连接成功，Hyper-V服务器)


