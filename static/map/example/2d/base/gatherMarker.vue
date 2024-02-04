<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='drawMarkerTest();' style='z-index:1000;position:absolute;top:50px;left:50px'>采集点
    </el-button>
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
            }
        },
        components: {
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
        },
        methods: {
            drawMarkerTest() {
                //采集点图标
                var markerJSON = {};
                //绝对路径
                markerJSON.iconUrl = "../../static/map/example/images/poi.png";
                //图片偏移（坐标固定在图标的哪个点，[0,0]表示图标的左上角）
                markerJSON.iconAnchor = [21, 17];
                //图片大小
                markerJSON.width = 42;
                markerJSON.height = 34;

                var dragFlag = true;//是否可移动,仅适用于leaflet开发技术，minemap不生效
                this.$refs.map.drawMarker(markerJSON, dragFlag, this.markerReceiver);
            },
            markerReceiver(markerObj) {
                console.log("上图的对象", markerObj);
                console.log("采集坐标：", markerObj.xy);
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
