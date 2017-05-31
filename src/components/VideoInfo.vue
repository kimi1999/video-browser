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

      <i class="iconfont icon-more share-more"></i>
      <i class="iconfont icon-whatsapp share-whatsapp"></i>
      <i class="iconfont icon-facebook share-fb"></i>
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
  export default{
    props: ['video-info-params'],
    data () {
      return {}
    },
    mounted () {

    },
    methods: {

    }
  }
</script>
