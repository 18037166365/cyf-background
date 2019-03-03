<template>
  <div>
     <el-table
      :data="tableData"
      style="width: 100%"
      border>
      <el-table-column
        label="创建时间"
        prop="updatedAt">
      </el-table-column>
      <el-table-column
        label="客户姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="联系方式"
        prop="phoneNumber">
      </el-table-column>
      <el-table-column
        label="留言内容"
        prop="content">
      </el-table-column>
       <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pageWrap">

    </div>
  </div>
</template>

<script>
import {  getMessageList, deleteMessage } from '../api/index.js'
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
         getMessageList().then(res => {
          console.log('res: ', res);
            this.tableData = res.data
            this.tableData.map(item => {
              item.updatedAt = getDate(item.updatedAt)
              return item
            })
        })
      },
      deleteClick(e) {
        deleteMessage({
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

