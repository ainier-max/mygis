<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <!-- api组件 -->
    <api-component ref="api" :id="apiid" :axios="axios"></api-component>
    <el-button type="primary" @click='addXzqhTest();' style='z-index:1000;position:absolute;top:50px;left:50px'>画行政区划
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
            },
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
