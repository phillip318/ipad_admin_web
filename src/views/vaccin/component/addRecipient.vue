<template>
  <el-dialog title="添加受种人档案" :visible="visible" @close="closeHandle" width="600px">
    <div class="addRecipientFile-container">
      <el-form :model="vaccinationDetail" label-width="150px" size="medium">
        <el-form-item label="接种疫苗模板：">
          <el-select v-model="vaccinationDetail.tempId" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.tempName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :model="vaccinationUser" ref="recipientFrom" label-width="150px" size="medium" :rules="rules">
        
        <el-form-item label="受种人姓名：" prop="userName">
          <el-input placeholder="请输入受种人姓名" v-model="vaccinationUser.userName"></el-input>
        </el-form-item>
        <el-form-item label="受种人出生日期：" prop="birthDate">
          <el-date-picker
            v-model="vaccinationUser.birthDate"
            type="date"
            ref="endTime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="受种方联络人：" prop="contactName">
          <el-input placeholder="请输入联络人" v-model="vaccinationUser.contactName"></el-input>
        </el-form-item>
        <el-form-item label="联络电话：" prop="contactPhone">
          <el-input placeholder="请输入联络电话" v-model="vaccinationUser.contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="亲属关系：" prop="contactType">
          <el-input placeholder="请输入与受种人关系" v-model="vaccinationUser.contactType"></el-input>
        </el-form-item>
      </el-form>
      <div class="flex-center footDiv">
        <el-button @click="closeHandle">取消</el-button>
        <el-button type="primary" @click="save">提交</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { FETCH_MUBAN_LIST, ADD_RECIPIENT_FILE } from '@/api'
export default {
  name: 'AddRecipient',
  props: ['visible'],
  data (){
    return {
      options: [],
      vaccinationDetail: {
        tempId: null,         // 疫苗模板ID
        vaccinationDate: new Date()
      },
      vaccinationUser: {
        userName: null,
        birthDate: new Date(),
        contactName: null,
        contactPhone: null,
        contactType: null, 
      },
      rules: {
        tempId: [{ required: true, message: '请选择模板', trigger: 'blur' }],
        birthday: [{ required: true, message: '请输入出生日期', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const { code, data } = await this.$http.fetch(FETCH_MUBAN_LIST, {  pageNum: 1, pageSize: 100 })
      if (code === 200) {
        this.options = data.list
      }
    },
    closeHandle () {
      this.$emit('update:visible', false)
    },
    save () {
      this.$refs['recipientFrom'].validate(async (valid) => {
        if (valid) {
          const { code } = await this.$http.postForm(ADD_RECIPIENT_FILE, { vaccinationDetail: this.vaccinationDetail, vaccinationUser: this.vaccinationUser })
          if (code === 200) {
            this.$message({ type: 'success', message: '档案新建成功' })
            this.closeHandle()
            this.$emit('reload')
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.addRecipientFile-container {
  width: 370px;
  margin: 0 auto;
  .footDiv {
    margin: 40px 0 0 0 ;
  }
}
</style>