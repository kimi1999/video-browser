<template>
  <div class="box ui-border-b">
    <div class="main">
      <i></i>
      <div class="tab-list" id="scrollTab">
        <p>
          <span v-for="tab in tabs.list" @click="checkTab(tab)" :tab-id="tab.id" :key="tab.id"  :class="{on:tab.id==tabs.recent}">
            {{tab.text}}
          </span>
        </p>
      </div>
    </div>

  </div>
</template>
<style lang="less" scoped>
  .box{
    font-family: Roboto-Regular;
    position: fixed;
    z-index: 900;
    background-color: #fff;
    width: 100%;
    top:0px;
    left:0px;
    height: 44px;
    box-sizing: border-box;
    .main{
      position: relative;
      width: 100%;
      height: 100%;
      padding: 0 12px 0 42px;
      line-height: 44px;
      box-sizing: border-box;
      i{
        position: absolute;
        left: 12px;
        top:14px;
        width: 18px;
        height: 18px;
        display: inline-block;
        //background-color: #7b007b;
        background: url("../assets/images/video-logo.png") center center no-repeat;
        background-size: 18px 18px;
      }
    }
    .tab-list{
      width: 100%;
      overflow: hidden;
    }
    p{
      white-space:nowrap;
      word-break: keep-all;
      word-wrap: normal;
    }
    p span{
      display: inline-block;
      padding: 0 12px;
      //float: left;
      font-size: 16px;
      color: rgba(68,68,68,0.80);
      &.on{
        color: #A20EFC;
      }
    }
  }
</style>
<style>
  .ps-container > .ps-scrollbar-x-rail > .ps-scrollbar-x{
    background-color: #fff!important;
  }
  .ps:hover > .ps__scrollbar-x-rail, .ps:hover > .ps__scrollbar-y-rail{
    opacity: 0!important;
  }
  .ps>.ps__scrollbar-x-rail{
    height: 0px!important;
  }
</style>
<script>
  import $ from 'jquery'
  import Config from '../assets/js/config'
  require('perfect-scrollbar/dist/css/perfect-scrollbar.css')
  import Ps from 'perfect-scrollbar'
  export default{
    props: ['now-page-classify', 'tabs'],
    data () {
      return {}
    },
    mounted () {
      let nowClassify = this.nowPageClassify
      Ps.initialize(document.getElementById('scrollTab'))// 初始化 滚动分类
      let offsetLeft = $('[tab-id=' + nowClassify.id + ']').offset().left
      if (offsetLeft > 40) {
        offsetLeft -= 40
      }
      $('#scrollTab').scrollLeft(offsetLeft)
    },
    methods: {
      checkTab (tab) {
        $('.ps-container.ps-active-x  .ps-scrollbar-x-rail').css({
          'opacity': 0
        })
        window.location.href = Config.URI.toPageBase + Config.URI.toListPage + '?video_classify=' + tab.id
        // this.$emit('changTab', tab)
      }
    }
  }
</script>
