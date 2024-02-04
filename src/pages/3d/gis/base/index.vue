<template>
  <div style="width: 100%;" >
    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 30px;color: gray;font-size: 20px"><span>地图元素绘制</span></div>
    <div style="padding-left: 30px;padding-right: 30px"><el-divider></el-divider></div>
    <div style="width: 100%">
      <div>
        <ul style="padding-inline-start:10px;padding-top: 5px;padding-right: 5px">
          <li v-for="(item,i) in mapDrawMenuConfigs" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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
      <span style="padding-left: 30px;margin-bottom: -10px;padding-top: 20px;color: gray;font-size: 20px">地图操作</span>
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






    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 30px;color: gray;font-size: 20px"><span>地图元素采集</span></div>
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

    <div style="padding-left: 30px;margin-bottom: -10px;padding-top: 30px;color: gray;font-size: 20px"><span>地图元素修改</span></div>
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
          <li v-for="(item,i) in MilitaryPlottingConfig" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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
          <li v-for="(item,i) in MilitaryPlottingEditConfig" style="cursor:pointer;padding-left:40px;padding-top:30px;display:inline-block;list-style:none;">
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


    <div style="height: 60px"></div>
  </div>
</template>

<script>
    export default {
        data(){
            return {
                mapDrawMenuConfigs:[
                  {"title":"点","url":"static/map/example/3d/base/point.html","img":"./static/img/point3d.png"},
                  {"title":"线","url":"static/map/example/3d/base/polyline.html","img":"./static/img/polyline3d.png"},
                  {"title":"面","url":"static/map/example/3d/base/polygon.html","img":"./static/img/polygon3d.png"},
                  {"title":"矩形","url":"static/map/example/3d/base/rect.html","img":"./static/img/rect3d.png"},
                  {"title":"圆与椭圆","url":"static/map/example/3d/base/ellipse.html","img":"./static/img/ellipse3d.png"},
                ],
                wapianServerMenuConfigs:[
                    {"title":"飞行居中","url":"static/map/example/3d/base/flyTo.html","img":"./static/img/flyTo3d.png"},
                    {"title":"绕点旋转","url":"static/map/example/3d/base/rotate.html","img":"./static/img/rotate3d.png"},
                    {"title":"获取地图信息","url":"static/map/example/3d/base/getInfo.html","img":"./static/img/getInfo3d.png"},
                    {"title":"获取地形高度","url":"static/map/example/3d/base/getTerrainHeight.html","img":"./static/img/3dgetTerrainHeight.png"},
                    {"title":"图标（广告牌）","url":"static/map/example/3d/base/billboard.html","img":"./static/img/billboard3d.png"},
                    {"title":"gif图片","url":"static/map/example/3d/base/gif.html","img":"./static/img/gif3d.png"},
                    {"title":"自定义HTML","url":"static/map/example/3d/base/html.html","img":"./static/img/html3d.png"},
                    {"title":"tooltip","url":"static/map/example/3d/base/tooltip.html","img":"./static/img/tooltip3d.png"},
                    {"title":"地图信息显示","url":"static/map/example/3d/base/showMapInfo.html","img":"./static/img/showMapInfo3d.png"},
                    {"title":"坐标转换","url":"static/map/example/3d/base/transform.html","img":"./static/img/transform3d.png"},

                ],
                mapEventMenuConfigs:[
                  {"title":"高度监听","url":"static/map/example/3d/base/heightMonitor.html","img":"./static/img/heightMonitor.png"},
                ],

                mapGatherMenuConfigs:[
                  {"title":"点采集","url":"static/map/example/3d/base/pointGather.html","img":"./static/img/gif/pointGather3d.gif"},
                  {"title":"线采集","url":"static/map/example/3d/base/polylineGather.html","img":"./static/img/gif/polylineGather3d.gif"},
                  {"title":"面采集","url":"static/map/example/3d/base/polygonGather.html","img":"./static/img/gif/polygonGather3d.gif"},
                  {"title":"矩形采集","url":"static/map/example/3d/base/rectGather.html","img":"./static/img/gif/rectGather3d.gif"},
                  {"title":"圆采集","url":"static/map/example/3d/base/circleGather.html","img":"./static/img/gif/ellipseGather3d.gif"},
                  {"title":"椭圆采集","url":"static/map/example/3d/base/ellipseGather.html","img":"./static/img/ellipseGather.png"},
                ],
                mapEditMenuConfigs:[
                  {"title":"点修改","url":"static/map/example/3d/base/pointEdit.html","img":"./static/img/gif/pointEdit3d.gif"},
                  {"title":"线修改","url":"static/map/example/3d/base/polylineEdit.html","img":"./static/img/gif/polylineEdit3d.gif"},
                  {"title":"面修改","url":"static/map/example/3d/base/polygonEdit.html","img":"./static/img/gif/polygonEdit3d.gif"},
                  {"title":"矩形修改","url":"static/map/example/3d/base/rectEdit.html","img":"./static/img/gif/rectEdit3d.gif"},
                  {"title":"圆修改","url":"static/map/example/3d/base/circleEdit.html","img":"./static/img/gif/ellipseEdit3d.gif"},
                  {"title":"椭圆修改","url":"static/map/example/3d/base/ellipseEdit.html","img":"./static/img/ellipseEdit.png"},
                ],
                MilitaryPlottingConfig:[
                  {"title":"直线箭头采集","url":"static/map/example/3d/base/plotStraightArrow.html","img":"./static/img/gif/pointEdit3d.gif"},
                  {"title":"攻击箭头采集（燕尾）","url":"static/map/example/3d/base/plotAttackArrow.html","img":"./static/img/gif/pointEdit3d.gif"},
                  {"title":"攻击箭头采集（平尾）","url":"static/map/example/3d/base/plotAttackArrowHorizontal.html","img":"./static/img/gif/pointEdit3d.gif"},
                  {"title":"钳击箭头采集","url":"static/map/example/3d/base/plotPincerArrow.html","img":"./static/img/gif/pointEdit3d.gif"},
                  {"title":"集结地采集","url":"static/map/example/3d/base/plotRendezvous.html","img":"./static/img/gif/pointEdit3d.gif"},
                ],
                MilitaryPlottingEditConfig:[
                  {"title":"直线箭头修改","url":"static/map/example/3d/base/plotStraightArrowEdit.html","img":"./static/img/gif/pointEdit3d.gif"},
                  {"title":"攻击箭头修改（燕尾）","url":"static/map/example/3d/base/plotAttackArrowEdit.html","img":"./static/img/gif/pointEdit3d.gif"},
                  {"title":"攻击箭头修改（平尾）","url":"static/map/example/3d/base/plotAttackArrowHorizontalEdit.html","img":"./static/img/gif/pointEdit3d.gif"},
                  {"title":"钳击箭头修改","url":"static/map/example/3d/base/plotPincerArrowEdit.html","img":"./static/img/gif/pointEdit3d.gif"},
                  {"title":"集结地修改","url":"static/map/example/3d/base/plotRendezvousEdit.html","img":"./static/img/gif/pointEdit3d.gif"},
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
    transform: scale(1.2);
    cursor: pointer;
  }
</style>
