<template>
  <div>
    <!--地图组件-->
    <map-component ref="map" :id="id" :type="type" :config="config" :init-position="initPosition" :load-end="loadEndFun" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
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
                config: window.fangzhengMapConfig,
                //地图初始定位
                initPosition:{
                    level:12,//级别
                    centerPoint:[24.49822425842285,118.1246566772461]//中心点
                },
                //地图加载完成回调方法
                loadEndFun:"vueloadEnd"
            }
        },
        components: {
            //后端
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
        },
        methods: {
            //地图大小变化时，导致地图无法加载全的解决方法如下：
            //插件安装：npm install element-resize-detector
            //第一步：import elementResizeDetectorMaker from 'element-resize-detector'
            //第二步：window.mapResizeErd = elementResizeDetectorMaker();
            //第三步：如下代码（监听id为map的元素大小变化）
            vueloadEnd() {
                console.log("vue地图初始化完成,地图对象:",this.$refs.map.map);
                var obj = document.getElementById(this.id);
                var the=this;
                window.mapResizeErd.listenTo(obj, function (element) {
                    the.$refs.map.map._onResize();
                });
            },
        }
    }
</script>

<style>

</style>
