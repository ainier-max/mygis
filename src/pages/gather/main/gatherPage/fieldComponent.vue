<template>
  <div style="width: 100%;">
    <el-form style="width: 100%;padding-left: 15px" ref="fieldDataForm">
      <el-form-item style="width: 100%"
                    v-if="field.field_type=='word' && field.field_name!='GATHER_ZBX' && field.field_name!='GATHER_ZBY'">
        <!--<span style="font-size: 16px">{{ field.field_dec }}</span><br>-->
        <el-divider content-position="left"><span :style="fontStyle">{{ field.field_dec }}</span>
        </el-divider>
        <el-input size="small" style="width:300px" v-model="wordFieldValue"
                  :placeholder="field.field_dec"></el-input>
      </el-form-item>

      <el-form-item v-if="field.field_type=='time'">
        <el-divider content-position="left"><span :style="fontStyle">{{ field.field_dec }}</span>
        </el-divider>
        <el-date-picker
          style="width:300px"
          size="small"
          v-model="timeFieldValue"
          type="datetime"
          :placeholder="field.field_dec"
          default-time="12:00:00"
          value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>

      <el-form-item v-if="field.field_type=='rich'">
        <el-divider content-position="left"><span :style="fontStyle">{{ field.field_dec }}</span>
        </el-divider>
        <el-button :type="richButtonType" size="small" ref="richRef" @click="showRichWin">富文本编辑窗口</el-button>
        <br>
        <span v-if="richFieldValue!=''"
              style="overflow: hidden;text-overflow: ellipsis;-o-text-overflow: ellipsis;white-space:nowrap;width:300px;display:block;">当前编辑内容：{{
            richFieldValue
          }}</span>
      </el-form-item>


      <el-form-item v-if="field.field_type=='select'">
        <el-divider content-position="left"><span :style="fontStyle">{{ field.field_dec }}</span>
        </el-divider>
        <el-select size="small" v-model="selectFieldValue" @change="filedSelectChange"
                   style="width:300px;padding-top: 5px"
                   placeholder="请选择">
          <el-option
            v-for="selectItem in selectArrData"
            :key="selectItem.dicdataid"
            :label="selectItem.dicdataname"
            :value="selectItem.dicdataname">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="field.field_type=='tree'">
        <el-divider content-position="left"><span :style="fontStyle">{{ field.field_dec }}</span>
        </el-divider>
        <el-button :type="treeButtonType" size="small" ref="treeRef" @click="showTreeWin">树形选择窗口</el-button>
        <br>
        <span v-if="treeFieldValue!=''">当前选择内容：{{ treeFieldValue }}</span>
      </el-form-item>


      <el-form-item v-if="field.field_type=='photo' || field.field_type=='audio' || field.field_type=='video'">
        <el-divider content-position="left"><span :style="fontStyle">{{ field.field_dec }}</span>
        </el-divider>

        <!--照片-->
        <div v-if="editPhotoArr.length>0">
            <span v-for="(uuid,i) in editPhotoArr">
              <div class="img-box" v-if="uuid!=null && uuid!=''">
                <img :src="serverUrl+'/cbc/getFile.cbc?uuid=' + uuid+ '&type=photo'" class="cover-img" style="width: 50px;height: 50px;padding-right: 10px">
                <span class="image-remove" @click="removePhotoByUUID(uuid)">+</span>
              </div>
            </span>
        </div>

        <!--音频-->
        <div v-if="editAudioFlag==1" :id="audioHTMLID"></div>
        <!--视频-->
        <div v-if="editVideoFlag==1" :id="videoHTMLID"></div>

        <el-upload
          style="width: 300px"
          :action="uploadUrl"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :data="paramData"
          :before-remove="beforeRemove"
          :before-upload="beforeAvatarUpload"
          multiple
          :limit="5"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :list-type="listType">
          <el-button size="small" type="warning">{{ buttonTip }}</el-button>
          <div slot="tip" class="el-upload__tip">{{ fileTip }}</div>
        </el-upload>
      </el-form-item>


    </el-form>


    <el-dialog
      title="富文本编辑框"
      :visible.sync="richFieldDialogVisible"
      :modal-append-to-body="true"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="60%" style="z-index: 9999">
      <quill-editor ref="richText" style="height: 200px" v-model="richFieldValue" :options="editorOption"/>
      <div style="height: 40px"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="richConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="树形选择"
      :visible.sync="treeFieldDialogVisible"
      :modal-append-to-body="true"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="60%" style="z-index: 9999">

      <el-tree
        ref="layerTree"
        :data="treeData"
        @node-click="handleNodeClick"
        node-key="id"
        class="down-tree"
        default-expand-all
        :highlight-current="true"
        :expand-on-click-node="false">

      </el-tree>
    </el-dialog>


  </div>
</template>
<script>
import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {commonSelectRequest} from "../common/request";
import {translateDataToTree} from "../common/tree";
import {getNowTime} from "../common/time";

export default {
  name: "demo",
  props: {
    field: {type: Object, default: () => ({})},
    valueObj: {type: Object, default: () => ({})},
  },
  data() {
    return {
      //文字
      wordFieldValue: '',
      //时间
      timeFieldValue: '',
      //富文本
      richFieldValue: '',
      richFieldDialogVisible: false,
      richButtonType: 'warning',
      editorOption: {},
      //下拉框
      selectFieldValue: '',
      selectArrData: [],
      //树形
      treeFieldValue: '',
      treeFieldDialogVisible: false,
      treeButtonType: 'warning',
      treeData: [],

      //上传的服务地址
      uploadUrl: window.gisConfig.serverUrl + '/cbc/upload.cbc',
      fileList: [],
      listType: 'text',
      paramData: {},
      fileTip: '',
      buttonTip: '',
      fileTypeJudge: [],
      fileTypeErrorTip: '',
      photoFieldValue: '',
      audioFieldValue: '',
      videoFieldValue: '',

      fontStyle: '',

      fileEndFlag: true,

      editPhotoArr: [],

      editVideoFlag: 0,
      editAudioFlag: 0,

      audioHTMLID:'audioHTMLID'+this.field.field_name,
      videoHTMLID:'videoHTMLID'+this.field.field_name,

      serverUrl:window.gisConfig.serverUrl,


    }
  },
  watch: {
    'wordFieldValue': {
      handler: function (val, oldval) {
        console.log("wordFieldValue", val);
        this.$parent.tableFieldValue[this.field.field_name] = val;
      },
    },
    'timeFieldValue': {
      handler: function (val, oldval) {
        console.log("timeFieldValue", val);
        this.$parent.tableFieldValue[this.field.field_name] = val;
      },
    },
    'richFieldValue': {
      handler: function (val, oldval) {
        console.log("richFieldValue", val);
        this.$parent.tableFieldValue[this.field.field_name] = val;
      },
    },
    'selectFieldValue': {
      handler: function (val, oldval) {
        console.log("selectFieldValue", val);
        this.$parent.tableFieldValue[this.field.field_name] = val;
      },
    },
    'treeFieldValue': {
      handler: function (val, oldval) {
        console.log("treeFieldValue", val);
        this.$parent.tableFieldValue[this.field.field_name] = val;
      },
    },
    'photoFieldValue': {
      handler: function (val, oldval) {
        console.log("photoFieldValue", val);
        this.$parent.tableFieldValue[this.field.field_name] = val;
      },
    },
    'audioFieldValue': {
      handler: function (val, oldval) {
        console.log("audioFieldValue", val);
        this.$parent.tableFieldValue[this.field.field_name] = val;
      },
    },
    'videoFieldValue': {
      handler: function (val, oldval) {
        console.log("videoFieldValue", val);
        this.$parent.tableFieldValue[this.field.field_name] = val;

      },
    },


  },

  components: {
    quillEditor
  },
  methods: {
    showRichWin() {
      this.richFieldDialogVisible = true;
    },
    showTreeWin() {
      this.treeFieldDialogVisible = true;
    },
    richConfirm() {
      this.richFieldDialogVisible = false;
      if (this.richFieldValue != "") {
        this.richButtonType = "info";
      } else {
        this.richButtonType = "warning";
      }
    },
    filedSelectChange(data) {
      console.log("选择值：", this.selectFieldValue, data);
    },
    findSelectArrData() {
      var param = {};
      param.sql = "gather_select_dic.find_select_dic_data";
      param.dicid = this.field.dicid;
      console.log("param", param);
      commonSelectRequest(param, this.findSelectArrDataCallBack);
    },
    findSelectArrDataCallBack(result) {
      console.log("所有下拉框内容：", result);
      this.selectArrData = result;
      if (this.valueObj != null) {
        this.selectFieldValue = this.valueObj[this.field.field_name];
      }

    },

    findTreeArrData() {
      var param = {};
      param.treetablename = "gather_tree_dic_" + this.field.field_name;
      param.sql = "gather_tree_dic.find_tree_dic_data";
      console.log("param", param);
      commonSelectRequest(param, this.findTreeArrDataCallBack);
    },
    findTreeArrDataCallBack(result) {
      console.log("树形菜单内容：", result);
      this.treeData = translateDataToTree(result);
      console.log(" this.treeData", this.treeData);
      if (this.valueObj != null) {
        this.treeFieldValue = this.valueObj[this.field.field_name];
      }

    },

    handleNodeClick(node, data) {
      console.log("node", node, data);
      this.treeFieldValue = node.label;
      this.treeFieldDialogVisible = false;
      if (this.treeFieldValue != "") {
        this.treeButtonType = "info";
      } else {
        this.treeButtonType = "warning";
      }
    },
    //文件操作-start
    //根据UUID删除文件
    handleRemove(file, fileList) {
      console.log("handleRemove-file", file);
      console.log("handleRemove-fileList", this.fileList);
      for (var i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].uid == file.uid) {
          this.fileList.splice(i, 1);
          i--;
        }
      }
      var param = {};
      param.uuid = file.uuid;//url.split("uuid=")[1]
      axios.post(window.gisConfig.serverUrl + '/cbc/deleteFile.cbc', param, my_headers_config)
        .then(response => {
          if (response.data[0].state == "success") {
            console.log("成功删除文件：", response.data[0].state);
            if (this.field.field_type == "audio") {
              this.removeAudioByUUID(file.uuid);
            }
            if(this.field.field_type == "video"){
              this.removeVideoByUUID(file.uuid);
            }
            if(this.field.field_type == "photo"){
              this.removePhotoByUUID(file.uuid);
            }
          } else {
            console.error("服务异常,错误信息1：", response.data[0].message);
            callback(response.data[0].message);
          }
        }).catch(error => {
        console.error("服务异常,错误信息2：", error);
      });
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      if (file && file.status === "success") {
        return this.$confirm(`确定移除 ${file.name}？`);
      }
    },
    beforeAvatarUpload(file) {
      if (this.field.field_type == "photo") {
        this.listType = "picture";
      }
      if (this.field.field_type == "video" || this.field.field_type == "audio") {
        this.listType = "text";
      }

      this.fileEndFlag = false;
      console.log("上传之前的文件判断", file);
      var isChooseFile = false;
      var isSize5M = false;
      for (var i = 0; i < this.fileTypeJudge.length; i++) {
        if (file.type == this.fileTypeJudge[i]) {
          isChooseFile = true;
        }
      }
      if (file.size / 1024 / 1024 < 5) {
        isSize5M = true;
      }
      if (isChooseFile == false) {
        this.$message.error(this.fileTypeErrorTip);
      }
      if (isSize5M == false) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return isChooseFile && isSize5M;
    },
    handleAvatarSuccess(res, file) {
      console.log("res1111:", res, file);
      console.log("this.field.field_type", this.field.field_type);

      var fileObj = {};
      fileObj.name = file.name;
      fileObj.url = window.gisConfig.serverUrl + "/cbc/getFile.cbc?uuid=" + file.response[0].uuid + "&type=photo";
      fileObj.uuid = file.response[0].uuid;
      this.fileList.push(fileObj);
      this.fileEndFlag = true;

      if (this.field.field_type == "photo") {
        if (this.valueObj == null) {
          this.photoFieldValue = "";
        }
        if(this.photoFieldValue!=""){
          this.photoFieldValue=this.photoFieldValue+",";
        }
        console.log("this.photoFieldValue111111",this.photoFieldValue);
        for (var i = 0; i < this.fileList.length; i++) {
          console.log("this.fileList[i].uuid",this.fileList[i].uuid);
          if(this.photoFieldValue.indexOf(this.fileList[i].uuid)>=0){

          }else{
            //不存在才添加
            this.photoFieldValue += this.fileList[i].uuid + ",";
          }

        }
        this.photoFieldValue = this.photoFieldValue.substr(0, this.photoFieldValue.length - 1);
      }

      if (this.field.field_type == "audio") {
        if (this.valueObj == null) {
          this.audioFieldValue = "";
        }
        if(this.audioFieldValue!=""){
          this.audioFieldValue=this.audioFieldValue+",";
        }
        for (var i = 0; i < this.fileList.length; i++) {
          if(this.audioFieldValue.indexOf(this.fileList[i].uuid)>=0){

          }else{
            //不存在才添加
            this.audioFieldValue += this.fileList[i].uuid + ",";
          }
        }
        this.audioFieldValue = this.audioFieldValue.substr(0, this.audioFieldValue.length - 1);
      }

      if (this.field.field_type == "video") {
        if (this.valueObj == null) {
          this.videoFieldValue = "";
        }
        if(this.videoFieldValue!=""){
          this.videoFieldValue=this.videoFieldValue+",";
        }
        for (var i = 0; i < this.fileList.length; i++) {
          if(this.videoFieldValue.indexOf(this.fileList[i].uuid)>=0){

          }else{
            //不存在才添加
            this.videoFieldValue += this.fileList[i].uuid + ",";
          }
        }
        this.videoFieldValue = this.videoFieldValue.substr(0, this.videoFieldValue.length - 1);
      }

    },
    //文件操作-end
    //删除照片
    removePhotoByUUID(uuid) {
      var index = this.editPhotoArr.indexOf(uuid);
      if (index > -1) {
        this.editPhotoArr.splice(index, 1);
      }

      var photoValueArrTemp=this.photoFieldValue.split(",");
      for (var i = 0; i < photoValueArrTemp.length; i++) {
        if (uuid == photoValueArrTemp[i]) {
          photoValueArrTemp.splice(i, 1);
        }
      }
      this.photoFieldValue="";
      for(var i=0;i<photoValueArrTemp.length;i++){
        this.photoFieldValue=this.photoFieldValue+photoValueArrTemp[i]+",";
      }
      this.photoFieldValue = this.photoFieldValue.substr(0, this.photoFieldValue.length - 1);
      console.log("this.photoFieldValue", this.photoFieldValue);
    },
    //删除视频
    removeVideo(item) {
      var index = item.split(",")[1];
      var uuid = item.split(",")[0];
      console.log("移除视频元素ID值：","videoHtmlID_" +this.field.field_name+ index);
      document.getElementById("videoHtmlID_" +this.field.field_name+ index).remove();
      this.removeVideoByUUID(uuid);
    },
    removeVideoByUUID(uuid){
      var videoValueArrTemp=this.videoFieldValue.split(",");
      for (var i = 0; i < videoValueArrTemp.length; i++) {
        if (uuid == videoValueArrTemp[i]) {
          videoValueArrTemp.splice(i, 1);
        }
      }
      this.videoFieldValue="";
      for(var i=0;i<videoValueArrTemp.length;i++){
        this.videoFieldValue=this.videoFieldValue+videoValueArrTemp[i]+",";
      }
      this.videoFieldValue = this.videoFieldValue.substr(0, this.videoFieldValue.length - 1);
      console.log("this.videoFieldValue", this.videoFieldValue);
    },
    //删除音频
    removeAudio(item) {
      var index = item.split(",")[1];
      var uuid = item.split(",")[0];
      document.getElementById("audioHtmlID_"+this.field.field_name + index).remove();
      this.removeAudioByUUID(uuid);
    },
    //根据UUID删除音频数据
    removeAudioByUUID(uuid){
      var audioValueArrTemp=this.audioFieldValue.split(",");
      for (var i = 0; i < audioValueArrTemp.length; i++) {
        if (uuid == audioValueArrTemp[i]) {
          audioValueArrTemp.splice(i, 1);
        }
      }
      this.audioFieldValue="";
      for(var i=0;i<audioValueArrTemp.length;i++){
        this.audioFieldValue=this.audioFieldValue+audioValueArrTemp[i]+",";
      }
      this.audioFieldValue = this.audioFieldValue.substr(0, this.audioFieldValue.length - 1);
      console.log("this.audioFieldValue", this.audioFieldValue);
    }
  },
    mounted: function () {
      if (this.field.show_flag == "1") {
        this.fontStyle = "font-size:18px;color:red;font-weight: bold";
      } else {
        this.fontStyle = "font-size:18px";
      }

      if (this.field.field_type == 'word' && this.valueObj != null) {
        this.wordFieldValue = this.valueObj[this.field.field_name];
      }
      if (this.field.field_type == 'rich' && this.valueObj != null) {
        this.richFieldValue = this.valueObj[this.field.field_name];
      }


      //console.log("field", this.field);
      //获取下拉框选项
      if (this.field.field_type == 'select') {
        this.findSelectArrData();
      }
      //获取树形菜单
      if (this.field.field_type == 'tree') {
        this.findTreeArrData();
      }
      //初始化时间
      if (this.field.field_type == 'time') {
        if (this.valueObj != null) {
          this.timeFieldValue = this.valueObj[this.field.field_name];
        } else {
          this.timeFieldValue = getNowTime();
        }
        //console.log("当前时间:", this.timeFieldValue);
      }

      //文件参数
      if (this.field.field_type == 'photo' || this.field.field_type == 'audio' || this.field.field_type == 'video') {
        var param = {};
        param.table_name = this.field.table_name;
        param.file_type = this.field.field_type;
        this.paramData.param = JSON.stringify(param);
      }
      if (this.field.field_type == 'photo') {
        if (this.valueObj != null) {
          this.photoFieldValue=this.valueObj[this.field.field_name];
          console.log("照片值",this.photoFieldValue);
          this.editPhotoArr=this.photoFieldValue.split(",");
        }
        this.fileTypeJudge.push('image/png');
        this.fileTypeJudge.push('image/jpeg');
        this.buttonTip = "照片上传";
        this.fileTip = "只能上传jpg/png文件，且不超过5M";
        this.fileTypeErrorTip = "只能上传jpg/png文件";
      }


      if (this.field.field_type == 'audio') {
        //将Vue方法传到全局对象window中
        var funStr='removeAudio'+this.field.field_name;
        window[funStr] = this.removeAudio;
        this.editAudioFlag = 0;
        if (this.valueObj != null) {
          this.editAudioFlag = 1;
          this.audioFieldValue = this.valueObj[this.field.field_name];
          //console.log("audioValueTemp",audioValueTemp);
          var html = "";
          if (this.audioFieldValue != null && this.audioFieldValue != "") {
            for (var k = 0; k < this.audioFieldValue.split(",").length; k++) {
              var item = this.audioFieldValue.split(",")[k] + "," + k;
              var urlTemp = window.gisConfig.serverUrl + "/cbc/getFile.cbc?uuid=" + this.audioFieldValue.split(",")[k] + "&type=audio"
              html += '<div style="display: inline-block;position: relative;" id="audioHtmlID_'+this.field.field_name+ k + '">';
              html += '<audio style="width: 200px;height: 60px" controls>';
              html += '<source src="' + urlTemp + '" type="audio/mpeg">您的浏览器不支持 audio 元素。';
              html += '</audio>'
              html += '<span style="z-index:9999;background-color: white;font-color: #ececec;font-size: 20px;width: 10px;height: 10px;text-align: center;border-radius: 100%;transform: rotate(45deg);cursor:pointer;opacity: 0.5;top:-11px;right:-11px;display: block;position: absolute;" '
              html += 'onclick="'+funStr+'(\'' + item + '\')">+</span>';
              html += '</div>';
            }
          }
          console.log("this.audioFieldValue值：",this.audioFieldValue);
          this.$nextTick(function () {
            document.getElementById(this.audioHTMLID).innerHTML = html;
          });
        }

        this.fileTypeJudge.push('audio/mpeg');
        this.buttonTip = "音频上传";
        this.fileTip = "只能上传mp3文件，且不超过5M";
        this.fileTypeErrorTip = "只能上传mp3文件";
      }
      if (this.field.field_type == 'video') {
        //将Vue方法传到全局对象window中
        var funStr='removeVideo'+this.field.field_name;
        window[funStr] = this.removeVideo;
        this.editVideoFlag = 0;
        if (this.valueObj != null) {
          this.editVideoFlag = 1;
          this.videoFieldValue = this.valueObj[this.field.field_name];
          var html = "";
          if (this.videoFieldValue != null && this.videoFieldValue != "") {
            for (var k = 0; k < this.videoFieldValue.split(",").length; k++) {
              var urlTemp = window.gisConfig.serverUrl + "/cbc/getFile.cbc?uuid=" + this.videoFieldValue.split(",")[k] + "&type=video"
              var item = this.videoFieldValue.split(",")[k] + "," + k;
              html += '<div style="display: inline-block;position: relative;" id="videoHtmlID_' +this.field.field_name+ k + '">';
              html += '<video style="width: 200px;height: 120px" controls>';
              html += '<source src="' + urlTemp + '" type="audio/mpeg">您的浏览器不支持 video 元素。';
              html += '</video>'
              html += '<span style="background-color: white;font-color: #ececec;font-size: 20px;width: 10px;height: 10px;text-align: center;border-radius: 100%;transform: rotate(45deg);cursor:pointer;opacity: 0.5;top:-11px;right:-11px;display: block;position: absolute;" '
              html += 'onclick="'+funStr+'(\'' + item + '\')">+</span>';
              html += '</div>';
            }
          }
          console.log("this.videoFieldValue值：",this.videoFieldValue);
          this.$nextTick(function () {
            document.getElementById(this.videoHTMLID).innerHTML = html;
          });
        }
        //this.fileTypeJudge.push('video/x-ms-wmv');
        this.fileTypeJudge.push('video/mp4');
        this.buttonTip = "视频上传";
        this.fileTip = "只能上传mp4文件，且不超过5M";
        this.fileTypeErrorTip = "只能上传mp4文件";
      }
    },
  }
</script>

<style scoped>
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 300px;
  margin: 24px 0;
}

.el-form-item__content {
  line-height: 10px;
  position: relative;
  font-size: 14px;
}

/deep/ .el-upload-list--picture .el-progress {
  position: relative;
  top: -7px;
  display: none;
}

/deep/ .el-upload-list__item .el-progress__text {
  position: absolute;
  right: 0;
  top: -13px;
  display: none;
}

.img-box {
  display: inline-block;
  position: relative;
}

.image-remove {
  background-color: white;
  font-color: #ececec;
  font-size: 20px;
  width: 10px;
  height: 10px;
  text-align: center;
  border-radius: 100%;
  transform: rotate(45deg);
  cursor: pointer;
  opacity: 0.5;
  top: -11px;
  right: -1px;
  display: block;
  position: absolute;
}
</style>
