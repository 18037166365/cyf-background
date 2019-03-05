<template>
    <div>
        <!-- 图片上传组件辅助-->
        <el-upload
          class="editor-uploader"
          :action="serverUrl"
          name="img"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :before-upload="beforeUpload">
        </el-upload>
        <!--富文本编辑器组件-->
       <el-row v-loading="quillUpdateImg">
        <quill-editor
            v-model="detailContent"
            ref="myQuillEditor"
            :options="editorOption"
            @change="onEditorChange($event)"
            @ready="onEditorReady($event)"
        >
        </quill-editor>
       </el-row>
    </div>
</template>
<script>
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
]
import baseUrl from '../utils/baseurl.js'
const uploadUrl = 'http://upload.nlxiaoniao.cn'

    export default {
      props: {
        editorContent: {
          type: String,
          default: ''
        },
      },
        data() {
            return {
                quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                serverUrl: uploadUrl+ 'upload',  // 这里写你要上传的图片服务器地址
                // header: {token: sessionStorage.token},  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
                detailContent: '', // 富文本内容
                editorOption: {
                  placeholder: '',
                  theme: 'snow',  // or 'bubble'
                  modules: {
                    toolbar: {
                      container: toolbarOptions,  // 工具栏
                      handlers: {
                        'image': function (value) {
                          if (value) {
                              document.querySelector('.editor-uploader input').click()
                          } else {
                            this.quill.format('image', false);
                          }
                        }
                      }
                    }
                  }
                },
                }
        },
        methods: {
            beforeUpload() {
                // 显示loading动画
                this.quillUpdateImg = true
            },

            uploadSuccess(res, file) {
                // res为图片服务器返回的数据
                // 获取富文本组件实例
                let quill = this.$refs.myQuillEditor.quill
                // 如果上传成功
                if (res.code === 0 && res.imgUrl !== null) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片  res.info为服务器返回的图片地址
                    quill.insertEmbed(length, 'image', res.imgUrl)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    this.$message.error('图片插入失败')
                }
                // loading动画消失
                this.quillUpdateImg = false
            },

            // 富文本图片上传失败
            uploadError(err) {
              console.log(err)
                // loading动画消失
                this.quillUpdateImg = false
                this.$message.error('图片插入失败')
            },
            onEditorChange() {
              console.log('onEditorChange', this.detailContent)
              this.$emit('updateContent', this.detailContent)
            },
            onEditorReady() {
              this.detailContent = this.editorContent
            },
        },
        watch: {
          editorContent(newValue, oldValue) {
             this.detailContent = newValue
          }
        },

    }
</script>
