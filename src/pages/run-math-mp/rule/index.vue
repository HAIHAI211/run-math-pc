<template>
  <div class="page rule-page">
    <el-card class="rule-card">
      <div slot="header">
        <span>规则设置</span>
        <span class="submit-state">{{updateStateMsg}}</span>
      </div>
      <el-form ref="form" :model="form" label-width="170px" class="form">
        <el-form-item label="数学币汇率：">
          <el-input-number size="medium" v-model="form.step" @change="_inputNumberChange" :min="1" :max="10000" :step="100" label="多少步数"></el-input-number>
          <span class="input-number-suffix">步</span>
          <span class="exchange">可兑换</span>
          <el-input-number size="medium" v-model="form.coin" @change="_inputNumberChange" :min="1" label="多少数学币"></el-input-number>
          <span class="input-number-suffix">数学币</span>
        </el-form-item>
        <el-form-item label="兑换步数上限：">
          <el-input-number size="medium" v-model="form.stepLimit" @change="_inputNumberChange" :min="1" :max="100000" :step="100" label="兑换上限"></el-input-number>
          <span class="input-number-suffix">步</span>
          <span class="rule-hint">(所有步数当日24:00清空)</span>
        </el-form-item>
        <el-form-item label="分享次数上限：">
          <el-input-number size="medium" v-model="form.shareLimit" @change="_inputNumberChange" :min="1" :max="200" :step="1" label="分享次数"></el-input-number>
          <span class="input-number-suffix">次/日</span>
        </el-form-item>
        <el-form-item label="分享奖励：">
          <el-input-number size="medium" v-model="form.shareCoin" @change="_inputNumberChange" :min="1" :max="100000" :step="1" label="分享奖励"></el-input-number>
          <span class="input-number-suffix">数学币/次</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        step: 1000,
        coin: 1,
        stepLimit: 10000,
        shareLimit: 10,
        shareCoin: 100
      },
      lastTime: 0,
      updateState: 0
    }
  },
  computed: {
    updateStateMsg () {
      switch (this.updateState) {
        case 0:
          return '初始状态'
        case 1:
          return '开始修改'
        case 2:
          return '修改成功'
      }
    }
  },
  watch: {
    form: {
      handler (newV, oldV) {
        // let nowTime = Date.now()
        // if (this.updateState === 0 || this.updateState === 2) {
        //   this.lastTime = nowTime
        // }
        // console.log('nowTime', nowTime)
        // console.log('lastTime', this.lastTime)
        // console.log('gapTime', nowTime - this.lastTime > 1000)
        // if (nowTime - this.lastTime > 1000) { // 如果超过500ms，就认为一次更新结束，自动上传数据
        //   this.updateState = 2
        // } else {
        //   this.updateState = 1
        // }
        // this.lastTime = nowTime
        // console.log(newV)
      },
      deep: true
    }
  },
  methods: {
    _inputNumberChange (v) {
      // console.log('inputNumber', v)
    },
    onSubmit () {
      // console.log('submit!')
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/assets/style/variable.styl"
  .rule-page{
    .form{
      .exchange{
        font-size 18px
        padding 0 30px
        color $active-color
      }
      .input-number-suffix{
        font-size 16px
      }
      .rule-hint{
        color #888
        padding-left 15px
        font-size 15px
      }
    }
  }
</style>
