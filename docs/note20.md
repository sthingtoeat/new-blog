---
title: Vuex的使用
date: 2024-5-6
tags:
- 前端
categories:
- 前端
---

在vue3的图形化管理界面中，在插件或者依赖这边，会提示你安装`vuex`。

接下来我们了解一下这个是干什么的。

官网链接：[vuex](https://vuex.vuejs.org/zh/)

## 简单介绍

`vuex`是一个全局仓库`Store`，可以存放全局变量。具体细节请看上面的官方文档

## index.js

在你的项目路径中，如果你安装了`vuex`，那么就会生成一个`store`的文件夹，里面默认会有一个`index.js`文件，里面的主要结构如下：

```js
import { createStore } from 'vuex'

export default createStore({
  state: {         //存放变量
  },
  getters: {       //getter方法，主要用于获取state信息，可认为是store 的计算属性
  },
  mutations: {     //同步方法，主要用于对state信息的修改
  },
  actions: {       //异步方法，你可以在这里进行ajax通信
  },
  modules: {       //导入模块
    
  }
})
```

下面我们来看一个样例，你就可以了解到他们是干什么的了

## modules

我们先来看看模块的用法，因为这个一般写在`index.js`里面，可以对`store`进行分割

```js
//index.js
import { createStore } from 'vuex'
import ModuleUser from './user'                 //这些东西都是其他文件的位置
import ModulePk from './pk'                     //from 后面的文件后缀均为.js
import ModuleRecord from './record'             //
import ModuleContentList from './contentList'   //

export default createStore({
  state: {
    id:"",
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: ModuleUser,       //：左边是随便取的名，右边是导入的模块名
    pk: ModulePk,
    record: ModuleRecord,
    contentList:ModuleContentList,
  }
})

```

## 简单的访问state中的值

在`store`文件夹下,新建一个user.js

```js
//user.js

export default {
    state: {
        id: "",
        username: "",
        photo: "",
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
}
```
然后找个vue页面，并在script标签内部写下如下内容

```vue
<script>
import { useStore } from "vuex";    //首先导入这个包

export default {
    setup(){
        const store = useStore();
        const user_id_x = store.state.user.id //这样访问到user.js的id
        const user_id_y = store.state.id      //这样访问的是index.js的id
    }                   //store.state是固定写法，user是你在模块中取的名
}                       //当然如果你没有模块，则不用写这个，id则是user.js里的state中的参数
</script>
```

## state、getters、mutations

接下来，我们在`store`文件夹下新建`contentList.js`这个文件

```js
export default {
    state: [{                  //state可以是一个像这样复杂的二维数组
        id:"",                 //也可以是一个简单的数
        content_list:[{        //如果你初始化了一个这样的二维数组，则其下标为0的内容就是你这里写的内容
            user_id:"",     
            user_name:"",
            user_content:"",
            user_photo:"",
            time:"", 
        }]     
    }],
    state: {                   //注意，这里的state只能存在一个，这里只是举个例子
        id:"",                 //也可以是一个简单的数    
    },
    getters: {
        getContentById:(state) => (id) =>{  //getters里的方法，就是用来返回state的内容,这里传入state和id两个参数，但是实际上调用时，只需要一个id即可
        },
    }
    mutations: {
        addContent(state, content){         //这个函数用于给state添加内容，可以传入一个对象,例如content.user_id可以访问里面的值
            //....
        }
    },
    actions: {    
    },
    modules: {
    }
}
```

然后，我们来看看，该如何在其他页面调用这些方法

首先是`getters`里的方法
```js
store.getters.getContentById(id);//这样即可调用
//store.getters是固定用法


//当然你也可以封装成一个函数再调用
    const getStoreInfo = (id) =>{
      return store.getters.getContentById(id);
    }
```

接下来，是`mutations`里的方法，需要使用`commit`进行调用
```js
//这样就可以调用啦
    store.commit({
        type:"addContent",  //type后面的内容是你在store中的mutation力写的函数
        user_content:message.user_content,//这里就是传递的值，store可以访问user_content用于接收里面的值
      })

//当然你也可以封装成函数

    const saveMyContentToStore = (message) => {
      store.commit({
        type:"addContent",
        id:toWhichFriend.value + "",//修改为字符类型以统一类型
        user_id:message.user_id,
        user_name:message.user_name,
        user_content:message.user_content,
        user_photo:message.user_photo,
        time:message.time,
      })
    }
```

## action

action可以执行任意异步操作

```js
//user.js
import $ from 'jquery'

export default {
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        login(context, data) {
            $.ajax({
                url: "http://127.0.0.1:3000/user/account/token/",
                type: "post",
                data: {
                    username: data.username,
                    password: data.password,
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        localStorage.setItem("jwt_token", resp.token);
                        context.commit("updateToken", resp.token);
                        data.success(resp);
                    } else {
                        data.error(resp);
                    }
                },
                error(resp) {
                    data.error(resp);
                }
            });
        },
        logout(context) {
            localStorage.removeItem("jwt_token");
            context.commit("logout");
        }
    },
    modules: {
    }
}
```

那么我们该如何调用这里的方法呢，需要使用`dispatch`调用`action`方法看下面:

```js
              store.dispatch("login", {
                username: username.value,
                password: password.value,
                success() {
                },
                error() {
                }
            })

//当然你也可以用函数封装
        const login = () => {
            store.dispatch("login", {
                username: username.value,
                password: password.value,
                success() {
                },
                error() {
                }
            })
        }

```

