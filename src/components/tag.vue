<!--面包屑导航-->
<template>
  <div class="tagPage">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item,index) in tagsList" :key="index" :to="{path: item.path}">
        {{item.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      tagsList: [],
    }
  },
  watch:{
    $route(newValue, oldValue){
      this.setTags();
    }
  },
  created(){
    this.setTags();
  },
  methods: {
    setTags() {
			let arr = [];
			this.$route.matched.forEach(item => {
				if (item.meta.title!='') {
					arr.push({
						title: item.meta.title,
						path: item.path,
					})
				}
			});
			this.tagsList = arr;
			// this.tagsList = this.$route.matched.map(route => route.meta);
    }
  }
}
</script>
<style lang="less" scoped>
.tagPage {
  position: fixed;
  left: 200px;
  top: 64px;
  z-index: 999;
  height: 3rem;
  width: calc(100% - 200px);
  box-sizing: border-box;
  line-height: 3rem;
  background: #fdfdfd;
  border-bottom: 1px solid #eae8e8;
  padding-left: 1.5rem;
  .el-breadcrumb {
    line-height: 3rem;
  }
}
</style>
