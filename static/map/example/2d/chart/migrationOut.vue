<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='outMigrationTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>
      流出迁徙图
    </el-button>
    <el-button type="primary" @click='clearMigrationTest();' style='z-index:1000;position:absolute;top:100px;left:50px'>
      清除迁徙图
    </el-button>
  </div>
</template>
<script>
    window.pulsingArr = [];
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
            outMigrationTest() {
                this.clearMigrationTest();
                //为方便显示，地图定位到5级别
                this.$refs.map.zoomTo(5);
                //测试数据(点)
                /**
                 * color:波纹点的颜色
                 * label:点显示的内容
                 */
                var fromPoint = [24.489898681640625, 118.11813354492186];
                fromPoint.color = "#E22F2D";
                fromPoint.label = "厦门";
                var toPoint1 = [31.179199218750004, 121.48681640624999];
                toPoint1.color = "#5a36e2";
                toPoint1.label = "上海";
                var toPoint2 = [34.3212890625, 108.896484375];
                toPoint2.color = "#5a36e2";
                toPoint2.label = "西安";
                var toPoint3 = [31.81640625, 117.24609374999999];
                toPoint3.color = "#5a36e2";
                toPoint3.label = "合肥";
                var toPoint4 = [31.047363281250004, 108.6767578125];
                toPoint4.color = "#5a36e2";
                toPoint4.label = "重庆";
                var toPoint5 = [23.02734375, 113.26904296875];
                toPoint5.color = "#5a36e2";
                toPoint5.label = "广州";
                var toPoint6 = [23.73046875, 120.89355468749999];
                toPoint6.color = "#5a36e2";
                toPoint6.label = "高雄";
                //添加波纹点
                this.addPulsingIcon(fromPoint);
                this.addPulsingIcon(toPoint1);
                this.addPulsingIcon(toPoint2);
                this.addPulsingIcon(toPoint3);
                this.addPulsingIcon(toPoint4);
                this.addPulsingIcon(toPoint5);
                this.addPulsingIcon(toPoint6);
                //测试数据(线)
                /**
                 * from:起点
                 * to:终点
                 * count:流出数量
                 * color:线的颜色
                 * @type {Array}
                 */
                var outPolylineData = [];
                outPolylineData.push({
                    "from": fromPoint,
                    "to": toPoint1,
                    "count": Math.ceil(Math.random() * 100),
                    color: "#5a36e2"
                });
                outPolylineData.push({
                    "from": fromPoint,
                    "to": toPoint2,
                    "count": Math.ceil(Math.random() * 100),
                    color: "#5a36e2"
                });
                outPolylineData.push({
                    "from": fromPoint,
                    "to": toPoint3,
                    "count": Math.ceil(Math.random() * 100),
                    color: "#5a36e2"
                });
                outPolylineData.push({
                    "from": fromPoint,
                    "to": toPoint4,
                    "count": Math.ceil(Math.random() * 100),
                    color: "#5a36e2"
                });
                outPolylineData.push({
                    "from": fromPoint,
                    "to": toPoint5,
                    "count": Math.ceil(Math.random() * 100),
                    color: "#5a36e2"
                });
                outPolylineData.push({
                    "from": fromPoint,
                    "to": toPoint6,
                    "count": Math.ceil(Math.random() * 100),
                    color: "#5a36e2"
                });
                this.$refs.map.outMigration(outPolylineData);
            },
            addPulsingIcon(point) {
                var pulseJson = {};
                //xy坐标
                pulseJson.xy = point;
                pulseJson.option = {};
                //波纹大小
                pulseJson.option.iconSize = [5, 5];
                //波纹颜色
                pulseJson.option.color = point.color;
                //波纹圆点颜色
                pulseJson.option.fillColor = point.color;
                //波纹速度（数值越大，速度越慢）
                pulseJson.option.heartbeat = 2;
                //是否显示波纹
                pulseJson.option.animate = true;
                var marker = this.$refs.map.addPulsingIcon(pulseJson);
                window.pulsingArr.push(marker);
            },
            clearMigrationTest() {
                //清空迁徙图
                this.$refs.map.clearMigration();
                //清空波纹点
                for (var i = 0; i < window.pulsingArr.length; i++) {
                    this.$refs.map.removeLayer(window.pulsingArr[i]);
                }
                window.pulsingArr = [];
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
