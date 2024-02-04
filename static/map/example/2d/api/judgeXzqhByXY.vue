<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <!-- api组件 -->
    <api-component ref="api" :id="apiid" :axios="axios"></api-component>
    <el-button type="primary" @click='addXzqhTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>
      先画出行政区划
    </el-button>
    <el-button type="primary" @click='drawMarkerTest();' style='z-index:1000;position:absolute;top:100px;left:50px'>
      然后放置点
    </el-button>
    <el-input type="textarea" :rows="1"
              id="relation" placeholder="判断点与行政区划的关系"
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
                var param = {};
                param.lat = markerObj.xy.lat;
                param.lng = markerObj.xy.lng;
                param.regioncode = "350203";
                this.$refs.api.judgeRegionByXY(param, this.judgeXzqhByXYCallBack);
            },
            judgeXzqhByXYCallBack(resp) {
                console.log("行政区划与点关系判断结果", resp);
                document.getElementById("relation").value = "点与辖区关系:" + resp.data.flag;
            },
            addXzqhTest() {
                var param = {};
                param.regioncode = "350203";//思明
                //param.regioncode="350206";//湖里
                this.$refs.api.getRegionInfo(param, this.addXzqhCallBack);
            },
            addXzqhCallBack(resp) {
                console.log("行政区划查询结果", resp);
                var zbc = resp.data[0].objects[0].zbc;
                //console.log("wkt格式坐标串：",zbc);
                //获得坐标串是wkt格式，需要进行转换Geojson
                var param = {};
                param.zbc = zbc;
                this.$refs.api.wktToGeojson(param, this.wktToGeojsonBack);
            },
            wktToGeojsonBack(resp) {
                //console.log("geojson格式坐标串：",resp);
                //Geojson大数据格式上图
                var zxqhlayer = this.$refs.map.addPolygonByGeojson(resp.data.geojson);
                window.mapBound = this.$refs.map.getLayerBound(zxqhlayer);
                //边框居中
                console.log("边框:", window.mapBound);
                this.$refs.map.setCenterByBound(window.mapBound);
            }

        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
