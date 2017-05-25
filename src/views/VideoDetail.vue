<template>
  <div class="detail-main" :style="{paddingTop:playerContParams.relHeight+'px'}">
    <VideoPlayer :player-cont-params="playerContParams"></VideoPlayer>
    <VideoInfo :video-info-params="videoInfoParams"></VideoInfo>
    <PartingLine title-text="You May Like"></PartingLine>
    <ListMain v-show="videoListParams.show" :video-list-params="videoListParams" ></ListMain>
  </div>
</template>

<style lang="less" scoped>
  @import "../assets/css/reset.css";
  @import "../assets/css/vars.less";
  @import "../assets/css/public.less";
</style>

<script lang="babel">
  import VideoPlayer from '../components/VideoPlayer.vue'
  import VideoInfo from '../components/VideoInfo.vue'
  import PartingLine from '../components/PartingLine.vue'
  import ListMain from '../components/ListMain.vue'
  export default{
    data(){
      return {
        videoListParams:{
          classify: "",//视频分类
          minHeight:"100%",//视频列表区域最小高度
          canLoadingRecent: false,//是否允许下滑加载最新数据
          canLoadingMore: true,//是否允许上滑加载更多数据
          show:true
        },
        videoInfoParams:{
          id:1,
          title:"Cras mattis consectetur purus sit amet gogo fermentum.",
          source: "Youtube"
        },
        playerContParams: {
          width:360,
          height:200,
          relHeight:200,
          video:{
            id:"M7lc1UVf-VE"
          }
        }
      }
    },
    mounted(){

    },
    methods:{
      setPlayerHeight(){
        const windowWidth = document.documentElement.clientWidth;
        this.playerContParams.relHeight = windowWidth*this.playerContParams.height/this.playerContParams.width;
      }
    },
    components:{
      VideoPlayer,VideoInfo,PartingLine,ListMain
    }
  }
</script>
