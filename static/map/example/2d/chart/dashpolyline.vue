<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addDashPolylineTest();' style='z-index:1000;position:absolute;top:50px;left:50px'>
      虚线
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
            addDashPolylineTest() {
                var dashJson = {};
                dashJson.xys = [
                    [24.445696, 118.081398], [24.449644, 118.08629],
                    [24.453678, 118.100882], [24.45857, 118.105087],
                    [24.462605, 118.106546], [24.464321, 118.111181],
                    [24.466381, 118.119764], [24.471016, 118.124657],
                    [24.478054, 118.125], [24.483891, 118.125515],
                    [24.490242, 118.13015], [24.502258, 118.133583],
                    [24.510326, 118.132381], [24.519939, 118.132725],
                    [24.528694, 118.12191]
                ];
                dashJson.option = {};
                dashJson.option.color = '#f00';
                dashJson.option.weight = '2';
                var marker = this.$refs.map.addDashPolyline(dashJson);
                console.log("虚线", marker);
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
