<template>
  <el-card class="box-card">
    <el-row type="flex">
      <el-col>
        <el-tag v-if="isShowLeft">
          <i :class="leftIcon"></i>
          <slot name="left-tag"></slot>
        </el-tag>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right"></slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'pageTools',
  props: {
    isShowLeft: {
      type: Boolean,
      default: true,
    },
    leftIcon: {
      type: String,
      default: 'el-icon-info',
    },
  },
  data() {
    return {}
  },

  created() {},

  methods: {},
}
</script>

<style scoped lang="less"></style>
