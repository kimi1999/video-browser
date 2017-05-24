<template>
  <div class="list-main">
    <SlideTabs></SlideTabs>
    <div class="dur-loading" v-if="!videoListParams.show" :style="{height:videoListParams.minHeight}">
      <LoadingCenter loading-width="40px" loading-color="#7b007b" loading-type="dots"></LoadingCenter>
    </div>
    <ListMain v-else="videoListParams.show" :video-list-params="videoListParams" ></ListMain>
  </div>
</template>

<style lang="less">
  @import "../assets/css/reset.css";
  @import "../assets/css/vars.less";
  @import "../assets/css/public.less";
  .list-main{
    padding-top: 45px;
  }
  .dur-loading{
    width: 100%;

  }

</style>

<script lang="babel">
  import SlideTabs from '../components/SlideTabs.vue'
  import LoadingCenter from '../components/LoadingCenter.vue'
  import ListMain from '../components/ListMain.vue'
  export default{
    data(){
      return {
        videoListParams:{
          classify: "Hot",//视频分类
          minHeight:"100%",//视频列表区域最小高度
          canLoadingRecent: true,//是否允许下滑加载最新数据
          canLoadingMore: true,//是否允许上滑加载更多数据
          show:true
        }
      }
    },
    mounted(){
      this.setVideoListHeight();
    },
    methods:{
      //设置 视频列表 块儿的最小高度
      setVideoListHeight(){
        const windowHeight = document.documentElement.clientHeight;
        this.$set(this.videoListParams,"minHeight",(windowHeight-45)+"px")
      }
    },
    components:{
      SlideTabs,LoadingCenter,ListMain
    }
  }
</script>
