<template>
  <div style="width: 100%;" >
    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px"><span>地图元素</span></div>
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
          <li v-for="(item,i) in mapElementMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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



    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 30px;color: gray;font-size: 20px"><span>地图操作</span></div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
          <li v-for="(item,i) in mapOperateMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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


    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 30px;color: gray;font-size: 20px"><span>地图事件</span></div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
          <li v-for="(item,i) in mapEventMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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


    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 30px;color: gray;font-size: 20px"><span>元素采集</span></div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
          <li v-for="(item,i) in mapGatherMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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



    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 30px;color: gray;font-size: 20px"><span>元素修改</span></div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
          <li v-for="(item,i) in mapEditMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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

    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 30px;color: gray;font-size: 20px"><span>军事标绘采集</span></div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
          <li v-for="(item,i) in plotGatherMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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

    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 30px;color: gray;font-size: 20px"><span>军事标绘修改</span></div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
          <li v-for="(item,i) in plotEditMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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
          mapElementMenuConfigs:[
              {"title":"点","url":"static/map/example/2d/base/marker.html","img":"./static/img/marker.png"},
              {"title":"线","url":"static/map/example/2d/base/polyline.html","img":"./static/img/polyline.png"},
              {"title":"多边形","url":"static/map/example/2d/base/polygon.html","img":"./static/img/polygon.png"},
              {"title":"矩形","url":"static/map/example/2d/base/rect.html","img":"./static/img/rect.png"},
              {"title":"圆","url":"static/map/example/2d/base/circle.html","img":"./static/img/circle.png"},
              {"title":"气泡框","url":"static/map/example/2d/base/popup.html","img":"./static/img/popup.png"},
              {"title":"自定义DIV","url":"static/map/example/2d/base/div.html","img":"./static/img/div.png"},
              {"title":"挖空多边形","url":"static/map/example/2d/base/outring.html","img":"./static/img/outring.png"},
              {"title":"叠加地图图层","url":"static/map/example/2d/base/addTileLayer.html","img":"./static/img/addTileLayer.png"},
          ],
          mapOperateMenuConfigs:[
              {"title":"居中与缩放","url":"static/map/example/2d/base/centerAndZoom.html","img":"./static/img/centerAndZoom.png"},
              {"title":"删除图层","url":"static/map/example/2d/base/remove.html","img":"./static/img/remove.png"},
              {"title":"样式修改","url":"static/map/example/2d/base/changeColor.html","img":"./static/img/changeColor.png"},
              {"title":"地图信息","url":"static/map/example/2d/base/mapInfo.html","img":"./static/img/mapInfo.png"},
              {"title":"边框","url":"static/map/example/2d/base/bound.html","img":"./static/img/bound.png"},
              {"title":"地图控件","url":"static/map/example/2d/base/control.html","img":"./static/img/control.png"},
              {"title":"图层中心点","url":"static/map/example/2d/base/layerInfo.html","img":"./static/img/layerInfo.png"},
              {"title":"绑定提示","url":"static/map/example/2d/base/bindTip.html","img":"./static/img/bindTip.png"}
          ],
          mapEventMenuConfigs:[
              {"title":"地图事件","url":"static/map/example/2d/base/eventMap.html","img":"./static/img/clickEvent.png"},
              {"title":"图层事件","url":"static/map/example/2d/base/eventLayer.html","img":"./static/img/eventMapMove.png"}
          ],
          mapGatherMenuConfigs:[
              {"title":"点采集","url":"static/map/example/2d/base/gatherMarker.html","img":"./static/img/gatherMarker.png"},
              {"title":"线采集","url":"static/map/example/2d/base/gatherPolyline.html","img":"./static/img/gatherpolyline.png"},
              {"title":"多边形采集","url":"static/map/example/2d/base/gatherPolygon.html","img":"./static/img/gatherpolygon.png"},
              {"title":"矩形采集","url":"static/map/example/2d/base/gatherRect.html","img":"./static/img/gatherRect.png"},
              {"title":"圆采集","url":"static/map/example/2d/base/gatherCircle.html","img":"./static/img/gatherCircle.png"},
              {"title":"椭圆采集","url":"static/map/example/2d/base/gatherEllipse.html","img":"./static/img/gatherEllipse.png"}
          ],
          mapEditMenuConfigs:[
              {"title":"点修改(*)","url":"static/map/example/2d/base/editMarker.html","img":"./static/img/editMarker.png"},
              {"title":"线修改(*)","url":"static/map/example/2d/base/editPolyline.html","img":"./static/img/editPolyline.png"},
              {"title":"多边形修改(*)","url":"static/map/example/2d/base/editPolygon.html","img":"./static/img/editPolygon.png"},
              {"title":"矩形修改(*)","url":"static/map/example/2d/base/editRect.html","img":"./static/img/editRect.png"},
              {"title":"圆修改(*)","url":"static/map/example/2d/base/editCircle.html","img":"./static/img/editCircle.png"},
              {"title":"椭圆修改","url":"static/map/example/2d/base/editEllipse.html","img":"./static/img/editEllipse.png"}
          ],
          plotGatherMenuConfigs:[
            {"title":"细直线采集","url":"static/map/example/2d/base/gatherStraightArrow.html","img":"./static/img/gatherStraightArrow.png"},
            {"title":"直线采集","url":"static/map/example/2d/base/gatherFineArrow.html","img":"./static/img/gatherFineArrow.png"},
            {"title":"突击方向采集","url":"static/map/example/2d/base/gatherAssaultDirection.html","img":"./static/img/gatherAssaultDirection.png"},
            {"title":"进攻方向采集","url":"static/map/example/2d/base/gatherAttackArrow.html","img":"./static/img/gatherAttackArrow.png"},
            {"title":"进攻方向采集（燕尾）","url":"static/map/example/2d/base/gatherTailedAttackArrow.html","img":"./static/img/gatherTailedAttackArrow.png"},
            {"title":"分队战斗箭头采集","url":"static/map/example/2d/base/gatherSquadCombat.html","img":"./static/img/gatherSquadCombat.png"},
            {"title":"分队战斗箭头采集（燕尾）","url":"static/map/example/2d/base/gatherTailedSquadCombat.html","img":"./static/img/gatherTailedSquadCombat.png"},
            {"title":"聚集地采集","url":"static/map/example/2d/base/gatherGatheringPlace.html","img":"./static/img/gatherGatheringPlace.png"},
            {"title":"钳击箭头采集","url":"static/map/example/2d/base/gatherDoubleArrow.html","img":"./static/img/gatherDoubleArrow.png"},

          ],

          plotEditMenuConfigs:[
            {"title":"细直线修改","url":"static/map/example/2d/base/editStraightArrow.html","img":"./static/img/editStraightArrow.png"},
            {"title":"直线修改","url":"static/map/example/2d/base/editFineArrow.html","img":"./static/img/editFineArrow.png"},
            {"title":"突击方向修改","url":"static/map/example/2d/base/editAssaultDirection.html","img":"./static/img/editAssaultDirection.png"},
            {"title":"进攻方向修改","url":"static/map/example/2d/base/editAttackArrow.html","img":"./static/img/editAttackArrow.png"},
            {"title":"进攻方向修改（燕尾）","url":"static/map/example/2d/base/editTailedAttackArrow.html","img":"./static/img/editTailedAttackArrow.png"},
            {"title":"分队战斗箭头修改","url":"static/map/example/2d/base/editSquadCombat.html","img":"./static/img/editSquadCombat.png"},
            {"title":"分队战斗箭头修改（燕尾）","url":"static/map/example/2d/base/editTailedSquadCombat.html","img":"./static/img/editTailedSquadCombat.png"},
            {"title":"聚集地修改","url":"static/map/example/2d/base/editGatheringPlace.html","img":"./static/img/editGatheringPlace.png"},
            {"title":"钳击箭头修改","url":"static/map/example/2d/base/editDoubleArrow.html","img":"./static/img/editDoubleArrow.png"},
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
