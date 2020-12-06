<template>
  <div>
    <div class="login-top">
      <div class="top">衡阳市石鼓区智慧医疗系统</div>
    </div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <h2 class="login-title color-main">welcome</h2>
        <el-form-item prop="phone">
          <el-input placeholder="请输入账号" @keyup.enter.native="handleLogin" v-model="loginForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" @keyup.enter.native="handleLogin" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px">
          <el-button style="width: 100%" type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="loginCenterBg" class="login-center-layout"/>
    <div class="tip">{{ msg }}</div>
  </div>
</template>
<script>
import loginCenterBg from '@/assets/images/loginCenterBg.png'
export default {
  name: 'Login',
  data () {
    return {
      loginCenterBg,
      loading: false,
      msg: '',
      loginForm: {
        phone: '',
        password: ''
      },
      loginRules: {
        phone: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
    }
  },
  created () {},
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('Login', this.loginForm)
            .then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            })
        } else {
          console.log('参数验证不合法！')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.svg-container {
  padding: 6px 5px 6px 15px;
  color: #889aa4;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
.login-title{
  color: #409eff;
}
.login-top {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 15%;
  .top {
    font-size: 40px;
    color: #ffffff;
    opacity: 0.7;
  }
  .bottom {
    font-size: 18px;
    margin-top: 1%;
    color: #ffffff;
    opacity: 0.5;
  }
}
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  top: 30%;
  width: 360px;
  margin: 30px auto 0;
  // border-top: 10px solid #409eff;
}

.login-title {
  text-align: center;
  margin-top: 0;
}

.login-center-layout {
  background: #409eff;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;
  // margin-top: 200px;
}
.slide-verify {
  position: absolute !important;
  top: 35%;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.tip {
  position: absolute !important;
  top: 58.5%;
  width: 200px;
  text-align: center;
  left: 0;
  right: 0;
  margin: 0 auto;
}
</style>