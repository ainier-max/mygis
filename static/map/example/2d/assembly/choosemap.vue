<template>
  <div>
    <map-component ref="map" :id="mapid" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <choose-component ref="choosemapid" id="choosemapid"
                      :map-ref="mapid" :choose-map-config="myChooseMapConfig"
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
                mapid: "map",
                type: "vue",
                config: window.defaultMapConfig,
                myChooseMapConfig: window.gisConfig.chooseMapConfig
            }
        },
        components: {
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
            'choose-component': httpVueLoader('../../static/map/vue-map-component/tools/choose-component.vue', 'frontEnd'),
        },
        methods: {},
        mounted: function () {
        },
    }
</script>

<style>

</style>
