<template>
  <el-container id="app">
    <el-header class="top-nav">
      <span class="title">极客<span class="title-suffix">社群营销平台</span></span>
    </el-header>
    <el-container style="margin-top:5px;">
      <el-aside class="left-side">
        <el-menu
          :default-active="defaultActive"
          class="menu"
          :router="true"
          @open="_openMenu"
          @close="_closeMenu"
          text-color="#000"
          background-color="#fff"
          active-text-color="#20b2aa">
          <el-submenu index="1">
            <template slot="title">
              <span>小程序</span>
            </template>
            <el-submenu index="run-math-mp">
              <template slot="title">步好玩</template>
              <el-menu-item index="rule">规则</el-menu-item>
              <el-menu-item index="gift">礼品</el-menu-item>
              <el-menu-item index="adv">广告</el-menu-item>
              <el-menu-item index="order">订单</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>公众号</span>
            </template>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main"><router-view/></el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      defaultActive: ''
    }
  },
  methods: {
    _openMenu () {},
    _closeMenu () {}
  },
  watch: {
    '$route': {
      handler (to, from) {
        console.log(`路由从`, from, '到', to.name)
        switch (to.name) {
          case 'run-math-mp-rule':
            this.defaultActive = 'rule'
            break
          case 'run-math-mp-gift':
            this.defaultActive = 'gift'
            break
          case 'run-math-mp-adv':
            this.defaultActive = 'adv'
            break
          case 'run-math-mp-order':
            this.defaultActive = 'order'
            break
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="stylus">
@import "~@/assets/style/variable.styl"
#app {
  background $main-color
  font-weight 400
  .top-nav{
    /*border-bottom 1px solid #eee*/
    /*background $main-color*/
    background #fff
/*    border-bottom 1px solid #ccc*/
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1), 0 0 0 1px hsla(0,0%,7%,.1);
    // -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    // box-shadow: 0 2px 12px 0 rgba(0,0,0,.9);
    display flex
    justify-content center
    align-items center
    .title{
      color $active-color
      font-weight 300
      font-size 20px
      letter-spacing 1px
      transform scale(1,1)
      .title-suffix{
        color #000
      }
    }
  }
  .left-side{
    background #fff
    .menu{
      height 100%
      border-right none
    }
  }
  .main{
    // background #f5f5f5
  }
}
</style>
