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
            <el-button type="success" @click="addLevel">添加商品</el-button>
            <el-button type="warning">刷新</el-button>
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
        dialog: false,
        dialogTitle: '添加商品',
        activeName: 'first',
        form: {
          value: '',
          selval: ''  // 是否开启
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
      addLevel() {  // 添加商品
        this.$router.push({
          path: '/addGoods'
        })
      },
      onSubmit() {  // 搜索列表

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
