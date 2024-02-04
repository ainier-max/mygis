<template>
  <div>
    <map-component ref="map" :id="id" :type="type" :config="config" style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>
    <el-button type="primary" @click="addPopupTest" style='z-index:1000;position:absolute;top:50px;left:60px'>添加marker
    </el-button>
    <el-button type="primary" @click='deleteMarkerTest' style='z-index:1000;position:absolute;top:100px;left:50px'>
      删除marker(含删除气泡框)
    </el-button>

    <div v-show="popupFlag" ref="popupRef" style="width: 100px;height: 60px">
      <span>名称:{{name}}</span><br>
      <span>地址:{{address}}</span><br>
      <el-button type="primary" size="mini" @click="showPopup">查询</el-button>
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
                config: window.defaultMapConfig,
                showFlag: false,
                testData: [
                    {name: '七天旅馆', address: '中山路35号', lat: 24.523887634277347, lng: 118.14130783081056},
                    {name: '王者网吧', address: '新华路112号', lat: 24.517192840576172, lng: 118.16619873046874}
                ],

                popupFlag:false,
                name: '',
                address: '',
                //当前气泡框所显示的对象数据
                currentObj:null,

                removeMarkers:[],
            }
        },
        components: {
            'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd')
        },
        methods: {
            addPopupTest() {
                for (var i = 0; i < this.testData.length; i++) {
                    //气泡框引用html
                    var markerJSON = {};
                    //xy坐标
                    markerJSON.xy = [this.testData[i].lat, this.testData[i].lng];
                    //绝对路径
                    markerJSON.iconUrl = "./static/map/example/images/poi.png";
                    //图片偏移（坐标固定在图标的哪个点，[0,0]表示图标的左上角）
                    markerJSON.iconAnchor = [21, 17];
                    //图片大小
                    markerJSON.width = 42;
                    markerJSON.height = 34;
                    var marker = this.$refs.map.addMarker(markerJSON);
                    //绑定气泡框内容
                    var valueParam = JSON.stringify(this.testData[i]);
                    //内容绑定
                    marker.obj=this.testData[i];
                    this.$refs.map.onLayerEvent("click",marker, this.markerClickEventCallBack);
                    this.removeMarkers.push(marker);
                }
            },
            markerClickEventCallBack(e){
                //气泡框div变成显示
                this.popupFlag=true;
                console.log("图层点击事件回调对象：", e.target);
                this.currentObj=e.target.obj;
                this.name=this.currentObj.name;
                this.address=this.currentObj.address;
                var option={closeOnClick: false, closeButton: true,offset: [0, 0],minWidth:100};
                var point=[this.currentObj.lat,this.currentObj.lng];
                var html=this.$refs.popupRef;
                this.$refs.map.addPopup(option,point,html);
            },
            showPopup() {
                alert("气泡框按钮点击获得对象坐标信息:("+this.currentObj.lat+","+this.currentObj.lng+")");
                console.log("查询按钮点击获得的对象数据:", this.currentObj);
            },
            /**
             * 删除图层
             */
            deleteMarkerTest(){
                for(var i=0;i<this.removeMarkers.length;i++){
                    this.$refs.map.removeLayer(this.removeMarkers[i]);
                }
                this.$refs.map.closeAllPopup();
            },
        },
        mounted: function () {
            //气泡框内容拼接html，绑定事件的时候才需要使用以下方法
            //将气泡框的showPopup方法绑定到window下面，提供给外部调用
            // var the = this;
            // window['showPopup'] = (valueParam) => {
            //     the.showPopup(valueParam);
            // }
        },
    }
</script>

<style>

</style>
