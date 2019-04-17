<!--会员管理  会员级别-->
<template>
  <div class="memberPage">
    <el-row class="headbg">
      <el-col :span="24">
        <h2>会员管理 - 级别管理</h2>
        <p>现有会员管理</p>
      </el-col>
    </el-row>
    <el-row class="contBox">
      <el-col :span="24">
        <el-form :inline="true" :model="form" ref="form" size="small">
          <el-form-item label="">
            <el-select v-model="form.selval" placeholder="">
              <el-option v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="form.value" placeholder="请输入查询内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">搜索</el-button>
            <el-button type="success" @click="addLevel">添加级别</el-button>
            <el-button type="warning" @click="resetPage">刷新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="g_name" label="级别名称"></el-table-column>
          <el-table-column prop="g_firstNumber" label="直推人数"></el-table-column>
          <el-table-column prop="g_status" label="是否启用"
            :filters="[{text: '开启', value: true },{ text: '关闭', value: false }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.g_status">开启</el-tag>
              <el-tag type="danger" v-if="!scope.row.g_status">关闭</el-tag>
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
    <!--添加级别弹窗-->
    <el-dialog :title="dialogTitle" :visible.sync="dialog" width="370px" class="recharge">
      <el-form :model="form2" ref="form2" :rules="rules" label-width="80px" size="small">
        <el-form-item label="级别名称" prop="g_name">
          <el-input v-model="form2.g_name" placeholder="级别名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="g_status">
          <el-radio v-model="form2.g_status" :label="true">开启</el-radio>
          <el-radio v-model="form2.g_status" :label="false">不开启</el-radio>
        </el-form-item>
        <el-form-item label="直推人数" prop="g_firstNumber">
          <el-input v-model.number="form2.g_firstNumber" placeholder="直推人数"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit2('form2')">提交</el-button>
          <el-button @click="dialog=false">关闭</el-button>
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
        levelId: '',   // 添加/修改级别id
        dialogTitle: '添加级别',
        form: {
          value: '',
          selval: ''  // 是否开启
        },
        form2: {
          g_name: '',  // 级别名称
          g_firstNumber: 0,  // 直推人数
          g_status: true,  // 状态
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
        rules: {
          g_name: [{required: true, message: '请输入级别名称', trigger: 'blur'}],
          g_firstNumber:[{required: true, message: '请输入直推人数', trigger: 'blur'},
          {type: 'number', message: '请输入数字值', trigger: 'blur'}],
        },
        tableData: [],  // 当前的表格数据
        tableDataAll: [],  // 所有的表格数据
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
      addLevel() {  // 添加级别
        this.dialogTitle = '添加级别';
        this.dialog = true;
        this.levelId = '';
      },
      filterTag(value, row) {  // 表格是否开启筛选
        return row.g_status === value;
      },
      resetPage() {  // 点击刷新
        this.curPage = 1;
        this.getTablelist();
      },
      onSearch() {  // 搜索列表
        // return this.tableData.filter(function(item){
        //   return item.g_status == true;
        // })
      },
      getTablelist() {  // 获取会员级别的列表
        let that = this;
        this.$axios.post('/Api/memberGrade/GetModelList').then(response => {
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
      onSubmit2(formName) {  // 提交添加/修改会员级别
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.$axios.post('/Api/memberGrade/UpModel', {
              id: that.levelId,
              g_name: that.form2.g_name,  // 级别名称
              g_firstNumber: that.form2.g_firstNumber,  // 直推人数
              g_status: that.form2.g_status,  // 状态
            }).then(response => {
              if (response.Code == 200) {
                that.$message({
                  type: 'success',
                  message: response.Message
                })
                that.dialog = false;
                that.getTablelist();
                that.$refs[formName].resetFields();
              } else {
                that.$message.error(response.Message);
              }
            }).catch(response => {
              console.log(response);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      recharge(obj) { // 点击每一行的奖学金充值
        this.dialog = true;
      },
      editInfo(obj) {  // 点击每一行的修改会员信息
        this.dialogTitle = '修改级别';
        this.dialog = true;
        this.levelId = obj.id;
        this.form2.g_firstNumber = obj.g_firstNumber;
        this.form2.g_name = obj.g_name;
      },
      deleteInfo(obj) {  // 点击每一行的删除
        let that = this;
        this.$confirm('确定要删除该条信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/Api/memberGrade/DelModel?id='+obj.id).then(response => {
            if (response.Code == 200) {
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
