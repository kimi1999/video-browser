<template>
  <div class="list-main">
    <SlideTabs></SlideTabs>
    <ListMain v-if="videoListParams.show" :video-list-params="videoListParams" ></ListMain>
  </div>
</template>

<style lang="less">
  @import "../assets/css/reset.css";
  @import "../assets/css/vars.less";
  @import "../assets/css/public.less";
  .list-main{
    padding-top: 45px;
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
          minHeight:"100%",
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
        console.log(windowHeight);
        this.$set(this.videoListParams,"minHeight",(windowHeight-45)+"px")
      }
    },
    components:{
      SlideTabs,ListMain
    }
  }
</script>
