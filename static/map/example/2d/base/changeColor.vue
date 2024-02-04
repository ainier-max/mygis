<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addLayerTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>先图层上图
    </el-button>
    <el-button type="primary" @click='changePolylineColor();'
               style='z-index:1000;position:absolute;top:100px;left:50px'>样式修改
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
                //config: window.minemapConfig
            }
        },
        components: {
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
        },
        methods: {
            addLayerTest() {
                //线
                var polylineJSON = {};
                polylineJSON.xys = [
                    [24.464149475097656, 118.10131072998047],
                    [24.478225708007812, 118.17169189453125],
                ];
                polylineJSON.option = {};
                polylineJSON.option.weight = 5;
                polylineJSON.option.color = "#ff0000";
                window.polyline = this.$refs.map.addPolyline(polylineJSON);

                //面
                var polygonJSON = {};
                polygonJSON.xys = [[
                    [24.523887634277347, 118.14130783081056],
                    [24.49127197265625, 118.14302444458008],
                    [24.494361877441406, 118.16774368286133],
                    [24.517192840576172, 118.16619873046874],
                    [24.523887634277347, 118.14130783081056],
                ]];
                polygonJSON.option = {};
                //边界线颜色
                polygonJSON.option.color = "#ff0000";
                polygonJSON.option.fillColor = "#f18";
                polygonJSON.option.fillOpacity = 0.8;
                window.polygon = this.$refs.map.addPolygon(polygonJSON);

                //圆
                var circleJson = {};
                //圆心
                circleJson.xy = [24.522422570142833, 118.11471659369913];
                circleJson.option = {};
                //圆半径
                circleJson.option.radius = 2000;//单位米
                //边界线颜色
                circleJson.option.color = "#ff0000";
                //填充颜色
                circleJson.option.fillColor = "#f18";
                //透明度
                circleJson.option.fillOpacity = 0.5;
                window.circle = this.$refs.map.addCircle(circleJson);

                //矩形
                var rectJson = {};
                //每个数组相邻必须有个x或y值相同
                rectJson.xys = [
                    [24.47939581726156, 118.05312782499335],
                    [24.47939581726156, 118.13036161335647],
                    [24.516293262396033, 118.13036161335647],
                    [24.516293262396033, 118.05312782499335]
                ];
                rectJson.option = {};
                //边界线大小(四维图形接口宽度不生效)
                rectJson.option.weight = 5;
                //边界线颜色
                rectJson.option.color = "#ff0000";
                //填充颜色
                rectJson.option.fillColor = "#f18";
                //透明度
                rectJson.option.fillOpacity = 0.5;
                window.rect = this.$refs.map.addRect(rectJson);
            },
            changePolylineColor() {
                //线样式修改
                var polylineOption = {
                    weight: 5,
                    color: '#000000'
                }
                console.log("123213213243432", window.polyline);
                this.$refs.map.setStyle(window.polyline, polylineOption);


                //面样式修改
                var polygonOption = {
                    color: '#000000',
                    fillColor: '#333333',
                    fillOpacity: 1
                }
                this.$refs.map.setStyle(window.polygon, polygonOption);

                //矩形样式修改
                var rectOption = {
                    color: '#000000',
                    fillColor: '#333333',
                    fillOpacity: 1
                }
                this.$refs.map.setStyle(window.rect, rectOption);

                //圆样式修改(暂未提供)
                var circleOption = {
                    color: '#000000',
                    fillColor: '#333333',
                    fillOpacity: 1
                }
                this.$refs.map.setStyle(window.circle, circleOption);

            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
