<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      <svg-icon icon-class="language" style="font-size: 20px" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(item, key) in messages"
        :key="key"
        :command="key"
        :disabled="$i18n.locale === key"
        >{{ item.name }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookies from 'js-cookie'
import { messages } from '@/i18n'
export default {
  name: 'toggleLang',
  data() {
    return {
      messages,
    }
  },

  created() {},

  methods: {
    handleCommand(val) {
      Cookies.set('HMRZLang', val)
      this.$i18n.locale = val
      this.$router.go(0)
    },
  },
}
</script>

<style scoped lang="scss">
.el-dropdown-link {
  color: #fff;
}
</style>
