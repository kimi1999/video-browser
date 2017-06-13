<template>
  <div id="listWrapper" class="video-list-wrapper" :style="{minHeight:videoListParams.minHeight+'px'}">
    <div v-if="videoListParams.inDetail && videoLists.length==0" :style="{height:videoListParams.minHeight+'px'}" style="width: 100%">
      <LoadingCenter loading-width="25px" loading-color="#7b007b" loading-type="dots"></LoadingCenter>
    </div>
    <template v-else>
      <transition  name="slide-fade">
        <div class="loading-recent" v-if="videoListParams.canLoadingRecent&&tools.loadingRecent">
          <LoadingCenter loading-width="25px" loading-color="#444"></LoadingCenter>
        </div>
      </transition >
      <div class="video-list-cont"  :style="{minHeight:videoListParams.minHeight-50+'px'}">
        <GridBox :columnNum="2" columnSpace="12px"  v-if="videoLists[0]">
          <VideoItem  @click.native="toDetailPage(video)"  v-for="video in videoLists" :key="video.id" :video-data="video"></VideoItem>
        </GridBox>
      </div>
      <transition  name="slide-fade">
        <div class="loading-more" v-if="videoListParams.canLoadingMore&&tools.loadingMore">
          <LoadingCenter loading-width="25px" loading-color="#444"></LoadingCenter>
        </div>
      </transition>
    </template>
  </div>
</template>

<style lang="less" scoped>
  .video-list-cont{
    padding: 0 12px;
  }
</style>

<script>
  import Config from '../assets/js/config'
  import GridBox from './GridBox.vue'
  import VideoItem from './VideoItem.vue'
  import LoadingCenter from './LoadingCenter.vue'
  import {mapGetters} from 'vuex'
  export default{
    props: ['video-list-params'],
    data () {
      return {
        tools: {
          loadingRecent: false,
          loadingRecentSuccess: true,
          loadingMore: false,
          loadingMoreSuccess: true
        },
        nowClassify: '',
        videoLists: []
      }
    },
    computed: {
      ...mapGetters({
        video_list: 'video_list'
      })
    },
    watch: {
      'videoListParams.classify': function () {
        this.nowClassify = this.videoListParams.classify
        this.tools.loadingMore = false
        this.tools.loadingRecent = false
        this.getVideoList('recent')
      }
    },
    mounted () {
      const self = this
      if (this.videoListParams.inDetail) {
        this.nowClassify = this.videoListParams.classify
        this.getVideoList('recent')
      }
      // 初始化 滑动加载最新 和 滑动加载更多
      Config.F.initTouchLoading({
        elm: document.getElementById('listWrapper'),
        onTouchStart: function (loadingType) {
          if (loadingType === 'getMore') {
            self.tools.loadingMore = true
          } else if (loadingType === 'getRecent') {
            self.tools.loadingRecent = true
          }
        },
        loadingRecent: function () {
          if (self.videoListParams.canLoadingRecent && !self.tools.loadingRecent) {
            // console.log("loading recent");
            self.tools.loadingRecentSuccess = false
            self.getVideoList('recent')
            setTimeout(function () {
              if (!self.tools.loadingRecentSuccess) {
                self.tools.loadingRecent = false
              }
            }, 10000)
          }
        },
        loadingMore: function () {
          if (self.videoListParams.canLoadingMore && !self.tools.loadingMore) {
            // console.log("loading more");
            self.tools.loadingMoreSuccess = false
            self.getVideoList('more')
            setTimeout(function () {
              if (!self.tools.loadingMoreSuccess) {
                self.tools.loadingMore = false
              }
            }, 10000)
          }
        }
      })
    },
    methods: {
      // 获取视频列表
      getVideoList (type) {
        const self = this
        // 请求数据方式 "recent":获取最新数据  "more":往后获取数据
        let loadType = 'more'
        if (type) {
          loadType = type
        }
        if (this.video_list.sourceList[self.nowClassify] && this.video_list.sourceList[self.nowClassify][0]) {
          this.setVideoInStore(true, loadType)
        } else {
          let postData = {
            'sinceId': 0, // 默认传0
            'category': self.nowClassify,
            'maxId': -1 // 下一次获取视频的开始ID，第一次获取时传-1
          }
          if (loadType === 'more' && this.video_list.nextVideoListStart[self.nowClassify]) {
            postData.maxId = this.video_list.nextVideoListStart[self.nowClassify]
          }
          this.$http.post(`${Config.URI.base + Config.URI.getVideoList}`, postData).then(({data}) => {
            if (data.code === 0 && data.data && data.data[0]) {
              let videos = data.data
              // 将当前分类下一次获取视频列表的开始id存到store中__start
              let nextStartId = videos[0].id
              for (var i = 1; i < videos.length; i++) {
                if (videos[i].id < nextStartId) {
                  nextStartId = videos[i].id
                }
              }
              this.$store.dispatch('setNextVideoListStart', {classify: self.nowClassify, id: nextStartId})
              // 将当前分类下一次获取视频列表的开始id存到store中__end
              // 将请求回来，新的视频列表数据去除重复后存到store中
              if (this.video_list.showList[self.nowClassify]) {
                const nShowList = this.video_list.showList[self.nowClassify]
                let repeatList = []
                nShowList.forEach((video) => {
                  videos.forEach((vd) => {
                    if (video.id === vd.id) {
                      repeatList.push(video)
                    }
                  })
                })
                repeatList.forEach((video) => {
                  for (var t = 0; t < videos.length; t++) {
                    if (videos[t].id === video.id) {
                      videos.splice(t, 1)
                      break
                    }
                  }
                })
              }
              let storeParams = {
                classify: self.nowClassify,
                list: Config.F.mixArray(videos)
              }
              this.$store.dispatch('setVideoSourceList', storeParams)
              this.setVideoInStore(true, loadType)
            } else {
              this.setVideoInStore(false, loadType)
            }
          })
        }
      },
      setVideoInStore (success, loadType) {
        const self = this
        if (success) {
          let nowShowList = []
          const storeShowList = this.video_list.showList[self.nowClassify]
          if (storeShowList && storeShowList[0]) {
            nowShowList = storeShowList
          }

          let smallArr = []
          let storeRemainingList = []
          let storeSourceList = this.video_list.sourceList[self.nowClassify]
          if (storeSourceList && storeSourceList[0]) {
            const len = Math.min(10, storeSourceList.length)
            for (var i = 0; i < len; i++) {
              smallArr.push(storeSourceList[i])
            }
            if (len < storeSourceList.length) {
              for (var j = len; j < storeSourceList.length; j++) {
                storeRemainingList.push(storeSourceList[j])
              }
            }
            // storeSourceList = storeSourceList.splice(0, len)
          }
          Config.F.deleteRepeatItems(nowShowList, smallArr, 'id')
          // 设置 显示视频列表
          let storeParams = {
            classify: self.nowClassify,
            list: nowShowList
          }
          this.$store.dispatch('setVideoShowList', storeParams)
          // GA打点统计"视频分类统计"
          if (window.ga) {
            window.ga('send', 'event', 'scroll_event', 'scroll', 'scroll_classify_' + self.nowClassify + '_' + this.videoListParams.classifyTxt + '_' + nowShowList.length)
          }

          // 重置 已请求 未显示视频列表
          let storeParams1 = {
            classify: self.nowClassify,
            list: storeRemainingList
          }
          this.$store.dispatch('setVideoSourceList', storeParams1)
        }
        // 无论成功失败 都会执行的操作
        this.$emit('getVideoListSuccess')
        setTimeout(function () {
          self.tools.loadingMoreSuccess = true
          self.tools.loadingMore = false
          self.tools.loadingRecent = false
        }, 1000)
        this.updateShowVideoList(loadType)
      },
      updateShowVideoList (loadType) {
        let videos = []
        let nowShowList = this.video_list.showList[this.nowClassify]
        if (nowShowList && nowShowList[0]) {
          videos = nowShowList
        }
        this.videoLists = videos
        if (loadType === 'recent' && this.video_list.pagePosition[this.nowClassify]) {
          setTimeout(() => {
            window.scrollTo(0, this.video_list.pagePosition[this.nowClassify])
          }, 200)
        }
      },
      toDetailPage (video) {
        const toUrl = Config.URI.toPageBase + Config.URI.toDetailPage + '?id=' + video.id
        let category = 'video'
        if (this.videoListParams.inDetail) {
          // 视频详情页的的相关视频点击
          category = 'recommended'
        }
        // GA打点统计"视频分类统计"
        if (window.ga) {
          window.ga('send', 'event', category, 'click', 'video_' + category + '_' + this.nowClassify + '_' + this.videoListParams.classifyTxt + '_' + video.id)
        }
        window.location.href = toUrl
      }
    },
    components: {
      VideoItem, LoadingCenter, GridBox
    }
  }
</script>
