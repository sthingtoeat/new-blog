---
title: WebSocket前后端通信
date: 2024-4-21
tags:
- WebSocket
categories:
- 后端
---

传统的Http链接，需要前端向后端发送一个请求，后端返回一个结果以后就会断开链接。而当我们需要实现实时通信，比如聊天功能的时候，总不能我聊一句。他回一句就断开连接吧？所以需要全双工的WebSocket链接，通信一次以后不会断开链接。而且ws还能实现监听的功能（我虽然没向你发送请求，但是你得返回信息给我）

下面按照Vue3 + SpringBoot前后端分离项目进行演示。

## Maven
```
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-websocket</artifactId>
            <version>2.7.2</version>
        </dependency>
```

## 配置项

在后端找个地方新建`WebSocketConfig`类

如果你没有配置此项，那么前端尝试建立链接的时候，会出现建立链接失败！

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

@Configuration
public class WebSocketConfig {

    @Bean
    public ServerEndpointExporter serverEndpointExporter() {

        return new ServerEndpointExporter();
    }
}
```

## 后端

后端注意一下几个注解即可，像前端发送消息可以调用session里面的的方法，下面有演示。

```java
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Component                                  //把自己注册为组件，方便塞进Set里
@ServerEndpoint("/websocket/{id}")          //通信的地址
public class WebSocketServer {
    //static保证了唯一性，可以通过Set集合(当然也可以用ConCurrentHashMap)访问其他WebSocketServer
    private static Set<WebSocketServer> webSocketServerSet = new HashSet<>();
    //记录当前链接的一些信息
    private Integer userId = null;

    //这里的Session是WebSocket的一个包，别导错包！
    private Session session = null;

    //建立连接时自动调用此方法
    @OnOpen
    public void onOpen(Session session ,@PathParam("id") String id) {
        // 建立连接
        this.session = session;
        webSocketServerSet.add(this);
        userId = Integer.parseInt(id);
        System.out.println("用户:"+ id + "已连接成功,当前在线人数：" + webSocketServerSet.size());
    }

    //断开连接时自动调用此方法
    @OnClose
    public void onClose() {
        // 关闭链接
        webSocketServerSet.remove(this);
        System.out.println("用户:"+ userId + "已离线");
    }

    //如果有接收到前端的消息，则会自动调用这里的方法
    @OnMessage
    public void onMessage(String message) {
        // 从Client接收消息

        System.out.println("从前端接收到了消息，内容为：" + message);
    }

    //出错以后自动调用此方法
    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }

    //写一个函数用于向前端发送信息，想要给前端发消息，就调用此函数
    public void sendMessage(String message){
        synchronized (this.session){        //不能改成final
            try{
                this.session.getBasicRemote().sendText(message);    //websocket发送信息的api
                //如果是一个对象则可以尝试把message变成JSON字符串发送,比如导入FastJson的maven包
            }catch (IOException e){
                e.printStackTrace();
            }
        }
    }
}
```

## 前端

```js
<script>
export default {
  setup() {

    const user_id = "123";
    //书写连接,如果你的链接需要传递变量，则需要使用``反引号,此时不可使用""双引号
    const socketUrl = `ws://127.0.0.1:3003/websocket/${user_id}`;

    let socket = null;
    //挂载时(进入聊天室)自动调用这个函数，同时持续到取消挂载为止
    onMounted(() => {
      //新建ws链接
      socket = new WebSocket(socketUrl)

      //和后端同理，打开链接时自动调用这个函数
      socket.onopen = () => {
        console.log(user_id +"你已成功连接");
      }
 
      //收到数据时调用这个函数，message是形参，后端的数据被放在message.data里
      //data并不是后端声明的变量。
      socket.onmessage = (message) => {
        console.log("从后端接收到消息啦，内容为：" + message.data);

        //如果接收的是一个JSON字符串，则需要先解析为js对象才能使用
        //const msg = JSON.parse(message.data);
        //console.log(msg);
      }

      socket.onclose = () => {
        console.log("用户" + user_id + "已断开连接");
      }

    });
    
    //取消挂载(退出网页或浏览器)时自动调用这个函数
    onUnmounted(() => {
      socket.close();
    });

  },
};
</script>
```

看看前端控制台，就能成功了。

## 注意事项(在Websocket里面使用@Autowired注解)

如果你将WebSocket这个链接注册成了上面后端展示的样子，而你正好想调用自动注入的api,就需要用下面的办法

```java
    private static UserInfoGetService userInfoGetService; //加一个static对象

    @Autowired                                            //自动注入一个方法
    private void setUserInfoGetService(UserInfoGetService  userInfoGetService) {
            WebSocketServer.userInfoGetService = userInfoGetService;//在方法里面使用注解里面的api
    }

public void sendMemberInfoWhenOpen(){
                          
        String thisPhoto = userInfoGetService.GetPhotoById(userId);   //这样才能使用注解的自动注入      
        String thisUsername = userInfoGetService.GetUsernameById
    }
```
