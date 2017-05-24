<template>
    <div class="video-item">
      <div class="cover" :style="{'height':videoBox.relHeight}">
        <div class="loading-cont">
          <LoadingCenter loading-width="25px" loading-color="#7b007b" loading-type="dots"></LoadingCenter>
        </div>
        <span class="time">04:56</span>
      </div>
      <div class="disc ellipsis-1">
        Praesent commodo cursus…
      </div>
      <div class="source">
        <i class="play-icon"></i>
        <span class="from">Youtube</span>
      </div>
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
      top: 0;
      left: 0;
      display: inline-block;
      width: 12px;
      height: 12px;
      background-color: #7b007b;
    }
    .from{
      display: inline-block;
    }
  }
</style>
<script lang="babel">
  import Config from '../assets/js/config'
  import $ from 'jquery'
  import LoadingCenter from './LoadingCenter.vue'
  export default{
    data(){
        return{
          videoBox:{
            width:162,
            height:90,
            relHeight:"80px"
          }
        }
    },
    mounted(){
      const self = this;
      this.resetVideoBoxHeight();
      Config.F.addEvent(window,"resize",function(){
        self.resetVideoBoxHeight();
      })
    },
    methods:{
      resetVideoBoxHeight(){
        const coverWidth = $(".video-item").width();
        console.log((coverWidth*this.videoBox.height/this.videoBox.width));
        this.$set(this.videoBox,"relHeight",(coverWidth*this.videoBox.height/this.videoBox.width)+"px")
      }
    },
    components:{
      LoadingCenter
    }
  }
</script>
