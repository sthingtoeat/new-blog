---
title: RabbitTemplate的使用、使用注解绑定交换机和队列、手动ACK
date: 2024-4-20
tags:
- 消息队列
categories:
- 后端
---

::: warning 注意
RabbitTemplate最主要的两个方法只能实现发送和接收两种，具体的细节需要从底层开始学
:::
## 发送消息
```java
rabbitTemplate.convertAndSend("exchangeName" , "routingKey" ,"content")；
```
参数一`exchangeName`：交换机名称

参数二`routingKey`：路由键，即队列的名称

参数三`content`：发送的内容，也可以是个对象

## 获取消息
```java
rabbitTemplate.receiveAndConvert("routingKey");
```
只有一个参数，参数是队列的名称。

将返回一个Object对象，可以进行强转

## 使用注解在消费者这里绑定交换机队列

注解看着会比较麻烦，但是会习惯的。

```java
@RestController
public class MessageReceiveController2 {

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "queue2"),                           //监听队列的名称
            exchange = @Exchange(value = "chatroom",type = "fanout"),   //交换机
            key = ""))                                                  //路由键
    public void consumer(String msg) {
        System.out.println("消费者2成功接收到消息:" + msg);
    }

}

```

```java
@RestController
public class MessageReceiveController2 {

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue                           //这样写是匿名队列
            exchange = @Exchange(value = "chatroom",type = "fanout"),   //交换机
            key = ""))                                                  //路由键
    public void consumer(String msg) {
        System.out.println("消费者2成功接收到消息:" + msg);
    }

}

```

## 手动ACK

当你发现basicAck出现了爆红而不知道该怎么办的时候，如下

```java
public void consumer(String msg , @Header(AmqpHeaders.DELIVERY_TAG) long deliveryTag, Channel channel) throws IOException {
        System.out.println("消费者2成功接收到消息:" + msg);
        channel.basicAck(deliveryTag,true); //这一句的basicACK爆红
    }
```

只需要在`application.properties`文件添加以下内容：

```yml
spring.rabbitmq.listener.simple.acknowledge-mode=manual
spring.rabbitmq.listener.simple.prefetch=1
```

即可解决。

没有手动ACK前的代码：
```java
public void consumer(String msg) {
        System.out.println("消费者2成功接收到消息:" + msg);
    }
```

手动ACK的代码：
```java
public void consumer(String msg , @Header(AmqpHeaders.DELIVERY_TAG) long deliveryTag, Channel channel) throws IOException {
        System.out.println("消费者2成功接收到消息:" + msg);
        channel.basicAck(deliveryTag,true);
```