<template>
  <div class="home">
    <el-menu :default-active="$route.path" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/">医院列表</el-menu-item>
      <el-menu-item index="/newsList">新闻列表</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
import Editor from '@/components/editor'

export default {
  name: 'home',
  components: {
    Editor
  },
  data() {
    return {
      editorContent: 'hahaah',
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
}
</script>
<style>
  .home .el-menu-demo {
    margin-bottom: 20px;
  }
  .home .addButton {
    float: right;
    margin-bottom: 20px;
  }
</style>
