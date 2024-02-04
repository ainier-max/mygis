<template>
  <div style="width: 100%;" >
    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px"><span>提交ISSUE</span></div>
    <div style="float:right;padding-right: 50px;color: gray;font-size: 20px;margin-top: -15px" @click="goUpdate">
      <a href="#" style="color: gray;font-size: 20px;padding-top: -50px">包下载</a>
    </div>
    <div style="float:right;padding-right: 30px;color: gray;font-size: 20px;margin-top: -15px"  @click="goGuide">
      <a href="#" style="color: gray;font-size: 20px;padding-top: -50px">接入指南</a>
    </div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%;padding-left: 30px;padding-top: 10px">
      欢迎提交你的建议与意见<span @click="toIssue" style="color:blueviolet;cursor:pointer">Submit Issue</span>
      <br>
      <div style="height: 10px"></div>
      <span  style="color: gray;font-size: 18px;">公共账号：fangke 密码：dragon2022</span>

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
      toIssue(){
        window.open("http://192.168.0.149/service/gis/-/issues/new?issue[title]=&issue[description]=%3Cbr%3E%E6%8F%90%E4%BA%A4%E4%BA%BA%E5%91%98%E5%A7%93%E5%90%8D%EF%BC%9A(%E6%82%A8%E7%9A%84%E5%A7%93%E5%90%8D%EF%BC%8C%E7%94%A8%E4%BA%8E%E5%90%8E%E7%BB%AD%E5%8F%8D%E9%A6%88%E4%B8%8E%E5%AF%B9%E6%8E%A5)%0a%3Cbr%3E%E6%8F%90%E4%BA%A4%E5%86%85%E5%AE%B9:(%E6%8F%8F%E8%BF%B0%E5%85%B7%E4%BD%93%E7%9A%84%E9%9C%80%E6%B1%82/%E5%BB%BA%E8%AE%AE/BUG)%0a%3Cbr%3E%E7%9B%B8%E5%85%B3%E5%9B%BE%E7%89%87%E4%B8%8E%E9%99%84%E4%BB%B6%EF%BC%9A",'_blank');
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
