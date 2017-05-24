<template>
  <div id="listWrapper" class="video-list-wrapper" :style="{minHeight:videoListParams.minHeight}">
    <div class="loading-recent" v-if="videoListParams.canLoadingRecent&&tools.loadingRecent">
      <LoadingCenter loading-width="25px" loading-color="#444"></LoadingCenter>
    </div>
    <div class="video-list-cont">
      <GridBox :columnNum="2" columnSpace="12px">
        <VideoItem  v-for="i in 5" :key="i"></VideoItem>
      </GridBox>
    </div>
    <div class="loading-more" v-if="videoListParams.canLoadingMore&&tools.loadingMore">
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
  import Config from '../assets/js/config'
  import GridBox from './GridBox.vue'
  import VideoItem from './VideoItem.vue'
  import LoadingCenter from './LoadingCenter.vue'
  export default{
    props:["video-list-params"],
    data(){
      return {
        tools:{
          loadingRecent: false,
          loadingMore: false
        }
      }
    },
    mounted(){
      const self = this;
      Config.F.initTouchLoading({
        elm: document.getElementById("listWrapper"),
        onTouchStart: function(loadingType){
          if(loadingType=="getMore"){
            self.tools.loadingMore = true;
          }
          else if(loadingType=="getRecent"){
            self.tools.loadingRecent = true;
          }
        },
        loadingRecent: function(){
          if(self.videoListParams.canLoadingRecent && !self.tools.loadingRecent){
            console.log("loading recent");

            setTimeout(function(){
              self.tools.loadingRecent = false;
            },3000)
          }
        },
        loadingMore: function(){
          if(self.videoListParams.canLoadingMore && !self.tools.loadingMore){
            console.log("loading more");

            setTimeout(function(){
              self.tools.loadingMore = false;
            },3000)
          }
        }
      });
    },
    components:{
      VideoItem,LoadingCenter
    }
  }
</script>
