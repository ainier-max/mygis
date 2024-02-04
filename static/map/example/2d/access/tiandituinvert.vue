<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <div style="position:absolute;left:50px;top:50px;z-index: 200;background: white;width: 500px">
      <el-row>
        <el-col :span="8">
          <div style="text-align: left;margin-top:5px;margin-left: 5px;color:#8492a6">反色(invert)</div>
        </el-col>
        <el-col :span="16" align="center">
          <el-slider style="width: 300px" v-model="invertVal"></el-slider>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div style="text-align: left;margin-top:5px;margin-left: 5px;color:#8492a6">灰色(grayscale)</div>
        </el-col>
        <el-col :span="16" align="center">
          <el-slider style="width: 300px" v-model="grayscaleVal"></el-slider>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div style="text-align: left;margin-top:5px;margin-left: 5px;color:#8492a6">亮度(brightness)</div>
        </el-col>
        <el-col :span="16" align="center">
          <el-slider style="width: 300px" v-model="brightnessVal" :max="200"></el-slider>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div style="text-align: left;margin-top:5px;margin-left: 5px;color:#8492a6">对比度(contrast)</div>
        </el-col>
        <el-col :span="16" align="center">
          <el-slider style="width: 300px" v-model="contrastVal" :max="200"></el-slider>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div style="text-align: left;margin-top:5px;margin-left: 5px;color:#8492a6">色相旋转(hue)</div>
        </el-col>
        <el-col :span="16" align="center">
          <el-slider style="width: 300px" v-model="hueVal" :max="360"></el-slider>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div style="text-align: left;margin-top:5px;margin-left: 5px;color:#8492a6">饱和度(saturate)</div>
        </el-col>
        <el-col :span="16" align="center">
          <el-slider style="width: 300px" v-model="saturateVal" :max="800"></el-slider>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div style="text-align: left;margin-top:5px;margin-left: 5px;color:#8492a6">深褐色(sepia)</div>
        </el-col>
        <el-col :span="16" align="center">
          <el-slider style="width: 300px" v-model="sepiaVal" :max="100"></el-slider>
        </el-col>
      </el-row>

      <el-input type="textarea" v-model="stylestr" :rows="2" style='z-index:1000;'></el-input>

    </div>

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
                config: window.tiandituMapConfig,
                stylestr: '',
                invertVal: 0,
                grayscaleVal: 0,
                brightnessVal: 100,
                contrastVal: 100,
                hueVal: 0,
                saturateVal: 100,
                sepiaVal: 0,
            }
        },
        components: {
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
        },
        watch: {
            invertVal: {
                handler(newVal, oldVal) {
                    this.stylestr = "invert(" + newVal + "%) " + "grayscale(" + this.grayscaleVal + "%) brightness(" + this.brightnessVal + "%) contrast(" + this.contrastVal + "%) hue-rotate(" + this.hueVal + "deg) saturate(" + this.saturateVal + "%) sepia(" + this.sepiaVal + "%)";
                    console.log("this.stylestr:", this.stylestr);
                    document.getElementById("map").style.filter = this.stylestr;
                },
                deep: true
            },
            grayscaleVal: {
                handler(newVal, oldVal) {
                    this.stylestr = "invert(" + this.invertVal + "%) " + "grayscale(" + newVal + "%) brightness(" + this.brightnessVal + "%) contrast(" + this.contrastVal + "%) hue-rotate(" + this.hueVal + "deg) saturate(" + this.saturateVal + "%) sepia(" + this.sepiaVal + "%)";
                    console.log("this.stylestr:", this.stylestr);
                    document.getElementById("map").style.filter = this.stylestr;
                },
                deep: true
            },
            brightnessVal: {
                handler(newVal, oldVal) {
                    this.stylestr = "invert(" + this.invertVal + "%) " + "grayscale(" + this.grayscaleVal + "%) brightness(" + newVal + "%) contrast(" + this.contrastVal + "%) hue-rotate(" + this.hueVal + "deg) saturate(" + this.saturateVal + "%) sepia(" + this.sepiaVal + "%)";
                    console.log("this.stylestr:", this.stylestr);
                    document.getElementById("map").style.filter = this.stylestr;
                },
                deep: true
            },
            contrastVal: {
                handler(newVal, oldVal) {
                    this.stylestr = "invert(" + this.invertVal + "%) " + "grayscale(" + this.grayscaleVal + "%) brightness(" + this.brightnessVal + "%) contrast(" + newVal + "%) hue-rotate(" + this.hueVal + "deg) saturate(" + this.saturateVal + "%) sepia(" + this.sepiaVal + "%)";
                    console.log("this.stylestr:", this.stylestr);
                    document.getElementById("map").style.filter = this.stylestr;
                },
                deep: true
            },
            hueVal: {
                handler(newVal, oldVal) {
                    this.stylestr = "invert(" + this.invertVal + "%) " + "grayscale(" + this.grayscaleVal + "%) brightness(" + this.brightnessVal + "%) contrast(" + this.contrastVal + "%) hue-rotate(" + newVal + "deg) saturate(" + this.saturateVal + "%) sepia(" + this.sepiaVal + "%)";
                    console.log("this.stylestr:", this.stylestr);
                    document.getElementById("map").style.filter = this.stylestr;
                },
                deep: true
            },
            saturateVal: {
                handler(newVal, oldVal) {
                    this.stylestr = "invert(" + this.invertVal + "%) " + "grayscale(" + this.grayscaleVal + "%) brightness(" + this.brightnessVal + "%) contrast(" + this.contrastVal + "%) hue-rotate(" + this.hueVal + "deg) saturate(" + newVal + "%) sepia(" + this.sepiaVal + "%)";
                    console.log("this.stylestr:", this.stylestr);
                    document.getElementById("map").style.filter = this.stylestr;
                },
                deep: true
            },
            sepiaVal: {
                handler(newVal, oldVal) {
                    this.stylestr = "invert(" + this.invertVal + "%) " + "grayscale(" + this.grayscaleVal + "%) brightness(" + this.brightnessVal + "%) contrast(" + this.contrastVal + "%) hue-rotate(" + this.hueVal + "deg) saturate(" + this.saturateVal + "%) sepia(" + newVal + "%)";
                    console.log("this.stylestr:", this.stylestr);
                    document.getElementById("map").style.filter = this.stylestr;
                },
                deep: true
            },

        },
        methods: {
            formatBrightness(val) {
                return val * 2;
            }
        },
        updated: function () {
            var the = this;
            window.mapResizeErd.listenTo(document.getElementById("map"), function (element) {
                the.$refs.map.map._onResize();
            });

            this.stylestr = "invert(" + this.invertVal + "%) " + "grayscale(" + this.grayscaleVal + "%) brightness(" + this.brightnessVal + "%) contrast(" + this.contrastVal + "%) hue-rotate(" + this.hueVal + "deg) saturate(" + this.saturateVal + "%) sepia(" + this.sepiaVal + "%)";
        },
    }
</script>

<style>

</style>
