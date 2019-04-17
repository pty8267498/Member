<!--网站建设  功能设置页-->
<template>
  <div class="htmlPage">
    <el-row class="headbg">
      <el-col :span="24">
        <h2>功能设置</h2>
        <p>Config Set</p>
      </el-col>
    </el-row>
    <el-row class="contBox">
      <el-col :span="24">
        <el-button type="primary" @click="contClick(1)">基础功能</el-button>
        <el-button type="warning" @click="contClick(2)">推广积分</el-button>
        <el-button type="success" @click="contClick(3)">交易类功能</el-button>
      </el-col>
      <!--基础功能-->
      <el-col :span="24">
        <el-form :model="form" ref="form" label-width="150px" size="small">
          <div v-show="isPage==1">
            <el-form-item label="登录验证码开启" prop="loginVlid">
              <el-switch v-model="form.loginVlid" active-text="开启" inactive-text="关闭"></el-switch>
            </el-form-item>
            <el-form-item label="帐户注册功能" prpo="custRegion">
              <el-switch v-model="form.custRegion" active-text="开启" inactive-text="关闭"></el-switch>
            </el-form-item>
            <el-form-item label="帐户注册推荐人" prop="custApply">
              <el-switch v-model="form.custApply" active-text="开启" inactive-text="关闭"></el-switch>
            </el-form-item>
            <el-form-item label="帐户找回密码" prop="findPassWord">
              <el-switch v-model="form.findPassWord" active-text="开启" inactive-text="关闭"></el-switch>
            </el-form-item>
            <el-form-item label="预约需提前天数" prop="applyDay">
              <el-select v-model="form.applyDay" placeholder="预约需提前天数">
                <el-option v-for="item in dayArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公告内容开启" prop="isAd">
              <el-switch v-model="form.isAd" active-text="开启" inactive-text="关闭"></el-switch>
            </el-form-item>
            <el-form-item label="公告内容">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </div>
          <!--推广积分-->
          <div v-show="isPage==2">
            <el-form-item label="直推积分" prop="firstScore">
              <el-input placeholder="直推积分" v-model="form.firstScore">
                <template slot="prepend">#</template>
              </el-input>
            </el-form-item>
            <el-form-item label="二代积分" prop="oneScore">
              <el-input placeholder="二代积分" v-model="form.oneScore">
                <template slot="prepend">#</template>
              </el-input>
            </el-form-item>
            <el-form-item label="三代积分" prop="twoScore">
              <el-input placeholder="三代积分" v-model="form.twoScore">
                <template slot="prepend">#</template>
              </el-input>
            </el-form-item>
            <el-form-item label="团队人数每满" prop="teamNumber">
              <el-input placeholder="团队人数" v-model="form.teamNumber"></el-input>
            </el-form-item>
            <el-form-item label="产生积分" prop="teamScore">
              <el-input placeholder="产生积分" v-model="form.teamScore">
                <template slot="prepend">#</template>
              </el-input>
            </el-form-item>
          </div>
          <!--交易类功能-->
          <div v-show="isPage==3">
            <el-form-item label="提现功能是否开启" prop="isApplyMoney">
              <el-switch v-model="form.isApplyMoney" active-text="开启" inactive-text="关闭"></el-switch>
            </el-form-item>
            <el-form-item label="提现数量限制" prop="applyNumber">
              <span><el-input v-model="form.applyNumber" placeholder="最小限制"></el-input></span>
              <span><el-input v-model="form.applyNumberEnd" placeholder="最大限制"></el-input></span>
            </el-form-item>
            <el-form-item label="提现免手续费区域" prop="freeAreaMone">
              <span><el-input v-model="form.freeAreaMone" placeholder="提现免最小手续费限制"></el-input></span>
              <span><el-input v-model="form.freeAreaMoneEnd" placeholder="提现免最大手续费限制"></el-input></span>
            </el-form-item>
            <el-form-item label="提现手续费(比例0~1)" prop="applyscale">
              <el-input v-model="form.applyscale" placeholder="提现手续费"></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
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
      return {
        isPage: 1,  // 1 表示是基础设置 2 表示是推广积分 3 是交易类功能
        form: {
          adImg: '',  // 公告图片
          applyDay: '',  // 提前预约天数
          applyNumber: '',  // 提现数量
          applyNumberEnd: '',  // 提现数量值
          applyscale: '',   // 提现手续费比例
          custRegion: true,   // 账号注册功能
          findPassWord: true,    // 找回密码
          firstScore: '', // 直推积分
          freeAreaMone: '',  // 提现手续费区域
          freeAreaMoneEnd: '',  // 体现手续费区域
          isAd: true,  // 公告内容开启
          custApply: true,  // 账户注册推荐人开启
          isApplyMoney: true,  // 开启提现功能
          loginVlid: true,   // 开启验证码
          oneScore: '',   // 二代积分
          teamNumber: '',   // 团队每满人数
          teamScore: '',   // 产生积分
          twoScore: '',   // 三代积分
        },
        editId: '',  // 编辑用户时产生的id
        fileList: [],
        dayArr: [
          {
            label: '0天',
            value: 0,
          },{
            label: '1天',
            value: 1,
          },{
            label: '2天',
            value: 2,
          },{
            label: '3天',
            value: 3,
          },{
            label: '4天',
            value: 4,
          },{
            label: '5天',
            value: 5,
          }
        ]
      }
    },
    created() {
      this.editId = localStorage.getItem('userId');
    },
    mounted() {
      this.getFormdata();
    },
    methods: {
      getFormdata() {  // 获取功能设置的数据接口
        let that = this;
        this.$axios.post('/Api/systemBasice/GetModel').then(response => {
          if (response.Code == 200 && response.Success) {
            that.form = response.Data;
          } else {
            that.$message.error(response.Message);
          }
        }).catch(response => {
          console.log(response);
        })
      },
      contClick(val) { // 点击基础功能
        this.isPage = val;
      },
      onSubmit() {  // 提交基础功能
        let that = this;
        this.$axios.post('/Api/systemBasice/UpModel', {
          adImg: that.form.adImg,  // 公告图片
          applyDay: that.form.applyDay,  // 提前预约天数
          applyNumber: that.form.applyNumber,  // 提现数量
          applyNumberEnd: that.form.applyNumberEnd,  // 提现数量值
          applyscale: that.form.applyscale,   // 提现手续费比例
          custRegion: that.form.custRegion,   // 账号注册功能
          findPassWord: that.form.findPassWord,    // 找回密码
          firstScore: that.form.firstScore, // 直推积分
          freeAreaMone: that.form.freeAreaMone,  // 提现手续费区域
          freeAreaMoneEnd: that.form.freeAreaMoneEnd,  // 体现手续费区域
          isAd: that.form.isAd,  // 公告内容开启
          custApply: that.form.custApply,  // 账户注册推荐人开启
          isApplyMoney: that.form.isApplyMoney,  // 开启提现功能
          loginVlid: that.form.loginVlid,   // 开启验证码
          oneScore: that.form.oneScore,   // 二代积分
          teamNumber: that.form.teamNumber,   // 团队每满人数
          teamScore: that.form.teamScore,   // 产生积分
          twoScore: that.form.twoScore,   // 三代积分
          editId: that.editId
        }).then(response => {
          if (response.Code == 200 && response.Success) {
            that.$message({
              type: 'success',
              message: response.Message
            })
            that.getFormdata();
          } else {
            that.$message.error(response.Message);
          }
        }).catch(response => {
          console.log(response);
        })
      },
      resetForm(formName) {   // 重置表单
        this.$refs[formName].resetFields();
        this.form.freeAreaMoneEnd = '';
        this.form.applyNumberEnd = '';
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
    }
  }
</script>

<style lang="less" scoped>
@import './baseSetup.less';
</style>
