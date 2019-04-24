<!--安全与数据 清除缓存页-->
<template>
  <div class="memberPage">
    <el-row class="headbg">
      <el-col :span="24">
        <h2>清除缓存</h2>
        <p>清除缓存</p>
      </el-col>
    </el-row>
    <el-row class="contBox">
      <el-col :span="24">
        <h3>清除缓存</h3>
        <el-button type="primary" size="small" @click="showTip()">确定</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      showTip(){
        alert("清除成功!"); 
      }
    }
  }
</script>

<style lang="less" scoped>
@import '../member/member.less';
</style>
