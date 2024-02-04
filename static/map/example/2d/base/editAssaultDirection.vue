<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config"
                   style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>

    <plot-component ref="plotRef" id="plotid"
                    :map-ref="id"
                    style="position: absolute;top:20px;right: 20px;z-index: 200"
    ></plot-component>

    <el-button type="primary" @click='addAssaultDirection' style='z-index:1000;position:absolute;top:50px;left:60px'>
      叠加突击方向
    </el-button>

    <el-button type="primary" @click='editAssaultDirection();' style='z-index:1000;position:absolute;top:100px;left:50px'>
      突击方向进入编辑
    </el-button>

    <el-button type="primary" @click='endAssaultDirection();' style='z-index:1000;position:absolute;top:150px;left:50px'>
      突击方向结束编辑
    </el-button>

    <el-button type="primary" @click='deleteAssaultDirection();'
               style='z-index:1000;position:absolute;top:200px;left:50px'>删除突击方向
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
      fineArrowLayerLayer:null,
    }
  },
  components: {
    'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
    'plot-component': httpVueLoader('../../static/map/vue-map-component/tools/plot-component.vue', 'frontEnd')
  },
  methods: {
    addAssaultDirection(){
      this.fineArrowLayerLayer=this.$refs.plotRef.addAssaultDirection(this.gatherPosition);
    },
    editAssaultDirection(){
      this.$refs.plotRef.editAssaultDirection(this.fineArrowLayerLayer,this.gatherIconOption);
    },
    endAssaultDirection(){
      this.$refs.plotRef.endAssaultDirection(this.fineArrowLayerLayer,this.editCallback);
    },
    editCallback(newAssaultDirectionLayer){
      this.fineArrowLayerLayer=newAssaultDirectionLayer;
      console.log("修改后的坐标信息为：",this.fineArrowLayerLayer.gatherPosition);
    },
    deleteAssaultDirection(){
      this.$refs.map.removeLayer(this.fineArrowLayerLayer);
    }

  },
  mounted: function () {

  },
}
</script>

<style>

</style>
