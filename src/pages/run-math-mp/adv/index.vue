<template>
  <div class="page adv-page">
    <el-card v-loading="loading">
      <el-table
        v-loading="loading"
        :data="advs"
        stripe
        style="width: 100%">
        <el-table-column
          prop="index"
          label="序号"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="name"
          label="广告位置">
        </el-table-column>
        <el-table-column
          prop="picUrl"
          label="广告图">
          <template slot-scope="scope">
            <img :src="scope.row.picUrl" style="width:100%;min-height:200px;"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="jumpUrl"
          label="跳转链接">
        </el-table-column>
        <el-table-column
          prop="uploadTimeStr"
          label="上传时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button @click="_edit(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="previewDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog
      center
      title="编辑"
      :visible.sync="advDialogVisible">
      <!--<span>这是一段信息</span>-->
      <span slot="footer" class="dialog-footer">
          <el-button @click="advDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="_submit">确 定</el-button>
        </span>
      <el-form ref="form" :model="form" label-width="100px" label-position="right">
          <el-form-item label="跳转链接">
            <el-input v-model="form.jumpUrl" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="广告图">
            <el-upload
              class="avatar-uploader"
              action="/service-system/setting/upload/file"
              :data="uploadPicData"
              :show-file-list="false"
              :on-success="_uploadCoverSuccess"
              :auto-upload="true"
              :before-upload="_beforeCoverUpload">
              <img v-if="form && form.picUrl" :src="form.picUrl" :class="['avatar', {'modal-avatar': form.id === 2}]">
              <i v-else :class="['el-icon-plus', 'avatar-uploader-icon', {'modal-icon': form.id === 2}]"></i>
            </el-upload>
          </el-form-item>
        <div class="size">{{size}}</div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import config from '@/config.js'
export default {
  data () {
    return {
      activeAdvId: 1,
      pageNum: 1,
      advs: [],
      previewDialogVisible: false,
      advDialogVisible: false,
      dialogImageUrl: '',
      uploadPicData: {
        type: 'cover'
      },
      form: {
        id: undefined,
        picUrl: undefined,
        jumpUrl: undefined
      }
    }
  },
  computed: {
    ...mapState(['loading']),
    size () {
      if (this.form.id === 2) {
        return '建议尺寸为200px * 300px'
      } else {
        return '建议尺寸为684px * 260px'
      }
    }
  },
  methods: {
    _edit (e) {
      this.form = {
        ...e
      }
      this.advDialogVisible = true
    },
    async _submit () {
      // todo
      console.log(this.form)
      const {
        id,
        jumpUrl,
        picUrl
      } = this.form
      await this.api.runMathMp.updateAdv({
        id,
        jumpUrl,
        picUrl
      })
      this.$message({
        type: 'success',
        message: '修改成功'
      })
      this._fetchAdvs()
      this.advDialogVisible = false
    },
    async _fetchAdvs () {
      let result = await this.api.runMathMp.getAdvs()
      this._filterResult(result)
      this.advs = result.data
      console.log('广告', this.advs)
    },
    _filterResult (result) {
      for (let i = 0; i < result.data.length; i++) {
        let index = (i + 1) + config.pageSize * (this.pageNum - 1)
        let item = result.data[i]
        item.index = index
        item.uploadTimeStr = this.utils.formatTime(new Date(item.uploadTime))
      }
    },
    _beforeCoverUpload (file) { // 上传封面前
      const isRightType = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isRightType && isLt2M
    },
    _uploadCoverSuccess (res, file) { // 上传封面图成功
      console.log('上传封面图的结果', res)
      this.form.picUrl = res.data[0]
    }
  },
  async mounted () {
    this._fetchAdvs()
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/assets/style/variable.styl"
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
  $w = 684px
  $h = 260px
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: $w;
    height: $h;
    line-height: $h;
    text-align: center;
    &.modal-icon{
      width: 200px;
      height: 300px;
      line-height 300px;
    }
  }
  .avatar {
    width: $w;
    height: $h;
    display: block;
    &.modal-avatar{
      width: 200px;
      height: 300px;
    }
  }
  .size{
    color darkred
    font-size 19px
    text-align center
  }
</style>
