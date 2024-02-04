<template>
  <div style="height: 100%;overflow:hidden">
    <!--图层树-->
    <div
      style="float:left;width: 20%;z-index: 999;background: white;height: 100%;overflow-y: auto;overflow-x: hidden">
      <el-tree
        style="padding-top: 20px;padding-left: 10px "
        ref="layerTree"
        :data="gatherTaskTreeData"
        node-key="id"
        class="down-tree"
        show-checkbox
        @check="handleCheckChange"
        default-expand-all
        :highlight-current="true"
        :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span v-if="data.taskid==null"><i class="el-icon-folder"></i>{{ node.label }}</span>
        <span v-if="data.taskid!=null">
          <i v-if="data.type.includes('polyline')" :style="data.colorStyle" class="el-icon-share"></i>
          <i v-if="data.type.includes('polygon')" :style="data.colorStyle" class="el-icon-house"></i>
          <i v-if="data.type.includes('absence')" class="el-icon-tickets"></i>
          <el-image v-if="data.type.includes('point')" style="width: 14px;height: 14px" :src="data.layerimg"></el-image>
          {{ node.label }}
        </span>
      </span>
      </el-tree>
    </div>
    <!--地图组件-->
    <map-component ref="map" :id="id" :type="type" :config="config" :load-end="loadEndFun"
                   style='z-index:100;float:left;height: 100%;width: 60%;'></map-component>

    <!--结果页-->
    <div
      style="float:right;width: 20%;z-index: 999;background: white;height: 100%;overflow-y: auto;overflow-x: hidden">
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item style="background-color: #fff6f7;" v-for="(val, key, index) in allLayer" :name="key">
          <template slot="title">
            <img v-if="val.info.layerimg!=''" :src="val.info.layerimg" width="20px" height="20px">
            <i v-if="val.info.color!=''" :style="val.info.colorStyle" class="el-icon-share"></i>
            <span style="width: 5px"></span>{{ val.info.label }}
          </template>

          <div class="infinite-list-wrapper" style="overflow-y: auto;overflow-x: hidden;height: 500px">
            <ul class="list"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled">
              <li v-for="(items,j) in val.pageShowDataArr" class="list-item">
                <div v-for="(item,i) in items">
                  <el-divider v-if="item.show_flag=='1'" content-position="left" style="margin-left:50px">
                    <span style="font-size: 18px;color:blueviolet;cursor: pointer"
                          @click="findGatherLayerToPosition(item)">{{
                        j + 1
                      }}:{{ item.value }}</span>
                  </el-divider>
                </div>

                <div v-for="(item,i) in items">
                  <!--照片-->
                  <div v-if="item.show_flag=='2'">
                    <div v-if="item.field_type=='photo'" style="padding-left: 15px">
                      <span style="font-size: 14px;font-weight: bold">{{ item.field_dec }}:</span><br>
                      <span v-for="(obj,i) in item.arrValue">
                      <img :src="obj" style="width: 50px;height: 50px;padding-right: 10px">
                    </span>
                    </div>

                    <div v-else-if="item.field_type=='rich'" style="padding-left: 15px">
                      <span style="font-size: 14px;font-weight: bold">{{ item.field_dec }}:</span><br>
                      <span v-html="item.value"></span>
                    </div>

                    <div v-else style="padding-left: 15px">
                      <span style="font-weight: bold">{{ item.field_dec }}:</span><br>{{ item.value }}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <p v-if="loading">加载中...</p>
            <el-divider v-if="noMore" content-position="center"><span
              style="font-size: 18px;">无数据了</span>
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
    </div>

  </div>
</template>

<script>
import {commonSelectRequest, commonSelectRequestAndOtherParam, commonExcuteRequest} from "../common/request"
import {mapConfig} from "../common/mapConfig";
import {getListData} from "../common/tree";

export default {
  data() {
    return {
      id: "map",
      type: "vue",
      config: mapConfig,
      loadEndFun: "loadMapEnd",
      gatherTaskTreeData: [],
      oldCheckedKeys: [],
      pageSize: 10,
      allLayer: {},

      loading: false,


      activeNames: '',

      popupFlag: false,
      onePopupShowData: [],
      twoPopupShowData: [],
      threePopupShowData: [],
      fourPopupShowData: [],


    };
  },
  computed: {
    noMore() {
      if (typeof (this.allLayer[this.activeNames]) != "undefined" && this.allLayer[this.activeNames].noMoreFlag == 1) {
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
  },
  watch: {},
  mounted: function () {
    console.log("采集状况");
    this.allLayer = {};
    this.findGatherTaskTree();
  },
  methods: {
    //查找图层树
    findGatherTaskTree() {
      this.gatherTaskTreeData = [];
      var param = {};
      param.sql = "gather_task_tree.findGatherTaskTree";
      commonSelectRequest(param, this.findGatherTaskTreeCallBack);
    },
    findGatherTaskTreeCallBack(result) {
      this.gatherTaskTreeData = getListData(result);
      console.log("this.gatherTaskTreeData22", this.gatherTaskTreeData);
      this.$nextTick(() => {
        if (typeof (this.$refs.layerTree) != "undefined") {
          this.$refs.layerTree.setCurrentKey(this.currentNodeKey);
        }
      })
    },
    loadMapEnd() {
      console.log("地图加载完成！");
      //查询该任务的采集字段
    },
    handleCheckChange(node, checkedNodes) {
      //console.log("node, checkedNodes", node, checkedNodes);
      var nowChangeTaskids = [];
      for (var i = 0; i < checkedNodes.checkedNodes.length; i++) {
        //console.log("checkedNodes.checkedNodes[i]", checkedNodes.checkedNodes[i]);
        if (checkedNodes.checkedNodes[i].taskid != null) {
          nowChangeTaskids.push(checkedNodes.checkedNodes[i].taskid);
        }
      }
      nowChangeTaskids = this.deleteRepeatArr(nowChangeTaskids);
      //console.log("nowChangeTaskids1111", nowChangeTaskids);


      if (this.oldCheckedKeys.length < nowChangeTaskids.length) {
        let diff = nowChangeTaskids.filter(item => this.oldCheckedKeys.indexOf(item) == -1);
        //console.log("差集", diff);
        //add
        for (var i = 0; i < diff.length; i++) {
          for (var j = 0; j < checkedNodes.checkedNodes.length; j++) {
            if (diff[i] == checkedNodes.checkedNodes[j].taskid) {
              this.findGatherLayerField(checkedNodes.checkedNodes[j]);
            }
          }
        }
      } else {
        //delete
        let diff = this.oldCheckedKeys.filter(item => nowChangeTaskids.indexOf(item) == -1);
        for (var i = 0; i < diff.length; i++) {
          for (let objTemp in this.allLayer) {
            if (diff[i] == this.allLayer[objTemp].info.taskid) {
              //删除地图图层
              this.removeLayerByTableName(this.allLayer[objTemp].info.tablename);
              delete (this.allLayer[objTemp]);
              //重新渲染
              this.allLayer = Object.assign({}, this.allLayer, this.allLayer);
              //console.log("删除后的this.allLayer：", this.allLayer);
            }
          }
        }
      }
      this.oldCheckedKeys = this.coppyArray(nowChangeTaskids);
    },

    findGatherLayerField(taskObj) {
      this.allLayer[taskObj.tablename] = {};
      this.allLayer[taskObj.tablename].noMoreFlag = 0;
      this.allLayer[taskObj.tablename].info = taskObj;
      var param = {};
      param.sql = "gather_task.findGatherLayerField";
      param.taskid = taskObj.taskid;
      commonSelectRequestAndOtherParam(param, this.findGatherLayerFieldCallBack, taskObj);
    },
    findGatherLayerFieldCallBack(result, taskObj) {
      this.allLayer[taskObj.tablename].fields = result;
      //console.log("查询到的图层字段", result,taskObj);
      //采集默认字段
      var layerMapReturnfieldStr = "";
      for (var i = 0; i < result.length; i++) {
        layerMapReturnfieldStr += result[i].field_name + ",";
      }
      layerMapReturnfieldStr = layerMapReturnfieldStr.substr(0, layerMapReturnfieldStr.length - 1);
      //console.log("layerMapReturnfieldStr", layerMapReturnfieldStr);
      this.allLayer[taskObj.tablename].layerReturnfieldStr = layerMapReturnfieldStr;
      var param = {};
      param.sql = "gather_layer.find";
      param.fieldStr = layerMapReturnfieldStr;
      param.layer_name = taskObj.tablename;
      param.start = 0;
      param.pageSize = this.pageSize;
      //console.log("param222222", param);
      commonSelectRequestAndOtherParam(param, this.findGatherLayerByMapCallBack, taskObj);
    },

    //定位
    findGatherLayerToPosition(obj) {
      console.log("findGatherLayerToPosition--obj", obj);
      if (obj.GATHER_ZBX && obj.GATHER_ZBY) {
        this.$refs.map.panTo([obj.GATHER_ZBY,obj.GATHER_ZBX]);//中心点定位
      }
      if (obj.GATHER_ZBC) {
        let zbcTemp = [];
        var xyArrTemp = obj.GATHER_ZBC.split(";");
        console.log("坐标数据：",xyArrTemp);
        for (var i = 0; i < xyArrTemp.length; i++) {
          var xyTemp = xyArrTemp[i].split(",");
          zbcTemp.push([xyTemp[0], xyTemp[1]]);
        }
        this.$refs.map.map.fitBounds(zbcTemp);
      }
      
    },


    findGatherLayerByMapCallBack(result, taskObj) {
      this.allLayer[taskObj.tablename].result = result;
      //console.log(this.allLayer[key]) // foo, bar
      var layer = this.allLayer[taskObj.tablename];

      this.allLayer[taskObj.tablename].pageShowDataArr = [];

      var pageShowDataArrTemp = [];

      for (var i = 0; i < layer.result.length; i++) {
        pageShowDataArrTemp = [];
        for (var j = 0; j < layer.fields.length; j++) {
          if (layer.fields[j].show_flag == "1") {
            var obj = {};
            obj.field_name = layer.fields[j].field_name;
            obj.field_dec = layer.fields[j].field_dec;
            obj.field_type = layer.fields[j].field_type;
            obj.value = layer.result[i][layer.fields[j].field_name];
            obj.show_flag = "1";
            //console.log("layer.result[i]11", layer.result[i]);

            if (layer.result[i].GATHER_ZBC) {
              obj.GATHER_ZBC=layer.result[i].GATHER_ZBC
            }
            if (layer.result[i].GATHER_ZBX) {
              obj.GATHER_ZBX=layer.result[i].GATHER_ZBX
            }
            if (layer.result[i].GATHER_ZBY) {
              obj.GATHER_ZBY=layer.result[i].GATHER_ZBY
            }
            
            
            pageShowDataArrTemp.push(obj);
          }
          if (layer.fields[j].show_flag == "2") {
            var obj = {};
            obj.field_name = layer.fields[j].field_name;
            obj.field_dec = layer.fields[j].field_dec;
            obj.field_type = layer.fields[j].field_type;
            obj.show_flag = "2";
            if (layer.fields[j].field_type == "photo") {
              obj.arrValue = [];
              for (var k = 0; k < layer.result[i][layer.fields[j].field_name].split(",").length; k++) {
                if (layer.result[i][layer.fields[j].field_name].split(",")[k] != "") {
                  obj.arrValue.push(window.gisConfig.serverUrl + "/cbc/getFile.cbc?uuid=" + layer.result[i][layer.fields[j].field_name].split(",")[k] + "&type=photo");
                }
              }
            } else {
              obj.value = layer.result[i][layer.fields[j].field_name];
            }
            pageShowDataArrTemp.push(obj);
          }
        }
        this.allLayer[taskObj.tablename].pageShowDataArr.push(pageShowDataArrTemp);

      }
      this.allLayer = Object.assign({}, this.allLayer, this.allLayer)
      console.log("this.allLayer112", this.allLayer);
      this.activeNames = Object.keys(this.allLayer)[0];
      this.addLayerToMap(result, taskObj);
    },
    addLayerToMap(result, taskObj) {
      console.log("addLayerToMap--result",result);
      //this.activeNames = "";
      //console.log("taskObj", taskObj);
      //上图
      if (taskObj.type == "point") {
        for (var i = 0; i < result.length; i++) {
          var markerJSON = {};
          //xy坐标
          markerJSON.xy = [result[i]["GATHER_ZBY"], result[i]["GATHER_ZBX"]];
          //图片位置
          markerJSON.iconUrl = taskObj.layerimg;
          //图片偏移（坐标固定在图标的哪个点，[0,0]表示图标的左上角）
          markerJSON.iconAnchor = [21, 42];
          //图片大小
          markerJSON.width = 42;
          markerJSON.height = 42;
          var markerTemp = this.$refs.map.addMarker(markerJSON);
          markerTemp.tablename = taskObj.tablename;
          markerTemp.taskObj = taskObj;
          markerTemp.GATHER_ID = result[i]["GATHER_ID"]; 
          //内容绑定
          this.$refs.map.onLayerEvent("click", markerTemp, this.layerClickEventCallBack, "showPopup");
        }
      }
      if (taskObj.type == "polyline") {
        //console.log("颜色值：", taskObj.color);
        for (var i = 0; i < result.length; i++) {
          var polylineJSON = {};
          polylineJSON.xys = this.dealZBC(result[i]["GATHER_ZBC"]);
          //线的样式
          polylineJSON.option = {};
          //线的宽度
          polylineJSON.option.weight = 5;
          //线的颜色
          polylineJSON.option.color = taskObj.color;
          var polyline = this.$refs.map.addPolyline(polylineJSON);
          polyline.tablename = taskObj.tablename;
          polyline.taskObj = taskObj;
          polyline.GATHER_ID = result[i]["GATHER_ID"]; 
          this.$refs.map.onLayerEvent("click", polyline, this.layerClickEventCallBack, "showPopup");

        }
      }

      if (taskObj.type == "polygon") {
        //console.log("颜色值：", taskObj.color);
        for (var i = 0; i < result.length; i++) {
          var polygonJSON = {};
          polygonJSON.xys = this.dealZBC(result[i]["GATHER_ZBC"]);
          //线的样式
          polygonJSON.option = {};
          //线的宽度
          polygonJSON.option.weight = 5;
          //线的颜色
          polygonJSON.option.color = taskObj.color;
          var polygon = this.$refs.map.addPolygon(polygonJSON);
          polygon.tablename = taskObj.tablename;
          polygon.taskObj = taskObj;
          polygon.GATHER_ID = result[i]["GATHER_ID"]; 
          this.$refs.map.onLayerEvent("click", polygon, this.layerClickEventCallBack, "showPopup");

        }
      }

    },

    layerClickEventCallBack(e) {

      console.log("layerClickEventCallBack--e", e);
      this.setPopupData(e);
      this.popupFlag = true;
      var option = {};
      console.log("layerClickEventCallBack--gatherTaskObj", gatherTaskObj);

      let gatherTaskObj = e.target.taskObj;
      
      if (gatherTaskObj.type == "point") {
        option = {closeOnClick: false, closeButton: true, offset: [0, -21], minWidth: 200};
      } else if (gatherTaskObj.type == "polyline" || gatherTaskObj.type == "polygon") {
        option = {closeOnClick: false, closeButton: true, minWidth: 200};
      }
      var point = [e.latlng.lat, e.latlng.lng];
      var html = this.$refs.popupRef;
      this.$refs.map.addPopup(option, point, html);
    },

    setPopupData(e) {

      this.fieldArr = this.allLayer[e.target.taskObj.tablename].fields;
      let result = this.allLayer[e.target.taskObj.tablename].result;

      let resultTemp = {};
      console.log("result", result);
      for (let i = 0; i < result.length;i++){
        if (result[i].GATHER_ID==e.target.GATHER_ID) {
          resultTemp = result[i];
        }
      }
      

      //显示标识为1
      this.onePopupShowData = [];
      for (var i = 0; i < this.fieldArr.length; i++) {
        if (this.fieldArr[i].show_flag == "1") {
          var obj = {};
          obj.field_dec = this.fieldArr[i].field_dec;
          obj.value = resultTemp[this.fieldArr[i].field_name];
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
            for (var j = 0; j < resultTemp[this.fieldArr[i].field_name].split(",").length; j++) {
              if (resultTemp[this.fieldArr[i].field_name].split(",")[j] != "") {
                obj.arrValue.push(window.gisConfig.serverUrl + "/cbc/getFile.cbc?uuid=" + resultTemp[this.fieldArr[i].field_name].split(",")[j] + "&type=photo");
              }
            }
          } else {
            obj.value = resultTemp[this.fieldArr[i].field_name];
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
            for (var j = 0; j < resultTemp[this.fieldArr[i].field_name].split(",").length; j++) {
              if (resultTemp[this.fieldArr[i].field_name].split(",")[j] != "") {
                obj.arrValue.push(window.gisConfig.serverUrl + "/cbc/getFile.cbc?uuid=" + resultTemp[this.fieldArr[i].field_name].split(",")[j] + "&type=photo");
              }
            }
          } else if (obj.field_type == "video") {
            obj.arrValue = [];
            if (resultTemp[this.fieldArr[i].field_name] != null) {
              for (var j = 0; j < resultTemp[this.fieldArr[i].field_name].split(",").length; j++) {
                if (resultTemp[this.fieldArr[i].field_name].split(",")[j] != "") {
                  obj.arrValue.push(window.gisConfig.serverUrl + "/cbc/getFile.cbc?uuid=" + resultTemp[this.fieldArr[i].field_name].split(",")[j] + "&type=video");
                }
              }
            }
          } else if (obj.field_type == "audio") {
            obj.arrValue = [];
            if (resultTemp[this.fieldArr[i].field_name] != null) {
              for (var j = 0; j < resultTemp[this.fieldArr[i].field_name].split(",").length; j++) {
                if (resultTemp[this.fieldArr[i].field_name].split(",")[j] != "") {
                  obj.arrValue.push(window.gisConfig.serverUrl + "/cbc/getFile.cbc?uuid=" + resultTemp[this.fieldArr[i].field_name].split(",")[j] + "&type=audio");
                }
              }
            }
          } else {
            obj.value = resultTemp[this.fieldArr[i].field_name];
          }
          this.threePopupShowData.push(obj);
        }
      }
    },

    removeLayerByTableName(tablename) {
      var the = this;
      the.$refs.map.map.eachLayer(function (layer) {
        //删除layerType不是map值的图层
        if (layer.tablename == tablename) {
          the.$refs.map.map.removeLayer(layer);
        }
      });

    },

    load() {
      console.log("当前展开数据：", this.allLayer[this.activeNames]);
      var param = {};
      param.sql = "gather_layer.find";
      param.fieldStr = this.allLayer[this.activeNames].layerReturnfieldStr;
      param.layer_name = this.allLayer[this.activeNames].info.tablename;
      param.start = this.allLayer[this.activeNames].result.length;
      param.pageSize = this.pageSize;
      //console.log("param222222", param);
      commonSelectRequestAndOtherParam(param, this.addPageLayerResultCallBack, {});
    },
    addPageLayerResultCallBack(result, taskObj) {
      console.log("result123", result);
      //地图数据刷新
      this.addLayerToMap(result, this.allLayer[this.activeNames].info);

      //分页数据刷新
      if (result.length == 0) {
        this.allLayer[this.activeNames].noMoreFlag = 1;
      }
      for (var i = 0; i < result.length; i++) {
        this.allLayer[this.activeNames].result.push(result[i]);
      }

      var layer = this.allLayer[this.activeNames];
      var pageShowDataArrTemp;
      for (var i = 0; i < result.length; i++) {
        pageShowDataArrTemp = [];
        for (var j = 0; j < layer.fields.length; j++) {
          if (layer.fields[j].show_flag == "1") {
            var obj = {};
            obj.field_name = layer.fields[j].field_name;
            obj.field_dec = layer.fields[j].field_dec;
            obj.field_type = layer.fields[j].field_type;
            obj.value = result[i][layer.fields[j].field_name];
            obj.show_flag = "1";
            pageShowDataArrTemp.push(obj);
          }
          if (layer.fields[j].show_flag == "2") {
            var obj = {};
            obj.field_name = layer.fields[j].field_name;
            obj.field_dec = layer.fields[j].field_dec;
            obj.field_type = layer.fields[j].field_type;
            obj.show_flag = "2";
            if (layer.fields[j].field_type == "photo") {
              obj.arrValue = [];
              for (var k = 0; k < result[i][layer.fields[j].field_name].split(",").length; k++) {
                if (result[i][layer.fields[j].field_name].split(",")[k] != "") {
                  obj.arrValue.push(window.gisConfig.serverUrl + "/cbc/getFile.cbc?uuid=" + result[i][layer.fields[j].field_name].split(",")[k] + "&type=photo");
                }
              }
            } else {
              obj.value = result[i][layer.fields[j].field_name];
            }
            pageShowDataArrTemp.push(obj);
          }
        }
        this.allLayer[this.activeNames].pageShowDataArr.push(pageShowDataArrTemp);
      }
      this.allLayer = Object.assign({}, this.allLayer, this.allLayer)
      console.log("this.allLayer[this.activeNames]11232", this.allLayer[this.activeNames]);

    },

    //坐标串处理
    //形如："24.52838418817188,118.1074905395508;24.491210247966478,118.10920715332033;24.471212995009626,118.21460723876955;24.424019389428295,118.15280914306642"
    dealZBC(zbc) {
      var returnArr = [];
      var xyArrTemp = zbc.split(";");
      for (var i = 0; i < xyArrTemp.length; i++) {
        var xyTemp = xyArrTemp[i].split(",");
        returnArr.push([xyTemp[0], xyTemp[1]]);
      }
      return returnArr;
    },
    //删除数组重复元素
    deleteRepeatArr(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[j] === arr[i]) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    },

    //数组深拷贝
    coppyArray(arr) {
      return arr.map((e) => {
        if (typeof e === 'object') {
          return Object.assign({}, e);
        } else {
          return e;
        }
      })
    }


  }
  ,
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
