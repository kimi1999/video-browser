import * as types from '../mutation-types'
const state = {
  pagePosition: {},
  nextVideoListStart: {},
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
  },
  [types.SET_NEXT_VIDEO_LIST_START] (state, val) {
    if (val.classify && val.id) {
      state.nextVideoListStart[val.classify] = val.id
    }
  },
  [types.SAVE_SCROLL_POSITION] (state, val) {
    let pagePosition = 0
    if (val.scrollTop) {
      pagePosition = val.scrollTop
    }
    if (val.classify) {
      state.pagePosition[val.classify] = pagePosition
    }
  }
}

const actions = {
  setVideoShowList ({commit}, val) {
    commit(types.SET_VIDEO_SHOW_LIST, val)
  },
  setVideoSourceList ({commit}, val) {
    commit(types.SET_VIDEO_SOURCE_LIST, val)
  },
  setNextVideoListStart ({commit}, val) {
    commit(types.SET_NEXT_VIDEO_LIST_START, val)
  },
  saveScrollPosition ({commit}, val) {
    commit(types.SAVE_SCROLL_POSITION, val)
  }
}

const getters = {
  video_list: state => state
}

export default {
  state, mutations, actions, getters
}
