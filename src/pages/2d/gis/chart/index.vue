/**
*@author: cbc
*@createTime: 2019/9/29 11:33
*@description:图表用例
*@功能:
*/
<template>
  <div style="width: 100%;" >
    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px"><span>图表用例</span></div>
    <div style="float:right;padding-right: 50px;color: gray;font-size: 20px;margin-top: -15px" @click="goUpdate">
      <a href="#" style="color: gray;font-size: 20px;padding-top: -50px">包下载</a>
    </div>
    <div style="float:right;padding-right: 30px;color: gray;font-size: 20px;margin-top: -15px"  @click="goGuide">
      <a href="#" style="color: gray;font-size: 20px;padding-top: -50px">接入指南</a>
    </div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
          <li v-for="(item,i) in chartMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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

    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 30px;color: gray;font-size: 20px"><span>迁徙图</span></div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
          <li v-for="(item,i) in moveMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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

    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 30px;color: gray;font-size: 20px"><span>Echart图</span></div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
          <li v-for="(item,i) in echartMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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


    <div style="height: 60px"></div>
  </div>
</template>

<script>
  export default {
    name:"gisChart",
    data(){
      return {
          chartMenuConfigs:[
            {"title":"聚合图","url":"static/map/example/2d/chart/cluster.html","img":"./static/img/clust.png"},
            {"title":"聚合图(自定义样式)","url":"static/map/example/2d/chart/clusterByStyle.html","img":"./static/img/clusterByStyle.png"},
              {"title":"热力图(*)","url":"static/map/example/2d/chart/heatmap.html","img":"./static/img/heatmap.png"},
              {"title":"蚂蚁线(*)","url":"static/map/example/2d/chart/antpath.html","img":"./static/img/antpath.png"},
              {"title":"动态画线(*)","url":"static/map/example/2d/chart/movingpolyline.html","img":"./static/img/movingpolyline.png"},
              {"title":"虚线(*)","url":"static/map/example/2d/chart/dashpolyline.html","img":"./static/img/dashpolyline.png"},
              {"title":"箭头线(*)","url":"static/map/example/2d/chart/directionpolyline.html","img":"./static/img/directionpolyline.png"},
              {"title":"线段箭头(*)","url":"static/map/example/2d/chart/directiononepolyline.html","img":"./static/img/directiononepolyline.png"},
              {"title":"图标线(*)","url":"static/map/example/2d/chart/iconpolyline.html","img":"./static/img/iconpolyline.png"},
              {"title":"移动图标(*)","url":"static/map/example/2d/chart/movingmarker.html","img":"./static/img/movingmarker.png"},
              {"title":"波纹点(*)","url":"static/map/example/2d/chart/pulsingicon.html","img":"./static/img/pulsingicon.png"},
              {"title":"大量上图(*)","url":"static/map/example/2d/chart/manyMarker.html","img":"./static/img/manyMarker.png"},
              {"title":"散点图(*)","url":"static/map/example/2d/chart/scatter.html","img":"./static/img/scatter.png"},
              {"title":"蜂巢图(*)","url":"static/map/example/2d/chart/beehive.html","img":"./static/img/beehive.png"},

          ],
          moveMenuConfigs:[
              {"title":"流出迁徙图(*)","url":"static/map/example/2d/chart/migrationOut.html","img":"./static/img/migrationOut.png"},
              {"title":"流入迁徙图(*)","url":"static/map/example/2d/chart/migrationIn.html","img":"./static/img/migrationIn.png"},
              {"title":"双向迁徙图(*)","url":"static/map/example/2d/chart/migrationInOut.html","img":"./static/img/migrationInOut.png"},
              {"title":"双向迁徙图(滤镜)","url":"static/map/example/2d/chart/migrationInOutInvert.html","img":"./static/img/migrationInOutInvert.png"},
              {"title":"双向迁徙图(Geojson版)","url":"static/map/example/2d/chart/migrationInOutGeojson.html","img":"./static/img/migrationInOutGeojson.png"}
          ],
          echartMenuConfigs:[
              {"title":"饼状图","url":"static/map/example/2d/chart/pieChart.html","img":"./static/img/pieChart.png"},
              {"title":"柱状图","url":"static/map/example/2d/chart/barChart.html","img":"./static/img/barChart.png"}
          ],

      }
    },
    methods : {
      goPath(url,title){
        let opnUrl="static/map/example/Main.html?url="+ url+"&title="+title;
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

