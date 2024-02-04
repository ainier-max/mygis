<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config"
                   style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <plot-component ref="plotRef" id="plotid"
                    :map-ref="id"
                    style="position: absolute;top:20px;right: 20px;z-index: 200"
    ></plot-component>
    <el-button type="primary" @click='gather' style='z-index:1000;position:absolute;top:50px;left:50px'>采集突击方向
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
      config: window.defaultMapConfig,
      gatherIconOption: {
        iconUrl: '../../static/map/example/images/gatherPoint.png',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      }
    }
  },
  components: {
    'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
    'plot-component': httpVueLoader('../../static/map/vue-map-component/tools/plot-component.vue', 'frontEnd')
  },
  methods: {
    gather() {
      this.$refs.plotRef.gatherAssaultDirection(this.gatherIconOption,this.gatherCallback);
    },
    gatherCallback(assaultDirectionLayer) {
      console.log("采集的坐标信息为：",assaultDirectionLayer.gatherPosition);
    }
  },
  mounted: function () {

  },
}
</script>

<style>

</style>
