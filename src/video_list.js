import Vue from 'vue'
import VideoList from './views/VideoList.vue'

new Vue({
  el: "#listApp",
  template: '<VideoList />',
  components:{VideoList}
});
