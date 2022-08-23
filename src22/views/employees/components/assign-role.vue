<template>
  <el-dialog
    title="分配角色"
    :visible="visible"
    @close="closeFn"
    @open="openFn"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox :label="item.id" v-for="item in role" :key="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeFn">取 消</el-button>
      <el-button type="primary" @click="confirmFn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoleApi } from '@/api/role'
import { getUserDetailApi } from '@/api/user'
import { assignRoles } from '@/api/employees'

export default {
  name: 'assignRole',
  props: {
    visible: { type: Boolean, required: true },
    currentId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      checkList: [],
      role: [],
    }
  },

  created() {},

  methods: {
    closeFn() {
      this.$emit('update:visible', false)
    },
    //点击确认按钮，分配角色
    async confirmFn() {
      if (!this.checkList.length) return this.$message.error('请选择一个角色')
      await assignRoles({
        id: this.currentId,
        roleIds: this.checkList,
      })
      this.$message.success('分配角色成功')
      this.closeFn()
    },
    //打开弹窗触发
    openFn() {
      this.getRolesList()
      this.getUserDetail()
    },
    //获取角色列表
    async getRolesList() {
      const { rows } = await getRoleApi()
      this.role = rows
    },
    async getUserDetail() {
      const { roleIds } = await getUserDetailApi(this.currentId)
      this.checkList = roleIds
    },
  },
}
</script>

<style scoped lang="less"></style>
