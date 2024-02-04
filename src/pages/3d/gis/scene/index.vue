<template>
  <div style="width: 100%;" >
    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px"><span>大屏场景</span></div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
          <li v-for="(item,i) in screenMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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


    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px"><span>应用场景</span></div>
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
            {"title":"手动漫游","url":"static/map/example/3d/scene/rove.html","img":"./static/img/gif/rove3d.gif"},
            {"title":"漫游飞行","url":"static/map/example/3d/scene/fly.html","img":"./static/img/3dfly.png"},
          ],
          screenMenuConfigs:[
            {"title":"动态柱状图","url":"static/map/example/3d/scene/dynamicBar3d.html","img":"./static/img/gif/dynamicBar3d.gif"},
            {"title":"迁出迁徙图","url":"static/map/example/3d/scene/migrationOut.html","img":"./static/img/3dmigrationOut.png"},
            {"title":"迁入迁徙图","url":"static/map/example/3d/scene/migrationIn.html","img":"./static/img/3dmigrationIn.png"},
            {"title":"四色预警","url":"static/map/example/3d/scene/fourColor.html","img":"./static/img/fourColor3d.png"},
            {"title":"楼栋分层叠加（单体化）","url":"static/map/example/3d/scene/topandfloor.html","img":"./static/img/3dtopandfloor.png"},
          ],
      }
    },
    methods : {
      goPath(url,title){
        let opnUrl="static/map/example/Main.html?url="+ url+"&title="+title;
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
