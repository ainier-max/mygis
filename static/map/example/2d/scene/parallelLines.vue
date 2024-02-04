<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addParallelLinesDashTest' style='z-index:1000;position:absolute;top:50px;left:60px'>
      平行线
    </el-button>
  </div>
</template>
<script>
    //速度m/s
    var mapData={
        "10":5000,
        "11":4000,
        "12":3000,
        "13":2000,
        "14":1000,
        "15":500
    }
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
          'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
        },
        methods: {
            addParallelLinesDashTest(){
                var xys=[
                    [24.466209411621094,118.0913543701172],[24.524917602539062,118.11332702636719],[24.512557983398438,118.18405151367189],[24.463462829589847,118.16722869873047]
                ];

                var polylineJSON = {};
                polylineJSON.xys = xys;
                polylineJSON.option = {};
                polylineJSON.option.weight = 2;
                polylineJSON.option.color = "black";
                var polyline = this.$refs.map.addPolyline(polylineJSON);
                console.log("原线:", polyline);


                var polylineJSON1={};
                polylineJSON1.xys=xys;
                polylineJSON1.option = {};
                polylineJSON1.option.weight=2;
                polylineJSON1.option.color="red";
                polylineJSON1.option.offset=7;
                polylineJSON1.option.dashArray="6,6";
                var polyline1 = this.$refs.map.addParallelPolyline(polylineJSON1);
                console.log("平行线1:", polyline1);
                //给线加箭头
                var iconJson1 = {};
                iconJson1.option = {};
                iconJson1.option.iconUrl = "../../static/map/example/images/plane.png";
                iconJson1.option.iconAnchor = [10, 10];
                iconJson1.option.iconSize=[20, 20];
                var markerIcon1 = this.$refs.map.createIcon(iconJson1);
                polyline1.icon=markerIcon1;
                var markers1 = this.$refs.map.addDirectionIcon(polyline1);



                var polylineJSON2={};
                polylineJSON2.xys=xys;
                polylineJSON2.option = {};
                polylineJSON2.option.weight=2;
                polylineJSON2.option.color="blue";
                polylineJSON2.option.offset=-7;
                var polyline2 = this.$refs.map.addParallelPolyline(polylineJSON2);
                console.log("平行线2:", polyline2);
                //给线加箭头
                var iconJson2 = {};
                iconJson2.option = {};
                iconJson2.option.iconUrl = "../../static/map/example/images/plane.png";
                iconJson2.option.iconAnchor = [10, 10];
                iconJson2.option.iconSize=[20, 20];
                var markerIcon2 = this.$refs.map.createIcon(iconJson2);
                polyline2.icon=markerIcon2;
                var markers2 = this.$refs.map.addDirectionIcon(polyline2);
            }

        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
