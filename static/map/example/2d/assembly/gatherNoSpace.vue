<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" :init-position="initPosition" :load-end="loadEndFun" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <seamless-component ref="seamless" id="seamless" style='z-index:1000;position:absolute;top:50px;left:50px;'
                        map-ref="map"
    ></seamless-component>
  </div>
</template>
<script>
    export default {
        name: "demo",
        props: {},
        data() {
            return {
                //地图配置信息（必须）
                id: "map",
                type: "vue",
                config: window.defaultMapConfig,
                //地图初始定位
                initPosition:{
                    level:16,//级别
                    centerPoint:[24.49822425842285,118.1246566772461]//中心点
                },
                //地图加载完成回调方法
                loadEndFun:"vueloadEnd"
            }
        },
        components: {
            //后端
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
            'seamless-component': httpVueLoader('../../static/map/vue-map-component/tools/seamless-component.vue', 'frontEnd')
        },
        methods: {
            vueloadEnd() {
                console.log("vue地图初始化完成,地图对象:",this.$refs.map.map);
                var obj = document.getElementById(this.id);
                var the=this;
                window.mapResizeErd.listenTo(obj, function (element) {
                  the.$refs.map.map._onResize();
                });

                var sqs=[];
                //江华社区
                var jhsq={};
                //唯一建码
                jhsq.dm="1001";
                //坐标
                jhsq.zbc=[
                    [24.50148582458489, 118.1213521957401],
                    [24.492301940917898, 118.12324047088659],
                    [24.493589401245046, 118.12521457672155],
                    [24.494791030883718, 118.127102851868],
                    [24.49702262878411, 118.12744617462192],
                    [24.499554634094167, 118.12778949737582],
                    [24.50247287750237, 118.12813282012974],
                    [24.50268745422356, 118.12500000000034]
                ];
                sqs.push(jhsq);
                //江头社区
                var jtsq={};
                jtsq.dm="1002";
                jtsq.zbc=[
                    [24.501914978027415,118.13315391540493],
                    [24.50247287750237,118.12813282012974],
                    [24.499554634094167,118.12778949737582],
                    [24.49702262878411,118.12744617462192],
                    [24.494791030883718,118.127102851868],
                    [24.495112895965647,118.13218832015957]
                ];
                sqs.push(jtsq);

                if (typeof (this.$refs.seamless) == "undefined") {
                    window.setTimeout(this.vueloadEnd, 500);
                } else {
                    //console.log("地图对象，",map);
                    //采集一个新区域后，请重新调用该方法
                    this.$refs.seamless.init(sqs,"getDatas");
                }
            },
            //该回调方法必须是调用无缝采集组件的方法
            getDatas(polygons){
                console.log("采集区域的所有对象:",polygons);
                for(var i=0;i<polygons.length;i++){
                    //console.log("区域对象坐标数据:"+i,polygons[i].indexs);
                    var zbc="";
                    for(var j=0;j<polygons[i].indexs.length;j++){
                        var index=polygons[i].indexs[j];
                        zbc=zbc+"["+index.xy[0]+","+index.xy[1]+"]"+",";
                    }
                    if(i==polygons.length-1){
                        console.log("新采集区域对象坐标串:",zbc);
                    }
                }
            },

        },
        mounted: function () {

        }
    }
</script>

<style>

</style>
