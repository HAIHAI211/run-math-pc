<template>
  <div class="page gift-page">
    <el-card class="rule-card">
<!--      <div slot="header">

      </div>-->
<!--      <el-dropdown>
        <el-button type="primary">
          新增<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>文档</el-dropdown-item>
          <el-dropdown-item>视频</el-dropdown-item>
          <el-dropdown-item>实物</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
      <el-tabs v-model="activeName">
        <el-tab-pane label="文档礼品" name="doc">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="礼品名称"
              width="400">
            </el-table-column>
            <el-table-column
              prop="presentType"
              label="类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="uploadTime"
              label="上传时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="totalAmount"
              label="剩余数量"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="_edit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="_delete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="视频礼品" name="video">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="礼品名称"
              width="400">
            </el-table-column>
            <el-table-column
              prop="presentType"
              label="类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="uploadTime"
              label="上传时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="totalAmount"
              label="剩余数量"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="_edit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="_delete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="实物礼品" name="real">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="礼品名称"
              width="400">
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格(数学币)"
              width="180">
            </el-table-column>
            <el-table-column
              prop="uploadTime"
              label="上传时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="totalAmount"
              label="剩余数量"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="_edit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="_delete(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-pagination
        background
        class="pagination"
        layout="prev, pager, next"
        :current-page.sync="pageNum"
        :page-count="pageCount" @current-change="_currentChange">
      </el-pagination>
      <el-dialog
        title="编辑/新增礼品"
        :visible.sync="giftDialogVisible">
        <!--<span>这是一段信息</span>-->
        <!--<span slot="footer" class="dialog-footer">-->
          <!--<el-button @click="giftDialogVisible = false">取 消</el-button>-->
          <!--<el-button type="primary" @click="giftDialogVisible = false">确 定</el-button>-->
        <!--</span>-->
        <el-form ref="form" :model="form" label-width="100px" label-position="right">
          <div class="my-line">
            <el-form-item label="礼品名称">
              <el-input v-model="form.name" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="适用年级">
              <el-select v-model="form.fitGrade" placeholder="请选择适用年级">
                <el-option label="一年级" :value="0"></el-option>
                <el-option label="二年级" :value="1"></el-option>
                <el-option label="三年级" :value="2"></el-option>
                <el-option label="四年级" :value="3"></el-option>
                <el-option label="五年级" :value="4"></el-option>
                <el-option label="六年级" :value="5"></el-option>
                <el-option label="初一" :value="6"></el-option>
                <el-option label="初二" :value="7"></el-option>
                <el-option label="初三" :value="8"></el-option>
                <el-option label="高一" :value="9"></el-option>
                <el-option label="高二" :value="10"></el-option>
                <el-option label="高三" :value="11"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="my-line">
            <el-form-item label="剩余总量">
              <my-input-number size="medium" v-model="form.totalAmount" :min="1" :step="1" label="剩余总量"></my-input-number>
            </el-form-item>
            <el-form-item label="价格(数学币)">
              <my-input-number size="medium" v-model="form.price" :min="1" :step="1" label="价格"></my-input-number>
            </el-form-item>
          </div>
          <el-form-item label="礼品封面">
            <el-upload
              class="avatar-uploader"
              action="/service-system/setting/upload/file"
              :data="uploadFileData"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.coverPicUrl" :src="form.coverPicUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="轮播图">
            <el-upload
              action="/service-system/setting/upload/file"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :data="uploadFileData"
              :file-list="form.infoPicUrlList"
              :before-upload="beforeAvatarUpload">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="previewDialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <div class="my-line">
            <el-form-item label="原价(￥)">
              <my-input-number size="medium" v-model="form.price" :min="1" :step="1" label="原价"></my-input-number>
            </el-form-item>
            <el-form-item label="包邮" v-if="form.postage">
              <el-switch
                :value="form.postage === 1"
                @input="_setPostage($event)">
              </el-switch>
            </el-form-item>
          </div>
          <el-form-item label="商品介绍：">
            <vue-html5-editor :content="form.info" :height="360" :z-index="1000"
                              :auto-height="true" :show-module-name="true" @change="_editorChange"></vue-html5-editor>
          </el-form-item>
          <!--<el-form-item>-->
            <!--<el-button type="primary" @click="onSubmit">立即创建</el-button>-->
            <!--<el-button>取消</el-button>-->
          <!--</el-form-item>-->
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import config from '@/config.js'
import MyInputNumber from '@/components/input-number'
export default {
  components: {
    MyInputNumber
  },
  data () {
    return {
      activeName: 'doc',
      pageCount: 1,
      pageNum: 1,
      tableData: [],
      giftDialogVisible: false,
      previewDialogVisible: false,
      dialogImageUrl: '', // 预览图片地址
      uploadFileData: {
        type: 'cover'
      },
      form: {
        id: undefined,
        name: '',
        coverPicUrl: '',
        infoPicUrlList: [],
        fileUrl: '',
        videoVid: '',
        videoDuration: '',
        fitGrade: undefined,
        totalAmount: 0,
        price: 0,
        originalPrice: 0,
        info: '',
        pushToIndex: 0,
        postage: 1
      }
    }
  },
  watch: {
    activeName: {
      async handler (newV, oldV) {
        console.log('activeName从' + oldV + '变成了' + newV)
        this.pageNum = 1
        await this._fetchGifts()
      },
      immediate: true
    }
  },
  methods: {
    _editorChange (e) {
      // console.log(e)
      this.form.info = e
    },
    _edit (e) {
      console.log(e)
      this.form = e
      this.giftDialogVisible = true
    },
    _setPostage (e) {
      console.log('setPostage', e)
      this.form.postage = e ? 1 : 0
    },
    _delete (e) {
      console.log(e)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    handleAvatarSuccess (res, file) {
      this.form.coverPicUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2
      //
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
      return true
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.previewDialogVisible = true
    },
    _addIndex (result) {
      for (let i = 0; i < result.data.length; i++) {
        let index = (i + 1) + config.pageSize * (this.pageNum - 1)
        result.data[i].index = index
      }
    },
    async _fetchGifts () {
      let apiName = ''
      if (this.activeName === 'doc') {
        apiName = 'getDocGifts'
      } else if (this.activeName === 'video') {
        apiName = 'getVideoGifts'
      } else {
        apiName = 'getRealGifts'
      }
      const result = await this.api.runMathMp[apiName](this.pageNum)
      console.log('pageCount', result.pageCount)
      this._addIndex(result)
      this.tableData = result.data
      this.pageCount = result.pageCount
      console.log(result)
    },
    _currentChange (currentPage) {
      console.log('currentChange', currentPage)
      this.pageNum = currentPage
      this._fetchGifts()
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/assets/style/variable.styl"
  .pagination{
    display flex
    justify-content center
    margin-top 30px
  }
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
