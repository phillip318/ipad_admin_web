<template>
  <el-dialog title="受种人档案详情" :visible="visible" @close="closeHandle" width="1300px">
    <div class="recipientVaccin-container">
      <el-form :model="formData" ref="recipientVaccinFrom" :inline="true" label-width="150px" size="medium" :rules="rules">
        <el-form-item label="受种人姓名：" prop="name">
          <el-input placeholder="请输入受种人姓名" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="出生日期：" prop="name">
          <el-date-picker
            v-model="formData.birthday"
            type="date"
            ref="endTime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="建档地点：" prop="address">
          <el-input placeholder="请输入受种人姓名" disabled v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item label="建档时间：" prop="createDate">
          <el-date-picker
            v-model="formData.createDate"
            type="date"
            disabled
            ref="endTime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="table-container">
        <el-table ref="orderTable"
                  stripe
                  :data="list"
                  style="width: 100%;"
                  v-loading="listLoading" border>
          <el-table-column label="序号" width="80" type="index" align="center"></el-table-column>
          <el-table-column label="接种时间" prop="createDate" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              {{scope.row.createDate | filterDateByCustom('time')}}
            </template>
          </el-table-column>
          <el-table-column label="接种人姓名" prop="vaccinName" align="center"></el-table-column>
          <el-table-column label="接种疫苗" prop="vaccinationType" align="center"></el-table-column>
          <el-table-column label="接种方确认信息" prop="userConfirmFilePath" align="center">
            <template slot-scope="scope"><img style="height: 60px" :src="scope.row.userConfirmFilePath"></template>
          </el-table-column>
          <el-table-column label="出生年月" prop="vaccinBirthday" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              {{scope.row.vaccinBirthday | filterDateByCustom('time')}}
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="status" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="checkDetail(scope.$index, scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :current-page.sync="listQuery.pageNum"
            :page-size="listQuery.pageSize"
            :page-sizes="[5,10,15]"
            :total="total"></el-pagination>
        </div>
      </div>
      <div class="footDiv flex-center">
        <el-button @click="closeHandle">取消</el-button>
        <el-button type="primary" @click="save">更改</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { FETCH_VACCIN_LIST } from '@/api'
export default {
  name: 'RecipientVaccin',
  props: ['visible', 'birthday', 'name', 'address', 'createDate' ],
  data () {
    return {
      listLoading: false,
      list: [],
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      formData: {
        name: null,
        birthday: null,
        address: null,
        createDate: null
      },
      rules: {

      }
    }
  },
  created () {
    this.formData.name = this.name
    this.formData.birthday = this.birthday
    this.formData.address = this.address
    this.formData.createDate = this.createDate
    this.loadData()
  },
  methods: {
    async loadData () {
      const { code, data } = await this.$http.fetch(FETCH_VACCIN_LIST, this.listQuery)
      if (code === 200) {
        this.list = data.list
        this.total = data.total
      }
    },
    closeHandle () {
      this.$emit('update:visible', false)
    },
    save () {

    },
    handleSizeChange (arg) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = arg
      this.loadData()
    },
    handleCurrentChange (arg) {
      this.listQuery.pageNum = arg
      this.loadData()
    },
  }
}
</script>
<style lang="less" scoped>
.recipientVaccin-container {
  .el-form {
  }
}
.footDiv {
  margin: 40px auto 0;
  clear: both;
}
</style>