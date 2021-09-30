<template>
  <div id="main" style=""></div>
</template>

<script>
import * as echarts from "echarts";
import { queryStatus } from "../../utils/api.js";

export default {
  name: "DataViews",
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    queryStatus().then((res) => {
      // 绘制图表
      myChart.setOption({
        title: {
          text: "",
        },
        tooltip: {},
        xAxis: {
          data: ["未完成", "进行中", "完成/未付款", "完成/已付款"],
        },
        yAxis: {},
        series: [
          {
            name: "业务状态",
            type: "bar",
            data: res.data.content,
            color: ["#db9738", "#dd6b66"],
          },
        ],
      });
    });
  },
};
</script>

<style scoped>
#main {
  width: 100%;
  height: 600px;
  margin: 10px auto;
  background-color: white;
}
</style>