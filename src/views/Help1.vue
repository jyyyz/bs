<template>
  <div class="helpContainer">
    <el-form :model="helpForm" ref="helpForm">
      <!-- 图片上传组件辅助-->
      <el-upload
          class="avatar-uploader"
          action=""
          accept="image/jpg, image/jpeg, image/png, image/gif"
          :http-request="upload"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :show-file-list="false">
          <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form-item prop="helpTitle">
        <el-input type="text" style="width:91%" auto-complete="false" v-model="helpForm.helpTitle" placeholder="求助标题"></el-input>
      </el-form-item>
      <el-form-item prop="helpIntroduce">
        <el-input type="text" style="width:100%" auto-complete="false" v-model="helpForm.helpIntroduce" placeholder="求助内容描述"></el-input>
      </el-form-item>
      <el-button type="success" class="helps" @click="helpSubmit">发布求助</el-button>
      <quill-editor  
          class="info-editor"  
          v-model="helpForm.helpInformation" 
          ref="QuillEditor" 
          :options="editorOption" 
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
          >
      </quill-editor>
    </el-form>
  </div>
</template>

<script>
	import { quillEditor } from "vue-quill-editor";
	import { addQuillTitle } from './utils/quill-title.js';

	import "quill/dist/quill.core.css";
	import "quill/dist/quill.snow.css";
	import "quill/dist/quill.bubble.css";

    // 工具栏配置
    const toolbarOptions = [
	  ['bold', 'italic', 'underline', 'strike'],        // 加粗，斜体，下划线，删除线
	  ['blockquote', 'code-block'],                     //引用,代码块
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

export default {
  name: 'Help1',
  data() {
      return {
        editorOption: {
          placeholder: '请输入求助内容',
          theme: 'snow', //主题风格
          modules: {
            toolbar: {
              container: toolbarOptions, // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    document.querySelector('#quill-upload input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        }, // 富文本编辑器配置
        helpForm:{
          helpTitle:'',
          helpInformation:''//富文本内容
        }
        //content: '', 
      }
  },
  components: {
      quillEditor
   },
  mounted(){
	  addQuillTitle();
	},
  methods: {
    helpSubmit(){
      if(this.helpForm.helpInformation===''){
        this.$message.error('内容不能为空')
        return    
      }else{
        this.helpForm.helpInformation = this.helpForm.helpInformation.replace(/<[^<>]+>/g, "").replace(
        /&nbsp;/gi,
        "")
        this.$refs.helpForm.validate((valid) => {
          if (valid) {
            this.postRequest('/help-information/addHelp',this.helpForm).then(resp => {
              if(resp) {
                location.reload()
              }
            })
          }
        });
      }
    },
    onEditorBlur(){},
    onEditorFocus(){},
    onEditorChange(){},
    // 上传图片前
    beforeUpload(res, file) {
      const isJPG = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg' 
		  const isLt1M = file.size / 1024 / 1024 < 1
		  if (!isJPG) {
		    this.$message.error('支持JPG、PNG格式的图片，大小不得超过1M')
		  }
		  if (!isLt1M) {
		    this.$message.error('文件最大不得超过1M')
		  } 
		  return isJPG && isLt1M
    },
    // 上传图片成功
    uploadSuccess(res, file) {
      let quill = this.$refs.QuillEditor.quill;
      let length = quill.getSelection().index;
      quill.insertEmbed(length, 'image', url);
      quill.setSelection(length+1)
    },
    // 上传图片失败
    uploadError(res, file) {
      this.$message.error('图片插入失败')
    },
    // 上传图片处理过程
    upload(req){}
  }
}
</script>

<style>
.helpContainer{
  margin-top: 10px;
}
.helps{
  position:absolute;
  top:42px;
  right: 20px;
}
.avatar-uploader{
	display: none;
}
.ql-editor{
  min-height: 500px;
}
</style>