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
            v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号"
              width="100px">
            </el-table-column>
            <el-table-column
              prop="name"
              label="礼品名称">
            </el-table-column>
            <el-table-column
              prop="fitGradeStr"
              label="适用年级">
            </el-table-column>
            <el-table-column
              prop="presentType"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="uploadTimeStr"
              label="上传时间">
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
            v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号"
              width="100px">
            </el-table-column>
            <el-table-column
              prop="name"
              label="礼品名称">
            </el-table-column>
            <el-table-column
              prop="fitGradeStr"
              label="适用年级">
            </el-table-column>
            <el-table-column
              prop="videoVid"
              label="vid">
            </el-table-column>
            <el-table-column
              prop="uploadTimeStr"
              label="上传时间">
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
            v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号"
              width="100px">
            </el-table-column>
            <el-table-column
              prop="name"
              label="礼品名称">
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格(数学币)">
            </el-table-column>
            <el-table-column
              prop="totalAmount"
              label="剩余数量">
            </el-table-column>
            <el-table-column
              prop="uploadTimeStr"
              label="上传时间">
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
        <span slot="footer" class="dialog-footer">
          <el-button @click="giftDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="_submit">确 定</el-button>
        </span>
        <el-form ref="form" :model="form" label-width="100px" label-position="right" style="height:600px;overflow-y: scroll">
          <div class="my-line">
            <el-form-item label="礼品名称">
              <el-input v-model="form.name" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="价格(数学币)">
              <el-input-number size="medium" v-model="form.price" :min="1" :step="1" label="价格"></el-input-number>
            </el-form-item>
          </div>
          <div class="my-line" v-if="form.type === 2">
            <el-form-item label="原价(￥)">
              <my-input-number size="medium" v-model="form.price" :min="1" :step="1" label="原价"></my-input-number>
            </el-form-item>
            <el-form-item label="剩余总量">
              <el-input-number size="medium" v-model="form.totalAmount" :min="1" :step="1" label="剩余总量"></el-input-number>
            </el-form-item>
            <el-form-item label="包邮">
              <el-switch
                :value="form.postage === 1"
                @input="_setPostage($event)">
              </el-switch>
            </el-form-item>
          </div>
          <div class="my-line" v-if="form.type === 1">
            <el-form-item label="vid">
              <el-input v-model="form.videoVid" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="时长(秒)">
              <el-input v-model="form.videoDuration" style="width:200px;"></el-input>
            </el-form-item>
          </div>
          <div class="my-line">
            <el-form-item label="礼品封面">
              <el-upload
                class="avatar-uploader"
                action="/service-system/setting/upload/file"
                :data="uploadPicData"
                :show-file-list="false"
                :on-success="_uploadCoverSuccess"
                :auto-upload="true"
                :before-upload="_beforeCoverUpload">
                <img v-if="form.coverPicUrl" :src="form.coverPicUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="适用年级" v-if="form.type === 0 || form.type === 1">
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
          <div class="my-line" v-if="form.type === 0">
            <el-form-item label="公众号编码">
              <el-input v-model="form.fileKey" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="文件上传">
              <el-upload
                action="/service-system/setting/upload/file"
                :data="uploadFileData"
                :on-preview="handlePreview"
                :on-remove="_fileRemove"
                :on-success="_uploadFileSuccess"
                :file-list="fileList"
                :limit="1"
                :on-exceed="handleExceed">
                <el-button size="small" type="primary">点击上传</el-button>
                <!--<div slot="tip" class="el-upload__tip">文件不得不超过200M</div>-->
              </el-upload>
            </el-form-item>
          </div>
          <el-form-item label="轮播图">
            <my-upload
              action="/service-system/setting/upload/file"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="_lunboRemove"
              :data="uploadPicData"
              :limit="5"
              :file-list="lunboList"
              :on-exceed="_lunboExceed"
              :on-success="_uploadLunboSuccess"
              :before-upload="_beforeLunboUpload">
              <i class="el-icon-plus"></i>
            </my-upload>
            <el-dialog :visible.sync="previewDialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品介绍：">
            <vue-html5-editor :content="form.info" :height="360" :z-index="1000"
                              :auto-height="true" :show-module-name="true" @change="_editorChange"></vue-html5-editor>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import config from '@/config.js'
import MyInputNumber from '@/components/input-number'
import MyUpload from '@/components/upload'
import {mapState} from 'vuex'
export default {
  components: {
    MyInputNumber,
    MyUpload
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
      uploadPicData: {
        type: 'cover'
      },
      uploadFileData: {
        type: 'file'
      },
      lunboList: [],
      fileList: [],
      formTitle: '',
      form: {
        id: undefined,
        name: '',
        type: undefined,
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
        postage: 1,
        fileKey: ''
      }
    }
  },
  computed: {
    ...mapState(['loading'])
    // lunboList () {
    //   let result = []
    //   for (let i = 0; i < this.form.infoPicUrlList.length; i++) {
    //     let name = `轮播图${i + 1}`
    //     let url = this.form.infoPicUrlList[i]
    //     result.push({
    //       name,
    //       url
    //     })
    //   }
    //   return result
    // }
    // fileList: {
    //   get () {
    //     return [this.form.fileUrl]
    //   },
    //   set (v) {
    //     this.form.fileUrl = v
    //   }
    // }
  },
  watch: {
    activeName: {
      async handler (newV, oldV) {
        console.log('activeName从' + oldV + '变成了' + newV)
        this.pageNum = 1
        await this._fetchGifts()
      },
      immediate: true
    },
    giftDialogVisible (v) {
      if (!v) {
        this._clearForm()
      }
    }
  },
  methods: {
    async _submit () {
      this.form.infoPicUrlList = this.form.infoPicUrlList.join(',')
      const result = await this.api.runMathMp.updateGift(this.form)
      this.$message({
        type: 'success',
        message: '修改成功'
      })
      this._fetchGifts()
      console.log('修改礼物订单结果', result)
      this.giftDialogVisible = false
    },
    _clearForm () { // 为了消除轮播图动画
      console.log('清空form')
      this.form = {
        id: undefined,
        name: '',
        type: undefined,
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
        postage: 1,
        fileKey: ''
      }
      this.lunboList = []
    },
    _initLunboList () {
      let result = []
      for (let i = 0; i < this.form.infoPicUrlList.length; i++) {
        let name = `轮播图${i + 1}`
        let url = this.form.infoPicUrlList[i]
        result.push({
          name,
          url
        })
      }
      this.lunboList = result
    },
    _initFileList () {
      this.fileList = [{
        // name: this.utils.jiequ(this.form.fileUrl, '/'),
        name: '文件',
        url: this.form.fileUrl
      }]
    },
    _editorChange (e) {
      // console.log(e)
      this.form.info = e
    },
    _edit (e) {
      console.log(e)
      this.form = {...e}
      this._initLunboList()
      if (this.form.type === 0) {
        this._initFileList()
      }
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
      }).then(async () => {
        await this.api.runMathMp.deleteGift(e.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this._fetchGifts()
      })
    },
    _uploadCoverSuccess (res, file) { // 上传封面图成功
      console.log('上传封面图的结果', res)
      this.form.coverPicUrl = res.data[0]
    },
    _beforeCoverUpload (file) { // 上传封面前
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
    _lunboExceed (files, fileList) {
      this.$message.warning(`轮播图最多5张!`)
    },
    _beforeLunboUpload (file) { // 上传轮播图前
      return true
    },
    _uploadLunboSuccess (res, file) { // 上传轮播图成功
      console.log('轮播图上传成功', res, file)
      let url = res.data
      this.form.infoPicUrlList = [
        ...this.form.infoPicUrlList,
        url
      ]
    },
    _lunboRemove (file, fileList) {
      let result = []
      for (let i = 0; i < fileList.length; i++) {
        let url = fileList[i].url
        result.push(url)
      }
      this.form.infoPicUrlList = result
    },
    _uploadFileSuccess (res, file) { // 上传文件成功
      console.log('文件上传成功', res)
      this.form.fileUrl = res.data[0]
    },
    _fileRemove (file, fileList) {
      console.log('文件删除', file)
      this.form.fileUrl = ''
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.previewDialogVisible = true
    },
    handlePreview (file) {
      console.log(file)
      window.open(file.url || URL.createObjectURL(file.raw))
    },
    handleExceed (files, fileList) {
      this.$message.warning(`请先删除原先的文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    _filterResult (result) {
      for (let i = 0; i < result.data.length; i++) {
        let index = (i + 1) + config.pageSize * (this.pageNum - 1)
        let item = result.data[i]
        item.index = index
        item.uploadTimeStr = this.utils.formatTime(new Date(item.uploadTime))
        if (this.activeName === 'doc' || this.activeName === 'video') {
          let fitGradeStr = ''
          switch (item.fitGrade) {
            case 0:
              fitGradeStr = '一年级'
              break
            case 1:
              fitGradeStr = '二年级'
              break
            case 2:
              fitGradeStr = '三年级'
              break
            case 3:
              fitGradeStr = '四年级'
              break
            case 4:
              fitGradeStr = '五年级'
              break
            case 5:
              fitGradeStr = '六年级'
              break
            case 6:
              fitGradeStr = '初一'
              break
            case 7:
              fitGradeStr = '初二'
              break
            case 8:
              fitGradeStr = '初三'
              break
            case 9:
              fitGradeStr = '高一'
              break
            case 10:
              fitGradeStr = '高二'
              break
            case 11:
              fitGradeStr = '高三'
              break
          }
          item.fitGradeStr = fitGradeStr
        }
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
      this._filterResult(result)
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
