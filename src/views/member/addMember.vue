<!--会员管理  添加会员-->
<template>
  <div class="memberPage">
    <el-row class="headbg">
      <el-col :span="24">
        <h2>{{title}}</h2>
        <p>会员,指某些团体或组织的成员</p>
      </el-col>
    </el-row>
    <el-row class="contBox">
      <el-col :span="24">
        <el-button type="primary" size="small" icon="el-icon-back" @click="goBack">会员列表</el-button>
      </el-col>
      <el-col :span="24">
        <el-form :model="form" ref="form" :rules="rules" label-width="130px" size="small">
          <el-form-item label="学员编号" prop="f_number">
            <el-input v-model="form.id" placeholder="学员编号"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="f_passWord">
            <el-input type="password" v-model="form.f_passWord" placeholder="会员密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="f_passWord2">
            <el-input type="password" v-model="form.f_passWord2" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="f_name">
            <el-input v-model="form.f_name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="f_sex">
            <el-radio v-model="form.f_sex" label="男">男</el-radio>
            <el-radio v-model="form.f_sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="会员级别" prop="f_gradeId">
            <el-select v-model="form.f_gradeId" placeholder="请选择会员级别">
              <el-option
                v-for="(item,index) in levelArr"
                :key="index"
                :label="item.g_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号(登录帐号)" prop="f_phone">
            <el-input v-model.number="form.f_phone" :maxlength="11" placeholder="手机号(登录帐号)"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码" prop="f_card">
            <el-input v-model="form.f_card" :maxlength="18" placeholder="身份证号码"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="f_address">
            <el-input v-model="form.f_address" placeholder="地址"></el-input>
          </el-form-item>
          <el-form-item label="会员头像上传" prop="f_headImg">
            <el-input v-model="form.f_headImg" placeholder="会员头像上传"></el-input>
          </el-form-item>
          <el-form-item label="银行卡姓名" prop="f_breakName">
            <el-input v-model="form.f_breakName" placeholder="银行卡姓名"></el-input>
          </el-form-item>
          <el-form-item label="银行卡开户行" prop="f_breakOpenName">
            <el-input v-model="form.f_breakOpenName" placeholder="银行卡开户行"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号" prop="f_breakCard">
            <el-input v-model="form.f_breakCard" :maxlength="20" placeholder="银行卡号"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="f_isEnd">
            <el-radio v-model="form.f_isEnd" :label="true">开启</el-radio>
            <el-radio v-model="form.f_isEnd" :label="false">不开启</el-radio>
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
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.f_passWord2 !== "") {
          this.$refs.form.validateField("f_passWord2");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.f_passWord) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      title: "添加会员",
      form: {
        id: "", //  学员编号
        f_name: "", // 姓名
        f_address: "", // 地址
        f_breakCard: "", // 银行卡号
        f_breakName: "", // 持卡人姓名
        f_breakOpenName: "", // 开户银行
        f_card: "", // 身份证
        f_gradeId: "", // 会员等级
        f_gradeName: "", // 会员等级名字
        f_headImg: "", // 头像
        f_isEnd: true, // 是否开启
        f_passWord: "", // 密码
        f_passWord2: "", // 确认密码
        f_phone: "", // 手机号
        f_sex: "男", // 性别
        f_createUser: "", // 添加登录时的id
        f_editUser: "" // 修改的ID
      },
      levelArr: [], // 会员级别数据
      rules: {
        f_name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        id: [{ required: true, message: "请输入学员编号", trigger: "blur" }],
        f_gradeId: [
          { required: true, message: "请选择会员级别", trigger: "change" }
        ],
        f_phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { type: "number", message: "手机号必须为数字", trigger: "blur" }
        ],
        f_passWord: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        f_passWord2: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    if (this.$route.query.id) {
      this.title = "修改会员";
      this.form.f_editUser = this.$route.query.id;
    } else {
      this.title = "添加会员";
      this.form.f_editUser = "";
    }
    this.form.f_createUser = localStorage.getItem("userId");
  },
  mounted() {
    this.getLevellist();
  },
  methods: {
    onSubmit(formName) {
      // 提交
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.$axios
            .post("/Api/member/ActionSubmit", that.form)
            .then(response => {
              if (response.Code == 200) {
                that.$message({
                  type: "success",
                  message: response.Message
                });
              } else {
                that.$message.error(response.Message);
              }
            })
            .catch(response => {
              console.log(response);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      // 重置表单
      this.$refs[formName].resetFields();
    },
    goBack() {
      // 返回会员列表
      this.$router.push({
        path: "/memberList"
      });
    },
    getLevellist() {
      // 获取会员级别的列表
      let that = this;
      this.$axios
        .post("/Api/memberGrade/GetModelList")
        .then(response => {
          if (response.Code == 200) {
            that.levelArr = response.Data;
          } else {
            that.$message.error(response.Message);
          }
        })
        .catch(response => {
          console.log(response);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./member.less";
.el-form {
  max-width: 600px;
  margin-top: 1rem;
}
</style>
