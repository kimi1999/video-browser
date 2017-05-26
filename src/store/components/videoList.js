import * as types from "../mutation-types"
const state = {
  classify:{}
}

const mutations = {
  [types.PUT_VIDEOS_IN_STORE]({state},val){
    if(val.id){
      state.classify[val.id] = val.list || [];
    }
  }
}

const actions = {
  putVideosInStore({commit},val){
    commit(types.PUT_VIDEOS_IN_STORE,val)
  }
}

const getters = {
  videoList: state => state
}

export default {
  state,mutations,actions,getters
}
