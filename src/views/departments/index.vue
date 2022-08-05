<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <treetoolsVue
          :isRoot="true"
          :treeNode="{ name: '传智教育', manage: '负责人' }"
        ></treetoolsVue>
        <!-- 树形 -->
        <el-tree :data="treeDate" default-expand-all :props="propsDefault">
          <template v-slot="scope">
            <treetoolsVue :treeNode="scope.data"></treetoolsVue>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treetoolsVue from './components/treetools.vue'
import { getDeptsApi } from '@/api/departments'
export default {
  components: {
    treetoolsVue,
  },
  data() {
    return {
      treeDate: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' },
      ],
      propsDefault: {
        label: 'name',
      },
    }
  },

  created() {
    this.getDeptsA()
  },

  methods: {
    async getDeptsA() {
      const res = await getDeptsApi()
      console.log(res.depts)
      this.treeDate = res.depts
    },
  },
}
</script>

<style scoped lang="less"></style>
