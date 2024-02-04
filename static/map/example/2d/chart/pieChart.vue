<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addDivTest();' style='z-index:1000;position:absolute;top:50px;left:60px'>添加饼图
    </el-button>
    <el-button type="primary" @click='removeDivTest();' style='z-index:1000;position:absolute;top:100px;left:50px'>
      移除饼图
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
                divJson2.option.iconAnchor = [100, 100];
                //divJson2.option.html=this.$refs.peoplePhoto;
                var html = "";
                html += '<div id="pie_echart" style="height:200px;width:200px"></div>';
                divJson2.option.html = html;
                window.peoplePhotoLayer = this.$refs.map.addDiv(divJson2);

                var myChart = echarts.init(document.getElementById('pie_echart'));
                var data = {
                    seriesData: [
                        {name: "精神病人员", value: 3427},
                        {name: "前科人员", value: 1545},
                        {name: "涉稳人员", value: 674},
                        {name: "涉毒人员", value: 876},
                        {name: "上访人员", value: 3244},
                    ]
                }
                var pie_option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    series: [
                        {
                            name: '厦门市思明区',
                            type: 'pie',
                            radius: '50%',
                            center: ['50%', '50%'],
                            label: {
                                normal: {
                                    show: false,
                                },
                                emphasis: {
                                    show: false,
                                }
                            },
                            data: data.seriesData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                myChart.setOption(pie_option);
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
