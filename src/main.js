// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import routerConfig from './router.config.js'

import 'font-awesome/css/font-awesome.min.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// import MapComponent from '@qb/gis-ui/src/register-comp'
// Vue.use(MapComponent);

Vue.use(VueRouter);
const router =new VueRouter(routerConfig);
Vue.use(ElementUI);

//解决重复点击路由，打印异常
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

import axios from 'axios';
window.axios=axios;

window.my_headers_config={
  headers: {
    "Content-Type":"application/json;charset=utf-8",
    "dataType":"json"
  }
};
//0-10000整数
window.validateInteger = (rule, value, callback) => {
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value) && Number.isInteger(Number(value))) {
    if (value < 0 || value > 10000) {
      callback(new Error('字段长度须是1-10000之间整数'))
    } else {
      callback()
    }
  } else {
    callback(new Error('字段长度须是1-10000之间整数'))
  }
};
//A-Z
window.validateA_Z = (rule, value, callback) => {
  var reg = /^[A-Z]+$/;
  if (value.match(reg)) {
    if (value.length >= 3) {
      callback();
    } else {
      callback(new Error('字段名称必须超过两个字母！'))
    }
  } else {
    callback(new Error('字段名称必须是A-Z大写字母！'))
  }
};




/**
 * 可以用以下方法判断用户是否登录
 * */
router.beforeEach((to, from, next) => {
  console.log("访问路径:",to.path);
  if(to.query.name){
    document.title=to.query.name;
  }else{
    document.title="GIS开发平台";
  }
  if(to.path=="/"){
    router.push("/2d/gisIntroduce");
  }else if(to.path=="/2d"){
    router.push("/2d/gisIntroduce");
  }else if(to.path=="/3d"){
    router.push("/3d/gisIntroduce");
  }else{
    next();
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  template: '<App/>'
})

window.cbcVue=Vue;


