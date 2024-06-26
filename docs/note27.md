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

```java
    @Async
    public void renewalTokenIfNecessary(String token) {
        ...
    }
```
加上这个注解`@Async`即可。有这个注解的方法被称为异步方法，调用这个方法时，会在调用方的当前线程以外的独立线程执行此方法。可以注解到类上，这样这个类的所有方法都是异步执行的。 