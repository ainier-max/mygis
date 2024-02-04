<template>
  <div style="width: 100%;" >
    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px"><span>常见问题</span></div>
    <div style="float:right;padding-right: 50px;color: gray;font-size: 20px;margin-top: -15px" @click="goUpdate">
      <a href="#" style="color: gray;font-size: 20px;padding-top: -50px">包下载</a>
    </div>
    <div style="float:right;padding-right: 30px;color: gray;font-size: 20px;margin-top: -15px"  @click="goGuide">
      <a href="#" style="color: gray;font-size: 20px;padding-top: -50px">接入指南</a>
    </div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>

    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 15px;padding-right: 5px">
          <li v-for="(item,i) in sceneMenuConfigs" style="padding-left:40px;cursor:pointer;list-style:none;">
            <div style="text-align: left;"  @click="goPath(item.url,item.title)">
              <div style="font-size: 16px;color: cornflowerblue">
                {{item.title}}
              </div>
            </div><br>
          </li>
        </ul>
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
              {"title":"1.GIS剑谱问题集锦.doc","url":"static/file/GIS剑谱问题集锦.doc","img":"./static/img/gather.png"},
              {"title":"2.GIS剑谱支持移动端的一些重要建议","url":"static/file/GIS剑谱支持移动端的一些重要建议.doc","img":"./static/img/gather.png"},
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


</style>
