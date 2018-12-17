<template>
  <div class="jk-statement">
    <div class="tabs">
      <div :class="['tab-item', {'active': activeTab === tabIndex}]"
           v-for="(tab, tabIndex) in tabs" :key="tabIndex" @click="activeTab = tabIndex">
        {{ tab.label }}
        <div class="line" v-if="activeTab === tabIndex"></div>
      </div>
    </div>
    <div class="search-bar">
    </div>
    <div class="main">
    </div>
  </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      tabs: [
        {
          label: '收据明细'
        },
        {
          label: '课程收费'
        },
        {
          label: '材料费用'
        },
        {
          label: '退费总额'
        }
      ],
      activeTab: 0
    }
  }
}
</script>
<style lang="stylus" scoped>
  .jk-statement{
    background #f3f8ff
    padding 0 14px
    .tabs{
      height 66px
      background #fff
      margin-bottom 17px
      border:1px solid rgba(227,231,241,1);
      border-top none;
      display flex
      align-items flex-end
      padding-left: 20px
      .tab-item{
        cursor pointer
        width 102px
        height 40px
        display flex
        justify-content center
        align-items center
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(43,54,78,1);
        position relative;
        &.active{
          color:#4074E1;
          background: #f3f8ff
          border:1px solid rgba(227,231,241,1)
          border-bottom: none
          border-top-left-radius 4px
          border-top-right-radius 4px
        }
        .line{
          position absolute;
          left 0;
          bottom -1px;
          width 100%
          height 2px;
          background #f3f8ff;
        }
      }
    }
    .search-bar{
      height 140px
      background #fff
    }
    .main{
      height 654px
    }
  }
</style>
