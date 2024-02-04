<template>
  <div>
    <!--地图组件-->
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addMarkerTest()' style='z-index:1000;position:absolute;top:50px;left:50px'>
      测试marker
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
                var marker = this.$refs.map.addMarker(markerJSON);
                //绑定提示
                var option={direction:'top',offset:[0,0],permanent:false,opacity:1,sticky:true};
                var content="<div style='color:blue'>悬浮提示内容</div>";
                this.$refs.map.bindTooltip(marker,content,option);
                //绑定气泡框内容
                marker.html = "<div style='color:red;'>点击窗口内容</div>";
                var option = {};
                option.offset = [0, 0];//弹出偏移
                this.$refs.map.bindPopup(marker, option);
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
