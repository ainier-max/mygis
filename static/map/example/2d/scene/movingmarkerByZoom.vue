<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addMapZoomTest' style='z-index:1000;position:absolute;top:50px;left:60px'>
      图标移动并开启地图缩放监听事件
    </el-button>
    <el-button type="primary" @click='remove' style='z-index:1000;position:absolute;top:100px;left:50px'>
      删除移动图标并关闭地图缩放监听事件
    </el-button>
  </div>
</template>
<script>
    //速度m/s
    var mapData={
        "10":5000,
        "11":4000,
        "12":3000,
        "13":2000,
        "14":1000,
        "15":500
    }
    export default {
        name: "demo",
        props: {},
        data() {
            return {
                id: "map",
                type: "vue",
                config: window.defaultMapConfig,
                movingMarkerLayer:null,
            }
        },
        components: {
          'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
        },
        methods: {
            addMapZoomTest(){
                //监控地图开始移动事件
                this.$refs.map.onMapEvent("zoomstart", this.onMapZoomStart,"zoomstart");
                //监控地图结束移动事件
                this.$refs.map.onMapEvent("zoomend", this.onMapZoomEnd,"zoomend");
                var latlngs=[
                    [24.487152099609375,118.11126708984375],[24.48577880859375,117.99934387207033],[24.648513793945316,118.03504943847656],[24.666366577148438,118.14971923828124],[24.6478271484375,118.29116821289064],[24.56474304199219,118.30696105957033],[24.45281982421875,118.27949523925783],[24.575042724609375,118.12637329101562]
                ];
                if(typeof (window.polylineTest)=="undefined"){
                    //画线(线只需要一次)
                    this.addPolylineTest(latlngs);
                }
                var zoom = this.$refs.map.getMapZoom();
                console.log("地图级别:", zoom);
                var speed=mapData[zoom];
                //如果找不到速度值，则speed默认为1000
                if(typeof (speed)=="undefined"){
                    if(zoom<10){
                        speed=10000;
                    }else{
                        speed=200;
                    }
                }
                console.log("速度值：",speed);
                //图标移动
                this.addMovingMarkerTest(latlngs,speed);
            },
            addPolylineTest(latlngs) {
                var polylineJSON = {};
                polylineJSON.xys =latlngs;
                //线的样式
                polylineJSON.option = {};
                //线的宽度
                polylineJSON.option.weight = 5;
                //线的颜色
                polylineJSON.option.color = "#f18";
                window.polylineTest = this.$refs.map.addPolyline(polylineJSON);
                console.log("polyline", window.polylineTest);
            },
            onMapZoomStart() {
                if (this.movingMarkerLayer != null) {
                    try {
                        this.$refs.map.removeLayer(this.movingMarkerLayer);
                    }catch(err) {
                        console.log("移动图标不存在");
                        return;
                    }
                }
            },
            onMapZoomEnd() {
                console.log("开始移动图标",this.movingMarkerLayer);
                console.log("移动的线段区间：",this.movingMarkerLayer._currentLine[1]);
                var new_xy=[];
                var newStartPoint=[this.movingMarkerLayer._latlng.lat,this.movingMarkerLayer._latlng.lng];
                console.log("重新开始的移动点：",newStartPoint);
                new_xy.push(newStartPoint);
                var index=this.movingMarkerLayer._latlngs.indexOf(this.movingMarkerLayer._currentLine[1]);
                console.log("开始下标：",index);
                for(var i=index;i<this.movingMarkerLayer._latlngs.length;i++){
                    var arrTemp=[this.movingMarkerLayer._latlngs[i].lat,this.movingMarkerLayer._latlngs[i].lng];
                    new_xy.push(arrTemp);
                }
                var zoom = this.$refs.map.getMapZoom();
                console.log("地图级别:", zoom);
                var new_speed=mapData[zoom];
                //如果找不到速度值，则speed默认为1000
                if(typeof (new_speed)=="undefined"){
                    if(zoom<10){
                        new_speed=10000;
                    }else{
                        new_speed=200;
                    }
                }
                console.log("新速度值：",new_speed);
                this.addMovingMarkerTest(new_xy,new_speed);
            },
            addMovingMarkerTest(latlngs,speed) {
                var movingMarkerJson = {};
                //图标移动路线点
                movingMarkerJson.xys = latlngs;
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
                movingMarkerJson.speed = speed;//单位：米/秒
                //移动图标移动到点的时候是否弹出气泡框
                movingMarkerJson.movingMarkerShowPopup = false;
                //移动是否居中
                movingMarkerJson.movingMarker = false;

                //注意：所有点尾巴，固定长度，固定点数只能有一个为true
                //(1)展示所有点尾巴
                movingMarkerJson.showPolyline_flag = false;
                //是否展示尾巴(固定长度)
                movingMarkerJson.showTail_flag = false;
                //是否展示尾巴(固定点数)
                movingMarkerJson.showTailByPoint_flag = false;
                //是否展示尾巴(固定点数值，当showTailByPoint_flag时必须设置该值)
                movingMarkerJson.tailPoint = 5;
                //移动到最后面是否删除
                movingMarkerJson.movingMarkerEndRemoveFlag = true;
                this.movingMarkerLayer = this.$refs.map.addMovingMarker(movingMarkerJson);
                console.log("movingMarkerLayer:", this.movingMarkerLayer);

            },
            remove(){
                if(this.movingMarkerLayer!=null){
                    this.$refs.map.removeLayer(this.movingMarkerLayer);
                    this.movingMarkerLayer=null;
                }

                //移除监控地图开始移动事件
                this.$refs.map.offMapEvent("zoomstart", this.onMapZoomStart,"zoomstart");
                //移除监控地图开始移动事件
                this.$refs.map.offMapEvent("zoomend", this.onMapZoomEnd,"zoomend");
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
