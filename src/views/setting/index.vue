<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" size="small" @click="dialogVisible = true"
            >新增角色</el-button
          >
          <!-- 表格 -->
          <el-table border :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column label="描述" prop="description"> </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="small" type="success" @click="setRightsFn"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            @size-change="sizeChange"
            @current-change="currentChange"
            layout="sizes,prev, pager, next"
            :total="total"
            :page-sizes="[2, 5, 10, 20]"
            :pageSize="pageSize"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input disabled v-model="formData.companyAddress"></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="formData.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="formData.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      @close="dialogClose"
    >
      <el-form
        ref="form"
        :model="addForm"
        :rules="addFormRules"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="addForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAddClick">确 定</el-button>
      </span>
    </el-dialog>
    <!--分配权限  -->
    <el-dialog
      title="给角色分配权限"
      :visible.sync="setRightsDialog"
      width="50%"
    >
      <el-tree
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultExpandedKeys"
        :data="permissions"
        :props="{
          label: 'name',
        }"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightsDialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleApi, addRoleApi } from '@/api/role'
import { getCompanyInfoApi } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { tranListToTree } from '@/utils'

export default {
  name: 'setting',
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pageSize: 2,
      page: 1,
      dialogVisible: false,
      addForm: {
        name: '',
        description: '',
      },
      addFormRules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        description: [],
      },
      formData: {},
      setRightsDialog: false,
      permissions: [], //树形数据
      defaultExpandedKeys: ['1', '1063315016368918528'], //分配权限展开数据
    }
  },

  created() {
    this.getRole()
    this.getCompanyInfo()
    this.getPermissionList()
  },

  methods: {
    //点击分配权限触发
    setRightsFn() {
      this.setRightsDialog = true
    },

    async getRole() {
      const { rows, total } = await getRoleApi({
        page: this.page,
        pagesize: this.pageSize,
      })
      this.tableData = rows
      this.total = total
    },
    currentChange(val) {
      this.page = val
      this.getRole()
    },
    sizeChange(val) {
      this.pageSize = val
      this.getRole()
    },
    async onAddClick() {
      await this.$refs.form.validate()
      await addRoleApi(this.addForm)
      this.$message.success('添加成功')
      this.dialogVisible = false
      this.getRole()
    },
    dialogClose() {
      this.$refs.form.resetFields()
    },
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId,
      )
      this.formData = res
      console.log(res)
    },
    //获取权限列表
    async getPermissionList() {
      const res = await getPermissionList()
      const permissions = tranListToTree(res, '0')
      this.permissions = permissions
    },
  },
}
</script>

<style scoped lang="less"></style>
