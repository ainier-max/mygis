<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addRectTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>
      编辑测试多边形
    </el-button>
    <el-button type="primary" @click='startEditRectTest();' style='z-index:1000;position:absolute;top:100px;left:50px'>
      进入编辑
    </el-button>
    <el-button type="primary" @click='endEditRectTest();' style='z-index:1000;position:absolute;top:150px;left:50px'>
      结束编辑
    </el-button>

    <el-input type="textarea" :rows="5"
              id="zbz" placeholder="矩形坐标串"
              style='z-index:1000;position:absolute;top:200px;left:60px;width: 350px'></el-input>
  </div>
</template>
<script>
    window.editRect = null;
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
            addRectTest() {
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
                window.editRect = this.$refs.map.addRect(rectJson);
            },
            startEditRectTest() {
                console.log("矩形进入编辑模式");
                this.$refs.map.startEditRect(window.editRect);
                document.getElementById("zbz").value = window.editRect.zbc;
            },
            endEditRectTest() {
                console.log("矩形结束编辑模式");
                var newRect = this.$refs.map.endEditRect(window.editRect);
                document.getElementById("zbz").value = newRect.zbc;
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
