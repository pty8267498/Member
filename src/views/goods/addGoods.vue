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
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="商品信息" name="first">
            <el-form :model="form" ref="form" size="small" label-width="100px">
              <el-form-item label="商品标题">
                <el-input v-model="form.value" placeholder="商品标题"></el-input>
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
              <el-form-item label="商品价格">
                <el-input v-model="form.value" placeholder="商品价格">
                  <template slot="prepend">¥</template>
                </el-input>
              </el-form-item>
              <el-form-item label="商品备注">
                <el-input v-model="form.value" type="textarea" placeholder="商品备注"></el-input>
              </el-form-item>
              <el-form-item label="排序">
                <el-input v-model="form.value" placeholder="排序"></el-input>
              </el-form-item>
              <el-form-item label="是否开启">
                <el-radio v-model="form.radio" label="1">开启</el-radio>
                <el-radio v-model="form.radio" label="2">关闭</el-radio>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="推广奖金" name="second">
            <el-form :model="form2" ref="form2" label-width="140px" size="small">
              <el-form-item label="直推奖金">
                <el-input v-model="form2.value" placeholder="直推奖金">
                  <template slot="prepend">¥</template>
                </el-input>
              </el-form-item>
              <el-form-item label="二代奖金">
                <el-input v-model="form2.value" placeholder="二代奖金">
                  <template slot="prepend">¥</template>
                </el-input>
              </el-form-item>
              <el-form-item label="金牌学员 团队奖金">
                <el-input v-model="form2.value" placeholder="金牌学员 团队奖金">
                  <template slot="prepend">¥</template>
                </el-input>
              </el-form-item>
              <el-form-item label="银牌学员 团队奖金">
                <el-input v-model="form2.value" placeholder="银牌学员 团队奖金">
                  <template slot="prepend">¥</template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
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
        total: 30,   // 总条数
        dialog: false,
        title: '添加商品',
        activeName: 'first',
        form: {
          value: '',
          radio: '1'  // 是否开启
        },
        form2: {
          value: '',
          type: 1,
          type2: 1,
          radio: '1',
        },
        options: [
          {
            label: '选择',
            value: ''
          },{
            label: '开启',
            value: 1,
          },{
            label: '关闭',
            value: 2
          }
        ],
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
      handleClick(tab, event) { // tab  切换
        console.log(tab, event);
      },
      onSubmit() {  // 搜索列表

      },
    }
  }
</script>

<style lang="less" scoped>
@import '../member/member.less';
.el-tabs {
  margin-top: 1rem;
  .el-form {
    max-width: 600px;
  }
}
</style>
