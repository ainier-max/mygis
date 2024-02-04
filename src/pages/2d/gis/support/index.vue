<template>
  <div style="width: 100%;" >
    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px"><span>技术服务与支持</span></div>
    <div style="float:right;padding-right: 50px;color: gray;font-size: 20px;margin-top: -15px" @click="goUpdate">
      <a href="#" style="color: gray;font-size: 20px;padding-top: -50px">包下载</a>
    </div>
    <div style="float:right;padding-right: 30px;color: gray;font-size: 20px;margin-top: -15px"  @click="goGuide">
      <a href="#" style="color: gray;font-size: 20px;padding-top: -50px">接入指南</a>
    </div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>




    <div style="width: 100%">

      <div style="width: 100%;padding-left: 30px;padding-top: 10px">
        <h2>通过ISSUE</h2>
        <div style="height: 10px"></div>
        搜索ISSUE，<span @click="toSupport" style="color:blueviolet;cursor:pointer">Search Issue</span>
        <br>
        <div style="height: 10px"></div>
        <span  style="color: gray;font-size: 18px;">公共账号：fangke 密码：dragon2022</span><br>
        <div style="height: 10px"></div>
        如果ISSUE库未搜索到，请提交问题到ISSUE库（如果用使公共账号，记得在内容前留下提问人员名称），会由产品负责人回复
        <div style="height: 10px"></div>
        <h2>负责人</h2>
        <div style="height: 10px"></div>
        紧急情况，提交ISSUE后，联系产品负责人：陈斌才
      </div>

    </div>

    <div style="height: 60px"></div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
          sceneMenuConfigs:[
              {"title":"1.GIS剑谱支持移动端的一些重要建议","url":"static/file/GIS剑谱支持移动端的一些重要建议.doc","img":"./static/img/gather.png"},
          ],
      }
    },
    methods : {
      goPath(url,title){
        window.open(url, '_blank');
      },
      goGuide(){
        let opnUrl="static/map/example/2d/access/guide.html";
        window.open(opnUrl, '_blank');
      },
      goUpdate() {
        let opnUrl = "static/map/example/2d/access/update.html";
        window.open(opnUrl, '_blank');
      },
      toSupport(){
        window.open("http://192.168.0.149/service/gis/-/issues",'_blank');
      }
    },
    mounted:function () {
      //console.log(this);

    }
  }
</script>

<style>
  .el-divider--horizontal {
    display: block;
    height: 3px;
    width: 100%;
    margin: 24px 0;
    margin-top: 24px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
  }
  .showpic{

  }
  .showpic:hover{
    transform: scale(1.15);
    cursor: pointer;
  }
</style>
