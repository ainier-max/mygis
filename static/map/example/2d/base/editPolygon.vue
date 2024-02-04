<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addPolygonTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>编辑测试多边形</el-button>
    <el-button type="primary" @click='startEditPolygonTest();' style='z-index:1000;position:absolute;top:100px;left:50px'>进入编辑</el-button>
    <el-button type="primary" @click='endEditPolygonTest();' style='z-index:1000;position:absolute;top:150px;left:50px'>结束编辑</el-button>

    <el-input type="textarea"  :rows="5"
              id="zbz" placeholder="多边形坐标串" style='z-index:1000;position:absolute;top:200px;left:60px;width: 350px'></el-input>
  </div>
</template>
<script>
  window.editPolygon=null;
  export default {
    name: "demo",
    props: {},
    data() {
      return {
        id:"map",
        type:"vue",
        config: window.defaultMapConfig,
      }
    },
      components: {
          'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
      },
    methods: {
      addPolygonTest(){
        var polygonJSON={};
        polygonJSON.xys=[[
          [24.523887634277347,118.14130783081056],
          [24.49127197265625,118.14302444458008],
          [24.494361877441406,118.16774368286133],
          [24.517192840576172,118.16619873046874],
          [24.523887634277347,118.14130783081056],
        ]];
        //面的样式
        polygonJSON.option={};
        //边界线大小(四维图形接口宽度不生效)
        polygonJSON.option.weight=5;
        //边界线颜色
        polygonJSON.option.color="#ff0000";
        //填充颜色
        polygonJSON.option.fillColor="#f18";
        //透明度
        polygonJSON.option.fillOpacity=0.8;
        window.editPolygon= this.$refs.map.addPolygon(polygonJSON);
      },
      startEditPolygonTest(){
        console.log("多边形进入编辑模式");
        this.$refs.map.startEditPolygon(window.editPolygon);
        document.getElementById("zbz").value=window.editPolygon.zbc;
      },
      endEditPolygonTest(){
        console.log("多边形结束编辑模式");
        var newPolygon=this.$refs.map.endEditPolygon(window.editPolygon);
        document.getElementById("zbz").value=newPolygon.zbc;
      }
    },
    mounted: function () {

    },
  }
</script>

<style >

</style>
