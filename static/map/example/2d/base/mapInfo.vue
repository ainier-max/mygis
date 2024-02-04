<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='getMapCenterTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>
      获取地图中心点
    </el-button>
    <el-button type="primary" @click='getMapZoomTest();' style='z-index:1000;position:absolute;top:100px;left:50px'>
      获取地图级别
    </el-button>
    <el-button type="primary" @click='getMapBoundTest();' style='z-index:1000;position:absolute;top:150px;left:50px'>
      获取地图边框
    </el-button>
    <el-input type="textarea" id="zbz" placeholder="提示信息" :rows="5"
              style='z-index:1000;position:absolute;top:200px;left:60px;width: 350px'></el-input>
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
                config: window.defaultMapConfig
            }
        },
        components: {
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
        },
        methods: {
            getMapCenterTest() {
                var center = this.$refs.map.getMapCenter();
                console.log("地图中心点:", center.lat + "," + center.lng);
                document.getElementById("zbz").value = "地图中心点:\n" + center.lat + "," + center.lng;
            },
            getMapZoomTest() {
                var zoom = this.$refs.map.getMapZoom();
                console.log("地图级别:", zoom);
                document.getElementById("zbz").value = "地图级别:\n" + zoom;
            },
            getMapBoundTest() {
                var mapBound = this.$refs.map.getMapBound();
                console.log("地图边框:", mapBound);
                var content = "";
                content = content + "地图边框东:" + mapBound.east + "\n";
                content = content + "地图边框西:" + mapBound.west + "\n";
                content = content + "地图边框南:" + mapBound.south + "\n";
                content = content + "地图边框北:" + mapBound.north + "\n";
                document.getElementById("zbz").value = content;
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
