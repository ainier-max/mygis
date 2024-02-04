<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config"
                   style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>

    <plot-component ref="plotRef" id="plotid"
                    :map-ref="id"
                    style="position: absolute;top:20px;right: 20px;z-index: 200"
    ></plot-component>

    <el-button type="primary" @click='addPlot' style='z-index:1000;position:absolute;top:50px;left:60px'>
      叠加战斗分队箭头（燕尾）
    </el-button>

    <el-button type="primary" @click='editPlot();' style='z-index:1000;position:absolute;top:100px;left:50px'>
      战斗分队箭头（燕尾）进入编辑
    </el-button>

    <el-button type="primary" @click='endPlot();' style='z-index:1000;position:absolute;top:150px;left:50px'>
      战斗分队箭头（燕尾）结束编辑
    </el-button>

    <el-button type="primary" @click='deletePlot();'
               style='z-index:1000;position:absolute;top:200px;left:50px'>删除战斗分队箭头（燕尾）
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
      gatherPosition:[[24.44583145595653, 118.04431915283205],[24.571167451541804, 118.03916931152345],[24.581470727624104, 118.15280914306642],[24.43839812102505, 118.09341430664064]],
      tailedAttackArrowLayer:null,
    }
  },
  components: {
    'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
    'plot-component': httpVueLoader('../../static/map/vue-map-component/tools/plot-component.vue', 'frontEnd')
  },
  methods: {
    addPlot(){
      this.plotLayer=this.$refs.plotRef.addTailedSquadCombat(this.gatherPosition);
    },
    editPlot(){
      this.$refs.plotRef.editTailedSquadCombat(this.plotLayer,this.gatherIconOption);
    },
    endPlot(){
      this.$refs.plotRef.endTailedSquadCombat(this.plotLayer,this.editCallback);
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
