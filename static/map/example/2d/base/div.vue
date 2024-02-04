<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config"
                   style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>

    <div ref="peoplePhoto" v-if="showFlag">
      <img src="../../static/map/example/images/people.png" width="40px;" height="40px"
           style="border-radius:40px;border-style:solid;border-color:red">
      <div class="peoplePhoto-box"></div>
    </div>

    <el-button type="primary" @click='addDivTest();' style='z-index:1000;position:absolute;top:50px;left:50px'>添加div
    </el-button>
  </div>
</template>
<script>
export default {
  name: "demo",
  props: {},
  data() {
    return {
      showFlag: false,
      id: "map",
      type: "vue",
      config: window.defaultMapConfig
    }
  },
  components: {
    'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
  },
  methods: {
    addDivTest() {
      this.showFlag = true;
      let the=this;
      this.$nextTick(()=>{
        let divJson2 = {};
        //xy坐标
        divJson2.xy = [24.492422570142833, 118.10471659369913];
        divJson2.option = {};
        divJson2.option.iconAnchor = [23, 54];
        divJson2.option.html = this.$refs.peoplePhoto;
        // var html = "";
        // html += '<div>'
        // html += '<img src="../../static/map/example/images/people.png" width="40px;" height="40px" style="border-radius:40px;border-style:solid;border-color:red">'
        // html += '<div class="peoplePhoto-box"></div>'
        // html += '</div>'
        //divJson2.option.html = html;
        let peoplePhotoLayer = the.$refs.map.addDiv(divJson2);

      });

    }
  },
  mounted: function () {

  },
}
</script>

<style>
.peoplePhoto-box {
  width: 0;
  height: 0;
  margin-left: 13px;
  margin-top: -7px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid red;
}
</style>
