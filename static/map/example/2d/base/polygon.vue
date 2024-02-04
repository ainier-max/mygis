<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addPolygonTest();' style='z-index:1000;position:absolute;top:50px;left:50px'>
      添加polygon
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
            addPolygonTest() {
                var polygonJSON = {};
                polygonJSON.xys = [[
                    [24.523887634277347, 118.14130783081056],
                    [24.49127197265625, 118.14302444458008],
                    [24.494361877441406, 118.16774368286133],
                    [24.517192840576172, 118.16619873046874],
                    [24.523887634277347, 118.14130783081056],
                ]];
                //面的样式
                polygonJSON.option = {};
                //边界线大小(四维图形接口宽度不生效)
                polygonJSON.option.weight = 5;
                //边界线颜色
                polygonJSON.option.color = "#ff0000";
                //填充颜色
                polygonJSON.option.fillColor = "#f18";
                //透明度
                polygonJSON.option.fillOpacity = 0.8;
                //是否开启可拖动设置(有需要开启拖动,在使用该参数)
                polygonJSON.option.draggable = true;
                var polygon = this.$refs.map.addPolygon(polygonJSON);
                console.log("polygon", polygon);
                //polygon.dragging.enable();开启可拖动
                //polygon.dragging.disable();关闭可拖动
                /**
                 * 事件拖动回调方法
                 polygon
                 .on('dragstart', onDragStart)
                 .on('drag',      onDrag)
                 .on('dragend',   onDragEnd);
                 */
                polygon.on('drag',this.onDrag);
                //console.log("新坐标串1111:",polygon.getLatLngs());
            },
            onDrag(e){
              console.log("新坐标串:",e.sourceTarget.getLatLngs());
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
