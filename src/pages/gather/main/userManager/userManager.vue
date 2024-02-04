<template>
  <div style="height: 100%;">
    <div class="titleClass">用户管理</div>
    <div style="margin:40px 50px">
      <el-table
        :data="userData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="username"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sfzh"
          label="身份证号">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import {commonSelectRequest} from "../common/request"
export default {
  data() {
    return {
      userData: [],
    };
  },
  watch: {},
  mounted: function () {
    this.findAllUser();
  },
  methods: {
    findAllUser() {
      var param = {};
      param.sql = "gather_user.findUser";
      commonSelectRequest(param, this.findAllUserCallBack);
    },
    findAllUserCallBack(result){
      this.userData=result;
    }
  },
}
</script>

<style>
.titleClass {
  padding: 8px 16px;
  background-color: #fff6f7;
  border-radius: 4px;
  border-left: 5px solid #fe6c6f;
  margin: 10px 0;
  line-height: 40px;
}
</style>
