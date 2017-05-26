import Vue from 'vue'
import Vuex from 'vuex'
import videoList from './components/videoList.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    videoList
  }
});

export default store;
