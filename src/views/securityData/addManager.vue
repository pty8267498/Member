<!--管理员管理 添加管理员-->
<template>
  <div class="memberPage">
    <el-row class="headbg">
      <el-col :span="24">
        <h2>{{title}}</h2>
        <p>管理员</p>
      </el-col>
    </el-row>
    <el-row class="contBox">
      <el-col :span="24">
        <el-button type="primary" @click="goBack" icon="el-icon-back" size="small">会员列表</el-button>
      </el-col>
      <el-col :span="24">
        <el-form :model="form" ref="form" :rules="rules" label-width="110px" size="small">
          <el-form-item label="管理员用户名" prop="userName">
            <el-input v-model="form.userName" placeholder="管理员用户名" clearable></el-input>
          </el-form-item>
          <el-form-item label="管理员密码" prop="passWord">
            <el-input type="password" v-model="form.passWord" autocomplete="off" clearable placeholder="管理员密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="form.password2" autocomplete="off" clearable placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item label="权限设置" prop="power">
            <b>模块选择</b>
            <!-- <el-checkbox-group v-model="form.power">
              <el-checkbox label="设置" name="power"></el-checkbox>
              <el-checkbox label="会员" name="power"></el-checkbox>
              <el-checkbox label="商品" name="power"></el-checkbox>
              <el-checkbox label="景区" name="power"></el-checkbox>
              <el-checkbox label="新闻" name="power"></el-checkbox>
              <el-checkbox label="留言" name="power"></el-checkbox>
              <el-checkbox label="管理员" name="power"></el-checkbox>
            </el-checkbox-group> -->
            <el-checkbox-group v-model="form.power">
              <el-checkbox v-for="(item,index) in dataArr" :label="item" :key="index">{{item}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="管理员手机" prop="phone">
            <el-input v-model="form.phone" placeholder="管理员手机" :maxlength="11" clearable></el-input>
          </el-form-item>
          <el-form-item label="管理员邮箱" prop="emil">
            <el-input v-model="form.emil" placeholder="管理员邮箱" clearable></el-input>
          </el-form-item>
          <el-form-item label="管理员地址" prop="address">
            <el-input v-model="form.address" placeholder="管理员地址" clearable></el-input>
          </el-form-item>
          <el-form-item label="管理员描述" prop="remark">
            <el-input type="textarea" v-model="form.remark" placeholder="管理员描述" clearable></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.sex" label="男">男</el-radio>
            <el-radio v-model="form.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="开启">
            <el-radio v-model="form.IsEnd" :label="true">开启</el-radio>
            <el-radio v-model="form.IsEnd" :label="false">不开启</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import md5 from 'js-md5';
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.passWord) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        title: '添加管理员',
        dataArr: ['设置','会员','商品','景区','新闻','留言','管理员'],
        form: {
          id: '',
          userName: '',  // 用户名
          passWord: '',   // 用户名密码
          password2: '',  // 确认密码
          phone: '', // 手机号
          emil: '',  // 邮箱
          address: '',  // 地址
          remark: '',  // 描述
          power: [],  // 权限设置
          sex: '男',   // 性别
          IsEnd: true,  // 状态 是否开启
          createId: '',  // 登录者id
        },
        rules: {
          userName: [{required: true, message: '请输入用户名', trigger: 'blur' }],
          passWord: [{required: true, message: '请输入密码', trigger: 'blur' }],
          password2: [{required: true, validator: validatePass, trigger: 'blur' }],
          power: [{type:'array', required: true, message: '请至少选择一个权限', trigger: 'change'}],
        }
      }
    },
    created() {
      if (this.$route.query.id) {
        this.title = '修改管理员';
        this.form.id = this.$route.query.id;
      } else {
        this.title = '添加管理员';
        this.form.id = '';
      }
      this.form.createId = localStorage.getItem('userId');
    },
    mounted() {
      if (this.$route.query.id) {
        this.getUserinfo();
      }
    },
    methods: {
      goBack() { // 返回列表页
        this.$router.push({
          path: '/manager'
        })
      },
      getUserinfo() {  // 获取管理员信息
        let that = this;
        this.$axios.post('/Api/Admin/GetModelById?id='+this.form.id).then(response => {
          if (response.Code == 200 && response.Success) {
            that.form.userName = response.Data.userName;  // 用户名
            that.form.phone = response.Data.phone; // 手机号
            that.form.emil = response.Data.emil; // 邮箱
            that.form.address = response.Data.address;  // 地址
            that.form.remark = response.Data.remark;  // 描述
            that.form.sex = response.Data.sex;   // 性别
            that.form.IsEnd = response.Data.IsEnd;  // 状态 是否开启
            if (response.Data.power!=null) {
              that.form.power = response.Data.power.split('|');  // 权限设置
            } else {
              that.form.power = [];
            }
          } else {
            that.$message.error(response.Message);
          }
        }).catch(response => {
          console.log(response);
        })
      },
      onSubmit(formName) { // 提交表单
        let that = this;
        let power = this.form.power.join('|');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$axios.post('/Api/Admin/UpModel',{
              id: that.form.id,
              userName: that.form.userName,  // 用户名
              passWord: md5(that.form.passWord),   // 用户名密码
              phone: that.form.phone, // 手机号
              emil: that.form.emil,  // 邮箱
              address: that.form.address,  // 地址
              remark: that.form.remark,  // 描述
              power: power,  // 权限设置
              sex: that.form.sex,   // 性别
              IsEnd: that.form.IsEnd,  // 状态 是否开启
              createId: that.form.createId,  // 登录者id
            }).then(response => {
              if (response.Code == 200 && response.Success) {
                that.$message({
                  type: 'success',
                  message: response.Message
                })
                that.goBack();
              } else {
                that.$message.error(response.Message);
              }
            }).catch(response => {
              console.log(response);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) { // 重置表单
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="less" scoped>
@import '../member/member.less';
.el-form {
  margin-top: 1rem;
  max-width: 600px;
}
</style>
