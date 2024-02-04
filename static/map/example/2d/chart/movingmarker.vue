<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addMovingMarkerTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>
      移动图标
    </el-button>
    <el-button type="primary" @click='startTest();' style='z-index:1000;position:absolute;top:100px;left:50px'>暂停
    </el-button>
    <el-button type="primary" @click='endTest();' style='z-index:1000;position:absolute;top:150px;left:50px'>开始
    </el-button>
    <el-button type="primary" @click='removeTest();' style='z-index:1000;position:absolute;top:200px;left:50px'>删除
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
            addMovingMarkerTest() {
                if (window.movingMarkerLayer != null) {
                    this.$refs.map.removeLayer(window.movingMarkerLayer);
                }
                var movingMarkerJson = {};
                //图标移动路线点
                movingMarkerJson.xys = [
                    [24.445696, 118.081398], [24.449644, 118.08629],
                    [24.453678, 118.100882], [24.45857, 118.105087],
                    [24.462605, 118.106546], [24.464321, 118.111181],
                    [24.466381, 118.119764], [24.471016, 118.124657],
                    [24.478054, 118.125], [24.483891, 118.125515],
                    [24.490242, 118.13015], [24.502258, 118.133583],
                    [24.510326, 118.132381], [24.519939, 118.132725],
                    [24.528694, 118.12191]
                ];
                //为每个点创建气泡框
                for (var i = 0; i < movingMarkerJson.xys.length; i++) {
                    var popupJson = {};
                    //气泡框的位置
                    popupJson.xy = movingMarkerJson.xys[i];
                    //气泡框内容
                    popupJson.content = "气泡框" + i;
                    popupJson.option = {offset: [0, 0]};
                    movingMarkerJson.xys[i].popup = this.$refs.map.createPopup(popupJson);
                }
                //创建移动图标
                var iconJson = {};
                iconJson.option = {};
                iconJson.option.iconUrl = "../../static/map/example/images/bike.png";
                iconJson.option.iconAnchor = [11, 39];//坐标固定在图标的哪个点，[0,0]表示图标的左上角
                var markerIcon = this.$refs.map.createIcon(iconJson);
                movingMarkerJson.icon = markerIcon;
                //移动速度
                movingMarkerJson.speed = 1000;//单位：米/秒
                //移动图标移动到点的时候是否弹出气泡框
                movingMarkerJson.movingMarkerShowPopup = false;
                //移动是否居中
                movingMarkerJson.movingMarker = true;
                //是否展示动态线
                movingMarkerJson.showPolyline_flag = true;
                //是否展示尾巴
                movingMarkerJson.showTail_flag = true;
                window.movingMarkerLayer = this.$refs.map.addMovingMarker(movingMarkerJson);
                console.log("movingMarkerLayer:", window.movingMarkerLayer);
            },
            removeTest() {
                this.$refs.map.removeLayer(window.movingMarkerLayer);
            },
            startTest() {
                window.movingMarkerLayer.pause();
            },
            endTest() {
                window.movingMarkerLayer.start();
            }

        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
