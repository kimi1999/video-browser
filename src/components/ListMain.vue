<template>
  <div id="listWrapper" class="video-list-wrapper" :style="{minHeight:videoListParams.minHeight}">
    <transition  name="slide-fade">
      <div class="loading-recent" v-if="videoListParams.canLoadingRecent&&tools.loadingRecent">
        <LoadingCenter loading-width="25px" loading-color="#444"></LoadingCenter>
      </div>
    </transition >
    <div class="video-list-cont">
      <GridBox :columnNum="2" columnSpace="12px">
        <VideoItem  v-for="video in videoList" :key="video.id" :video-data="video"></VideoItem>
      </GridBox>
    </div>
    <transition  name="slide-fade">
      <div class="loading-more" v-if="videoListParams.canLoadingMore&&tools.loadingMore">
        <LoadingCenter loading-width="25px" loading-color="#444"></LoadingCenter>
      </div>
    </transition>
  </div>
</template>

<style lang="less" scoped>
  .video-list-cont{
    padding: 0 12px;
  }
</style>

<script lang="babel">
  import Config from '../assets/js/config'
  import testData from '../assets/js/testData'
  import GridBox from './GridBox.vue'
  import VideoItem from './VideoItem.vue'
  import LoadingCenter from './LoadingCenter.vue'
  export default{
    props:["video-list-params"],
    data(){
      return {
        tools:{
          loadingRecent: false,
          loadingRecentSuccess: true,
          loadingMore: false,
          loadingMoreSuccess: true
        },
        videoList: Config.env.dev ? testData.videoList:[]
      }
    },
    watch:{
      "videoListParams.classify": function(){
        this.getVideoList("recent",true);
      }
    },
    mounted(){
      const self = this;
      //初始化 滑动加载最新 和 滑动加载更多
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
            //console.log("loading recent");
            self.tools.loadingRecentSuccess = false;
            self.getVideoList("recent");
            setTimeout(function(){
              if(!self.tools.loadingRecentSuccess){
                self.tools.loadingRecent = false;
              }
            },10000)
          }
        },
        loadingMore: function(){
          if(self.videoListParams.canLoadingMore && !self.tools.loadingMore){
            //console.log("loading more");
            self.tools.loadingMoreSuccess = false;
            self.getVideoList("more");
            setTimeout(function(){
              if(!self.tools.loadingMoreSuccess){
                self.tools.loadingMore = false;
              }
            },10000)
          }
        }
      });
    },
    methods:{
      //获取视频列表
      getVideoList(type,changeClassify){
        let ajaxUrl = Config.URI.base + Config.URI.getVideoList;
        ajaxUrl += "?lang=en";
        if(type=="more"){
          ajaxUrl += "&load=1";
        }
        else{
          ajaxUrl += "&load=0";
        }
        this.$http.get(ajaxUrl).then(({data})=>{
          console.log(data);
        });
      }
    },
    components:{
      VideoItem,LoadingCenter
    }
  }
</script>
