<template>
  <div class="video-list-wrapper" :style="{minHeight:videoListParams.minHeight}">
    <div class="loading-recent">
      <LoadingCenter loading-width="25px" loading-color="#444"></LoadingCenter>
    </div>
    <div class="video-list-cont">
      <GridBox :columnNum="2" columnSpace="12px">
        <VideoItem  v-for="i in 5"></VideoItem>
      </GridBox>
    </div>
    <div class="loading-more">
      <LoadingCenter loading-width="25px" loading-color="#444"></LoadingCenter>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .video-list-cont{
    padding: 0 12px;
  }
</style>

<script lang="babel">
  import GridBox from './GridBox.vue'
  import VideoItem from './VideoItem.vue'
  import LoadingCenter from './LoadingCenter.vue'
  export default{
    props:["video-list-params"],
    data(){
      return {}
    },
    mounted(){

    },
    components:{
      VideoItem,LoadingCenter
    }
  }
</script>
