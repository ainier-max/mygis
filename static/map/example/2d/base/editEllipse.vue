<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" :load-end="loadEndFun"
                   style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addState();' style='z-index:1000;position:absolute;top:50px;left:60px'>
      椭圆叠加地图
    </el-button>
    <el-button type="primary" @click='editState();'
               style='z-index:1000;position:absolute;top:100px;left:50px'>椭圆进入编辑
    </el-button>
    <el-button type="primary" @click='endState();' style='z-index:1000;position:absolute;top:150px;left:50px'>
      椭圆结束编辑
    </el-button>
    <el-input type="text" v-model="tyl" placeholder="椭圆率"
              style='z-index:1000;position:absolute;top:200px;left:60px;width: 80px'></el-input>


  </div>
</template>
<script>
window.editCircle = null;
export default {
  name: "demo",
  props: {},
  data() {
    return {
      id: "map",
      type: "vue",
      config: window.defaultMapConfig,
      //地图加载完成回调方法
      loadEndFun:"vueloadEnd",

      tyl: 2,
      gatherPosition:null,
      gatherIcon:null,
      floatingPoint:null,
      ellipseLayer:null,
      map:null,
    }
  },
  components: {
    'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
  },
  methods: {
    vueloadEnd(){
      this.map=this.$refs.map.map;
      this.gatherPosition = [];
      this.ellipseLayer = null;
      this.floatingPoint = null;
    },
    addState(){
      this.gatherPosition=[[24.50120768247909, 118.11504364013673],[24.491522679825767, 118.18096160888673]]
      var longDic=this.map.distance(this.gatherPosition[0],this.gatherPosition[1]);
      console.log("长轴距离：",longDic);
      var startPoint={};
      startPoint.latitude=this.gatherPosition[0][0];
      startPoint.longitude=this.gatherPosition[0][1];
      var endPoint={};
      endPoint.latitude=this.gatherPosition[1][0];
      endPoint.longitude=this.gatherPosition[1][1];
      var radians=this.bearing(startPoint,endPoint);
      console.log("两点的角度",radians);
      this.ellipseLayer = L.ellipse(this.gatherPosition[0], [longDic, longDic/this.tyl], radians+90).addTo(this.map);
    },
    editState(){
      for (var i = 0; i < this.gatherPosition.length; i++) {
        var markerTemp=this.createPoint(this.gatherPosition[i], i);
        markerTemp.on('drag', this.drawCallBack,"plot");
        markerTemp.dragging.enable();
      }
    },
    drawCallBack(e){
      this.gatherPosition[e.target.oid]=[e.latlng.lat,e.latlng.lng];
      this.showRegionToMap();
    },
    showRegionToMap(){
      //console.log("gatherPosition:",gatherPosition);
      var longDic=this.map.distance(this.gatherPosition[0],this.gatherPosition[1]);
      console.log("长轴距离：",longDic);
      var startPoint={};
      startPoint.latitude=this.gatherPosition[0][0];
      startPoint.longitude=this.gatherPosition[0][1];
      var endPoint={};
      endPoint.latitude=this.gatherPosition[1][0];
      endPoint.longitude=this.gatherPosition[1][1];
      var radians=this.bearing(startPoint,endPoint);
      console.log("两点的角度",radians);
      if(this.ellipseLayer==null){
        this.ellipseLayer = L.ellipse(this.gatherPosition[0], [longDic, longDic/this.tyl], radians+90).addTo(this.map);
      }else{
        this.map.removeLayer(this.ellipseLayer);
        this.ellipseLayer=null;
        this.ellipseLayer = L.ellipse(this.gatherPosition[0], [longDic, longDic/this.tyl], radians+90).addTo(this.map);
      }
    },

    endState(){
      this.clearKeyPoint();
      console.log("采集关键点数据：",this.gatherPosition);
    },
    createPoint(latlng, oid) {
      var markerTemp = L.marker(latlng, {icon: this.gatherIcon, opacity: 0.9}).addTo(this.map);
      markerTemp.oid = oid;
      markerTemp.flag = "keypoint";
      return markerTemp;
    },
    clearKeyPoint() {
      var the=this;
      this.map.eachLayer(function (layer) {
        //删除layerType不是map值的图层
        if (layer.flag == "keypoint") {
          the.map.removeLayer(layer);
        }
      });
    },
    bearing(start, end) {
      let rad = Math.PI / 180,
        lat1 = start.latitude * rad,
        lat2 = end.latitude * rad,
        lon1 = start.longitude * rad,
        lon2 = end.longitude * rad;
      const a = Math.sin(lon2 - lon1) * Math.cos(lat2);
      const b = Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
      return this.radiansToDegrees(Math.atan2(a, b));
    },
    radiansToDegrees(radians) {
      const degrees = radians % (2 * Math.PI);
      return degrees * 180 / Math.PI;
    }



  },
  mounted: function () {
    this.gatherIcon = L.icon({
      iconUrl: '../static/map/example/images/gatherPoint.png',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

  },
}
</script>

<style>

</style>
