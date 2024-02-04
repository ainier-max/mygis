<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addRectTest();' style='z-index:1000;position:absolute;top:50px;left:50px'>添加Rect
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
                //是否开启可拖动设置(有需要开启拖动,在使用该参数)
                rectJson.option.draggable = true;
                var rect = this.$refs.map.addRect(rectJson);
                console.log("rect:", rect);
                //rect.dragging.enable();//开启可拖动
                //rect.dragging.disable();//关闭可拖动
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
