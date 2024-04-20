---
title: SpringBoot中的RabbitTemplate的使用
date: 2024-4-20
tags:
- 消息队列
---

RabbitTemplate最主要的两个方法只能实现发送和接收两种，具体的细节需要从底层开始学

## 发送消息

rabbitTemplate.convertAndSend("exchangeName" , "routingKey" ,"content")；

参数一"exchangeName"：交换机名称
参数二"routingKey"：路由键，即队列的名称
参数三"content"：发送的内容，也可以是个对象

## 获取消息

rabbitTemplate.receiveAndConvert("routingKey");

只有一个参数，参数是队列的名称。

将返回一个Object对象，可以进行强转
