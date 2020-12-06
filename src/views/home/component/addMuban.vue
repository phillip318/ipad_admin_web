<template>
  <el-dialog title="添加模板" :visible="visible" @close="closeHandle" width="1400px">
    <div class="addMuban-container">
      <el-form :model="formData" ref="bannerFrom" label-width="150px" size="small" :rules="rules">
        <el-form-item label="知情同意书标题：" prop="types">
          <el-input placeholder="请输入知情同意书标题" v-model="formData.tempName"></el-input>
        </el-form-item>
        <el-form-item label="疫苗种类：" prop="vaccinationTypes">
          <el-input placeholder="请输入疫苗种类，如有多项请用逗号分割" v-model="formData.vaccinationTypes"></el-input>
        </el-form-item>
        <el-form-item label="模板内容："
                      prop="context">
          <quill-editor v-model="formData.tempContent" class="ql-editor" ref="quillEditor">
          </quill-editor>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button @click="$emit('update:visible', false)">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { ADD_MUBAN_URL } from '@/api'
export default {
  name: 'AddMuban',
  props: ['visible'],
  data () {
    return {
      rules: {},
      formData: {
        tempName: '',
        vaccinationTypes: '',
        tempContent: ''
      }
    }
  },
  methods: {
    async submit () {
      const { code, data } = await this.$http.postForm(ADD_MUBAN_URL, this.formData)
      console.log(code ,data)
    },
    closeHandle () {
      this.$emit('update:visible', false)
    },
  }
}
</script>
<style lang="less" scoped>
.addMuban-container {
  
  padding: 0 100px 0 50px;
  .ql-editor {
    width: 1000px;
    height: 600px;
  }
  .footer {
    text-align: center;
  }
}
</style>