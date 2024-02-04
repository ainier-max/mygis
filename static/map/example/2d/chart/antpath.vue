<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addAntPathTest();' style='z-index:1000;position:absolute;top:50px;left:50px'>蚂蚁线
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
            addAntPathTest() {
                var antPathJson = {};
                antPathJson.xys = [
                    [24.445696, 118.081398], [24.449644, 118.08629],
                    [24.453678, 118.100882], [24.45857, 118.105087],
                    [24.462605, 118.106546], [24.464321, 118.111181],
                    [24.466381, 118.119764], [24.471016, 118.124657],
                    [24.478054, 118.125], [24.483891, 118.125515],
                    [24.490242, 118.13015], [24.502258, 118.133583],
                    [24.510326, 118.132381], [24.519939, 118.132725],
                    [24.528694, 118.12191]
                ];
                antPathJson.option = {};
                //线的颜色
                antPathJson.option.color = 'green';
                //块颜色
                antPathJson.option.pulseColor = 'white';
                //线的宽度
                antPathJson.option.weight = '8';
                //块的速度  数值越小，越快
                antPathJson.option.delay = '1000';
                //透明度
                antPathJson.option.opacity = '0.8';
                //间隔  [块的长度，块的间隔]
                antPathJson.option.dashArray = [10, 20];
                //是否暂停
                antPathJson.option.paused = false;
                var antPolyline = this.$refs.map.addAntPath(antPathJson);
                antPolyline.bindPopup("蚂蚁线");
                console.log("蚂蚁线", antPolyline);
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
