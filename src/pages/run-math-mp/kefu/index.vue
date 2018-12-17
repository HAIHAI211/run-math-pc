<template>
  <div class="page kefu-page">
    <el-card>
      <div slot="header">
        <span>客服设置</span>
        <span :class="['submit-state', 'state-' + updateState]">{{updateStateMsg}}</span>
      </div>
      <el-form label-width="150px" label-position="right">
        <el-form-item label="关注公众号二维码">
          <el-upload
            class="avatar-uploader"
            action="/service-system/setting/upload/file"
            :data="uploadPicData"
            :show-file-list="false"
            :on-success="_uploadGongZhongSuccess"
            :auto-upload="true"
            :before-upload="_beforeCoverUpload">
            <img v-if="gongzhong && gongzhong.picUrl" :src="gongzhong.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="扫码进群二维码">
          <el-upload
            class="avatar-uploader"
            action="/service-system/setting/upload/file"
            :data="uploadPicData"
            :show-file-list="false"
            :on-success="_uploadQunSuccess"
            :auto-upload="true"
            :before-upload="_beforeCoverUpload">
            <img v-if="qun && qun.picUrl" :src="qun.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      updateState: 0,
      uploadPicData: {
        type: 'custom'
      },
      gongzhong: undefined,
      qun: undefined
    }
  },
  computed: {
    updateStateMsg () {
      switch (this.updateState) {
        case 0:
          return '' // 初始状态
        case 1:
          return '正在修改...'
        case 2:
          return '正在保存...'
        case 3:
          return '已保存'
        case 4:
          return '保存失败，请重试'
      }
    }
  },
  watch: {
    qun: {
      handler (newV, oldV) {
        if (oldV === undefined) {
          return
        }
        this.updateState = 1
        if (this.timeFlag) {
          clearTimeout(this.timeFlag)
        }
        this.timeFlag = setTimeout(async () => {
          let params = {
            content: '1',
            picUrl: this.qun.picUrl
          }
          console.log('params', params)
          try {
            this.updateState = 2
            await this.api.runMathMp.updateKefuPic(params)
            this.updateState = 3
          } catch (e) {
            this.updateState = 4
          }
        }, 700)
      },
      deep: true
    },
    gongzhong: {
      handler (newV, oldV) {
        if (oldV === undefined) {
          return
        }
        this.updateState = 1
        if (this.timeFlag) {
          clearTimeout(this.timeFlag)
        }
        this.timeFlag = setTimeout(async () => {
          let params = {
            content: '0',
            picUrl: this.gongzhong.picUrl
          }
          console.log('params', params)
          try {
            this.updateState = 2
            await this.api.runMathMp.updateKefuPic(params)
            this.updateState = 3
          } catch (e) {
            this.updateState = 4
          }
        }, 700)
      },
      deep: true
    }
  },
  async mounted () {
    const {data} = await this.api.runMathMp.getKefuPics()
    for (let i = 0; i < data.length; i++) {
      let d = data[i]
      if (d.content === '0') {
        this.gongzhong = d
      } else if (d.content === '1') {
        this.qun = d
      }
    }
  },
  methods: {
    _beforeCoverUpload (file) { // 上传封面前
      const isRightType = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isRightType) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isRightType && isLt2M
    },
    _uploadQunSuccess (res, file) { // 上传封面图成功
      console.log('上传封面图的结果', res)
      this.qun.picUrl = res.data[0]
    },
    _uploadGongZhongSuccess (res, file) { // 上传封面图成功
      console.log('上传封面图的结果', res)
      this.gongzhong.picUrl = res.data[0]
    }
  }
}
</script>
<style lang="stylus" scoped>
  .avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader /deep/ .el-upload:hover {
    border-color: $active-color;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }
</style>
