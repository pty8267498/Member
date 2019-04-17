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
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="warning">刷新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" border style="width: 100%;">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="username" label="类型"></el-table-column>
          <el-table-column prop="name" label="用户/帐号"></el-table-column>
          <el-table-column prop="name" label="现有数量"></el-table-column>
          <el-table-column prop="name" label="原有量"></el-table-column>
          <el-table-column prop="name" label="操作数量"></el-table-column>
          <el-table-column prop="name" label="添加时间"></el-table-column>
          <el-table-column prop="number" label="状态">
            <template slot-scope="scope">
              <el-tag type="success" size="small" v-if="scope.row.status==1">成功</el-tag>
              <el-tag type="danger" size="small" v-if="scope.row.status==2">失败</el-tag>
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
        total: 30,   // 总条数
        form: {
          value: '',
          selval: ''  // 是否开启
        },
        options: [
          {
            label: '是否退回',
            value: ''
          },{
            label: '退回',
            value: 1,
          },{
            label: '成功',
            value: 2
          }
        ],
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

    },
    methods: {
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
</style>
