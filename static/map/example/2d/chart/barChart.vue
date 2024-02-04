<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addDivTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>添加柱状图
    </el-button>
    <el-button type="primary" @click='removeDivTest();' style='z-index:1000;position:absolute;top:100px;left:50px'>
      移除柱状图
    </el-button>
  </div>
</template>
<script>
    window.peoplePhotoLayer = null;
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
            addDivTest() {
                if (window.peoplePhotoLayer != null) {
                    this.removeDivTest();
                }
                var divJson2 = {};
                //xy坐标
                divJson2.xy = [24.472422570142833, 118.10471659369913];
                divJson2.option = {};
                divJson2.option.iconAnchor = [150, 100];
                var html = "";
                html += '<div id="bar_echart" style="height:200px;width:300px"></div>';
                divJson2.option.html = html;
                window.peoplePhotoLayer = this.$refs.map.addDiv(divJson2);

                var myChart = echarts.init(document.getElementById('bar_echart'));
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['精神病', '前科', '涉稳', '涉毒', '上访'],
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#333333',  //更改坐标轴文字颜色
                                    fontSize: 12      //更改坐标轴文字大小
                                }
                            },
                        }
                    ],
                    yAxis: {
                        show: true,
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        // axisTick: {
                        //   show: false
                        // },
                        // axisLabel: {
                        //   show: false
                        // },
                    },
                    series: [
                        {
                            name: '人数',
                            type: 'bar',
                            barWidth: '60%',
                            data: [150, 240, 200, 334, 390]
                        }
                    ]
                };
                myChart.setOption(option);
            },
            removeDivTest() {
                console.log(window.peoplePhotoLayer);
                this.$refs.map.removeLayer(window.peoplePhotoLayer);
                window.peoplePhotoLayer = null;
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
