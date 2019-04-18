<!--商品管理  商品管理页-->
<template>
  <div class="memberPage">
    <el-row class="headbg">
      <el-col :span="24">
        <h2>{{title}}</h2>
        <p>商品,指某些团体或组织的成员</p>
      </el-col>
    </el-row>
    <el-row class="contBox">
      <el-col :span="24">
        <el-button type="primary" size="small" icon="el-icon-back" @click="goBack">商品列表</el-button>
      </el-col>
      <el-col :span="24" class="mt20">
        <el-button type="primary" size="small" @click="goodsInfo">商品信息</el-button>
        <el-button type="success" size="small" @click="isShow=false">推广奖金</el-button>
      </el-col>
      <el-col :span="24">
        <el-form :model="form" ref="form" size="small" label-width="140px">
          <div v-show="isShow">
            <el-form-item label="商品标题" prop="goodTitle">
              <el-input v-model="form.goodTitle" placeholder="商品标题"></el-input>
            </el-form-item>
            <el-form-item label="商品显示图片">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                list-type="picture"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品价格" prop="goodPrice">
              <el-input v-model="form.goodPrice" placeholder="商品价格">
                <template slot="prepend">¥</template>
              </el-input>
            </el-form-item>
            <el-form-item label="商品备注" prop="goodRemark">
              <el-input v-model="form.goodRemark" type="textarea" placeholder="商品备注"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="goodOrder">
              <el-input v-model="form.goodOrder" placeholder="排序"></el-input>
            </el-form-item>
            <el-form-item label="是否开启" prop="goodIsEnable">
              <el-radio v-model="form.goodIsEnable" :label="true">开启</el-radio>
              <el-radio v-model="form.goodIsEnable" :label="false">关闭</el-radio>
            </el-form-item>
          </div>
          <div v-show="!isShow">
            <el-form-item label="直推奖金" prop="firstBonus">
              <el-input v-model="form.firstBonus" placeholder="直推奖金">
                <template slot="prepend">¥</template>
              </el-input>
            </el-form-item>
            <el-form-item label="二代奖金" prop="twoBonus">
              <el-input v-model="form.twoBonus" placeholder="二代奖金">
                <template slot="prepend">¥</template>
              </el-input>
            </el-form-item>
            <el-form-item label="金牌学员 团队奖金" prop="goldTeam">
              <el-input v-model="form.goldTeam" placeholder="金牌学员 团队奖金">
                <template slot="prepend">¥</template>
              </el-input>
            </el-form-item>
            <el-form-item label="银牌学员 团队奖金" prop="silverTeam">
              <el-input v-model="form.silverTeam" placeholder="银牌学员 团队奖金">
                <template slot="prepend">¥</template>
              </el-input>
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
        curPage: 1,   // 当前页
        pageSize: 10,   // 每页显示条数
        total: 0,   // 总条数
        dialog: false,
        isShow: true,   // 默认显示商品信息
        title: '添加商品',
        form: {
          id: '',   // 商品ID
          goodTitle: '',   // 商品标题
          goodImg: '',    // 商品图片
          goodPrice: 0,   // 商品价格
          goodRemark: '', // 商品备注
          goodOrder: 0,   // 商品序号
          goodIsEnable: true,   // 是否开启
          createUser: '',   // 创建商品的用户id
          editUser: '',  // 编辑商品的用户id
          firstBonus: 0,   // 直推奖金
          twoBonus: 0,    //  二代奖金
          goldTeam: 0,   //  金牌会员 团队奖金
          silverTeam: 0  // 银牌会员 团队奖金
        },
        fileList: []
      }
    },
    created() {
      if (this.$route.query.id) {
        this.title = '修改商品';
      } else {
        this.title = '添加商品';
      }
    },
    mounted() {

    },
    methods: {
      goBack() { // 返回商品列表页
        this.$router.push({
          path: '/goodsManage'
        })
      },
      goodsInfo() {  // 点击商品信息
        this.isShow = true;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleSizeChange(value) {  // 切换每页显示条数
        this.pageSize = value;
        this.curPage = 1;
      },
      handleCurrentChange(value) {   // 切换当前页
        this.curPage = value;
      },
      onSubmit() {  // 添加/修改商品信息
        let that = this;
        this.$axios.post('/Api/good/UpModel', this.form).then(response => {
          if (response.Code == 200) {
            that.$message({
              type: 'success',
              message: response.Message
            })
          } else {
            that.$message.error(response.Message);
          }
        }).catch(response => {
          console.log(response);
        })
      },
      resetForm(formName) {  // 重置表单
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
@import '../member/member.less';
.mt20 {
  margin: 20px 0;
}
.el-form {
  max-width: 600px;
}
</style>
