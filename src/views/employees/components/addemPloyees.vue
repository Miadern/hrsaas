<template>
  <el-dialog title="提示" :visible="visible" width="30%" @close="closeFn">
    <el-form :model="formData" :rules="rules" label-width="120px" ref="form">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-select
          ref="mySelect"
          @focus="treeFocus"
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
        >
          <el-option value="" v-loading="loading" class="treeOptin">
            <el-tree
              :data="data"
              :props="treeProps"
              @node-click="nodeClick"
            ></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeFn">取 消</el-button>
      <el-button type="primary" @click="OnClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import EmployeeEnum from '@/constant/employees.js'
import { getDeptsApi } from '@/api/departments'
import { tranListToTree } from '@/utils'
import { addEmployee } from '@/api/employees'
const { hireType } = EmployeeEnum

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      hireType,
      data: [],
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: '',
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位',
          },
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur',
          },
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'change' },
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' },
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' },
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }],
      },
      treeProps: {
        label: 'name',
      },
      loading: false,
    }
  },

  created() {},

  methods: {
    OnClick() {
      this.$refs.form.validate(async (vali) => {
        if (!vali) return
        await addEmployee(this.formData)
        this.$message.success('添加成功')
        this.closeFn()
        this.$emit('addEmployee')
      })
    },
    closeFn() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
    },
    async treeFocus() {
      this.loading = true
      let { depts } = await getDeptsApi()
      this.data = tranListToTree(depts, '')
      this.loading = false
    },
    nodeClick(row) {
      this.formData.departmentName = row.name
      this.$refs.mySelect.blur()
    },
  },
}
</script>

<style scoped lang="scss">
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff;
}
.treeOptin {
  height: 120px;
  overflow: unset;
}
</style>
