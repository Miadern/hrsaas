<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="dashboard-container">
        <div class="app-container">
          <el-card>
            <el-tabs v-model="activeSelect" @tab-click="handleTbClick">
              <el-tab-pane label="登录账户设置" name="first">
                <!-- 放置表单 -->
                <el-form
                  :model="formDate"
                  label-width="120px"
                  style="margin-left: 120px; margin-top: 30px"
                >
                  <el-form-item label="姓名:">
                    <el-input
                      style="width: 300px"
                      v-model="formDate.username"
                    />
                  </el-form-item>
                  <el-form-item label="密码:">
                    <el-input
                      style="width: 300px"
                      type="password"
                      v-model="formDate.password"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="saveUserInfo"
                      >更新</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="个人详情" name="second">
                <userInfo />
              </el-tab-pane>
              <el-tab-pane label="岗位信息" name="third">
                <jobInfo />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserDetailApi, saveUserInfoApi } from '@/api/user'
import Cookies from 'js-cookie'
import userInfo from './components/user-info.vue'
import jobInfo from './components/job-info.vue'
export default {
  name: 'detail',
  data() {
    return {
      activeSelect: Cookies.get('activeSelect') || 'first',
      formDate: {},
    }
  },
  components: {
    userInfo,
    jobInfo,
  },
  created() {
    this.getUserDetail()
  },

  methods: {
    async getUserDetail() {
      const res = await getUserDetailApi(this.$route.params.id)
      this.formDate = res
    },
    async saveUserInfo() {
      await saveUserInfoApi(this.formDate, this.$route.params.id)
      this.$message.success('更新成功')
      this.getUserDetail()
    },
    handleTbClick() {
      Cookies.set('activeSelect', this.activeSelect)
    },
  },
}
</script>

<style scoped lang="less"></style>
