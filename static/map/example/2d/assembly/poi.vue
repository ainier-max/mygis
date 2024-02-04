<template>
  <div>
    <!--地图组件-->
    <map-component ref="map" :id="id" :type="type" :config="config"
                   style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <api-component ref="api" :id="apiid" :axios="axios"></api-component>
    <!--POI组件-->
    <!--
    autocomplete：显示智能提示下拉框，默认值false
    poi-suggestion-fetch-count:设置查询条件智能提示下拉框记录数，默认值10
    region-code:默认区域
    word:初始关键字
    total:查询结果最大条数
    map-ref: 地图引用id，指定地图渲染poi组件
    map-api-ref：地图api引用id
    -->
    <poi-component ref="poi" id="poi" style='z-index:1000;position:absolute;top:50px;left:50px;'
                   :map-ref="id"
                   map-api-ref="api"
                   region-code="350200"
                   word=""
                   total="50"
                   :axios="axios"
    ></poi-component>

    <choose-component ref="choosemapid" id="choosemapid"
                      :map-ref="id" :choose-map-config="myChooseMapConfig"
                      style="position: absolute;top:20px;right: 20px;z-index: 200"
    ></choose-component>
  </div>
</template>
<script>
  export default {
    name: "demo",
    props: {},
    data() {
      return {
        id: "map",
        apiid: "api",
        type: "vue",
        config: window.defaultMapConfig,
        axios: axios,
        myChooseMapConfig: window.gisConfig.chooseMapConfig
      }
    },
    components: {
      //后端
      'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
      'api-component': httpVueLoader('../../static/map/vue-map-component/tools/api-component.vue', 'frontEnd'),
      'poi-component': httpVueLoader('../../static/map/vue-map-component/tools/poi-component.vue', 'frontEnd'),
      'choose-component': httpVueLoader('../../static/map/vue-map-component/tools/choose-component.vue', 'frontEnd')
    },
    methods: {
      onResize() {
        var obj = document.getElementById(this.id);
        if (obj != null) {
          var the = this;
          window.mapResizeErd.listenTo(obj, function (element) {
            the.$refs.map.map._onResize();
          });
        } else {
          window.setTimeout(this.onResize, 100);
        }
      }
    },
    mounted: function () {
      this.onResize();
    }
  }
</script>

<style>

</style>
