<template>
  <div>
    <!--地图组件-->
    <map-component ref="map" :id="id" :type="type" :config="config" :load-end="loadEndFun" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" disabled style='z-index:1000;position:absolute;top:50px;left:50px'>
      mounted自动添加marker
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
                loadEndFun:"addMarkerTest"
            }
        },
        components: {
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
        },
        methods: {
            addMarkerTest() {
                var markerJSON = {};
                //xy坐标
                markerJSON.xy = [24.502422570142833, 118.15471659369913];
                //图片位置
                markerJSON.iconUrl = "../../static/map/example/images/poi.png";
                //图片偏移（坐标固定在图标的哪个点，[0,0]表示图标的左上角）
                markerJSON.iconAnchor = [21, 17];
                //图片大小
                markerJSON.width = 42;
                markerJSON.height = 34;
                //是否开启可拖动设置(有需要开启拖动,在使用该参数)
                markerJSON.option={};
                markerJSON.option.draggable = true;
                var marker = this.$refs.map.addMarker(markerJSON);
                console.log("图标对象1", marker);
                //关闭可拖动
                //window.marker1.dragging.disable();
            }
        },
        mounted: function () {
        },
    }
</script>

<style>

</style>
