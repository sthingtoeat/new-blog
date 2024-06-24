---
title: 服务器后台数据库报错
date: 2024-5-31
tags:
- mysql
---

## 连接异常

```
The last packet sent successfully to the server was 0 milliseconds ago.
```

数据连接的地址后面添加`&useSSL=false`即可

```
jdbc:mysql://127.0.0.1:3306/demo?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8&useSSL=false
```