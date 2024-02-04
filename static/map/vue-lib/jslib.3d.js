
var cbc_scripts = document.getElementsByTagName('script')//获所有script标签
var cbc_pre="";
//获取/vue-lib/jslib.3d.js的前缀
for(var i=0;i<cbc_scripts.length;i++){
    if(cbc_scripts[i].src.indexOf("/vue-lib/jslib.3d.js")>0){
      var jslibsrc=cbc_scripts[i].src;
      var subsrc=jslibsrc.substring(0,jslibsrc.indexOf("/vue-lib/jslib.3d.js"));
      cbc_pre=subsrc;
    }
}
//加密控件
document.writeln('<script src="'+cbc_pre+'/vue-lib/vuejs/crypto-js.js"></script>');
//vue插件
document.writeln('<script src="'+cbc_pre+'/vue-lib/vuejs/httpVueLoader.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/vuejs/vue.js"></script>');

//elementui插件
document.writeln('<link rel="stylesheet" href="'+cbc_pre+'/vue-lib/elementjs/index.css">');
document.writeln('<script src="'+cbc_pre+'/vue-lib/elementjs/index.js"></script>');

//cesium控件
//压缩
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/cesium/Build/Cesium/Cesium.js"></script>');
//未压缩
//document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/cesium/Build/CesiumUnminified/Cesium.js"></script>');
//源码
//document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/cesium/Build/Source/Cesium.js"></script>');
document.writeln('<link rel="stylesheet" href="'+cbc_pre+'/vue-lib/mapjs/cesium/Build/Cesium/Widgets/widgets.css">');
//百度地图加载插件
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/cesium/libs/layer/baiduProvider.js"></script>');
//threejs
// document.writeln('<script src="'+cbc_pre+'/vue-lib/threejs/three.js"></script>');
//jquery
document.writeln('<script src="'+cbc_pre+'/vue-lib/js/jquery.min.js"></script>');

//drawHelper
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/cesium/libs/drawHelper/plotUtil.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/cesium/libs/drawHelper/algorithm.js"></script>');
