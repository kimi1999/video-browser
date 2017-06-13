<template>
  <div class="info-main">
    <p>
      {{videoInfoParams.title}}
    </p>
    <div class="share-cont">
      <i class="iconfont icon-bofangshuicon play-icon"></i>
      <span class="source">
        {{videoInfoParams.source}}
      </span>

      <i v-if="inAPUSBrowser" class="iconfont icon-more share-more" @click="browserShare('more')"></i>
      <i v-if="inAPUSBrowser" class="iconfont icon-whatsapp share-whatsapp" @click="browserShare('whatsapp')"></i>
      <i v-if="inAPUSBrowser" class="iconfont icon-facebook share-fb" @click="browserShare('facebook')"></i>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .info-main{
    box-sizing: border-box;
    width: 100%;
    padding: 0 12px;
    padding-top: 10px;
    p{
      width: 100%;
      font-size: 16px;
      color: #444444;
      line-height:24px;
      word-wrap: normal;
      word-break: keep-all;
    }
    .share-cont{
      margin-top: 10px;
      height: 28px;
      line-height: 28px;
      width: 100%;
      .play-icon,.source{
        float: left;
        font-size: 14px;
        color: rgba(68,68,68,0.50);
      }
      .play-icon{
        margin-right: 6px;
      }
      .share-more,.share-whatsapp,.share-fb{
        float: right;
        font-size: 24px;
        margin-left: 12px;
      }
      .share-fb{
        color: #627DF1;
      }
      .share-whatsapp{
        color: #4AD858;;
      }
      .share-more{
        color: #B8B8B8;
      }
    }

  }
</style>

<script>
  import Config from '../assets/js/config'
  export default{
    props: ['video-info-params'],
    data () {
      return {
        inAPUSBrowser: Config.env.inApusBrowser
      }
    },
    mounted () {

    },
    methods: {
      browserShare (type) {
        const urlParams = Config.F.urlParamToObj(window.location.href)
        let toUrl = ''
        switch (type) {
          case 'whatsapp':
            toUrl = 'whatsapp://send?text='
            break
          case 'facebook':
            toUrl = 'http://m.facebook.com/sharer?u='
            break
          case 'more':
            toUrl = 'tercel://moreshare'
            break
          default:
            break
        }
        toUrl += window.location.href
        if (!('from_share' in urlParams)) {
          toUrl += '&from_share=1'
        }
        window.open(toUrl)
      }
    }
  }
</script>
