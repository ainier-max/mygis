<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addPolylineTest();' style='z-index:1000;position:absolute;top:50px;left:50px'>
      添加polyline
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
                //config: window.minemapConfig
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
                //是否开启可拖动设置(有需要开启拖动,在使用该参数)
                polylineJSON.option.draggable = true;
                var polyline = this.$refs.map.addPolyline(polylineJSON);
                console.log("polyline", polyline);
                //polyline.dragging.enable();//开启可拖动
                //polyline.dragging.disable();//关闭可拖动
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
