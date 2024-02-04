<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <!-- api组件 -->
    <api-component ref="api" :id="apiid" :axios="axios"></api-component>
    <input id="keyword" value="厦门市" placeholder="请输入中文关键字"
           style='z-index:1000;position:absolute;top:50px;left:50px;width: 200px;height: 35px'>
    <el-button type="primary" @click='drawMarkerTest();' style='z-index:1000;position:absolute;top:100px;left:50px'>
      坐标采集
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
            drawMarkerTest() {
                //采集点图标
                var markerJSON = {};
                //绝对路径
                markerJSON.iconUrl = "../../static/map/example/images/marker-icon.png";
                //图片偏移（坐标固定在图标的哪个点，[0,0]表示图标的左上角）
                markerJSON.iconAnchor = [21, 42];
                //图片大小
                markerJSON.width = 42;
                markerJSON.height = 42;
                var dragFlag = false;//是否可移动,仅适用于leaflet开发技术，minemap不生效
                this.$refs.map.drawMarker(markerJSON, dragFlag, this.markerReceiver);
            },
            markerReceiver(markerObj) {
                console.log("上图的对象", markerObj);
                console.log("采集坐标：", markerObj.xy);
                var param = {};
                //350203:思明区;350206:湖里区
                param.regioncode = "350203,350206";
                param.type = "101005,101007";
                param.lat = markerObj.xy.lat;
                param.lng = markerObj.xy.lng;
                param.count = "10";
                param.radius = "2000";
                var keyword = document.getElementById("keyword").value;
                param.keyword = keyword;
                //addressPositiveCB:回调方法
                //反向匹配调用
                this.$refs.api.addressReverse(param, this.addressReverseCB);
                //以下代码仅供展示(画圆)
                var circleJson = {};
                //圆心
                circleJson.xy = [param.lat, param.lng];
                circleJson.option = {};
                //圆半径
                circleJson.option.radius = param.radius;//单位米
                //边界线颜色
                circleJson.option.color = "#00BFFF";
                //填充颜色
                circleJson.option.fillColor = "#3388ff";
                //透明度
                circleJson.option.fillOpacity = 0.5;
                var circle = this.$refs.map.addCircle(circleJson);
                console.log("circle", circle);
            },
            addressReverseCB(resp) {
                //结果上图
                var result = resp.data[0].objects;
                console.log("反向匹配结果", result);
                for (var i = 0; i < result.length; i++) {
                    var markerJSON = {};
                    //xy坐标
                    markerJSON.xy = [Number(result[i].lat), Number(result[i].lng)];
                    //绝对路径
                    markerJSON.iconUrl = "../../static/map/example/images/blue.png";
                    //图片偏移（坐标固定在图标的哪个点，[0,0]表示图标的左上角）
                    markerJSON.iconAnchor = [16, 16];
                    //图片大小
                    markerJSON.width = 32;
                    markerJSON.height = 32;
                    var marker = this.$refs.map.addMarker(markerJSON);
                    //绑定气泡框内容
                    var html = "<div>序号：" + i + "</div>";
                    html += "<div>地址：" + result[i].address + "</div>";
                    marker.html = html;
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
