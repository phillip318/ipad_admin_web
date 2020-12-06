<template>
  <el-dialog title="接种详情" :visible="visible" @close="closeHandle">
    <div class="vaccinDetail-container">
      <div class="line">
        <span>接种日期：</span>
        <span>2020-12-03 16:58:09</span>
      </div>
      <div class="line">
        <span>接种人姓名：</span>
        <span>罗路</span>
      </div>
      <div class="line">
        <span>接种类型：</span>
        <span>甲型肝炎疫苗接种</span>
      </div>
      <div class="line">
        <span>接种疫苗：</span>
        <span>甲肝灭活疫苗，自费(进口)</span>
      </div>
      <div class="line">
        <span>出生年月：</span>
        <span>2020-12-03 17:00:35</span>
      </div>
      <div class="line">
        <span>接种前医师是否询问受种方健康状况：</span>
        <span>是</span>
      </div>
      <div class="line">
        <span>经医生检查无禁忌，是否同意接种：</span>
        <span>是</span>
      </div>
      <div class="line noBorder">
        <span>接种方确认信息：</span>
      </div>
      <div class="line noBorder">
        <img src="http://ipad-front.oss-cn-shenzhen.aliyuncs.com/file_160724020600022642.jpg" alt="">
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'VaccinDetail',
  props: ['visible'],
  data () {
    return {}
  },
  methods: {
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
    }
    img {
      width: 300px;
      height: 300px;
    }
  }
  .noBorder {
    border: none !important;
  }
}
</style>