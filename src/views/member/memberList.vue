<!--会员管理  会员列表-->
<template>
  <div class="memberPage">
    <el-row class="headbg">
      <el-col :span="24">
        <h2>会员管理 - 会员信息</h2>
        <p>现有会员管理</p>
      </el-col>
    </el-row>
    <el-row class="contBox">
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
            <el-button type="success" @click="addMemberFn">添加会员</el-button>
            <el-button type="warning" @click="resetForm">刷新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="id" label="学员编号" width="100"></el-table-column>
          <el-table-column prop="f_name" label="姓名" width="150"></el-table-column>
          <el-table-column prop="f_phone" label="手机" width="120"></el-table-column>
          <el-table-column prop="f_pidName" label="推荐人"></el-table-column>
          <el-table-column prop="f_createTime" label="注册日期"></el-table-column>
          <el-table-column prop="f_editTime" label="审核日期"></el-table-column>
          <el-table-column label="审核状态" width="130">
            <template slot-scope="scope">
              <el-tag type="success">{{scope.row.f_status}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="状态" width="100">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.f_isEnd">开启</el-tag>
              <el-tag type="danger" v-if="!scope.row.f_isEnd">关闭</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button @click="recharge(scope.row)" type="text" size="small">奖学金充值</el-button>
              <el-button type="text" size="small" @click="editInfo(scope.row)">修改</el-button>
              <el-button v-if="scope.row.f_status=='待审核'" type="text" size="small" @click="checkInfo(scope.row)">审核</el-button>
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
    <!-- 审核弹窗 -->
    <el-dialog title="审核" :visible.sync="dialog1" width="370px" class="recharge">
      <el-form :model="formArr" ref="formArr" label-width="80px" size="small">
        <el-form-item label="">
          <el-radio v-model="formArr.status" label="审核通过">审核通过</el-radio>
          <el-radio v-model="formArr.status" label="未通过">未通过</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkForm">提交</el-button>
          <el-button @click="dialog1=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--奖学金充值弹窗-->
    <el-dialog title="奖学金充值" :visible.sync="dialog" width="370px" class="recharge">
      <el-form :model="form2" ref="form2" label-width="100px" size="small">
        <el-form-item label="充值账号">
          <el-input v-model="form2.id" readonly></el-input>
        </el-form-item>
        <el-form-item label="账号手机号">
          <el-input v-model="form2.phone" readonly></el-input>
        </el-form-item>
        <el-form-item label="奖学金">
          <el-input v-model="form2.value" readonly></el-input>
        </el-form-item>
        <el-form-item label="操作">
          <el-select v-model="form2.type">
            <el-option label="充值" :value="1"></el-option>
            <el-option label="扣除" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form2.type2">
            <el-option label="奖学金" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="form2.score"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit1">提交</el-button>
          <el-button @click="dialog=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
        dialog1: false,
        form: {
          isEnd: '', // 是否开启
          keyWord: ''  // 搜索关键字
        },
        formArr: {  // 审核数据
          status: '审核通过',
          id: ''
        },
        form2: { // 奖学金充值数据
          value: '',
          type: 1,
          type2: 1,
          UserId: '',  // 用户登录id
        },
        tableDataAll: [],   // 返回的所有数据
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
      getTablelist() {  // 获取会员列表
        let that = this;
        this.$axios.post('/Api/member/GetListModel', {
          isEnd: that.form.isEnd,
          keyWord: that.form.keyWord
        }).then(response => {
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
      pageList(objData, curVal) {
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
      resetForm() {  // 刷新列表
        this.form.isEnd = '';
        this.form.keyWord = '';
        this.curPage = 1;
        this.getTablelist();
      },
      checkInfo(obj) {  // 点击审核按钮
        this.dialog1 = true;
        this.formArr.id = obj.id;
      },
      checkForm() {  // 审核状态提交
        let that = this;
        this.$axios.post('/Api/member/CheckMember',this.formArr).then(response => {
          if (response.Code == 200 && response.Success) {
            that.$message({
              type: 'success',
              message: response.Message
            })
            that.dialog1 = false;
            that.formArr.radio = '审核通过';
            that.getTablelist();
          } else {
            that.$message.error(response.Message);
          }
        }).catch(response => {
          console.log(response);
        })
      },
      onSubmit1() {  // 奖学金充值 提交
        let that = this;
        this.$axios.post('').then(response => {
          if (response.Code == 200 && response.Success) {
            that.$message({
              type: 'success',
              message: response.Message
            })
            that.getTablelist();
          } else {
            that.$message.error(response.Message);
          }
        }).catch(response => {
          console.log(response);
        })
      },
      recharge(obj) { // 点击每一行的奖学金充值
        this.dialog = true;
      },
      addMemberFn() { // 点击添加会员
        this.$router.push({
          path: '/addMember',
        })
      },
      editInfo(obj) {  // 点击每一行的修改会员信息 跳转页面
        this.$router.push({
          path: '/editMember',
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
          that.$axios.post('/Api/member/delMember'+obj.id).then(response => {
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
@import './member.less';
</style>
