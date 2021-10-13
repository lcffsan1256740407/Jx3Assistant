<template>
  <div id="addaccount">
    <el-form
      :model="roleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- 角色名称 -->
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          placeholder="请输入角色名称"
          v-model="roleForm.roleName"
          clearable
        >
        </el-input>
      </el-form-item>
      <!-- 账号 -->
      <el-form-item label="角色账号" prop="roleAccount">
        <el-input
          placeholder="请输入账号"
          v-model="roleForm.roleAccount"
          clearable
        >
        </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="角色密码" prop="rolePassword">
        <el-input
          placeholder="请输入密码"
          v-model="roleForm.rolePassword"
          clearable
        >
        </el-input>
      </el-form-item>
      <!-- 门派 -->
      <el-form-item label="角色门派" prop="roleSect">
        <el-select
          v-model="roleForm.roleSect"
          clearable
          placeholder="请选择门派"
          popper-class="select"
        >
          <el-option
            v-for="item in Sect"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 区服 -->
      <el-form-item label="角色区服" prop="roleArea">
        <el-select
          v-model="roleForm.roleArea"
          clearable
          placeholder="请选择区服"
          popper-class="select"
        >
          <el-option
            v-for="item in Area"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 业务 -->
      <el-form-item label="当前业务" prop="roleTask">
        <el-select
          v-model="roleForm.roleTask"
          clearable
          placeholder="请选择业务"
          popper-class="select"
        >
          <el-option
            v-for="item in Task"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 完成状态 -->
      <el-form-item label="当前状态" prop="roleState">
        <el-select
          v-model="roleForm.roleState"
          clearable
          placeholder="请选择状态"
          popper-class="select"
        >
          <el-option
            v-for="item in State"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 备注 -->
      <el-form-item label="角色备注" prop="roleMsg">
        <el-input
          type="textarea"
          resize="none"
          v-model="roleForm.roleMsg"
          :rows="6"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <!-- 确认按钮 -->
    <button @click="add('ruleForm')">点击确认</button>
  </div>
</template>

<script>
import { addAccount } from "../../utils/api";

export default {
  name: "AddAccount",
  data() {
    return {
      // 基础收录
      roleForm: {
        roleName: "",
        roleSect: "",
        roleArea: "",
        roleTask: "",
        roleState: "",
        roleMsg: "",
        roleAccount: "",
        rolePassword: "",
      },
      // 表单规则
      rules: {
        roleName: [
          { required: true, message: "名称不可为空", trigger: "blur" },
        ],
        roleSect: [
          { required: true, message: "门派不可为空", trigger: "change" },
        ],
        roleArea: [
          { required: true, message: "区服不可为空", trigger: "change" },
        ],
        roleTask: [
          { required: true, message: "业务不可为空", trigger: "change" },
        ],
        roleState: [
          { required: true, message: "状态不可为空", trigger: "change" },
        ],
        roleMsg: [{ required: true, message: "备注不可为空", trigger: "blur" }],
        roleAccount: [
          { required: true, message: "账号不可为空", trigger: "blur" },
        ],
        rolePassword: [
          { required: true, message: "密码不可为空", trigger: "blur" },
        ],
      },
      // 门派数组
      Sect: [
        {
          value: "0",
          label: "藏剑",
        },
        {
          value: "1",
          label: "明教",
        },
        {
          value: "2",
          label: "天策",
        },
        {
          value: "3",
          label: "气纯",
        },
        {
          value: "4",
          label: "药宗",
        },
      ],
      // 区服数组
      Area: [
        {
          value: "0",
          label: "双梦",
        },
        {
          value: "1",
          label: "唯满侠",
        },
        {
          value: "2",
          label: "姨妈服",
        },
        {
          value: "3",
          label: "纵月",
        },
      ],
      // 业务数组
      Task: [
        {
          value: "0",
          label: "五胜",
        },
        {
          value: "1",
          label: "刷币",
        },
        {
          value: "2",
          label: "指定上段",
        },
      ],
      // 完成状态数组
      State: [
        {
          value: "0",
          label: "未完成",
        },
        {
          value: "1",
          label: "进行中",
        },
        {
          value: "2",
          label: "完成/未付款",
        },
        {
          value: "3",
          label: "完成/已付款",
        },
      ],
    };
  },
  methods: {
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 完成账号添加
          addAccount(this.roleForm).then((res) => {
            console.log(res.data.code);
            if (res.data.code == "200") {
              this.$router.replace({
                name: "phaccount",
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
#addaccount {
  width: 100%;
  height: 650px;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 10px;
  padding-top: 30px;
  padding-left: 35px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
#addaccount >>> .el-select .el-input.is-focus .el-input__inner,
#addaccount >>> .el-select .el-input__inner:focus,
#addaccount >>> .el-input__inner:focus,
#addaccount >>> .el-textarea__inner:focus {
  border-color: rgb(253, 151, 168);
}
#addaccount >>> .el-button:hover {
  color: white;
  border-color: rgb(253, 151, 168);
  background-color: rgb(253, 151, 168);
}
#addaccount >>> .el-button:active {
  color: white;
  border-color: rgb(235, 146, 161);
  background-color: rgb(235, 146, 161);
}
button {
  padding: 15px;
  color: white;
  right: 100px;
  bottom: 100px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: rgb(235, 146, 161);
  position: absolute;
}
button:hover {
  background-color: rgb(253, 151, 168);
}
#addaccount>>>.el-input__inner{
  width: 220px;
}
#addaccount>>>.el-textarea__inner{
  width: 500px;
}
</style>