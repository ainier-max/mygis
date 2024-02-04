<template>
  <div>
    <map-component ref="map" :id="id" :type="type" class="mapClass" :config="config"
                   style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <div style="position:absolute;left:50px;top:50px;z-index: 200;background: white;">
      区域顺序点击:<a>福建省</a>--》<a>厦门市</a>--》<a>思明区</a>
    </div>
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
        //config: window.geojsonMapConfig,//无地图背景
        config: window.tiandituYXMapConfig,//有地图背景，去掉 .mapClass 样式即可去掉地图背景,否则会有条纹
        xzqhLayers: [],
      }
    },
    components: {
      'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
    },
    methods: {
      getColor() {
        var colourstr = "#"
        var coloruarr = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        for (var p = 0; p < 6; p++) {
          var n = Math.floor(Math.random() * coloruarr.length + 1) - 1;
          colourstr += coloruarr[n];
        }
        return colourstr;
      },
      load() {
        if (typeof (this.$refs.map) != "undefined") {
          this.readData("china");
        } else {
          window.setTimeout(this.load, 100);
        }
      },
      readData(flag) {
        for (var i = 0; i < this.xzqhLayers.length; i++) {
          if (this.xzqhLayers[i].adcode == "350000" || this.xzqhLayers[i].adcode == "350200" || this.xzqhLayers[i].adcode == "350203") {
            window.mapBound = this.$refs.map.getLayerBound(this.xzqhLayers[i]);
            console.log("多边形边框:", window.mapBound);
          }
          this.$refs.map.removeLayer(this.xzqhLayers[i]);
        }
        this.xzqhLayers = [];
        if (flag == "china") {
          this.$refs.map.setView([35.651787, 108.373451], 4);
          this.addGeoLayer(JSON.parse(this.$refs.map.readFile("./static/data/China.json")));
        } else if (flag == "350000") {
          this.addGeoLayer(JSON.parse(this.$refs.map.readFile("./static/data/fujian.json")));
          this.$refs.map.setCenterByBound(window.mapBound);
        } else if (flag == "350200") {
          this.addGeoLayer(JSON.parse(this.$refs.map.readFile("./static/data/xiamen.json")));
          this.$refs.map.setCenterByBound(window.mapBound);
        } else if (flag == "350203") {
          this.addGeoLayer(JSON.parse(this.$refs.map.readFile("./static/data/siming.json")));
          this.$refs.map.setCenterByBound(window.mapBound);
        }
      },
      addGeoLayer(data) {
        for (var i = 0; i < data.features.length; i++) {
          var option = {};
          option.weight = 1;
          option.color = "#FF69B4";
          option.fillColor = this.getColor();
          option.fillOpacity = 0.8;
          console.log(data.features[i]);
          var zxqhlayer = this.$refs.map.addPolygonByGeojson(JSON.stringify(data.features[i].geometry), option);
          zxqhlayer.adcode = data.features[i].properties.adcode;
          zxqhlayer.name = data.features[i].properties.name;
          zxqhlayer.level = data.features[i].properties.level;
          //绑定提示
          var option = {direction: 'top', offset: [0, 0], permanent: false, opacity: 1, sticky: true};
          var content = "<div style='color:blue'>" + zxqhlayer.name + "</div>";
          this.$refs.map.bindTooltip(zxqhlayer, content, option);
          this.$refs.map.onLayerEvent("click", zxqhlayer, this.zxqhlayerClickEventCallBack);
          this.xzqhLayers.push(zxqhlayer);
        }
      },
      zxqhlayerClickEventCallBack(e) {
        console.log("图层点击事件回调对象：", e.target);
        if (e.target.adcode == "350000") {
          this.readData("350000");
        } else if (e.target.adcode == "350200") {
          this.readData("350200");
        } else if (e.target.adcode == "350203") {
          this.readData("350203");
        }
      }
    },
    mounted: function () {
      this.load();
    },
  }
</script>

<style>
  .mapClass {
    /*background-image: url(./static/img/mapBackground.jpg);*/
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>
