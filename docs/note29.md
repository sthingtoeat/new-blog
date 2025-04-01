---
title: spring异常捕获
date: 2024-6-24
tags:
- SpringBoot
- 异常捕获
---

如果一个异常未被捕获，从线程中抛了出来。JVM会回调一个方法`dispatchUncaughtException`