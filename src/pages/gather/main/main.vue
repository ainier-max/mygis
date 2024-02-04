<template>
  <div style="height: 100%;">
    <el-container style="height: 100%;">
      <el-header>
        <div>
          <div style="float: left">
            <span style="font-size: 28px;color:white;font-weight: bold;padding-left: 40px">数据采集</span>
          </div>


          <!--          <div style="float: right;cursor: pointer">-->
          <!--            <span style="font-size: 16px;color:white;font-weight: bold;">登录用户:{{userid}}</span>-->
          <!--            <span style="font-size: 16px;color:red;font-weight: bold;padding-right: 10px" @click="loginOut">退出</span>-->
          <!--          </div>-->

          <div style="float: right;cursor: pointer;padding-right:10px">
            <el-dropdown trigger="hover"
                         :hide-on-click="false">
              <span class="el-dropdown-link" style="color:white">
                {{ userid }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的资料</el-dropdown-item>
                <el-dropdown-item divided
                                  @click.native="loginOut">退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </div>
      </el-header>
      <el-container style="height: 100%;padding-top: 2px">
        <el-aside width="201px">
          <div style="height: 100%;">
            <el-menu
              style="background:transparent ;"
              :default-active="activeIndex"
              class="elmenu-vertical"
              @select="handleSelect_menu"
              @open="handleOpen"
              @close="handleClose"
              text-color="#fff"
              active-text-color="#ffd04b">

              <el-menu-item index="1">
                <i class="el-icon-document"></i>
                <span slot="title" style="font-size: 16px">采集状况</span>
              </el-menu-item>

              <el-menu-item index="2">
                <i class="el-icon-location"></i>
                <span slot="title" style="font-size: 16px">采集任务</span>
              </el-menu-item>


              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title" style="font-size: 16px">任务管理</span>
                </template>
                <el-menu-item index="3-1">任务申请</el-menu-item>
                <el-menu-item index="3-2">任务审批</el-menu-item>
                <el-menu-item index="3-3">任务调配</el-menu-item>
                <el-menu-item index="3-4">任务详情</el-menu-item>
                <el-menu-item index="3-5">任务分配</el-menu-item>
              </el-submenu>

              <el-menu-item index="4">
                <i class="el-icon-s-data"></i>
                <span slot="title" style="font-size: 16px">下拉框字典</span>
              </el-menu-item>


              <el-menu-item index="5">
                <i class="el-icon-s-help"></i>
                <span slot="title" style="font-size: 16px">树形字典</span>
              </el-menu-item>

              <el-menu-item index="6">
                <i class="el-icon-date"></i>
                <span slot="title" style="font-size: 16px">人员管理</span>
              </el-menu-item>


            </el-menu>
          </div>
        </el-aside>


        <el-main>
          <router-view></router-view>
        </el-main>

        <!--        <el-footer> &nbsp; &nbsp;@ 巨龙信息</el-footer>-->

      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      userid: '',
    };
  },
  mounted: function () {
    this.userid = window.localStorage.getItem('loginUserid');
    if (this.userid == null || this.userid == '' || this.userid == 'null') {
      this.$router.push('/gather/login');
    }
    var elMainClass= document.getElementsByClassName("el-main");
    elMainClass[0].style.padding="0px";
  },
  methods: {
    loginOut() {
      window.localStorage.setItem('loginUserid', null);
      this.$router.push('/gather/login');
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
        console.log("采集状况");
        var elMainClass= document.getElementsByClassName("el-main");
        elMainClass[0].style.padding="0px";
        this.$router.push('/gather/main/gatherState')
      }
      if (key == "2") {
        console.log("任务采集");
        this.$router.push('/gather/main/gatherTask')
        var elMainClass= document.getElementsByClassName("el-main");
        elMainClass[0].style.padding="20px";
      }
      if (key == "3-1") {
        console.log("任务申请");
        this.$router.push('/gather/main/taskApply')
        var elMainClass= document.getElementsByClassName("el-main");
        elMainClass[0].style.padding="20px";
      }
      if (key == "3-2") {
        console.log("任务审批");
        this.$router.push('/gather/main/taskApproval')
        var elMainClass= document.getElementsByClassName("el-main");
        elMainClass[0].style.padding="20px";
      }
      if (key == "3-3") {
        console.log("任务调配");
        this.$router.push('/gather/main/taskDeploy')
        var elMainClass= document.getElementsByClassName("el-main");
        elMainClass[0].style.padding="20px";
      }
      if (key == "3-4") {
        console.log("任务详情");
        this.$router.push('/gather/main/taskDetail')
        var elMainClass= document.getElementsByClassName("el-main");
        elMainClass[0].style.padding="20px";
      }
      if (key == "3-5") {
        console.log("任务分配");
        this.$router.push('/gather/main/taskDistribution')
        var elMainClass= document.getElementsByClassName("el-main");
        elMainClass[0].style.padding="20px";
      }

      if (key == "4") {
        console.log("下拉框字典");
        this.$router.push('/gather/main/selectDic')
        var elMainClass= document.getElementsByClassName("el-main");
        elMainClass[0].style.padding="20px";
      }
      if (key == "5") {
        console.log("树形字典");
        this.$router.push('/gather/main/treeDic')
        var elMainClass= document.getElementsByClassName("el-main");
        elMainClass[0].style.padding="20px";
      }
      if (key == "6") {
        console.log("用户管理");
        this.$router.push('/gather/main/userManager')
        var elMainClass= document.getElementsByClassName("el-main");
        elMainClass[0].style.padding="20px";
      }
      if (key == "7") {

      }
    }
  }
}
</script>

<style>
.el-header {
  line-height: 60px;
  height: 150px;
  padding: 0;
  margin-bottom: -2px;
  padding-bottom: 20px;
  background-color: #23262E;
}

.el-aside {
  background-color: #2c3e50 !important;
}

.el-menu {
  border-right: solid 0px #333 !important;
  background-color: #2c3e50 !important;
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

.el-submenu__title:hover {
  background-color: rgba(13, 13, 13, 0.5) !important;
}


</style>
