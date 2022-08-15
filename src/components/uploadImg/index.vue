<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      list-type="picture-card"
      :http-request="onRequest"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      :class="fileList.length ? 'hide' : ''"
      class="custom-upload"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible"
      ><img :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
var COS = require('cos-js-sdk-v5')

// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var cos = new COS({
  SecretId: 'AKIDMXS7VcT3LM6anjNlsiHacNr40f3B3f04',
  SecretKey: 'oLbaHiskLgkW1GtFK8fvta1A2dy2oJXU',
})

export default {
  name: 'uploadImg',
  data() {
    return {
      loading: false,
      imgUrl: '',
      dialogVisible: false,
      fileList: [],
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'miadern-1312649155' /* 填入您自己的存储桶，必须字段 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，例如ap-beijing，必须字段 */,
          Key: file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          this.loading = false
          if (err || data.statusCode !== 200) {
            return this.$message.error('上传失败，请重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location,
          })
        },
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.dialogVisible = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      const type = ['image/jpeg', 'image/gif']
      if (!type.includes(file.type)) {
        this.$message.error('上传失败！请上传' + type.join('或者') + '文件')
        return false
      }

      //判断文件大小是否超出
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('请上传小于' + maxSize / 1024 / 1024 + 'mb的文件')
        return false
      }
    },
  },
}
</script>

<style scoped lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
