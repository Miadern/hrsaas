<template>
  <div>
    <div id="radarChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'radar',
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.initEcharts()
  },
  methods: {
    initEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('radarChart'))
      // 绘制图表
      myChart.setOption({
        backgroundColor: '#161627',
        textStyle: {
          color: 'pink',
        },
        title: {
          text: '人员绩效表',
          textStyle: {
            color: '#fff',
          },
        },
        legend: {
          data: ['张三', '李四'],
          textStyle: {
            color: 'pink',
            fontSize: 14,
          },
        },

        radar: {
          splitArea: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: ['aqua', '#fff'],
            },
          },
          // shape: 'circle',
          indicator: [
            { name: '加班', max: 100 },
            { name: 'BUG数量', max: 100 },
            { name: '打游戏', max: 100 },
            { name: '早退', max: 100 },
            { name: '摸鱼', max: 100 },
            { name: '迟到', max: 100 },
          ],
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [100, 100, 100, 100, 100, 100],
                name: '张三',
              },
              {
                value: [50, 40, 20, 30, 30, 50],
                name: '李四',
              },
            ],
          },
        ],
      })
    },
  },
}
</script>

<style scoped lang="scss">
#radarChart {
  width: 700px;
  height: 500px;
}
</style>
