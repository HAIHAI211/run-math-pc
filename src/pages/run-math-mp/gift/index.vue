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
      <el-tabs v-model="activeName" @tab-click="handleClick">
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
        <el-tab-pane label="视频礼品" name="video">视频礼品</el-tab-pane>
        <el-tab-pane label="实物礼品" name="real">实物礼品</el-tab-pane>
      </el-tabs>
      <el-pagination
        background
        class="pagination"
        layout="prev, pager, next"
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
        await this._fetchGifts()
      },
      immediate: true
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
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
      if (this.activeName === 'doc') {
        const result = await this.api.runMathMp.getDocGifts(this.pageNum)
        console.log('pageCount', result.pageCount)
        this._addIndex(result)
        this.tableData = result.data
        this.pageCount = result.pageCount
        console.log(result)
      }
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
