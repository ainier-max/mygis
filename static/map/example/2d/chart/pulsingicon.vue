<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addPulsingIconTest();' style='z-index:1000;position:absolute;top:50px;left:50px'>
      波纹点
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
            addPulsingIconTest() {
                var pulseJson = {};
                //xy坐标
                pulseJson.xy = [24.50637817382813, 118.13152313232423];
                pulseJson.option = {};
                //波纹大小
                pulseJson.option.iconSize = [10, 10];
                //波纹颜色
                pulseJson.option.color = 'green';
                //波纹圆点颜色
                pulseJson.option.fillColor = 'green';
                //波纹速度（数值越大，速度越慢）
                pulseJson.option.heartbeat = 2;
                //是否显示波纹
                pulseJson.option.animate = true;
                var marker = this.$refs.map.addPulsingIcon(pulseJson);
                console.log("波纹点", marker);
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
