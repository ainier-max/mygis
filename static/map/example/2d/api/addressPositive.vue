<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <api-component ref="api" :id="apiid" :axios="axios"></api-component>
    <input id="keyword" value="厦门市" placeholder="请输入中文关键字"
           style='z-index:1000;position:absolute;top:50px;left:50px;width: 200px;height: 35px'>
    <el-button type="primary" @click='addressPositiveTest();'
               style='z-index:1000;position:absolute;top:50px;left:270px'>正向匹配
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
            'api-component': httpVueLoader('../../static/map/vue-map-component/tools/api-component.vue', 'frontEnd'),
        },
        methods: {
            addressPositiveTest() {
                var keyword = document.getElementById("keyword").value;
                var param = {};
                //350203:思明区;350206:湖里区
                param.regioncode = "350203,350206";
                param.type = "101005,101007";
                param.keyword = keyword;
                param.count = "10";
                this.$refs.api.addressPositive(param, this.addressPositiveCB);
            },
            addressPositiveCB(resp) {
                //结果上图
                var result = resp.data[0].objects;
                console.log("正向匹配结果", result);
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
                    marker.html = "<div>地址：" + result[i].fullname + "</div>";
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
