<!--首页-->
<template>
  <div class="htmlPage">
    <el-row :gutter="20" class="indexTop">
      <el-col :span="24" v-for="(item,index) in navArr" :key="index">
        <dl @click="routeLink(index)">
          <dt :class="item.icon"></dt>
          <dd>{{item.name}}</dd>
        </dl>
      </el-col>
    </el-row>
    <!--表格-->
    <div class="contBox">
      <el-table :data="tableData" border style="width: 100%;">
        <el-table-column prop="title" label="统计"></el-table-column>
        <el-table-column prop="number" label="数量"></el-table-column>
      </el-table>
    </div>
    <div class="contBox">
      <el-table :data="tableData2" border style="width: 100%;">
        <el-table-column prop="num" label="银牌学员"></el-table-column>
        <el-table-column prop="number" label="金牌学员"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        navArr: [
          {
            name: '基础设置',
            icon: 'icon1'
          },{
            name: '功能设置',
            icon: 'icon2',
          },{
            name: '会员管理',
            icon: 'icon3'
          }, {
            name: '积分兑换',
            icon: 'icon4'
          }
        ],
        tableData: [],
        tableData2: []
      }
    },
    mounted() {
      // this.getTablelist();  // 获取表格的数据
    },
    methods: {
      routeLink(index) {  // 跳转到相对应的页面
        if (index == 0) {
          this.$router.push({
            path: '/baseSetup'
          })
        } else if (index == 1) {
          this.$router.push({
            path: '/functionSetup'
          })
        } else if (index == 2) {
          this.$router.push({
            path: '/memberList'
          })
        } else {
          this.$router.push({
            path: '/integralCash'
          })
        }
      },
      getTablelist() {
        let that = this;
        this.$axios.post('/homelist').then(response => {
          if (response.code == 200) {
            that.tableData = response.data.statistics;
            that.tableData2 = response.data.numArr;
          }
        }).catch(response => {
          console.log(response);
        })
      }
    }
  }
</script>

<style lang="less" scoped>
@import '../assets/less/index.less';
</style>
