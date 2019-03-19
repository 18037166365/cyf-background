<template>
  <div class="login-wrap">
    <h1>爱泰健康</h1>
    <el-form ref="form" label-width="80px">
    <el-form-item label="账号">
      <el-input v-model="username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="password"></el-input>
    </el-form-item>
      <el-button type="primary" @click="login">登陆</el-button>
  </el-form>
  </div>

</template>

<script>
import { login } from '../api/index.js'

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        login({
          username: this.username,
          password: this.password
        }).then(res => {
          if(res.code===0) {
            this.$emit('loigin', true);
            localStorage.setItem('token', res.tk)
          }
        })
        console.log('login!');
      }
    }
  }
</script>

<style lang="scss">
  .login-wrap {
    position: relative;
    width: 50%;
    left: 50%;
    top: 100px;
    transform: translateX(-50%);
  }
</style>
