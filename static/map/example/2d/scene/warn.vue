<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" :init-position="initPosition" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='warnTest' style='z-index:1000;position:absolute;top:50px;left:50px'>四色预警</el-button>
  </div>
</template>
<script>
    export default {
        name: "demo",
        props: {},
        data() {
            return {
                id:"map",
                type:"js",
                config: window.defaultMapConfig,
                //地图初始定位
                initPosition:{
                  level:10,//级别
                  centerPoint:[24.65822425842285,118.1246566772461]//中心点
                }
            }
        },
        components: {
          'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
        },
        methods: {
            warnTest() {
              var fourColors=["#FF0000","#FFA500","#FFFF00","#008000"];
              var geoMapData = JSON.parse(this.$refs.map.readFile("../../static/data/xiamen.json"));
              console.log("地图数据：", geoMapData);
              var geoMapTileLayer = L.geoJSON(geoMapData, {
                style: function(feature) {
                  var num=Math.floor(Math.random()*4);
                  //console.log("随机数值：",num);
                  var option = {};
                  option.weight = 1;
                  option.fillOpacity = 0.6;
                  //边界线颜色
                  option.color = "#CCCCCC";
                  //填充颜色
                  option.fillColor = fourColors[num];
                  option.areaname=feature.properties.name;
                  return option;
                }
              });
              geoMapTileLayer.bindTooltip(
                function(layer) {
                  console.log("图层layer：",layer);
                  var doc = layer.options.areaname;
                  return doc;
                },
                { direction:'top',offset:[0,0],permanent:false,opacity:1,sticky:true}
              );
              geoMapTileLayer.addTo(this.$refs.map.map);
            },
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
