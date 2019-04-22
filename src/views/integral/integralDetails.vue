<!--积分管理  积分明细页-->
<template>
  <div class="memberPage">
    <el-row class="headbg">
      <el-col :span="24">
        <h2>充值管理</h2>
        <p>充值订单</p>
      </el-col>
    </el-row>
    <el-row class="contBox">
      <el-col :span="24">
        <el-form :inline="true" :model="form" ref="form" size="small">
          <el-form-item label="">
            <el-select v-model="form.status" placeholder="">
              <el-option v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="form.keyWord" placeholder="请输入查询内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="warning" @click="resetForm">刷新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="typeName" label="类型"></el-table-column>
          <el-table-column prop="userName" label="用户/帐号"></el-table-column>
          <el-table-column prop="thisNumber" label="现有数量"></el-table-column>
          <el-table-column prop="oldNumber" label="原有量"></el-table-column>
          <el-table-column prop="actionNumber" label="操作数量"></el-table-column>
          <el-table-column prop="createTime" label="添加时间"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-tag size="small">{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            v-if="$store.state.isPageNumber&&total!=0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="curPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
          <el-pagination
            v-if="!$store.state.isPageNumber&&total!=0"
            @current-change="handleCurrentChange"
            :current-page="curPage"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
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
        form: {
          status: '',   // 状态
          keyWord: ''  // 关键字
        },
        options: [
          {
            label: '是否退回',
            value: ''
          },{
            label: '退回',
            value: '退回',
          },{
            label: '成功',
            value: '成功'
          }
        ],
        tableDataAll: [], // 列表返回的商品总数
        tableData: [],   // 当前页的表格数据
      }
    },
    mounted() {
      this.getTablelist();
    },
    methods: {
      handleSizeChange(value) {  // 切换每页显示条数
        this.pageSize = value;
        this.curPage = 1;
        this.pageList(this.tableDataAll, this.curPage*this.pageSize-this.pageSize);
      },
      handleCurrentChange(value) {   // 切换当前页
        this.curPage = value;
        this.pageList(this.tableDataAll, this.curPage*this.pageSize-this.pageSize);
      },
      getTablelist() {  // 获取商品的列表
        let that = this;
        this.$axios.post('/Api/scoreLog/GetModelList', this.form).then(response => {
          if (response.Code == 200) {
            that.tableDataAll = response.Data;
            that.total = response.Data.length;
            that.pageList(that.tableDataAll, 0);
          } else {
            that.$message.error(response.Message);
          }
        }).catch(response => {
          console.log(response);
        })
      },
      pageList(objData, curVal) {  // 翻页
        let arr = [];
        for (let i = curVal; i<this.total; i++) {
          if (arr.length < this.pageSize) {
            arr.push(objData[i]);
          }
        }
        this.tableData = arr;
      },
      onSubmit() {  // 搜索列表
        this.curPage = 1;
        this.getTablelist();
      },
      resetForm() { // 刷新列表
        this.form.status = '';
        this.form.keyWord = '';
        this.getTablelist();
      },
    }
  }
</script>

<style lang="less" scoped>
@import '../member/member.less';
</style>
