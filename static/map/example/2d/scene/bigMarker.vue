<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addBigMarker()' style='z-index:1000;position:absolute;top:50px;left:60px'>
      警情分布（行政区划聚合）
    </el-button>
  </div>
</template>
<script>
    var level1 = window.level1;
    var level2 = window.level2;
    var level3 = window.level3;
    //模拟点数据
    var points = new Array();
    for (var i = 0; i < 2000; i++) {
        var zby = 24.44 + Math.random() * 0.10;
        var zbx = 118.08 + Math.random() * 0.10;
        points.push([zby, zbx]);
    }

    var allLayers = [];

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
          'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
        },
        methods: {
            addBigMarker() {
                //获取当前级别
                var zoom = this.$refs.map.getMapZoom();
                console.log("地图级别:", zoom);
                if (zoom > 0 && zoom <= 7) {
                    this.addClusters(level1);
                }
                if (zoom >= 8 && zoom <= 10) {
                    this.addClusters(level2);
                }
                if (zoom >= 11 && zoom <= 14) {
                    this.addClusters(level3);
                }
                if (zoom >= 15 && zoom <= 18) {
                    this.addMarkers();
                }
                //监控地图结束移动事件
                this.$refs.map.onMapEvent("zoomend", this.addBigMarker,"zoomend");
                //监控地图移动事件
                this.$refs.map.onMapEvent("moveend", this.addMarkers,"moveend");
            },
            addMarkers() {
                var zoom = this.$refs.map.getMapZoom();
                if (zoom >= 15 && zoom <= 18) {

                } else {
                    return;
                }
                //清空地图
                for (var i = 0; i < allLayers.length; i++) {
                    this.$refs.map.removeLayer(allLayers[i]);
                }
                allLayers = [];

                var mapBound = this.$refs.map.getMapBound();
                var east = mapBound.east;
                var west = mapBound.west;
                var north = mapBound.north;
                var south = mapBound.south;
                for (var i = 0; i < points.length; i++) {
                    if (points[i][0] > south && points[i][0] < north && points[i][1] > west && points[i][1] < east) {
                        var markerJSON = {};
                        markerJSON.xy = points[i];
                        markerJSON.iconUrl = "../../static/map/example/images/poi.png";
                        markerJSON.iconAnchor = [10.5, 8.5];
                        markerJSON.width = 21;
                        markerJSON.height = 17;
                        var markerTemp = this.$refs.map.addMarker(markerJSON);
                        allLayers.push(markerTemp);
                    }
                }
            },
            addClusters(levels) {
                console.log("levels", levels);
                //清空地图
                for (var i = 0; i < allLayers.length; i++) {
                    this.$refs.map.removeLayer(allLayers[i]);
                }
                allLayers = [];
                for (var i = 0; i < levels.length; i++) {
                    var divJson2 = {};
                    divJson2.xy = [levels[i].lat, levels[i].lng];
                    divJson2.option = {};
                    divJson2.option.iconAnchor = [30.5, 19.5];
                    var html = '';
                    html += '<div align="center" title="' + levels[i].mc + '" style="text-align:center;line-height:20px;border:5px solid rgba(253, 156, 115, 0.6);">';
                    html += '<div style="background-color: rgba(241, 128, 23, 0.9);"><span style="font-size: 14px;">' + levels[i].total + '</span></div>';
                    html += '</div>';
                    divJson2.option.html = html;
                    var layerTemp = this.$refs.map.addDiv(divJson2);
                    allLayers.push(layerTemp);
                }
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
