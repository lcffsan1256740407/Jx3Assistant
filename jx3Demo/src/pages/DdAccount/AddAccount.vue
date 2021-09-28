<template>
  <div id="addaccount">
    <!-- 角色名称 -->
    <div class="role con">
      <span>角色名称:</span>
      <el-input
        placeholder="请输入角色名称"
        v-model="roleForm.roleName"
        clearable
      >
      </el-input>
    </div>
    <!-- 账号 -->
    <div class="role con">
      <span>游戏账号:</span>
      <el-input
        placeholder="请输入账号"
        v-model="roleForm.roleAccount"
        clearable
      >
      </el-input>
    </div>
    <!-- 密码 -->
    <div class="role con">
      <span>游戏密码:</span>
      <el-input
        placeholder="请输入密码"
        v-model="roleForm.rolePassword"
        clearable
      >
      </el-input>
    </div>
    <!-- 门派 -->
    <div class="sect con">
      <span>角色门派:</span>
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
    </div>
    <!-- 区服 -->
    <div class="area con">
      <span>角色区服:</span>
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
    </div>
    <!-- 业务 -->
    <div class="task con">
      <span>当前业务:</span>
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
    </div>
    <!-- 完成状态 -->
    <div class="state con">
      <span>当前状态:</span>
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
    </div>
    <!-- 备注 -->
    <div class="role con">
      <span>角色备注:</span>
      <el-input
        type="textarea"
        resize="none"
        v-model="roleForm.roleMsg"
        :rows="6"
      >
      </el-input>
    </div>
    <button @click="add">新增</button>
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
    add() {
      //完成账号添加
      addAccount(this.roleForm).then((res) => {
        console.log(res.data.code);
        if (res.data.code == "200") {
          this.$router.replace({
            name: "phaccount",
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
  padding-top: 15px;
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
.con {
  display: flex;
  align-items: center;
  margin: 15px 10px;
}
.con span {
  text-align: center;
  margin-right: 10px;
}
.con .el-input {
  width: 222px;
}
.con .el-textarea {
  width: 350px;
}
</style>