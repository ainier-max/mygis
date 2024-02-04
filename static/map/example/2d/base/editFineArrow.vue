<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config"
                   style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>

    <plot-component ref="plotRef" id="plotid"
                    :map-ref="id"
                    style="position: absolute;top:20px;right: 20px;z-index: 200"
    ></plot-component>

    <el-button type="primary" @click='addFineArrow' style='z-index:1000;position:absolute;top:50px;left:60px'>
      叠加直线
    </el-button>

    <el-button type="primary" @click='editFineArrow();' style='z-index:1000;position:absolute;top:100px;left:50px'>
      直线进入编辑
    </el-button>

    <el-button type="primary" @click='endFineArrow();' style='z-index:1000;position:absolute;top:150px;left:50px'>
      直线结束编辑
    </el-button>

    <el-button type="primary" @click='deleteFineArrow();'
               style='z-index:1000;position:absolute;top:200px;left:50px'>删除直线
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
      gatherPosition:[[24.543687907411208, 118.02989959716798],[24.482461840837402, 118.14903259277344]],
      fineArrowLayer:null,
    }
  },
  components: {
    'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
    'plot-component': httpVueLoader('../../static/map/vue-map-component/tools/plot-component.vue', 'frontEnd')
  },
  methods: {
    addFineArrow(){
      this.fineArrowLayer=this.$refs.plotRef.addFineArrow(this.gatherPosition);
    },
    editFineArrow(){
      this.$refs.plotRef.editFineArrow(this.fineArrowLayer,this.gatherIconOption);
    },
    endFineArrow(){
      this.$refs.plotRef.endFineArrow(this.fineArrowLayer,this.editCallback);
    },
    editCallback(newFineArrowLayer){
      this.fineArrowLayer=newFineArrowLayer;
      console.log("采集的坐标信息为：",this.fineArrowLayer.gatherPosition);
    },
    deleteFineArrow(){
      this.$refs.map.removeLayer(this.fineArrowLayer);
    }

  },
  mounted: function () {

  },
}
</script>

<style>

</style>
