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
          <el-table-column prop="id" label="序号" width="50"></el-table-column>
          <el-table-column prop="f_number" label="学员编号" width="100"></el-table-column>
          <el-table-column prop="f_name" label="姓名" width="150"></el-table-column>
          <el-table-column prop="f_phone" label="手机" width="120"></el-table-column>
          <el-table-column prop="recom_username" label="推荐人"></el-table-column>
          <el-table-column prop="addtime" label="注册日期"></el-table-column>
          <el-table-column label="审核状态" width="130">
            <template slot-scope="scope">
              <el-tag type="success">{{scope.row.f_isEnd}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="状态" width="100">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.f_isEnd==1">开启</el-tag>
              <el-tag type="danger" v-if="scope.row.f_isEnd==2">关闭</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button @click="recharge(scope.row)" type="text" size="small">奖学金充值</el-button>
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
    <!--奖学金充值弹窗-->
    <el-dialog title="奖学金充值" :visible.sync="dialog" width="370px" class="recharge">
      <el-form :model="form2" ref="form2" label-width="100px" size="small">
        <el-form-item label="充值账号">
          <el-input v-model="form2.value" readonly></el-input>
        </el-form-item>
        <el-form-item label="账号手机号">
          <el-input v-model="form2.value" readonly></el-input>
        </el-form-item>
        <el-form-item label="商品积分">
          <el-input v-model="form2.value" readonly></el-input>
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
          <el-input v-model="form2.value"></el-input>
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
        form: {
          isEnd: '', // 是否开启
          keyWord: ''  // 搜索关键字
        },
        form2: {
          value: '',
          type: 1,
          type2: 1
        },
        options: [
          {
            label: '是否开启',
            value: ''
          },{
            label: '是',
            value: 1,
          },{
            label: '否',
            value: 2
          }
        ],
        tableDataAll: [],   // 返回的所有数据
        tableData: [
          {
            "id": 60,
            "username": "709466",
            "name": "苏秀贞",
            "telephone": "18867917128",
            "ccoic_name": "-",
            "level_name": "银牌学员",
            "recom_telephone": "13757988223",
            "recom_username": "700073",
            "ip": "115.210.46.28",
            "addtime": "2019-03-12 14:19:46",
            "auth_status": "审核已通过",
            "status": 1
          }
        ]
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
      onSubmit1() {  // 奖学金充值 提交

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
@import './member.less';
</style>
