
var cbc_scripts = document.getElementsByTagName('script')//获所有script标签
var cbc_pre="";
//获取/vue-lib/jslib.js的前缀
for(var i=0;i<cbc_scripts.length;i++){
    if(cbc_scripts[i].src.indexOf("/vue-lib/jslib.js")>0){
      var jslibsrc=cbc_scripts[i].src;
      var subsrc=jslibsrc.substring(0,jslibsrc.indexOf("/vue-lib/jslib.js"));
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

//leaflet地图插件
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leaflet/leaflet-src.js"></script>');
document.writeln('<link rel="stylesheet" href="'+cbc_pre+'/vue-lib/mapjs/leaflet/leaflet/leaflet.css"></link>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/proj4/proj4.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/proj4/proj4leaflet.js"></script>');
//axios插件
document.writeln('<script src="'+cbc_pre+'/vue-lib/vuejs/axios.min.js"></script>');
//热力图插件
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/heatmap/leaflet-heat.js"></script>');

//聚合图插件
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/markercluster/leaflet.markercluster-src.js"></script>');
document.writeln('<link rel="stylesheet" href="'+cbc_pre+'/vue-lib/mapjs/leaflet/markercluster/MarkerCluster.css"></link>');
document.writeln('<link rel="stylesheet" href="'+cbc_pre+'/vue-lib/mapjs/leaflet/markercluster/MarkerCluster.Default.css"></link>');
//蚂蚁线插件
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leaflet-ant-path/leaflet-ant-path.js"></script>');

//平移控件
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/control/pan/L.Control.Pan.js"></script>');
document.writeln('<link rel="stylesheet" href="'+cbc_pre+'/vue-lib/mapjs/leaflet/control/pan/L.Control.Pan.css"></link>');
//波纹点
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/iconpulse/L.Icon.Pulse.js"></script>');
document.writeln('<link rel="stylesheet" href="'+cbc_pre+'/vue-lib/mapjs/leaflet/iconpulse/L.Icon.Pulse.css"></link>');

//线修饰
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/polylineDoctor/leaflet.polylineDecorator.js"></script>');
//动态点，动态线
//document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/animation/AnimatedMarker.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/animation/MovingMarker.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/animation/L.Polyline.SnakeAnim.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/animation/Leaflet.AnimatedMarker.js"></script>');
//canvas
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/canvas/L.CanvasOverlay.js"></script>');

//minemap地图插件
//document.writeln('<link rel="stylesheet" href="'+cbc_pre+'/vue-lib/mapjs/minemap/iconfont.css"></link>');
document.writeln('<link rel="stylesheet" href="'+cbc_pre+'/vue-lib/mapjs/minemap/minemap.css"></link>');
document.writeln('<link rel="stylesheet" href="'+cbc_pre+'/vue-lib/mapjs/minemap/minemap-edit.css"></link>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/minemap/minemap.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/minemap/minemap-edit.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/minemap/turf.min.js"></script>');

//标绘组件
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/Leaflet.draw.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/Leaflet.Draw.Event.js"></script>');
document.writeln('<link rel="stylesheet" href="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/leaflet.draw.css"></link>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/Toolbar.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/Tooltip.js"></script>');


document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/ext/GeometryUtil.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/ext/LatLngUtil.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/ext/Polygon.Intersect.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/ext/Polyline.Intersect.js"></script>');


document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/DrawToolbar.js"></script>');

document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Feature.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.SimpleShape.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Polyline.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Marker.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Circle.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.CircleMarker.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Polygon.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/draw/handler/Draw.Rectangle.js"></script>');

document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/EditToolbar.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/EditToolbar.Edit.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/EditToolbar.Delete.js"></script>');

document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/Control.Draw.js"></script>');

document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.Poly.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.SimpleShape.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.Rectangle.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.Marker.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.CircleMarker.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/edit/handler/Edit.Circle.js"></script>');


document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/leafletdraw/ext/TouchEvents.js"></script>');


//mapv
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapv/mapv.js"></script>');

//平行线
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/polylineoffset/leaflet.polylineoffset.js"></script>');

//图层拖动
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/drag/L.Path.Drag-src.js"></script>');

//椭圆插件
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/ellipse/l.ellipse.js"></script>');

//军事标绘插件
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/plot/Plots.js"></script>');
document.writeln('<script src="'+cbc_pre+'/vue-lib/mapjs/leaflet/plot/PlotUtil.js"></script>');


