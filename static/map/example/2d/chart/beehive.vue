<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addBeeHiveTest' style='z-index:1000;position:absolute;top:50px;left:50px'>蜂巢图
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
            addBeeHiveTest() {
                var data=[];
                for(var i=0;i<2000;i++){
                    var zby = 24.44 + Math.random() * 0.10;
                    var zbx = 118.08 + Math.random() * 0.10;
                    var obj={
                        geometry: {
                            type: 'Point',
                            coordinates: [zbx, zby]
                        }
                    };
                    data.push(obj);
                }
                //高度集中区
                for(var i=0;i<1000;i++){
                    var zby = 24.47 + Math.random() * 0.02;
                    var zbx = 118.12 + Math.random() * 0.02;
                    var obj={
                        geometry: {
                            type: 'Point',
                            coordinates: [zbx, zby]
                        }
                    };
                    data.push(obj);
                }
                var dataSet = new mapv.DataSet(data);

                var options = {
                    fillStyle: 'rgba(55, 50, 250, 0.8)',
                    shadowColor: 'rgba(255, 250, 50, 1)',
                    shadowBlur: 20,
                    max: 100,
                    size: 50,
                    label: {
                        show: true,
                        fillStyle: 'white',
                        shadowColor: 'yellow',
                        font: '20px Arial',
                        shadowBlur: 10,
                    },
                    globalAlpha: 0.5,
                    gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)" },
                    draw: 'honeycomb'//六边形
                    //draw: 'grid'//正方形
                }
                var mapvLayer = this.$refs.map.addBeeHive(dataSet, options);
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
