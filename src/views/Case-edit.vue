<template>
  <div>
    <el-form  v-loading="quillUpdateImg" ref="form" :model="form" label-width="80px">
      <el-form-item label="图片(选填)">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="uploadError">
          <img v-if="form.headImg" :src="form.headImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
         <el-form-item label="案例标题">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="客户姓名">
        <el-input v-model="form.name" placeholder="李先生, 王小姐"></el-input>
      </el-form-item>
      <el-form-item label="客户年龄">
        <el-input v-model="form.age" placeholder="38岁, 35岁"></el-input>
      </el-form-item>
      <el-form-item label="案例详情">
        <Editor @updateContent="updateContentTodo" :editor-content="form.content"/>
      </el-form-item>
      <el-form-item>
        <el-button v-if="!id" type="primary" @click="onSubmit">立即创建</el-button>
        <el-button v-else type="primary" @click="onSubmit">立即保存</el-button>
        <el-button @click="$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from '@/components/editor'
import { addCase, getCaseList } from '../api/index.js'
import { Message } from 'element-ui';
import baseUrl from '../utils/baseurl.js'
console.log('baseUrl: ', baseUrl);

export default {
    components: {
      Editor
    },
    data() {
      return {
        uploadUrl: baseUrl+ 'upload',
        quillUpdateImg: false,
        id: this.$route.query.id || null,
        imageUrl: '',
        editorContent: 'hahaah',
        form: {
          title: '',
          name: '',
          age: '',
          content: '',
          headImg: '',
        }
      }
    },
    created() {
      if(this.id) {
        getCaseList({
          id: this.id
        }).then(res => {
          console.log(res)
          this.form = res.data
        })
      }
    },
    methods: {
      save() {
        console.log('save')
      },
      onSubmit() {
        this.quillUpdateImg = true
        addCase({...this.form, id: this.id}).then(res => {
          setTimeout(() => {
            this.quillUpdateImg = false
            if(res.code===0)
            Message({
              message: res.msg,
              type: 'success'
            });
          }, 500)
        }, err=> {
          this.quillUpdateImg = false
        })
      },
      updateContentTodo(e) {
        this.form.content = e;
      },
      uploadError(err) {
        console.log('err: ', err);
      },
      handleAvatarSuccess(res, file) {
        // this.form.logo = URL.createObjectURL(file.raw);
        this.form.headImg = res.imgUrl
      },
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isLt2M;
      }
    },
  }
</script>

<style >
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 300px;
    height: auto;
    display: block;
  }
</style>
