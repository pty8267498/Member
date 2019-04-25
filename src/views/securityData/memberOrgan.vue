<template>
  <div class="memberPage">
    <el-row class="headbg">
      <el-col :span="24">
        <h2>会员组织</h2>
        <p>会员组织</p>
      </el-col>
    </el-row>
    <el-row class="contBox">
      <el-col :span="24">
        <el-form :model="formData" :inline="true" ref="formData" size="small" label-width="80px">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="formData.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button @click="resetForm('formData')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <!-- <tree :folder = "trees" :select = "select"></tree> -->
        <!-- <tree-list :folder = "treeData" :select = "select"></tree-list> -->
        <el-tree
          :data="treeData"
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps">
        </el-tree>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import treeList from './treeList';
export default {
  // components: {
  //   treeList
  // },
  data () {
    return {
      formData: {
        phone: ''
      },
      treeData: [],
      defaultProps: {
        children: 'chilend',
        label: 'name'
      },
      prop: ['folder', 'treeData']
    }
  },
  mounted() {
    this.getTreelist();
  },
  methods: {
    resetForm (formName) {  // 重置搜索选项
      this.$refs(formName).resetFields();
      this.getTreelist();
    },
    onSubmit () {
      this.getTreelist();
    },
    getTreelist () { // 获取tree的数据
      let that = this;
      this.$axios.post('/Api/member/GetTreeListPage?title='+this.formData.phone).then(response => {
        if (response.Code == 200 && response.Success) {
          that.treeData = response.Data;
        } else {
          that.$message.error(response.Mesaage);
        }
      }).catch(response => {
        console.log(response);
      })
    },
    select(data){
      console.log(data);
    }
  }
}
</script>
<style scoped lang="less">
@import '../member/member.less';
</style>
