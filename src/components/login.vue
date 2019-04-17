<!--登录页-->
<template>
  <div class="loginPage">
    <div class="login_box">
      <h2>会员登录</h2>
      <el-form :model="formData" :rules="rules" ref="formData">
        <el-form-item prop="username">
          <el-input v-model="formData.username" clearable placeholder="请输入用户名" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formData.password" type="password" clearable placeholder="请输入密码" :maxlength="16" @keyup.enter.native="onSubmit('formData')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formData')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5';
export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
      }
    }
  },
  methods: {
    onSubmit(formName) {  // 点击登录
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.$axios.post('/Api/Login/CheckLogin', {
            userName: that.formData.username,
            passWord: md5(that.formData.password),
          }).then(response => {
            if (response.Success) {
              that.$message({
                type: 'success',
                message: response.Message
              })
              localStorage.setItem('userId', response.Data);
              that.$router.push({
                path: '/home'
              })
            } else {
              that.$message.error(response.msg);
            }
          }).catch(response => {
            console.log(response);
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.loginPage {
  background: #2c2e2f;
  width: 100%;
  height: 100%;
  .login_box {
    width: 300px;
    height: auto;
    background: rgba(255, 255, 255, .4);
    padding: 30px;
    box-sizing: border-box;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    h2 {
      font-size: 2.3rem;
      text-align: center;
      margin-bottom: 1rem;
      color: #fff;
    }
    .el-form {
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
