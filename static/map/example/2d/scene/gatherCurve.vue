<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='gatherCurveTest' style='z-index:1000;position:absolute;top:50px;left:60px'>
      开启曲线采集
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
            gatherCurveTest(){
              //禁止地图拖动
              this.$refs.map.map.dragging.disable();  //enable  开启
              this.$refs.map.map.doubleClickZoom.disable()
              this.$refs.map.map.scrollWheelZoom.disable();
                this.$refs.map.onMapEvent("mousedown", this.mapEventCallBack,"mousedown");
            },
            mapEventCallBack(e){
                console.log("附加事件回调：",e);
                var polylineJSON = {};
                polylineJSON.xys = [[e.latlng.lat,e.latlng.lng]];
                //线的样式
                polylineJSON.option = {};
                //线的宽度
                polylineJSON.option.weight = 5;
                //线的颜色
                polylineJSON.option.color = "#f18";
                this.polyline = this.$refs.map.addPolyline(polylineJSON);
              this.$refs.map.onMapEvent("mousemove", this.callback,"mousemove");
              this.$refs.map.onMapEvent("mouseup", this.dblclickCallback,"mouseup");
            },
            dblclickCallback(){
              this.$refs.map.offMapEvent("mousedown", this.mapEventCallBack,"mousedown");
              this.$refs.map.offMapEvent("mousemove", this.callback,"mousemove");
              this.$refs.map.map.dragging.enable();  //enable  开启
              this.$refs.map.map.doubleClickZoom.enable()
              this.$refs.map.map.scrollWheelZoom.enable();
            },
            callback(e){
                this.polyline.addLatLng([e.latlng.lat,e.latlng.lng]);
            }

        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
