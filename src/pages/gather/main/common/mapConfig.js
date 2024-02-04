export var mapConfig={
    //mapUrl:"https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
    //mapUrl:"https://tile-b.openstreetmap.fr/hot/{z}/{x}/{y}.png",

      mapUrl:"http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
      centerPoint:[24.492422570142833,118.12471659369913],
      maxZoom:20,
      minZoom:1,
      coordinateType:"GCJ02",//取值范围[WGS84,GCJ02,BD09]
      coordinateUnit:"METER",
      closePopupOnClick:false,
      level:13,
      zoomControl:false
  }

