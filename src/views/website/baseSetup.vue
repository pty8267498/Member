<!--网站建设  基础设置页-->
<template>
  <div class="htmlPage">
    <el-row class="headbg">
      <el-col :span="24">
        <h2>系统设置</h2>
        <p>system set</p>
      </el-col>
    </el-row>
    <el-row class="contBox">
      <el-col :span="24">
        <el-button type="primary" @click="baseClick">基础设置</el-button>
        <el-button type="success" @click="isBase=false">推广设置</el-button>
      </el-col>
      <el-col :span="24" v-if="isBase==true">
        <el-form :model="form" ref="form" label-width="80px" size="small">
          <el-form-item label="网站网址" prop="webSite">
            <el-input v-model="form.webSite" placeholder="网站网址" clearable></el-input>
          </el-form-item>
          <el-form-item label="网站名称" prop="webName">
            <el-input v-model="form.webName" placeholder="网站名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="关键词" prop="tagList">
            <el-input v-model="form.tagList" placeholder="关键词" clearable></el-input>
          </el-form-item>
          <el-form-item label="网站Logo">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList1"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="客服邮箱" prop="custEmile">
            <el-input v-model="form.custEmile" placeholder="客服邮箱" clearable></el-input>
          </el-form-item>
          <el-form-item label="客服电话" prop="custPhone">
            <el-input v-model="form.custPhone" placeholder="客服电话" clearable></el-input>
          </el-form-item>
          <el-form-item label="传真" prop="custTel">
            <el-input v-model="form.custTel" placeholder="传真" clearable></el-input>
          </el-form-item>
          <el-form-item label="腾讯客服" prop="txQQ">
            <el-input v-model="form.txQQ" placeholder="腾讯客服" clearable></el-input>
          </el-form-item>
          <el-form-item label="公司地址" prop="address">
            <el-input v-model="form.address" placeholder="公司地址" clearable></el-input>
          </el-form-item>
          <el-form-item label="网站版权" prop="banPower">
            <el-input v-model="form.banPower" placeholder="网站版权" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24" v-else>
        <el-form :model="form1" ref="form1" label-width="80px" size="small">
          <el-form-item label="推广图片">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList2"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit2">提交</el-button>
            <el-button>重置</el-button></el-button>
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
        isBase: true,  // 是否显示基础设置 和推广设置
        editId: '',  // 编辑用户的id
        form: {
          webSite: '',   // 网站网址
          address: '',  // 公司地址
          webName: '',  // 网站名称
          tagList: '',   // 关键词
          custEmile: '',  // 客服邮箱
          custPhone: '',  // 客服电话
          custTel: '',   // 传真
          txQQ: '',   // 腾讯客服
          banPower: '',   // 网站版权
          logoUrl: '',  // logo地址
        },
        form1: {

        },
        fileList1: [],
        fileList2: [],
      }
    },
    created() {
      this.editId = localStorage.getItem('userId');
    },
    mounted() {
      this.getFormdata();
    },
    methods: {
      baseClick() {  // 点击基础设置
        this.isBase = true;
        this.getFormdata();
      },
      getFormdata() { // 获取基础设置数据
        let that = this;
        this.$axios.post('/Api/SystemSet/GetModel').then(response => {
          if (response.Code == 200) {
            that.form = response.Data;
          } else {
            that.$message.error(response.Message);
          }
        }).catch(response => {
          console.log(response);
        })
      },
      onSubmit() {  // 提交基础设置
        let that = this;
        this.$axios.post('/Api/SystemSet/UpModel', {
          webSite: that.form.webSite,   // 网站网址
          address: that.form.address,  // 公司地址
          webName: that.form.webName,  // 网站名称
          tagList: that.form.tagList,   // 关键词
          custEmile: that.form.custEmile,  // 客服邮箱
          custPhone: that.form.custPhone,  // 客服电话
          custTel: that.form.custTel,   // 传真
          txQQ: that.form.txQQ,   // 腾讯客服
          banPower: that.form.banPower,   // 网站版权
          editId: that.editId,  // 编辑用户的id
          logoUrl: that.form.logoUrl,  // logo地址
        }).then(response => {
          if (response.Code == 200) {
            that.$message({
              type: 'success',
              message: response.Message,
            })
            that.getFormdata();
          } else {
            that.$message.error(response.Message);
          }
        }).catch(response => {
          console.log(response);
        })
      },
      resetForm(formName) {  // 重置表单
        this.$refs[formName].resetFields();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      onSubmit2() {  // 提交推广设置

      },
    }
  }
</script>

<style lang="less" scoped>
@import './baseSetup.less';
</style>
