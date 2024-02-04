<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addScatterTest()' style='z-index:1000;position:absolute;top:50px;left:60px'>散点图
    </el-button>
  </div>
</template>
<script>
    window.peoplePhotoLayer = null;
    var markers = [];
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
            addScatterTest() {
                this.$refs.map.zoomTo(4);
                for (var i = 0; i < markers.length; i++) {
                    this.$refs.map.removeLayer(markers[i]);
                }
                //0-5区间：绿色
                //6-10区间：黄色
                //11-20区间：橙色
                //21以上：红色
                var parts = [
                    {"color": "green", "betweenVal": [0, 5], "size": 10},
                    {"color": "yellow", "betweenVal": [6, 10], "size": 15},
                    {"color": "orange", "betweenVal": [11, 20], "size": 20},
                    {"color": "red", "betweenVal": [21], "size": 30},
                ];
                markers = this.$refs.map.addScatter(window.scatterData, parts);
            },
        },
        mounted: function () {

        },
    }
</script>

<style>
  /*点扩散范围大小调整*/
  .leaflet-pulsing-icon:after {
    -webkit-border-radius: 100%;
    border-radius: 100%;
    height: 120%;
    width: 120%;
    position: absolute;
    margin: -10% 0 0 -10%;
  }
</style>
