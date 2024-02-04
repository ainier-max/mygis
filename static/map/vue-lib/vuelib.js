var cbc_vue_scripts = document.getElementsByTagName('script')//获所有script标签
var cbc_vue_pre="";
//获取/vue-lib/jslib.js的前缀
for(var i=0;i<cbc_vue_scripts.length;i++){
  if(cbc_vue_scripts[i].src.indexOf("/vue-lib/vuelib.js")>0){
    var vuelibsrc=cbc_vue_scripts[i].src;
    var subsrc=vuelibsrc.substring(0,vuelibsrc.indexOf("/vue-lib/vuelib.js"));
    cbc_vue_pre=subsrc;
  }
}

//httpVueLoader.js文件
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/vuejs/httpVueLoader.js"></script>');

//leaflet地图插件
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leaflet/leaflet-src.js"></script>');
document.writeln('<link rel="stylesheet" href="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leaflet/leaflet.css"></link>');


//proj4投影插件
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/proj4/proj4.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/proj4/proj4leaflet.js"></script>');
//热力图插件
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/heatmap/leaflet-heat.js"></script>');
//聚合图插件
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/markercluster/leaflet.markercluster-src.js"></script>');
document.writeln('<link rel="stylesheet" href="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/markercluster/MarkerCluster.css"></link>');
document.writeln('<link rel="stylesheet" href="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/markercluster/MarkerCluster.Default.css"></link>');
//蚂蚁线插件
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leaflet-ant-path/leaflet-ant-path.js"></script>');

//平移控件
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/control/pan/L.Control.Pan.js"></script>');
document.writeln('<link rel="stylesheet" href="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/control/pan/L.Control.Pan.css"></link>');
//波纹点
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/iconpulse/L.Icon.Pulse.js"></script>');
document.writeln('<link rel="stylesheet" href="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/iconpulse/L.Icon.Pulse.css"></link>');

//线修饰
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/polylineDoctor/leaflet.polylineDecorator.js"></script>');
//动态点，动态线
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/animation/AnimatedMarker.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/animation/MovingMarker.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/animation/L.Polyline.SnakeAnim.js"></script>');

//canvas
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/canvas/L.CanvasOverlay.js"></script>');

//标绘组件
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/Leaflet.draw.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/Leaflet.Draw.Event.js"></script>');
document.writeln('<link rel="stylesheet" href="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/leaflet.draw.css"></link>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/Toolbar.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/Tooltip.js"></script>');


document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/ext/GeometryUtil.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/ext/LatLngUtil.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/ext/Polygon.Intersect.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/ext/Polyline.Intersect.js"></script>');


document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/DrawToolbar.js"></script>');

document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Feature.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.SimpleShape.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Polyline.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Marker.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Circle.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.CircleMarker.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Polygon.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Rectangle.js"></script>');

document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/EditToolbar.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/EditToolbar.Edit.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/EditToolbar.Delete.js"></script>');

document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/Control.Draw.js"></script>');

document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.Poly.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.SimpleShape.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.Rectangle.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.Marker.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.CircleMarker.js"></script>');
document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.Circle.js"></script>');

document.writeln('<script src="'+cbc_vue_pre+'/vue-lib/mapjs/leaflet/leafletdraw/ext/TouchEvents.js"></script>');



