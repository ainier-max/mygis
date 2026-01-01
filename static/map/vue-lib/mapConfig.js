//window.deploymentPath="http://106.53.28.207/pandagis";
window.deploymentPath="http://127.0.0.1:8091";
//window.gisServerUrl="http://106.53.28.207:8081/myboot",
window.gisServerUrl="http://127.0.0.1:8087";
//地图数据地址前缀
window.mapDataUrl="http://10.254.10.38:8081/mapdata";




window.tiandituMapConfig={
  //矢量瓦片服务地址
  mapUrl:"http://t0.tianditu.gov.cn/vec_c/wmts?tk=9024bb5d2e154746bb513878231cc0cf&service=WMTS&request=GetTile&version=1.0.0&layer=vec&style=default&tilematrixSet=c&format=tiles&height=256&width=256&minZoom=1&maxZoom=18&tilematrix={z}&tilerow={y}&tilecol={x}",
  //注记瓦片服务地址
  titleUrl:"http://t0.tianditu.gov.cn/cva_c/wmts?tk=9024bb5d2e154746bb513878231cc0cf&service=WMTS&request=GetTile&version=1.0.0&layer=cva&style=default&tilematrixSet=c&format=tiles&height=256&width=256&minZoom=1&maxZoom=18&tilematrix={z}&tilerow={y}&tilecol={x}",
  //中心点
  centerPoint:[24.522422570142833,118.11471659369913],
  //最大级别
  maxZoom:19,
  //最小级别
  minZoom:1,
  //坐标系类型
  coordinateType:"WGS84",//取值范围[WGS84,GCJ02,BD09]
  //坐标系单位
  coordinateUnit:"DEGREE",
  //点击地图是否关闭气泡框
  closePopupOnClick:false,
  //缩放级别
  //zoomSnap:0.01,
  //级别
  level:12,
  //缩放控件
  zoomControl:false,
  crs:{
    epsg:'EPSG:4326',
    proj:'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs',
    resolutions:[
      1.40625,
      0.703125,
      0.3515625,
      0.17578125,
      0.087890625,
      0.0439453125,
      0.02197265625,
      0.010986328125,
      0.0054931640625,
      0.00274658203125,
      0.001373291015625,
      6.866455078125E-4,
      3.4332275390625E-4,
      1.71661376953125E-4,
      8.58306884765625E-5,
      4.29153442382813E-5,
      2.14576721191406E-5,
      1.07288360595703E-5,
      5.36441802978516E-6,
      2.68220901489258E-6
    ],
    origin:[-180,90]
  }
}

//滤镜
window.tiandituMapFilterConfig={
  //矢量瓦片服务地址
  mapUrl:"http://t0.tianditu.gov.cn/vec_c/wmts?tk=9024bb5d2e154746bb513878231cc0cf&service=WMTS&request=GetTile&version=1.0.0&layer=vec&style=default&tilematrixSet=c&format=tiles&height=256&width=256&minZoom=1&maxZoom=18&tilematrix={z}&tilerow={y}&tilecol={x}",
  //注记瓦片服务地址
  titleUrl:"http://t0.tianditu.gov.cn/cva_c/wmts?tk=9024bb5d2e154746bb513878231cc0cf&service=WMTS&request=GetTile&version=1.0.0&layer=cva&style=default&tilematrixSet=c&format=tiles&height=256&width=256&minZoom=1&maxZoom=18&tilematrix={z}&tilerow={y}&tilecol={x}",
  //中心点
  centerPoint:[24.522422570142833,118.11471659369913],
  //最大级别
  maxZoom:19,
  //最小级别
  minZoom:1,
  //坐标系类型
  coordinateType:"WGS84",//取值范围[WGS84,GCJ02,BD09]
  //坐标系单位
  coordinateUnit:"DEGREE",
  //点击地图是否关闭气泡框
  closePopupOnClick:false,
  //缩放级别
  //zoomSnap:0.01,//该设置会导致地图瓦片的缝隙，可通过设置背景颜色，让缝隙不明显
  //级别
  level:12,
  //缩放控件
  zoomControl:false,
  //地图滤镜
  filter:"invert(100%) grayscale(100%) brightness(100%) contrast(100%) hue-rotate(0deg) saturate(100%) sepia(0%)",
  crs:{
    epsg:'EPSG:4326',
    proj:'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs',
    resolutions:[
      1.40625,
      0.703125,
      0.3515625,
      0.17578125,
      0.087890625,
      0.0439453125,
      0.02197265625,
      0.010986328125,
      0.0054931640625,
      0.00274658203125,
      0.001373291015625,
      6.866455078125E-4,
      3.4332275390625E-4,
      1.71661376953125E-4,
      8.58306884765625E-5,
      4.29153442382813E-5,
      2.14576721191406E-5,
      1.07288360595703E-5,
      5.36441802978516E-6,
      2.68220901489258E-6
    ],
    origin:[-180,90]
  }
}


window.tiandituYX2MapConfig={
  //矢量瓦片服务地址
  mapUrl:"http://t7.tianditu.gov.cn/img_w/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={z}&layer=img&style=default&tilerow={y}&tilecol={x}&tilematrixset=w&format=tiles&tk=83b36ded6b43b9bc81fbf617c40b83b5",
  //注记瓦片服务地址
  titleUrl:"http://t5.tianditu.gov.cn/cia_w/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={z}&layer=cia&style=default&tilerow={y}&tilecol={x}&tilematrixset=w&format=tiles&tk=56b81006f361f6406d0e940d2f89a39c",
  //中心点
  centerPoint:[24.522422570142833,118.11471659369913],
  //最大级别
  maxZoom:19,
  //最小级别
  minZoom:1,
  //坐标系类型
  coordinateType:"WGS84",//取值范围[WGS84,GCJ02,BD09]
  //坐标系单位
  coordinateUnit:"DEGREE",
  //点击地图是否关闭气泡框
  closePopupOnClick:false,
  //缩放级别
  //zoomSnap:0.01,
  //级别
  level:12,
  //缩放控件
  zoomControl:false,
  crs:{
    epsg:'EPSG:4326',
    proj:'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs',
    resolutions:[
      0.14,
      0.703125,
      0.3515625,
      0.17578125,
      0.087890625,
      0.0439453125,
      0.02197265625,
      0.010986328125,
      0.0054931640625,
      0.00274658203125,
      0.001373291015625,
      6.866455078125E-4,
      3.4332275390625E-4,
      1.71661376953125E-4,
      8.58306884765625E-5,
      4.291534423828125E-5,
      2.1457672119140625E-5,
      1.0728836059570312E-5,
      5.364418029785156E-6,
      2.682209014892578E-6,
      1.341104507446289E-6
    ],
    origin:[-180,90]
  }
}



window.tiandituYXMapConfig={
  //瓦片服务地址
  //矢量瓦片服务地址
  mapUrl:"http://t7.tianditu.gov.cn/img_w/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={z}&layer=img&style=default&tilerow={y}&tilecol={x}&tilematrixset=w&format=tiles&tk=56b81006f361f6406d0e940d2f89a39c",
  //注记瓦片服务地址
  titleUrl:"http://t5.tianditu.gov.cn/cia_w/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={z}&layer=cia&style=default&tilerow={y}&tilecol={x}&tilematrixset=w&format=tiles&tk=56b81006f361f6406d0e940d2f89a39c",
  centerPoint:[24.522422570142833,118.11471659369913],
  maxZoom:20,
  minZoom:1,
  coordinateType:"GCJ02",//取值范围[WGS84,GCJ02,BD09]
  coordinateUnit:"METER",
  closePopupOnClick:false,
  level:5,
  zoomControl:false
}

//博社村影像图
window.BscYXMapConfig={
  //瓦片服务地址
  //矢量瓦片服务地址
  mapUrl:window.mapDataUrl+"/tianditu_yx_gcj02/{z}/{x}/{y}.png",
  //注记瓦片服务地址
  titleUrl:window.mapDataUrl+"/tianditu_zj_gcj02/{z}/{x}/{y}.png",
  centerPoint:[22.86546933525703,116.02141857147218],
  maxZoom:18,
  minZoom:5,
  coordinateType:"GCJ02",//取值范围[WGS84,GCJ02,BD09]
  coordinateUnit:"METER",
  closePopupOnClick:false,
  level:17,
  zoomControl:false
}

//博社村影像图
window.chinaYXMapConfig={
  //瓦片服务地址
  //矢量瓦片服务地址
  mapUrl:"http://10.11.0.167/tianditu_yx/{z}/{x}/{y}.png",
  //注记瓦片服务地址
  titleUrl:"http://10.11.0.167/tianditu_yx_zj/{z}/{x}/{y}.png",
  centerPoint:[22.86546933525703,116.02141857147218],
  maxZoom:18,
  minZoom:1,
  coordinateType:"GCJ02",//取值范围[WGS84,GCJ02,BD09]
  coordinateUnit:"METER",
  closePopupOnClick:false,
  level:8,
  zoomControl:false
}


/**
 * geojsonMap
 */
window.geojsonMapConfig = {
  //瓦片服务地址
  mapUrl:"",
  //中心点
  centerPoint:[31.728515625000004,106.80859375],
  //最大级别
  maxZoom:15,
  //最小级别
  minZoom:1,
  //坐标系类型
  coordinateType:"WGS84",//取值范围[WGS84,GCJ02,BD09]
  //坐标系单位
  coordinateUnit:"DEGREE",
  //点击地图是否关闭气泡框
  closePopupOnClick:false,
  //级别
  level:4,
  //缩放控件
  zoomControl:false,
};

/**
 * 方正地图配置
 * （1）顺丰（呼和浩特）
 */
window.fangzhengMapConfig = {
  //瓦片服务地址
  mapUrl:window.mapDataUrl+"/ezmap_sl/{z}/{x}/{y}.png",
  //中心点
  centerPoint:[24.522422570142833,118.11471659369913],
  //最大级别
  maxZoom:20,
  //最小级别
  minZoom:1,
  //坐标系类型
  coordinateType:"WGS84",//取值范围[WGS84,GCJ02,BD09]
  //坐标系单位
  coordinateUnit:"DEGREE",
  //点击地图是否关闭气泡框
  closePopupOnClick:false,
  //级别
  level:12,
  //缩放控件
  zoomControl:false,
  //地图滤镜
  //filter:"invert(100%) grayscale(78%) brightness(108%) contrast(100%) hue-rotate(220deg) saturate(100%) sepia(0%)",
  crs:{
      epsg:'EPSG:4326',
      proj:'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs',
      resolutions:[
          0.14,
          0.703125,
          0.3515625,
          0.17578125,
          0.087890625,
          0.0439453125,
          0.02197265625,
          0.010986328125,
          0.0054931640625,
          0.00274658203125,
          0.001373291015625,
          6.866455078125E-4,
          3.4332275390625E-4,
          1.71661376953125E-4,
          8.58306884765625E-5,
          4.291534423828125E-5,
          2.1457672119140625E-5,
          1.0728836059570312E-5,
          5.364418029785156E-6,
          2.682209014892578E-6,
          1.341104507446289E-6,
          6.7828123215212245E-7

      ],
      origin:[-180,90]
  }
};

/**
 * 精一地图配置
 *（1）精一（广州省厅）
 */
window.jingyiMapConfig = {
  mapUrl:window.mapDataUrl+"/jingyi_sl/{z}/{x}/{y}.png",
  centerPoint:[23.125439823073137,113.2667271417531],
  maxZoom:15,
  minZoom:5,
  coordinateType:"WGS84",//取值范围[WGS84,GCJ02,BD09]
  coordinateUnit:"DEGREE",
  closePopupOnClick:false,
  level:12,
  zoomControl:false,
  crs:{
    epsg:'EPSG:4326',
    proj:'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs',
    resolutions:[
      2.0000081722216954,
      1.0000040861108477,
      0.50000204305542384,
      0.25000102152771203,
      0.12500051076385602,
      0.062500255381928008,
      0.031250127690964004,
      0.015625063845482002,
      0.007812531922741001,
      0.0039062659613704467,
      0.0019531329806852234,
      0.00097656649034265201,
      0.00048828324517127884,
      0.00024414162258569,
      0.000122070811292845,
      6.10354056464225e-005,
      3.0517702823161505e-005,
      7.6294257058400141e-006,
      3.8147128528703159e-006,
      1.9073515436177414e-006
    ],
    origin:[109.5,27]
  }
};


/**
 * 超图地图配置,该配置名window.superMapConfig不可修改
 *（1）超图（安微淮南）
 */
window.superMapConfig = {
  mapUrl:window.mapDataUrl+"/super_black/{z}/{x}/{y}.png",
  centerPoint:[32.02,117.26],
  maxZoom:20,
  minZoom:8,
  coordinateType:"WGS84",//取值范围[WGS84,GCJ02,BD09]
  coordinateUnit:"DEGREE",
  closePopupOnClick:false,
  level:8,
  zoomControl:false,
  scale_arr:[
    1,
    3.380327143205305e-9,
    6.76065428641061e-9,
    1.3521308572821245e-8,
    2.704261714564249e-8,
    5.40852342912848e-8,
    1.0817046858256987e-7,
    2.1634093716513982e-7,
    4.3268187433027964e-7,
    8.653637486605593e-7,
    0.0000017307274973211186,
    0.000003461454994642237,
    0.000006922909989284474,
    0.000013845819978568949,
    0.000027691639957137897,
    0.000055383279914275794,
    0.00011076655982855159,
    0.00022153311965710318,
    0.00044306623931420635
  ],
  crs:{
    epsg:'EPSG:4326',
    proj:'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs',
    resolutions:[
      0.14,
      0.703125,
      0.3515625,
      0.17578125,
      0.087890625,
      0.0439453125,
      0.02197265625,
      0.010986328125,
      0.0054931640625,
      0.00274658203125,
      0.001373291015625,
      6.866455078125E-4,
      3.4332275390625E-4,
      1.71661376953125E-4,
      8.58306884765625E-5,
      4.291534423828125E-5,
      2.1457672119140625E-5,
      1.0728836059570312E-5,
      5.364418029785156E-6,
      2.682209014892578E-6,
      1.341104507446289E-6
    ],
    origin:[-180,90]
  }
};

/**
 * 高德地图配置
 */
window.gaodeConfig = {
  mapUrl:window.mapDataUrl+"/gaode_sl/{z}/{x}/{y}.png",
  centerPoint:[24.522422570142833,118.11471659369913],
  maxZoom:20,
  minZoom:8,
  coordinateType:"GCJ02",//取值范围[WGS84,GCJ02,BD09]
  coordinateUnit:"METER",
  closePopupOnClick:false,
  level:12,
  zoomControl:false
};
/**
 * 谷歌地图配置
 */
window.googleConfig = {
  mapUrl:window.mapDataUrl+"/google_sl/{z}/{x}/{y}.png",
  centerPoint:[24.522422570142833,118.11471659369913],
  maxZoom:20,
  minZoom:8,
  coordinateType:"GCJ02",//取值范围[WGS84,GCJ02,BD09]
  coordinateUnit:"METER",
  closePopupOnClick:false,
  level:12,
  zoomControl:false
};

/**
 * openstreetMap地图配置
 */
window.openStreetMapConfig = {
  mapUrl:"https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
  centerPoint:[24.522422570142833,118.11471659369913],
  maxZoom:20,
  minZoom:8,
  coordinateType:"GCJ02",//取值范围[WGS84,GCJ02,BD09]
  coordinateUnit:"METER",
  closePopupOnClick:false,
  level:12,
  zoomControl:false
};

/**
 * 腾讯地图配置
 */
window.TengXunConfig = {
  mapUrl:"http://rt0.map.gtimg.com/realtimerender?z={z}&x={x}&y={y}&type=vector&style=0",
  centerPoint:[24.522422570142833,118.11471659369913],
  maxZoom:20,
  minZoom:0,
  coordinateType:"GCJ02",//取值范围[WGS84,GCJ02,BD09]
  coordinateUnit:"METER",
  closePopupOnClick:false,
  level:12,
  zoomControl:false,
  tms:true
};
/**
 * 腾讯地图配置
 */
window.tengXunYXConfig = {
  mapUrl:"https://p3.map.gtimg.com/sateTiles/{z}/{x16}/{y16}/{x}_{y}.jpg?version=231",
  centerPoint:[24.522422570142833,118.11471659369913],
  maxZoom:20,
  minZoom:8,
  coordinateType:"GCJ02",//取值范围[WGS84,GCJ02,BD09]
  coordinateUnit:"METER",
  closePopupOnClick:false,
  level:11,
  zoomControl:false,
  tms:true,
  tengxunFlag:true
};

/**
 * 百度地图配置
 */
window.baiduConfig = {
  mapUrl:"https://maponline0.bdimg.com/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&scaler=1&udt=20210730&from=jsapi2_0",
  centerPoint:[24.522422570142833,118.11471659369913],
  maxZoom:20,
  minZoom:8,
  coordinateType:"BD09",//取值范围[WGS84,GCJ02,BD09]
  coordinateUnit:"METER",
  closePopupOnClick:false,
  level:13,
  zoomControl:false,
  tms:true,
  crs:{
    epsg:'EPSG:900913',
    proj:'+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
    resolutions:[
      262144,
      131072,
      65536,
      32768,
      16384,
      8192,
      4096,
      2048,
      1024,
      512,
      256,
      128,
      64,
      32,
      16,
      8,
      4,
      2,
      1,
      0.5
    ],
    origin:[0,0],
    bounds:[[20037508.342789244, 0], [0, 20037508.342789244]]
  }
};

/**
 * 安微瑞信
 */
window.ruixinMapConfig = {
  //瓦片服务地址
  mapUrl:window.mapDataUrl+"/shanxi_sl/{z}/{x}/{y}.png",
  //中心点
  centerPoint:[34.26748046875,108.96240234375],
  //最大级别
  maxZoom:20,
  //最小级别
  minZoom:1,
  //坐标系类型
  coordinateType:"WGS84",//取值范围[WGS84,GCJ02,BD09]
  //坐标系单位
  coordinateUnit:"DEGREE",
  //点击地图是否关闭气泡框
  closePopupOnClick:false,
  //级别
  level:12,
  //缩放控件
  zoomControl:false,
  crs:{
    epsg:'EPSG:4326',
    proj:'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs',
    resolutions:[
      0.14,
      0.703125,
      0.3515625,
      0.17578125,
      0.087890625,
      0.0439453125,
      0.02197265625,
      0.010986328125,
      0.0054931640625,
      0.00274658203125,
      0.001373291015625,
      6.866455078125E-4,
      3.4332275390625E-4,
      1.71661376953125E-4,
      8.58306884765625E-5,
      4.291534423828125E-5,
      2.1457672119140625E-5,
      1.0728836059570312E-5,
      5.364418029785156E-6,
      2.682209014892578E-6,
      1.341104507446289E-6
    ],
    origin:[-180,90]
  }
};



//四维图新
window.minemapConfig = {
  // domainUrl : 'http://ppmap.minedata.cn',
  // dataDomainUrl : 'http://ppmap.minedata.cn',
  // spriteUrl : 'http://ppmap.minedata.cn/minemapapi/v1.3/sprite/sprite',
  // fontsUrl : 'http://ppmap.minedata.cn/minemapapi/v1.3/fonts',
  // serviceUrl : 'http://ppmap.minedata.cn/service',

  domainUrl : 'http://minedata.cn',
  dataDomainUrl : 'http://datahive.minedata.cn',
  spriteUrl : 'http://minedata.cn/minemapapi/v2.0.0/sprite/sprite',
  fontsUrl : 'http://minedata.cn/minemapapi/v1.3/fonts',
  serviceUrl : 'http://minedata.cn/service/',

  accessToken : '25cc55a69ea7422182d00d6b7c0ffa93',
  solution : 2365,
  //mapStyle : 'http://ppmap.minedata.cn/service/solu/style/id/2365',
  mapStyle : 'http://minedata.cn/service/solu/style/id/2365',
  center: [118.11471659369913,24.522422570142833],
  zoom: 11,
  pitch: 0,
  maxZoom:19,
  minZoom:1,
  openPopup:1,
};


/**
 * ArcGis
 */
window.arcgisConfig = {
  //瓦片服务地址
  mapUrl:window.mapDataUrl+"/myarcgis/{z}/{x}/{y}.png",
  //中心点
  centerPoint:[24.459659457206726,118.08049947023392],
  //最大级别
  maxZoom:10,
  //最小级别
  minZoom:1,
  //坐标系类型
  coordinateType:"WGS84",//取值范围[WGS84,GCJ02,BD09]
  //坐标系单位
  coordinateUnit:"DEGREE",
  //点击地图是否关闭气泡框
  closePopupOnClick:false,
  //级别
  level:10,
  //缩放控件
  zoomControl:false,
  crs:{
    epsg:'EPSG:4326',
    proj:'+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs',
    resolutions:[
      0.7039144156840442,
      0.3519572078420221,
      0.17597860392101106,
      0.08798930196050553,
      0.043994650980252764,
      0.021997325490126382,
      0.010998662745063191,
      0.0054993313725315955,
      0.0027496656862657978,
      0.0013748328431328989,
      6.874164215664494E-4
    ],
    origin:[-180,90]
  }
};

/**
 * gis配置(该配置必须在所配置的地图信息的参数值后面)
 * @type {{serverUrl: string, poiSuggestConfig: *[]}}
 */

window.gisConfig = {
  //gis后端访问地址
  serverUrl : window.gisServerUrl,
  //poi查询组件配置
  layerConfig : [
    //checked:是否默认选中
    //type:图层类型
    //name:图层名称
    //iconUrl：图层类型的图标图片的url绝对路径
    //iconAnchor：图层偏移值
    //width，height:图标宽，高（建议32*32,42*42）
    {type: "101005", checked:true,name: "网吧", iconUrl: window.deploymentPath+"/static/map/example/images/waba.png", iconAnchor:[21, 42],width:42,height:42},
    {type: "101007",checked:true, name: "旅业", iconUrl: window.deploymentPath+"/static/map/example/images/hotel.png", iconAnchor:[21, 42],width:42,height:42},
    {type: "102012", checked:false,name: "汽车站", iconUrl: window.deploymentPath+"/static/map/example/images/green.png", iconAnchor:[21, 42],width:42,height:42},
    {type: "201001",checked:false, name: "卡口", iconUrl: window.deploymentPath+"/static/map/example/images/green.png", iconAnchor:[21, 42],width:42,height:42},
    {type: "poi",checked:false, name: "POI热点", iconUrl: window.deploymentPath+"/static/map/example/images/green.png", iconAnchor:[21, 42],width:42,height:42}
  ],
  //choose地图选择组件配置
  chooseMapConfig:[
    {"title":"天地图矢量","config":window.tiandituMapConfig,"img":window.deploymentPath+"/static/img/tianditu.png"},

    {"title":"腾讯影像","config":window.tengXunYXConfig,"img":window.deploymentPath+"/static/img/tengxunyxinvert.png"},
    {"title":"高德矢量","config":window.gaodeConfig,"img":window.deploymentPath+"/static/img/gaode.png"},
    {"title":"谷歌矢量","config":window.googleConfig,"img":window.deploymentPath+"/static/img/gaode.png"},
    {"title":"Arcgis","config":window.arcgisConfig,"img":window.deploymentPath+"/static/img/arcgis.png"},
  ]
};



//window.defaultMapConfig=window.openStreetMapConfig;
window.defaultMapConfig=window.fangzhengMapConfig;
