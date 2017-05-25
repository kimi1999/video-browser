<template>
  <div class="player-main" :style="{height:playerContParams.relHeight+'px'}">
    <div v-if="videoIsReady" class="iframe-wrapper" id="APUSVideoPlayer">

    </div>
    <div v-else class="cover-cont">
      <LoadingCenter loading-width="25px" loading-color="#7b007b" loading-type="dots"></LoadingCenter>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .player-main{
    width: 100%;
    position: fixed;
    left: 0;
    top:0;
    background-color: #000;
    .cover-cont{
      position: relative;
      width: 100%;
      height: 100%;
      background-color: #000;
      background-size: cover!important;
      background: url("../assets/images/test-video-cover.png");
    }
  }
</style>

<script lang="babel">
  import LoadingCenter from './LoadingCenter.vue'
  export default{
    props:["player-cont-params"],
    data(){
      return {
        videoIsReady: false
      }
    },
    mounted(){

    },
    methods:{

    },
    components: {
      LoadingCenter
    }
  }
</script>
