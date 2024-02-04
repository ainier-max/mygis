<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config"
                   style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>

    <plot-component ref="plotRef" id="plotid"
                    :map-ref="id"
                    style="position: absolute;top:20px;right: 20px;z-index: 200"
    ></plot-component>

    <el-button type="primary" @click='addAttackArrow' style='z-index:1000;position:absolute;top:50px;left:60px'>
      叠加进攻方向
    </el-button>

    <el-button type="primary" @click='editAttackArrow();' style='z-index:1000;position:absolute;top:100px;left:50px'>
      进攻方向进入编辑
    </el-button>

    <el-button type="primary" @click='endAttackArrow();' style='z-index:1000;position:absolute;top:150px;left:50px'>
      进攻方向结束编辑
    </el-button>

    <el-button type="primary" @click='deleteAttackArrow();'
               style='z-index:1000;position:absolute;top:200px;left:50px'>删除进攻方向
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
      gatherPosition:[[24.59583145595653, 118.04431915283205],[24.571167451541804, 118.03916931152345],[24.581470727624104, 118.15280914306642],[24.43839812102505, 118.09341430664064]],
      attackArrowLayer:null,
    }
  },
  components: {
    'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
    'plot-component': httpVueLoader('../../static/map/vue-map-component/tools/plot-component.vue', 'frontEnd')
  },
  methods: {
    addAttackArrow(){
      this.attackArrowLayer=this.$refs.plotRef.addAttackArrow(this.gatherPosition);
    },
    editAttackArrow(){
      this.$refs.plotRef.editAttackArrow(this.attackArrowLayer,this.gatherIconOption);
    },
    endAttackArrow(){
      this.$refs.plotRef.endAttackArrow(this.attackArrowLayer,this.editCallback);
    },
    editCallback(newAssaultDirectionLayer){
      this.attackArrowLayer=newAssaultDirectionLayer;
      console.log("修改后的坐标信息为：",this.attackArrowLayer.gatherPosition);
    },
    deleteAttackArrow(){
      this.$refs.map.removeLayer(this.attackArrowLayer);
    }

  },
  mounted: function () {

  },
}
</script>

<style>

</style>
