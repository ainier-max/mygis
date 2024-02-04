/**
*@author: cbc
*/
<template>
  <div style="width: 100%;" >
    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px"><span>空间查询</span></div>

    <div style="float:right;padding-right: 50px;color: gray;font-size: 20px;margin-top: -15px" @click="goUpdate">
      <a href="#" style="color: gray;font-size: 20px;padding-top: -50px">包下载</a>
    </div>
    <div style="float:right;padding-right: 30px;color: gray;font-size: 20px;margin-top: -15px"  @click="goGuide">
      <a href="#" style="color: gray;font-size: 20px;padding-top: -50px">接入指南</a>
    </div>

    <div style="padding-left: 30px;padding-right: 30px">
      <el-divider></el-divider>
    </div>
    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
         <li v-for="(item,i) in spaceFindMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
           <div style="background-color: white;text-align: center;" class="showpic"  @click="goPath(item.url,item.title)">
             <div style="line-height:30px;font-size: 16px">
               {{item.title}}
             </div>
             <div>
               <img style="width:200px;height:160px;display:block;" :src="item.img"/>
             </div>
           </div>
         </li>
        </ul>
      </div>
    </div>

    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px"><span>空间判断</span></div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%">
      <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
        <li v-for="(item,i) in spaceJudgeMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
          <div style="background-color: white;text-align: center;" class="showpic"  @click="goPath(item.url,item.title)">
            <div style="line-height:30px;font-size: 16px">
              {{item.title}}
            </div>
            <div>
              <img style="width:200px;height:160px;display:block;" :src="item.img"/>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div style="height: 60px"></div>
  </div>
</template>

<script>
  export default {
    name:"gisChart",
    data(){
      return {
          spaceFindMenuConfigs:[
              {"title":"正向匹配","url":"static/map/example/2d/api/addressPositive.html","img":"./static/img/addressPositive.png"},
              {"title":"反向匹配","url":"static/map/example/2d/api/addressReverse.html","img":"./static/img/addressReverse.png"},
              {"title":"多边形空间查","url":"static/map/example/2d/api/spacePolygon.html","img":"./static/img/spacePolygon.png"},
              {"title":"圆空间查","url":"static/map/example/2d/api/spaceCircle.html","img":"./static/img/spaceCircle.png"},
              {"title":"矩形空间查","url":"static/map/example/2d/api/spaceRect.html","img":"./static/img/spaceRect.png"},
              {"title":"线周边查","url":"static/map/example/2d/api/arroundPolyline.html","img":"./static/img/arroundPolyline.png"},
              {"title":"行政区域","url":"static/map/example/2d/api/addXzqh.html","img":"./static/img/addXzqh.png"}
          ],
          spaceJudgeMenuConfigs:[
              {"title":"点与圆","url":"static/map/example/2d/api/judgeCircleByXY.html","img":"./static/img/judgeCircleByXY.png"},
              {"title":"点与矩形","url":"static/map/example/2d/api/judgeRectByXY.html","img":"./static/img/judgeRectByXY.png"},
              {"title":"点与多边形","url":"static/map/example/2d/api/judgePolygonByXY.html","img":"./static/img/judgePolygonByXY.png"},
              {"title":"点与行政区划","url":"static/map/example/2d/api/judgeXzqhByXY.html","img":"./static/img/judgeXzqhByXY.png"}
          ],
      }
    },
    methods : {
      goPath(url,title){
        let opnUrl="static/map/example/Main.html?url="+ url+"&title="+title;
        window.open(opnUrl, '_blank');
      },
      goPathVue(url,title){
        let opnUrl=window.location.origin+"/#/mapCode?url="+ url+"&name="+title;
        window.open(opnUrl, '_blank');
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

