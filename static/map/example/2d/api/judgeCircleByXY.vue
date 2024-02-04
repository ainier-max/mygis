<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <!-- api组件 -->
    <api-component ref="api" :id="apiid" :axios="axios"></api-component>
    <el-button type="primary" @click='addCircleTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>先画出圆
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
                var lat = markerObj.xy.lat;
                var lng = markerObj.xy.lng;
                var judgeFlag = this.$refs.api.judgeCircleByXY(lat, lng, window.circle);
                document.getElementById("relation").value = "点与圆关系:" + judgeFlag;
            },
            addCircleTest() {
                var circleJson = {};
                //圆心
                circleJson.xy = [24.522422570142833, 118.11471659369913];
                circleJson.option = {};
                //圆半径
                circleJson.option.radius = 2000;//单位米
                //边界线颜色
                circleJson.option.color = "#ff0000";
                //填充颜色
                circleJson.option.fillColor = "#f18";
                //透明度
                circleJson.option.fillOpacity = 0.5;
                window.circle = this.$refs.map.addCircle(circleJson);
                console.log("circle1", window.circle);
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
