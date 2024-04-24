---
title: 安装rabbitMQ
date: 2024-4-14
tags:
- 消息队列
categories:
- 后端
---

## 安装环境

::: tip 提示
下载太慢的话，可以试试魔法，或者之间去github找源码下载。
:::

### 1.安装Erlang 

[Erlang](https://www.erlang.org/downloads)

挑一个合适的版本进行安装即可。双击下载下来的exe文件夹，直接下一步，然后选个地方用于安装就好了。

然后配置一下环境变量，编辑**系统变量**，变量名为`ERLANG_HOME`,变量值为你安装的Erlang文件夹，注意，就是点进去就能看到`bin`、`doc`等文件夹的那个文件夹。

然后找到**用户变量**的`PATH`点击编辑，新建`%ERLANG_HOME%\bin`，然后保存退出就好了。

去cmd命令行里面输入`erl`会显示版本号这样一来就完成了。

### 2.安装RabbitMQ

[RabbitMQ](https://www.rabbitmq.com/docs/download)

找到合适的windows版本进行安装。一般选择64位，安装界面直接点`next`到底就完事了，等待安装完成。

第一次安装会自动运行`RabbitMQ`服务。如果你没有勾选自动运行，那么请看接下来的操作。

进入你`RabbitMQ`的安装目录，找到里面的`sbin`文件夹，进入，然后在里面以管理员身份打开命令行控制台。

```sh
//参考指令

rabbitmqctl status	    //查看当前状态
rabbitmq-plugins enable rabbitmq_management	//开启Web插件
rabbitmq-server start	//启动服务
rabbitmq-server stop	//停止服务
rabbitmq-server restart	//重启服务
```

按照上面的参考指令，如果你安装完成的时候没有启动服务，那么输入启动服务的那个指令就行。

::: tip 提示
`Suggestion [3,General]: 找不到命令 rabbitmq-server，但它确实存在于当前位置。默认情况下，Windows PowerShell 不会从当前位 置加载命令。如果信任此命令，请改为键入“.\rabbitmq-server”。有关详细信息，请参阅 "get-help about_Command_Precedence"。`

这可能是你没有以管理员身份启动导致的，按照提示，在指令前面加上`./`即可。例如`./rabbitmq-server start`
:::

然后执行下面的指令开启web插件:

```sh
rabbitmq-plugins enable rabbitmq_management

#或者可能是

./rabbitmq-plugins enable rabbitmq_management
```

启动完成以后，访问[http:localhost:15672](http:localhost:15672),有个默认用户，用户名和密码均为`guest`

能进入则成功。

