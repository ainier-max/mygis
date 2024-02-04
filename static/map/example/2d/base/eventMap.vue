<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addMapEventTest' style='z-index:1000;position:absolute;top:50px;left:60px'>
      地图绑定事件
    </el-button>
    <el-button type="primary" @click='removeMapEventTest' style='z-index:1000;position:absolute;top:110px;left:50px'>
      移除地图绑定事件
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
                config: window.defaultMapConfig
            }
        },
        components: {
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
        },
        methods: {
            addMapEventTest() {
                this.$refs.map.onMapEvent("click", this.clickEventCallBack,"clickname");
                this.$refs.map.onMapEvent("moveend", this.moveEventCallBack,"moveend");
                this.$refs.map.onMapEvent("zoomend", this.zoomEndEventCallBack,"zoomend");
                this.$refs.map.onMapEvent("zoomend", this.zoomEndEventCallBack2,"zoomend2");
            },
            clickEventCallBack(e) {
                console.log("地图点击回调：", e);
            },
            moveEventCallBack(e) {
                console.log("地图移动回调：", e);
            },
            zoomEndEventCallBack(e) {
                console.log("第一个地图缩放回调：", e);
            },
            zoomEndEventCallBack2(e) {
                console.log("第二个地图缩放回调：", e);
            },
            removeMapEventTest() {
                this.$refs.map.offMapEvent("click", this.clickEventCallBack,"clickname");
                this.$refs.map.offMapEvent("moveend", this.moveEventCallBack,"moveend");
                this.$refs.map.offMapEvent("zoomend", this.zoomEndEventCallBack,"该参数与on不对应就无法删除");
                this.$refs.map.offMapEvent("zoomend", this.zoomEndEventCallBack2,"zoomend2");
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
