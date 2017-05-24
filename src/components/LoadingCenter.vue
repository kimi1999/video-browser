<template>
  <div class="loading-box flex-box  flex-justify-center flex-align-center">
    <LoadingAnimate :animate-type="animateType" :animate-color="animateColor" :animate-width="animateWidth"></LoadingAnimate>
  </div>
</template>

<style lang="less" scoped>
  .loading-box{
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
<script lang="babel">
  import LoadingAnimate from './LoadingAnimate.vue'
  export default{
    props:["loading-type","loading-color","loading-width"],
    data(){
      return {
        animateType:"circular",
        animateColor:"#20a0ff",
        animateWidth:"42px"
      }
    },
    mounted(){
      if(this.loadingType){
        this.animateType = this.loadingType;
      }
      if(this.loadingColor){
        this.animateColor = this.loadingColor;
      }
      if(this.loadingWidth){
        this.animateWidth = this.loadingWidth;
      }
    },
    components:{
      LoadingAnimate
    }
  }
</script>
