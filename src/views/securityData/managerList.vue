<!--管理员  管理员列表-->
<template>
  <div class="memberPage">
    <el-row class="headbg">
      <el-col :span="24">
        <h2>管理员管理</h2>
        <p>现有管理员管理</p>
      </el-col>
    </el-row>
    <el-row class="contBox">
      <el-col :span="24">
        <el-button type="success" size="small" icon="el-icon-plus" @click="addMemberFn">添加管理员</el-button>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="userName" label="管理员帐号"></el-table-column>
          <el-table-column prop="phone" label="管理员电话"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.IsEnd"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editInfo(scope.row)">修改管理员</el-button>
              <el-button type="text" size="small" @click="deleteInfo(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            v-if="$store.state.isPageNumber"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="curPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
          <el-pagination
            v-if="!$store.state.isPageNumber"
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
        tableDataAll: [], // 列表返回的商品总数
        tableData: []
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
        this.$axios.post('/Api/Admin/GetModelList').then(response => {
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

      },
      addMemberFn() { // 点击添加管理员
        this.$router.push({
          path: '/addManager',
        })
      },
      editInfo(obj) {  // 点击每一行的修改会员信息 跳转页面
        this.$router.push({
          path: '/editManager',
          query: {
            id: obj.id
          }
        })
      },
      deleteInfo(obj) {  // 点击每一行的删除
        let that = this;
        this.$confirm('确定要删除该条信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/Api/Admin/DelModel?id='+obj.id).then(response => {
            if (response.Code == 200) {
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
              that.getTablelist();
            } else {
              that.$message.error(response.Message);
            }
          }).catch(response => {
            console.log(response);
          })
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
.el-table {
  margin-top: 1rem;
}
</style>
