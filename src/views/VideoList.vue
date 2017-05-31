<template>
  <div class="list-main">
    <SlideTabs :tabs="tabs" v-if="tabs.list[0]" @changTab="triggerChangTab"></SlideTabs>
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
        }
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
        // 发请求 获取分类
        let ajaxUrl = Config.URI.base + Config.URI.getVideoClassify
        this.$http.post(ajaxUrl, {}).then(({data}) => {
          if (data.code === 0) {
            let lang = Config.env.lang
            let hasVideoChannels = []
            let perfectChannel = null
            if (data.data.channels) {
              for (var i = 0; i < data.data.channels.length; i++) {
                const channel = data.data.channels[i]
                if (channel.lang && channel.lang === lang) {
                  perfectChannel = channel
                }
                if (channel.videocates[0]) {
                  hasVideoChannels.push(channel)
                }
              }
              if (!perfectChannel && hasVideoChannels[0]) {
                perfectChannel = hasVideoChannels[0]
              }
              if (perfectChannel) {
                this.tabs.list = perfectChannel.videocates
                this.triggerChangTab(this.tabs.list[0])
              }
            }
          }
        })
      },
      // 触发 视频分类切换
      triggerChangTab (tab) {
        this.tabs.recent = tab.id
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
