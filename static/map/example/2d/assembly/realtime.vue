<template>
  <div>
    <map-component ref="map" :id="mapid" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <!--realtime：实时时间设置,超过则表示离线（单位S）-->
    <realtime-component ref="realtime" id="realtime"
                        :real-time="300"
                        :map-ref="mapid"
    ></realtime-component>
    <el-button type="primary" @click='openRealTimeTest' style='z-index:1000;position:absolute;top:50px;left:60px'>
      开启实时组件
    </el-button>
    <el-button type="primary" @click='closeRealTimeTest' style='z-index:1000;position:absolute;top:100px;left:50px'>
      关闭实时组件
    </el-button>
    <el-button type="primary" @click='addDataTest' style='z-index:1000;position:absolute;top:150px;left:50px'>添加一个设备
    </el-button>
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
                axios: axios,
                realObjects: [],
                testid: 5
            }
        },
        components: {
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
            'realtime-component': httpVueLoader('../../static/map/vue-map-component/tools/realtime-component.vue', 'frontEnd')
        },
        methods: {
            openRealTimeTest() {
                this.closeRealTimeTest();
                this.realObjects = [
                    {"id": "1", "name": "闽D443HK", "x": 118.16585540771484, "y": 24.479598999023438},
                    {"id": "2", "name": "闽D542FJ", "x": 118.14471659369913, "y": 24.522422570142833},
                    {"id": "3", "name": "闽D652FJ", "x": 118.14471659369913, "y": 24.492422570142833},
                    {"id": "4", "name": "闽D61112", "x": 118.10471659369913, "y": 24.522422570142833},
                    {"id": "5", "name": "闽D5FGGJ", "x": 118.08757781982422, "y": 24.469985961914062}
                ];
                window.realtimeInterval = window.setInterval(this.setParam, 2000);
                this.$refs.realtime.open(this.realObjects);
            },
            addDataTest() {
                this.testid = this.testid + 1;
                //模拟坐标
                var zby = 24.44 + Math.random() * 0.10;
                var zbx = 118.08 + Math.random() * 0.10;
                var obj = {"id": this.testid, "name": "闽D443H" + this.testid, "x": zbx, "y": zby}
                this.realObjects.push(obj);
            },
            closeRealTimeTest() {
                this.realObjects = [];
                if (typeof (window.realtimeInterval) != "undefined") {
                    window.clearInterval(window.realtimeInterval);
                }
                this.$refs.realtime.close();
            },
            //模拟坐标数据变化
            setParam() {
                for (var i = 0; i < this.realObjects.length; i++) {
                    var random1 = Math.random() * 0.003;
                    var random2 = Math.random() * 0.003;
                    var random3 = Math.random() * 0.003;
                    //console.log(random1,random2,random3);
                    this.realObjects[i].x = this.realObjects[i].x + (random1 - random2);
                    this.realObjects[i].y = this.realObjects[i].y + (random1 - random3);
                }
            }
        },
        updated: function () {

        },
    }
</script>

<style>

</style>
