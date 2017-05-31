<template>
  <div class="main">
    <i></i>
    <span>{{titleText}}</span>
  </div>
</template>

<style lang="less" scoped>
  .main{
    margin-top: 20px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 12px;
    height: 20px;
    line-height: 20px;
    padding-left: 23px;
    position: relative;
    i{
      display: inline-block;
      width: 3px;
      height: 12px;
      background: #AA2BF6;
      position: absolute;
      left: 12px;
      top:5px;
    }
    span{
      color: #444;
      font-size: 14px;
    }
  }
</style>

<script>
  export default{
    props: ['title-text'],
    data () {
      return {}
    },
    mounted () {

    },
    methods: {

    }
  }
</script>
