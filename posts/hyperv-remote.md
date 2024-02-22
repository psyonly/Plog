---
title: Hyper-V Զ�̹���
permalink: hyperv-remote
description: Hyper-V ��������Զ�̹���
cover: 
publish: true
date: 2024/02/22 11:29:05
updated: 2024/02/22 16:57:00
tags:
  - hyper-v
  - windows
---

## ����

���Ҫ�һ��CM����������ͷ��һ̨Windows��NAS������������ͨ��Hyper-V����һ��CentOS������CM������������ÿ�ζ�Ҫ����������Զ�̵�NAS��Hyper-V���й����ܲ����㣬������ֱ�Ӵ���������Hyper-V������Զ��������NAS��Hyper-V��
�ұ������ϵĽ̳̣������˵�Ĳ����������ף��������ҵĻ���Ϊ������һƪ����

## ����

| ���� | ϵͳ | ��; | IP | ��ע |
|-|-|-|-|-|
| ������ | Windows LTSC | �ճ��칫���� | 192.168.1.105 |  |
| NAS������ | Windows LTSC | �洢 | 192.168.1.205 | �Ѱ�װ��Hyper-V��CentOS������ |


��������������½��ͬһ��Microsoft�˺š�

(image)(������ͼ)

������ͬһ���Σ��ҿ����໥pingͨ��

(image)(����ping NAS������ͼ)

����ͳ��������Ϊ������NASΪ��������

## ���������

�� `powershell` �����������

```shell 
Enable-PSRemoting # ����Զ�̹���

Enable-WSManCredSSP -role server # ����CredSSP�����֤

netsh advfirewall set currentprofile state off # �رշ���ǽ
```

## �ͻ�������

1. ����Hyper-V������

ǰ�� `����-����͹���-���û�ر�Windows����` ��ѡHyper-V�����ߡ�

ע�⣬���ﱾ������װ�������ֻ���ӵ���������Hyper-V�����ֻ��Ҫ��װ�����߼��ɣ�����Ҫ��װHyper-Vƽ̨��

(image)(����Hyper-V��ͼ)

2. HOSTS��¼���

��������pingһ�·������ļ���������������ͨ�����������衣

(image)(����ping�������������)

����޷�pingͨ��������������ݵ� `C:\Windows\System32\drivers\etc\hosts`

```shell
192.168.1.205		NAS
```

��IP�滻Ϊ��ķ�������ַ�������޸�Ϊ��Ӧ�������ļ����������ɺ�����ping�����������Ƿ�ɹ���

3. �޸������

powershell���� `gpedit.msc`���ҵ� `���������-����ģ��-ƾ�ݷ���-ϵͳ-��������µ�ƾ������NTLM�����������֤`

(image)(gpedit��ͼ)

ѡ�������ã�������������ӵ��б�

```shell
WSMAN/*
TERMSRV/*
```

(image)(������)

4. WindowsԶ�̹�������

��powershellִ���������

```
winrm quickconfig # ����winrm

Set-Item WSMan:\localhost\Client\TrustedHosts -Value "NAS" # winrm��ȫ���� ����ֵ�滻Ϊ������������

Enable-WSManCredSSP -Role client -DelegateComputer "NAS" # winrm�����֤����
```

5. ����Hyper-V������

��Hyper-V�������������Ϸ���Hyper-V���������Ҽ�-���ӵ��������ڵ����ĶԻ�����ѡ�� `��һ̨�����`��һ����д�������ļ�������ƣ���Ҫ��IP����ѡ�·� `��Ϊ��һ���û�����`�������û��������룬���ȷ������ʱ�Ϳ��������Ϸ�������Hyper-V�ˡ�

(image)(���ӵ�������)
(image)(�����û���)

ע�⣺��ʱ���ѡ���û�ʧ�ܣ��������û���ǰ��� `.\��`

(image)(���ӳɹ���Hyper-V������)


