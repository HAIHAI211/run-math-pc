<template>
  <jk-statement :cols="cols"/>
</template>
<script>
import JkStatement from '@/components/jk-statement'
export default {
  components: {
    JkStatement
  },
  data () {
    return {
      cols: [
        {
          label: '日期',
          value: 'date'
        },
        {
          label: '姓名',
          value: 'name'
        },
        {
          label: '地址',
          value: 'address'
        }
      ]
    }
  }
}
</script>
<style>
</style>
