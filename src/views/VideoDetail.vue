<script src="../../../../commonUse/useful/publicTools.js"></script>
<template>
  <div class="detail-main" :style="{paddingTop:playerContParams.relHeight+'px'}">
    <VideoPlayer v-if="playerContParams.video && videoInfoParams.id" :player-cont-params="playerContParams"></VideoPlayer>
    <VideoInfo v-if="videoInfoParams.id" :video-info-params="videoInfoParams"></VideoInfo>
    <PartingLine v-if="videoInfoParams.id" title-text="You May Like"></PartingLine>
    <ListMain v-show="videoListParams.show && videoInfoParams.id" :video-list-params="videoListParams" ></ListMain>
    <LoadingCenter v-if="!videoInfoParams.id" loading-width="40px" loading-color="#7b007b" loading-type="dots"></LoadingCenter>
  </div>
</template>

<style lang="less" scoped>
  @import "../assets/css/reset.css";
  @import "../assets/css/vars.less";
  @import "../assets/css/public.less";
</style>

<script>
  import Config from '../assets/js/config'
  import VideoPlayer from '../components/VideoPlayer.vue'
  import VideoInfo from '../components/VideoInfo.vue'
  import PartingLine from '../components/PartingLine.vue'
  import ListMain from '../components/ListMain.vue'
  import LoadingCenter from '../components/LoadingCenter.vue'
  export default{
    data () {
      return {
        videoListParams: {
          inDetail: true,
          classify: '', // 视频分类
          minHeight: '80', // 视频列表区域最小高度
          canLoadingRecent: false, // 是否允许下滑加载最新数据
          canLoadingMore: true, // 是否允许上滑加载更多数据
          show: true
        },
        videoInfoParams: {
          id: null,
          title: null,
          source: null
        },
        playerContParams: {
          width: 360,
          height: 200,
          relHeight: 200,
          video: null
        }
      }
    },
    mounted () {
      this.getVideoDetail()
      this.setPlayerHeight()
    },
    methods: {
      // 获取视频详情
      getVideoDetail () {
        const topUrl = window.location.href
        const urlParams = Config.F.urlParamToObj(topUrl)
        if ('id' in urlParams) {
          if (urlParams['id'] && /^\d+$/.test(urlParams['id'])) {
            let ajaxUrl = Config.URI.base + Config.URI.getOneVideoInfo
            let postData = {
              id: parseInt(urlParams['id'])
            }
            this.$http.post(ajaxUrl, postData).then(({data}) => {
              if (data.code === 0 && data.data) {
                const nowVideo = data.data
                // 获取相关视频
                let classify = 1
                if (nowVideo.categories && nowVideo.categories[0]) {
                  classify = nowVideo.categories[0]
                }
                this.videoListParams.classify = classify
                // 渲染当前视频
                this.videoInfoParams.id = parseInt(urlParams['id'])
                this.videoInfoParams.title = nowVideo.article_title
                this.videoInfoParams.source = nowVideo.source
                this.playerContParams.video = nowVideo
              } else {
                window.location.href = '/error.html'
              }
            })
          } else {
            window.location.href = '/error.html'
          }
        } else {
          window.location.href = '/error.html'
        }
      },
      // 设置 视频播放区域高度
      setPlayerHeight () {
        const windowWidth = document.documentElement.clientWidth
        this.playerContParams.relHeight = windowWidth * this.playerContParams.height / this.playerContParams.width
        this.setVideoListHeight()
      },
      // 设置 视频列表 块儿的最小高度
      setVideoListHeight () {
        const windowHeight = document.documentElement.clientHeight
        const height = windowHeight - this.playerContParams.relHeight - 150
        this.$set(this.videoListParams, 'minHeight', height)
      }
    },
    components: {
      VideoPlayer, VideoInfo, PartingLine, ListMain, LoadingCenter
    }
  }
</script>
