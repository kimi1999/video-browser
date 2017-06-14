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
  import {mapGetters} from 'vuex'
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
          classifyTxt: '',
          minHeight: '80', // 视频列表区域最小高度
          canLoadingRecent: false, // 是否允许下滑加载最新数据
          canLoadingMore: true, // 是否允许上滑加载更多数据
          show: true
        },
        videoInfoParams: {
          id: null,
          classify: '',
          classifyTxt: '',
          title: null,
          source: null
        },
        playerContParams: {
          width: 360,
          height: 200,
          relHeight: 200,
          video: null
        },
        classifyList: []
      }
    },
    computed: {
      ...mapGetters({
        video_list: 'video_list'
      })
    },
    mounted () {
      this.getVideoClassifies()
      this.setPlayerHeight()
    },
    methods: {
      // 发请求 获取 视频分类
      getVideoClassifies () {
        // 发请求 获取分类
        let ajaxUrl = Config.URI.base + Config.URI.getVideoCats
        this.$http.post(ajaxUrl, {}).then(({data}) => {
          if (data.code === 0 && data.data) {
            let toStoreData = {
              country: data.data.country,
              cats: data.data.cats
            }
            this.$store.dispatch('setVideoLanguageCountry', toStoreData)
            this.$nextTick(() => {
              if (!this.video_list.newsCountry && !this.video_list.lang) {
                // window.location.href = Config.URI.toPageBase + '/error.html'
                return
              }
              const classifyList = data.data.cats[this.video_list.lang] || []
              if (!classifyList[0]) {
                // window.location.href = Config.URI.toPageBase + '/error.html'
              } else {
                this.classifyList = classifyList
                this.getVideoDetail()
              }
            })
          } else {
            // window.location.href = Config.URI.toPageBase + '/error.html'
          }
        })
      },
      // 获取视频详情
      getVideoDetail () {
        const self = this
        const topUrl = window.location.href
        const urlParams = Config.F.urlParamToObj(topUrl)
        if ('id' in urlParams) {
          if (urlParams['id'] && /^\d+$/.test(urlParams['id'])) {
            let ajaxUrl = Config.URI.base + Config.URI.getOneVideoInfo
            let postData = {
              id: parseInt(urlParams['id'])
            }
            const setVideoDetail = function (nowVideo) {
              // 获取相关视频
              let classify = 1
              if (nowVideo.categories && nowVideo.categories[0]) {
                classify = nowVideo.categories[0]
              }
              let classifyTxt = 1
              self.classifyList.forEach((cl) => {
                if (cl.id === classify) {
                  classifyTxt = cl.text
                }
              })
              self.videoListParams.classify = classify
              self.videoListParams.classifyTxt = classifyTxt
              // 渲染当前视频
              self.videoInfoParams.id = parseInt(urlParams['id'])
              self.videoInfoParams.classify = classify
              self.videoInfoParams.classifyTxt = classifyTxt
              self.videoInfoParams.title = nowVideo.article_title
              self.videoInfoParams.source = nowVideo.source
              self.playerContParams.video = nowVideo
            }
            // 正式环境直接获取php写入页面的视频详情变量
            if (Config.env.product && window.detail) {
              setVideoDetail(window.detail)
            } else {
              this.$http.post(ajaxUrl, postData).then(({data}) => {
                if (data.code === 0 && data.data) {
                  setVideoDetail(data.data)
                } else {
//                window.location.href = '/error.html'
                }
              })
            }
          } else {
//            window.location.href = '/error.html'
          }
        } else {
//          window.location.href = '/error.html'
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
