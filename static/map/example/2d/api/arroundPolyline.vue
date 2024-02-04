<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <!-- api组件 -->
    <api-component ref="api" :id="apiid" :axios="axios"></api-component>
    <input id="keyword" value="厦门市" placeholder="请输入中文关键字"
           style='z-index:1000;position:absolute;top:50px;left:50px;width: 200px;height: 35px'>
    <el-button type="primary" @click='drawPolylineTest();' style='z-index:1000;position:absolute;top:100px;left:50px'>
      线采集
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
                apiid: "api",
                type: "vue",
                config: window.defaultMapConfig,
                axios: window.axios,
            }
        },
        components: {
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
            'api-component': httpVueLoader('../../static/map/vue-map-component/tools/api-component.vue', 'frontEnd')
        },
        methods: {
            drawPolylineTest() {
                this.$refs.map.drawPolyline(this.polylineReceiver);
            },
            polylineReceiver(polylineObj) {
                console.log("上图的对象", polylineObj);
                console.log("获取的坐标：", polylineObj.zbc);
                var keyword = document.getElementById("keyword").value;
                var param = {};
                //350203:思明区;350206:湖里区
                param.regioncode = "350203,350206";
                param.type = "101005,101007";
                param.keyword = keyword;
                param.count = "10";
                param.points = polylineObj.zbc;
                param.radius = "500";//单位米
                this.$refs.api.arroundPolyline(param, this.arroundPolylineCallBack);
            },
            arroundPolylineCallBack(resp) {
                console.log("线周边查询结果：", resp.data[0]);
                var result = resp.data[0].objects;
                var polylineBuffer = resp.data[0].polylineBuffer;
                //缓冲区
                var newPolylineBuffers = new Array();
                for (var j = 0; j < polylineBuffer.length; j++) {
                    newPolylineBuffers.push(polylineBuffer[j])
                }
                var polygonJSON = {};
                polygonJSON.xys = newPolylineBuffers;
                polygonJSON.option = {};
                polygonJSON.option.weight = 1;
                polygonJSON.option.color = "#00BFFF";
                polygonJSON.option.fillColor = "#3388ff";
                polygonJSON.option.fillOpacity = 0.3;
                var polygon = this.$refs.map.addPolygon(polygonJSON);
                console.log("polygon", polygon);
                //结果上图
                for (var i = 0; i < result.length; i++) {
                    for (var j = 0; j < result[i].length; j++) {
                        var markerJSON = {};
                        markerJSON.xy = [Number(result[i][j].lat), Number(result[i][j].lng)];
                        markerJSON.iconUrl = "../../static/map/example/images/blue.png";
                        markerJSON.iconAnchor = [16, 16];
                        markerJSON.width = 32;
                        markerJSON.height = 32;
                        var marker = this.$refs.map.addMarker(markerJSON);
                        marker.html = "<div>地址：" + result[i][j].fullname + "</div>";
                        this.$refs.map.bindPopup(marker);
                    }
                }

            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
