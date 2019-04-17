<!--头部 -->
<template>
  <div class="header">
    <div class="head" :class="{'isOpen':isShow}">
      <span @click="showLeft"><img :src="iconUrl" alt=""></span>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">编辑信息</el-dropdown-item>
          <el-dropdown-item command="2">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
// import Bus from './bus.js';
export default {
  data() {
    return {
      username: '',
      isShow: false,   // 点击左侧导航展开 默认展开
      iconUrl: require('../assets/icon.png'),
      screenWidth: '',
    }
  },
  created() {
    if (document.documentElement['clientWidth'] <= 768) {
      this.isShow = true;
      this.$store.state.isPageNumber = false;
    } else {
      this.isShow = false;
      this.$store.state.isPageNumber = true;
    }
    this.$emit('isshowLeft', this.isShow);
  },
  watch: {
    screenWidth:function (val) {
      if (val <= 600) {
        this.$store.state.isPageNumber = false;
      } else {
        this.$store.state.isPageNumber = true;
      }
    }
  },
  mounted() {
    this.username = localStorage.getItem('user');
    this.resizePage();
  },
  methods: {
    showLeft () {  // 是否显示左侧导航
      this.isShow = !this.isShow;
      this.$emit('isshowLeft', this.isShow);
    },
    resizePage() {   // 自适应窗口
      let that = this;
      window.onresize = () => {
        return (() => {
          that.screenWidth = document.documentElement['clientWidth'];
            if (document.documentElement['clientWidth'] <= 768) {
              that.isShow = true;
            } else {
              that.isShow = false;
            }
            that.$emit('isshowLeft', that.isShow);
        })()
      }
    },
    handleCommand(command) {   // 用户名下拉菜单选择事件
        if(command == '2'){ // 退出登录
          localStorage.clear();
          this.$router.push({
            path: '/login'
          })
        } else if (command == '1') {  // 编辑用户信息
          console.log('编辑用户信息');
        }
    },
  }
}
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  .head {
    position: fixed;
    left: 200px;
    z-index: 999;
    width: calc(100% - 200px);
    box-sizing: border-box;
    background: #fff;
    line-height: 60px;
    border-bottom: 1px solid #eae8e8;
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      margin: 0 1rem;
      img {
        width: 40px;
        height: auto;
        vertical-align: middle;
        cursor: pointer;
        display: inline-block;
      }
    }
    .el-dropdown-link {
      display: inline-block;
      cursor: pointer;
      font-weight: bolder;
      font-size: 20px;
    }
  }
  .isOpen {
    width: calc(100% - 64px);
    // width: 100%;
    left: 64px;
  }
}
@media screen and (max-width: 600px) {
  .header {
    .isOpen {
      width: 100%;
      left: 0px;
    }
  }
}
</style>

