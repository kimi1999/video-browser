
const env= {
  dev: true,
  test: false,
  product: false
}
const F = {
  /* 原生js 给elm（Object 原生Dom 或window） 添加 evType（多个事件空格 隔开 String）fn（Function事件回调） */
  addEvent: function (elm, evType, fn){
    var typeArr = evType.split(' ');
    for(var i=0; i<typeArr.length; i++){
      if (elm.addEventListener) {
        elm.addEventListener(typeArr[i], fn);//DOM2.0
      }
      else if (elm.attachEvent) {
        elm.attachEvent('on' + typeArr[i], fn);//IE5+
      }
      else {
        elm['on' + typeArr[i]] = fn;//DOM 0
      }
    }
  },
  /* 滑动加载更多  touch 事件触发
   obj = {
   elm: "滑动盒子的id", //string  可选  不传默认给window加touch事件（不建议）
   direction: "滑动方向", //string  可选  vertical/horizontal 默认vertical（上下滑动）
   onTouchStart: function(){},// function 可选 滑动开始时的回调
   loadingRecent: function(){}, //function  可选  在页面最顶部 下滑 执行的回调函数（加载最新的数据追加到数据列表最前面）
   loadingMore: function(){}, //function  可选  在页面最底部 上滑 执行的回调函数(加载更多 追加到数据列表尾部)
   }
   */
  initTouchLoading: function(obj){
    /* 给页面添加touch事件 */
    var startY = 0, //滑动开始时的y坐标
      endY = 0,//滑动结束时的y坐标
      startX = 0,// 滑动开始时的x坐标
      endX = 0,// 滑动结束时的x坐标
      self = this;
    const initTouch = function(elm){
      //滑动开始
      self.addEvent(elm,"touchstart",function(e){
        startY = e.changedTouches[0].pageY;
        startX = e.changedTouches[0].pageX;
      });
      //滑动结束
      self.addEvent(elm,"touchmove",function(e){
        var wH = document.documentElement.clientHeight,//窗口高度
          domH = document.documentElement.scrollHeight;//html文档 渲染后的高度
        endY = e.changedTouches[0].pageY;
        endX = e.changedTouches[0].pageX;
        if(startY==0) return;
        //正在加载数据 不重复执行 请求
        if(obj.touchArea){
          //滑动起始点 超出预设区域时 不执行事件
          if(obj.touchArea.top && startY<obj.touchArea.top) return;
          if(obj.touchArea.bottom && startY>obj.touchArea.bottom) return;
          if(obj.touchArea.left && startX<obj.touchArea.left) return;
          if(obj.touchArea.right && startX>obj.touchArea.right) return;
        }
        var direction = "vertical";//垂直
        if(Math.abs(endX-startX)/Math.abs(endY-startY)>1){
          direction = "horizontal";//水平
        }
        if(!obj.direction){
          obj.direction = "vertical";
        }
        if(obj.direction=="vertical" && direction=="vertical"){
          //上下滑动
          if(Math.abs(startY-endY) >= 10){
            //滑动距离 不小于10像素时 触发
            let loadingType= startY>endY?"getMore":"getRecent";//请求数据类型
            var scrollH = document.body.scrollTop
              ? document.body.scrollTop
              :document.documentElement.scrollTop;//滚动条滚动高度（距离顶部的距离）
            if(startY>endY){
              //向上滑   && scrollH!=0
              if( scrollH+wH >= (domH-20) ){
                //滑到 距离页面底部  20像素
                if(obj.loadingMore){
                  obj.loadingMore();
                }
                if(obj.onTouchStart){
                  obj.onTouchStart(loadingType);
                }
              }
            }
            else{
              //向下滑
              if( scrollH <= 10 ){
                //滑到页面顶部
                if(obj.loadingRecent){
                  obj.loadingRecent();
                }
                if(obj.onTouchStart){
                  obj.onTouchStart(loadingType);
                }
              }
            }
          }
        }
        else if(obj.direction=="horizontal" && direction=="horizontal"){
          //水平滑动
        }

      });
    }
    if(obj.elm){
      if(typeof obj.elm != "string"){
        initTouch(obj.elm);
        return;
      }
      let _t = 0;
      let touchTimer = setInterval(function(){
        const elm = document.getElementById(obj.elm);
        _t ++;
        if(_t<60){
          if(elm){
            clearInterval(touchTimer);
            initTouch(elm);
          }
        }
        else{
          clearInterval(touchTimer);
        }
      },50);
    }
    else{
      initTouch(window);
    }

  },
  /* 数组去重
     bigArr: 最终去除重复 的目标数组  Array 必须
     smallArr: 将要加入bigArr的小数组 Array 必须
     keyword:  根据数组中每个元素的  keyword属性 去除重复 String 必须
     type:  smallArr 插入 bigArr的方式 可选值"push" "unshift" 默认"push"   可选
   * */
  deleteRepeatItems: function(bigArr,smallArr,keyword,type){
    var insertType = type || "push";
    if(insertType=="push"){
      for(var i=0; i<smallArr.length; i++){
        var inArr = false;
        for(var j=0; j<bigArr.length; j++){
          if(smallArr[i][keyword] == bigArr[j][keyword]){
            inArr = true;
            break;
          }
        }
        if(!inArr){
          bigArr.push(smallArr[i]);
        }
      }
    }
    else if(type=="unshift"){
      for(var i= smallArr.length-1; i>0; i--){
        var inArr = false;
        for(var j=bigArr.length-1; j>0; j--){
          if(smallArr[i][keyword] == bigArr[j][keyword]){
            inArr = true;
            break;
          }
        }
        if(!inArr){
          bigArr.unshift(smallArr[i]);
        }
      }
    }
  }
}

let URI = {
  toDetailPage:"/video_detail.html",//跳转到视频详情页的地址
  base:"http://test.feed.mynewshunter.com",// 后台接口 base路径
  getVideoClassify: "",//获取视频分类
  getVideoList:"/video/list",//获取视频列表
  getOneVideoInfo: ""// 获取某一个视频的详细信息
}
//测试环境
if(env.test){
  URI.base="";
  URI.toDetailPage = "";
}
//线上环境
if(env.product){
  URI.base="";
  URI.toDetailPage = "";
}

export default {
  env,F,URI
}
