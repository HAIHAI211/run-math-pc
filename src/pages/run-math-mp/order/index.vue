<template>
  <div class="page order-page">
    <el-card class="rule-card">
      <el-tabs v-model="activeName">
        <el-tab-pane label="文档订单" name="doc">
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
            v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="index"
              label="序号">
            </el-table-column>
            <el-table-column
              prop="ordersNo"
              label="订单号">
            </el-table-column>
            <el-table-column
              prop="presentName"
              label="礼品名">
            </el-table-column>
            <el-table-column
              prop="contactsName"
              label="联系人">
            </el-table-column>
            <el-table-column
              prop="telNo"
              label="联系电话">
            </el-table-column>
            <el-table-column
              prop="addressStr"
              label="邮寄地址">
            </el-table-column>
            <el-table-column
              prop="changeTimeStr"
              label="兑换时间">
            </el-table-column>
            <el-table-column
              prop="statusStr"
              label="发货状态">
            </el-table-column>
            <el-table-column
              prop="waybillNo"
              label="运单号">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
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
        await this._fetchOrders()
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
    _submit () {
      const result = this.api.runMathMp.updateGift(this.form)
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
      this.lunboList = []
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
    _editorChange (e) {
      // console.log(e)
      this.form.info = e
    },
    _edit (e) {
      console.log(e)
      this.form = {...e}
      this._initLunboList()
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
      })
    },
    _uploadCoverSuccess (res, file) { // 上传封面图成功
      this.form.coverPicUrl = URL.createObjectURL(file.raw)
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
    _lunboRemove (file, fileList) {
      // console.log('删除轮播 file', file)
      // console.log('删除轮播 fileList', fileList)
      let result = []
      for (let i = 0; i < fileList.length; i++) {
        let url = fileList[i].url
        result.push(url)
      }
      this.form.infoPicUrlList = result
    },
    _lunboExceed (files, fileList) {
      this.$message.warning(`轮播图最多5张!`)
    },
    _beforeLunboUpload (file) { // 上传轮播图前
      return true
    },
    _uploadLunboSuccess (res, file) { // 上传轮播图成功
      console.log('轮播图上传成功', res, file)
      let url = URL.createObjectURL(file.raw)
      this.form.infoPicUrlList = [
        ...this.form.infoPicUrlList,
        url
      ]
    },
    _uploadFileSuccess (res, file) { // 上传文件成功
      this.form.fileUrl = URL.createObjectURL(file.raw)
    },
    _fileRemove (file, fileList) {
      console.log('文件删除', file)
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
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    _filterResult (result) {
      for (let i = 0; i < result.data.length; i++) {
        let index = (i + 1) + config.pageSize * (this.pageNum - 1)
        let item = result.data[i]
        item.index = index
        item.changeTimeStr = this.utils.formatTime(new Date(item.changeTime))
        if (this.activeName === 'real') {
          item.statusStr = item.status === 0 ? '待发货' : '已发货'
          item.addressStr = item.addressArea + item.address
        }
      }
    },
    async _fetchOrders () {
      let apiName = ''
      if (this.activeName === 'doc') {
        apiName = 'getDocOrders'
      } else if (this.activeName === 'video') {
        apiName = 'getVideoOrders'
      } else {
        apiName = 'getRealOrders'
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
      this._fetchOrders()
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
