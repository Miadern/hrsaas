<template>
  <div>
    <uploadExc :beforeUpload="beforeUpload" :onSuccess="onSuccess"></uploadExc>
  </div>
</template>

<script>
import { formatTime } from '@/filters'
import employees from '@/constant/employees'
const { importMapKeyPath } = employees
import { importEmployee } from '@/api/employees'
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    beforeUpload({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请上传xlsx文件')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      const arr = results.map((item) => {
        let obj = {}
        for (let key in importMapKeyPath) {
          if (
            importMapKeyPath[key] == 'timeOfEntry' ||
            importMapKeyPath[key] == 'correctionTime'
          ) {
            const time = new Date((item[key] - 1) * 24 * 60 * 60 * 1000)
            time.setFullYear(time.getFullYear() - 70)
            obj[importMapKeyPath[key]] = formatTime(time)
          } else {
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      await importEmployee(arr)
      this.$message.success('批量导入成功')
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang="less"></style>
