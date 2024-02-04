<template>
  <div class="login" style="height: 100%;">
    <div style="position: relative;top: 50%;left:50%;margin-top: -160px;margin-left: -211px">
      <el-form ref="loginForm" label-width="80px" class="login-box">
        <h3 class="login-title">通用采集系统</h3>
        <el-form-item label="账号">
          <el-input type="text" placeholder="请输入账号" v-model="userid"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" placeholder="请输入密码" v-model="password"/>
        </el-form-item>
        <el-form-item align="right">
          <el-button type="primary" v-on:click="onSubmit()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      userid: 'cbc',
      password: '123456'
    }
  },
  methods: {
    onSubmit() {
      //console.log("userid", this.userid);
      //console.log("password", this.password);
      this.getClientIP();
      var param = {};
      param.userid = this.userid;
      param.password = this.password;
      param.sql = "gather_user.findUser";
      var the = this;
      axios.post(window.gisConfig.serverUrl + '/cbc/select.cbc', param, my_headers_config)
        .then(response => {
          console.log("结果：", response);
          if (response.data[0].state == "success") {
            if (response.data[0].objects.length > 0) {
              if (response.data[0].objects[0].userid = the.userid) {
                console.log("登录成功");
                window.localStorage.setItem('loginUserid', response.data[0].objects[0].userid);
                this.$router.push('/gather/main/gatherState')
              } else {
                this.$message.error('请检查账号密码！如有问题请联系管理人员！');
              }
            } else {
              this.$message.error('请检查账号密码！如有问题请联系管理人员！');
            }
          } else {
            this.$message.error('请检查账号密码！如有问题请联系管理人员！');
          }
        }).catch(error => {
        this.$message.error('请检查账号密码！如有问题请联系管理人员！');
        console.log(error);
      });
    },
    getClientIP(){
      axios.get(window.gisConfig.serverUrl + '/cbc/getClientIP.cbc', {}
      ).then(function (response) {
        console.log("登陆IP地址",response.data[0].ip);
        window.localStorage.setItem('clientIP', response.data[0].ip);
      }).catch(function (error) {
        console.log("error",error);
      });

    },

  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  width: 100%;
  position: fixed;
  background-image: url(./img/background.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.login-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
  background-color: white;
  opacity: 0.9;
}

.login-title {
  text-align: center;
  margin: 0 auto 30px auto;
  color: #303133;
}
</style>
