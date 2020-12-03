<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <breadcrumb></breadcrumb>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img class="user-avatar" :src="avatar"> -->
          <div>{{ name }}</div>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="updatePwd" style="display:block;">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <el-dialog title="修改密码" :visible="visible" @close="closeHandle" class="dg">
      <div style="width:500px;margin: 0 auto">
        <el-form :model="form" ref="updateFrom" label-width="150px" size="small" :rules="rules">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="请输入短信验证码：" prop="authCode">
            <div style="display:flex">
              <el-input placeholder="请输入短信验证码" v-model="form.authCode"></el-input>
              <el-button type="primary" @click="getCode">获取验证码</el-button>
            </div>
          </el-form-item>
          <el-form-item label="请输入新密码：" prop="password">
            <el-input placeholder="请输入新密码" v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  data () {
    return {
      visible: false,
      form: {
        phone: null,
        authCode: null,
        password: null
      },
      rules: {
        authCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
      }
    }
  },
  created () {
    this.form.phone = this.phone
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'phone'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    updatePwd () {
      this.visible = true
    },
    closeHandle () {
      this.visible = false
      this.form.password = null
      this.form.authCode = null
    },
    onSubmit () {
      this.$refs['updateFrom'].validate(valid => {
        if (valid) {
          this.$http.fetch('/UserPlatform/updatePassword', this.form).then(({code}) => {
            if (code === 200) {
              this.visible = false
              this.$message({
                message: `修改成功`,
                type: 'success'
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    async getCode () {
      await this.$http.fetch('/UserPlatform/generateAuthCodetst', { phone: this.form.phone})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dg {
  .el-dialog {
    width:400px
  }
}
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 0px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 19px;
        font-size: 12px;
      }
    }
  }
}
</style>
