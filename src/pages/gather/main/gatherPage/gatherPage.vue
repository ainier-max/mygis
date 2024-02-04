<template>
  <div style="height: 100%">
    <!--采集界面-->
    <div
      style="float:left;width: 20%;z-index: 999;background: white;height: 100%;overflow-y: auto;overflow-x: hidden">
      <div align="center" v-if="gatherButtonFlag" style="padding-top: 15px">
        <el-button type="danger" @click="gatherWin" :disabled="gatherFlag" style="width: 300px">数据采集</el-button>
      </div>

      <div v-if="gatherFieldFlag">
        <div v-for="(item,i) in fieldArr">
          <component :ref="item.field_name" is="field-component" :field="item" :valueObj="currentEditObj"></component>
        </div>
        <div align="center">
          <el-button type="primary" v-if="editFlag==false" @click="gather">保存</el-button>
          <el-button type="primary" v-if="editFlag==true" @click="edit">修改</el-button>
        </div>
        <div style="height: 30px"></div>
      </div>

    </div>

    <!--地图组件-->
    <map-component ref="map" :id="id" :type="type" :config="config" :load-end="loadEndFun"
                   style='z-index:100;float:left;height: 100%;width: 60%;'></map-component>

    <!--右侧表格-->
    <div
      style="float:right;width: 20%;z-index: 999;background: white;height: 100%;overflow-y: auto;overflow-x: hidden">
      <el-collapse v-model="activeNames">
        <el-collapse-item style="background-color: #fff6f7;" :title="gatherTaskObj.name" name="1">
          <div class="infinite-list-wrapper" style="overflow-y: auto;overflow-x: hidden;height: 800px">
            <ul class="list"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled">
              <li v-for="(item,i) in onePageShowData" class="list-item">
                <el-divider content-position="left" style="margin-left:50px"><span
                  style="font-size: 18px;color:blueviolet;cursor: pointer" @click="findGatherLayerByMap(item)">{{
                    i + 1
                  }}:{{ item.value }}</span>
                </el-divider>
                <div v-for="(item,j) in twoPageShowData[i]">
                  <!--照片-->
                  <div v-if="item.field_type=='photo'" style="padding-left: 15px">
                    <span style="font-size: 14px;font-weight: bold">{{ item.dec }}:</span><br>
                    <span v-for="(obj,i) in item.arrValue">
                      <img :src="obj" style="width: 50px;height: 50px;padding-right: 10px">
                    </span>
                  </div>

                  <div v-else-if="item.field_type=='rich'" style="padding-left: 15px">
                    <span style="font-size: 14px;font-weight: bold">{{ item.dec }}:</span><br>
                    <span v-html="item.value"></span>
                  </div>

                  <div v-else style="padding-left: 15px">
                    <span style="font-weight: bold">{{ item.dec }}:</span><br>{{ item.value }}
                  </div>
                </div>
              </li>
            </ul>
            <p v-if="loading">加载中...</p>
            <el-divider v-if="noMore" content-position="center"><span
              style="font-size: 18px;">没有数据了</span>
            </el-divider>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!--气泡框-->
    <div v-show="popupFlag" ref="popupRef" style="width: 100%;height: 100%;">
      <div style="width: 100%;height: 300px;overflow-y: auto;overflow-x: hidden">
        <!--标识为1的字段-->
        <div v-for="(item,i) in onePopupShowData" class="list-item">
          <span style="font-size: 18px;font-weight: bold">{{ item.field_dec }}:</span><br>
          <span style="font-size: 18px;">{{ item.value }}</span>
        </div>
        <!--标识为2的字段-->
        <div v-for="(item,i) in twoPopupShowData" class="list-item">
          <!--照片-->
          <div v-if="item.field_type=='photo'">
            <span style="font-size: 14px;font-weight: bold">{{ item.field_dec }}:</span><br>
            <span v-for="(obj,i) in item.arrValue">
            <img :src="obj" style="width: 50px;height: 50px;padding-right: 10px">
          </span>
          </div>
          <!--富文本-->
          <div v-else-if="item.field_type=='rich'">
            <span style="font-size: 14px;font-weight: bold">{{ item.field_dec }}:</span><br>
            <span v-html="item.value"></span>
          </div>
          <!--其他字段-->
          <div v-else>
            <span style="font-size: 14px;font-weight: bold">{{ item.field_dec }}:</span><br><span>{{
              item.value
            }}</span>
          </div>

        </div>
        <!--标识为3的字段-->
        <div v-for="(item,i) in threePopupShowData" class="list-item">
          <!--照片-->
          <div v-if="item.field_type=='photo'">
            <span style="font-size: 14px;">{{ item.field_dec }}:</span><br>
            <span v-for="(obj,i) in item.arrValue">
            <img :src="obj" style="width: 50px;height: 50px">
          </span>
          </div>
          <!--视频-->
          <div v-else-if="item.field_type=='video'">
            <span style="font-size: 14px;">{{ item.field_dec }}:</span><br>
            <div v-for="(obj,i) in item.arrValue">
              <video style="width: 200px;height: 120px" controls="controls">
                <source :src="obj" type="video/mp4">
              </video>
            </div>
          </div>
          <!--音频-->
          <div v-else-if="item.field_type=='audio'">
            <span style="font-size: 14px;">{{ item.field_dec }}:</span><br>
            <div v-for="(obj,i) in item.arrValue">
              <audio style="width: 200px;height: 60px" controls>
                <source :src="obj" type="audio/mpeg">
                您的浏览器不支持 audio 元素。
              </audio>
            </div>
          </div>
          <!--富文本-->
          <div v-else-if="item.field_type=='rich'">
            <span style="font-size: 14px;">{{ item.field_dec }}:</span><br>
            <span v-html="item.value"></span>
          </div>
          <!--其他字段-->
          <div v-else>
            <span style="font-size: 14px;">{{ item.field_dec }}:</span><br><span>{{ item.value }}</span>
          </div>
        </div>
      </div>
      <el-button type="success" @click="showEditWin" style="margin-top: 10px" size="mini">修改</el-button>
    </div>


  </div>
</template>
<script>
import {mapConfig} from "../common/mapConfig"
import {commonSelectRequest, commonExcuteRequest} from "../common/request"
import fieldComponent from "./fieldComponent";

export default {
  name: "demo",
  props: {},
  data() {
    return {
      id: "map",
      type: "vue",
      config: mapConfig,
      loadEndFun: "loadMapEnd",
      layerImg: '',
      fieldArr: [],
      gatherButtonFlag: true,
      gatherFieldFlag: false,
      gatherTaskObj: {},
      tableFieldValue: {},
      gatherMarker: null,
      gatherPolyline: null,
      gatherPolygon: null,

      activeNames: ['1'],
      curPage: 1,//当前页
      pageSize: 10,//每页数据量
      loading: false,
      layerPageReturnfieldStr: "",
      onePageShowData: [],
      twoPageShowData: [],
      loadFlag: 0,//页面加载标识,0为首次加载
      noMoreFlag: 0,

      layerMapReturnfieldStr: '',
      popupFlag: false,
      onePopupShowData: [],
      twoPopupShowData: [],
      threePopupShowData: [],
      fourPopupShowData: [],

      //点击列表时的对象值
      currentEditObj: null,

      editFlag: false,
      gatherFlag: false,

    } 
  },
  computed: {
    noMore() {
      if (this.noMoreFlag == 1) {
        return true;
      } else {
        return false;
      }
    },
    disabled() {
      return this.loading || this.noMore
    }
  },

  components: {
    'map-component': httpVueLoader('../../static/map/vue-map-component/leaflet/map-component.vue', 'frontEnd'),
    'field-component': fieldComponent

  },
  methods: {
    loadMapEnd() {
      console.log("地图加载完成！");
      //查询该任务的采集字段
      var param = {};
      param.sql = "gather_task.findGatherLayerField";
      param.taskid = this.$route.query.taskid;
      console.log("param", param);
      commonSelectRequest(param, this.findGatherLayerFieldCallBack);
      if (this.$route.query.type == "point") {
        var paramTemp = {};
        paramTemp.sql = "gather_task.findGatherLayerImg";
        paramTemp.taskid = this.$route.query.taskid;
        console.log("param", paramTemp);
        commonSelectRequest(paramTemp, this.findGatherLayerImgCallBack);
      }
    },
    findGatherLayerImgCallBack(result) {
      this.layerImg = result[0].layerimg;
      //console.log("点图层对应的图片：",this.layerImg);
    },
    findGatherLayerFieldCallBack(result) {
      this.fieldArr = [];
      console.log("查询到的图层字段", result);
      for (var i = 0; i < result.length; i++) {
        if (result[i].field_name.indexOf("GATHER_") < 0) {
          this.fieldArr.push(result[i]);
        }
      }
      this.onePageShowData = [];
      this.twoPageShowData = [];
      this.findGatherLayerByPage();
    },


    gatherWin() {
      this.currentEditObj = null;
      //清空地图
      this.clearMap();

      this.gatherButtonFlag = false;
      this.gatherFieldFlag = true;
      if (this.gatherTaskObj.type == "point") {
        this.drawPoint();
      }
      if (this.gatherTaskObj.type == "polyline") {
        this.drawPolyline();
      }
      if (this.gatherTaskObj.type == "polygon") {
        this.drawPolygon();
      }
    },
    //采集面
    drawPolygon() {
      this.$refs.map.drawPolygon(this.drawPolygonReceiver);
    },
    drawPolygonReceiver(polygonObj) {
      console.log("polygonObj", polygonObj);
      this.gatherPolygon = polygonObj;
    },
    //采集线
    drawPolyline() {
      this.$refs.map.drawPolyline(this.drawPolylineReceiver);
    },
    drawPolylineReceiver(polylineObj) {
      //console.log("上图的对象", polylineObj);
      //console.log("获取的坐标：", polylineObj.zbc);
      this.gatherPolyline = polylineObj;
    },

    //采集点
    drawPoint() {
      //采集点图标
      var markerJSON = {};
      //绝对路径
      markerJSON.iconUrl = this.gatherTaskObj.layerimg;
      //图片偏移（坐标固定在图标的哪个点，[0,0]表示图标的左上角）
      markerJSON.iconAnchor = [21, 42];
      //图片大小
      markerJSON.width = 42;
      markerJSON.height = 42;
      var dragFlag = true;//是否可移动,仅适用于leaflet开发技术，minemap不生效
      this.$refs.map.drawMarker(markerJSON, dragFlag, this.drawPointReceiver);
    },
    drawPointReceiver(markerObj) {
      this.gatherMarker = markerObj;
      console.log("上图的对象", markerObj);
      console.log("采集坐标：", markerObj.xy);
    },


    //采集
    gather() {
      for (var i = 0; i < this.fieldArr.length; i++) {
        //判断多媒体上传是否完成
        if (this.fieldArr[i].field_type == "photo" || this.fieldArr[i].field_type == "audio" || this.fieldArr[i].field_type == "video") {
          if (this.$refs[this.fieldArr[i].field_name][0].fileEndFlag == false) {
            this.$message.error("文件未上传完成，请稍后保存！");
            return;
          }
        }

        //判断标题字段内容
        if (this.fieldArr[i].show_flag == "1") {
          console.log("this.tableFieldValue[this.fieldArr[i].field_name]", this.tableFieldValue[this.fieldArr[i].field_name]);
          if (typeof (this.tableFieldValue[this.fieldArr[i].field_name]) == "undefined") {
            this.$message.error("标题字段未采集！");
            return;
          }
        }
      }
      //判断坐标数据
      console.log("采集");
      if (this.gatherTaskObj.type == "point") {
        if (this.gatherMarker == null) {
          this.$message.error("未在地图进行采集！");
          return;
        }
      }
      if (this.gatherTaskObj.type == "polyline") {
        if (this.gatherPolyline == null) {
          this.$message.error("未在地图进行采集！");
          return;
        }
      }
      if (this.gatherTaskObj.type == "polygon") {
        if (this.gatherPolygon == null) {
          this.$message.error("未在地图进行采集！");
          return;
        }
        //this.tableFieldValue.GATHER_ZBC=this.gatherPolygon;
      }
      //保存数据
      console.log("tableFieldValue111", this.tableFieldValue);
      console.log("this.gatherTaskObj111", this.gatherTaskObj);
      console.log("this.fieldArr", this.fieldArr);

      var param = {};
      param.sql = "gather_layer.insert";
      param.table_name = this.gatherTaskObj.table_name;
      param.gather_type = this.gatherTaskObj.type;

      param.keys = [];
      param.values = [];

      for (var i = 0; i < this.fieldArr.length; i++) {
        param.keys.push(this.fieldArr[i].field_name);
        if (typeof (this.tableFieldValue[this.fieldArr[i].field_name]) != "undefined") {
          param.values.push(this.tableFieldValue[this.fieldArr[i].field_name]);
        } else {
          param.values.push("");
        }
      }
      if (this.gatherTaskObj.type == "point") {
        param.gather_zbx = this.gatherMarker.xy.lng;
        param.gather_zby = this.gatherMarker.xy.lat;
      }
      if (this.gatherTaskObj.type == "polyline") {
        var xyStr = "";
        for (var i = 0; i < this.gatherPolyline.zbc.length; i++) {
          xyStr = xyStr + "" + this.gatherPolyline.zbc[i].lat + "," + this.gatherPolyline.zbc[i].lng + ";";
        }
        xyStr = xyStr.substr(0, xyStr.length - 1);
        console.log("获取的坐标数据：", xyStr);
        param.gather_zbc = xyStr;
      }
      if (this.gatherTaskObj.type == "polygon") {
        var xyStr = "";
        for (var i = 0; i < this.gatherPolygon.zbc.length; i++) {
          xyStr = xyStr + this.gatherPolygon.zbc[i][0] + "," + this.gatherPolygon.zbc[i][1] + ";";
        }
        xyStr = xyStr.substr(0, xyStr.length - 1);
        console.log("获取的坐标数据：", xyStr);
        param.gather_zbc = xyStr;
      }
      param.gather_cjr = window.localStorage.getItem('loginUserid');
      param.gather_cjjq = window.localStorage.getItem('clientIP');
      console.log("采集的param",param);
      commonExcuteRequest(param, this.gatherCallBack);
    },
    gatherCallBack(result) {
      this.$message({message: '采集数据成功！', type: 'success'});

      this.gatherButtonFlag = true;
      this.gatherFieldFlag = false;
      //清空地图
      this.gatherMarker = null;
      this.gatherPolyline = null;
      this.gatherPolygon = null;
      this.clearMap();

      //清空页面数据
      this.curPage = 1;
      this.onePageShowData = [];
      this.twoPageShowData = [];
      this.loadFlag = 0;//页面加载标识,0为首次加载
      this.noMoreFlag = 0;
      this.findGatherLayerByPage();
    },
    clearMap() {
      var the = this;
      the.$refs.map.map.eachLayer(function (layer) {
        //删除layerType不是map值的图层
        if (layer.type != "tileLayer" && layer.type != "otherTileLayer") {
          the.$refs.map.map.removeLayer(layer);
        }
      });
    },
    //根据任务id查询采集任务信息
    findGatherTask() {
      var param = {};
      param.sql = "gather_task.findGatherTask";
      param.id = this.$route.query.taskid;
      param.flag = "1";
      commonSelectRequest(param, this.findGatherTaskCallBack);
    },
    findGatherTaskCallBack(result) {
      if (result.length > 0) {
        this.gatherTaskObj = result[0];
      }
    },

    //查找采集图层数据
    findGatherLayerByPage() {
      if (this.fieldArr.length <= 0) {
        return;
      }
      //判断是否含有标识为1的字段
      var showFlagTemp = 0;
      for (var i = 0; i < this.fieldArr.length; i++) {
        if (this.fieldArr[i].show_flag == "1") {
          showFlagTemp = 1;
        }
      }
      if (showFlagTemp == 0) {
        this.gatherFlag = true;
        this.$message.error("该采集任务未设置标识为1的字段！不能进行采集");
        return;
      }
      //console.log("this.fieldArr33333:",this.fieldArr);
      this.layerPageReturnfieldStr = "";
      for (var i = 0; i < this.fieldArr.length; i++) {
        if (this.fieldArr[i].show_flag == "1" || this.fieldArr[i].show_flag == "2") {
          this.layerPageReturnfieldStr += this.fieldArr[i].field_name + ",";
        }
      }
      this.layerPageReturnfieldStr = this.layerPageReturnfieldStr + "gather_id"

      //this.layerPageReturnfieldStr = this.layerPageReturnfieldStr.substr(0, this.layerPageReturnfieldStr.length - 1);
      //console.log("fieldStr2222:",this.layerPageReturnfieldStr);
      var start = (this.curPage - 1) * this.pageSize;
      var param = {};
      param.sql = "gather_layer.find";
      param.fieldStr = this.layerPageReturnfieldStr;
      param.layer_name = this.fieldArr[0].table_name;
      param.start = start;
      param.pageSize = this.pageSize;
      //console.log("param222222", param);
      commonSelectRequest(param, this.findGatherLayerByPageCallBack);
    },
    findGatherLayerByPageCallBack(result) {
      console.log("result444", result);
      if (result.length == 0) {
        this.noMoreFlag = 1;
      }
      console.log("this.fieldArr444", this.fieldArr);
      for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < this.fieldArr.length; j++) {
          if (this.fieldArr[j].show_flag == "1") {
            var obj = {};
            obj.showFlag = "1";
            obj.name = this.fieldArr[j].field_name;
            obj.dec = this.fieldArr[j].field_dec;
            obj.value = result[i][obj.name];
            obj.gatherID = result[i]["gather_id"];
            this.onePageShowData.push(obj);
          }
        }
      }
      console.log("onePageShowData", this.onePageShowData);
      for (var i = 0; i < result.length; i++) {
        var arr = [];
        for (var j = 0; j < this.fieldArr.length; j++) {
          if (this.fieldArr[j].show_flag == "2") {
            var obj = {}
            obj.showFlag = "2";
            obj.name = this.fieldArr[j].field_name;
            obj.dec = this.fieldArr[j].field_dec;
            obj.field_type = this.fieldArr[j].field_type;
            if (this.fieldArr[j].field_type == "photo") {
              obj.arrValue = [];
              for (var k = 0; k < result[i][obj.name].split(",").length; k++) {
                if (result[i][obj.name].split(",")[k] != "") {
                  obj.arrValue.push(window.gisConfig.serverUrl + "/cbc/getFile.cbc?uuid=" + result[i][obj.name].split(",")[k] + "&type=photo");
                }
              }
            } else {
              obj.value = result[i][obj.name];
            }
            arr.push(obj);
          }
        }
        this.twoPageShowData.push(arr);
      }
      console.log("twoPageShowData", this.twoPageShowData);
      //this.layerPageTableArrData=result;
      this.loading = false;
      this.loadFlag = 1;
    },
    load() {
      if (this.loadFlag == 0) {
        return;
      } else {
        console.log("加载页面11111", this.curPage);
        this.loading = true
        this.curPage = this.curPage + 1;
        this.findGatherLayerByPage();
      }
    },

    //定位
    findGatherLayerByMap(obj) {
      this.gatherButtonFlag = true;
      this.gatherFieldFlag = false;
      this.editFlag = false;
      this.$refs.map.closeAllPopup();


      console.log("定位信息", obj);
      console.log("this.gatherTaskObj:", this.gatherTaskObj);
      //采集默认字段
      this.layerMapReturnfieldStr = "gather_id,gather_cjsj,gather_cjr,gather_cjjq,gather_gxsj,gather_gxry,gather_zxsj,gather_zxry,gather_zxyy,gather_zxzt,";
      for (var i = 0; i < this.fieldArr.length; i++) {
        this.layerMapReturnfieldStr += this.fieldArr[i].field_name + ",";
      }
      if (this.gatherTaskObj.type == "point") {
        this.layerMapReturnfieldStr += "gather_zbx,gather_zby";
      } else if (this.gatherTaskObj.type == "polyline" || this.gatherTaskObj.type == "polygon") {
        this.layerMapReturnfieldStr += "gather_zbc";
      }
      console.log("this.layerMapReturnfieldStr", this.layerMapReturnfieldStr);

      var param = {};
      param.sql = "gather_layer.find";
      param.fieldStr = this.layerMapReturnfieldStr;
      param.layer_name = this.fieldArr[0].table_name;
      param.gather_id = obj.gatherID;
      //console.log("param222222", param);
      commonSelectRequest(param, this.findGatherLayerByMapCallBack);
    },
    findGatherLayerByMapCallBack(result) {
      this.currentEditObj = result[0];
      console.log("定位结果：", this.currentEditObj);

      //移除点击事件
      this.$refs.map.map.off("click");//移除所有监听对象
      this.gatherButtonFlag = true;
      this.gatherFieldFlag = false;
      //清空地图
      this.gatherMarker = null;
      this.gatherPolyline = null;
      this.gatherPolygon = null;
      this.clearMap();
      if (result.length == 0) {
        return;
      }

      if (this.gatherTaskObj.type == "point") {
        console.log("上点图标", this.layerImg);
        var markerJSON = {};
        //xy坐标
        markerJSON.xy = [result[0]["gather_zby"], result[0]["gather_zbx"]];
        this.$refs.map.panTo(markerJSON.xy);//中心点定位
        //图片位置
        markerJSON.iconUrl = this.layerImg;
        //图片偏移（坐标固定在图标的哪个点，[0,0]表示图标的左上角）
        markerJSON.iconAnchor = [21, 42];
        //图片大小
        markerJSON.width = 42;
        markerJSON.height = 42;
        this.gatherMarker = this.$refs.map.addMarker(markerJSON);
        console.log("图标对象", this.gatherMarker);
        //内容绑定
        this.$refs.map.onLayerEvent("click", this.gatherMarker, this.layerClickEventCallBack, "showPopup");
      }

      if (this.gatherTaskObj.type == "polyline") {
        console.log("颜色值：", this.gatherTaskObj.color);
        var zbcTemp = [];
        var xyArrTemp = this.currentEditObj.gather_zbc.split(";");
        for (var i = 0; i < xyArrTemp.length; i++) {
          var xyTemp = xyArrTemp[i].split(",");
          zbcTemp.push([xyTemp[0], xyTemp[1]]);
        }
        var polylineJSON = {};
        polylineJSON.xys = zbcTemp;
        this.$refs.map.map.fitBounds(zbcTemp);
        //线的样式
        polylineJSON.option = {};
        //线的宽度
        polylineJSON.option.weight = 5;
        //线的颜色
        polylineJSON.option.color = this.gatherTaskObj.color;
        this.gatherPolyline = this.$refs.map.addPolyline(polylineJSON);
        console.log("this.gatherPolyline", this.gatherPolyline);
        //内容绑定
        this.$refs.map.onLayerEvent("click", this.gatherPolyline, this.layerClickEventCallBack, "showPopup");
      }

      if (this.gatherTaskObj.type == "polygon") {
        console.log("颜色值：", this.gatherTaskObj.color);
        var zbcTemp = [];
        var xyArrTemp = this.currentEditObj.gather_zbc.split(";");
        console.log("坐标数据：",xyArrTemp);
        for (var i = 0; i < xyArrTemp.length; i++) {
          var xyTemp = xyArrTemp[i].split(",");
          zbcTemp.push([xyTemp[0], xyTemp[1]]);
        }
        var polygonJSON = {};
        polygonJSON.xys = zbcTemp;
        this.$refs.map.map.fitBounds(zbcTemp);
        //线的样式
        polygonJSON.option = {};
        //线的宽度
        polygonJSON.option.weight = 5;
        //线的颜色
        polygonJSON.option.color = this.gatherTaskObj.color;
        this.gatherPolygon = this.$refs.map.addPolygon(polygonJSON);
        console.log("this.gatherPolygon", this.gatherPolygon);
        //内容绑定
        this.$refs.map.onLayerEvent("click", this.gatherPolygon, this.layerClickEventCallBack, "showPopup");
      }




      //显示标识为1
      this.onePopupShowData = [];
      for (var i = 0; i < this.fieldArr.length; i++) {
        if (this.fieldArr[i].show_flag == "1") {
          var obj = {};
          obj.field_dec = this.fieldArr[i].field_dec;
          obj.value = result[0][this.fieldArr[i].field_name];
          this.onePopupShowData.push(obj);
        }
      }
      //显示标识为2
      this.twoPopupShowData = [];
      for (var i = 0; i < this.fieldArr.length; i++) {
        if (this.fieldArr[i].show_flag == "2") {

          var obj = {};
          obj.field_dec = this.fieldArr[i].field_dec;
          obj.field_type = this.fieldArr[i].field_type;
          if (obj.field_type == "photo") {
            obj.arrValue = [];
            for (var j = 0; j < result[0][this.fieldArr[i].field_name].split(",").length; j++) {
              if (result[0][this.fieldArr[i].field_name].split(",")[j] != "") {
                obj.arrValue.push(window.gisConfig.serverUrl + "/cbc/getFile.cbc?uuid=" + result[0][this.fieldArr[i].field_name].split(",")[j] + "&type=photo");
              }
            }
          } else {
            obj.value = result[0][this.fieldArr[i].field_name];
          }
          this.twoPopupShowData.push(obj);
        }
      }


      //显示标识为3
      this.threePopupShowData = [];
      for (var i = 0; i < this.fieldArr.length; i++) {
        if (this.fieldArr[i].show_flag == "3") {
          console.log("this.fieldArr[i]--3", this.fieldArr[i]);
          var obj = {};
          obj.field_dec = this.fieldArr[i].field_dec;
          obj.field_type = this.fieldArr[i].field_type;
          if (obj.field_type == "photo") {
            obj.arrValue = [];
            for (var j = 0; j < result[0][this.fieldArr[i].field_name].split(",").length; j++) {
              if (result[0][this.fieldArr[i].field_name].split(",")[j] != "") {
                obj.arrValue.push(window.gisConfig.serverUrl + "/cbc/getFile.cbc?uuid=" + result[0][this.fieldArr[i].field_name].split(",")[j] + "&type=photo");
              }
            }
          } else if (obj.field_type == "video") {
            obj.arrValue = [];
            if (result[0][this.fieldArr[i].field_name] != null) {
              for (var j = 0; j < result[0][this.fieldArr[i].field_name].split(",").length; j++) {
                if (result[0][this.fieldArr[i].field_name].split(",")[j] != "") {
                  obj.arrValue.push(window.gisConfig.serverUrl + "/cbc/getFile.cbc?uuid=" + result[0][this.fieldArr[i].field_name].split(",")[j] + "&type=video");
                }
              }
            }
          } else if (obj.field_type == "audio") {
            obj.arrValue = [];
            if (result[0][this.fieldArr[i].field_name] != null) {
              for (var j = 0; j < result[0][this.fieldArr[i].field_name].split(",").length; j++) {
                if (result[0][this.fieldArr[i].field_name].split(",")[j] != "") {
                  obj.arrValue.push(window.gisConfig.serverUrl + "/cbc/getFile.cbc?uuid=" + result[0][this.fieldArr[i].field_name].split(",")[j] + "&type=audio");
                }
              }
            }
          } else {
            obj.value = result[0][this.fieldArr[i].field_name];
          }
          this.threePopupShowData.push(obj);
        }
      }


    },
    layerClickEventCallBack(e) {
      console.log("气泡框显示", e);
      this.popupFlag = true;
      var option = {};
      if (this.gatherTaskObj.type == "point") {
        option = {closeOnClick: false, closeButton: true, offset: [0, -21], minWidth: 200};
      } else if (this.gatherTaskObj.type == "polyline" || this.gatherTaskObj.type == "polygon") {
        option = {closeOnClick: false, closeButton: true, minWidth: 200};
      }
      var point = [e.latlng.lat, e.latlng.lng];
      var html = this.$refs.popupRef;
      this.$refs.map.addPopup(option, point, html);
    },

    showEditWin() {
      console.log("要修改的对象", this.currentEditObj);
      console.log("要修改的对象字段", this.fieldArr);
      this.gatherButtonFlag = false;
      this.gatherFieldFlag = true;
      this.editFlag = true;
      this.$refs.map.closeAllPopup();
      if(this.gatherTaskObj.type == "point"){
        this.gatherMarker.dragging.enable();
      }else if (this.gatherTaskObj.type == "polyline" || this.gatherTaskObj.type == "polygon") {
        //this.gatherPolyline
        this.$refs.map.startEditPolyline(this.gatherPolyline);
      }


    },
    //修改
    edit() {
      for (var i = 0; i < this.fieldArr.length; i++) {
        //判断多媒体上传是否完成
        if (this.fieldArr[i].field_type == "photo" || this.fieldArr[i].field_type == "audio" || this.fieldArr[i].field_type == "video") {
          if (this.$refs[this.fieldArr[i].field_name][0].fileEndFlag == false) {
            this.$message.error("文件未上传完成，请稍后保存！");
            return;
          }
        }

        //判断标题字段内容
        if (this.fieldArr[i].show_flag == "1") {
          //console.log("this.tableFieldValue[this.fieldArr[i].field_name]", this.tableFieldValue[this.fieldArr[i].field_name]);
          if (typeof (this.tableFieldValue[this.fieldArr[i].field_name]) == "undefined") {
            this.$message.error("标题字段未采集！");
            return;
          }
        }
      }
      //修改得数据情况
      console.log("tableFieldValue111", this.tableFieldValue);
      console.log("this.gatherTaskObj111", this.gatherTaskObj);
      console.log("this.fieldArr", this.fieldArr);
      var param = {};
      param.sql = "gather_layer.update";
      param.table_name = this.gatherTaskObj.table_name;
      param.gather_type = this.gatherTaskObj.type;

      param.key_values = [];
      for (var i = 0; i < this.fieldArr.length; i++) {
        if (typeof (this.tableFieldValue[this.fieldArr[i].field_name]) != "undefined") {
          var valueTemp = this.tableFieldValue[this.fieldArr[i].field_name].toString().replace(/\\/g, "\\\\");
          var key_value_obj = this.fieldArr[i].field_name + "='" + valueTemp + "'";
          param.key_values.push(key_value_obj);
        } else {
          var key_value_obj = this.fieldArr[i].field_name + "=''";
          param.key_values.push(key_value_obj);
        }
      }
      if (this.gatherTaskObj.type == "point") {
        //console.log("this.gatherMarker33",this.gatherMarker);
        param.gather_zbx = this.gatherMarker._latlng.lng;
        param.gather_zby = this.gatherMarker._latlng.lat;
      }

      if (this.gatherTaskObj.type == "polyline") {
        var xyStr = "";
        for (var i = 0; i < this.gatherPolyline.zbc.length; i++) {
          xyStr = xyStr + "" + this.gatherPolyline.zbc[i].lat + "," + this.gatherPolyline.zbc[i].lng + ";";
        }
        xyStr = xyStr.substr(0, xyStr.length - 1);
        console.log("获取的坐标数据：", xyStr);
        param.gather_zbc = xyStr;
      }
      if (this.gatherTaskObj.type == "polygon") {
        var xyStr = "";
        for (var i = 0; i < this.gatherPolygon.zbc.length; i++) {
          xyStr = xyStr + this.gatherPolygon.zbc[i][0] + "," + this.gatherPolygon.zbc[i][1] + ";";
        }
        xyStr = xyStr.substr(0, xyStr.length - 1);
        console.log("获取的坐标数据：", xyStr);
        param.gather_zbc = xyStr;
      }
      param.gather_cjr = window.localStorage.getItem('loginUserid');
      param.gather_cjjq = window.localStorage.getItem('clientIP');
      //console.log("this.currentEditObj55555",this.currentEditObj);
      param.gather_id = this.currentEditObj.gather_id;
      //console.log("param333", param);
      commonExcuteRequest(param, this.editCallBack);
    },
    editCallBack(result) {
      if (result.state == 'success') {
        this.$message({message: '修改数据成功！', type: 'success'});
        this.gatherButtonFlag = true;
        this.gatherFieldFlag = false;
        //清空地图
        this.gatherMarker = null;
        this.gatherPolyline = null;
        this.gatherPolygon = null;
        this.clearMap();
        //清空页面数据
        this.curPage = 1;
        this.onePageShowData = [];
        this.twoPageShowData = [];
        this.loadFlag = 0;//页面加载标识,0为首次加载
        this.noMoreFlag = 0;
        this.findGatherLayerByPage();
      } else {
        this.$message({message: '修改数据失败！', type: 'error'});
      }

    },

  },
  mounted: function () {
    this.findGatherTask();

  },
}
</script>

<style scoped>
/deep/ .el-collapse-item__header {
  background-color: #E6E6FA;
  border-left: 1px solid #EBEEF5;
  padding-left: 10px;
}

/deep/ .el-collapse-item__header {
  font-size: 20px;
}
</style>
