<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addPolylineTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>
      编辑测试线
    </el-button>
    <el-button type="primary" @click='startEditPolylineTest();'
               style='z-index:1000;position:absolute;top:100px;left:50px'>进入编辑
    </el-button>
    <el-button type="primary" @click='endEditPolylineTest();'
               style='z-index:1000;position:absolute;top:150px;left:50px'>结束编辑
    </el-button>

    <el-input type="textarea" :rows="5"
              id="zbz" placeholder="线坐标串"
              style='z-index:1000;position:absolute;top:200px;left:60px;width: 350px'></el-input>
  </div>
</template>
<script>
    window.editPolyline = null;
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
            addPolylineTest() {
                var polylineJSON = {};
                polylineJSON.xys = [
                    [24.523887634277347, 118.14130783081056],
                    [24.49127197265625, 118.14302444458008],
                    [24.494361877441406, 118.16774368286133],
                    [24.517192840576172, 118.16619873046874]
                ];
                //线的样式
                polylineJSON.option = {};
                //线的宽度
                polylineJSON.option.weight = 5;
                //线的颜色
                polylineJSON.option.color = "#f18";
                window.editPolyline = this.$refs.map.addPolyline(polylineJSON);
            },
            startEditPolylineTest() {
                console.log("线进入编辑模式");
                this.$refs.map.startEditPolyline(window.editPolyline);
                document.getElementById("zbz").value = window.editPolyline.zbc;
            },
            endEditPolylineTest() {
                console.log("线结束编辑模式");
                var newPolyline = this.$refs.map.endEditPolyline(window.editPolyline);
                document.getElementById("zbz").value = newPolyline.zbc;
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
