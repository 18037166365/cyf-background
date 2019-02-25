<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="账号">
      <el-input v-model="username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="password"></el-input>
    </el-form-item>
      <el-button type="primary" @click="login">登陆</el-button>
  </el-form>
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
          this.$emit('loigin', true)
          console.log('res: ', res);
        })
        console.log('login!');
      }
    }
  }
</script>
