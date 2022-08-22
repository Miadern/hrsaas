<template>
  <div class="dashboard-container">
    <div class="app-container">
      <pageTools :isShowLeft="false">
        <template slot="right">
          <el-button type="primary" @click="showAddDialog('0', 1)"
            >添加权限</el-button
          >
        </template>
      </pageTools>
      <!-- 表格 -->

      <el-table :data="permData" style="width: 100%" row-key="id" ref="table">
        <el-table-column label="名称" width="180">
          <template v-slot="{ row }">
            <i
              class="el-icon-folder-opened"
              v-if="row.children"
              style="margin-right: 5px"
              @click="expend(row)"
            ></i>
            <span @click="expend(row)">{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="标识" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="text" @click="showAddDialog(row.id, row.type + 1)"
              >添加</el-button
            >
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog :title="`新增权限点`" :visible="showDialog" @close="btnCancel">
        <!-- 表单 -->
        <el-form
          ref="Form"
          :model="formData"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width: 90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width: 90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width: 90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOK"
              >确定</el-button
            >
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addPermission, getPermissionList } from '@/api/permission'
import { tranListToTree } from '@/utils'

export default {
  data() {
    return {
      permData: [],
      showDialog: false,
      formData: {
        name: '',
        code: '',
        description: '',
        enVisible: 0,
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入标签',
            trigger: 'blur',
          },
        ],
        code: [
          {
            required: true,
            message: '请输入标签',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  created() {
    this.getPermissionList()
  },

  methods: {
    showAddDialog(pid, type) {
      this.showDialog = true
      this.formData.pid = pid
      this.formData.type = type
    },
    btnCancel() {
      this.showDialog = false
    },
    async btnOK() {
      await this.$refs.Form.validate()
      await addPermission(this.formData)
      this.$message.success('成功')
      this.showDialog = false
      this.getPermissionList()
    },
    async getPermissionList() {
      const res = await getPermissionList()
      this.permData = tranListToTree(res, '0')
    },
    expend(row) {
      row.isExpend = !row.isExpend
      this.$refs.table.toggleRowExpansion(row, row.isExpend)
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep .el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: none;
}
</style>
