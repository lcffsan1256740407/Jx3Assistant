<template>
  <div id="basic-header">
    <el-dropdown  @command="handleCommand">
      <div class="el-dropdown-link">
        <img src="../assets/images/user2.jpg" alt="">
        <span>{{$store.AdminName}}</span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">个人中心</el-dropdown-item>
        <el-dropdown-item command="2">订单管理</el-dropdown-item>
        <el-dropdown-item command="3" divided >退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "BasicHeader",
  methods: {
    handleCommand(command){
      if(command==3){
        // 清除token
        localStorage.clear()
        this.$router.replace({
          name:'loginpage'
        })
      }else{
        this.$message('功能正待开发中..');
      }
    }
  },
};
</script>

<style scoped>
#basic-header {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  border-bottom: 1px solid rgb(31, 38, 43);
  background-color: rgb(31, 39, 44);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 100px;
}
.el-dropdown-link {
  display: block;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: white;
}
.el-dropdown-link img{
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-right: 20px;
}
.el-dropdown-menu__item:hover{
  color: rgb(254,142,161) !important;
  background-color: white !important;
}

</style>