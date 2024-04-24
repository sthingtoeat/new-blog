---
title: 如何在WebSocket中接收RabbitmQ信息
date: 2024-4-24
tags:
- WebSocket
- 消息队列
categories:
- 后端
---

很简单，把监听方法写到WebSocket里面就好了啊。

```java
@ServerEndpoint("/websocket/{id}")
public class WebSocketServer {

    @OnOpen
    public void onOpen(Session session ,@PathParam("id") String id) {
        // 建立连接
        
    }

    @OnClose
    public void onClose() {
        // 关闭链接

    }

    @OnMessage
    public void onMessage(String message) {
        // 从Client接收消息
        System.out.println("从前端接收到信息：" + message);
    }

    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }

    //监听方法
    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "chatroom"),
            exchange = @Exchange(value = "chatroom" , type = "direct"),
            key = "chatroom"
    ))
    public void receive(Map<String , String> msg , @Header(AmqpHeaders.DELIVERY_TAG) long deliveryTag, Channel channel) throws IOException, EncodeException {
        System.out.println("Ws服务器接收到：" + msg);
        channel.basicAck(deliveryTag , true);
    }
}
```

如果有消息被发到`chatroom`这个交换机，则交换机会把消息发给绑定的队列`chatroom`队列和交换机同名。一旦队列中出现了消息，就会被监听方法接收到，然后你就可以通过`websocket`的api把信息发给前端啦。