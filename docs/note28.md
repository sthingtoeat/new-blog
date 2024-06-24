---
title: enum枚举类型
date: 2024-6-24
tags:
- Java
---

## 基本介绍

```java
enum Color 
{ 
    RED, GREEN, BLUE; 

    public void colorInfo()
    {
        ...
    }
} 
```
`enum`枚举类型除了在类里面有一堆枚举内容以外，其他和一般类完全一致，你可以在里面写相应的类方法。

## 可用的api方法
```java
enum Color 
{ 
    RED, GREEN, BLUE; 
} 

Color color =  Color.BLUE;  //赋值蓝色
Color[] a = Color.values(); //数组赋值，把枚举的所有值赋值给数组


for(Color i : a)            //枚举输出
{
    System.out.println(i);
}

```
