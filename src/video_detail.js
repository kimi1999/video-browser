/* eslint-disable no-new */
import Vue from 'vue'
import Config from './assets/js/config'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import store from './store/index'
import VideoDetail from './views/VideoDetail.vue'


Vue.http.interceptors.push((request, next) => {
  // request.credentials = true;
  // request.headers.map.Cookie = document.cookie;
  // console.log(request);
  var s = 'body'// POST 请求 附加参数 放到body里面
  // GET 请求 附加参数 放到params里面
  if (request.method === 'GET') {
    s = 'params'
  }
  let postData = {
    'lang': 'en',
    'moduleId': 1,
    'productId': 7,
    'newsCountry': 'IN'
  }
  var browserLanguage = navigator.language || ''
  if (browserLanguage && Config.env.product) {
    var arr = browserLanguage.split('-')
    if (arr[0]) {
      postData.lang = arr[0]
    }
    if (arr[1]) {
      postData.newsCountry = arr[1]
    }
  }
  for (var key in postData) {
    request[s][key] = postData[key]
  }
  // continue to next interceptor
  next((response) => {
    /*
     //每次ajax请求 结束时执行
     if(response.data && response.data.Variables){
     var member_uid = response.data.Variables.member_uid;
     if(member_uid || member_uid==0){
     //每次请求结束 设置当前用户状态
     store.dispatch("login",member_uid);
     }
     }
     else{
     //store.dispatch("login",0);//退出
     }
     */
  })
})

new Vue({
  el: '#detailApp',
  store,
  template: '<VideoDetail/>',
  components: {VideoDetail}
})
