---
title: springboot线程池
date: 2024-6-24
tags:
- SpringBoot
- 线程池
---

## 目的

使用线程池的目的，是为了减少频繁创建线程、销毁线程等操作带来的系统开销，也可以对线程数进行限制。

如果线程没有进行池化和统一管理，就会使得线程的上线数不可控。

## 注解使用

添加配置类
```java
@Configuration
@EnableAsync
public class ThreadPoolConfig implements AsyncConfigurer {
    /**
     * 项目共用线程池
     */
    public static final String MALLCHAT_EXECUTOR = "mallchatExecutor";
    /**
     * websocket通信线程池
     */
    public static final String WS_EXECUTOR = "websocketExecutor";

    @Override
    public Executor getAsyncExecutor() {
        return mallchatExecutor();
    }

    @Bean(MALLCHAT_EXECUTOR)
    @Primary
    public ThreadPoolTaskExecutor mallchatExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);   //核心线程数
        executor.setMaxPoolSize(10);    //最大线程数
        executor.setQueueCapacity(200); //队列容量
        executor.setThreadNamePrefix("mallchat-executor-");//给线程添加名称前缀，调试的时候有帮助
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());//满了调用线程执行，认为重要任务，满了的时候会让调用方自己去执行，因为线程池已经满了
        executor.initialize();
        return executor;
    }
}
```
然后，准备测试一下
```java
    @Async
    public void renewalTokenIfNecessary(String token) {
        ...
    }
```
加上这个注解`@Async`即可。有这个注解的方法被称为异步方法，调用这个方法时，会在调用方的当前线程以外的独立线程执行此方法。可以注解到类上，这样这个类的所有方法都是异步执行的。 