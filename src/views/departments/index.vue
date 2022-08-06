<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <treetoolsVue
          @add="dialogVisible = true"
          :isRoot="true"
          :treeNode="{ name: '传智教育', manage: '负责人' }"
        ></treetoolsVue>
        <!-- 树形 -->
        <el-tree :data="treeDate" default-expand-all :props="propsDefault">
          <template v-slot="scope">
            <treetoolsVue
              @add="addDeptFn"
              :treeNode="scope.data"
              @remove="getDeptsA"
              @edit="editFn"
            ></treetoolsVue>
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹出层 -->
    <addDeptVue
      ref="addDep"
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
      @successLoad="getDeptsA"
    ></addDeptVue>
  </div>
</template>

<script>
import treetoolsVue from './components/treetools.vue'
import { getDeptsApi } from '@/api/departments'
import { tranListToTree } from '@/utils'
import addDeptVue from './components/add-dept.vue'

export default {
  components: {
    treetoolsVue,
    addDeptVue,
  },
  data() {
    return {
      dialogVisible: false,
      treeDate: [],
      propsDefault: {
        label: 'name',
      },
      currentNode: {},
    }
  },

  created() {
    this.getDeptsA()
  },

  methods: {
    async getDeptsA() {
      const res = await getDeptsApi()
      this.treeDate = tranListToTree(res.depts, '')
    },
    addDeptFn(val) {
      this.dialogVisible = true
      this.currentNode = val
    },
    //点击编辑部门
    editFn(treeNode) {
      this.dialogVisible = true
      this.$refs.addDep.getDeptById(treeNode.id)
    },
  },
}
</script>

<style scoped lang="less"></style>
