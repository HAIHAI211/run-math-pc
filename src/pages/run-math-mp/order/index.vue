<template>
  <div class="page order-page">
    <el-card class="rule-card">
      <el-tabs v-model="activeName">
        <el-tab-pane label="文档订单" name="doc">
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
              prop="nickName"
              label="下单用户">
            </el-table-column>
            <el-table-column
              prop="presentName"
              label="礼品名">
            </el-table-column>
            <el-table-column
              prop="changeTimeStr"
              label="兑换时间">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="视频订单" name="video">
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
              prop="nickName"
              label="下单用户">
            </el-table-column>
            <el-table-column
              prop="presentName"
              label="礼品名">
            </el-table-column>
            <el-table-column
              prop="changeTimeStr"
              label="兑换时间">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="实物订单" name="real">
          <el-dropdown trigger="click" slot="label" @command="_selectStatus">
            <span class="el-dropdown-link">
              {{realTitle}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="all">全部</el-dropdown-item>
              <el-dropdown-item command="waitSend">待发货</el-dropdown-item>
              <el-dropdown-item command="hasSend">已发货</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
              prop="nickName"
              label="下单用户">
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
        title="编辑订单"
        :visible.sync="giftDialogVisible">
        <!--<span>这是一段信息</span>-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="giftDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="_submit">确 定</el-button>
        </span>
        <el-form ref="form" :model="form" label-width="100px" label-position="right">
          <el-form-item label="已发货">
            <el-switch
              :value="form.status === 1"
              @input="_setStatus($event)">
            </el-switch>
          </el-form-item>
          <el-form-item label="运单号" v-if="form.status === 1">
            <el-input v-model="form.waybillNo" style="width:200px;"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" style="width:400px;"></el-input>
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
      dialogImageUrl: '', // 预览图片地址
      realTitle: '实物订单(全部)',
      form: {
        id: undefined,
        status: undefined,
        waybillNo: undefined,
        remark: undefined
      }
    }
  },
  computed: {
    ...mapState(['loading'])
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
    giftDialogVisible: {
      handler (v) {
        if (!v) {
          this.form = {
            id: undefined,
            status: undefined,
            waybillNo: undefined,
            remark: undefined
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    _submit () {
      const result = this.api.runMathMp.updateOrder(this.form)
      console.log('修改订单结果', result)
      this.$message({
        type: 'success',
        message: '修改成功'
      })
      this._fetchOrders()
      this.giftDialogVisible = false
    },
    _selectStatus (command) {
      this.pageNum = 1
      if (command === 'all') {
        this.realTitle = '实物订单(全部)'
        this._fetchOrders()
      } else if (command === 'waitSend') {
        this.realTitle = '实物订单(待发货)'
        this._fetchOrders(0)
      } else {
        this.realTitle = '实物订单(已发货)'
        this._fetchOrders(1)
      }
    },
    _edit (e) {
      console.log(e)
      this.form = {...e}
      this.giftDialogVisible = true
    },
    _setStatus (e) {
      console.log('setStatus', e)
      this.form.status = e ? 1 : 0
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
    async _fetchOrders (status) {
      let apiName = ''
      if (this.activeName === 'doc') {
        apiName = 'getDocOrders'
      } else if (this.activeName === 'video') {
        apiName = 'getVideoOrders'
      } else {
        apiName = 'getRealOrders'
      }
      const result = await this.api.runMathMp[apiName](this.pageNum, status)
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
</style>
