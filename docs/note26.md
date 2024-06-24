---
title: redis注意事项
date: 2024-6-19
tags:
- SpringBoot
- redis
---

## 1.添加maven
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

## 2.配置文件
```
spring:
  redis:
    # Redis服务器地址
    host: 19.1.5.11
    # Redis服务器端口号
    port: 6379
    # 使用的数据库索引，默认是0
    database: 0
    # 连接超时时间
    timeout: 1800000
     # 设置密码
    password: "123456"
    lettuce:
      pool:
        # 最大阻塞等待时间，负数表示没有限制
        max-wait: -1
        # 连接池中的最大空闲连接
        max-idle: 5
        # 连接池中的最小空闲连接
        min-idle: 0
        # 连接池中最大连接数，负数表示没有限制
        max-active: 20

```

## 3.测试用例
```java
    @Autowired
    private RedisTemplate redisTemplate;
    @Test
    public void redis() {
        redisTemplate.opsForValue().set("name","卷心菜");
        String name = (String) redisTemplate.opsForValue().get("name");
        System.out.println(name); //卷心菜
    }
```

该测试用例在控制台可以正确输出卷心菜，但是在redis中，会被显示为`\xAC\xED\x00\x05t\x00`。这是由于使用默认对象`redisTemplate`时，会把value的值序列化为byte类型，使用下面的自定义话序列器即可避免

## 4.自定义序列化器

```java
@Configuration
public class RedisConfig {
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory)
            throws UnknownHostException {
        // 创建模板
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        // 设置连接工厂
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        // 设置序列化工具
        GenericJackson2JsonRedisSerializer jsonRedisSerializer =
                new GenericJackson2JsonRedisSerializer();
        // key和 hashKey采用 string序列化
        redisTemplate.setKeySerializer(RedisSerializer.string());
        redisTemplate.setHashKeySerializer(RedisSerializer.string());
        // value和 hashValue采用 JSON序列化
        redisTemplate.setValueSerializer(jsonRedisSerializer);
        redisTemplate.setHashValueSerializer(jsonRedisSerializer);
        return redisTemplate;
    }
}

```

使用该序列化器虽然可以避免上一条的问题，但是当k-v存储的V类型是一个对象(object)时，会被存储为类名，而且，反序列化的时候，如果你的v类型为`long`，很可能会被转化为int类型，导致转化失败。

把测试样例里的`private RedisTemplate redisTemplate;`换成`stringRedisTemplate`就行了。但是k-v只能存储string类型了。会比较麻烦