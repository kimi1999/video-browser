<template>
  <div class="player-main" :style="{height:playerContParams.relHeight+'px'}">
    <div v-show="videoIsReady" class="iframe-wrapper" id="APUSVideoPlayer">

    </div>
    <div v-if="!videoIsReady" class="cover-cont">
      <LoadingCenter loading-width="25px" loading-color="#7b007b" loading-type="dots"></LoadingCenter>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .player-main {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 300;
    background-color: #000;
    .cover-cont {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #000;
      background-size: cover !important;
      background: url("../assets/images/test-video-cover.png");
    }
    .iframe-wrapper{
      width: 100%;
      height: 100%;
    }
    iframe{
      display: block!important;
    }
  }
</style>

<script>
  /* eslint-disable no-undef,no-unused-vars */

  import LoadingCenter from './LoadingCenter.vue'
  export default{
    props: ['player-cont-params'],
    data () {
      return {
        videoIsReady: false
      }
    },
    mounted () {
      this.initIframePlayer()
    },
    methods: {
      initIframePlayer () {
        var a = document.createElement('script')
        a.type = 'text/javascript'
        a.src = 'https://www.youtube.com/iframe_api'
        a.async = true
        var b = document.getElementsByTagName('script')[0]
        b.parentNode.insertBefore(a, b)

        const self = this
        const timer = setInterval(function () {
          try {
            if (YT && YT.Player) {
              clearInterval(timer)
              const player = new YT.Player('APUSVideoPlayer', {
                height: '100%',
                width: '100%',
                videoId: self.playerContParams.video.id,
                events: {
                  'onReady': self.onPlayerReady,
                  'onStateChange': self.onPlayerStateChange,
                  'onPlaybackQualityChange': self.onPlayerPlaybackQualityChange,
                  'onPlaybackRateChange': self.onPlayerPlaybackRateChange,
                  'onError': self.onPlayerError,
                  'onApiChange': self.onPlayerApiChange
                },
                playerVars: {
                  'autoplay': 1, // 是否自动播放 默认：0 否； 1 是
                  'autohide': 1, // 播放开始时 播放控制条是否自动隐藏 默认：1 是； 0 否
                  'rel': 0, // 播放结束时 是否显示相关视频 默认：1 是； 0 否
                  'showinfo': 0, // 视频播放前是否显示视频标题和上传者信息 默认：1 是； 0 否
                  'enablejsapi': 0, // 停用Javascript API 默认：0 否； 1 是
                  'disablekb': 1, // 停用播放器键盘控件 默认：0 否； 1 是  (空格键：播放/暂停 向左箭头：当前视频后退10% 向右箭头：当前视频前进10% 向上箭头：调高音量 向下箭头：降低音量)
                  'cc_lang_pref': 1, // ???
                  'color': 'white', //  播放器 已播放部分颜色 可选红色(不写或其他非'white' 值)/白色('white') 默认红色
                  'controls': 1, // 此参数会指明视频播放器控件是否会显示  值：0、1或2。默认值为1
                  'fs': 1, // ：0或1。默认值为1，该值会使全屏按钮显示。将此参数设为0会阻止全屏按钮显示。
                  'cc_load_policy': 1, // 是否显示字幕  将此值设为1会使系统在默认情况下显示字幕，即使在用户关闭字幕的情况下也是如此
                  'modestbranding': 1, // 播放控制条上是否显示 youtube图标 默认 0: 显示 ；1: 不显示；
                  'origin': 'https://www.youtube.com'
                }
              })
            }
          } catch (e) {

          }
        }, 100)
      },
      onPlayerReady () {
        this.videoIsReady = true
        document.getElementById('APUSVideoPlayer').style.display = 'block'
      },
      onPlayerStateChange () {

      },
      onPlayerPlaybackQualityChange () {

      },
      onPlayerPlaybackRateChange () {

      },
      onPlayerError () {

      },
      onPlayerApiChange () {

      }

    },
    components: {
      LoadingCenter
    }
  }
</script>
