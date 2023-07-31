---
title: firewalld ����
permalink: linux-firewalld
description: firewalld����ʹ�÷���
cover: 
publish: true
date: 2023/07/31 15:08:16
updated: 2023/07/31 15:08:16
tags:
  - linux
  - centos
  - firewalld
---

## centos7 ����ǽ����

CentOS7�У�����firewalld���������з���ǽ�������Ĳ����ڸ����䳣�����˵����

### ����ǽ����/�ر�/����

```shell
systemctl start firewalld # ����ǽ����

systemctl stop firewalld # �رշ���ǽ

systemctl restart firewalld # ��������ǽ

systemctl status firewalld # ����ǽ״̬��ѯ

systemctl enable firewalld # ���÷���ǽ

systemctl disable firewalld # ���÷���ǽ
```

### �˿ڹ���

#### ��ѯ�ѿ����˿�

```shell
firewall-cmd --list-ports
```

������κ� `firewall-cmd` �������Ҫ�� `firewalld` ������״̬��ʹ�á�

#### ����ָ���˿�

```shell
firewall-cmd --zone=public --add-port=${port}/tcp --permanent
```

port��Ҫ�����Ķ˿�  
Э�鲿��һ��ʹ�� `tcp` ����֮�⻹֧�� `tcp|udp|sctp|dccp` ����

�޸ĺ�Ҫʹ����������������Ч

```shell
firewall-cmd --reload
```
 