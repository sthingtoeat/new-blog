(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{354:function(t,e,o){"use strict";o.d(e,"a",(function(){return a})),o.d(e,"b",(function(){return r}));o(141);var n=o(1);function a(){const t=Object(n.d)();if(!t)throw new Error("must be called in setup");return(null==t?void 0:t.proxy)||{}}function r(){const t=Object(n.h)(!1);return Object(n.e)(()=>{t.value=!0}),Object(n.f)(()=>{t.value=!1,setTimeout(()=>{t.value=!0},100)}),{recoShowModule:t}}},355:function(t,e,o){},358:function(t,e,o){"use strict";o(355)},359:function(t,e,o){"use strict";o.r(e);o(18);var n=o(1),a=o(68),r=o(354),c=Object(n.c)({components:{RecoIcon:a.b},props:{pageInfo:{type:Object,default:()=>({})},currentTag:{type:String,default:""},showAccessNumber:{type:Boolean,default:!1}},setup(t,e){const o=Object(r.a)();return{numStyle:{fontSize:".9rem",fontWeight:"normal",color:"#999"},goTags:t=>{o.$route.path!==`/tag/${t}/`&&o.$router.push({path:`/tag/${t}/`})},formatDateValue:t=>new Intl.DateTimeFormat(o.$lang).format(new Date(t))}}}),s=(o(358),o(3)),u=Object(s.a)(c,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",[t.pageInfo.frontmatter.author||t.$themeConfig.author?e("reco-icon",{attrs:{icon:"reco-account"}},[e("span",[t._v(t._s(t.pageInfo.frontmatter.author||t.$themeConfig.author))])]):t._e(),t._v(" "),t.pageInfo.frontmatter.date?e("reco-icon",{attrs:{icon:"reco-date"}},[e("span",[t._v(t._s(t.formatDateValue(t.pageInfo.frontmatter.date)))])]):t._e(),t._v(" "),!0===t.showAccessNumber?e("reco-icon",{attrs:{icon:"reco-eye"}},[e("AccessNumber",{attrs:{idVal:t.pageInfo.path,numStyle:t.numStyle}})],1):t._e(),t._v(" "),t.pageInfo.frontmatter.tags?e("reco-icon",{staticClass:"tags",attrs:{icon:"reco-tag"}},t._l(t.pageInfo.frontmatter.tags,(function(o,n){return e("span",{key:n,staticClass:"tag-item",class:{active:t.currentTag==o},on:{click:function(e){return e.stopPropagation(),t.goTags(o)}}},[t._v(t._s(o))])})),0):t._e()],1)}),[],!1,null,"8a445198",null);e.default=u.exports}}]);