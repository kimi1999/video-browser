<template>
    <div class="video-item">
      <div class="cover" :style="{'height':videoBox.relHeight}">

      </div>
      <div class="disc ellipsis-1">
        Praesent commodo cursus…
      </div>
    </div>
</template>
<style lang="less" scoped>
  .video-item{
    position: relative;
    margin-top: 16px;
  }
  .cover{
    width: 100%;
    background-color: #8a6343;
    background-size: cover!important;
  }
  .disc{
    width:100%;
    height:26px;
    line-height: 26px;
    font-size: 12px;
    color: #444444;
  }
</style>
<script lang="babel">
  import Config from '../assets/js/config'
  import $ from 'jquery'
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
    components:{}
  }
</script>
