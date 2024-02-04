<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='drawRectTest();' style='z-index:1000;position:absolute;top:50px;left:50px'>采集矩形
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
            drawRectTest() {
                this.$refs.map.drawRect(this.rectReceiver);
            },
            rectReceiver(rectObj) {
                console.log("上图的对象", rectObj);
                console.log("获取的坐标：", rectObj.zbc);
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
