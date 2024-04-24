---
title: Vue3基础操作
date: 2024-4-24
tags:
- 前端
categories:
- 前端
---

这里主要记录一些vue3中的用法

一个vue文件的内容主要如下
```vue
<template>
                //html代码
</template>

<script>
                //js或ts脚本
</script>

<style>
                //css样式
</style>

```

## 1.reactive和ref

他们是响应式对象，数值的变更会直接在页面上改变

使用时，千万不能直接被赋值，否则响应式会失效

```js
let input_content = ref("");

input_content = "输入内容";     //这样就会失去响应式

input_content.value = "输入内容"//这样就不会失去响应式

```
```vue
<script>
import { ref ,reactive } from "vue"       
export default {
    setup(){
        let input_content = ref("");    //一般是一个值
        let content_list = reactive(    //可以是个数组，也同时可以塞入一个结构体
            [
              {
               user_id:"",
               user_content:"",
               user_photo:null,
               time:"",
               },
               {
               user_id:"",
               user_content:"",
               user_photo:null,
               time:"",
               },
            ],
        ) 

        const update = () => {          //函数这样写，()中可以传参
            let a = input_content.value //ref用.value来传值

            let b = content_list[0].user_id //访问数组中的内容，reactive没有.value

            content_list.push({         //添加数组
                user_id:"123",
                user_content:"用户内容",
                user_photo:"图片地址",
                time:"22:22",
                })
            }

            content_list.splice(0 , 2); //删除content_list中下标从0开始的两个数组
        }

    }
}       
</script>
```

## 2.props(父子组件传值)

### 父给子传值

假设有个父组件是这样的：
```vue
<template>
<ContentBase>
    <div class="row">
      <div class="col-3">			        //:user是v-bind:的缩写，user表示kv中的key,等号后面的"user"这个表示实际的参数(value),也可以传一个表达式
        <UserProgfileInfo :user="user"/>	//给子组件UserProfileInfo传递值
      </div>
      <div class="col-9">
        <UserProfilePosts/>
      </div>
    </div>    
</ContentBase>
</template>

```
其中，需要给`UserProgfileInfo`这个子组件传值

`user`这个变量已在父组件的js中赋予了一定的值具体如下
```js
const user = reactive({
      username:"233",
      lastName:"2",
      firstName:"33",
      followerCount:0,
      is_followed:false,
    });

```

而子组件`UserProgfileInfo`的js是这样的

```vue
<script>
import {computed} from 'vue'

export default {
    props:{			    //用props定义接收的数据类型
        user:{			//接收一个叫user的对象,这个user可以直接在html标签里面使用，如<img class="img-fluid" :src="user.photo">
            type:Object,	//类型为object
            required:true,	//是否必须有值（非空）,true
        }
    },
    setup(props) {		//不能使用this访问到props值，所以需要传入props
        let fullName = computed(() =>{return props.user.lastName + '' +props.user.firstName});//这样就可以使用父组件传进来的内容了

        return {
            fullName,
        }
    },
}
</script>
```

### 子给父传值

父组件如下
```vue
<template>
<ContentBase>
    <div class="row">
      <div class="col-3">	<!--这里的follow是自定义的绑定事件名字可以任取，"follow"是父组件的一个函数--->
        <UserProgfileInfo @follow="follow" @unfollow="unfollow" :user="user"/>
      </div>
      <div class="col-9">
        <UserProfilePosts/>
      </div>
    </div>
    
  </ContentBase>
</template>
<script>
export default {
setup(){
    const user = reactive({
      username:"233",
      lastName:"2",
      firstName:"33",
      followerCount:0,
      is_followed:false,
    });

    const follow = () =>{               //函数
      if(user.is_followed) return;
      user.is_followed = true;
      user.followerCount ++;
    }

    const unfollow = () => {            //函数
      if(!user.is_followed) return;
      user.is_followed = false;
      user.followerCount --;
    }

    return {
      user,
      follow,
      unfollow,
    }
  }
}
</script>
```

子组件的js如下

```js
export default {
    //在setup函数里面传入参数context
    setup(props,context) {	//这里如果不用props只要用context的话，也得传入props进行占位，不然报错
        
        const follow = () => {
            context.emit("follow");		//使用context.emit触发来自父组件的中，按在对应子组件中的follow自定义事件，以达到修改参数的目的
        }					//context.emit("follow" , 123);	可以把值传过去
        
        const unfollow = () => {
            context.emit("unfollow");
        }

        return {
            follow,
            unfollow,
        }
    },
}
```

## 3.computed计算

返回一个动态计算的值,函数需要return
```js
export default {
    setup(props) {  //fullName会经过计算以后再赋值
        let fullName = computed(() =>{return props.user.lastName + '' +props.user.firstName});
			//或者computed(() => props.user.lastName + '' +props.user.firstName);
        return {
            fullName,
        }
    },
}
```

## 4.标签绑定点击事件

```vue
<template>
    <!--@click是v-on:click的简写,follow是一个函数，且不含()--->
    <button @click="follow" v-if="!user.is_followered" type="button" class="btn btn-primary btn-sm">关注</button>
</template>
<script>
export default {
    setup() {  
        
        const follow = () => [
            //...
        ]

        return {
            follow,
        }
    },
}
</script>

```

## 5.v-for标签循环

```vue
<template>
    <!-----这里要看传进来的数据有几层， :key只要保证唯一就行，不写会报错--->
    <div v-for="item in posts" :key="item.id">
    <!--<div v-for="item in posts" :key="item">像这样也可-->	
        <div class="card">
            <div class="card-body">
                {{item.content}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    setup() {  
        
        let posts = reactive([
            {
                content:"内容1",
            },
            {
                content:"内容2",
            }
        ])

        return {
            posts,
        }
    },
}
</script>
```

## 6.v-model双向绑定

```vue
<template>
    <div class="form-floating">
        <!---v-model把这个文本框的内容和content这个变量绑定在一起了-->
        <textarea v-model="content" placeholder="请输入.." ></textarea>
        <label for="floatingTextarea">在此编辑帖子信息</label>
        <button type="button" class="btn btn-primary btn-sm">发帖</button>
    </div>
</template>
<script>
export default {
    setup(){
        //你上面输入了什么，那content里面就是什么值
        let content = ref("");		//这样赋值可以使得content内容默认为空

        return {
            content,
        }
    }
}
</script>
```

## 7.vue-router的用法-router文件夹下的index.js

若index.js文件内容如下
```js
import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from '../views/pk/PkIndexView'
import store from '../store/index'

const routes = [
  {
    path: "/",              //浏览器访问地址如127.0.0.1:8080/
    name: "home",           //给这个路由取名为home
    redirect: "/pk/",       //重定向地址
    meta: {                 
      requestAuth: true,    //是否需要授权
    }
  },
  {
    path: "/pk/",
    name: "pk_index",
    component: PkIndexView,
    meta: {
      requestAuth: true,
    }
  }，
  {                         //例如访问127.0.0.1:8080/pk/2
    path: "/pk/:userId/",   //这样可以在跳转页面的同时传递值
    name: "pk_id",          
    component: PkIndexView,
    meta: {
      requestAuth: true,
    }
  }，
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

在跳转的页面中，你可以这样使用传过来的数值

```vue
<script>
import {useRoute} from 'vue-router'	//需要用到useRoute

export default {
    setup(){
        //地址输入了什么，
        const route = useRoute();
	    console.log(route.params.userId)	//像这样就可以使用了
    }
}
</script>

```

## 8.Store全局变量

若文件夹store有`index.js`、`user.js`这两个文件

`index.js`如下
```js
import { createStore } from 'vuex'
import ModuleUser from 'user.js的文件地址'			//有写好的模块可以引入

export default createStore({
  state: {					//state里面,存对象，也可以直接存属性
    user:{
      username:"",
      id:"",
      firstName:"",
      lastName:"",
    }
    
  },
  getters: {					//getter用于获取state中不能直接获取的内容，比如这里的全名，需要
    fullName(state){				//通过加法才能获取，而且不修改state里面的内容
      return state.user.firstName + state.user.lastName;
     }
  },
  mutations: {					//mutations可以对state里面的值进行更改赋值，但是只能执行同步操作
	updateUser(state,user){			//例如，从服务器获取信息并给一个值赋值，这样是不行的
		state.user.username=user.username//mutation只能完成给一个值赋值，获取值这一步则由下面的
	}					//actions完成
  },		
  actions: {					//actions对state的各种操作，可以执行异步操作，完成从服务器获取值并赋值给一个值的操作
    updateUser(context,data){			//比如这里，resp假设是从服务器获取的内容
      let resp;					//具体修改赋值，需要去上面的mutation修改
      context.state.user.useranme		//但是像这样是访问不到的，
    }
  },
  modules: {					//modules可以从别的地方导包,里面的包也同样具有以上state...actions这些属性
	user2:ModuleUser,			//可以用store.state.user2.content来访问到内容"2333"
  }						//可以用于分类数据,上面这些都可以搬到别的地方然后再通过modules导入进来，让代码看着不这么长
})

```

`user.js`
```js
const ModuleUser={

  state: {
	content:"2333"
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
};

export default ModuleUser			//导出以供index.js导入
```

## 9.使用Store全局变量中的函数

依然在store文件夹下，有`index.js`、`user.js`两个文件

index.js内容如下
```js
import { createStore } from 'vuex'
import ModuleUser from './user'				//导入不能忘记

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user:ModuleUser,						//在这里引入这个模块即可,取名为user
  }
})

}

```

user.js文件内容如下
```js
import $ from 'jquery'
const ModuleUser={

  state: {
      id:"",
      username:"",
      photo:"",
      followerCount:0,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
      login(context , data){					//context和data是官方api, context传递api，用不到也得写，用来站位,data则是数据
        $.ajax({						
          url:"https://app165.acapp.acwing.com.cn/api/token/",
          type:"post",
          data:{
            username:data.username,
            password:data.password,
          },
          success(resp){					
            console.log(resp);
          }
        })
      }
  },
  modules: {
  }
};

export default ModuleUser					//引出去，来让index.js导入

```

那么如何使用store中的函数呢，请看下面：

这是在一个vue文件里，
```vue
<script>
import ContentBase from '../components/ContentBase.vue';
import {ref} from 'vue'
import {useStore} from 'vuex'			//引入全局变量

export default {
  
  setup(){
    const store = useStore();			//创建一个存有全局变量的对象
    const username = ref('');
    const password = ref('');
    const error_message = ref('');

    const login = () =>{
      store.dispatch("login",{			//使用store里面名为login的函数，{}内是传入的参数(data)
        username:username.value,		//写法按照这样就行
        password:password.value,
        success(){				//如果成功或失败需要执行函数的话（回调函数），也得写在dispatch的{}里面，其实就是和数据一起被传过去了
          console.log("success");		//可以在传入以后被调用
        },
        error(){
          console.log("failed");
        }
      })
    }

    return{
      username,
      password,
      error_message,
      login,
    }
  }
</script>

```

## 10.获取token、解码、jwt验证

store文件夹下的index.js
```js
import jwt_decode from 'jwt-decode';			//控制台输入npm i jwt_decode进行下载
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
      login(context , data){
        $.ajax({
          url:"https://app165.acapp.acwing.com.cn/api/token/",
          type:"post",
          data:{
            username:data.username,
            password:data.password,
          },
          success(resp){				//上面那个是获取到了编码过的token，获取成功以后执行下面的解码过程
            const {access , refresh} = resp;
            const access_obj = jwt_decode(access);	//调用解码函数
            $.ajax({
              url:"htttps://app165.acapp.acwing.com.cn/myspace/getinfo/",
              type:"get",
              data:{
                user_id : access_obj.user_id,
              },
              headers:{
                'Authorization':"Bearer "+ access,	//用户进行jwt验证，这里直接记住就行，如果是‘Authentication’则是身份验证
              },
              success(resp){{
                console.log(resp , refresh);
              }}
            })
          }
        })
      }
  },

  modules: {
  }
})

}
```

## 11.actions调用mutations的方法(异步调用同步方法)

仍然是在store文件夹下的index.js

```js
import jwt_decode from 'jwt-decode';			//控制台输入npm i jwt_decode进行下载
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {							//可以更新state，但是不能执行异步操作
      updateUser(state,user){
        //更新user的state
        state.id = user.id;					//且这里不能直接state = user,需要一条一条给子组件赋值
        state.username = user.username;
        state.photo = user.photo;
        state.followerCount = user.followerCount;
        state.access = user.access;
        state.refresh = user.refresh;
        state.is_login = user.is_login;
      },
  },
  actions: {							//异步，但不能更新state的内容
      login(context , data){
        context.commit("updateUser", {			//使用context的commit方法调用mutation内的函数
        ...resp,					//解构resp，resp里面包了一堆类似 “username:233 ，password:233,..”的东西
        access:access,				//	作用就是提出来，然后赋值给对应的内容
        refresh:refresh,
        is_login:true,
    });
    }
  },

  modules: {
  }
})

```

## 12.过滤器

```vue
<script>

export default {
  
  setup(){
        //x里面有id等属性
        const deletePost = (post_id) =>{
        posts.posts = posts.posts.filter(x => x.id !== post_id);		//先遍历posts.posts里的东西，再把括号里面满足条件的过滤掉（删除）
        posts.count = posts.posts.length;
        }
    }

    return{
      
    }
  }
</script>
```