<template>
  <div>
    <map-component ref="map" :id="id" :type="type" v-show="showflag" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='centerTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>单点居中
    </el-button>
    <el-button type="primary" @click='zoomTest();' style='z-index:1000;position:absolute;top:100px;left:50px'>级别缩放
    </el-button>
    <el-button type="primary" @click='zoomAndCenterTest();' style='z-index:1000;position:absolute;top:150px;left:50px'>
      缩放并居中
    </el-button>

    <el-button type="primary" @click='showMapTest();' style='z-index:1000;position:absolute;top:200px;left:50px'>显示地图
    </el-button>
    <el-button type="primary" @click='hideMapTest();' style='z-index:1000;position:absolute;top:250px;left:50px'>隐藏地图
    </el-button>
    <el-button type="primary" @click='initMapTest();' style='z-index:1000;position:absolute;top:300px;left:50px'>重新初始化
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
                config: window.defaultMapConfig,
                //config: window.minemapConfig,
                showflag: true
            }
        },
        components: {
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
        },
        methods: {
            centerTest() {
                var markerJSON = {};
                //xy坐标
                markerJSON.xy = [24.422422570142833, 118.11471659369913];
                //绝对路径
                markerJSON.iconUrl = "../../static/map/example/images/poi.png";
                //图片偏移（坐标固定在图标的哪个点，[0,0]表示图标的左上角）
                markerJSON.iconAnchor = [21, 17];
                //图片大小
                markerJSON.width = 42;
                markerJSON.height = 34;
                var marker = this.$refs.map.addMarker(markerJSON);
                console.log("图标对象", marker);
                this.$refs.map.panTo([24.422422570142833, 118.11471659369913]);
            },
            zoomTest() {
                this.$refs.map.zoomTo(14);
            },
            zoomAndCenterTest() {
                this.$refs.map.setView([24.422422570142833, 118.11471659369913], 14);
            },
            showMapTest() {
                this.showflag = true;
            },
            hideMapTest() {
                this.showflag = false;
            },
            initMapTest() {
                //地图重新初始化
                this.$refs.map.loadMap();
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
