<template>
  <el-menu
    default-active="/homepage/phaccount"
    class="el-menu-vertical-demo"
    background-color="rgb(31,38,43)"
    text-color="white"
    active-text-color="rgb(253,76,93)"
    router
  >
    <!-- logo部分 -->
    <div class="logo">
      <img
        src="https://jx3yq.xoyo.com/assets/2021/07/23/logo/logo.png"
        style="width:210px"
      />
    </div>
    <!-- 列表一 -->
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-unfold"></i>
        <span slot="title">代打账号</span>
      </template>

      <el-menu-item-group>
        <el-menu-item index="/homepage/phaccount">账号列表</el-menu-item>
        <el-menu-item index="1-2">其他</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-info"></i>
        <span slot="title">等待完善</span>
      </template>

      <el-menu-item-group>
        <el-menu-item index="2-1">芜湖起飞</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "BasicMenu",
  data() {
    return {
      isCollapse:true
    }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo {
  width: 245px;
  height: 100vh;
  font-family: "Helvetica Neue";
  border: none;
}
.logo {
  margin: 16px;
  display: flex;
  align-content: center;
  align-items: flex-end;
  color: rgb(253, 76, 93);
  font-size: 22px;
  font-weight: bold;
}
.logo img {
  margin-right: 16px;
}
.ant-layout-sider-trigger {
  background-color: white;
  padding-left: 20px;
  text-align: start;
}

.el-menu-item-group .el-menu-item:hover {
  background: rgb(252, 183, 194) !important;
}
.el-menu-vertical-demo >>> .el-submenu__title:hover {
  background: rgb(252, 183, 194) !important;
}
</style>