<template>
  <div>
    <el-button class="addButton" type="primary" @click="addNews">添加新闻</el-button>
    <el-table
      :data="tableData"
      style="width:100%"
      border>
      <el-table-column
        label="标题"
        prop="title">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="updatedAt">
      </el-table-column>
      <el-table-column
        label="来源"
        prop="from">
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
       <el-pagination
        v-show="count>10"
        background
        @current-change="currentChange"
        layout="prev, pager, next"
        :total="count">
      </el-pagination>
  </div>
</template>

<script>
import { getNewsList, addNews, deleteNews } from '../api/index.js'
import { getDate } from '../utils/axios.js'
import { Message } from 'element-ui';

  export default {
    data() {
      return {
        tableData: [],
        count: 0,
        page: 1
      }
    },
    mounted() {
      this.getList()
    },
    computed: {
      html() {
        return this.tableData[0].content
      }
    },
    methods: {
      getList() {
        getNewsList({
          page: this.page,
        }).then(res => {
          console.log('res: ', res);
            this.tableData = res.data
            this.count = res.count;
            this.tableData.map(item => {
              item.updatedAt = getDate(item.updatedAt)
              return item
            })
          })
      },
      currentChange(e){
        this.page = e;
        this.getList()
      },
      addNews() {
        this.$router.push('/newsEdit')
      },
      editClick(e) {
        this.$router.push('/newsEdit?id='+ e.id)
      },
      deleteClick(e) {
        deleteNews({
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

