<template>
  <div class="page rule-page">
    <el-card class="rule-card">
      <div slot="header">
        <span>规则设置</span>
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
        <!--<el-form-item label="活动区域">-->
          <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
            <!--<el-option label="区域一" value="shanghai"></el-option>-->
            <!--<el-option label="区域二" value="beijing"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="活动时间">-->
          <!--<el-col :span="11">-->
            <!--<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>-->
          <!--</el-col>-->
          <!--<el-col class="line" :span="2">-</el-col>-->
          <!--<el-col :span="11">-->
            <!--<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>-->
          <!--</el-col>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="即时配送">-->
          <!--<el-switch v-model="form.delivery"></el-switch>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="活动性质">-->
          <!--<el-checkbox-group v-model="form.type">-->
            <!--<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>-->
            <!--<el-checkbox label="地推活动" name="type"></el-checkbox>-->
            <!--<el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
            <!--<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
          <!--</el-checkbox-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="特殊资源">-->
          <!--<el-radio-group v-model="form.resource">-->
            <!--<el-radio label="线上品牌商赞助"></el-radio>-->
            <!--<el-radio label="线下场地免费"></el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="活动形式">-->
          <!--<el-input type="textarea" v-model="form.desc"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--<el-button type="primary" @click="onSubmit">立即创建</el-button>-->
          <!--<el-button>取消</el-button>-->
        <!--</el-form-item>-->
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
        shareCoin: 100,
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    _inputNumberChange (v) {
      console.log('inputNumber', v)
    },
    onSubmit () {
      console.log('submit!')
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
