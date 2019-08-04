<template>
  <div>
    <el-upload
      :auto-upload="autoupload1"
      action="http://localhost:8888/user/addUserInfo"
      list-type="picture-card"
      :limit="fileNumber1"
      :file-list="fileList21"
      :on-remove="removeImage"
      ref="upload1"
      :data="userdata1"
      >

      <i class="el-icon-plus"></i>
    </el-upload>
    <br>
    <!-- 用户的form表单 -->
    <el-form :inline="true"  :model="formInline1" size="mini" class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="formInline1.userName" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="登录名">
        <el-input v-model="formInline1.loginName" placeholder="登录名"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio-group v-model="formInline1.sex">
          <el-radio-button label="男" name="sex" class="el-icon-edit"></el-radio-button>
          <el-radio-button label="女" name="sex"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <br>
      <el-form-item label="密码">
        <el-input v-model="formInline1.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="确认密码">
        <el-input v-model="formInline1.password2" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
    </el-form>

    <el-button type="success" size="small" @click="submitUpload1">保存</el-button>
    <el-button type="danger" size="small" @click="formReset1">重置</el-button>
  </div>
</template>

<script>
    export default {
        name: "userUpdate",
      data(){
        return{
          autoupload1:false,
          fileNumber1:1,
          fileList21:[],
          formInline1:{//用户的文字数据
            userName:'',
            password:'',
            password2:'',
            sex:'',
            buMen:''
          },
          userdata1:{

          }
        }
      },
      methods:{
        removeImage(file, fileList){
          this.$refs.upload1.fileList[0].status=""
        },
        toupdateusrInfo(rowdata){//用来做修改的数据回显
          //设置用户数据
          this.$data.formInline1=rowdata
          //设置图片数据,用
          var ff={}
          ff.name=rowdata.userName
          if(rowdata.path!=null||rowdata.path!=''){
            this.$data.fileList21=[]
            ff.url='https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg'
            this.$data.fileList21.push(ff)
          }
        },
        submitUpload1() {//提交表单的时候检测非空
          let canshu=JSON.stringify(this.$data.formInline1);
          this.$data.userdata1.canshu=canshu
          //说明当前有更新图片
          if(this.$refs.upload1.fileList[0]!=null&&this.$refs.upload1.fileList[0].status!="success"){
             this.$refs.upload1.submit();//
          }else {
            //否则说明没有更新图片则只更新数据
            this.$axios.post(this.domain.serverpath+"user/onlyUpdateUserInfo",JSON.stringify(this.$data.formInline1)).then((response)=>{

            }).catch((erorr)=>{

            })
          }
          //this.$refs.upload1.submit();
        },
        beforeFileupload(file){//文件上传之前
           alert(file)
        },
        handleRemove1(file, fileList) {
          console.log(file, fileList);
        },
        onFileSuccess1(response, file, fileList) {
          //重置表单，关闭天窗
          //清除图片
          this.$data.fileList21=[]
          //清除form表单的内容
          this.$data.formInline1={}
          //关闭弹出层

        },
        formReset1(){
          //清除图片
          this.$data.fileList21=[]
          //清除form表单的内容
          this.$data.formInline1={}
        }
      }
    }
</script>

<style scoped>

</style>
