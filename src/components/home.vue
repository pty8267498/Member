<template>
  <div class="home" :class="{'open': isOpen}">
    <!-- 左侧导航 -->
    <left-nav :isCollapse="isOpen"></left-nav>
    <!-- 头部 -->
    <div class="content-box" :class="{'isLeft': isOpen}">
      <!-- 遮板 -->
      <!-- <div class="main-mask" v-show="!isOpen" @click="leftOpen"></div> -->
      <!-- 头部 -->
      <v-header @isshowLeft="isShowleftnav"></v-header>
      <!--主体内容-->
      <v-tag></v-tag>
      <el-main>
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </div>
  </div>
</template>
<script>
import vHeader from './header';
import leftNav from './leftnav';
import vTag from './tag';
export default {
  components: {
		vHeader,leftNav,vTag
  },
  data() {
    return {
      username: 'Sakura',
      isOpen: false,
    }
  },
  mounted() {

  },
  methods: {
    isShowleftnav(data) {
      this.isOpen = data;
    },
    leftOpen() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  box-sizing: border-box;
  padding-left: 200px;
  height: 100%;
  overflow-y: auto;
}
.open {
  padding-left: 64px;
  .leftNav {
    width: 64px;
    .el-aside {
      width: 64px;
    }
  }
  .content-box {
    width: calc(100% - 64px);
    .tagPage {
      left: 64px;
      width: calc(100% - 64px);
    }
  }
}
.isLeft {
  left: 64px;
}
@media screen and (max-width: 600px) {
  .open {
    padding-left: 0px;
    .leftNav {
      width: 0px;
      .el-aside {
        width: 0px;
      }
    }
    .content-box {
      width: 100%;
      .tagPage {
        left: 0px;
        width: 100%;
      }
    }
  }
  .isLeft {
    left: 0;
  }
  // .header {
  //   .isOpen {
  //     width: 100%;
  //     left: 0px;
  //   }
  // }
}
</style>

