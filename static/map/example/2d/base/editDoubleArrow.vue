<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config"
                   style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>

    <plot-component ref="plotRef" id="plotid"
                    :map-ref="id"
                    style="position: absolute;top:20px;right: 20px;z-index: 200"
    ></plot-component>

    <el-button type="primary" @click='addPlot' style='z-index:1000;position:absolute;top:50px;left:60px'>
      叠加钳击箭头
    </el-button>

    <el-button type="primary" @click='editPlot();' style='z-index:1000;position:absolute;top:100px;left:50px'>
      钳击箭头进入编辑
    </el-button>

    <el-button type="primary" @click='endPlot();' style='z-index:1000;position:absolute;top:150px;left:50px'>
      钳击箭头结束编辑
    </el-button>

    <el-button type="primary" @click='deletePlot();'
               style='z-index:1000;position:absolute;top:200px;left:50px'>删除钳击箭头
    </el-button>
  </div>
</template>
<script>
window.editRect = null;
export default {
  name: "demo",
  props: {},
  data() {
    return {
      id: "map",
      type: "vue",
      config: window.defaultMapConfig,
      gatherIconOption:{
        iconUrl: '../../static/map/example/images/gatherPoint.png',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      },
      gatherPosition:[[24.488182067871094, 118.12019348144533],[24.47479248046875, 118.2012176513672],[24.522857666015625, 118.18645477294922],[24.576416015625004, 118.17615509033205]],
      plotLayer:null,
    }
  },
  components: {
    'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
    'plot-component': httpVueLoader('../../static/map/vue-map-component/tools/plot-component.vue', 'frontEnd')
  },
  methods: {
    addPlot(){
      this.plotLayer=this.$refs.plotRef.addDoubleArrow(this.gatherPosition);
    },
    editPlot(){
      this.$refs.plotRef.editDoubleArrow(this.plotLayer,this.gatherIconOption);
    },
    endPlot(){
      this.$refs.plotRef.endDoubleArrow(this.plotLayer,this.editCallback);
    },
    editCallback(newPlotLayer){
      this.plotLayer=newPlotLayer;
      console.log("修改后的坐标信息为：",this.plotLayer.gatherPosition);
    },
    deletePlot(){
      this.$refs.map.removeLayer(this.plotLayer);
    }

  },
  mounted: function () {

  },
}
</script>

<style>

</style>
