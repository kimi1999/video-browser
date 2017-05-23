<template>
  <div class="box ui-border-b">
    <div class="main">
      <i></i>
      <div class="tab-list">
        <p>
          <span class="on">Hot</span>
          <span>News</span>
          <span>Music</span>
          <span>Movie</span>
          <span>Football</span>
          <span>Sport</span>
        </p>
      </div>
    </div>

  </div>
</template>
<style lang="less" scoped>
  .box{
    font-family: Roboto-Regular;
    position: fixed;
    z-index: 900;
    background-color: #fff;
    width: 100%;
    top:0px;
    left:0px;
    height: 44px;
    box-sizing: border-box;
    .main{
      position: relative;
      width: 100%;
      height: 100%;
      padding: 0 12px 0 42px;
      line-height: 44px;
      box-sizing: border-box;
      overflow: hidden;
      i{
        position: absolute;
        left: 12px;
        top:14px;
        width: 18px;
        height: 18px;
        display: inline-block;
        background-color: #7b007b;
      }
    }
    .tab-list{
      width: 100%;
      overflow: hidden;
    }
    p{
      white-space:nowrap;
      word-break: keep-all;
      word-wrap: normal;
    }
    p span{
      display: inline-block;
      padding: 0 12px;
      //float: left;
      font-size: 16px;
      color: rgba(68,68,68,0.80);
      &.on{
        color: #A20EFC;
      }
    }
  }
</style>
<script lang="babel">
    export default{
      data(){
          return{}
      },
      mounted(){

      },
      methods:{

      }
    }
</script>
