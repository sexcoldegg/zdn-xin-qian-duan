<template>
    <div>

      <el-upload
        ref="uploadanli"
        action="http://localhost:8888/user/uploadAnli"
        name="file"
        :multiple="multiple"
        :file-list="filelistanli"
        list-type="picture-card"
        :auto-upload="autouploadanli"
        :limit="limitamli"
        :before-upload="beforeUploadAnli"
        :on-remove="removeImage"
        :data="mydata"
        >
        <i class="el-icon-plus"></i>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <br>

      <el-form :model="ruleForm2" :inline="true"
               ref="ruleForm2"
               class="demo-ruleForm">

        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm2.userName"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="loginName">
          <el-input v-model="ruleForm2.loginName"></el-input>
        </el-form-item>

        <br>
        <el-form-item>
          <el-button type="primary" @click="submitFormAnli('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
</template>

<script>

    export default {
        name: "userUpdateInfo",
        data(){
          return{
            multiple:true,
            autouploadanli:false,
            limitamli:2,
            ruleForm2:{
              userName:'',
              loginName:''
            },
            mydata:{},
            filelistanli:[]
          }
        },
        methods:{
          removeImage(file, fileList){
            alert("8888");
            this.$refs.uploadanli.fileList[0].status=""
          },
          beforeUploadAnli(file){//限制上传文件的格式个大小
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size/1024 /1024 <2;
            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
          },
          submitFormAnli(formid){
             this.$data.mydata=this.$data.ruleForm2
             if(this.$refs.uploadanli.fileList[0]!=null&&this.$refs.uploadanli.fileList[0].status=="success"){
               //只更新数据
               this.$axios.post(this.domain.serverpath+"user/onlyUpdateUserInfo",JSON.stringify(this.$data.ruleForm2)).then((response)=>{
                  alert("ok")
               }).catch((erorr)=>{

               })
             }else{
               this.$refs.uploadanli.submit()
             }
          },
          toSetData(row){
              this.$data.ruleForm2=row
              let ff={}
               ff.name=row.userName;
               ff.url="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg";
               this.$data.filelistanli=[]
               this.$data.filelistanli.push(ff)
          }
        }
    }
</script>

<style scoped>

</style>
