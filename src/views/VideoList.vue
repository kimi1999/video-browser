<template>
  <div class="list-main">
    <SlideTabs></SlideTabs>
    <div class="video-list-cont">
      <GridBox :columnNum="2" columnSpace="12px">
        <VideoItem  v-for="i in 5"></VideoItem>
      </GridBox>
    </div>
  </div>
</template>

<style lang="less">
  @import "../assets/css/reset.css";
  @import "../assets/css/vars.less";
  .list-main{
    padding-top: 45px;
    .video-list-cont{
      padding: 0 12px;
    }
  }

</style>

<script lang="babel">
  import SlideTabs from '../components/SlideTabs.vue'
  import GridBox from '../components/GridBox.vue'
  import VideoItem from '../components/VideoItem.vue'
  export default{
    data(){
      return {}
    },
    mounted(){

    },
    methods:{

    },
    components:{
      SlideTabs,VideoItem
    }
  }
</script>
