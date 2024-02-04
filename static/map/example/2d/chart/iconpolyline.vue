<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addIconPolylineTest();' style='z-index:1000;position:absolute;top:50px;left:50px'>
      图标线
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
            addIconPolylineTest() {
                this.$refs.map.setView([24.3511962890625, 118.97644042968749], 8);

                var polylineJson = {};
                polylineJson.xys = [
                    [25.9552001953125, 119.520263671875],
                    [24.9005126953125, 118.57543945312501]
                ];
                //线的样式
                polylineJson.option = {};
                //线的宽度
                polylineJson.option.weight = "5";
                var polyline = this.$refs.map.addPolyline(polylineJson);
                //给线加图标
                var iconJson = {};
                iconJson.option = {};
                iconJson.option.iconUrl = "../../static/map/example/images/plane.png";
                iconJson.option.iconAnchor = [20, 40]
                var markerIcon = this.$refs.map.createIcon(iconJson);
                polyline.icon = markerIcon;
                //给线加图标
                this.$refs.map.addIconPolyline(polyline);


                var polylineJson1 = {};
                polylineJson1.xys = [
                    [24.9005126953125, 118.57543945312501],
                    [24.72747802734375, 118.1414794921875],
                    [24.572296142578125, 118.08929443359376],
                    [24.42707061767578, 118.13083648681642]
                ];
                //线的样式
                polylineJson1.option = {};
                //线的宽度
                polylineJson1.option.weight = "5";
                var polyline1 = this.$refs.map.addPolyline(polylineJson1);
                //给线加图标
                var iconJson1 = {};
                iconJson1.option = {};
                iconJson1.option.iconUrl = "../../static/map/example/images/car.png";
                iconJson1.option.iconAnchor = [20, 40]
                var markerIcon1 = this.$refs.map.createIcon(iconJson1);
                polyline1.icon = markerIcon1;
                //给线加图标
                this.$refs.map.addIconPolyline(polyline1);


                var polylineJson2 = {};
                polylineJson2.xys = [
                    [24.42707061767578, 118.13083648681642],
                    [23.4283447265625, 120.10253906250001]
                ];
                //线的样式
                polylineJson2.option = {};
                //线的宽度
                polylineJson2.option.weight = "5";
                var polyline2 = this.$refs.map.addPolyline(polylineJson2);
                //给线加图标
                var iconJson2 = {};
                iconJson2.option = {};
                iconJson2.option.iconUrl = "../../static/map/example/images/ship.png";
                iconJson2.option.iconAnchor = [20, 40]
                var markerIcon2 = this.$refs.map.createIcon(iconJson2);
                polyline2.icon = markerIcon2;
                //给线加图标
                this.$refs.map.addIconPolyline(polyline2);
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
