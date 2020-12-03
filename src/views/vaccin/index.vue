<template>
  <div class="app-container">
    <VaccinDetail v-if="visible" :visible.sync="visible" @closeHandle="closeHandle"></VaccinDetail>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      </div>
      <div style="margin-top: 25px">
        <el-form :inline="true" :model="formData" size="small" label-width="140px" ref="formData">
          <el-form-item label="创建时间：" prop="time">
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
      <el-table ref="orderTable"
                stripe
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="序号" width="80" type="index" align="center"></el-table-column>
        <el-table-column label="接种时间" prop="vaccinTime" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            {{scope.row.vaccinTime | filterDateToStr}}
          </template>
        </el-table-column>
        <el-table-column label="接种人姓名" prop="vaccinName" align="center"></el-table-column>
        <el-table-column label="接种类型" prop="vaccinType" align="center"></el-table-column>
        <el-table-column label="接种疫苗" prop="vaccin" align="center"></el-table-column>
        <el-table-column label="接种方确认信息" prop="vaccinSign" align="center">
          <template slot-scope="scope"><img style="height: 60px" :src="scope.row.vaccinSign"></template>
        </el-table-column>
        <el-table-column label="出生年月" prop="vaccinBirthday" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            {{scope.row.vaccinBirthday | filterDateToStr}}
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
  </div>
</template>
<script>
import VaccinDetail from './component/detail'
export default {
  name: 'Vaccin',
  components: {
    VaccinDetail
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
      listQuery: {
        pageNum: 1,
        pageSize: 10
      },
    }
  },
  created () {
    this.list = [
      { vaccinTime: new Date(), vaccinName: '罗路', vaccinBirthday: new Date(), vaccinType: '甲型肝炎疫苗接种', vaccin: '甲肝灭活疫苗，自费(进口)', vaccinSign: 'http://shopstore.oss-cn-shenzhen.aliyuncs.com/mall/images/1591860548250timg.jpg'  },
      { vaccinTime: new Date(), vaccinName: '派大星', vaccinBirthday: new Date(), vaccinType: '甲型肝炎疫苗接种', vaccin: '甲肝灭活疫苗，自费(进口)', vaccinSign: 'https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=3740191206,641788041&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=8605bbae394dfce22f479444ef88c029'  },
      { vaccinTime: new Date(), vaccinName: '罗路', vaccinBirthday: new Date(), vaccinType: '甲型肝炎疫苗接种', vaccin: '甲肝灭活疫苗，自费(进口)', vaccinSign: 'http://shopstore.oss-cn-shenzhen.aliyuncs.com/mall/images/1591860548250timg.jpg'  },
      { vaccinTime: new Date(), vaccinName: '派大星', vaccinBirthday: new Date(), vaccinType: '甲型肝炎疫苗接种', vaccin: '甲肝灭活疫苗，自费(进口)', vaccinSign: 'https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=3740191206,641788041&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=8605bbae394dfce22f479444ef88c029'  },
      { vaccinTime: new Date(), vaccinName: '罗路', vaccinBirthday: new Date(), vaccinType: '甲型肝炎疫苗接种', vaccin: '甲肝灭活疫苗，自费(进口)', vaccinSign: 'http://shopstore.oss-cn-shenzhen.aliyuncs.com/mall/images/1591860548250timg.jpg'  },
      { vaccinTime: new Date(), vaccinName: '派大星', vaccinBirthday: new Date(), vaccinType: '甲型肝炎疫苗接种', vaccin: '甲肝灭活疫苗，自费(进口)', vaccinSign: 'https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=3740191206,641788041&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=8605bbae394dfce22f479444ef88c029'  },
      { vaccinTime: new Date(), vaccinName: '罗路', vaccinBirthday: new Date(), vaccinType: '甲型肝炎疫苗接种', vaccin: '甲肝灭活疫苗，自费(进口)', vaccinSign: 'http://shopstore.oss-cn-shenzhen.aliyuncs.com/mall/images/1591860548250timg.jpg'  },
      { vaccinTime: new Date(), vaccinName: '派大星', vaccinBirthday: new Date(), vaccinType: '甲型肝炎疫苗接种', vaccin: '甲肝灭活疫苗，自费(进口)', vaccinSign: 'https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=3740191206,641788041&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=8605bbae394dfce22f479444ef88c029'  },
      { vaccinTime: new Date(), vaccinName: '罗路', vaccinBirthday: new Date(), vaccinType: '甲型肝炎疫苗接种', vaccin: '甲肝灭活疫苗，自费(进口)', vaccinSign: 'http://shopstore.oss-cn-shenzhen.aliyuncs.com/mall/images/1591860548250timg.jpg'  },
      { vaccinTime: new Date(), vaccinName: '派大星', vaccinBirthday: new Date(), vaccinType: '甲型肝炎疫苗接种', vaccin: '甲肝灭活疫苗，自费(进口)', vaccinSign: 'https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=3740191206,641788041&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=8605bbae394dfce22f479444ef88c029'  },
      { vaccinTime: new Date(), vaccinName: '罗路', vaccinBirthday: new Date(), vaccinType: '甲型肝炎疫苗接种', vaccin: '甲肝灭活疫苗，自费(进口)', vaccinSign: 'http://shopstore.oss-cn-shenzhen.aliyuncs.com/mall/images/1591860548250timg.jpg'  },
      { vaccinTime: new Date(), vaccinName: '派大星', vaccinBirthday: new Date(), vaccinType: '甲型肝炎疫苗接种', vaccin: '甲肝灭活疫苗，自费(进口)', vaccinSign: 'https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=3740191206,641788041&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=8605bbae394dfce22f479444ef88c029'  },
    ]
  },
  methods: {
    checkDetail () {
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

</style>