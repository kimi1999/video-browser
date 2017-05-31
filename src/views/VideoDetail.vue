<template>
  <div class="detail-main" :style="{paddingTop:playerContParams.relHeight+'px'}">
    <VideoPlayer :player-cont-params="playerContParams"></VideoPlayer>
    <VideoInfo :video-info-params="videoInfoParams"></VideoInfo>
    <PartingLine title-text="You May Like"></PartingLine>
    <ListMain v-show="videoListParams.show" :video-list-params="videoListParams" ></ListMain>
  </div>
</template>

<style lang="less" scoped>
  @import "../assets/css/reset.css";
  @import "../assets/css/vars.less";
  @import "../assets/css/public.less";
</style>

<script>
  import VideoPlayer from '../components/VideoPlayer.vue'
  import VideoInfo from '../components/VideoInfo.vue'
  import PartingLine from '../components/PartingLine.vue'
  import ListMain from '../components/ListMain.vue'
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
          id: 1,
          title: 'Cras mattis consectetur purus sit amet gogo fermentum.',
          source: 'Youtube'
        },
        playerContParams: {
          width: 360,
          height: 200,
          relHeight: 200,
          video: {
            id: 'M7lc1UVf-VE'
          }
        }
      }
    },
    mounted () {
      const self = this
      this.setPlayerHeight()
      setTimeout(function () {
        self.getRelatedVideos()
      }, 1000)
    },
    methods: {
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
      },
      getRelatedVideos () {
        this.videoListParams.classify = 'related'
      }
    },
    components: {
      VideoPlayer, VideoInfo, PartingLine, ListMain
    }
  }
</script>
