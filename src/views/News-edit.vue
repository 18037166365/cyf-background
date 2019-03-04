<template>
  <div>
    <el-form  v-loading="quillUpdateImg" ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="来源">
        <el-input v-model="form.from"></el-input>
      </el-form-item>
      <el-form-item label="详情">
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
import { addNews, getNewsList } from '../api/index.js'
import { Message } from 'element-ui';
import { baseUrl } from '../utils/baseurl.js'

export default {
    components: {
      Editor
    },
    data() {
      return {
        quillUpdateImg: false,
        id: this.$route.query.id || null,
        editorContent: '',
        count: 0,
        form: {
          title: '',
          content: '',
          hospitalImg: '',
          from: '爱泰健康',
        }
      }
    },
    created() {
      if(this.id) {
        getNewsList({
          id: this.id,
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
        console.log('save')
        console.log(this.form.content)
        addNews({...this.form, id: this.id}).then(res => {
          console.log(res)
          setTimeout(() => {
            if(res.code ===0) {
              this.quillUpdateImg = false
              Message({
                message: res.msg,
                type: 'success'
              });
            }
          }, 50)
        }, err=> {
          this.quillUpdateImg = false
        })
      },
      updateContentTodo(e) {
        console.log('updateContent', e)
        this.form.content = e;
      },
      uploadError(err) {
        console.log('err: ', err);

      },
      handleAvatarSuccess(res, file) {
        console.log('suc', res, file)
        this.form.hospitalImg = URL.createObjectURL(file.raw);
      },
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
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
    width: 178px;
    height: auto;
    display: block;
  }
</style>
