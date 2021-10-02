<template>
  <div id="loginpage">
    <!-- 顶部 -->
    <div class="top">
      <img src="../assets/images/jx3.png" />
      <img
        style="width: 395px; margin-left: 12px"
        src="../assets/images/logo-text.png"
      />
    </div>
    <!-- 内容 -->
    <div class="loginpage">
      <!-- 登录板块 -->
      <div class="login">
        <!-- 登录顶部 -->
        <div class="login-header">
          <img src="../assets/images/logo-init.png" style="width: 130px" />
          <span style="margin-left: 5px">账号登录</span>
        </div>
        <!-- 登录内容 -->
        <div class="login-content">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item prop="UserName">
              <el-input
                v-model="ruleForm.UserName"
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>

            <el-form-item prop="PassWord">
              <el-input
                v-model="ruleForm.PassWord"
                placeholder="请输入密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                @click="submitForm"
                :loading="isloading"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <!-- 登录底部 -->
        <div class="login-footer">
          <span @click="waitPerfect">帮助手册</span>
          <span @click="waitPerfect">忘记密码</span>
          <span @click="waitPerfect">点击注册</span>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="bottom"></div>
  </div>
</template>

<script>
import { loginRequest } from "../utils/api.js";
// 防抖
function debounce(fn, delay = 200) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
// 节流标识
let symbol = true
export default {
  name: "LoginPage",
  data() {
    return {
      // 登录加载中...
      isloading: false,
      ruleForm: {
        UserName: "",
        PassWord: "",
      },
      rules: {
        UserName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        PassWord: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 登录提交
    submitForm: debounce(function () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          // 登录加载中
          this.isloading = true
          // 发送登录请求
          loginRequest(this.ruleForm).then(res=>{
            if(res.data.code === '200'){
              this.loginSuccess()
              this.isloading = false
              // 将token放入localStorage中
              localStorage.setItem('token',res.data.token)
              // 将传回的昵称放入vuex中
              this.$store.AdminName = res.data.name
              this.$router.replace({
                name:'homepage'
              })
            }else{
              this.loginError()
              this.isloading = false
            }
          })
        }
      });
    }),
    // 登录成功
    loginSuccess() {
      this.$notify({
        title: "登录",
        message: "用户登录成功!",
        type: "success",
      });
      this.ruleForm.UserName = "";
      this.ruleForm.PassWord = "";
    },
    // 登录错误
    loginError() {
      this.$notify({
        title: "错误",
        message: "账号或密码错误!",
        type: "error",
      });
      this.ruleForm.UserName = "";
      this.ruleForm.PassWord = "";
    },
    // 功能待完善
    waitPerfect(){
      if(symbol){
         this.$message({
          showClose: true,
          message: '功能正待完善.....'
        });
        setTimeout(() => {
          symbol = true
        }, 2500);
      }
      symbol = false
    }
  },
  mounted() {
    localStorage.clear();
  },
};
</script>

<style scoped>
#loginpage {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: rgb(31, 39, 43);
}
.bottom {
  width: 100%;
  height: 7%;
  background-color: rgb(31, 39, 43);
}
.top {
  display: flex;
  align-items: center;
  background-color: rgb(31, 39, 43);
  padding: 5px;
  padding-left: 30px;
  height: 7%;
}
.top img {
  width: 100px;
}
.loginpage {
  height: 650px;
  background-image: url("../assets/images/loginPage.jpg");
  background-position-y: -130px;
  background-position-x: -160px;
  overflow: hidden;
}
.login {
  border-radius: 5px;
  width: 420px;
  height: 400px;
  box-sizing: border-box;
  padding: 13px;
  margin-top: 100px;
  margin-left: 800px;
  background: rgb(255, 255, 255, 0.9);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.login-header {
  padding: 10px;

  display: flex;
  align-items: flex-end;
}
.login-content {
  padding-top: 20px;
  flex-grow: 3;
}
.demo-ruleForm {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* 输入框 */
.login-content >>> .el-input__inner {
  margin-left: -100px;
  width: 300px;
}
.login-content >>> .el-form-item__error {
  margin-left: -100px;
  width: 300px;
}
/* 按钮 */
.el-button {
  width: 300px;
  margin-top: 10px;
  margin-left: -100px;
}
.login-footer {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 14px;
  color: rgb(61, 61, 61);

  position: relative;
}
.login-footer span {
  cursor: pointer;
  margin: 5px;
}
.login-footer span:nth-child(1) {
  position: absolute;
  left: 10px;
  color: rgb(184, 179, 179);
}
.login-footer span:hover {
  color: rgb(245, 108, 108);
}
</style>
