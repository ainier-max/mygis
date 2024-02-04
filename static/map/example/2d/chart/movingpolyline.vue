<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addMovingPolyline1Test();'
               style='z-index:1000;position:absolute;top:50px;left:50px'>动态画线1
    </el-button>
    <el-button type="primary" @click='addMovingPolyline2Test();'
               style='z-index:1000;position:absolute;top:50px;left:168px'>动态画线2
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
            addMovingPolyline1Test() {
                var pulseJson = {};
                //xy坐标
                pulseJson.xy = [24.429659457206726, 118.08049947023392];
                pulseJson.option = {};
                //波纹大小
                pulseJson.option.iconSize = [10, 10];
                //波纹颜色
                pulseJson.option.color = 'blue';
                //波纹圆点颜色
                pulseJson.option.fillColor = 'blue';
                //波纹速度（数值越大，速度越慢）
                pulseJson.option.heartbeat = 2;
                //是否显示波纹
                pulseJson.option.animate = false;
                var _marker = this.$refs.map.addPulsingIcon(pulseJson);

                var polylineJson = {};
                polylineJson.xys = [
                    [24.445696, 118.081398], [24.449644, 118.08629],
                    [24.453678, 118.100882], [24.45857, 118.105087],
                    [24.462605, 118.106546], [24.464321, 118.111181],
                    [24.466381, 118.119764], [24.471016, 118.124657],
                    [24.478054, 118.125], [24.483891, 118.125515],
                    [24.490242, 118.13015], [24.502258, 118.133583],
                    [24.510326, 118.132381], [24.519939, 118.132725],
                    [24.528694, 118.12191]
                ];
                //线的样式
                polylineJson.option = {};
                //线的颜色
                polylineJson.option.color = "blue";
                //线的宽度
                polylineJson.option.weight = "4";
                var polyline = this.$refs.map.addPolyline(polylineJson);
                polyline.bindPopup("这是动态线1");
                /**
                 * 第一个参数：是否居中移动
                 * 第二个参数：移动marker
                 * 第三个参数：移动速度（单位：像素）
                 */
                polyline.snakeIn(true, _marker, 50);
                //线移动事件
                var snake_flag = 0;
                polyline.on('snake', function (ev) {
                    snake_flag = snake_flag + 1;
                    //console.log(ev);
                    //console.log(snake_flag);
                });
                polyline.on('snakeend', function (ev) {
                    //console.log(ev);
                    console.log("画线结束");
                    _marker.setLatLng(polylineJson.xys[polylineJson.xys.length - 1]);
                });
            },
            addMovingPolyline2Test() {
                //创建移动图标
                var iconJson = {};
                iconJson.option = {};
                iconJson.option.iconUrl = "../../static/map/example/images/bike.png";
                iconJson.option.iconAnchor = [12, 39];
                var _icon = this.$refs.map.createIcon(iconJson);
                var points = [
                    [24.577789306640625, 118.02852630615234],
                    [24.567489624023438, 118.08929443359376],
                    [24.509124755859375, 118.13255310058594],
                    [24.468612670898438, 118.125],
                    [24.44732666015625, 118.08448791503906]
                ];
                var featureGroup = this.$refs.map.addMovingPolyline(points, _icon);
                featureGroup.snakeIn(false, 200);
                featureGroup.on('snake', function (ev) {
                    //console.log(ev);
                });
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
