import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import VideoDetail from './views/VideoDetail.vue'

new Vue({
  el: "#detailApp",
  template: '<VideoDetail/>',
  components:{VideoDetail}
});
