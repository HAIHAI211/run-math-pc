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
      <!--<el-select v-model="activeAdvId" placeholder="请选择">-->
        <!--<el-option-->
          <!--v-for="(adv,advIndex) in advs"-->
          <!--:key="advIndex"-->
          <!--:label="adv.name"-->
          <!--:value="adv.id">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-upload-->
        <!--class="avatar-uploader"-->
        <!--action="/service-system/setting/upload/file"-->
        <!--:data="uploadPicData"-->
        <!--:show-file-list="false"-->
        <!--:on-success="_uploadCoverSuccess"-->
        <!--:auto-upload="true"-->
        <!--:before-upload="_beforeCoverUpload">-->
        <!--<img v-if="activeAdv && activeAdv.picUrl" :src="activeAdv.picUrl" class="avatar">-->
        <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
      <!--</el-upload>-->
    </el-card>
    <el-dialog :visible.sync="previewDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
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
      dialogImageUrl: '',
      uploadPicData: {
        type: 'cover'
      }
    }
  },
  methods: {
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
      this.coverPicUrl = res.data[0]
    }
  },
  computed: {
    ...mapState(['loading']),
    activeAdv () {
      for (let i = 0; i < this.advs.length; i++) {
        let adv = this.advs[i]
        if (adv.id === this.activeAdvId) {
          return adv
        }
      }
      return null
    }
  },
  async mounted () {
    let result = await this.api.runMathMp.getAdvs()
    this._filterResult(result)
    this.advs = result.data
    console.log('广告', this.advs)
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
