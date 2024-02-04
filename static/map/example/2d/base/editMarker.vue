<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addMarkerTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>
      编辑测试点
    </el-button>
    <el-button type="primary" @click='startEditMarkerTest();'
               style='z-index:1000;position:absolute;top:100px;left:50px'>进入编辑
    </el-button>
    <el-button type="primary" @click='endEditMarkerTest();' style='z-index:1000;position:absolute;top:150px;left:50px'>
      结束编辑
    </el-button>

    <el-input id="zbz" placeholder="点坐标值："
              style='z-index:1000;position:absolute;top:200px;left:60px;width: 350px'></el-input>
  </div>
</template>
<script>
    window.editMarker = null;
    export default {
        name: "demo",
        props: {},
        data() {
            return {
                id: "map",
                type: "vue",
                config: window.defaultMapConfig,
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
                window.editMarker = this.$refs.map.addMarker(markerJSON);
            },
            startEditMarkerTest() {
                console.log("点进入编辑模式");
                this.$refs.map.startEditMarker(window.editMarker);
                document.getElementById("zbz").value = window.editMarker.xy.lat + "," + window.editMarker.xy.lng;
            },
            endEditMarkerTest() {
                console.log("点结束编辑模式");
                var newMarker = this.$refs.map.endEditMarker(window.editMarker);
                document.getElementById("zbz").value = newMarker.xy.lat + "," + newMarker.xy.lng;
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
