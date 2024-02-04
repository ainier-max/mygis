<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button @click='addZoomControlTest();' style='z-index:1000;position:absolute;top:50px;left:60px' type="primary">
      添加缩放控件
    </el-button>
    <el-button @click='removeZoomControlTest();' style='z-index:1000;position:absolute;top:100px;left:50px'
               type="primary">删除缩放控件
    </el-button>
    <el-button @click='addPanControlTest();' style='z-index:1000;position:absolute;top:150px;left:50px' type="primary">
      添加平移控件
    </el-button>
    <el-button @click='removePanControlTest();' style='z-index:1000;position:absolute;top:200px;left:50px'
               type="primary">删除平移控件
    </el-button>
    <el-button type="primary" @click='addScaleControlTest()' style='z-index:1000;position:absolute;top:250px;left:50px'>
      添加比例尺控件
    </el-button>
    <el-button type="primary" @click='removeScaleControlTest()'
               style='z-index:1000;position:absolute;top:300px;left:50px'>删除比例尺控件
    </el-button>
  </div>
</template>
<script>
    window.zoomControl = null;
    window.panControl = null;
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
            addZoomControlTest() {
                this.removeZoomControlTest();
                //'topleft', 'topright', 'bottomleft' or 'bottomright'
                window.zoomControl = this.$refs.map.addZoomControl("bottomright");
                console.log(window.zoomControl);
            },
            addPanControlTest() {
                this.removePanControlTest();
                window.panControl = this.$refs.map.addPanControl("bottomright");
                console.log(window.panControl);
            },
            removeZoomControlTest() {
                if (window.zoomControl != null) {
                    this.$refs.map.removeZoomControl(window.zoomControl);
                    window.zoomControl = null;
                }
            },
            removePanControlTest() {
                if (window.panControl != null) {
                    this.$refs.map.removeZoomControl(window.panControl);
                    window.panControl = null;
                }
            },
            addScaleControlTest(){
                window.scaleControl = this.$refs.map.addScaleControl("bottomleft");
            },
            removeScaleControlTest() {
                if (window.scaleControl != null) {
                    this.$refs.map.removeScaleControl(window.scaleControl);
                    window.scaleControl = null;
                }
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
