<template>
  <div class="list-main">
    <SlideTabs :tabs="tabs" v-if="tabs.list[0]" @changTab="triggerChangTab"></SlideTabs>
    <div class="dur-loading" v-if="!videoListParams.show" :style="{height:videoListParams.minHeight}">
      <LoadingCenter loading-width="40px" loading-color="#7b007b" loading-type="dots"></LoadingCenter>
    </div>
    <ListMain v-show="videoListParams.show" :video-list-params="videoListParams" ></ListMain>
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
          classify: "",//视频分类
          minHeight:"100%",//视频列表区域最小高度
          canLoadingRecent: true,//是否允许下滑加载最新数据
          canLoadingMore: true,//是否允许上滑加载更多数据
          show:true
        },
        tabs:{
          list:[],
          recent:""
        }
      }
    },
    mounted(){
      this.setVideoListHeight();
      this.getVideoClassifies();
    },
    methods:{
      //设置 视频列表 块儿的最小高度
      setVideoListHeight(){
        const windowHeight = document.documentElement.clientHeight;
        this.$set(this.videoListParams,"minHeight",(windowHeight-45)+"px")
      },
      //发请求 获取 视频分类
      getVideoClassifies(){
        //发请求 获取分类
        this.tabs.list = [
          {id:"1001",name:"Hot"},
          {id:"1002",name:"News"},
          {id:"1003",name:"Football"},
          {id:"1004",name:"Movie"},
          {id:"1005",name:"Sport"},
          {id:"1006",name:"Food"}
        ];
        this.triggerChangTab(this.tabs.list[0]);

      },
      //触发 视频分类切换
      triggerChangTab(tab){
        this.tabs.recent = tab.id;
        this.tabs.recent = tab.id;
        this.videoListParams.classify = tab.id;
        //this.videoListParams.show = false;
      }
    },
    components:{
      SlideTabs,LoadingCenter,ListMain
    }
  }
</script>
