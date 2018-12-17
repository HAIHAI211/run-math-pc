<template>
  <my-upload
    action="/service-system/setting/upload/file"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="_remove"
    :data="uploadPicData"
    :limit="5"
    :file-list="selfList"
    :on-exceed="_exceed"
    :on-success="_uploadSuccess"
    :before-upload="_beforeUpload">
    <i class="el-icon-plus"></i>
  </my-upload>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      uploadPicData: {
        type: 'cover'
      },
      selfList: []
    }
  },
  watch: {
    list (v) {
      this._initSelfList()
    },
    selfList (v) {
      // this.$emit('update:list', v)
    }
  },
  methods: {
    _beforeUpload (file) {
      const isRightType = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isRightType) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isRightType && isLt2M
    },
    _uploadSuccess (res, file) {
      console.log('轮播图上传成功', res, file)
      let url = res.data
      let result = [
        ...this.selfList,
        url
      ]
      this.$emit('update:list', result)
    },
    _remove (file, fileList) {
      let result = []
      for (let i = 0; i < fileList.length; i++) {
        let url = fileList[i].url
        result.push(url)
      }
      this.$emit('update:list', result)
    },
    _exceed (files, fileList) {
      this.$message.warning(`最多5张!`)
    },
    _initSelfList () {
      console.log('初始化selfList')
      let result = []
      for (let i = 0; i < this.list.length; i++) {
        let name = `图${i + 1}`
        let url = this.form.InfoPicUrlListFormat[i]
        result.push({
          name,
          url
        })
      }
      this.selfList = result
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/assets/style/variable.styl"
/*  .avatar-uploader /deep/ .el-upload {
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
  }*/
</style>
