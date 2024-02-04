<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <!-- api组件 -->
    <api-component ref="api" :id="apiid" :axios="axios"></api-component>
    <input id="keyword" value="厦门市" placeholder="请输入中文关键字"
           style='z-index:1000;position:absolute;top:50px;left:50px;width: 200px;height: 35px'>
    <el-button type="primary" @click='drawPolygonTest()' style='z-index:1000;position:absolute;top:100px;left:50px'>
      面采集
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
            drawPolygonTest() {
                console.log("采集面");
                this.$refs.map.drawPolygon(this.polygonReceiver);
            },
            polygonReceiver(polygonObj) {
                console.log("上图的对象", polygonObj);
                console.log("获取的坐标：", polygonObj.zbc);
                var keyword = document.getElementById("keyword").value;
                var param = {};
                //350203:思明区;350206:湖里区
                param.regioncode = "350203,350206";
                param.type = "101005,101007";
                param.keyword = keyword;
                param.count = "10";
                param.points = [polygonObj.zbc];//多边形是数组格式
                this.$refs.api.spacePolygon(param, this.spacePolygonCallBack);
            },
            spacePolygonCallBack(resp) {
                //结果上图
                var result = resp.data[0].objects;
                console.log("多边形空间查结果", result);
                for (var i = 0; i < result.length; i++) {
                    var markerJSON = {};
                    markerJSON.xy = [Number(result[i].lat), Number(result[i].lng)];
                    markerJSON.iconUrl = "../../static/map/example/images/blue.png";
                    markerJSON.iconAnchor = [16, 16];
                    markerJSON.width = 32;
                    markerJSON.height = 32;
                    var marker = this.$refs.map.addMarker(markerJSON);
                    marker.html = "<div>地址：" + result[i].address + "</div>";
                    this.$refs.map.bindPopup(marker);
                }
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
