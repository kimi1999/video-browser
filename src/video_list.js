import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import VideoList from './views/VideoList.vue'

new Vue({
  el: "#listApp",
  template: '<VideoList />',
  components:{VideoList}
});
