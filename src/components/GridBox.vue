


<script lang="babel">
  /*************** 横向每行 n 个盒子 平铺布局 ****************/
  import Vue from 'vue'
  Vue.component("GridBox",{
    props:{
      columnNum:{/* 每一行排列盒子的个数 如： 2 */
        type:Number,
        required:true
      },
      columnSpace:{/* 每一行 盒子之间 水平方向的间距 如："10px" */
        type:String
      }
    },
    render:function(createElement){
      const self = this;
      const settings = {
        'class': {"flex-box":true,}
      }
      let vNode = [];
      const lineNumber = Math.ceil(self.$slots.default.length/self.columnNum);
      const createItem = function(i){
        const items = [];
        const itemSettings = {class:{"flex1":true},style:{marginLeft:self.columnSpace}}
        for(var j=i*self.columnNum; j<(i+1)*self.columnNum;j++){
          if(self.$slots.default[j]){
            if(j%self.columnNum != 0){
              items.push(createElement('div',itemSettings,[self.$slots.default[j]]));
            }
            else{
              items.push(createElement('div',{class:{"flex1":true}},[self.$slots.default[j]]));
            }
          }
          else{
            items.push(createElement('div',itemSettings))
          }
        }
        return items;
      }
      for(var i=0; i<lineNumber; i++){
        let gridItemHtml = createElement('div',settings,createItem(i));
        vNode.push(gridItemHtml);
      }
      console.log(vNode);
      var myHtml = createElement('div',{},vNode);
      return myHtml;
    }

    })
</script>
