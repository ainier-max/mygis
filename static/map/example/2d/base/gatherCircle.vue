<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='drawCircleTest();' style='z-index:1000;position:absolute;top:50px;left:50px'>采集圆
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
            drawCircleTest() {
                this.$refs.map.drawCircle(this.circleReceiver);
            },
            circleReceiver(circleObj) {
                console.log("上图的对象", circleObj);
                console.log("圆中心：", circleObj.centerPoint);
                console.log("圆半径：", circleObj.radius);
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
