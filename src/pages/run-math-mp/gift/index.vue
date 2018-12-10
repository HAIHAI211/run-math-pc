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
    </el-card>
  </div>
</template>
<script>
import config from '@/config.js'
export default {
  data () {
    return {
      activeName: 'doc',
      pageCount: 1,
      pageNum: 1,
      tableData: []
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
    _edit (e) {
      console.log(e)
    },
    _delete (e) {
      console.log(e)
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
</style>
