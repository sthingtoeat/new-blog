(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{435:function(t,e,n){},465:function(t,e,n){"use strict";n(435)},471:function(t,e,n){"use strict";n.r(e);var a=n(24),s=n(0);const o={"/":{message:"New content is available.",buttonText:"Refresh"},"/zh/":{message:"发现新内容可用",buttonText:"刷新"},"/ru/":{message:"Доступен новый контент.",buttonText:"Обновить"},"/uk/":{message:"Доступний новий контент.",buttonText:"Оновити"},"/ja/":{message:"新しいコンテンツがあります。",buttonText:"更新する"},"/es/":{message:"Hay nuevo contenido disponible.",buttonText:"Actualizar"}};var u={name:"SWUpdatePopup",data:()=>({rawPopupConfig:{message:"baka!有新的客人来了，还不快给本王去迎接！",buttonText:"这就去！"},updateEvent:null}),computed:{popupConfig(){return Object(s.h)(this,this.rawPopupConfig)},enabled(){return Boolean(this.popupConfig&&this.updateEvent)},message(){const t=this.popupConfig;return t&&t.message||o["/"].message},buttonText(){const t=this.popupConfig;return t&&t.buttonText||o["/"].buttonText}},created(){a.a.$on("sw-updated",this.onSWUpdated),!0==={message:"baka!有新的客人来了，还不快给本王去迎接！",buttonText:"这就去！"}&&(this.rawPopupConfig=o)},methods:{onSWUpdated(t){this.updateEvent=t},reload(){this.updateEvent&&(this.updateEvent.skipWaiting().then(()=>{location.reload(!0)}),this.updateEvent=null)}}},p=(n(465),n(3)),i=Object(p.a)(u,(function(){var t=this,e=t._self._c;return e("transition",{attrs:{name:"sw-update-popup"}},[t._t("default",(function(){return[t.enabled?e("div",{staticClass:"sw-update-popup"},[t._v("\n      "+t._s(t.message)+"\n\n      "),e("br"),t._v(" "),e("button",{on:{click:t.reload}},[t._v("\n        "+t._s(t.buttonText)+"\n      ")])]):t._e()]}),{reload:t.reload,enabled:t.enabled,message:t.message,buttonText:t.buttonText})],2)}),[],!1,null,"fec8b358",null);e.default=i.exports}}]);