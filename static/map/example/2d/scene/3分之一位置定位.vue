<template>
  <div>
    <map-component ref="map" :id="id" :type="type" class="mapClass" :config="config"
                   style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addMarkerTest' style='z-index:1000;position:absolute;top:50px;left:60px'>
      添加marker1
    </el-button>

    <el-button type="primary" @click='addMarker2Test' style='z-index:1000;position:absolute;top:100px;left:50px'>
      定位至1/3屏位置中间
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
      'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
    },
    methods: {
      addMarkerTest() {
        var markerJSON = {};
        //xy坐标
        markerJSON.xy = [24.502422570142833, 118.15471659369913];
        //图片位置
        markerJSON.iconUrl = "../../static/map/example/images/poi.png";
        //图片偏移（坐标固定在图标的哪个点，[0,0]表示图标的左上角）
        markerJSON.iconAnchor = [21, 17];
        //图片大小
        markerJSON.width = 42;
        markerJSON.height = 34;
        window.marker1 = this.$refs.map.addMarker(markerJSON);
        console.log("图标对象", window.marker1 );
      },
      addMarker2Test(){
        var bounds=this.$refs.map.map.getBounds();
        var south=bounds.getSouth();
        var north=bounds.getNorth();
        console.log(south,north);
        var tt=(north-south)/3;
        console.log(tt);
        var newCenter=[window.marker1.getLatLng().lat-tt,window.marker1.getLatLng().lng];
        console.log("newCenter:",newCenter);
        this.$refs.map.panTo(newCenter,{duration:1});
      }
    },
    mounted: function () {

    },
  }
</script>

<style>

</style>
