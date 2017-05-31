import * as types from '../mutation-types'
const state = {
  showList: {}, // 显示的视频列表
  sourceList: {}  // 每次请求的50条数据 暂存地址
}

const mutations = {
  // 将 显示的视频列表  暂存store
  [types.SET_VIDEO_SHOW_LIST] (state, val) {
    if (val.classify) {
      state.showList[val.classify] = val.list || []
    }
  },
  // 将 请求回来 还未显示的 视频列表  暂存store
  [types.SET_VIDEO_SOURCE_LIST] (state, val) {
    if (val.classify) {
      state.sourceList[val.classify] = val.list || []
    }
  }
}

const actions = {
  setVideoShowList ({commit}, val) {
    commit(types.SET_VIDEO_SHOW_LIST, val)
  },
  setVideoSourceList ({commit}, val) {
    commit(types.SET_VIDEO_SOURCE_LIST, val)
  }
}

const getters = {
  video_list: state => state
}

export default {
  state, mutations, actions, getters
}
