<template>
  <!--class="mapClass"-->
  <div :id="id" ref="mapComponent">

  </div>
  <!-- export default { -->
</template>

<script>
module.exports = {
  name: "CesiumMapComponent",
  props: {
    id: {type: String, default: ''},
    type: {type: String, default: ''},
    config: {type: Object, default: () => ({})},
    initPosition: {type: Object, default: () => ({})},
    loadEnd: {type: String},
    loadBefore: {type: String},
  },
  data: function () {
    return {
      viewer: null,//地图对象
      flyToEntity:null,//定位对象
      loadCesiumFlag:0,
    }
  },
  methods: {
    loadBeforeFun(){
      //地图加载之前的调用
      console.log("this.type",this.type);
      if (typeof (this.loadBefore) != "undefined") {
        if (this.type == "js") {
          window[this.loadBefore]();
        } else {
          this.$parent[this.loadBefore]();
        }
      }
    },
    loadEndFun(){
      //地图加载结束的调用
      if (typeof (this.loadEnd) != "undefined") {
        if (this.type == "js") {
          window[this.loadEnd]();
        } else {
          this.$parent[this.loadEnd]();
        }
      }
    },
    loadMap() {
      if (typeof (window.Cesium) != "undefined" && this.id != "" && typeof (document.getElementById(this.id)) != "undefined") {
        console.log("地图id值", this.id);
        console.log("Cesium版本号：", Cesium.VERSION);
        var mapJson = this.config;
        mapJson.id = this.id;
        mapJson.useType = this.type;
        this.initMap(mapJson);
      } else {
        if(this.loadCesiumFlag<5){
          console.log("window.Cesium", window.Cesium);
          console.log("地图元素：", document.getElementById(this.id));
          this.loadCesiumFlag=this.loadCesiumFlag+1;
          window.setTimeout(this.loadMap, 500);
        }else{
          console.log("Cesium未正常加载");
        }


      }
    },
    initMap(mapJson) {
      //地图加载之前的调用
      this.loadBeforeFun();
      console.log("配置信息", mapJson);
      var imgProvider = null;
      if (mapJson.type == "UrlTemplateImageryProvider") {
        imgProvider = new Cesium.UrlTemplateImageryProvider(mapJson.mapOption);
      } else if (mapJson.type == "BaiduImageryProvider") {
        imgProvider = new BaiduImageryProvider(mapJson.mapOption);
      }
      mapJson.viewerOption.imageryProvider = imgProvider;
      this.viewer = new Cesium.Viewer(mapJson.id, mapJson.viewerOption);

      //如果有其他地图配置，则进行添加。如天地图的标记服务
      if(typeof (mapJson.otherMapOption)!="undefined" && mapJson.otherMapOption.length>0){
        for(var i=0;i<mapJson.otherMapOption.length;i++){
          var imgProviderTemp = new Cesium.UrlTemplateImageryProvider(mapJson.otherMapOption[i]);
          this.viewer.imageryLayers.addImageryProvider(imgProviderTemp);
        }
      }

      //去除版权信息
      this.viewer._cesiumWidget._creditContainer.style.display = "none";
      this.viewer.camera.setView({
        // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
        // fromDegrees()方法，将经纬度和高程转换为世界坐标
        destination: Cesium.Cartesian3.fromDegrees(mapJson.centerPoint[0], mapJson.centerPoint[1], mapJson.height),
        orientation: {
          // 指向
          heading: Cesium.Math.toRadians(0, 0),
          // 视角
          pitch: Cesium.Math.toRadians(mapJson.pitch),
          roll: 0.0
        }
      });
      // 同理，想要标记某个位置和角度，下次直接进入，可以在选好的角度上按F12进入开发者工具
      // 输入viewer.camera.heading  viewer.camera.pitch  viewer.camera.position回车可以得到信息
      //地图加载完成
      this.loadEndFun();
    },
    viewerFlyToLonLat(obj) {
      console.log("飞行参数112：", obj.lng, obj.lat, obj.eyeHeight);
      let cartographics = [Cesium.Cartographic.fromDegrees(obj.lng, obj.lat)];
      cartographics.obj = obj;
      Cesium.sampleTerrain(this.viewer.scene.terrainProvider, 14, cartographics)
        .then((updatedPositions) => {
          var flyToHeight=updatedPositions[0].height;
          if(typeof(flyToHeight)=="undefined"){
            updatedPositions.obj.height = 0;
          }else{
            updatedPositions.obj.height = flyToHeight;
          }
          console.log("地形高度：", updatedPositions.obj.height);
          if (this.flyToEntity) {
            this.viewer.entities.remove(flyToEntity);
          }
          this.flyToEntity = new Cesium.Entity({
            id: 'flyTmp',
            position: Cesium.Cartesian3.fromDegrees(updatedPositions.obj.lng, updatedPositions.obj.lat, updatedPositions.obj.height),
            point: {
              pixelSize: 0,//控制居中的时候是否展示中心点
              color: Cesium.Color.RED.withAlpha(0),
              outlineColor: Cesium.Color.WHITE.withAlpha(0),
              outlineWidth: 0
            }
          });
          console.log("updatedPositions",updatedPositions);
          this.viewer.entities.add(this.flyToEntity);
          var flyPromise = this.viewer.flyTo(this.flyToEntity, {
            duration: updatedPositions.obj.time,//飞行时间,单位：秒
            offset: {
              heading: Cesium.Math.toRadians(updatedPositions.obj.heading),//旋转角度
              pitch: Cesium.Math.toRadians(updatedPositions.obj.pitch),//倾斜角度
              range: updatedPositions.obj.eyeHeight//视角高度
            }
          });
          // 飞行完后
          flyPromise.then(function (flyPromise) {
            console.log("飞行结束");
          }).otherwise(function (error) {
            console.log(error);
          });
        });
    }
  },
  mounted() {
    var date1 = new Date();
    var date2 = new Date("2122/04/23 23:59:59");
    if (date1.getTime() > date2.getTime()) {
      alert("地图在2122/04/23 23:59:59使用已到期！请联系管理人员");
    } else {
      this.loadMap();
    }
  }
}
</script>

<style>

</style>
