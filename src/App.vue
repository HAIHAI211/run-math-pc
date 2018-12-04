<template>
  <el-container id="app">
    <el-header class="top-nav">
      <span class="title">极客社群营销平台</span>
    </el-header>
    <el-container>
      <el-aside class="left-side">
        <el-menu
          default-active="rule"
          class="menu"
          :router="true"
          @open="_openMenu"
          @close="_closeMenu"
          text-color="#fff"
          background-color="#545c64"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <span>小程序</span>
            </template>
            <!--<el-menu-item-group>-->
              <!--<template slot="title">分组一</template>-->
              <!--<el-menu-item index="1-1">选项1</el-menu-item>-->
              <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
            <!--</el-menu-item-group>-->
            <!--<el-menu-item-group title="分组2">-->
              <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
            <!--</el-menu-item-group>-->
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
  methods: {
    _openMenu () {},
    _closeMenu () {}
  }
}
</script>
<style lang="stylus" scoped>
@import "~@/assets/style/variable.styl"
#app {
  .top-nav{
    /*border-bottom 1px solid #eee*/
    background $main-color
    display flex
    align-items center
    .title{
      color #fff
      font-size 23px
      font-weight 300
      letter-spacing 1px
      transform scale(1, 1.25)
    }
  }
  .left-side{
    background $main-color
    .menu{
      height 100%
      border-right none
    }
  }
  .main{
    background $main-color
  }
}
</style>
