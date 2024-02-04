<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addCircleTest();' style='z-index:1000;position:absolute;top:50px;left:50px'>
      添加circle
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
                circleJson.option.color = "#3388ff";
                //填充颜色
                circleJson.option.fillColor = "#3388ff";
                //透明度
                circleJson.option.fillOpacity = 0.5;
                //是否开启可拖动设置(有需要开启拖动,在使用该参数)
                circleJson.option.draggable = true;
                var circle = this.$refs.map.addCircle(circleJson);
                console.log("circle", circle);
                //circle.dragging.enable();//开启可拖动
                //circle.dragging.disable();//关闭可拖动
                /**
                 * 事件拖动回调方法
                 polygon
                 .on('dragstart', onDragStart)
                 .on('drag',      onDrag)
                 .on('dragend',   onDragEnd);
                 */
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
