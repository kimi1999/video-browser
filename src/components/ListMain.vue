<template>
  <div id="listWrapper" class="video-list-wrapper" :style="{minHeight:videoListParams.minHeight+'px'}">
    <transition  name="slide-fade">
      <div class="loading-recent" v-if="videoListParams.canLoadingRecent&&tools.loadingRecent">
        <LoadingCenter loading-width="25px" loading-color="#444"></LoadingCenter>
      </div>
    </transition >
    <div class="video-list-cont"  :style="{minHeight:videoListParams.minHeight-50+'px'}">
      <GridBox :columnNum="2" columnSpace="12px"  v-if="videoLists[0]">
        <VideoItem  @click="toDetailPage"  v-for="video in videoLists" :key="video.id" :video-data="video"></VideoItem>
      </GridBox>
    </div>
    <transition  name="slide-fade">
      <div class="loading-more" v-if="videoListParams.canLoadingMore&&tools.loadingMore">
        <LoadingCenter loading-width="25px" loading-color="#444"></LoadingCenter>
      </div>
    </transition>
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
        console.log(loadType)
        if (this.video_list.sourceList[self.nowClassify] && this.video_list.sourceList[self.nowClassify][0]) {
          this.setVideoInStore(true)
        } else {
          this.$http.post(`${Config.URI.base + Config.URI.getVideoList}`, {}).then(({data}) => {
            if (data.code === 0) {
              let videos = data.data || []
              let storeParams = {
                classify: self.nowClassify,
                list: Config.F.mixArray(videos)
              }
              this.$store.dispatch('setVideoSourceList', storeParams)
              this.setVideoInStore(true)
            } else {
              this.setVideoInStore()
            }
          })
        }
      },
      setVideoInStore (success) {
        const self = this
        if (success) {
          let nowShowList = []
          const storeShowList = this.video_list.showList[self.nowClassify]
          if (storeShowList && storeShowList[0]) {
            nowShowList = storeShowList
          }

          let smallArr = []
          let storeSourceList = this.video_list.sourceList[self.nowClassify]
          if (storeSourceList && storeSourceList[0]) {
            const len = Math.min(10, storeSourceList.length)
            for (var i = 0; i < len; i++) {
              smallArr.push(storeSourceList[i])
            }
            storeSourceList = storeSourceList.splice(i, len)
          }
          Config.F.deleteRepeatItems(nowShowList, smallArr, 'id')
          // 设置 显示视频列表
          let storeParams = {
            classify: self.nowClassify,
            list: nowShowList
          }
          this.$store.dispatch('setVideoShowList', storeParams)

          // 重置 已请求 未显示视频列表
          let storeParams1 = {
            classify: self.nowClassify,
            list: storeSourceList
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
        this.updateShowVideoList()
      },
      updateShowVideoList () {
        let videos = []
        let nowShowList = this.video_list.showList[this.nowClassify]
        if (nowShowList && nowShowList[0]) {
          videos = nowShowList
        }
        this.videoLists = videos
      },
      toDetailPage () {
        console.log('-------------')
        // window.open(Config.URI.toDetailPage);
      }
    },
    components: {
      VideoItem, LoadingCenter, GridBox
    }
  }
</script>
