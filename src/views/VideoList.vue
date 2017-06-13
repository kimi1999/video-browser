<template>
  <div class="list-main">
    <SlideTabs :tabs="tabs" :now-page-classify="nowPageClassify" v-if="tabs.list[0]" @changTab="triggerChangTab"></SlideTabs>
    <div class="dur-loading" v-if="!videoListParams.show" :style="{height:videoListParams.minHeight+'px'}">
      <LoadingCenter loading-width="40px" loading-color="#7b007b" loading-type="dots"></LoadingCenter>
    </div>
    <ListMain v-show="videoListParams.show" @getVideoListSuccess="videoListParams.show=true" :video-list-params="videoListParams"></ListMain>
  </div>
</template>

<style lang="less">
  @import "../assets/css/reset.css";
  @import "../assets/css/vars.less";
  @import "../assets/css/public.less";

  .list-main {
    padding-top: 45px;
  }

  .dur-loading {
    width: 100%;
  }
</style>

<script>

  import Config from '../assets/js/config'
  import SlideTabs from '../components/SlideTabs.vue'
  import LoadingCenter from '../components/LoadingCenter.vue'
  import ListMain from '../components/ListMain.vue'
  export default{
    data () {
      return {
        videoListParams: {
          classify: '', // 视频分类
          minHeight: '80', // 视频列表区域最小高度
          canLoadingRecent: false, // 是否允许下滑加载最新数据
          canLoadingMore: true, // 是否允许上滑加载更多数据
          show: false
        },
        tabs: {
          list: [],
          recent: ''
        },
        nowPageClassify: null
      }
    },
    mounted () {
      // console.log("在APUS浏览器内： "+Config.env.inApusBrowser);
      // console.log("clientInfo： "+Config.URI.clientInfos);
      this.setVideoListHeight()
      this.getVideoClassifies()
    },
    methods: {
      // 设置 视频列表 块儿的最小高度
      setVideoListHeight () {
        const windowHeight = document.documentElement.clientHeight
        this.$set(this.videoListParams, 'minHeight', (windowHeight - 45))
      },
      // 发请求 获取 视频分类
      getVideoClassifies () {
        let urlParams = Config.F.urlParamToObj(window.location.href)
        // 发请求 获取分类
        let ajaxUrl = Config.URI.base + Config.URI.getVideoCats
        this.$http.post(ajaxUrl, {}).then(({data}) => {
          if (data.code === 0) {
            this.tabs.list = data.data.cats
            let nowPageClassify = this.tabs.list[0]
            if ('video_classify' in urlParams) {
              this.tabs.list.forEach((_classify) => {
                if (_classify.id === parseInt(urlParams['video_classify'])) {
                  nowPageClassify = _classify
                }
              })
            }
            this.nowPageClassify = nowPageClassify
            this.triggerChangTab(nowPageClassify)
          }
        })
      },
      // 触发 视频分类切换
      triggerChangTab (tab) {
        let scrollTop = 0
        if (this.videoListParams.classify) {
          if (document.documentElement) {
            scrollTop = document.documentElement.scrollTop
          }
          if (document.body) {
            scrollTop = document.body.scrollTop
          }
          this.$store.dispatch('saveScrollPosition', {classify: this.videoListParams.classify, scrollTop: scrollTop})
        }
        this.tabs.recent = tab.id
        this.videoListParams.classify = tab.id
        this.videoListParams.show = false
      }
    },
    components: {
      SlideTabs, LoadingCenter, ListMain
    }
  }
</script>
