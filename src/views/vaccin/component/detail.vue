<template>
  <el-dialog title="接种详情" :visible="visible" @close="closeHandle">
    <div class="vaccinDetail-container">
      <div class="line">
        <span>接种日期：</span>
        <span>{{ detail.createDate }}</span>
      </div>
      <div class="line">
        <span>接种人姓名：</span>
        <span>{{ detail.userName }}</span>
      </div>
      <!-- <div class="line">
        <span>接种类型：</span>
        <span>甲型肝炎疫苗接种</span>
      </div> -->
      <div class="line">
        <span>接种疫苗：</span>
        <span>{{ detail.vaccinationType }}</span>
      </div>
      <div class="line">
        <span>出生年月：</span>
        <span>2020-12-03 17:00:35</span>
      </div>
      <div class="line">
        <span>接种前医师是否询问受种方健康状况：</span>
        <span>{{ detail.advisoryHealthStatus == 1 ? '是' : '否' }}</span>
      </div>
      <div class="line">
        <span>经医生检查无禁忌，是否同意接种：</span>
        <span>{{ detail.agreeStatus == 1 ? '同意' : '不同意' }}</span>
      </div>
      <div class="line noBorder">
        <span>接种方确认信息：</span>
      </div>
      <div class="line noBorder">
        <img :src="detail.userConfirmFilePath" alt="">
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { FETCH_VACCIN_DETAIL } from '@/api'
export default {
  name: 'VaccinDetail',
  props: ['visible', 'id'],
  data () {
    return {
      detail: {}
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const { code, data } = await this.$http.fetch(FETCH_VACCIN_DETAIL, { id: this.id })
      if (code === 200) {
        this.detail = data
      }
    },
    closeHandle () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="less" scoped>
.vaccinDetail-container {
  .line {
    display: flex;
    justify-content: space-between;
    width: 40%;
    margin: 0 auto;
    padding: 10px 0;
    border-bottom: 1px solid gray;
    >span:nth-of-type(1) {
      margin-right: 80px;
      min-width: 90px;
    }
    img {
    }
  }
  .noBorder {
    border: none !important;
  }
}
</style>