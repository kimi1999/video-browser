
const F = {
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
  }
}

export default {
  F
}
