<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config"
                   style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addClusterTest()' style='z-index:1000;position:absolute;top:50px;left:50px'>聚合
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
        config: window.defaultMapConfig
      }
    },
    components: {
      'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
    },
    methods: {
      addClusterTest() {
        //聚合图标
        var iconJson = {};
        iconJson.option = {};
        iconJson.option.iconUrl = "../images/marker-icon.png";
        iconJson.option.iconAnchor = [21, 42];//坐标固定在图标的哪个点，[0,0]表示图标的左上角
        var markerIcon = this.$refs.map.createIcon(iconJson);
        //模拟1000个聚合点
        var clusterMarkers = [];
        for (var i = 0; i < 1000; i++) {
          var markerJson = {};
          //xy坐标
          markerJson.xy = [24.42 + Math.random() * 0.10, 118.06 + Math.random() * 0.10];
          //marker参数设置
          markerJson.option = {};
          markerJson.option.icon = markerIcon;
          var marker = this.$refs.map.createMarker(markerJson);
          marker.html = "聚合点：" + i;
          this.$refs.map.bindPopup(marker);
          clusterMarkers.push(marker);
        }
        //singleMarkerMode: true  是否展示图标 true为数字1  false为marker图标
        var option = {};
        //如果设置该值，将会调用所设置的点击事件，如果不设置，将使用默认的事件处理
        option.clickCallBack = this.clusterClickFun;
        option.singleMarkerMode = true;//true 当数量为1的时候展示聚合点，false 当数量为1的时候展示位点
        option.maxClusterRadius = 100;//最大聚合像素，该配置影响地图的聚合数量
        option.iconCreateFunction = this.customStyle;
        var clusterLayer = this.$refs.map.addCluster(clusterMarkers, option);
      },
      clusterClickFun(result) {
        console.log("点击cluster所返回的数据情况，其长度为：", result.length);
      },
      customStyle(cluster) {
        var childCount = cluster.getChildCount();
        //console.log(childCount);
        var c = ' cluster-marker-';
        if (childCount < 30) {
          c += 'small';
        } else if (childCount < 200) {
          c += 'medium';
        } else {
          c += 'large';
        }
        return new L.DivIcon({
          html: '<div><span>' + childCount + '</span></div>',
          className: 'marker-cluster' + c,
          iconSize: new L.Point(40, 40)
        });
      }
    },
    mounted: function () {

    },
  }
</script>

<style>
  .cluster-marker-small {
    background-color: rgba(241, 211, 87, 0.6);
  }

  .cluster-marker-small div {
    background-color: rgba(0, 0, 255, 0.6);
  }

  .cluster-marker-medium {
    background-color: rgba(241, 211, 87, 0.6);
  }

  .cluster-marker-medium div {
    background-color: rgba(255, 255, 0, 0.6);
  }

  .cluster-marker-large {
    background-color: rgba(241, 211, 87, 0.6);
  }

  .cluster-marker-large div {
    background-color: rgba(255, 0, 0, 0.6);
  }
</style>
