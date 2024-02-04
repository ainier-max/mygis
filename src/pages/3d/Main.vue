<template>
  <div style="height: 100%;">
    <el-container style="height: 100%;">
      <el-header>
        <div>
          <div>
            <div @click="to2DGis()"><span style="cursor:pointer;color:#ffffff;font-size:26px;font-weight: bold;padding-left: 30px">GIS剑谱</span>
            </div>
          </div>
        </div>
        <div @click="to2DGis()" style="position: absolute;left: 130px;top:-10px">
          <span style="color:#ffffff;font-size:12px;font-weight: bold;padding-left: 10px">3D</span>
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

<!--              <el-menu-item index="1">-->
<!--                <i class="el-icon-document"></i>-->
<!--                <span slot="title" style="font-size: 16px">剑谱介绍</span>-->
<!--              </el-menu-item>-->

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

              <!--              <el-menu-item index="6">-->
              <!--                <i class="el-icon-date"></i>-->
              <!--                <span slot="title" style="font-size: 16px">地图组件</span>-->
              <!--              </el-menu-item>-->


              <el-menu-item index="7">
                <i class="el-icon-date"></i>
                <span slot="title" style="font-size: 16px">应用场景</span>
              </el-menu-item>


              <el-menu-item index="11">
                <el-divider></el-divider>
                <i class="el-icon-coin"></i>
                <span slot="title" style="font-size: 16px">2D地图</span>
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
    if (this.$route.fullPath.indexOf("3d/gisIntroduce") >= 0) {
      this.activeIndex = '1';
    } else if (this.$route.fullPath.indexOf("3d/gisAccess") >= 0) {
      this.activeIndex = '2';
    } else if (this.$route.fullPath.indexOf("3d/gisBase") >= 0) {
      this.activeIndex = '3';
    } else if (this.$route.fullPath.indexOf("3d/chart") >= 0) {
      this.activeIndex = '4';
    } else if (this.$route.fullPath.indexOf("3d/gisApiExample") >= 0) {
      this.activeIndex = '5';
    } else if (this.$route.fullPath.indexOf("3d/gisAssembly") >= 0) {
      this.activeIndex = '6';
    } else if (this.$route.fullPath.indexOf("3d/gisScene") >= 0) {
      this.activeIndex = '7';
    }
  },
  methods: {
    to2DGis() {
      this.$router.push('/2d')
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
        this.$router.push('/3d/gisIntroduce')
      }
      if (key == "2") {
        console.log("地图接入");
        this.$router.push('/3d/gisAccess')
      }
      if (key == "3") {
        console.log("基础操作");
        this.$router.push('/3d/gisBase')
      }
      if (key == "4") {
        console.log("图表用例");
        this.$router.push('/3d/gisChart')
      }
      if (key == "5") {
        console.log("空间分析");
        this.$router.push('/3d/gisSpace')
      }
      if (key == "6") {
        console.log("UI组件");
        this.$router.push('/3d/gisAssembly')
      }
      if (key == "7") {
        console.log("应用场景");
        this.$router.push('/3d/gisScene')
      }


      if (key == "11") {
        console.log("2D地图");
        this.$router.push('/2d')
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
  background-color: #453628;
  margin-bottom: -2px;
  padding-bottom: 20px;
}

.el-aside {
  background-color: #453628;
}

.el-footer {
  line-height: 44px;
  height: 44px;
  padding: 0;
  background-color: #eee;
}

.el-main {
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

.el-menu-item:focus, .el-menu-item:hover {
  background-color: rgba(13, 13, 13, 0.5) !important;
}

.is-active {
  background-color: rgba(13, 13, 13, 0.5);
}

.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 0;
}


</style>
