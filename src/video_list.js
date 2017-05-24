import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import store from './store/index'
import VideoList from './views/VideoList.vue'

new Vue({
  el: "#listApp",
  store,
  template: '<VideoList />',
  components:{VideoList}
});
