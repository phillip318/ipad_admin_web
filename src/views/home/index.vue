<template>
  <div class="app-container">
    <AddMuban v-if="visible" :visible.sync="visible" :id="id" @onSubmit="onSubmit"></AddMuban>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
    </el-card>
    <div style="margin-top: 25px">
      <el-form :inline="true" :model="formData" size="small" label-width="140px" ref="formData">
        <el-form-item label="模板名称：" prop="userName">
          <el-input placeholder="请输入模板名称" v-model="formData.userName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" icon="el-icon-search" type="primary">查询</el-button>
          <el-button @click="reset" icon="el-icon-refresh-right" type="primary">重置</el-button>
          <el-button @click="add" icon="el-icon-plus" type="primary">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span style="margin-right:30px">数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="orderTable"
                stripe
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="序号" width="80" type="index" align="center"></el-table-column>
        <el-table-column label="模板名称" prop="tempName" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="createDate" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            {{scope.row.createDate | filterDateToStr}}
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="status" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="checkDetail(scope.$index, scope.row)">查看</el-button>
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
</template>
<script>
import { FETCH_MUBAN_LIST } from '@/api'
import AddMuban from './component/addMuban'
export default {
  name: 'Home',
  components: {
    AddMuban
  },
  data () {
    return {
      formData: {
        time: null,
        userName: null,
      },
      list: [],
      listLoading: false,
      total: 12,
      visible: false,  // 查看详情
      id: null,
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const { code, data } = await this.$http.fetch(FETCH_MUBAN_LIST, this.listQuery)
      if (code === 200) {
        this.list = data.list
        this.total = data.total
      }
    },
    checkDetail (index, row) {
      this.visible = true
      this.id = row.id
    },  
    onSubmit () {
      this.handleSizeChange(10)
    },
    add () {
      this.visible = true
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

</style>