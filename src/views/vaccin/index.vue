<template>
  <div class="app-container">
    <VaccinDetail v-if="visible" :visible.sync="visible" :id="id" @closeHandle="closeHandle"></VaccinDetail>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div style="margin-top: 25px">
        <el-form :inline="true" :model="formData" size="small" label-width="140px" ref="formData">
          <el-form-item label="接种时间：" prop="time">
            <el-date-picker
              v-model="formData.time"
              type="datetimerange"
              :default-time="['00:00:00', '23:59:59']"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="受种人姓名：" prop="userName">
            <el-input placeholder="请输入受种人姓名" v-model="formData.userName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="search" icon="el-icon-search" type="primary">查询</el-button>
            <el-button @click="reset" icon="el-icon-refresh-right" type="primary">重置</el-button>
            <el-button @click="addVisible = true" icon="el-icon-plus" type="primary">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span style="margin-right:30px">数据列表</span>
    </el-card>
    <div class="line flex-col">
      <span>当前受种人姓名：{{ obj.userName }}</span>
      <span>当前接种模板：{{ obj.tempName }}</span>
    </div>
    <div>
      <el-table ref="orderTable"
                stripe
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="序号" width="80" type="index" align="center"></el-table-column>
        <el-table-column label="接种时间" prop="vaccinationDate" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            {{scope.row.vaccinationDate | filterDateByCustom('time')}}
          </template>
        </el-table-column>
        <el-table-column label="接种人姓名" prop="userName" align="center"></el-table-column>
        <el-table-column label="接种疫苗" prop="tempName" align="center"></el-table-column>
        <el-table-column label="接种方确认信息" prop="userConfirmFilePath" align="center">
          <template slot-scope="scope"><img style="height: 60px" :src="scope.row.userConfirmFilePath"></template>
        </el-table-column>
        <el-table-column label="出生年月" prop="birthDate" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            {{scope.row.birthDate | filterDateByCustom('time')}}
          </template>
        </el-table-column>
        <el-table-column label="受种人方联络人" prop="contactName" align="center"></el-table-column>
          <el-table-column label="联络电话" prop="contactPhone" align="center"></el-table-column>
          <el-table-column label="联络人亲属关系" prop="contactType" align="center"></el-table-column>
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
    <AddRecipient :visible.sync="addVisible" v-if="addVisible" @reload="handleSizeChange(10)"/>
  </div>
</template>
<script>
import AddRecipient from './component/addRecipient'
import VaccinDetail from './component/detail'
import { FETCH_VACCIN_LIST, FETCH_ZHILING_URL } from '@/api'
export default {
  name: 'Vaccin',
  components: {
    VaccinDetail,
    AddRecipient,
  },
  data () {
    return {
      id: null,
      addVisible: false,   // 添加建档 model
      formData: {
        time: null,
        userName: null,
      },
      list: [],
      listLoading: false,
      total: 0,
      visible: false,  // 查看详情
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      obj: {}
    }
  },
  created () {
    this.loadData()
    this.fetchZhiling()
  },
  methods: {
    async loadData () {
      const { code, data } = await this.$http.fetch(FETCH_VACCIN_LIST, this.listQuery)
      if (code === 200) {
        this.list = data.list
        this.total = data.total
      }
    },
    async fetchZhiling () {
      const { code, data } = await this.$http.fetch(FETCH_ZHILING_URL)
      if (code === 200) {
        this.obj = data
      }
    },
    checkDetail (index, row) {
      this.id = row.id
      this.visible = true
    },
    closeHandle () {

    },
    search () {},
    reset () {
      this.$refs['formData'].resetFields()
      this.formData.startTime = null
      this.formData.endTime = null
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
.line {
  display: flex;
  color: red;
  height: 60px;
  span {
    margin: 0 40px 0 0;
  }
}
</style>