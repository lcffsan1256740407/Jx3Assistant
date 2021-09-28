<template>
  <div id="PhAccount">
    <!-- 上方条件筛选区域 -->
    <div class="condition">
      <!-- 角色名称 -->
      <div class="role con">
        <span>角色名称:</span>
        <el-input
          placeholder="请输入角色名称"
          v-model="condition.roleName"
          clearable
        >
        </el-input>
      </div>
      <!-- 门派 -->
      <div class="sect con">
        <span>角色门派:</span>
        <el-select
          v-model="condition.roleSect"
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
          v-model="condition.roleArea"
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
          v-model="condition.roleTask"
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
          v-model="condition.roleState"
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
      <!-- 查询/重置/新增按钮 -->
      <div class="btns con">
        <el-button @click="ConditionQuery">查询</el-button>
        <el-button @click="ConditionReset">重置</el-button>
        <el-button @click="Add">新增</el-button>
      </div>
    </div>
    <!-- 下方账号列表展示区域 -->
    <div class="list-show">
      <div class="list" :class="Show == 0 ? '' : 'hide'">
        <!-- 表格 -->
        <el-table
          :data="AccountData"
          border
          stripe
          style="width: 100%"
          @selection-change="selectable"
          :header-cell-style="{ textAlign: 'center' }"
          :cell-style="{ textAlign: 'center' }"
          max-height="335px"
        >
          <!-- 复选框 -->
          <el-table-column type="selection" width="55"></el-table-column>
          <!-- 角色名称 -->
          <el-table-column prop="roleName" label="角色名称" width="135">
          </el-table-column>
          <!-- 角色门派 -->
          <el-table-column prop="roleSect" label="门派" width="90">
          </el-table-column>
          <!-- 角色区服 -->
          <el-table-column
            prop="roleArea"
            label="区服"
            width="90"
          ></el-table-column>
          <!-- 业务 -->
          <el-table-column prop="roleTask" label="业务" width="105">
          </el-table-column>
          <!-- 备注 -->
          <el-table-column
            prop="roleMsg"
            label="备注"
            width="255"
          ></el-table-column>
          <!-- 状态 -->
          <el-table-column prop="roleState" label="状态" width="115">
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="warning"
                size="small"
                @click="
                  showAccount(scope.row.roleAccount, scope.row.rolePassword)
                "
                >查看账号</el-button
              >
              <el-button
                type="warning"
                size="small"
                @click="showState(scope.row.id, scope.row.roleState)"
                >修改状态</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="showDelete(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="changePage"
            :current-page="nowPage"
            :page-sizes="[5, 4, 3, 2]"
            :page-size="nowSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            popper-class="select"
            background
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- 账号卡片 -->
    <div class="mask" v-show="Show != 0">
      <!-- 查看账号 -->
      <div class="account-card" v-show="Show == 1">
        <div>
          <span @click="cancel">×</span>
        </div>
        <p><span>账号:</span> {{ roleAccount }}</p>
        <p><span>密码:</span> {{ rolePassword }}</p>
      </div>
      <!-- 确定状态 -->
      <div class="account-card state" v-show="Show == 2">
        <div>
          <span @click="cancel">×</span>
        </div>
        <el-select
          v-model="status"
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
        <el-button @click="makeSure">确认修改</el-button>
      </div>
      <!-- 删除账号记录 -->
      <div class="account-card delete" v-show="Show == 3">
        <div>
          <span @click="cancel">×</span>
        </div>
        <p style="color: rgb(251, 138, 157)">确认要删除本条账号记录吗</p>
        <div>
          <el-button @click="makeDelete">删除</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  phAccountRequest,
  deleteAccount,
  changeStatus,
} from "../../utils/api.js";

export default {
  name: "PhAccount",
  data() {
    return {
      // 数据总条数
      total: 0,
      // 当前页码/展示条数
      nowPage: 1,
      nowSize: 5,
      // 角色名称
      roleName: "",
      // 账号
      roleAccount: "",
      // 密码
      rolePassword: "",
      // 账号id
      id: "",
      // 修改状态
      status: "",
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
      // 多选框数组
      selectable: [],
      // 选择的筛选条件对象
      condition: {
        roleName: '',
        roleSect: '',
        roleArea: '',
        roleTask: '',
        roleState: '',
      },
      // 查看账号遮罩层
      Show: 0,
      // 表格账号数据
      AccountData: [],
    };
  },
  methods: {
    // 查询按钮/Element-ui普通按钮,点击后不会失焦,需手动失焦,且分node节点按钮/span
    ConditionQuery(e) {
      let target = e.target;
      if (target.nodeName == "SPAN") {
        target = e.target.parentNode;
      }
      target.blur();
      this.nowPage = 1;
      this.nowSize = 5;

      phAccountRequest(this.condition).then((res) => {
        this.total = res.data.content.total;
        this.AccountData = res.data.content.result.map((item) => {
          this.hanhua(item);
          return item;
        });
      });
    },
    // 重置按钮
    ConditionReset(e) {
      let target = e.target;
      if (target.nodeName == "SPAN") {
        target = e.target.parentNode;
      }
      target.blur();
      // 重置条件
      for (let i in this.condition) {
        this.condition[i] = "";
      }
      this.nowPage = 1;
      this.nowSize = 5;
      phAccountRequest(this.condition).then((res) => {
        // 更新数据总数
        this.total = res.data.content.total;
        this.AccountData = res.data.content.result.map((item) => {
          this.hanhua(item);
          return item;
        });
      });
    },
    // 新增按钮
    Add(e) {
      let target = e.target;
      if (target.nodeName == "SPAN") {
        target = e.target.parentNode;
      }
      target.blur();
      this.$router.replace({
        name: "addaccount",
      });
    },
    // 展示账号卡片
    showAccount(account, password) {
      this.Show = 1;
      this.roleAccount = account;
      this.rolePassword = password;
    },
    // 展示状态卡片
    showState(id, roleState) {
      this.Show = 2;
      this.id = id;
      this.status = roleState;
    },
    // 展示删除卡片
    showDelete(id) {
      this.Show = 3;
      this.id = id;
    },
    // 确定修改状态
    makeSure(e) {
      let target = e.target;
      if (target.nodeName == "SPAN") {
        target = e.target.parentNode;
      }
      target.blur();

      changeStatus({ id: this.id, status: this.status }).then((res) => {
        if (res.data.code == "200") {
          phAccountRequest().then((res) => {
            this.AccountData = res.data.content.result.map((item) => {
              this.hanhua(item);
              return item;
            });
          });
        }
      });

      this.Show = 0;
    },
    // 确认删除
    makeDelete(e) {
      let target = e.target;
      if (target.nodeName == "SPAN") {
        target = e.target.parentNode;
      }
      target.blur();

      //发送删除请求并刷新
      deleteAccount(this.id).then((res) => {

        phAccountRequest().then((res) => {
          this.nowPage = 1
          this.AccountData = res.data.content.result.map((item) => {
            this.hanhua(item);
            return item;
          });
        });

      });
      this.Show = 0;
    },
    // 取消卡片展示
    cancel() {
      this.Show = 0;
    },
    // 改变当前页码
    changePage(num) {
      this.nowPage = num;
      phAccountRequest({ pageNum: this.nowPage, pageSize: this.nowSize ,...this.condition}).then(
        (res) => {
          // 更新数据总数
          this.total = res.data.content.total;
          this.AccountData = res.data.content.result.map((item) => {
            this.hanhua(item);
            return item;
          });
        }
      );
    },
    // 改变当前每页条数
    handleSizeChange(size) {
      this.nowSize = size;
      this.nowPage = 1;
      phAccountRequest({ pageNum: this.nowPage, pageSize: this.nowSize ,...this.condition}).then(
        (res) => {
          // 更新数据总数
          this.total = res.data.content.total;
          this.AccountData = res.data.content.result.map((item) => {
            this.hanhua(item);
            return item;
          });
        }
      );
    },

    // 封装一下查询账号里的汉化
    hanhua(item) {
      // 汉化门派
      if (item.roleSect == "0") {
        item.roleSect = "藏剑";
      } else if (item.roleSect == "1") {
        item.roleSect = "明教";
      } else if (item.roleSect == "2") {
        item.roleSect = "天策";
      } else if (item.roleSect == "3") {
        item.roleSect = "气纯";
      } else if (item.roleSect == "4") {
        item.roleSect = "药宗";
      }
      //汉化区服
      if (item.roleArea == "0") {
        item.roleArea = "双梦";
      } else if (item.roleArea == "1") {
        item.roleArea = "唯满侠";
      } else if (item.roleArea == "2") {
        item.roleArea = "姨妈服";
      } else if (item.roleArea == "3") {
        item.roleArea = "纵月";
      }
      //汉化业务
      if (item.roleTask == "0") {
        item.roleTask = "五胜";
      } else if (item.roleTask == "1") {
        item.roleTask = "刷币";
      } else if (item.roleTask == "2") {
        item.roleTask = "指定上段";
      }
      //汉化当前状态
      if (item.roleState == "0") {
        item.roleState = "未完成";
      } else if (item.roleState == "1") {
        item.roleState = "进行中";
      } else if (item.roleState == "2") {
        item.roleState = "完成/未付款";
      } else if (item.roleState == "3") {
        item.roleState = "完成/已付款";
      }
      return item;
    },
  },
  mounted() {
    phAccountRequest().then((res) => {
      console.log(res)
      // 更新数据总数
      this.total = res.data.content.total;
      this.AccountData = res.data.content.result.map((item) => {
        this.hanhua(item);
        return item;
      });
    });
  },
};
</script>

<style scoped>
.condition {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: white;
  border-radius: 5px;
  padding: 15px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.condition >>> .el-select .el-input.is-focus .el-input__inner,
.condition >>> .el-select .el-input__inner:focus,
.condition >>> .el-input__inner:focus {
  border-color: rgb(253, 151, 168);
}
.condition >>> .el-button:hover {
  color: white;
  border-color: rgb(253, 151, 168);
  background-color: rgb(253, 151, 168);
}
.condition >>> .el-button:active {
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
.btns {
  width: 300px;
  box-sizing: border-box;
  display: flex;
}
.list-show {
  min-height: 420px;
  margin-top: 25px;
  border-radius: 5px;
  background-color: white;
  padding: 15px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  position: relative;
}
/* 动态类名 */
.list-show .hide {
  visibility: hidden;
}
.el-table {
  margin-top: 25px;
}
.page {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
/* 分页样式修改 */
.page >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: rgb(250, 164, 35);
  color: #fff;
}
.page >>> .el-pagination.is-background .el-pager li:hover {
  color: rgb(250, 164, 35);
}
.page >>> .el-select .el-input.is-focus .el-input__inner,
.page >>> .el-select .el-input__inner:focus,
.page >>> .el-select .el-input__inner:hover,
.page >>> .el-input__inner:focus,
.page >>> .el-input__inner:hover {
  border-color: rgb(250, 164, 35);
}
/* 复选框样式修改 */
.el-table >>> .el-checkbox__input.is-checked .el-checkbox__inner,
.el-table >>> .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: rgb(253, 151, 168);
  border-color: rgb(253, 151, 168);
}
.el-table >>> .el-checkbox__inner:hover,
.el-table >>> .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: rgb(253, 151, 168);
}
/* 遮罩层 */
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: black;

  display: flex;
  justify-content: center;
  align-items: center;
}
.account-card {
  width: 300px;
  padding: 15px 35px;
  background-color: white;
  border-radius: 5px;
}
.account-card div {
  width: 100%;
  display: flex;
  justify-content: end;

  font-size: 26px;
  font-weight: bold;
}
.account-card div span {
  cursor: pointer;
}
.account-card div span:hover {
  color: rgb(253, 151, 168);
}
.account-card p {
  margin: 50px 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgb(253, 151, 168);
}
.account-card p span {
  margin-right: 20px;
}
.account-card.state {
  display: flex;
  flex-direction: column;
  padding-bottom: 45px;
}
.account-card.state .el-select {
  margin-top: 25px;
}
.state .el-button {
  margin-top: 30px;
}
.account-card.state >>> .el-button:hover,
.account-card.delete >>> .el-button:hover {
  color: white;
  border-color: rgb(253, 151, 168);
  background-color: rgb(253, 151, 168);
}
.account-card.state >>> .el-button:active,
.account-card.delete >>> .el-button:active {
  color: white;
  border-color: rgb(235, 146, 161);
  background-color: rgb(235, 146, 161);
}
.state >>> .el-select .el-input.is-focus .el-input__inner,
.state >>> .el-select .el-input__inner:focus,
.state >>> .el-input__inner:focus {
  border-color: rgb(253, 151, 168);
}
</style>
<style>
.select .el-select-dropdown__item.selected {
  color: rgb(253, 151, 168);
}
</style>