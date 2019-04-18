<!--商品管理  商品管理页-->
<template>
  <div class="memberPage">
    <el-row class="headbg">
      <el-col :span="24">
        <h2>商品管理</h2>
        <p>商品是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品</p>
      </el-col>
    </el-row>
    <el-row class="contBox">
      <el-col :span="24"><h3></h3></el-col>
      <el-col :span="24">
        <el-form :inline="true" :model="form" ref="form" size="small">
          <el-form-item label="">
            <el-select v-model="form.isEnd" placeholder="">
              <el-option label="是否开启" value=""></el-option>
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="form.keyWord" placeholder="请输入查询内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="success" @click="addLevel">添加商品</el-button>
            <el-button type="warning" @click="resetForm">刷新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="username" label="展示图"></el-table-column>
          <el-table-column prop="name" label="标题"></el-table-column>
          <el-table-column prop="name" label="价格"></el-table-column>
          <el-table-column prop="number" label="状态">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.status==1">开启</el-tag>
              <el-tag type="danger" v-if="scope.row.status==2">关闭</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editInfo(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="deleteInfo(scope.row)">删除</el-button>
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
        total: 0,   // 总条数
        dialog: false,
        dialogTitle: '添加商品',
        activeName: 'first',
        form: {
          keyWord: '',
          isEnd: ''  // 是否开启
        },
        form2: {
          value: '',
          type: 1,
          type2: 1,
          radio: '1',
        },
        tableDataAll: [], // 列表返回的商品总数
        tableData: [],  // 表格显示的数据
      }
    },
    mounted() {
      this.getTablelist();  // 获取商品的列表
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
      handleClick(tab, event) { // tab  切换
        console.log(tab, event);
      },
      addLevel() {  // 添加商品
        this.$router.push({
          path: '/addGoods'
        })
      },
      getTablelist() {  // 获取商品的列表
        let that = this;
        this.$axios.post('/Api/good/GetModelList', this.form).then(response => {
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
        this.form.isEnd = '';
        this.form.keyWord = '';
        this.getTablelist();
      },
      editInfo(obj) {  // 点击每一行的修改会员信息
        this.$router.push({
          path: '/editGoods',
          query: {
            id: obj.id
          }
        })
      },
      deleteInfo(obj) {  // 点击每一行的删除
        this.$confirm('确定要删除该条信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style lang="less" scoped>
@import '../member/member.less';
</style>
