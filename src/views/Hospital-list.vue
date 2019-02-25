<template>
  <div>
    <el-button class="addButton" type="primary" @click="addHospital">添加医院</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      border>
      <el-table-column
        label="创建时间"
        prop="updatedAt">
      </el-table-column>
      <el-table-column
        label="医院LOGO">
        <template slot-scope="scope">
          <img class="logo" :src="scope.row.logo" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="医院名"
        prop="name">
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
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <div class="pageWrap">

    </div>
  </div>
</template>

<script>
import { getUser, getHospitalList, deleteHospital } from '../api/index.js'
import { getDate } from '../utils/axios.js'
import { Message } from 'element-ui';

  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted() {
      // getUser({}).then(res => {
      //   console.log('res: ' ,res)
      // })
      this.getList()
    },
    methods: {
      getList() {
         getHospitalList().then(res => {
          console.log('res: ', res);
            this.tableData = res.data
            this.tableData.map(item => {
              item.updatedAt = getDate(item.updatedAt)
              return item
            })
        })
      },
      addHospital() {
        this.$router.push('/hospitalEdit')
      },
      editClick(e) {
        this.$router.push('/hospitalEdit?id='+ e.id)
      },
      deleteClick(e) {
        deleteHospital({
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

