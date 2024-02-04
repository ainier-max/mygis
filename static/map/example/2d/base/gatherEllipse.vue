<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config"
                   style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='gather' style='z-index:1000;position:absolute;top:50px;left:50px'>采集椭圆
    </el-button>

    <div style="position:absolute;left:50px;top:100px;z-index:9999;font-size:22px;color:blue;font-weight:bold">
      椭圆率（长轴/短轴）:<input type="text" id="tyl" style="width:50px" value="2">
    </div>
  </div>
</template>
<script>
export default {
  name: "demo",
  props: {},
  data() {
    return {
      id: "map",
      type: "vue",
      config: window.defaultMapConfig,

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
    gather() {
      this.map=this.$refs.map.map;
      this.gatherPosition = [];
      this.ellipseLayer = null;
      this.floatingPoint = null;
      this.map.on("click", this.clickBack, "plot");
      this.map.on("mousemove", this.mousemoveBack, "plot");
    },
    clickBack(e) {
      var gatherPointTemp = [e.latlng.lat, e.latlng.lng];
      //console.log("gatherPointTemp",gatherPointTemp);
      var num = this.gatherPosition.length;
      if (num == 0) {
        this.gatherPosition.push(gatherPointTemp);
        this.floatingPoint = this.createPoint(gatherPointTemp, -1);
      }
      this.gatherPosition.push(gatherPointTemp);
      var oid = this.gatherPosition.length - 2;
      this.createPoint(gatherPointTemp, oid);
      if (num > 1) {
        this.gatherPosition.pop();
        this.map.removeLayer(this.floatingPoint);
        this.map.off("click", this.clickBack, "plot");
        this.map.off("mousemove", this.mousemoveBack, "plot");
        //删除关键点
        this.clearKeyPoint();
        console.log("椭圆的采集关键点数据：", this.gatherPosition);
        console.log("椭圆率：", document.getElementById("tyl").value);
      }
    },
    mousemoveBack(e) {
      if (this.floatingPoint == null) {
        return;
      }
      this.floatingPoint.setLatLng([e.latlng.lat, e.latlng.lng]);
      this.gatherPosition.pop();
      this.gatherPosition.push([e.latlng.lat, e.latlng.lng]);
      this.showRegionToMap();
    },
    showRegionToMap() {
      //console.log("gatherPosition:",gatherPosition);
      var distance = this.map.distance(this.gatherPosition[0], this.gatherPosition[1]);
      //console.log("长轴距离", distance);
      var startPoint = {};
      startPoint.latitude = this.gatherPosition[0][0];
      startPoint.longitude = this.gatherPosition[0][1];
      var endPoint = {};
      endPoint.latitude = this.gatherPosition[1][0];
      endPoint.longitude = this.gatherPosition[1][1];
      var radians = this.bearing(startPoint, endPoint);
      //console.log("两点的角度", radians);
      var tyl = document.getElementById("tyl").value;
      if (tyl == null) {
        alert("未设置椭圆率");
        return;
      }
      if (this.ellipseLayer == null) {
        this.ellipseLayer = L.ellipse(this.gatherPosition[0], [distance, distance / tyl], radians + 90).addTo(this.map);
      } else {
        this.map.removeLayer(this.ellipseLayer);
        this.ellipseLayer = null;
        //console.log("gatherPositiongggg",gatherPosition);
        this.ellipseLayer = L.ellipse(this.gatherPosition[0], [distance, distance / tyl], radians + 90).addTo(this.map);
      }
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
