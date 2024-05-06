---
title: js中的时间戳转换
date: 2022-5-10
tags:
 - 其他
---

```js
//时间戳转换成当前时间
    const getDate = (x) => {
      //当前系统时间戳
      const current_time_intervar = new Date();
      //消息发送时的时间戳
      const date = new Date(Number(x)); //这里需要传入的是一个数字型变量
      const years = date.getFullYear();
      const months = date.getMonth() + 1;
      const days = date.getDate();
      const hours = date.getHours();
      const minute = date.getMinutes().toString().padStart(2, '0');
    
      //时间戳差值如果跨年则显示包括年份的完整时间
      if(current_time_intervar.getFullYear() - years > 0){
        return years + "年" + months+ "月" + days + "日" + hours + ":" + minute;
      }
      //时间戳差值超过一个星期则显示包含月份的日期
      if(current_time_intervar.getDate() - days > 6){
        return (months + 1)+ "月" + days + "日" + hours + ":" + minute;
      }
      //时间戳差值超过两天则显示星期几，此处待优化
      if(current_time_intervar.getDate() - days > 2){
        const week = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        return week[days % 7] + date.getHours() + ":" + minute;
      }
      //时间戳差值如果夸日则显示昨天
      if(current_time_intervar.getDate() - days === 1){
        return "昨天" + hours + ":" + minute;
      }
      //判断凌晨、上午、下午
      //消息发送时的时间戳如果是在下午

      if(hours < 6){
        return "凌晨" + hours + ":" + minute;
      }else if(hours < 12){
        return "上午" + hours + ":" + minute;
      }else if(hours == 12){
        return "中午" + hours + ":" + minute;
      }else if(hours < 18){
        return "下午" + hours + ":" + minute;
      }else if(hours < 24){
        return "晚上" + hours + ":" + minute;
      }
      

    }
```