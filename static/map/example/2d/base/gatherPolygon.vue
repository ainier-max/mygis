<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='drawPolygonTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>
      采集多边形
    </el-button>
    <el-button type="primary" @click='drawDeleteLastVertexTest();'
               style='z-index:1000;position:absolute;top:100px;left:50px'>删除上一个点
    </el-button>
    <el-button type="primary" @click='cancelDrawTest();' style='z-index:1000;position:absolute;top:150px;left:50px'>
      取消采集
    </el-button>
  </div>
</template>
<script>
    window.panControl = null;
    window.zoomControl = null;
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
            drawPolygonTest() {
                if (window.zoomControl == null) {
                    window.zoomControl = this.$refs.map.addZoomControl("bottomright");
                }
                if (window.panControl == null) {
                    window.panControl = this.$refs.map.addPanControl("bottomright");
                }
                console.log("采集面");
                this.$refs.map.drawPolygon(this.polygonReceiver);
            },
            polygonReceiver(polygonObj) {
                console.log("上图的对象", polygonObj);
                console.log("获取的坐标：", polygonObj.zbc);
            },
            drawDeleteLastVertexTest() {
                this.$refs.map.drawDeleteLastVertex();
            },
            cancelDrawTest() {
                this.$refs.map.clearHooks();
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
