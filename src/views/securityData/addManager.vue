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
          <el-form-item label="管理员用户名" prop="username">
            <el-input v-model="form.username" placeholder="管理员用户名" clearable></el-input>
          </el-form-item>
          <el-form-item label="管理员密码" prop="password">
            <el-input type="password" v-model="form.password" autocomplete="off" clearable placeholder="管理员密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input type="password" v-model="form.password2" autocomplete="off" clearable placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item label="权限设置" prop="check">
            <b>模块选择</b>
            <el-checkbox-group v-model="form.check" :min="1">
              <el-checkbox v-for="item in dataArr" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="管理员手机" prop="phone">
            <el-input v-model="form.phone" placeholder="管理员手机" clearable></el-input>
          </el-form-item>
          <el-form-item label="管理员邮箱" prop="mailbox">
            <el-input v-model="form.mailbox" placeholder="管理员邮箱" clearable></el-input>
          </el-form-item>
          <el-form-item label="管理员地址" prop="address">
            <el-input v-model="form.address" placeholder="管理员地址" clearable></el-input>
          </el-form-item>
          <el-form-item label="管理员描述" prop="describe">
            <el-input type="textarea" v-model="form.describe" placeholder="管理员描述" clearable></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.sex" :label="1">男</el-radio>
            <el-radio v-model="form.sex" :label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="开启">
            <el-radio v-model="form.status" :label="1">开启</el-radio>
            <el-radio v-model="form.status" :label="2">不开启</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        console.log(value);
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        title: '添加管理员',
        dataArr: [
          {
            name: '设置',
            id: 1
          }, {
            name: '会员',
            id: 2,
          },{
            name: '商品',
            id: 3
          }, {
            name: '景区',
            id: 4,
          }, {
            name: '新闻',
            id: 5
          },{
            name: '留言',
            id: 6,
          },{
            name: '管理员',
            id: 7
          }
        ],
        form: {
          value: '',
          username: '',  // 用户名
          password: '',   // 用户名密码
          password2: '',  // 确认密码
          phone: '', // 手机号
          mailbox: '',  // 邮箱
          address: '',  // 地址
          describe: '',  // 描述
          check: [],  // 权限设置
          sex: 1,   // 性别
          status: 1,  // 状态 是否开启
        },
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur' }],
          password: [{required: true, message: '请输入密码', trigger: 'blur' }],
          password2: [{required: true, validator: validatePass, trigger: 'blur' }],
          check: [{required: true, type: 'array', message: '请至少选择一个权限', trigger: 'change'}],
        }
      }
    },
    created() {
      if (this.$route.query.id) {
        this.title = '修改管理员';
      } else {
        this.title = '添加管理员';
      }
    },
    mounted() {

    },
    methods: {
      goBack() { // 返回列表页
        this.$router.push({
          path: '/manager'
        })
      },
      onSubmit(formName) { // 提交表单
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
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
@import '../member/member.less';
.el-form {
  margin-top: 1rem;
  max-width: 600px;
}
</style>
