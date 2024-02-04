<template>
  <div>
    <map-component ref="map" :id="id" :type="type" class="mapClass" :config="config"
                   style='z-index:100;position: absolute;top: 0; bottom: 0;right: 0;left: 0;'></map-component>

    <el-button type="primary" @click='addAllPolyline' style='z-index:1000;position:absolute;top:50px;left:60px'>轨迹上图</el-button>
    <div class="progressTime" id="progressTime" style="z-index:999;overflow-y: hidden;overflow-x: hidden">
      <div style="margin-top:-12px">
        <p id="startTime" style=" float:left;margin-left:33px;margin-top: 10px">2015/06/06 17:49:40</p>
        <p id="endTime" style=" float:right;margin-right:33px;margin-top: 10px">2015/06/07 03:49:40</p>
      </div>
      <div id="progressTime_concent">
        <div id="scrollBar">
          <div style="width: 166px;" id="scroll_Track"></div>
          <div id="scroll_Thumb"></div>
        </div>
        <div style="width:90%; margin-left: auto;margin-right: auto;">
          <!--<img title="减速" style="margin-left:-120px" onclick="speedAdd()" height="25" width="25" src="../../../map/vue-lib/images/20150609102413624_easyicon_net_48.png" />-->
          <div style="float:left;padding-right:30px;margin-left:-120px">
            <span style="font-weight: bold;margin-left: 140px">时间间隔：</span><el-input v-model="input" type="text" id="intervalValueID" @change="onchange" placeholder="" style="padding-top:10px;width: 70px;height: 20px;line-height: 20px" size="mini"></el-input><span style="font-weight: bold"> 秒</span>
          </div>
          <div style="float:left">
            <img style="margin-top:6px;padding-top: 5px;" @click="progressTimeControl" title="开始" id="progressTime_control" height="25" width="25" src="../../static/map/vue-lib/images/20150608024026950_easyicon_net_48.png" />
            <img style="margin-top:6px;padding-top: 5px;"   @click="progressTimeStop" title="停止" id="Img1" height="25" width="25" src="../../static/map/vue-lib/images/2015060807261291_easyicon_net_48.png" />
            <!--          <img title="加速" onclick="speedSubtract()" height="25" width="25" src="../../../map/vue-lib/images/20150609102402854_easyicon_net_48.png" />-->
          </div>
          <div style="width:300px;float:right;margin-right:-60px;margin-top:-12px;font-weight: bold">
            <!--          <p id="TimeSpeed" style="float:left;margin-right:40px;/*display:none*/">×1</p>-->
            <p style="float:left;margin-top: 22px">当前时间:</p>
            <p style="float:left;margin-top: 22px" id="scrollBarTxt"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  var intervalValue=10;
  var _index = 0; //进度
  var _mProgressTimer; //定时器
  var _speed = 1000;
  var myfun; //执行方法，当前时间为参数


  //滑块
  var ScrollBar = {
    value: 0,
    maxValue: 40,
    step: 1,
    currentX: 0,
    Initialize: function () {
      if (this.value > this.maxValue) {
        alert("给定当前值大于了最大值");
        return;
      }
      this.GetValue();
      $("#scroll_Track").css("width", this.currentX + 2 + "px");
      $("#scroll_Thumb").css("margin-left", this.currentX + "px");
      this.Value();
    },
    SetValue: function (aValue) {
      this.value = aValue;
      if (this.value >= this.maxValue) this.value = this.maxValue;
      if (this.value <= 0) this.value = 0;
      var mWidth = this.value / this.maxValue * $("#scrollBar").width() + "px";
      $("#scroll_Track").css("width", mWidth);
      $("#scroll_Thumb").css("margin-left", mWidth);
    },
    Value: function () {
      var valite = false;
      var currentValue;
      $("#scroll_Thumb").mousedown(function () {
        window.clearInterval(_mProgressTimer);
        valite = true;
        $(".progressTime").mousemove(function (event) {
          if (valite == false) return;
          var changeX = event.clientX - ScrollBar.currentX;
          currentValue = changeX - ScrollBar.currentX - $("#scrollBar").offset().left;
          $("#scroll_Thumb").css("margin-left", currentValue + "px");
          $("#scroll_Track").css("width", currentValue + 2 + "px");
          if ((currentValue + 15) >= $("#scrollBar").width()) {
            $("#scroll_Thumb").css("margin-left", $("#scrollBar").width() - 15 + "px");
            $("#scroll_Track").css("width", $("#scrollBar").width() + 2 + "px");
            ScrollBar.value = ScrollBar.maxValue;
          } else if (currentValue <= 0) {
            $("#scroll_Thumb").css("margin-left", "0px");
            $("#scroll_Track").css("width", "0px");
            ScrollBar.value = 0;
          } else {
            ScrollBar.value = Math.round(currentValue * ScrollBar.maxValue / $("#scrollBar").width());
          }
          SetTime(ScrollBar.value);
        });
      });
      $("#scroll_Thumb").mouseup(function () {
        if ($("#progressTime_control").attr("title") == "暂停") {
          if (ScrollBar.value < ScrollBar.maxValue) {
            _index = ScrollBar.value - 1;
            StartInterval();
          }
        }
        valite = false;
      });
    },
    GetValue: function () {
      this.currentX = $("#scrollBar").width() * (this.value / this.maxValue);
    }
  }




  export default {
    name: "demo",
    props: {},
    data() {
      return {
        id: "map",
        type: "vue",
        config: window.defaultMapConfig,
        input:60,
        oneGuiJi:[],
        twoGuiJi:[],
        allGuiJi:[],
        allGJ:[],

      }
    },
    components: {
      'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
    },
    methods: {
      SetProgressTime(fun, startTime, endTime) {
        myfun = fun;
        $("#progressTime").show();
        $("#scrollBarTxt").html(startTime);
        $("#startTime").text(startTime);
        $("#endTime").text(endTime);
        //设置最大值
        var qdsjDate = new Date(startTime);
        var jssjDate = new Date(endTime);
        console.log("时间22：",Math.abs(qdsjDate - jssjDate) );
        ScrollBar.maxValue = Math.abs(qdsjDate - jssjDate) / 1000   /intervalValue;
        console.log("时间11：",ScrollBar.maxValue );
        //初始化
        ScrollBar.Initialize();
      },
      progressTimeControl() {
        var img=document.getElementById("progressTime_control");
        console.log("img对象2：",$(img).attr("title"));
        if ($(img).attr("title") == "暂停") {
          for(var i=0;i<this.allGJ.length;i++){
            this.allGJ[i].pause();
          }
          $(img).attr("title", "开始");
          $(img).attr("src", "../../static/map/vue-lib/images/20150608024026950_easyicon_net_48.png");
          window.clearInterval(_mProgressTimer);
        } else {
          for(var i=0;i<this.allGJ.length;i++){
            this.allGJ[i].start();
          }
          $(img).attr("title", "暂停");
          $(img).attr("src", "../../static/map/vue-lib/images/2015060802411313_easyicon_net_48.png");
          this.StartInterval();
        }
      },
      StartInterval() {
        if (_mProgressTimer != null) {
          window.clearInterval(_mProgressTimer);
        }
        _mProgressTimer = setInterval(this.IntervalTile, 1000);
      },
      IntervalTile() {
        if (_index < ScrollBar.maxValue) {
          _index += 1000 / _speed;
          //console.log(_index)
          ScrollBar.value = _index;
          ScrollBar.SetValue(_index);
          this.SetTime(_index);
        } else {
          window.clearInterval(_mProgressTimer);
        }
      },
      SetTime(value) {
        var start = $("#startTime").html();
        var startDate = new Date(start);
        //startDate.setMinutes(startDate.getMinutes() + intervalValue * value); //十五分钟为进度
        startDate.setSeconds(startDate.getSeconds() + intervalValue * value); //十五分钟为进度
        var month = startDate.getMonth() + 1 < 10 ? "0" + (startDate.getMonth() + 1) : startDate.getMonth() + 1;
        var currentDate = startDate.getDate() < 10 ? "0" + startDate.getDate() : startDate.getDate();
        var Hours = startDate.getHours() < 10 ? "0" + startDate.getHours() : startDate.getHours();
        var Minutes = startDate.getMinutes() < 10 ? "0" + startDate.getMinutes() : startDate.getMinutes();
        var Seconds = startDate.getSeconds() < 10 ? "0" + startDate.getSeconds() : startDate.getSeconds();
        var indexStart = startDate.getFullYear() + "/" + month + "/" + currentDate + " " + Hours + ":" + Minutes + ":" + Seconds;
        $("#scrollBarTxt").html(indexStart);
        if (window.parent.currentTime) {
          currentTime = indexStart;
        }
        //console.log("currentTime:", indexStart);
        this.openGJ(indexStart);
        if (typeof (myfun) == "function") {
          var jscode = new Function('return ' + myfun)();
          jscode(indexStart)
        }
      },
      progressTimeStop() {
        $("#progressTime_control").attr("title", "开始");
        $("#progressTime_control").attr("src", "../../static/map/vue-lib/images/20150608024026950_easyicon_net_48.png");
        $("#scroll_Thumb").css("margin-left", "0px");
        $("#scroll_Track").css("width", "0px");
        ScrollBar.value = 0;
        _index = 0;
        _speed = 1000;
        window.clearInterval(_mProgressTimer);
        $("#TimeSpeed").text("×1");
        //重新赋值
        this.getData();
      },
      SetInterval() {
        window.clearInterval(_mProgressTimer);
        _mProgressTimer = window.setInterval(function () {
          if (_index <= ScrollBar.value) {
            _index += 1;
            ScrollBar.SetValue(_index);
            this.SetTime(_index)
          } else {
            this.progressTimeStop()
          }
        }, _speed);
      },

      onchange(){
        this.getData();
        this.progressTimeStop();
        //重新初始时间轴
        this.SetProgressTime(null, "2013/12/1 8:00:00", "2013/12/01 12:00:00");
      },
      getData(){
        for(var i=0;i<this.allGJ.length;i++){
          this.$refs.map.removeLayer(this.allGJ[i]);
        }
        allGJ=[];
        intervalValue=document.getElementById("intervalValueID").value;
        console.log("时间间隔值：",intervalValue);
        this.oneGuiJi=[
          {id:"1",time:"2013/12/01 08:01:00",lat:24.558563232421875,lng:118.08809280395509},
          {id:"1",time:"2013/12/01 08:05:00",lat:24.54594757080078,lng:118.11899185180665},
          {id:"1",time:"2013/12/01 08:24:00",lat:24.508094787597656,lng:118.13547134399415},
          {id:"1",time:"2013/12/01 09:00:00",lat:24.478225708007812,lng:118.12379837036133},
          {id:"1",time:"2013/12/01 12:00:00",lat:24.45384979248047,lng:118.10045242309572},
        ];
        this.twoGuiJi=[
          {id:"2",time:"2013/12/01 08:06:00",lat:24.497108459472656,lng:118.05410385131836},
          {id:"2",time:"2013/12/01 08:15:00",lat:24.503675231933594,lng:118.10422897338867},
          {id:"2",time:"2013/12/01 09:00:00",lat:24.46406219482422,lng:118.14851760864259},
          {id:"2",time:"2013/12/01 12:00:00",lat:24.48200225830078,lng:118.18628311157227},
        ];
        this.allGuiJi=[];
        this.allGuiJi.push(this.oneGuiJi);
        this.allGuiJi.push(this.twoGuiJi);


      },
      openGJ(gjtime){
        console.log("gjtime:",gjtime);
        for(var j=0;j<this.allGuiJi.length;j++){
          for(var i=0;i<this.allGuiJi[j].length;i++){
            if(gjtime>this.allGuiJi[j][i].time){
              this.drawGJ(this.allGuiJi[j][i].id,this.allGuiJi[j][i],this.allGuiJi[j][i+1]);
              this.allGuiJi[j].splice(i,1);
              i=i-1;
            }
          }
        }
      },
      drawGJ(id,startGJ,endGJ){
        console.log("endGJ:",endGJ);
        if(endGJ==null || typeof (endGJ)=="undefined"){
          return;
        }
        for(var i=0;i<this.allGJ.length;i++){
          if(this.allGJ[i].id==id){
            this.$refs.map.removeLayer(this.allGJ[i]);
            this.allGJ.splice(i,1);
            i=i-1;
          }
        }
        var movingMarkerJson={};
        //图标移动路线点
        movingMarkerJson.xys=[
          [startGJ.lat, startGJ.lng],[endGJ.lat, endGJ.lng]
        ];
        //获得距离
        var distace=this.$refs.map.distace([startGJ.lat, startGJ.lng],[endGJ.lat, endGJ.lng]);
        console.log("距离：",distace);
        //获得时间差
        var endTimestamp = new Date(endGJ.time).getTime();
        var startTimestamp = new Date(startGJ.time).getTime();
        var timestamp=endTimestamp-startTimestamp;
        var secondTime=timestamp/(1000);
        console.log("时间差timestamp秒:",secondTime);
        //计算速度
        var realTime=secondTime/(intervalValue);
        var speed=distace/realTime;
        console.log("移动速度",speed);
        //创建移动图标
        var iconJson={};
        iconJson.option={};
        iconJson.option.iconUrl="../../static/map/example/images/bike.png";
        iconJson.option.iconAnchor=[11, 39];//坐标固定在图标的哪个点，[0,0]表示图标的左上角
        var markerIcon=this.$refs.map.createIcon(iconJson);
        movingMarkerJson.icon=markerIcon;
        //移动速度
        movingMarkerJson.speed=speed;//单位：米/秒
        //移动图标移动到点的时候是否弹出气泡框
        movingMarkerJson.movingMarkerShowPopup=false;
        //移动是否居中
        movingMarkerJson.movingMarker=false;
        //注意：所有点尾巴，固定长度，固定点数只能有一个为true
        //(1)展示所有点尾巴
        movingMarkerJson.showPolyline_flag=false;
        //是否展示尾巴(固定长度)
        movingMarkerJson.showTail_flag=false;
        //是否展示尾巴(固定点数)
        movingMarkerJson.showTailByPoint_flag=false;
        //是否展示尾巴(固定点数值，当showTailByPoint_flag时必须设置该值)
        movingMarkerJson.tailPoint=5;
        movingMarkerJson.pointCallBack=this.pointCallBack;
        movingMarkerJson.endCallBack=this.endCallBack;
        var movingMarkerLayer=this.$refs.map.addMovingMarker(movingMarkerJson);
        movingMarkerLayer.id=startGJ.id;
        movingMarkerLayer.xys=movingMarkerJson.xys;
        this.allGJ.push(movingMarkerLayer);
      },
      pointCallBack(index){

      },
      endCallBack(){

      },
      addAllPolyline(){
        //获取数据
        this.getData();
        //显示时间轴
        this.SetProgressTime(null, "2013/12/1 8:00:00", "2013/12/01 12:00:00");
        //地图上线
        for(var j=0;j<this.allGuiJi.length;j++){
          var latlngs=[];
          for(var i=0;i<this.allGuiJi[j].length;i++){
            latlngs.push([this.allGuiJi[j][i].lat,this.allGuiJi[j][i].lng]);
          }
          //console.log("线坐标",latlngs);
          this.addPolyline(latlngs);
        }
      },
      addPolyline(latlngs){
        var polylineJSON={};
        polylineJSON.xys=latlngs;
        polylineJSON.option={};
        polylineJSON.option.weight=2;
        polylineJSON.option.color="#f18";
        var polyline= this.$refs.map.addPolyline(polylineJSON);
      }



    },
    mounted: function () {

    },
  }
</script>

<style>
  .progressTime {
    filter: alpha(opacity=50);
    -moz-opacity: 0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5;
    position: absolute;
    _position: fixed;
    left: 25%;
    bottom: 10px;
    Z-INDEX: 2;
    border: 1px solid gray;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    color: white;
    background: #000;
    width: 660px;
    height: 68px;
    padding-top: 0px;
    padding-bottom: 10px;
    display: none;
  }

  #progressTime_concent {
    width: 100%;
    height: 68px;
    margin: 0 auto;
    margin-top: 10px;
  }

  #scrollBar {
    width: 90%;
    height: 10px;
    background-color: #ccc;
    margin: 0 auto;
    margin-top: 35px;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
    cursor: pointer;
  }

  #scroll_Track {
    width: 0px;
    height: 10px;
    background-color: #ff4400;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }

  #scroll_Thumb {
    height: 15px;
    width: 15px;
    background-color: #efefef;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
    border: 1px solid #ccc;
    -webkit-box-shadow: 0px 0px 5px #ccc;
    -moz-box-shadow: 0px 0px 5px #ccc;
    box-shadow: 0px 0px 5px #ccc;
    position: absolute;
    margin-top: -14px;
    cursor: pointer;
  }

  #scroll_Thumb:hover {
    background-color: #ff4400;
    border: 1px solid #fff;
  }
</style>
