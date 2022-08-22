<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="onDaoChu"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="addUser"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工" sortable="" prop="staffPhoto">
            <template v-slot="{ row }">
              <img
                style="height: 100px; width: 100px; border-radius: 50%"
                :src="row.staffPhoto"
                alt=""
                v-imgError="require('@/assets/common/head.jpg')"
                @click="showErcodeDialog(row.staffPhoto)"
              />
            </template>
          </el-table-column>

          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatter"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template v-slot="{ row }">
              <el-switch
                :value="row.enableState == 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="openRole(row.id)"
                >角色</el-button
              >
              <el-button type="text" size="small" @click="delUser(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :page-size="pages.size"
            :current-page="pages.page"
            :total="total"
            @current-change="currentChange"
          />
        </el-row>
      </el-card>
      <!-- 角色分配 -->
      <assignRole :visible.sync="visibleRole" :currentId="currentId" />
    </div>
    <!-- 添加 -->
    <addemPloyees
      :visible.sync="showAdd"
      @addEmployee="getEmployeesInfo"
    ></addemPloyees>
    <!-- 二维码 -->
    <el-dialog title="二维码" :visible.sync="ercodeDialog">
      <canvas id="canvas"></canvas>
    </el-dialog>
  </div>
</template>

<script>
import QRcode from 'qrcode'
import { getEmployeesInfoApi, delUser } from '@/api/employees'
import EmployeeEnum from '@/constant/employees.js'
import addemPloyees from './components/addemPloyees.vue'
import assignRole from './components/assign-role.vue'
const { exportExcelMapPath } = EmployeeEnum
export default {
  name: 'employees',
  components: {
    addemPloyees,
    assignRole,
  },
  data() {
    return {
      visibleRole: false,
      employees: [],
      total: 0,
      pages: {
        page: 1,
        size: 5,
      },
      showAdd: false,
      ercodeDialog: false,
      currentId: '',
    }
  },

  created() {
    this.getEmployeesInfo()
  },

  methods: {
    //打开角色窗口
    openRole(id) {
      this.visibleRole = true
      this.currentId = id
    },
    //点击头像触发的二维码事件
    showErcodeDialog(pic) {
      if (!pic) return this.$message.error('该用户还未上传头像')
      this.ercodeDialog = true
      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        QRcode.toCanvas(canvas, pic)
      })
    },
    async onDaoChu() {
      const res = await import('@/vendor/Export2Excel')
      const { rows, total } = await getEmployeesInfoApi({
        page: 1,
        size: this.total,
      })
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          return item[exportExcelMapPath[h]]
        })
      })
      let { export_json_to_excel } = res
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: '007', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx', //非必填
      })
    },
    async getEmployeesInfo() {
      const { rows, total } = await getEmployeesInfoApi(this.pages)
      this.employees = rows
      this.total = total
    },
    currentChange(val) {
      this.pages.page = val
      this.getEmployeesInfo()
    },
    formatter(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find((item) => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async delUser(row) {
      await this.$confirm('您确定删除该员工吗')
      await delUser(row.id)
      this.getEmployeesInfo()
      this.$message.success('删除员工成功')
    },
    addUser() {
      this.showAdd = true
    },
  },
}
</script>

<style scoped lang="less"></style>
