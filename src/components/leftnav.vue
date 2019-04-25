<!--左侧导航-->
<template>
  <div class="leftNav">
    <h1>管理系统</h1>
    <!--<el-container>-->
      <el-aside width="200px" :class="{'w': isCollapse}">
        <el-menu background-color="#333333" text-color="#fff" active-text-color="#ffd04b"  :default-active="onRoutes" collapse-transition unique-opened router :collapse="isCollapse">
          <template v-for="item in menus">
            <template v-if="item.submenus">
              <el-submenu :index="item.index" :key="item.index">
                  <template slot="title">
                      <i :class="item.icon"></i><span slot="title" v-html="item.title"></span>
                  </template>
                  <template v-for="subItem in item.submenus">
                      <el-submenu v-if="subItem.submenus" :index="subItem.index" :key="subItem.index">
                          <template slot="title">{{subItem.title}}</template>
                          <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index" v-html="threeItem.title">
                          </el-menu-item>
                      </el-submenu>
                      <el-menu-item v-else :index="subItem.index" :key="subItem.index" v-html="subItem.title">
                      </el-menu-item>
                  </template>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="item.index" :key="item.index">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
    <!--</el-container>-->
  </div>
</template>
<script>
import Bus from './bus.js';
export default {
  data () {
    return {
      curIndex: 'home',
      // isCollapse: false,   // 左侧导航是否展开
      menus: [
        {
          title: "首页",
          index: 'home',
          icon: "iconfont icon-shouye",
        },{
          title: "网站设置",
          index: "website",
          icon: "iconfont icon-shezhi",
          submenus: [
            {
              title: "基础设置",
              icon: "el-icon-star-off",
              index: "baseSetup",
            },{
              title: "功能设置",
              icon: "el-icon-star-off",
              index: "functionSetup",
            }
          ]
        },{
          title: "会员管理",
          icon: "iconfont icon-member",
          index: "memberManage",
          submenus: [
            {
              title: "会员列表",
              icon: "el-icon-star-off",
              index: "memberList",
            },{
              title: "会员级别",
              icon: "el-icon-star-off",
              index: "memberLevel",
            },{
              title: "添加会员",
              icon: "el-icon-star-off",
              index: "addMember",
            }
          ]
        },{
          title: "商品管理",
          icon: "iconfont icon-shangpinguanli",
          index: "goodsManage",
        },{
          title: "积分提现",
          icon: "iconfont icon-jifentixian",
          index: "integralCash",
        },{
          title: "积分明细",
          icon: "iconfont icon-jifenmingxi",
          index: "integralDetails",
        },{
          title: "安全与数据",
          icon: "iconfont icon-anquan",
          index: "securityData",
          submenus: [
            {
              title: "管理员",
              icon: "el-icon-star-off",
              index: "manager",
            }, {
              title: "会员组织",
              icon: "el-icon-star-off",
              index: "managerorgan",
            }, {
              title: "清除缓存",
              icon: "el-icon-star-off",
              index: "clearCache",
            }
          ]
        }
      ],
    }
  },
  props: ['isCollapse'],
  computed:{
    onRoutes(){
        return this.$route.path.replace('/','');
    }
  },
  created() {
    // this.leftIsopen();
  },
  mounted() {

  },
  methods: {
    leftIsopen() {
      // Bus.$on("myIsopen",(obj)=>{   //这里最好用箭头函数，不然this指向有问题
      //   this.isCollapse = obj;
      // })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/css/iconfont.css';
@import '../assets/css/main.less';
</style>
