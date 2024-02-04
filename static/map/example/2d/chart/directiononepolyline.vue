<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addDirectionPolylineTest();'
               style='z-index:1000;position:absolute;top:50px;left:50px'>箭头线
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
            addDirectionPolylineTest() {
                var polylineJson = {};
                //线的坐标串
                polylineJson.xys = [
                    [24.522171020507812,118.04740905761719],[24.466896057128906,118.07453155517578],[24.50122833251953,118.13667297363283],[24.537620544433594,118.14182281494139],[24.561309814453125,118.09341430664062],[24.605941772460938,118.09204101562501],[24.605941772460938,118.1795883178711],[24.56645965576172,118.18096160888672],[24.57469940185547,118.05049896240236],[24.519081115722656,118.06766510009767],[24.46483612060547,118.11229705810548],[24.49504852294922,118.19091796875],[24.529037475585938,118.10955047607422]
                ];
                //线的样式
                polylineJson.option = {};
                //线的宽度
                polylineJson.option.weight = "3";
                var polyline = this.$refs.map.addPolyline(polylineJson);
                polyline.bindPopup("这是线");
                //给线加箭头
                var iconJson2 = {};
                iconJson2.option = {};
                iconJson2.option.iconUrl = "./static/map/example/images/plane.png";
                iconJson2.option.iconAnchor = [20, 20];
                iconJson2.option.iconSize=[40, 40];
                var markerIcon2 = this.$refs.map.createIcon(iconJson2);
                polyline.icon = markerIcon2;
                var marker = this.$refs.map.addDirectionIcon(polyline);
                console.log("marker:",marker);
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
