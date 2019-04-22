<!--积分管理  积分提现页-->
<template>
  <div class="memberPage">
    <el-row class="headbg">
      <el-col :span="24">
        <h2>兑换申请</h2>
        <p>兑换申请</p>
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
            <el-button type="warning" @click="shuaXin">刷新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="userName" label="帐号"></el-table-column>
          <el-table-column prop="phone" label="用户/手机号"></el-table-column>
          <el-table-column prop="applyType" label="提现方式"></el-table-column>
          <el-table-column prop="price" label="兑换金额"></el-table-column>
          <el-table-column prop="fee" label="手续费"></el-table-column>
          <el-table-column prop="pay" label="到帐金额(扣完手续费)"></el-table-column>
          <el-table-column prop="createTime" label="添加时间"></el-table-column>
          <el-table-column prop="number" label="状态">
            <template slot-scope="scope">
              <el-tag size="small">{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="操作">
            <template slot-scope="scope">
              <el-button type="text" v-if="scope.row.status !='不通过'" @click="examineFn(scope.row)">审核</el-button>
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
    <!--审核弹窗-->
    <el-dialog title="兑换审核" :visible.sync="dialog" width="370px">
      <el-form :model="form2" ref="form2" label-width="100px" size="small">
        <el-form-item label="会员帐号" prop="userName">
          <el-input v-model="form2.userName" readonly></el-input>
        </el-form-item>
        <el-form-item label="账号余额" prop="thisScore">
          <el-input v-model="form2.thisScore" readonly></el-input>
        </el-form-item>
        <el-form-item label="是否通过审核" prop="status">
          <el-radio v-model="form2.status" label="通过">通过</el-radio>
          <el-radio v-model="form2.status" label="不通过">不通过</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit1">提交</el-button>
          <el-button @click="resetForm('form2')">取消</el-button>
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
        form: {
          keyWord: '',
          status: ''  // 是否开启
        },
        form2: {
          userName: '',
          thisScore: '',  // 账户余额金额
          id: '',
          checkUser: '',
          status: '通过',
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
        tableData: [],
        tableDataAll: [], // 列表返回的商品总数
      }
    },
    created(){
      this.form2.checkUser = localStorage.getItem('userId');  // 登录的id
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
      getTablelist() {  // 获取积分兑换的列表
        let that = this;
        this.$axios.post('/Api/applyScore/GetModelList',this.form).then(response => {
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
      shuaXin() {  // 刷新
        this.form.status = '';
        this.form.keyWord = '';
        this.curPage = 1;
        this.getTablelist();
      },
      onSubmit1() {  // 提交审核
        let that = this;
        this.$axios.post('/Api/applyScore/checkModel',this.form2).then(response => {
          if (response.Code == 200 && response.Success) {
            that.$message({
              type: 'success',
              message: response.Message
            })
            that.dialog = false;
            that.getTablelist();
          } else {
            that.$message.error(response.Message);
          }
        }).catch(response => {
          console.log(response);
        })
      },
      resetForm(formName) {  // 取消弹窗
        this.$refs[formName].resetFields();
        this.dialog = false;
      },
      examineFn(obj) {  // 点击每一行的审核信息
        this.dialog = true;
        this.form2.userName = obj.userName;
        this.form2.thisScore = obj.thisScore;
        this.form2.id = obj.id;
      },
    }
  }
</script>

<style lang="less" scoped>
@import '../member/member.less';
.el-dialog {
  .el-button {
    width: 100px;
  }
}
</style>
