<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" :load-end="loadEndFun"    class="mapClass"
                   style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
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
        config: window.geojsonMapConfig,
        //地图加载完成回调方法
        loadEndFun:"loadEnd"
      }
    },
    components: {
      'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
    },
    methods: {
      loadEnd(){
        this.addGeoLayer(JSON.parse(this.$refs.map.readFile("../../static/data/China.json")));
      },
      addGeoLayer(data) {
        console.log("data,",data);
        let the=this;
        var geoMapTileLayer=L.geoJSON(data, {
          style: function (feature) {
            //console.log("feature:",feature);
            var option={};
            option.weight = 1;
            option.fillColor = the.getColor();
            option.fillOpacity = 0.5;
            option.color = "rgba(255,255,255,0.65)";
            return option;
          },
          onEachFeature: function (feature, layer) {
            console.log("feature",feature);
            console.log("layer",layer);

            //var center =feature.properties.center;

            var layerBound = the.$refs.map.getLayerBound(layer);
            var center=[(layerBound.south + layerBound.north) / 2,(layerBound.east + layerBound.west) / 2];

            console.log("中心点信息",center);
            if(typeof (center)=="undefined"){
              return
            }
            let name=feature.properties.name;
            let yValue=center[0];
            let xValue=center[1];
            if(name=="内蒙古自治区"){
              yValue=yValue-4;
            }


            //偏移适配
            let fitValue=0;
            if(name.length>4){
              fitValue=18;
            }else{
              fitValue=9;
            }

            var divJson2 = {};
            //xy坐标
            divJson2.xy = [yValue, xValue];
            divJson2.option = {};
            divJson2.option.iconAnchor = [25, fitValue];
            //divJson2.option.html=this.$refs.peoplePhoto;
            var html="";
            html+='<div style="width:50px;">'
            html+=name
            html+='</div>'
            divJson2.option.html = html;
            the.$refs.map.addDiv(divJson2);
          }
        });
        geoMapTileLayer.addTo(the.$refs.map.map);
      },
      getColor() {
        var colourstr = "#"
        var coloruarr = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        for (var p = 0; p < 6; p++) {
          var n = Math.floor(Math.random() * coloruarr.length + 1) - 1;
          colourstr += coloruarr[n];
        }
        return colourstr;
      }
    },
    mounted: function () {

    },
  }
</script>

<style scoped>
  .mapClass {
    background-image: url(../../static/img/mapBackground.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>
