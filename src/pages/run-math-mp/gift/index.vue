<template>
  <div class="page gift-page">
    <el-card class="rule-card" style="position: relative;">
<!--      <div slot="header">

      </div>-->
      <el-dropdown style="position: absolute;top:10px;right:20px;z-index: 1000;" @command="_add">
        <el-button type="primary">
          新增<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="doc">文档</el-dropdown-item>
          <el-dropdown-item command="video">视频</el-dropdown-item>
          <el-dropdown-item command="real">实物</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
              prop="pushToIndex"
              :formatter="_formatterPushToIndex"
              label="首页推荐">
            </el-table-column>
            <el-table-column
              prop="fitGrade"
              :formatter="_formatterGrade"
              label="适用年级">
            </el-table-column>
            <el-table-column
              prop="presentType"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="uploadTime"
              :formatter="_formatterUploadTime"
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
              prop="pushToIndex"
              :formatter="_formatterPushToIndex"
              label="首页推荐">
            </el-table-column>
            <el-table-column
              prop="fitGrade"
              :formatter="_formatterGrade"
              label="适用年级">
            </el-table-column>
            <el-table-column
              prop="videoVid"
              label="vid">
            </el-table-column>
            <el-table-column
              prop="uploadTime"
              :formatter="_formatterUploadTime"
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
              prop="pushToIndex"
              :formatter="_formatterPushToIndex"
              label="首页推荐">
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
              prop="uploadTime"
              :formatter="_formatterUploadTime"
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
        center
        :title="giftDialogTitle"
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
          <div class="my-line">
            <el-form-item label="剩余总量">
              <el-input-number size="medium" v-model="form.totalAmount" :min="0" :step="1" label="剩余总量"></el-input-number>
            </el-form-item>
            <el-form-item label="首页推荐">
              <el-switch
                :value="form.pushToIndex === 1"
                @input="_setPushIndex($event)">
              </el-switch>
            </el-form-item>
          </div>
          <div class="my-line" v-if="giftDialogType === 'real'">
            <el-form-item label="原价(￥)">
              <my-input-number size="medium" v-model="form.originalPrice" :min="1" :step="1" label="原价"></my-input-number>
            </el-form-item>
            <el-form-item label="包邮">
              <el-switch
                :value="form.postage === 1"
                @input="_setPostage($event)">
              </el-switch>
            </el-form-item>
          </div>
          <div class="my-line" v-if="giftDialogType === 'video'">
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
              <div class="hint" style="color:darkred;">封面图建议尺寸：100px * 100px</div>
            </el-form-item>
            <el-form-item label="适用年级" v-if="giftDialogType === 'doc' || giftDialogType === 'video'">
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
          <div class="my-line" v-if="giftDialogType === 'doc'">
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
              :before-upload="_beforeCoverUpload">
              <i class="el-icon-plus"></i>
            </my-upload>
            <div class="hint" style="color:darkred;">轮播图建议尺寸：375px * 300px</div>
          </el-form-item>
          <el-form-item label="商品介绍">
            <my-upload
              action="/service-system/setting/upload/file"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="_infoRemove"
              :data="uploadPicData"
              :limit="5"
              :file-list="infoList"
              :on-exceed="_lunboExceed"
              :on-success="_uploadInfoSuccess"
              :before-upload="_beforeCoverUpload">
              <i class="el-icon-plus"></i>
            </my-upload>
            <div class="hint" style="color:darkred;">介绍图建议宽度375px,长度无具体建议，最好比宽度长</div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
    <el-dialog :visible.sync="previewDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import config from '@/config.js'
import MyInputNumber from '@/components/input-number'
import MyUpload from '@/components/upload'
// import MyUploadPicCard from '@/components/my-upload-pic-card'
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
      giftDialogEdit: true,
      giftDialogType: undefined,
      previewDialogVisible: false,
      dialogImageUrl: '', // 预览图片地址
      uploadPicData: {
        type: 'cover'
      },
      uploadFileData: {
        type: 'file'
      },
      lunboList: [],
      infoList: [],
      fileList: [],
      formTitle: '',
      form: {
        id: undefined,
        name: '',
        type: undefined,
        coverPicUrl: '',
        InfoPicUrlListFormat: [],
        fileUrl: '',
        videoVid: '',
        videoDuration: '',
        fitGrade: undefined,
        totalAmount: 0,
        price: 0,
        originalPrice: 0,
        infoFormat: [],
        pushToIndex: 0,
        postage: 1,
        fileKey: ''
      }
    }
  },
  computed: {
    ...mapState(['loading']),
    giftDialogTitle () {
      let title = this.giftDialogEdit ? '编辑' : '新增'
      if (this.giftDialogType === 'doc') {
        title += '文档礼品'
      } else if (this.giftDialogType === 'video') {
        title += '视频礼品'
      } else {
        title += '实物礼品'
      }
      return title
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
    },
    giftDialogVisible (v) {
      if (!v) {
        this._clearForm()
      }
    }
  },
  methods: {
    async _submit () {
      // this.form.infoPicUrlList = this.form.infoPicUrlList.join(',')
      const result = await this.api.runMathMp[this.giftDialogEdit ? 'updateGift' : 'addGift'](this.form)
      console.log('submit', result)
      this.$message({
        type: 'success',
        message: this.giftDialogEdit ? '修改成功' : '新增成功'
      })
      this._fetchGifts()
      console.log('修改礼物订单结果', result)
      this.giftDialogVisible = false
    },
    _formatterPushToIndex (row, column, cellValue, index) {
      return cellValue === 1 ? '是' : '否'
    },
    _formatterGrade (row, column, cellValue, index) {
      switch (cellValue) {
        case 0:
          return '一年级'
        case 1:
          return '二年级'
        case 2:
          return '三年级'
        case 3:
          return '四年级'
        case 4:
          return '五年级'
        case 5:
          return '六年级'
        case 6:
          return '初一'
        case 7:
          return '初二'
        case 8:
          return '初三'
        case 9:
          return '高一'
        case 10:
          return '高二'
        case 11:
          return '高三'
        default:
          return ''
      }
    },
    _formatterUploadTime (row, column, cellValue, index) {
      return this.utils.formatTime(new Date(cellValue))
    },
    _add (command) {
      this.giftDialogEdit = false
      this.giftDialogType = command
      this.form.type = command === 'real' ? 2 : (command === 'doc' ? 0 : 1)
      this.giftDialogVisible = true
    },
    _clearForm () { // 为了消除轮播图动画
      console.log('清空form')
      this.form = {
        id: undefined,
        name: '',
        type: undefined,
        coverPicUrl: '',
        InfoPicUrlListFormat: [],
        fileUrl: '',
        videoVid: '',
        videoDuration: '',
        fitGrade: undefined,
        totalAmount: 0,
        price: 0,
        originalPrice: 0,
        infoFormat: [],
        pushToIndex: 0,
        postage: 1,
        fileKey: ''
      }
      this.lunboList = []
      this.infoList = []
      this.fileList = []
    },
    _initLunboList () {
      let result = []
      for (let i = 0; i < this.form.InfoPicUrlListFormat.length; i++) {
        let name = `轮播图${i + 1}`
        let url = this.form.InfoPicUrlListFormat[i]
        result.push({
          name,
          url
        })
      }
      this.lunboList = result
    },
    _initInfoList () {
      let result = []
      for (let i = 0; i < this.form.infoFormat.length; i++) {
        let name = `介绍图${i + 1}`
        let url = this.form.infoFormat[i]
        result.push({
          name,
          url
        })
      }
      this.infoList = result
    },
    _initFileList () {
      this.fileList = this.form.fileUrl ? [{
        name: '文件',
        url: this.form.fileUrl
      }] : []
    },
    _editorChange (e) {
      // console.log(e)
      this.form.info = e
    },
    _edit (e) {
      console.log(e)
      this.giftDialogEdit = true
      this.form = {...e}
      this._initLunboList()
      this._initInfoList()
      if (this.form.type === 0) {
        this._initFileList()
        this.giftDialogType = 'doc'
      } else if (this.form.type === 1) {
        this.giftDialogType = 'video'
      } else {
        this.giftDialogType = 'real'
      }
      this.giftDialogVisible = true
    },
    _setPostage (e) {
      // console.log('setPostage', e)
      this.form.postage = e ? 1 : 0
    },
    _setPushIndex (e) {
      this.form.pushToIndex = e ? 1 : 0
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
    _lunboExceed (files, fileList) {
      this.$message.warning(`轮播图最多5张!`)
    },
    _beforeLunboUpload (file) { // 上传轮播图前
      return true
    },
    _uploadLunboSuccess (res, file) { // 上传轮播图成功
      console.log('轮播图上传成功', res, file)
      let url = res.data[0]
      this.form.InfoPicUrlListFormat = [
        ...this.form.InfoPicUrlListFormat,
        url
      ]
    },
    _lunboRemove (file, fileList) {
      let result = []
      for (let i = 0; i < fileList.length; i++) {
        let url = fileList[i].url
        result.push(url)
      }
      this.form.InfoPicUrlListFormat = result
    },
    _uploadInfoSuccess (res, file) {
      let url = res.data[0]
      this.form.infoFormat = [
        ...this.form.infoFormat,
        url
      ]
    },
    _infoRemove (file, fileList) {
      let result = []
      for (let i = 0; i < fileList.length; i++) {
        let url = fileList[i].url
        result.push(url)
      }
      this.form.infoFormat = result
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
