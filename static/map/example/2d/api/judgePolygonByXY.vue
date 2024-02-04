<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <!-- api组件 -->
    <api-component ref="api" :id="apiid" :axios="axios"></api-component>
    <el-button type="primary" @click='addPolygonTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>
      先画出多边形
    </el-button>
    <el-button type="primary" @click='drawMarkerTest();' style='z-index:1000;position:absolute;top:100px;left:50px'>
      然后放置点
    </el-button>
    <el-input type="textarea" :rows="1"
              id="relation" placeholder="判断点与多边形的关系"
              style='z-index:1000;position:absolute;top:150px;left:60px;width: 200px'></el-input>
  </div>
</template>
<script>
    window.testMarker = null;
    export default {
        name: "demo",
        props: {},
        data() {
            return {
                id: "map",
                apiid: "api",
                type: "vue",
                config: window.defaultMapConfig,
                axios: window.axios,
            }
        },
        components: {
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
            'api-component': httpVueLoader('../../static/map/vue-map-component/tools/api-component.vue', 'frontEnd')
        },
        methods: {
            drawMarkerTest() {
                if (window.testMarker != null) {
                    this.$refs.map.removeLayer(window.testMarker);
                    removeMarker = null;
                }
                //采集点图标
                var markerJSON = {};
                //绝对路径
                markerJSON.iconUrl = "../../static/map/example/images/green.png";
                //图片偏移（坐标固定在图标的哪个点，[0,0]表示图标的左上角）
                markerJSON.iconAnchor = [16, 16];
                //图片大小
                markerJSON.width = 32;
                markerJSON.height = 32;
                var dragFlag = false;//是否可移动,仅适用于leaflet开发技术，minemap不生效
                this.$refs.map.drawMarker(markerJSON, dragFlag, this.markerReceiver);
            },
            markerReceiver(markerObj) {
                window.testMarker = markerObj;
                console.log("上图的对象", markerObj);
                console.log("采集坐标：", markerObj.xy);
                var lat = markerObj.xy.lat;
                var lng = markerObj.xy.lng;
                var judgeFlag = this.$refs.api.judgePolygonByXY(lat, lng, window.polygon);
                document.getElementById("relation").value = "点与多边形关系:" + judgeFlag;
            },
            addPolygonTest() {
                var polygonJSON = {};
                polygonJSON.xys = [[
                    [24.523887634277347, 118.14130783081056],
                    [24.49127197265625, 118.14302444458008],
                    [24.494361877441406, 118.16774368286133],
                    [24.517192840576172, 118.16619873046874],
                    [24.523887634277347, 118.14130783081056],
                ]];
                //面的样式
                polygonJSON.option = {};
                //边界线大小(四维图形接口宽度不生效)
                polygonJSON.option.weight = 5;
                //边界线颜色
                polygonJSON.option.color = "#ff0000";
                //填充颜色
                polygonJSON.option.fillColor = "#f18";
                //透明度
                polygonJSON.option.fillOpacity = 0.8;
                window.polygon = this.$refs.map.addPolygon(polygonJSON);
                console.log("polygon", window.polygon);
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
