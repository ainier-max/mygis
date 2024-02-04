<template>
  <div style="height: 100%;">
    <el-container style="height: 100%;">
      <!--style="background-color:#000000"   PandaGIS-->
      <el-header>
        <div>
          <div>
            <div  @click="to3DGis()"><span style="cursor:pointer;color:#ffffff;font-size:26px;font-weight: bold;padding-left: 30px">GIS剑谱</span>
            </div>
          </div>
        </div>

        <div @click="to3DGis()"  style="cursor:pointer;position: absolute;left: 130px;top:-10px">
          <span style="color:#ffffff;font-size:12px;font-weight: bold;padding-left: 10px">2D</span>
        </div>

      </el-header>
      <el-container style="height: 100%">
        <el-aside width="201px">
          <div style="height: 100%;padding-top: -10px">
            <el-menu
              :default-active="activeIndex"
              class="elmenu-vertical"
              @select="handleSelect_menu"
              @open="handleOpen"
              @close="handleClose"
              text-color="#fff"
              active-text-color="#ffd04b">

              <el-menu-item index="1">
                <i class="el-icon-document"></i>
                <span slot="title" style="font-size: 16px">剑谱介绍</span>
              </el-menu-item>

              <el-menu-item index="2">
                <i class="el-icon-location"></i>
                <span slot="title" style="font-size: 16px">地图接入</span>
              </el-menu-item>

              <el-menu-item index="3">
                <i class="el-icon-menu"></i>
                <span slot="title" style="font-size: 16px">基础操作</span>
              </el-menu-item>

              <el-menu-item index="4">
                <i class="el-icon-s-data"></i>
                <span slot="title" style="font-size: 16px">特色图例</span>
              </el-menu-item>


              <el-menu-item index="5">
                <i class="el-icon-s-help"></i>
                <span slot="title" style="font-size: 16px">空间分析</span>
              </el-menu-item>

              <el-menu-item index="6">
                <i class="el-icon-s-grid"></i>
                <span slot="title" style="font-size: 16px">地图组件</span>
              </el-menu-item>


              <el-menu-item index="7">
                <i class="el-icon-date"></i>
                <span slot="title" style="font-size: 16px">应用场景</span>
              </el-menu-item>



              <el-menu-item index="8">
                <i class="el-icon-eleme"></i>
                <span slot="title" style="font-size: 16px">提交Issue</span>
              </el-menu-item>

              <el-menu-item index="9">
                <i class="el-icon-s-opportunity"></i>
                <span slot="title" style="font-size: 16px">技术服务与支持</span>
              </el-menu-item>

              <el-menu-item index="10">
                <i class="el-icon-question"></i>
                <span slot="title" style="font-size: 16px">常见问题</span>
              </el-menu-item>



              <el-menu-item index="11">
                <el-divider></el-divider>
                <i class="el-icon-coin"></i>
                <span slot="title" style="font-size: 16px">3D地图</span>
              </el-menu-item>


            </el-menu>
          </div>
        </el-aside>


        <el-main>
          <router-view></router-view>
        </el-main>
        <!--
        <el-footer style="height: 44px;"> &nbsp; &nbsp;@ 巨龙信息</el-footer>
        -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
    };
  },
  mounted: function () {
    console.log("this:", this.$route.fullPath);
    if (this.$route.fullPath.indexOf("main/gisIntroduce") >= 0) {
      this.activeIndex = '1';
    } else if (this.$route.fullPath.indexOf("main/gisAccess") >= 0) {
      this.activeIndex = '2';
    } else if (this.$route.fullPath.indexOf("main/gisBase") >= 0) {
      this.activeIndex = '3';
    } else if (this.$route.fullPath.indexOf("main/chart") >= 0) {
      this.activeIndex = '4';
    } else if (this.$route.fullPath.indexOf("main/gisApiExample") >= 0) {
      this.activeIndex = '5';
    } else if (this.$route.fullPath.indexOf("main/gisAssembly") >= 0) {
      this.activeIndex = '6';
    } else if (this.$route.fullPath.indexOf("main/gisScene") >= 0) {
      this.activeIndex = '7';
    }
  },
  methods: {
    to3DGis() {
      this.$router.push('/3d/gisAccess')
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect_menu(key, keyPath) {
      console.log(key, keyPath);

      if (key == "1") {
        console.log("剑谱介绍");
        this.$router.push('/2d/gisIntroduce')
      }
      if (key == "2") {
        console.log("地图接入");
        this.$router.push('/2d/gisAccess')
      }
      if (key == "3") {
        console.log("基础操作");
        this.$router.push('/2d/gisBase')
      }
      if (key == "4") {
        console.log("图表用例");
        this.$router.push('/2d/chart')
      }
      if (key == "5") {
        console.log("API接口用例");
        this.$router.push('/2d/gisApiExample')
      }
      if (key == "6") {
        console.log("UI组件");
        this.$router.push('/2d/gisAssembly')
      }
      if (key == "7") {
        console.log("应用场景");
        this.$router.push('/2d/gisScene')
      }

      if (key == "8") {
        console.log("提交ISSUE");
        this.$router.push('/2d/gisIssue')
        //window.open('http://192.168.0.149/service/gis/-/issues/new?issue[title]=&issue[description]=%3Cbr%3E%E6%8F%90%E4%BA%A4%E4%BA%BA%E5%91%98%E5%A7%93%E5%90%8D%EF%BC%9A(%E6%82%A8%E7%9A%84%E5%A7%93%E5%90%8D%EF%BC%8C%E7%94%A8%E4%BA%8E%E5%90%8E%E7%BB%AD%E5%8F%8D%E9%A6%88%E4%B8%8E%E5%AF%B9%E6%8E%A5)%0a%3Cbr%3E%E6%8F%90%E4%BA%A4%E5%86%85%E5%AE%B9:(%E6%8F%8F%E8%BF%B0%E5%85%B7%E4%BD%93%E7%9A%84%E9%9C%80%E6%B1%82/%E5%BB%BA%E8%AE%AE/BUG)%0a%3Cbr%3E%E7%9B%B8%E5%85%B3%E5%9B%BE%E7%89%87%E4%B8%8E%E9%99%84%E4%BB%B6%EF%BC%9A');
      }
      if (key == "9") {
        console.log("技术服务与支持");
        this.$router.push('/2d/gisSupport')
        //window.open('http://192.168.0.149/service/gis/-/issues');
      }
      if (key == "10") {
        console.log("常见问题");
        this.$router.push('/2d/gisQuestion')
      }
      if (key == "11") {
        console.log("3D地图");
        this.$router.push('/3d/gisAccess');
      }
    }
  }
}
</script>

<style scoped>
.el-header {
  line-height: 60px;
  height: 150px;
  padding: 0;
  /*background-image: url(../assets/home/head.png);*/
  /*background-repeat:no-repeat;*/
  /*background-size: 100% 100%;*/
  background-color: #453628;
  margin-bottom: -2px;
  padding-bottom: 20px;
}

.el-aside {
  /*background-image: url(../assets/home/left.png);*/
  /*background-repeat:no-repeat;*/
  /*background-size: 100% 100%;*/
  background-color: #453628;
}

.el-footer {
  line-height: 44px;
  height: 44px;
  padding: 0;
  background-color: #eee;
}

.el-main {
  /*background: url(../assets/home/center.png) no-repeat;*/
  /*background-repeat:no-repeat;*/
  /*background-size: 100% 100%;*/
  background-color: #f8f8f8;
}


.el-menu {
  border-right: solid 0px #333;
  background-color: rgba(13, 13, 13, 0) !important;
}

.logo {
  width: 200px;
  float: left;
  text-align: center;
  font-weight: 900;
  font-size: 20px
}

.elmenu-horizontal {
  margin-left: 201px;
}

.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 0;
}

.el-menu-item:focus, .el-menu-item:hover {
  background-color: rgba(13, 13, 13, 0.5) !important;
}

.is-active {
  background-color: rgba(13, 13, 13, 0.5);
}


</style>
