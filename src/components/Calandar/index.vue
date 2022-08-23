<template>
  <div>
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select v-model="currentYear" @change="updateCalendar">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="currentMouth" @change="updateCalendar">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }">
        <div class="data">{{ date.getDate() }}</div>
        <span v-if="isWeek(date)">休</span>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calandar',
  data() {
    return {
      currentYear: '',
      currentMouth: '',
      years: [],
      currentDate: '',
    }
  },

  created() {
    this.initCalandar()
  },

  methods: {
    updateCalendar() {
      this.currentDate = `${this.currentYear}-${this.currentMouth}`
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    //初始化日历资料
    initCalandar() {
      const nowTime = new Date()
      this.currentYear = nowTime.getFullYear()
      this.currentMouth = nowTime.getMonth() + 1
      this.years = Array(11)
        .fill(nowTime.getFullYear() - 5)
        .map((item, i) => item + i)
      this.currentDate = nowTime
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table td {
    border: none !important;
  }
  .data {
    text-align: center;
  }
}
</style>
