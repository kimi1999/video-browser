<template>
    <div class="video-item">
      <template v-if="videoBox.relHeight">
        <div class="cover" :style="{'height':videoBox.relHeight,'backgroundImage':'url('+videoBox.bg+')'}">
          <div class="loading-cont" v-if="!videoBox.bg">
            <LoadingCenter loading-width="25px" loading-color="#7b007b" loading-type="dots"></LoadingCenter>
          </div>
          <span class="time">{{formatTime(videoData.duration)}}</span>
        </div>
        <div class="disc ellipsis-1">
          {{videoData.article_title}}
        </div>
        <div class="source">
          <i class="play-icon iconfont icon-bofangshuicon"></i>
          <span class="from">{{videoData.source}}</span>
        </div>
      </template>
    </div>
</template>
<style lang="less" scoped>
  .video-item{
    position: relative;
    margin-top: 16px;
  }
  .cover{
    position: relative;
    width: 100%;
    background-color: #949494;
    background-size: cover!important;

  }
  .loading-cont{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index:100;
  }
  .time{
    z-index: 200;
    display: inline-block;
    color: #fff;
    position: absolute;
    bottom: 4px;
    right: 4px;
    padding: 3px 8px;
    border-radius: 3px;
    font-size: 10px;
    background-color: rgba(0,0,0,.5);
  }
  .disc{
    width:100%;
    height:26px;
    line-height: 26px;
    font-size: 12px;
    color: #444444;
  }
  .source{
    box-sizing: border-box;
    padding-left: 15px;
    position: relative;
    width: 100%;
    line-height: 12px;
    height: 12px;
    font-size: 10px;
    color: rgba(68,68,68,.5);
    .play-icon{
      position: absolute;
      top: 1px;
      left: 0;
      display: inline-block;
      font-size: 12px;
      width: 12px;
      height: 12px;
      //background-color: #7b007b;
    }
    .from{
      display: inline-block;
    }
  }
</style>
<script>
  import Config from '../assets/js/config'
  import LoadingCenter from './LoadingCenter.vue'
  export default{
    props: ['video-data'],
    data () {
      return {
        videoBox: {
          width: 162,
          height: 90,
          relHeight: '',
          bg: null
        }
      }
    },
    mounted () {
      const self = this
      this.resetVideoBoxHeight()
      Config.F.addEvent(window, 'resize', function () {
        self.resetVideoBoxHeight()
      })
      this.loadingImg()
    },
    methods: {
      resetVideoBoxHeight () {
        const self = this
        const timer = setInterval(function () {
          let coverWidth = self.$el.clientWidth
          if (coverWidth) {
            clearInterval(timer)
            self.$set(self.videoBox, 'relHeight', (coverWidth * self.videoBox.height / self.videoBox.width) + 'px')
          }
        }, 100)
      },
      formatTime (time) {
        return Config.F.formatTime(time)
      },
      loadingImg () {
        const self = this
        let cover = ''
        if (this.videoData.photos && this.videoData.photos[0]) {
          const photos = this.videoData.photos[0]
          cover = photos.origin_url
          if (photos.sizes && photos.sizes[0]) {
            cover = photos.sizes[0].url
          }
        }
        if (cover) {
          let img = new Image()
          img.src = cover
          img.onload = function () {
            self.videoBox.bg = img.src
          }
        }
      }
    },
    components: {
      LoadingCenter
    }
  }
</script>
