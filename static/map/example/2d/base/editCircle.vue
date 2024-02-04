<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addCircleTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>
      编辑测试圆
    </el-button>
    <el-button type="primary" @click='startEditCircleTest();'
               style='z-index:1000;position:absolute;top:100px;left:50px'>进入编辑
    </el-button>
    <el-button type="primary" @click='endEditCircleTest();' style='z-index:1000;position:absolute;top:150px;left:50px'>
      结束编辑
    </el-button>
    <el-input type="textarea" :rows="1"
              id="radius" placeholder="半径"
              style='z-index:1000;position:absolute;top:200px;left:60px;width: 350px'></el-input>
    <el-input type="textarea" :rows="1"
              id="centerPoint" placeholder="圆心"
              style='z-index:1000;position:absolute;top:250px;left:60px;width: 350px'></el-input>
  </div>
</template>
<script>
    window.editCircle = null;
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
            addCircleTest() {
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
                window.editCircle = this.$refs.map.addCircle(circleJson);
            },
            startEditCircleTest() {
                console.log("圆形进入编辑模式");
                this.$refs.map.startEditCircle(window.editCircle);
                document.getElementById("radius").value = window.editCircle.radius;
                document.getElementById("centerPoint").value = window.editCircle.centerPoint;
            },
            endEditCircleTest() {
                console.log("圆形结束编辑模式");
                var newCircle = this.$refs.map.endEditCircle(window.editCircle);
                document.getElementById("radius").value = newCircle.radius;
                document.getElementById("centerPoint").value = newCircle.centerPoint;
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
