<template>
  <div>
    <el-button class="addButton" type="primary" @click="addCase">添加案例</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      border>
      <el-table-column
        label="创建时间"
        prop="updatedAt">
      </el-table-column>
      <el-table-column
        label="客户头像">
        <template slot-scope="scope">
          <img class="logo" :src="scope.row.headImg" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="客户姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="客户年龄"
        prop="age">
      </el-table-column>
       <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
          <el-button  @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pageWrap">

    </div>
  </div>
</template>

<script>
import {  getCaseList, deleteCase } from '../api/index.js'
import { getDate } from '../utils/axios.js'
import { Message } from 'element-ui';

  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
         getCaseList().then(res => {
          console.log('res: ', res);
            this.tableData = res.data
            this.tableData.map(item => {
              item.updatedAt = getDate(item.updatedAt)
              return item
            })
        })
      },
      addCase() {
        this.$router.push('/caseEdit')
      },
      editClick(e) {
        this.$router.push('/caseEdit?id='+ e.id)
      },
      deleteClick(e) {
        deleteCase({
          id: e.id
        }).then(res => {
          Message({
             message: res.msg,
             type: 'success'
          })
          this.getList()
        })
      }
    },
  }
</script>

<style scoped>
.logo {
  width: 100px;
}

</style>

