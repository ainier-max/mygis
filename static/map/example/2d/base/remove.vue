<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addMarkerTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>
      添加marker
    </el-button>
    <el-button type="primary" @click='deleteMarkerTest();' style='z-index:1000;position:absolute;top:100px;left:50px'>
      删除marker
    </el-button>
  </div>
</template>
<script>
    var removeMarker = null;
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
                //绝对路径
                markerJSON.iconUrl = "../../static/map/example/images/poi.png";
                //图片偏移（坐标固定在图标的哪个点，[0,0]表示图标的左上角）
                markerJSON.iconAnchor = [21, 17];
                //图片大小
                markerJSON.width = 42;
                markerJSON.height = 34;
                var marker = this.$refs.map.addMarker(markerJSON);
                removeMarker = marker;//供删除测试，点，线，面。使用方法一致
                console.log("图标对象", marker);
            },
            deleteMarkerTest() {
                this.$refs.map.removeLayer(removeMarker);
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
