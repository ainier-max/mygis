<template>
  <div style="width: 100%;" >
    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px"><span>应用场景</span></div>
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
          <li v-for="(item,i) in sceneMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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
          sceneMenuConfigs:[
              {"title":"通用采集系统","url":"gather","img":"./static/img/gather.png"},
              {"title":"警情分布（行政区划聚合）","url":"static/map/example/2d/scene/bigMarker.html","img":"./static/img/bigMarker.png"},
              {"title":"四色预警","url":"static/map/example/2d/scene/warn.html","img":"./static/img/warn.png"},
              {"title":"区域钻取","url":"static/map/example/2d/scene/area.html","img":"./static/img/area.png"},
              {"title":"移动图标（速度变化）","url":"static/map/example/2d/scene/movingmarkerByZoom.html","img":"./static/img/movingmarkerByZoom.png"},
              {"title":"平行线","url":"static/map/example/2d/scene/parallelLines.html","img":"./static/img/parallelLines.png"},
              {"title":"曲线采集","url":"static/map/example/2d/scene/gatherCurve.html","img":"./static/img/gatherCurve.png"},
              {"title":"1/3位置定位","url":"static/map/example/2d/scene/3分之一位置定位.html","img":"./static/img/3分之一位置定位.png"},
              {"title":"多轨迹时间轴播放","url":"static/map/example/2d/scene/guijibofang.html","img":"./static/img/guijibofang.png"},
              {"title":"轨迹沿线播放","url":"static/map/example/2d/scene/轨迹沿线播放.html","img":"./static/img/轨迹沿线播放.png"},
          ],
      }
    },
    methods : {
      goPath(url,title){
          if(url=="gather"){
              window.open("#/gather/login", '_blank');
          }else{
              let opnUrl="static/map/example/Main.html?url="+ url+"&title="+title;
              window.open(opnUrl, '_blank');
          }
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
