---
title: 在SpringBoot中使用rabbitMQ(快速上手版)
date: 2024-4-19
tags:
- 消息队列
categories:
- 后端
---
## 工作模式

::: tip 提示
这里简单看一下就好！你也可以参考这篇[文章](https://blog.csdn.net/qq_45173404/article/details/121687489)，这篇文章从底层开始讲，而本文为了实现快速上手使用了`RabbitTemplate`直接调用API，可能对底层的讲解不会很深刻。
:::

RabbitMQ有六种工作模式，分别是简单模式、Work模式、Pubsub模式、Routing模式、Topic模式、RPC模式。

其中，Pubsub、Routing、Topic可以归类为一种，只有交换机的类型不一样

### 简单模式

一个生产者一个队列一个消费者,使用默认交换机；应用场景：单聊。

### Work工作模式

一个生产者一个队列多个消费者，使用默认交换机，但是一条消息只能被一个消费者消费，工作队列有轮训分发和公平分发两种模式。轮训，每个消费者最后拿到的消息肯定是相等的；公平，能者多劳，消费者谁消费的快，那么他就拿更多的消息。应用场景：抢红包

### 交换机模式
::: tip 提示
交换机模式是指`Pubsub`、`Pubsub`、`Topic`三种模式，他们唯一的区别是交换机类型不同，交换机分别为`fanout`、`direct`、`topic`。但是交换机还有一种类型`headers`,这种类型可以传参
:::

`Pubsub`发布订阅模式(fanout)，一个生产者一个`fanout`交换机多个队列多个消费者，生产者把消息发给交换机，交换机绑定到多个队列，而每个队列都可以被监听的一个或多个消费者消费信息。应用场景：群聊、广告

`Routing`路由模式(direct)，一个生产者一个`direct`交换机多个队列多个消费者,生产者把信息发给交换机，交换机会发给**满足一定条件**的队列，实现消费者可以选择特定的队列进行消费。应用场景：项目中的Error报错

`Topic`主题模式(topic)，一个生产者一个`topic`交换机多个队列多个消费者,将路由键和某模式进行匹配，此时队列需要绑定在一个模式上，“#”匹配一个词或多个词，“*”只匹配一个词。与routing路由模式一致。

### RPC模式
Rpc模式

## 入门案例(简单模式)
::: tip 提示
你可以随便找一个项目进行测试，不算Maven依赖的时间的话，五分钟就能上手这个入门案例
:::

接下来展示`RabbitMQ`中的简单模式，最简单的生产消费案例，可以适用于简单的通信

### 1.配置pom.xml

加上下面的几个依赖，出现问题的话请去Maven官网搜索找到最新的依赖加入

[Maven](https://mvnrepository.com/)

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-websocket</artifactId>
            <version>2.7.2</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-amqp</artifactId>
            <version>3.2.4</version>
        </dependency>
```

### 2.配置一下application.properties
```yml
server.port=3003 #这个端口可以自己改

spring.rabbitmq.virtual-host=/

spring.rabbitmq.host=127.0.0.1
spring.rabbitmq.port=5672
spring.rabbitmq.username=guest
spring.rabbitmq.password=guest
```

### 3.加上SpringBoot启动类

```java
@SpringBootApplication
public class ChatSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChatSystemApplication.class, args);
    }
}

```

### 3.写一个MessageSendController用于发送信息(生产者Producer)

```java
@RestController
public class MessageSendController {

    @Autowired
    private RabbitTemplate rabbitTemplate;
    //Rabbitmq可以直接使用rabbitTemplate里面的方法来发送消息
    //当然你也可以从底层开始写。至少这样方便点

    @RequestMapping("/message/send")
    //地址也可以改成你想要的

    public String SendMessage(String msg){

        rabbitTemplate.convertAndSend("","queue1",msg);
        //三个参数，第一个为交换机名称，简单模式则为空串，第二个为队列名称，第三个是发送的内容
        return "发送成功";
    }
}
```

::: warning 注意
`queue1`其实是路由键，若路由键与队列名称一致，则无妨。路由键可以写成这样`*.com`，这时候，所有以`.com`结尾的名称的队列都会被匹配到，例如`abc.com`、`abcdef.com`。`#`表示一个字符，而`*`表示一个或多个字符。
:::

### 4.创建一个队列

输入地址`http:localhost:15672`,用用户名和密码均为`guest`的账户登录`rabbitmq`

找到`Queues and Streams`在里面添加一个名为`queue1`的队列，名称可以换成你想要的，但是上面的`controller`里也得更换队列的名称。

### 5.尝试发送信息

启动SpringBoot，然后去浏览器输入地址,例如下面的地址:`http://localhost:3003/message/send?msg=hi`

::: tip 提示
这里解释一下参数：`http://localhost:3003`,`3003`是`application.properties`中设置的server端口。

`/message/send`是`Controller`中设置的`@RequestMapping("/message/send")`地址

`?msg=hi`是url传参，传给方法中的msg

:::

页面会显示发送成功，这个发送成功就是你在controller中`return`的内容

这时候你就可以在管理页面中找到`queue1`队列，看到里面Ready由0变成了1。

### 6.新建一个MessageReceiveController用于接收消息(消费者Consumer)

```java
@RestController
public class MessageReceiveController {

    @RabbitListener(queuesToDeclare = @Queue("queue1"))
    public void consumer(String msg){

        System.out.println("成功接收到消息:" + msg);
    }


}

```
写完以后记得重启SpringBoot,然后你就可以在控制台看到消息了。这时候你再去`RabbitMQ`的管理页面看，消息又会变成Ready0。至此，消费成功。

