<template>
  <div style="width: 100%;" >
    <div style="margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px">
      <span style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px">地图服务</span>
    </div>
    <div style="float:right;padding-right: 30px;color: gray;font-size: 20px;margin-top: -15px"  @click="goGuide">
      <a href="#" style="color: gray;font-size: 20px;padding-top: -50px">接入指南</a>
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
      <span style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px">地图模型</span>
    </div>

    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>

    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
          <li v-for="(item,i) in otherServerMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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
          {"title":"google影像地图","url":"static/map/example/3d/access/googleYX.html","img":"./static/img/googleYX.png"},
          {"title":"arcgis影像地图","url":"static/map/example/3d/access/arcgisYX.html","img":"./static/img/arcgisYX3d.png"},
          {"title":"mapbox影像地图","url":"static/map/example/3d/access/mapboxYX.html","img":"./static/img/mapboxYX3d.png"},
          {"title":"高德影像地图","url":"static/map/example/3d/access/gaodeYX.html","img":"./static/img/gaodeYX.png"},
          {"title":"天地图影像(墨卡托)","url":"static/map/example/3d/access/tiandituYX.html","img":"./static/img/tiandituYX3d.png"},
          {"title":"天地图矢量(墨卡托)","url":"static/map/example/3d/access/tiandituSL.html","img":"./static/img/tiandituSL3d.png"},
          {"title":"方正地图","url":"static/map/example/3d/access/fangzhengSL.html","img":"./static/img/fangzhengSL3d.png"},
          {"title":"百度矢量地图","url":"static/map/example/3d/access/baiduSL.html","img":"./static/img/baiduSL.png"},
          {"title":"百度午夜蓝地图","url":"static/map/example/3d/access/baiduMidNight.html","img":"./static/img/baiduMidNight3d.png"},
          {"title":"openstreetmap地图","url":"static/map/example/3d/access/openstreetmap.html","img":"./static/img/openstreetmap3d.png"},
          {"title":"openstreetmap地图（滤镜）","url":"static/map/example/3d/access/filter.html","img":"./static/img/filter3d.png"},
          {"title":"单张地图","url":"static/map/example/3d/access/singlePhoto.html","img":"./static/img/singlePhoto3d.png"},
        ],
        otherServerMenuConfigs:[
          {"title":"地形图","url":"static/map/example/3d/access/terrain.html","img":"./static/img/terrain3d.png"},
          {"title":"倾斜摄影","url":"static/map/example/3d/access/dayanta.html","img":"./static/img/3ddayanta.png"},
          {"title":"倾斜摄影（可调整）","url":"static/map/example/3d/access/tilt.html","img":"./static/img/tilt.png"},
          {"title":"全球城市白膜（OSM在线）","url":"static/map/example/3d/access/3dbuilderByOSM.html","img":"./static/img/3dbuilderByOSM.png"},
          {"title":"获取OSM建筑物字段与内容","url":"static/map/example/3d/access/3dbuilderGetProperty.html","img":"./static/img/3dbuilderByOSM.png"},
          {"title":"建筑物(天津Chartlet)","url":"static/map/example/3d/access/3dbuilderByChartlet.html","img":"./static/img/3dbuilderByChartlet.png"},
          {"title":"建筑物(自己贴图)","url":"static/map/example/3d/access/3dbuilderByChartletXM.html","img":"./static/img/3dbuilderByChartletXM.png"},
          {"title":"建筑物(Color)","url":"static/map/example/3d/access/3dbuilderByColor.html","img":"./static/img/3dbuilderByColor.png"},
          {"title":"建筑物(Light)","url":"static/map/example/3d/access/3dbuilderByLight.html","img":"./static/img/3dbuilderByLight.png"},
          {"title":"建筑物单体化","url":"static/map/example/3d/access/3dbuilderBySingle.html","img":"./static/img/3dbuilderBySingle.png"},

          {"title":"geojson","url":"static/map/example/3d/access/geojson.html","img":"./static/img/geojson3d.png"},
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
      this.$message({
        message: '3D地图示例需要联网',
        duration: 2000
      });

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
