<template>
  <div style="width: 100%;" >
    <div style="margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px">
      <span style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px">特色图例</span>
    </div>

    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>

    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
          <li v-for="(item,i) in wapianServerMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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


    <div style="margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px">
      <span style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px">着色器</span>
    </div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
          <li v-for="(item,i) in shaderMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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

    <div style="margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px">
      <span style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px">动态</span>
    </div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
          <li v-for="(item,i) in movementMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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

    <div style="margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px">
      <span style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px">MapV</span>
    </div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
          <li v-for="(item,i) in mapvMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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
        data(){
            return {
                wapianServerMenuConfigs:[
                    {"title":"3D模型","url":"static/map/example/3d/chart/3dmodel.html","img":"./static/img/3dmodel.png"},
                    {"title":"淹没分析","url":"static/map/example/3d/chart/flood.html","img":"./static/img/flood3d.png"},
                    {"title":"水面波纹","url":"static/map/example/3d/chart/water.html","img":"./static/img/water3d.png"},
                    {"title":"热力图+3D地形","url":"static/map/example/3d/chart/heatmapByTerrain.html","img":"./static/img/heatmapByTerrain.png"},
                    {"title":"热力图+3D建筑物","url":"static/map/example/3d/chart/heatmapByBuilder.html","img":"./static/img/heatmapByBuilder.png"},
                    {"title":"动态纹理-颜色","url":"static/map/example/3d/chart/dynamicColor.html","img":"./static/img/dynamicColor3d.png"},
                    {"title":"动态纹理-Label","url":"static/map/example/3d/chart/dynamicLabel.html","img":"./static/img/dynamicLabel3d.png"},
                    {"title":"聚合","url":"static/map/example/3d/chart/cluster.html","img":"./static/img/cluster3d.png"},
                    {"title":"动态扩散圈（图片）","url":"static/map/example/3d/chart/circleScanByPhoto.html","img":"./static/img/gif/circleScanByPhoto3d.gif"},
                    {"title":"站立的圆","url":"static/map/example/3d/chart/standUp.html","img":"./static/img/3dstandUp.png"},
                    {"title":"波纹点","url":"static/map/example/3d/chart/3dpulse.html","img":"./static/img/3dpulse.png"},
                ],
                shaderMenuConfigs:[
                  {"title":"动态立体墙","url":"static/map/example/3d/chart/wall.html","img":"./static/img/gif/wall3d.gif"},
                  {"title":"动态雷达扫描圈","url":"static/map/example/3d/chart/radarScan.html","img":"./static/img/gif/radarScan3d.gif"},
                  {"title":"动态扩散圈（着色器）","url":"static/map/example/3d/chart/circleScan.html","img":"./static/img/gif/circleScan3d.gif"},
                  {"title":"波纹点","url":"static/map/example/3d/chart/bowendian.html","img":"./static/img/gif/bowendian3d.gif"},
                  {"title":"动态流线","url":"static/map/example/3d/chart/dynamicFlowMaterial.html","img":"./static/img/gif/dynamicFlowMaterial3d.gif"},
                  {"title":"消逝圆","url":"static/map/example/3d/chart/circleFadeMaterial.html","img":"./static/img/gif/circleFadeMaterial3d.gif"},
                ],

                movementMenuConfigs:[
                  {"title":"3D模型上运动","url":"static/map/example/3d/chart/Clamp3DModel.html","img":"./static/img/Clamp3DModel3d.png"},
                  {"title":"线上运动(CZML)（地形）","url":"static/map/example/3d/chart/clampByTerrain.html","img":"./static/img/gif/clampByTerrain3d.gif"},
                  {"title":"线上运动(CZML)（倾斜摄影）","url":"static/map/example/3d/chart/clampBy3DTile.html","img":"./static/img/gif/clampBy3DTile.gif"},
                  {"title":"线上运动(CZML)（3D建筑物）","url":"static/map/example/3d/chart/clampBy3DBuilder.html","img":"./static/img/gif/clampBy3DBuilder.gif"},

                ],
                mapvMenuConfigs:[
                  {"title":"蜂巢图","url":"static/map/example/3d/chart/mapvBeehive.html","img":"./static/img/mapvBeehive3d.png"},
                  {"title":"点热力","url":"static/map/example/3d/chart/mapvPointHeatmap.html","img":"./static/img/mapvPointHeatmap3d.png"},
                  {"title":"线上运动","url":"static/map/example/3d/chart/mapvPolylineAnimation.html","img":"./static/img/mapvPolylineAnimation3d.png"},
                  {"title":"连接线","url":"static/map/example/3d/chart/mapvPolylineMany.html","img":"./static/img/mapvPolylineMany3d.png"},
                ]
            }
        },
        methods : {
            goPath(url,title){
                let opnUrl="static/map/example/Main.html?url="+ url+"&title="+title;
                window.open(opnUrl, '_blank');
            },
            goPathVue(url,title){
                let opnUrl="/#/mapCode?url="+ url+"&name="+title;
                window.open(opnUrl, '_blank');
            },
            goGuide(){
                let opnUrl="static/map/example/access/guide.html";
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
  .showpic{

  }
  .showpic:hover{
    transform: scale(1.15);
    cursor: pointer;
  }
</style>
