<template>
  <div id="app">
    <home  v-if="isLogin"/>
    <Login v-else @loigin="login"/>
  </div>
</template>

<script>
import Home from './views/Home'
import Login from './views/Login'


export default {
  data() {
    return {
      isLogin: false
    }
  },
  name: 'app',
  components: {
    Home,
    Login
  },
  methods: {
    login(e) {
      console.log('e:', e)
      this.isLogin= e
    }
  },

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.ql-editor {
  min-height: 300px;
}
.el-pagination {
  margin-top: 50px;
}
</style>
