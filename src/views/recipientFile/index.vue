<template>
  <div class="recipientFile-container">
    <div class="app-container">
      <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
        </div>
        <div style="margin-top: 25px">
          <el-form :inline="true" :model="formData" size="small" label-width="140px" ref="formData">
            <el-form-item label="建档时间：" prop="time">
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
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span style="margin-right:30px">数据列表</span>
      </el-card>
      <div class="table-container">
        <el-table ref="orderTable" stripe :data="list" style="width: 100%;" v-loading="listLoading" border>
          <el-table-column label="序号" width="80" type="index" align="center"></el-table-column>
          <el-table-column label="受种人姓名" prop="userName" align="center"></el-table-column>
          <el-table-column label="受种人方联络人" prop="contactName" align="center"></el-table-column>
          <el-table-column label="联络电话" prop="contactPhone" align="center"></el-table-column>
          <el-table-column label="联络人亲属关系" prop="contactType" align="center"></el-table-column>
          <el-table-column label="出生日期" prop="birthDate" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              {{scope.row.birthDate | filterDateByCustom('date')}}
            </template>
          </el-table-column>
          <el-table-column label="建档时间" prop="createDate" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              {{scope.row.createDate | filterDateByCustom('time')}}
            </template>
          </el-table-column>
          <el-table-column label="建档地点" prop="hospitalSite" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="checkDetail(scope.row)">查看受种记录</el-button>
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
    </div>
    <recipientVaccin  :visible.sync="checkVisible" v-if="checkVisible" v-bind="obj"/>
  </div>
</template>
<script>
import recipientVaccin from './component/recipientVaccin'
import { FETCH_VACCIN_LIST } from '@/api';
export default {
  name: 'RecipientFile',
  components: {
    recipientVaccin,
  },
  data () {
    return {
      checkVisible: false,  // 查看受种记录 model
      listLoading: false,
      list: [],
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
      formData: {
        userName: null,
        time: null,
      },
      obj: {}
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    add () {

    },
    async loadData () {
      const { code, data } = await this.$http.fetch(FETCH_VACCIN_LIST, this.listQuery)
      if (code === 200) {
        this.list = data.list
        this.total = data.total
      }
      console.log(this.list)
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
    checkDetail (row) {
      this.obj = row
      this.checkVisible = true
    }
  },
}
</script>
<style lang="less" scoped>

</style>