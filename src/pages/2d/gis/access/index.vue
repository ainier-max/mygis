<template>
  <div style="width: 100%;" >
    <div style="margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px">
      <span style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px">瓦片服务</span>
    </div>

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


    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 30px;color: gray;font-size: 20px"><span>矢量服务</span></div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%">
      <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
        <li v-for="(item,i) in siliangServerMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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
    data(){
      return {
          wapianServerMenuConfigs:[
              {"title":"方正地图","url":"static/map/example/2d/access/fangzheng.html","img":"./static/img/fangzheng.png"},
              {"title":"精一地图","url":"static/map/example/2d/access/jingyi.html","img":"./static/img/jingyi.png"},
              {"title":"超图地图","url":"static/map/example/2d/access/supermap.html","img":"./static/img/chaotu.png"},
              {"title":"高德地图","url":"static/map/example/2d/access/gaode.html","img":"./static/img/gaode.png"},
              {"title":"谷歌地图","url":"static/map/example/2d/access/google.html","img":"./static/img/google.png"},
              {"title":"百度地图","url":"static/map/example/2d/access/baidu.html","img":"./static/img/baidu.png"},
              {"title":"瑞信地图","url":"static/map/example/2d/access/ruixin.html","img":"./static/img/ruixin.png"},
              {"title":"ArcGIS","url":"static/map/example/2d/access/arcgis.html","img":"./static/img/arcgis.png"},
              {"title":"联网国家天地图","url":"static/map/example/2d/access/tianditu.html","img":"./static/img/tianditu.png"},
              {"title":"联网国家天地图（滤镜）","url":"static/map/example/2d/access/tiandituinvert.html","img":"./static/img/tiandituinvert.png"},
              {"title":"联网腾讯矢量地图（滤镜）","url":"static/map/example/2d/access/tengxuninvert.html","img":"./static/img/tengxuninvert.png"},
              {"title":"联网腾讯影像地图","url":"static/map/example/2d/access/tengxunyxinvert.html","img":"./static/img/tengxunyxinvert.png"},
              {"title":"联网openStreetMap","url":"static/map/example/2d/access/openStreetMap.html","img":"./static/img/openStreetMap.png"},
          ],
          siliangServerMenuConfigs:[
              {"title":"联网四维图新","url":"static/map/example/2d/access/minemap.html","img":"./static/img/minemap.png"},
              {"title":"GeoJSON","url":"static/map/example/2d/access/geojson.html","img":"./static/img/geojson.png"}
          ],
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
  .showpic{

  }
  .showpic:hover{
    transform: scale(1.15);
    cursor: pointer;
  }
</style>
