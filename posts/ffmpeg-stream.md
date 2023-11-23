---
title: 使用ffmpeg推流
permalink: ffmpeg-stream
description: 使用ffmpeg推视频流 并封装为系统服务
cover: 
publish: true
date: 2023/11/22 15:08:30
updated: 2023/11/23 11:31:17
tags:
  - ffmpeg
  - linux
---

## 使用ffmpeg在Linux环境下推视频流

很多时候会有在Linux(命令行环境)下推视频流的需求，这时候我们可以考虑使用一些开源的方案。  
本文将介绍一种使用ffmpeg的推流方案，并将其封装为系统级服务，支持更灵活的配置。

需要用到的软件清单：

* CentOS 7.6
* yasm
* ffmpeg-4.1
* mediamtx
* 一个或多个视频流文件

### yasm 安装

ffmpeg编译步骤依赖于 `yasm` ,如果系统未安装建议先安装。

下载源码后执行以下命令安装

```shell
# 解压
tar -zxvf yasm-1.3.0.tar.gz -C /usr/local/

# 切换解压目录
cd /usr/local/ysam-1.3.0

# 配置
./configure

# 编译
make 

# 安装
make install

```

### ffmpeg安装

下载源码后执行以下命令安装

```shell
# 解压
tar -xvf ffmpeg-4.1.tar.xz -C /usr/local/

# 切换解压目录
cd /usr/local

# 配置
./configure

# 编译
make

# 安装
make install

```

安装完成后，执行命令 `ffmpeg -version` 查看安装结果


### mediamtx
由于从ffmpeg生成的流需要推送到一个确定的流媒体服务器上，因此需要运行一个流媒体服务器应用，这里选用了比较适合rtsp流的 `mediamtx` 来做演示。

> [github仓库](https://github.com/bluenviron/mediamtx)

下载压缩包后执行以下命令

```shell
# 新建目录
mkdir /usr/local/mediamtx

# 解压
tar mediamtx_V1.0.0_linux_amd64.tar.gz -zxvf -C /usr/local/mediamtx/

# 切换目录
cd /usr/local/mediamtx

# 运行服务
./mediamtx ./mediamtx.yml

```


### 测试推流
首先运行 `mediamtx`，执行以下命令：
```shell
./mediamtx ./mediamtx.yml
```

再运行ffmpeg，推送一个rtsp视频流到流媒体服务器上
```shell
ffmpeg -stream_loop -l -re -i sample.mp4 -c copy -rtsp_transport tcp -f rtsp rtsp://127.0.0.1:8554/sample

```

视频流被推送到本地8554端口的 `/sample` 上，通过VLC或其他播放流、拉流软件即可看到视频播放。

### 封装自定义流

有些需求场景需求是服务器可以启动后自动推流、批量推流，对此，我们可以通过设置系统级别的服务来实现自动推流和批量推流。

#### 封装mediamtx服务

创建 `/etc/systemd/system/mediamtx.service` 文件，并写入以下内容：

```shell
[Unit]
Description=mediamtx
After=network-online.target

[Service]
Type=simple
Environment=HOME=/usr/local
ExecStart=/usr/local/mediamtx/mediamtx /usr/local/mediamtx/mediamtx.yml
PrivateTmp=true

[Install]
WantedBy=multi-user.target

```

#### 封装推流服务

创建 `/etc/systemd/system/stream_sample.service` 文件，并写入以下内容：

```shell
[Unit]
Description=stream_sample
After=network-online.target stream_sample.target

[Service]
Type=simple
Environment=HOME=/usr/local/ffmpeg-4.1
ExecStar=/usr/local/ffmpeg-4.1/ffmpeg -stream_loop -l -re -i /home/documents/sample.mp4 -c copy -rtsp_transport tcp -f rtsp rtsp://127.0.0.1:8554/sample
PrivateTmp=true
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target

```

只需要更改视频源及推送的流视频地址即可创建多个不同的视频流服务。  
将配置文件中的 `stream_sample` 部分修改成自定义的推流服务名称，视频源文件更改为对应文件，推送的rtsp地址也修改为自定义的地址。

#### 启用服务

启用刚添加的多个服务

```shell
systemctl enable mediamtx

systemctl enbale stream_sample

# 如有多个服务则顺次执行命令
```

重启服务器，通过 `systemctl status mediamtx` 可以看到对应服务已经成功启动。

