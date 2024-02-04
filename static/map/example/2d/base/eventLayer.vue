<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addLayerEventTest' style='z-index:1000;position:absolute;top:50px;left:60px'>
      marker绑定事件
    </el-button>
    <el-button type="primary" @click='removeLayerEventTest' style='z-index:1000;position:absolute;top:100px;left:50px'>
      marker解除事件
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
                config: window.defaultMapConfig,
                marker:null,
            }
        },
        components: {
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
        },
        methods: {
            addLayerEventTest() {
                var markerJSON = {};
                //xy坐标
                markerJSON.xy = [24.502422570142833, 118.15471659369913];
                //图片位置
                markerJSON.iconUrl = "./static/map/example/images/poi.png";
                //图片偏移（坐标固定在图标的哪个点，[0,0]表示图标的左上角）
                markerJSON.iconAnchor = [21, 17];
                //图片大小
                markerJSON.width = 42;
                markerJSON.height = 34;
                this.marker = this.$refs.map.addMarker(markerJSON);
                this.marker.lat="24.502422570142833";
                this.marker.lng="118.15471659369913";
                this.$refs.map.onLayerEvent("click",this.marker, this.markerClickEventCallBack,"clickname");
                this.$refs.map.onLayerEvent("mouseover",this.marker, this.markerMouseOverEventCallBack,"mouseovername");
                this.$refs.map.onLayerEvent("mouseout",this.marker, this.markerMouseOutEventCallBack,"mouseoutname");
            },
            markerClickEventCallBack(e){
                console.log("图层点击事件回调对象：", e.target);
            },
            markerMouseOverEventCallBack(e){
                console.log("图层移入事件回调对象：", e.target);
            },
            markerMouseOutEventCallBack(e){
                console.log("图层移出事件回调对象：", e.target);
            },
            removeLayerEventTest(){
                this.$refs.map.offLayerEvent("click",this.marker,this.markerClickEventCallBack,"clickname");
                this.$refs.map.offLayerEvent("mouseover",this.marker,this.markerMouseOverEventCallBack,"该参数与on不对应就无法删除");
                this.$refs.map.offLayerEvent("mouseout",this.marker,this.markerMouseOutEventCallBack,"mouseoutname");
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
