<template>
  <div id="homepage">
    <el-container>
      <el-aside width="245px"><BasicMenu /></el-aside>
      <el-container class="content">
        <el-header><BasicHeader /></el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import BasicMenu from "../components/BasicMenu.vue";
import BasicHeader from "../components/BasicHeader.vue";

export default {
  name: "HomePage",
  components: { BasicMenu, BasicHeader },
  data() {
    return {};
  }
};
</script>


<style scoped>
#homepage {
  background:url('../assets/images/homePage.jpg') no-repeat;
  background-size: cover;
}
.el-aside {
  opacity: 0.9;
}
.el-header {
  padding: 0;
}
.content {
  width: 70%;
  opacity: 0.9;
}
</style>