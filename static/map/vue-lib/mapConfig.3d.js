window.cesiumAccessToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1MzAzY2RiNS0xNjA4LTQzZWMtYTU4ZS1jODgxZjQ2YzA2NTYiLCJpZCI6NzkzMDQsImlhdCI6MTY1ODgyNDMyNX0.G6-6DjO9GGvHLJRl6L83OJlZXsh5vfZFhHF1O86trBE";

//倾斜摄影数据
window.tiltUrl="http://10.254.10.38:8081/mapdata/baoli3dtile/tileset.json";
//厦门建筑物数据
window.myXMBuildUrl="http://10.254.10.38:8081/mapdata/xiamenbuild/tileset.json";


window.defaultMapConfig={
  type:"UrlTemplateImageryProvider",
  mapOption: {
    //mapbox影像地图

    //url:"https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?sku=1012hlEBV5IUA&access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg",
    //url:"https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?sku=101xrzGuWRGnB&amp;access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg",
    //url:"https://api.mapbox.com/styles/v1/marsgis/cki0adkar2b0e19mv9tpiewld/tiles/512/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFyc2dpcyIsImEiOiJja2Fod2xlanIwNjJzMnhvMXBkMnNqcjVpIn0.WnxikCaN2KV_zn9tLZO77A",
    //arcgis地址
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    //osm矢量地图
    //url:"https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
    //高德影像
    //url: "https://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    //天地图影像
    //url: "https://t0.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=3ba472392e9c6c5040552733fac02d96"
    //天地图矢量
    //url: "http://t0.tianditu.gov.cn/vec_c/wmts?tk=9024bb5d2e154746bb513878231cc0cf&service=WMTS&request=GetTile&version=1.0.0&layer=vec&style=default&tilematrixSet=c&format=tiles&height=256&width=256&minZoom=1&maxZoom=18&tilematrix={z}&tilerow={y}&tilecol={x}",
  },
  //思明区
  centerPoint:[118.0850887298584, 24.439001083374023],
  //初始定位高度
  height:10000,//100000.0
  //初始倾斜角度  -90度和二维地图角度相同
  pitch:-90,
  viewerOption:{
    animation : false,//是否创建动画小器件，左下角仪表
    baseLayerPicker : false,//是否显示图层选择器
    fullscreenButton : false,//是否显示全屏按钮
    geocoder : false,//是否显示geocoder小器件，右上角查询按钮
    homeButton : false,//是否显示Home按钮
    infoBox : false,//是否显示信息框
    sceneModePicker : false,//是否显示3D/2D选择器,该值为true时，scene3DOnly必须为false
    scene3DOnly : true,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    selectionIndicator : false,//是否显示选取指示器组件
    timeline : false,//是否显示时间轴
    navigationHelpButton : false,//是否显示右上角的帮助按钮
    baselLayerPicker:false,// 将图层选择的控件关掉，才能添加其他影像数据
    shadows: true,
    shouldAnimate: true,
    // sceneMode : Cesium.SceneMode.SCENE3D,//初始场景模式
    sampleHeightSupported:true,
    requestRenderMode : true,//启用 requestRenderMode 以减少Cesium渲染新帧的总时间并减少Cesium在您的应用程序中的整体 CPU 使用率。
    maximumRenderTimeChange : Infinity,
    //加载地形
    terrainProvider : new Cesium.CesiumTerrainProvider({
      url: "http://data.marsgis.cn/terrain",
    })
  }
}

//天地图在线矢量地图
window.tiandituSLOnlineMapConfig={
  type:"UrlTemplateImageryProvider",
  mapOption:{
    //url: 'https://t{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=0b018552994f71a9467d24461a8f8238',
    url: 'https://t{s}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=0b018552994f71a9467d24461a8f8238',
    subdomains: ['0','1','2','3','4','5','6','7'],
    tilingScheme : new Cesium.WebMercatorTilingScheme(),
    maximumLevel : 18
  },
  otherMapOption:[{
    url: 'https://t{s}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=0b018552994f71a9467d24461a8f8238',
    subdomains: ['0','1','2','3','4','5','6','7'],
    tilingScheme : new Cesium.WebMercatorTilingScheme(),
    maximumLevel : 18
  }],
  //初始中心点
  centerPoint:[118.03577899932861,24.572162691314048],
  //初始定位高度
  height:9500000.0,
  //初始倾斜角度  -90度和二维地图角度相同
  pitch:-90,
  viewerOption:{
    animation : false,//是否创建动画小器件，左下角仪表
    baseLayerPicker : false,//是否显示图层选择器
    fullscreenButton : false,//是否显示全屏按钮
    geocoder : false,//是否显示geocoder小器件，右上角查询按钮
    homeButton : false,//是否显示Home按钮
    infoBox : false,//是否显示信息框
    sceneModePicker : false,//是否显示3D/2D选择器
    scene3DOnly : false,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    selectionIndicator : false,//是否显示选取指示器组件
    timeline : false,//是否显示时间轴
    navigationHelpButton : false,//是否显示右上角的帮助按钮
    baselLayerPicker:false,// 将图层选择的控件关掉，才能添加其他影像数据
    shadows: true,
    shouldAnimate: true,
    //sceneMode : Cesium.SceneMode.SCENE3D,//初始场景模式
  }
}
//天地图在线影像地图
window.tiandituYXOnlineMapConfig={
  type:"UrlTemplateImageryProvider",
  mapOption:{
    url: 'https://t{s}.tianditu.gov.cn/img_w/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={z}&layer=img&style=default&tilerow={y}&tilecol={x}&tilematrixset=w&format=tiles&tk=2a0e637a8772d92b123ee8866dee4a82',
    subdomains: ['0','1','2','3','4','5','6','7'],
    tilingScheme : new Cesium.WebMercatorTilingScheme(),
    maximumLevel : 18
  },
  otherMapOption:[{
    url: 'https://t{s}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=0b018552994f71a9467d24461a8f8238',
    subdomains: ['0','1','2','3','4','5','6','7'],
    tilingScheme : new Cesium.WebMercatorTilingScheme(),
    maximumLevel : 18
  }],
  //初始中心点
  centerPoint:[118.03577899932861,24.572162691314048],
  //初始定位高度
  height:9500000.0,
  //初始倾斜角度  -90度和二维地图角度相同
  pitch:-90,
  viewerOption:{
    animation : false,//是否创建动画小器件，左下角仪表
    baseLayerPicker : false,//是否显示图层选择器
    fullscreenButton : false,//是否显示全屏按钮
    geocoder : false,//是否显示geocoder小器件，右上角查询按钮
    homeButton : false,//是否显示Home按钮
    infoBox : false,//是否显示信息框
    sceneModePicker : false,//是否显示3D/2D选择器
    scene3DOnly : false,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    selectionIndicator : false,//是否显示选取指示器组件
    timeline : false,//是否显示时间轴
    navigationHelpButton : false,//是否显示右上角的帮助按钮
    baselLayerPicker:false,// 将图层选择的控件关掉，才能添加其他影像数据
    shadows: true,
    shouldAnimate: true,
    //sceneMode : Cesium.SceneMode.SCENE3D,//初始场景模式
  }
}

window.mapboxMapConfig={
  type:"UrlTemplateImageryProvider",
  mapOption: {
    //mapbox
    url:"https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?sku=101wcbfQIFJ9c&access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg",
  },
  //思明区
  centerPoint:[118.0850887298584, 24.439001083374023],
  //初始定位高度
  height:9500000,//100000.0
  //初始倾斜角度  -90度和二维地图角度相同
  pitch:-90,
  viewerOption:{
    animation : false,//是否创建动画小器件，左下角仪表
    baseLayerPicker : false,//是否显示图层选择器
    fullscreenButton : false,//是否显示全屏按钮
    geocoder : false,//是否显示geocoder小器件，右上角查询按钮
    homeButton : false,//是否显示Home按钮
    infoBox : false,//是否显示信息框
    sceneModePicker : false,//是否显示3D/2D选择器
    scene3DOnly : true,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    selectionIndicator : false,//是否显示选取指示器组件
    timeline : false,//是否显示时间轴
    navigationHelpButton : false,//是否显示右上角的帮助按钮
    baselLayerPicker:false,// 将图层选择的控件关掉，才能添加其他影像数据
    shadows: true,
    shouldAnimate: true,
    // sceneMode : Cesium.SceneMode.SCENE3D,//初始场景模式
    sampleHeightSupported:true,
    requestRenderMode : true,//渲染3DTile时,只加载当前画面的数据,可降低CPU
    //maximumRenderTimeChange : Infinity
  }
}

window.fangzhengMapConfig={
  type:"UrlTemplateImageryProvider",
  mapOption:{
    url:"http://10.254.10.38/ezmap_sl/{Time}/{x}/{y}.png",
    customTags: {
      Time: function (imageryProvider, x, y, level) {
        //console.log("级别：", level);
        return level + 1;
      }
    },
    tilingScheme: new Cesium.GeographicTilingScheme({
      numberOfLevelZeroTilesX: 2,
      numberOfLevelZeroTilesY: 1
    }),
  },
  //初始中心点
  centerPoint:[118.03577899932861,24.572162691314048],
  //初始定位高度
  height:9500000.0,
  //初始倾斜角度  -90度和二维地图角度相同
  pitch:-90,
  viewerOption:{
    animation : false,//是否创建动画小器件，左下角仪表
    baseLayerPicker : false,//是否显示图层选择器
    fullscreenButton : false,//是否显示全屏按钮
    geocoder : false,//是否显示geocoder小器件，右上角查询按钮
    homeButton : false,//是否显示Home按钮
    infoBox : false,//是否显示信息框
    sceneModePicker : false,//是否显示3D/2D选择器
    scene3DOnly : false,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    selectionIndicator : false,//是否显示选取指示器组件
    timeline : false,//是否显示时间轴
    navigationHelpButton : false,//是否显示右上角的帮助按钮
    baselLayerPicker:false,// 将图层选择的控件关掉，才能添加其他影像数据
    shadows: true,
    shouldAnimate: true,
    //sceneMode : Cesium.SceneMode.SCENE3D,//初始场景模式
  }
}

window.arcgisOnlineMapConfig={
  type:"UrlTemplateImageryProvider",
  mapOption: {
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  },
  //初始中心点
  //centerPoint:[118.11471659369913,24.522422570142833],
  centerPoint:[118.03577899932861,24.572162691314048],
  //初始定位高度
  height:9500000.0,
  //初始倾斜角度  -90度和二维地图角度相同
  pitch:-90,
  viewerOption:{
    animation : false,//是否创建动画小器件，左下角仪表
    baseLayerPicker : false,//是否显示图层选择器
    fullscreenButton : false,//是否显示全屏按钮
    geocoder : false,//是否显示geocoder小器件，右上角查询按钮
    homeButton : false,//是否显示Home按钮
    infoBox : false,//是否显示信息框
    sceneModePicker : false,//是否显示3D/2D选择器
    scene3DOnly : false,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    selectionIndicator : false,//是否显示选取指示器组件
    timeline : false,//是否显示时间轴
    navigationHelpButton : false,//是否显示右上角的帮助按钮
    baselLayerPicker:false,// 将图层选择的控件关掉，才能添加其他影像数据
    shadows: true,
    shouldAnimate: true,
    //sceneMode : Cesium.SceneMode.SCENE3D,//初始场景模式
  }
}
//arcgis深色地图，坐标系gcj02
window.arcgisDarkOnlineMapConfig={
  type:"UrlTemplateImageryProvider",
  mapOption: {
    url: "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
  },
  //初始中心点
  //centerPoint:[118.11471659369913,24.522422570142833],
  centerPoint:[118.03577899932861,24.572162691314048],
  //初始定位高度
  height:100000.0,
  //初始倾斜角度  -90度和二维地图角度相同
  pitch:-90,
  viewerOption:{
    animation : false,//是否创建动画小器件，左下角仪表
    baseLayerPicker : false,//是否显示图层选择器
    fullscreenButton : false,//是否显示全屏按钮
    geocoder : false,//是否显示geocoder小器件，右上角查询按钮
    homeButton : false,//是否显示Home按钮
    infoBox : false,//是否显示信息框
    sceneModePicker : false,//是否显示3D/2D选择器
    scene3DOnly : false,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    selectionIndicator : false,//是否显示选取指示器组件
    timeline : false,//是否显示时间轴
    navigationHelpButton : false,//是否显示右上角的帮助按钮
    baselLayerPicker:false,// 将图层选择的控件关掉，才能添加其他影像数据
    shadows: true,
    shouldAnimate: true,
    //sceneMode : Cesium.SceneMode.SCENE3D,//初始场景模式
  }
}


window.googleOnlineMapConfig={
  type:"UrlTemplateImageryProvider",
  mapOption: {
    //url: "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali",
    url: "https://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
  },
  //初始中心点
  centerPoint:[110.11471659369913,24.522422570142833],
  //初始定位高度
  height:9500000.0,
  //初始倾斜角度  -90度和二维地图角度相同
  pitch:-90,
  viewerOption:{
    animation : false,//是否创建动画小器件，左下角仪表
    baseLayerPicker : false,//是否显示图层选择器
    fullscreenButton : false,//是否显示全屏按钮
    geocoder : false,//是否显示geocoder小器件，右上角查询按钮
    homeButton : false,//是否显示Home按钮
    infoBox : false,//是否显示信息框
    sceneModePicker : false,//是否显示3D/2D选择器
    scene3DOnly : false,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    selectionIndicator : false,//是否显示选取指示器组件
    timeline : false,//是否显示时间轴
    navigationHelpButton : false,//是否显示右上角的帮助按钮
    baselLayerPicker:false,// 将图层选择的控件关掉，才能添加其他影像数据
    shadows: true,
    shouldAnimate: true,
    //sceneMode : Cesium.SceneMode.SCENE3D,//初始场景模式
  }
}

window.gaodeOnlineMapConfig={
  type:"UrlTemplateImageryProvider",//google
  mapOption: {
    url: "https://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
  },
  //初始中心点
  centerPoint:[110.11471659369913,24.522422570142833],
  //初始定位高度
  height:9500000.0,
  //初始倾斜角度  -90度和二维地图角度相同
  pitch:-90,
  viewerOption:{
    animation : false,//是否创建动画小器件，左下角仪表
    baseLayerPicker : false,//是否显示图层选择器
    fullscreenButton : false,//是否显示全屏按钮
    geocoder : false,//是否显示geocoder小器件，右上角查询按钮
    homeButton : false,//是否显示Home按钮
    infoBox : false,//是否显示信息框
    sceneModePicker : false,//是否显示3D/2D选择器
    scene3DOnly : false,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    selectionIndicator : false,//是否显示选取指示器组件
    timeline : false,//是否显示时间轴
    navigationHelpButton : false,//是否显示右上角的帮助按钮
    baselLayerPicker:false,// 将图层选择的控件关掉，才能添加其他影像数据
    shadows: true,
    shouldAnimate: true,
    //sceneMode : Cesium.SceneMode.SCENE3D,//初始场景模式
  }
}

window.osmOnlineMapConfig={
  type:"UrlTemplateImageryProvider",//google
  mapOption: {
    url: "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  //初始中心点
  centerPoint:[118.0850887298584, 24.439001083374023],
  //初始定位高度
  height:9500000.0,
  //初始倾斜角度  -90度和二维地图角度相同
  pitch:-90,
  viewerOption:{
    animation : false,//是否创建动画小器件，左下角仪表
    baseLayerPicker : false,//是否显示图层选择器
    fullscreenButton : false,//是否显示全屏按钮
    geocoder : false,//是否显示geocoder小器件，右上角查询按钮
    homeButton : false,//是否显示Home按钮
    infoBox : false,//是否显示信息框
    sceneModePicker : false,//是否显示3D/2D选择器
    scene3DOnly : false,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    selectionIndicator : false,//是否显示选取指示器组件
    timeline : false,//是否显示时间轴
    navigationHelpButton : false,//是否显示右上角的帮助按钮
    baselLayerPicker:false,// 将图层选择的控件关掉，才能添加其他影像数据
    shadows: true,
    shouldAnimate: true,
    //sceneMode : Cesium.SceneMode.SCENE3D,//初始场景模式
  }
}

window.noMapConfig={
  type:"UrlTemplateImageryProvider",//google
  mapOption: {
    url: "",
  },
  //初始中心点
  centerPoint:[118.03577899932861,24.572162691314048],
  //初始定位高度
  height:10000.0,
  //初始倾斜角度  -90度和二维地图角度相同
  pitch:-90,
  viewerOption:{
    animation : false,//是否创建动画小器件，左下角仪表
    baseLayerPicker : false,//是否显示图层选择器
    fullscreenButton : false,//是否显示全屏按钮
    geocoder : false,//是否显示geocoder小器件，右上角查询按钮
    homeButton : false,//是否显示Home按钮
    infoBox : false,//是否显示信息框
    sceneModePicker : false,//是否显示3D/2D选择器
    scene3DOnly : false,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    selectionIndicator : false,//是否显示选取指示器组件
    timeline : false,//是否显示时间轴
    navigationHelpButton : false,//是否显示右上角的帮助按钮
    baselLayerPicker:false,// 将图层选择的控件关掉，才能添加其他影像数据
    shadows: true,
    shouldAnimate: true,
    //透明必须设置
    orderIndependentTranslucency: false,
    contextOptions: {
      webgl: {
        alpha: true,
      }
    },
    //sceneMode : Cesium.SceneMode.SCENE3D,//初始场景模式
  }
}


window.baiduOnlineMapConfig={
  type:"BaiduImageryProvider",//baidu
  mapOption: {
    url: "http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1",
  },
  //初始中心点
  centerPoint:[110.11471659369913,24.522422570142833],
  //初始定位高度
  height:9500000.0,
  //初始倾斜角度  -90度和二维地图角度相同
  pitch:-90,
  viewerOption:{
    animation : false,//是否创建动画小器件，左下角仪表
    baseLayerPicker : false,//是否显示图层选择器
    fullscreenButton : false,//是否显示全屏按钮
    geocoder : false,//是否显示geocoder小器件，右上角查询按钮
    homeButton : false,//是否显示Home按钮
    infoBox : false,//是否显示信息框
    sceneModePicker : false,//是否显示3D/2D选择器
    scene3DOnly : false,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    selectionIndicator : false,//是否显示选取指示器组件
    timeline : false,//是否显示时间轴
    navigationHelpButton : false,//是否显示右上角的帮助按钮
    baselLayerPicker:false,// 将图层选择的控件关掉，才能添加其他影像数据
    shadows: true,
    shouldAnimate: true,
  }
}
//百度午夜风格
window.baiduOnlineMidNightMapConfig={
  type:"BaiduImageryProvider",//baidu
  mapOption: {
    url: "https://api.map.baidu.com/customimage/tile?&x={x}&y={y}&z={z}&udt=20210506&scale=1&ak=1XjLLEhZhQNUzd93EjU5nOGQ&customid=midnight",
  },
  //思明区
  centerPoint:[118.0850887298584, 24.439001083374023],
  //初始定位高度
  height:10000,
  //初始倾斜角度  -90度和二维地图角度相同
  pitch:-90,
  viewerOption:{
    animation : false,//是否创建动画小器件，左下角仪表
    baseLayerPicker : false,//是否显示图层选择器
    fullscreenButton : false,//是否显示全屏按钮
    geocoder : false,//是否显示geocoder小器件，右上角查询按钮
    homeButton : false,//是否显示Home按钮
    infoBox : false,//是否显示信息框
    sceneModePicker : false,//是否显示3D/2D选择器
    scene3DOnly : false,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    selectionIndicator : false,//是否显示选取指示器组件
    timeline : false,//是否显示时间轴
    navigationHelpButton : false,//是否显示右上角的帮助按钮
    baselLayerPicker:false,// 将图层选择的控件关掉，才能添加其他影像数据
    shadows: true,
    shouldAnimate: true,
  }
}

//智图
window.geoqMapConfig={
  type:"UrlTemplateImageryProvider",
  mapOption: {
    url:"http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
  },
  //思明区
  centerPoint:[118.0850887298584, 24.439001083374023],
  //初始定位高度
  height:10000,//100000.0
  //初始倾斜角度  -90度和二维地图角度相同
  pitch:-90,
  viewerOption:{
    animation : false,//是否创建动画小器件，左下角仪表
    baseLayerPicker : false,//是否显示图层选择器
    fullscreenButton : false,//是否显示全屏按钮
    geocoder : false,//是否显示geocoder小器件，右上角查询按钮
    homeButton : false,//是否显示Home按钮
    infoBox : false,//是否显示信息框
    sceneModePicker : false,//是否显示3D/2D选择器,该值为true时，scene3DOnly必须为false
    scene3DOnly : true,//如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    selectionIndicator : false,//是否显示选取指示器组件
    timeline : false,//是否显示时间轴
    navigationHelpButton : false,//是否显示右上角的帮助按钮
    baselLayerPicker:false,// 将图层选择的控件关掉，才能添加其他影像数据
    shadows: true,
    shouldAnimate: true,
    // sceneMode : Cesium.SceneMode.SCENE3D,//初始场景模式
    sampleHeightSupported:true,
    requestRenderMode : true,//渲染3DTile时,只加载当前画面的数据,可降低CPU
    //maximumRenderTimeChange : Infinity
    //加载地形
    terrainProvider : new Cesium.CesiumTerrainProvider({
      url: "http://data.marsgis.cn/terrain",
    })
  }
}


