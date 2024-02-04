<template>
  <div>
    <!--地图组件-->
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addTileLayerTest' style='z-index:1000;position:absolute;top:50px;left:60px'>
      添加地图图层
    </el-button>
    <el-button type="primary" @click='removeTileLayerTest' style='z-index:1000;position:absolute;top:100px;left:50px'>
      删除地图图层
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
                config: window.googleConfig,
                tileLayer:null
            }
        },
        components: {
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
        },
        methods: {
            addTileLayerTest() {
                var url='https://b.tile.openstreetmap.org/{z}/{x}/{y}.png';
                var option={foo: 'bar'};
                this.tileLayer=this.$refs.map.addTileLayer(url,option);
            },
            removeTileLayerTest() {
                if(this.tileLayer!=null){
                    this.$refs.map.removeTileLayer(this.tileLayer);
                    this.tileLayer=null;
                }
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
