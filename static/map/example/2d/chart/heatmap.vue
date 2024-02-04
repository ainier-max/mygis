<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click='addHeatMapTest' style='z-index:1000;position:absolute;top:50px;left:60px'>热力
    </el-button>

    <el-button type="primary" @click='removeHeatMapTest' style='z-index:1000;position:absolute;top:100px;left:50px'>删除热力图
    </el-button>
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
                config: window.defaultMapConfig,
                heatPoints:[],
                heatmap:null
            }
        },
        components: {
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
        },
        methods: {
            addHeatMapTest() {
                for (var i = 0; i < 2000; i++) {
                    var zby = 24.44 + Math.random() * 0.10;
                    var zbx = 118.08 + Math.random() * 0.10;
                    var value=Math.floor(Math.random() * 100);
                    this.heatPoints.push([zby, zbx,value]);
                }
                for (var i = 0; i < 100; i++) {
                    var zby = 24.45 + Math.random() * 0.01;
                    var zbx = 118.08 + Math.random() * 0.01;
                    var value=Math.floor(Math.random() * 100);
                    this.heatPoints.push([zby, zbx,value]);
                }
                for (var i = 0; i < 300; i++) {
                    var zby = 24.47 + Math.random() * 0.02;
                    var zbx = 118.12 + Math.random() * 0.02;
                    var value=Math.floor(Math.random() * 100);
                    this.heatPoints.push([zby, zbx,value]);
                }
                //聚合半径
                option = {
                    //像素为单位，热力半径（热力根据级别设计监控）
                    max:50,
                    radius: 10,//单位像素
                    maxZoom:15,
                    gradient: {0.2:"white",0.4: "blue", 0.6: "cyan", 0.7: "lime", 0.8: "yellow", 1: "red"},
                    //显示范围
                    showRadius:200,//单位米
                };
                console.log("heatPoints",this.heatPoints);
                this.heatmap = this.$refs.map.addHeatMap(this.heatPoints, option);
                console.log("热力", this.heatmap);
                this.$refs.map.onMapEvent('click', this.heatMapCallback,'heatmap');
            },
            heatMapCallback(e){
                console.log("e11:",e);
                var count=0;
                for(var i=0;i<this.heatPoints.length;i++){
                    var flag=this.pointlnCicle(this.heatPoints[i][1],this.heatPoints[i][0],e.latlng.lng,e.latlng.lat,option.showRadius);
                    if(flag==true){
                        count=count+this.heatPoints[i][2];
                    }
                }
                var popupOption={className: 'custom',minWidth:20};
                var point=[e.latlng.lat,e.latlng.lng];
                this.$refs.map.addPopup(popupOption,point,"周边200米总量："+count);
            },
            pointlnCicle(x1,y1,x2,y2,r){
                var radiusMeter=r/(1000*101.11);
                var xdi=x2-x1;
                var ydi=y2-y1;
                //console.log("radiusMeter",radiusMeter);
                if(Math.pow((xdi*xdi+ydi*ydi),0.5)<radiusMeter){
                    return true;
                }else{
                    return false;
                }
            },
            removeHeatMapTest(){
                //移除热力图
                this.$refs.map.removeLayer(this.heatmap);
                //移除地图事件
                this.$refs.map.offMapEvent('click',this.heatMapCallback,'heatmap');
                //关闭所有气泡框
                this.$refs.map.map.closePopup();
                this.heatmap=null;
                this.heatPoints=[];
            }
        },
        mounted: function () {

        },
    }
</script>

<style>

</style>
