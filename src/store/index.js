import Vue from 'vue'
import Vuex from 'vuex'
import video_list from './components/video_list.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    video_list
  }
});

export default store;
