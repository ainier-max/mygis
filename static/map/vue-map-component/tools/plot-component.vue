/**
* 需求描述：plot组件
* @author chenbc 2022-04-27
*/
<template>
  <div>

  </div>
  <!-- export default { -->
</template>

<script>
module.exports = {
  name:"PlotComponent",
  props: {
    mapRef: {type: String, request: true},//地图引用id
  },
  data() {
    return {
      initFlag:0,
      map: null,//地图对象
      gatherPosition:[],//采集的点数据
      floatingPoint:null,//浮动点
      gatherCallback:null,//回调函数
      gatherIconOption:null,//采集的点图标

      straightArrowLayer:null,//细直线对象
      straightArrowFlag:"straightArrowPoint",//细直线标识

      fineArrowLayer:null,//直线对象
      fineArrowFlag:"fineArrowPoint",//直线标识

      assaultDirectionLayer:null,//突击方向对象
      assaultDirectionFlag:"assaultDirectionPoint",//突击方向标识

      attackArrowLayer:null,//进攻方向方向对象
      attackArrowFlag:"attackArrowPoint",//进攻方向标识

      tailedAttackArrowLayer:null,//进攻方向方向对象(燕尾)
      tailedAttackArrowFlag:"tailedAttackArrowPoint",//进攻方向标识(燕尾)


      squadCombatLayer:null,//战斗分队箭头
      squadCombatFlag:"squadCombatPoint",//战斗分队箭头


      tailedSquadCombatLayer:null,//战斗分队箭头(燕尾)
      tailedSquadCombatFlag:"tailedSquadCombatPoint",//战斗分队箭头标识(燕尾)


      gatheringPlaceLayer:null,//聚集地采集
      gatheringPlaceFlag:"gatheringPlacePoint",//聚集地标识


      doubleArrowLayer:null,//聚集地采集
      doubleArrowFlag:"doubleArrowPoint",//聚集地标识









    }
  },
  computed: {
  },
  watch: {

  },
  components: {},
  methods: {
    initCoponent() {
      this.map = this.$parent.$refs[this.mapRef];
      console.log("地图标绘组件地图对象：this.map:",this.map);
      if (typeof (this.map) === "undefined") {
        this.initFlag=this.initFlag+1;
        if(this.initFlag>3){
          console.log("军事标绘加载异常，1：可能军事标绘的组件路径存在异常！");
          window.setTimeout(this.initCoponent, 500);
        }else{
          return;
        }
      }
    },
    //采集细直线
    gatherStraightArrow(gatherIconOption,gatherCallback){
      this.gatherIconOption=gatherIconOption;
      this.gatherCallback=gatherCallback;
      this.gatherPosition=[];
      this.straightArrowLayer=null;
      this.floatingPoint=null;
      this.map.map.on("click",this.gatherStraightArrowClickBack,"plot");
      this.map.map.on("mousemove",this.gatherStraightArrowMoveBack,"plot");
    },
    gatherStraightArrowClickBack(e){
      var gatherPointTemp=[e.latlng.lat,e.latlng.lng];
      //console.log("gatherPointTemp",gatherPointTemp);
      var num = this.gatherPosition.length;
      if (num == 0) {
        this.gatherPosition.push(gatherPointTemp);
        this.floatingPoint = this.createPoint(gatherPointTemp, -1,this.straightArrowFlag);
      }
      this.gatherPosition.push(gatherPointTemp);
      var oid = this.gatherPosition.length - 2;
      this.createPoint(gatherPointTemp, oid,this.straightArrowFlag);
      if (num > 1) {
        this.gatherPosition.pop();
        this.map.map.removeLayer(this.floatingPoint);
        this.map.map.off("click",this.gatherStraightArrowClickBack,"plot");
        this.map.map.off("mousemove",this.gatherStraightArrowMoveBack,"plot");
        //删除关键点
        this.clearKeyPoint(this.straightArrowFlag);
        this.straightArrowLayer.gatherPosition=this.gatherPosition;
        this.gatherCallback(this.straightArrowLayer);
        //console.log("细直线箭头的采集关键点数据：",this.gatherPosition);
      }
    },
    gatherStraightArrowMoveBack(e){
      if(this.floatingPoint==null){
        return;
      }
      this.floatingPoint.setLatLng([e.latlng.lat,e.latlng.lng]);
      this.gatherPosition.pop();
      this.gatherPosition.push([e.latlng.lat,e.latlng.lng]);
      this.showStraightArrowToMap();
    },
    showStraightArrowToMap(){
      if(this.straightArrowLayer==null){
        this.straightArrowLayer=L.Plot.straightArrow(this.gatherPosition).addTo(this.map.map);
      }else{
        this.map.map.removeLayer(this.straightArrowLayer);
        this.straightArrowLayer=null;
        this.straightArrowLayer=L.Plot.straightArrow(this.gatherPosition).addTo(this.map.map);
      }
    },
    //添加细直线
    addStraightArrow(gatherPosition){
      var straightArrowLayerTemp=L.Plot.straightArrow(gatherPosition).addTo(this.map.map);
      straightArrowLayerTemp.gatherPosition=gatherPosition;
      return straightArrowLayerTemp;
    },
    //细直线进入编辑
    editStraightArrow(straightArrowLayer,gatherIconOption){
      this.straightArrowLayer=straightArrowLayer;
      this.gatherPosition=this.straightArrowLayer.gatherPosition;
      this.gatherIconOption=gatherIconOption;
      this.straightArrowLayer.flag=this.straightArrowFlag;
      for (var i = 0; i < this.gatherPosition.length; i++) {
        var markerTemp=this.createPoint(this.gatherPosition[i], i,this.straightArrowFlag);
        markerTemp.on('drag', this.drawStraightArrowCallBack,"plot");
        markerTemp.dragging.enable();
      }
    },
    drawStraightArrowCallBack(e){
      this.gatherPosition[e.target.oid]=[e.latlng.lat,e.latlng.lng];
      this.showStraightArrowToMap();
    },
    //细直线结束编辑
    endStraightArrow(straightArrowLayer,editCallback){
      this.clearKeyPoint(straightArrowLayer.flag);
      this.straightArrowLayer.gatherPosition=this.gatherPosition;
      editCallback(this.straightArrowLayer);
    },


    /**
     * 直线采集
     */
    //采集细直线
    gatherFineArrow(gatherIconOption,gatherCallback){
      this.gatherIconOption=gatherIconOption;
      this.gatherCallback=gatherCallback;
      this.gatherPosition=[];
      this.straightArrowLayer=null;
      this.floatingPoint=null;
      this.map.map.on("click",this.gatherFineArrowClickBack,"plot");
      this.map.map.on("mousemove",this.gatherFineArrowMoveBack,"plot");
    },
    gatherFineArrowClickBack(e){
      var gatherPointTemp=[e.latlng.lat,e.latlng.lng];
      //console.log("gatherPointTemp",gatherPointTemp);
      var num = this.gatherPosition.length;
      if (num == 0) {
        this.gatherPosition.push(gatherPointTemp);
        this.floatingPoint = this.createPoint(gatherPointTemp, -1,this.fineArrowFlag);
      }
      this.gatherPosition.push(gatherPointTemp);
      var oid = this.gatherPosition.length - 2;
      this.createPoint(gatherPointTemp, oid,this.fineArrowFlag);
      if (num > 1) {
        this.gatherPosition.pop();
        this.map.map.removeLayer(this.floatingPoint);
        this.map.map.off("click",this.gatherFineArrowClickBack,"plot");
        this.map.map.off("mousemove",this.gatherFineArrowMoveBack,"plot");
        //删除关键点
        this.clearKeyPoint(this.fineArrowFlag);
        this.fineArrowLayer.gatherPosition=this.gatherPosition;
        this.gatherCallback(this.fineArrowLayer);
        //console.log("细直线箭头的采集关键点数据：",this.gatherPosition);
      }

    },
    gatherFineArrowMoveBack(e){
      if(this.floatingPoint==null){
        return;
      }
      this.floatingPoint.setLatLng([e.latlng.lat,e.latlng.lng]);
      this.gatherPosition.pop();
      this.gatherPosition.push([e.latlng.lat,e.latlng.lng]);
      this.showFineArrowToMap();
    },
    showFineArrowToMap(){
      if(this.fineArrowLayer==null){
        this.fineArrowLayer=L.Plot.fineArrow(this.gatherPosition).addTo(this.map.map);
      }else{
        this.map.map.removeLayer(this.fineArrowLayer);
        this.fineArrowLayer=null;
        this.fineArrowLayer=L.Plot.fineArrow(this.gatherPosition).addTo(this.map.map);
      }
    },

    //添加直线
    addFineArrow(gatherPosition){
      var fineArrowLayerTemp=L.Plot.fineArrow(gatherPosition).addTo(this.map.map);
      fineArrowLayerTemp.gatherPosition=gatherPosition;
      return fineArrowLayerTemp;
    },

    //细直线进入编辑
    editFineArrow(fineArrowLayer,gatherIconOption){
      this.fineArrowLayer=fineArrowLayer;
      this.gatherPosition=this.fineArrowLayer.gatherPosition;
      this.gatherIconOption=gatherIconOption;
      this.fineArrowLayer.flag=this.fineArrowFlag;
      for (var i = 0; i < this.gatherPosition.length; i++) {
        var markerTemp=this.createPoint(this.gatherPosition[i], i,this.fineArrowFlag);
        markerTemp.on('drag', this.drawFineArrowCallBack,"plot");
        markerTemp.dragging.enable();
      }
    },
    drawFineArrowCallBack(e){
      this.gatherPosition[e.target.oid]=[e.latlng.lat,e.latlng.lng];
      this.showFineArrowToMap();
    },
    //细直线结束编辑
    endFineArrow(fineArrowLayer,editCallback){
      this.clearKeyPoint(fineArrowLayer.flag);
      this.fineArrowLayer.gatherPosition=this.gatherPosition;
      editCallback(this.fineArrowLayer);
    },


    /**
     * 突击方向采集
     */
    gatherAssaultDirection(gatherIconOption,gatherCallback){
      this.gatherIconOption=gatherIconOption;
      this.gatherCallback=gatherCallback;
      this.gatherPosition=[];
      this.assaultDirectionLayer=null;
      this.floatingPoint=null;
      this.map.map.on("click",this.gatherAssaultDirectionClickBack,"plot");
      this.map.map.on("mousemove",this.gatherAssaultDirectionMoveBack,"plot");
    },
    gatherAssaultDirectionClickBack(e){
      var gatherPointTemp=[e.latlng.lat,e.latlng.lng];
      //console.log("gatherPointTemp",gatherPointTemp);
      var num = this.gatherPosition.length;
      if (num == 0) {
        this.gatherPosition.push(gatherPointTemp);
        this.floatingPoint = this.createPoint(gatherPointTemp, -1,this.assaultDirectionFlag);
      }
      this.gatherPosition.push(gatherPointTemp);
      var oid = this.gatherPosition.length - 2;
      this.createPoint(gatherPointTemp, oid,this.assaultDirectionFlag);
      if (num > 1) {
        this.gatherPosition.pop();
        this.map.map.removeLayer(this.floatingPoint);
        this.map.map.off("click",this.gatherAssaultDirectionClickBack,"plot");
        this.map.map.off("mousemove",this.gatherAssaultDirectionMoveBack,"plot");
        //删除关键点
        this.clearKeyPoint(this.assaultDirectionFlag);
        this.assaultDirectionLayer.gatherPosition=this.gatherPosition;
        this.gatherCallback(this.assaultDirectionLayer);
        //console.log("细直线箭头的采集关键点数据：",this.gatherPosition);
      }
    },
    gatherAssaultDirectionMoveBack(e){
      if(this.floatingPoint==null){
        return;
      }
      this.floatingPoint.setLatLng([e.latlng.lat,e.latlng.lng]);
      this.gatherPosition.pop();
      this.gatherPosition.push([e.latlng.lat,e.latlng.lng]);
      this.showAssaultDirectionToMap();
    },
    showAssaultDirectionToMap(){
      if(this.assaultDirectionLayer==null){
        this.assaultDirectionLayer=L.Plot.assaultDirection(this.gatherPosition).addTo(this.map.map);
      }else{
        this.map.map.removeLayer(this.assaultDirectionLayer);
        this.assaultDirectionLayer=null;
        this.assaultDirectionLayer=L.Plot.assaultDirection(this.gatherPosition).addTo(this.map.map);
      }
    },


    //添加突击方向
    addAssaultDirection(gatherPosition){
      var assaultDirectionLayerTemp=L.Plot.assaultDirection(gatherPosition).addTo(this.map.map);
      assaultDirectionLayerTemp.gatherPosition=gatherPosition;
      return assaultDirectionLayerTemp;
    },

    //突击方向进入编辑
    editAssaultDirection(assaultDirectionLayer,gatherIconOption){
      this.assaultDirectionLayer=assaultDirectionLayer;
      this.gatherPosition=this.assaultDirectionLayer.gatherPosition;
      this.gatherIconOption=gatherIconOption;
      this.assaultDirectionLayer.flag=this.assaultDirectionFlag;
      for (var i = 0; i < this.gatherPosition.length; i++) {
        var markerTemp=this.createPoint(this.gatherPosition[i], i,this.assaultDirectionFlag);
        markerTemp.on('drag', this.drawAssaultDirectionCallBack,"plot");
        markerTemp.dragging.enable();
      }
    },
    drawAssaultDirectionCallBack(e){
      this.gatherPosition[e.target.oid]=[e.latlng.lat,e.latlng.lng];
      this.showAssaultDirectionToMap();
    },
    //突击方向结束编辑
    endAssaultDirection(assaultDirectionLayer,editCallback){
      this.clearKeyPoint(assaultDirectionLayer.flag);
      this.assaultDirectionLayer.gatherPosition=this.gatherPosition;
      editCallback(this.assaultDirectionLayer);
    },

    /**
     * 进攻方向采集
     */
    gatherAttackArrow(gatherIconOption,gatherCallback){
      this.gatherIconOption=gatherIconOption;
      this.gatherCallback=gatherCallback;
      this.gatherPosition=[];
      this.attackArrowLayer=null;
      this.floatingPoint=null;
      this.map.map.on("click",this.gatherAttackArrowClickBack,"plot");
      this.map.map.on("contextmenu",this.gatherAttackArrowContextmenuBack,"plot");
      this.map.map.on("mousemove",this.gatherAttackArrowMoveBack,"plot");
    },
    gatherAttackArrowClickBack(e){
      var gatherPointTemp=[e.latlng.lat,e.latlng.lng];
      //console.log("gatherPointTemp",gatherPointTemp);
      var num = this.gatherPosition.length;
      if (num == 0) {
        this.gatherPosition.push(gatherPointTemp);
        this.floatingPoint = this.createPoint(gatherPointTemp, -1,this.attackArrowFlag);
      }
      this.gatherPosition.push(gatherPointTemp);
      var oid = this.gatherPosition.length - 2;
      this.createPoint(gatherPointTemp, oid,this.attackArrowFlag);
    },
    gatherAttackArrowContextmenuBack(e){
      if (this.gatherPosition.length < 2) {
        return;
      }
      //gatherPosition.pop();
      this.map.map.removeLayer(this.floatingPoint);
      this.map.map.off("click",this.gatherAttackArrowClickBack,"plot");
      this.map.map.off("contextmenu",this.gatherAttackArrowContextmenuBack,"plot");
      this.map.map.off("mousemove",this.gatherAttackArrowMoveBack,"plot");
      //删除关键点
      this.clearKeyPoint(this.attackArrowFlag);
      this.attackArrowLayer.gatherPosition=this.gatherPosition;
      this.gatherCallback(this.attackArrowLayer);
    },
    gatherAttackArrowMoveBack(e){
      if(this.floatingPoint==null){
        return;
      }
      this.floatingPoint.setLatLng([e.latlng.lat,e.latlng.lng]);
      this.gatherPosition.pop();
      this.gatherPosition.push([e.latlng.lat,e.latlng.lng]);
      this.showAttackArrowToMap();
    },
    showAttackArrowToMap(){
      this.gatherPosition=this.arrNeighborUnique(this.gatherPosition);
      if(this.attackArrowLayer==null){
        this.attackArrowLayer=L.Plot.attackArrow(this.gatherPosition).addTo(this.map.map);
      }else{
        this.map.map.removeLayer(this.attackArrowLayer);
        this.attackArrowLayer=null;
        this.attackArrowLayer=L.Plot.attackArrow(this.gatherPosition).addTo(this.map.map);
      }
    },

    //添加进攻方向
    addAttackArrow(gatherPosition){
      var attackArrowLayerTemp=L.Plot.attackArrow(gatherPosition).addTo(this.map.map);
      attackArrowLayerTemp.gatherPosition=gatherPosition;
      return attackArrowLayerTemp;
    },

    //进攻方向进入编辑
    editAttackArrow(attackArrowLayer,gatherIconOption){
      this.attackArrowLayer=attackArrowLayer;
      this.gatherPosition=this.attackArrowLayer.gatherPosition;
      this.gatherIconOption=gatherIconOption;
      this.attackArrowLayer.flag=this.attackArrowFlag;
      for (var i = 0; i < this.gatherPosition.length; i++) {
        var markerTemp=this.createPoint(this.gatherPosition[i], i,this.attackArrowFlag);
        markerTemp.on('drag', this.drawAttackArrowCallBack,"plot");
        markerTemp.dragging.enable();
      }
    },
    drawAttackArrowCallBack(e){
      this.gatherPosition[e.target.oid]=[e.latlng.lat,e.latlng.lng];
      this.showAttackArrowToMap();
    },
    //进攻方向结束编辑
    endAttackArrow(attackArrowLayer,editCallback){
      this.clearKeyPoint(attackArrowLayer.flag);
      this.attackArrowLayer.gatherPosition=this.gatherPosition;
      editCallback(this.attackArrowLayer);
    },





    /**
     * 进攻方向采集（燕尾）
     */
    gatherTailedAttackArrow(gatherIconOption,gatherCallback){
      this.gatherIconOption=gatherIconOption;
      this.gatherCallback=gatherCallback;
      this.gatherPosition=[];
      this.tailedAttackArrowLayer=null;
      this.floatingPoint=null;
      this.map.map.on("click",this.gatherTailedAttackArrowLayerClickBack,"plot");
      this.map.map.on("contextmenu",this.gatherTailedAttackArrowLayerContextmenuBack,"plot");
      this.map.map.on("mousemove",this.gatherTailedAttackArrowLayerMoveBack,"plot");
    },
    gatherTailedAttackArrowLayerClickBack(e){
      var gatherPointTemp=[e.latlng.lat,e.latlng.lng];
      //console.log("gatherPointTemp",gatherPointTemp);
      var num = this.gatherPosition.length;
      if (num == 0) {
        this.gatherPosition.push(gatherPointTemp);
        this.floatingPoint = this.createPoint(gatherPointTemp, -1,this.tailedAttackArrowFlag);
      }
      this.gatherPosition.push(gatherPointTemp);
      var oid = this.gatherPosition.length - 2;
      this.createPoint(gatherPointTemp, oid,this.tailedAttackArrowFlag);
    },
    gatherTailedAttackArrowLayerContextmenuBack(e){
      if (this.gatherPosition.length < 2) {
        return;
      }
      //gatherPosition.pop();
      this.map.map.removeLayer(this.floatingPoint);
      this.map.map.off("click",this.gatherTailedAttackArrowLayerClickBack,"plot");
      this.map.map.off("contextmenu",this.gatherTailedAttackArrowLayerContextmenuBack,"plot");
      this.map.map.off("mousemove",this.gatherTailedAttackArrowLayerMoveBack,"plot");
      //删除关键点
      this.clearKeyPoint(this.tailedAttackArrowFlag);
      this.tailedAttackArrowLayer.gatherPosition=this.gatherPosition;
      this.gatherCallback(this.tailedAttackArrowLayer);
    },
    gatherTailedAttackArrowLayerMoveBack(e){
      if(this.floatingPoint==null){
        return;
      }
      this.floatingPoint.setLatLng([e.latlng.lat,e.latlng.lng]);
      this.gatherPosition.pop();
      this.gatherPosition.push([e.latlng.lat,e.latlng.lng]);
      this.showTailedAttackArrowToMap();
    },
    showTailedAttackArrowToMap(){
      this.gatherPosition=this.arrNeighborUnique(this.gatherPosition);
      if(this.tailedAttackArrowLayer==null){
        this.tailedAttackArrowLayer=L.Plot.tailedAttackArrow(this.gatherPosition).addTo(this.map.map);
      }else{
        this.map.map.removeLayer(this.tailedAttackArrowLayer);
        this.tailedAttackArrowLayer=null;
        this.tailedAttackArrowLayer=L.Plot.tailedAttackArrow(this.gatherPosition).addTo(this.map.map);
      }
    },

    //添加进攻方向
    addTailedAttackArrow(gatherPosition){
      var tailedAttackArrowLayerTemp=L.Plot.tailedAttackArrow(gatherPosition).addTo(this.map.map);
      tailedAttackArrowLayerTemp.gatherPosition=gatherPosition;
      return tailedAttackArrowLayerTemp;
    },

    //进攻方向进入编辑
    editTailedAttackArrow(tailedAttackArrowLayer,gatherIconOption){
      this.tailedAttackArrowLayer=tailedAttackArrowLayer;
      this.gatherPosition=this.tailedAttackArrowLayer.gatherPosition;
      this.gatherIconOption=gatherIconOption;
      this.tailedAttackArrowLayer.flag=this.tailedAttackArrowFlag;
      for (var i = 0; i < this.gatherPosition.length; i++) {
        var markerTemp=this.createPoint(this.gatherPosition[i], i,this.tailedAttackArrowFlag);
        markerTemp.on('drag', this.drawTailedAttackArrowCallBack,"plot");
        markerTemp.dragging.enable();
      }
    },
    drawTailedAttackArrowCallBack(e){
      this.gatherPosition[e.target.oid]=[e.latlng.lat,e.latlng.lng];
      this.showTailedAttackArrowToMap();
    },
    //进攻方向结束编辑
    endTailedAttackArrow(tailedAttackArrowLayer,editCallback){
      this.clearKeyPoint(tailedAttackArrowLayer.flag);
      this.tailedAttackArrowLayer.gatherPosition=this.gatherPosition;
      editCallback(this.tailedAttackArrowLayer);
    },




    /**
     * 分队战斗箭头采集
     */
    gatherSquadCombat(gatherIconOption,gatherCallback){
      this.gatherIconOption=gatherIconOption;
      this.gatherCallback=gatherCallback;
      this.gatherPosition=[];
      this.squadCombatLayer=null;
      this.floatingPoint=null;
      this.map.map.on("click",this.gatherSquadCombatLayerClickBack,"plot");
      this.map.map.on("contextmenu",this.gatherSquadCombatLayerContextmenuBack,"plot");
      this.map.map.on("mousemove",this.gatherSquadCombatLayerMoveBack,"plot");
    },
    gatherSquadCombatLayerClickBack(e){
      var gatherPointTemp=[e.latlng.lat,e.latlng.lng];
      //console.log("gatherPointTemp",gatherPointTemp);
      var num = this.gatherPosition.length;
      if (num == 0) {
        this.gatherPosition.push(gatherPointTemp);
        this.floatingPoint = this.createPoint(gatherPointTemp, -1,this.squadCombatFlag);
      }
      this.gatherPosition.push(gatherPointTemp);
      var oid = this.gatherPosition.length - 2;
      this.createPoint(gatherPointTemp, oid,this.squadCombatFlag);
    },
    gatherSquadCombatLayerContextmenuBack(e){
      if (this.gatherPosition.length < 2) {
        return;
      }
      //gatherPosition.pop();
      this.map.map.removeLayer(this.floatingPoint);
      this.map.map.off("click",this.gatherSquadCombatLayerClickBack,"plot");
      this.map.map.off("contextmenu",this.gatherSquadCombatLayerContextmenuBack,"plot");
      this.map.map.off("mousemove",this.gatherSquadCombatLayerMoveBack,"plot");
      //删除关键点
      this.clearKeyPoint(this.squadCombatFlag);
      this.squadCombatLayer.gatherPosition=this.gatherPosition;
      this.gatherCallback(this.squadCombatLayer);
    },
    gatherSquadCombatLayerMoveBack(e){
      if(this.floatingPoint==null){
        return;
      }
      this.floatingPoint.setLatLng([e.latlng.lat,e.latlng.lng]);
      this.gatherPosition.pop();
      this.gatherPosition.push([e.latlng.lat,e.latlng.lng]);
      this.showSquadCombatToMap();
    },
    showSquadCombatToMap(){
      this.gatherPosition=this.arrNeighborUnique(this.gatherPosition);
      if(this.squadCombatLayer==null){
        this.squadCombatLayer=L.Plot.squadCombat(this.gatherPosition).addTo(this.map.map);
      }else{
        this.map.map.removeLayer(this.squadCombatLayer);
        this.squadCombatLayer=null;
        this.squadCombatLayer=L.Plot.squadCombat(this.gatherPosition).addTo(this.map.map);
      }
    },


    //添加战斗分队箭头
    addSquadCombat(gatherPosition){
      var plotLayerTemp=L.Plot.squadCombat(gatherPosition).addTo(this.map.map);
      plotLayerTemp.gatherPosition=gatherPosition;
      return plotLayerTemp;
    },

    //战斗分队箭头进入编辑
    editSquadCombat(squadCombatLayer,gatherIconOption){
      this.squadCombatLayer=squadCombatLayer;
      this.gatherPosition=this.squadCombatLayer.gatherPosition;
      this.gatherIconOption=gatherIconOption;
      this.squadCombatLayer.flag=this.squadCombatFlag;
      for (var i = 0; i < this.gatherPosition.length; i++) {
        var markerTemp=this.createPoint(this.gatherPosition[i], i,this.squadCombatFlag);
        markerTemp.on('drag', this.drawSquadCombatCallBack,"plot");
        markerTemp.dragging.enable();
      }
    },
    drawSquadCombatCallBack(e){
      this.gatherPosition[e.target.oid]=[e.latlng.lat,e.latlng.lng];
      this.showSquadCombatToMap();
    },
    //战斗分队箭头结束编辑
    endSquadCombat(plotLayer,editCallback){
      this.clearKeyPoint(plotLayer.flag);
      this.squadCombatLayer.gatherPosition=this.gatherPosition;
      editCallback(this.squadCombatLayer);
    },



    /**
     * 分队战斗箭头(燕尾)采集
     */
    gatherTailedSquadCombat(gatherIconOption,gatherCallback){
      this.gatherIconOption=gatherIconOption;
      this.gatherCallback=gatherCallback;
      this.gatherPosition=[];
      this.tailedSquadCombatLayer=null;
      this.floatingPoint=null;
      this.map.map.on("click",this.gatherTailedSquadCombatLayerClickBack,"plot");
      this.map.map.on("contextmenu",this.gatherTailedSquadCombatLayerContextmenuBack,"plot");
      this.map.map.on("mousemove",this.gatherTailedSquadCombatLayerMoveBack,"plot");
    },
    gatherTailedSquadCombatLayerClickBack(e){
      var gatherPointTemp=[e.latlng.lat,e.latlng.lng];
      //console.log("gatherPointTemp",gatherPointTemp);
      var num = this.gatherPosition.length;
      if (num == 0) {
        this.gatherPosition.push(gatherPointTemp);
        this.floatingPoint = this.createPoint(gatherPointTemp, -1,this.tailedSquadCombatFlag);
      }
      this.gatherPosition.push(gatherPointTemp);
      var oid = this.gatherPosition.length - 2;
      this.createPoint(gatherPointTemp, oid,this.tailedSquadCombatFlag);
    },
    gatherTailedSquadCombatLayerContextmenuBack(e){
      if (this.gatherPosition.length < 2) {
        return;
      }
      //gatherPosition.pop();
      this.map.map.removeLayer(this.floatingPoint);
      this.map.map.off("click",this.gatherTailedSquadCombatLayerClickBack,"plot");
      this.map.map.off("contextmenu",this.gatherTailedSquadCombatLayerContextmenuBack,"plot");
      this.map.map.off("mousemove",this.gatherTailedSquadCombatLayerMoveBack,"plot");
      //删除关键点
      this.clearKeyPoint(this.tailedSquadCombatFlag);
      this.tailedSquadCombatLayer.gatherPosition=this.gatherPosition;
      this.gatherCallback(this.tailedSquadCombatLayer);
    },
    gatherTailedSquadCombatLayerMoveBack(e){
      if(this.floatingPoint==null){
        return;
      }
      this.floatingPoint.setLatLng([e.latlng.lat,e.latlng.lng]);
      this.gatherPosition.pop();
      this.gatherPosition.push([e.latlng.lat,e.latlng.lng]);
      this.showTailedSquadCombatToMap();
    },
    showTailedSquadCombatToMap(){
      this.gatherPosition=this.arrNeighborUnique(this.gatherPosition);
      if(this.tailedSquadCombatLayer==null){
        this.tailedSquadCombatLayer=L.Plot.tailedSquadCombat(this.gatherPosition).addTo(this.map.map);
      }else{
        this.map.map.removeLayer(this.tailedSquadCombatLayer);
        this.tailedSquadCombatLayer=null;
        this.tailedSquadCombatLayer=L.Plot.tailedSquadCombat(this.gatherPosition).addTo(this.map.map);
      }
    },

    //添加战斗分队箭头(燕尾)
    addTailedSquadCombat(gatherPosition){
      var plotLayerTemp=L.Plot.tailedSquadCombat(gatherPosition).addTo(this.map.map);
      plotLayerTemp.gatherPosition=gatherPosition;
      return plotLayerTemp;
    },

    //战斗分队箭头(燕尾)进入编辑
    editTailedSquadCombat(squadCombatLayer,gatherIconOption){
      this.tailedSquadCombatLayer=squadCombatLayer;
      this.gatherPosition=this.tailedSquadCombatLayer.gatherPosition;
      this.gatherIconOption=gatherIconOption;
      this.tailedSquadCombatLayer.flag=this.tailedSquadCombatFlag;
      for (var i = 0; i < this.gatherPosition.length; i++) {
        var markerTemp=this.createPoint(this.gatherPosition[i], i,this.tailedSquadCombatFlag);
        markerTemp.on('drag', this.drawTailedSquadCombatCallBack,"plot");
        markerTemp.dragging.enable();
      }
    },
    drawTailedSquadCombatCallBack(e){
      this.gatherPosition[e.target.oid]=[e.latlng.lat,e.latlng.lng];
      this.showTailedSquadCombatToMap();
    },
    //战斗分队箭头(燕尾)结束编辑
    endTailedSquadCombat(plotLayer,editCallback){
      this.clearKeyPoint(plotLayer.flag);
      this.tailedSquadCombatLayer.gatherPosition=this.gatherPosition;
      editCallback(this.tailedSquadCombatLayer);
    },



    /**
     * 聚集地采集
     */
    gatherGatheringPlace(gatherIconOption,gatherCallback){
      this.gatherIconOption=gatherIconOption;
      this.gatherCallback=gatherCallback;
      this.gatherPosition=[];
      this.gatheringPlaceLayer=null;
      this.floatingPoint=null;
      this.map.map.on("click",this.gatherGatheringPlaceLayerClickBack,"plot");
      this.map.map.on("contextmenu",this.gatherGatheringPlaceLayerContextmenuBack,"plot");
      this.map.map.on("mousemove",this.gatherGatheringPlaceLayerMoveBack,"plot");
    },
    gatherGatheringPlaceLayerClickBack(e){
      var gatherPointTemp=[e.latlng.lat,e.latlng.lng];
      //console.log("gatherPointTemp",gatherPointTemp);
      var num = this.gatherPosition.length;
      if (num == 0) {
        this.gatherPosition.push(gatherPointTemp);
        this.floatingPoint = this.createPoint(gatherPointTemp, -1,this.gatheringPlaceFlag);
      }
      this.gatherPosition.push(gatherPointTemp);
      var oid = this.gatherPosition.length - 2;
      this.createPoint(gatherPointTemp, oid,this.gatheringPlaceFlag);
    },
    gatherGatheringPlaceLayerContextmenuBack(e){
      if (this.gatherPosition.length < 2) {
        return;
      }
      //gatherPosition.pop();
      this.map.map.removeLayer(this.floatingPoint);
      this.map.map.off("click",this.gatherGatheringPlaceLayerClickBack,"plot");
      this.map.map.off("contextmenu",this.gatherGatheringPlaceLayerContextmenuBack,"plot");
      this.map.map.off("mousemove",this.gatherGatheringPlaceLayerMoveBack,"plot");
      //删除关键点
      this.clearKeyPoint(this.gatheringPlaceFlag);
      this.gatheringPlaceLayer.gatherPosition=this.gatherPosition;
      this.gatherCallback(this.gatheringPlaceLayer);
    },
    gatherGatheringPlaceLayerMoveBack(e){
      if(this.floatingPoint==null){
        return;
      }
      this.floatingPoint.setLatLng([e.latlng.lat,e.latlng.lng]);
      this.gatherPosition.pop();
      this.gatherPosition.push([e.latlng.lat,e.latlng.lng]);
      this.showGatheringPlaceToMap();
    },
    showGatheringPlaceToMap(){
      this.gatherPosition=this.arrNeighborUnique(this.gatherPosition);
      if(this.gatheringPlaceLayer==null){
        this.gatheringPlaceLayer=L.Plot.gatheringPlace(this.gatherPosition).addTo(this.map.map);
      }else{
        this.map.map.removeLayer(this.gatheringPlaceLayer);
        this.gatheringPlaceLayer=null;
        this.gatheringPlaceLayer=L.Plot.gatheringPlace(this.gatherPosition).addTo(this.map.map);
      }
    },
    //聚集地
    addGatheringPlace(gatherPosition){
      var plotLayerTemp=L.Plot.gatheringPlace(gatherPosition).addTo(this.map.map);
      plotLayerTemp.gatherPosition=gatherPosition;
      return plotLayerTemp;
    },

    //聚集地进入编辑
    editGatheringPlace(squadCombatLayer,gatherIconOption){
      this.gatheringPlaceLayer=squadCombatLayer;
      this.gatherPosition=this.gatheringPlaceLayer.gatherPosition;
      this.gatherIconOption=gatherIconOption;
      this.gatheringPlaceLayer.flag=this.gatheringPlaceFlag;
      for (var i = 0; i < this.gatherPosition.length; i++) {
        var markerTemp=this.createPoint(this.gatherPosition[i], i,this.gatheringPlaceFlag);
        markerTemp.on('drag', this.drawGatheringPlaceCallBack,"plot");
        markerTemp.dragging.enable();
      }
    },
    drawGatheringPlaceCallBack(e){
      this.gatherPosition[e.target.oid]=[e.latlng.lat,e.latlng.lng];
      this.showGatheringPlaceToMap();
    },
    //聚集地结束编辑
    endGatheringPlace(plotLayer,editCallback){
      this.clearKeyPoint(plotLayer.flag);
      this.gatheringPlaceLayer.gatherPosition=this.gatherPosition;
      editCallback(this.gatheringPlaceLayer);
    },






    /**
     * 钳击箭头采集
     */
    gatherDoubleArrow(gatherIconOption,gatherCallback){
      this.gatherIconOption=gatherIconOption;
      this.gatherCallback=gatherCallback;
      this.gatherPosition=[];
      this.doubleArrowLayer=null;
      this.floatingPoint=null;
      this.map.map.on("click",this.gatherDoubleArrowClickBack,"plot");
      this.map.map.on("mousemove",this.gatherDoubleArrowMoveBack,"plot");
    },
    gatherDoubleArrowClickBack(e){
      var gatherPointTemp=[e.latlng.lat,e.latlng.lng];
      //console.log("gatherPointTemp",gatherPointTemp);
      var num = this.gatherPosition.length;
      if (num == 0) {
        this.gatherPosition.push(gatherPointTemp);
        this.floatingPoint = this.createPoint(gatherPointTemp, -1,this.doubleArrowFlag);
      }
      this.gatherPosition.push(gatherPointTemp);
      var oid = this.gatherPosition.length - 2;
      this.createPoint(gatherPointTemp, oid,this.doubleArrowFlag);

      if (num > 3) {
        this.gatherPosition.pop();
        this.map.map.removeLayer(this.floatingPoint);
        this.map.map.off("click",this.gatherDoubleArrowClickBack,"plot");
        this.map.map.off("mousemove",this.gatherDoubleArrowMoveBack,"plot");
        //删除关键点
        this.clearKeyPoint(this.doubleArrowFlag);
        this.doubleArrowLayer.gatherPosition=this.gatherPosition;
        this.gatherCallback(this.doubleArrowLayer);
      }
    },
    gatherDoubleArrowMoveBack(e){
      if(this.floatingPoint==null){
        return;
      }
      this.floatingPoint.setLatLng([e.latlng.lat,e.latlng.lng]);
      this.gatherPosition.pop();
      this.gatherPosition.push([e.latlng.lat,e.latlng.lng]);
      this.showDoubleArrowToMap();
    },
    showDoubleArrowToMap(){
      if(this.doubleArrowLayer==null){
        this.doubleArrowLayer=L.Plot.doubleArrow(this.gatherPosition).addTo(this.map.map);
      }else{
        this.map.map.removeLayer(this.doubleArrowLayer);
        this.doubleArrowLayer=null;
        this.doubleArrowLayer=L.Plot.doubleArrow(this.gatherPosition).addTo(this.map.map);
      }
    },


    //添加钳击箭头
    addDoubleArrow(gatherPosition){
      var plotLayerTemp=L.Plot.doubleArrow(gatherPosition).addTo(this.map.map);
      plotLayerTemp.gatherPosition=gatherPosition;
      return plotLayerTemp;
    },

    //钳击箭头进入编辑
    editDoubleArrow(plotLayer,gatherIconOption){
      this.doubleArrowLayer=plotLayer;
      this.gatherPosition=this.doubleArrowLayer.gatherPosition;
      this.gatherIconOption=gatherIconOption;
      this.doubleArrowLayer.flag=this.doubleArrowFlag;
      for (var i = 0; i < this.gatherPosition.length; i++) {
        var markerTemp=this.createPoint(this.gatherPosition[i], i,this.doubleArrowFlag);
        markerTemp.on('drag', this.drawDoubleArrowCallBack,"plot");
        markerTemp.dragging.enable();
      }
    },
    drawDoubleArrowCallBack(e){
      this.gatherPosition[e.target.oid]=[e.latlng.lat,e.latlng.lng];
      this.showDoubleArrowToMap();
    },
    //钳击箭头结束编辑
    endDoubleArrow(assaultDirectionLayer,editCallback){
      this.clearKeyPoint(assaultDirectionLayer.flag);
      this.doubleArrowLayer.gatherPosition=this.gatherPosition;
      editCallback(this.doubleArrowLayer);
    },








    //去除相邻数组内容的对象
    arrNeighborUnique(arr){
      for(var i=0;i<arr.length-1;i++){
        if(arr[i][0]==arr[i+1][0] && arr[i][1]==arr[i+1][1]){
          arr.splice(i,1);
          i=i-1;
        }
      }
      return arr;
    },
    //通用方法
    createPoint(latlng,oid,flag){
      var  gatherIcon=L.icon(this.gatherIconOption);
      var markerTemp=L.marker(latlng,{icon: gatherIcon,opacity:0.9}).addTo(this.map.map);
      markerTemp.oid = oid;
      markerTemp.flag = flag;
      return markerTemp;
    },
    clearKeyPoint(flag){
      console.log("flag",flag);
      if(typeof(flag)=="undefined"){
        return;
      }
      var the=this;
      this.map.map.eachLayer(function(layer){
        //删除layerType不是map值的图层
        if(layer.flag==flag){
          the.map.map.removeLayer(layer);
        }
      });
    },




  },
  beforeCreate() {
  },
  created() {
  },
  beforeMount(){},
  mounted(){
    this.initCoponent();
  },
  beforeUpdate(){},
  updated(){},
  beforeDestroy() {},
  destroyed(){}
}
</script>

<style>

</style>
