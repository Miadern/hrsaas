<template>
  <el-dialog
    :title="autoTitle"
    :visible="visible"
    width="50%"
    @close="onClose"
    v-loading="loading"
  >
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input placeholder="1-50个字符" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input placeholder="1-50个字符" v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          placeholder="请选择负责人"
          style="width: 100%"
          v-model="formData.manager"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          placeholder="1-300个字符"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  addDeptsApi,
  editDeptByIdApi,
  getDeptByIdApi,
  getDeptsApi,
} from '@/api/departments'
import { getEmployeesApi } from '@/api/employees'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },
  data() {
    const validatorName = async (rule, value, callback) => {
      if (this.formData.id) {
        //如果id存在则为编辑页面
        const { depts } = await getDeptsApi()
        const isRepeat = depts
          .filter(
            (item) =>
              item.pid === this.formData.pid && item.id !== this.formData.id,
          )
          .some((item) => item.name === this.formData.name)
        isRepeat ? callback(new Error('部门重复')) : callback()
      } else {
        if (!this.currentNode.children) return callback()
        const isRepeat = this.currentNode.children.some(
          (item) => item.name === value,
        )
        isRepeat ? callback(new Error('部门重复')) : callback()
      }
    }
    const validatorCode = async (rule, value, cb) => {
      const { depts } = await getDeptsApi()
      let isRepeat
      if (this.formData.id) {
        //如果id存在则为编辑页面
        isRepeat = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.id === this.formData.id)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }
      isRepeat ? cb(new Error('部门编码已存在')) : cb()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      },
      loading: false,
      formRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { validator: validatorName, trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            validator: validatorCode,
            trigger: 'blur',
          },
        ],
        manager: [
          { required: true, message: '请输入负责人', trigger: 'change' },
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
        ],
      },
      employees: [],
    }
  },

  created() {
    this.getEmployees()
  },
  computed: {
    autoTitle() {
      return this.formData.id ? '编辑部门' : '添加部门'
    },
  },
  methods: {
    async getEmployees() {
      const res = await getEmployeesApi()
      this.employees = res
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      }
    },
    async onSave() {
      if (this.formData.id) {
        this.loading = true
        await editDeptByIdApi(this.formData)
        this.loading = false
        this.$message.success('编辑成功')
        this.$emit('successLoad')
        this.onClose()
      } else {
        await this.$refs.form.validate()
        this.formData.pid = this.currentNode.id
        await addDeptsApi(this.formData)
        this.$message.success('新增成功')
        this.$emit('successLoad')
        this.onClose()
      }
    },
    async getDeptById(id) {
      this.formData = await getDeptByIdApi(id)
    },
  },
}
</script>

<style scoped lang="less"></style>
