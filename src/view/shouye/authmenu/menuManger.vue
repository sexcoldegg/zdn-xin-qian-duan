<template>
   <div>
     <p>菜单列表</p>
     <el-input :style="{width:'50%'}"
       placeholder="输入关键字进行过滤"
       v-model="filterText">
     </el-input>

     <el-tree
       class="filter-tree"
       :data="data2"
       :props="defaultProps"
       default-expand-all
       show-checkbox
       :filter-node-method="filterNode"
       ref="tree2"
       @node-click="nodeClick"
       @node-contextmenu="youjishijian"
       >
     </el-tree>

     <el-dialog
       v-loading="loading2"
       element-loading-text="拼命处理中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
       :title="menuInfo"
       :visible.sync="dialogVisible"
       width="30%"
       >
       <el-row style="border-bottom: darkgrey 1px solid;margin-bottom:10px;">
       <el-tooltip class="item" effect="dark" content="点击添加菜单" placement="top-start">
         <el-button icon="el-icon-plus" circle @click="add" ></el-button>
       </el-tooltip>
       <el-tooltip class="item" effect="dark" content="点击更新当前信息" placement="top-start">
         <el-button type="primary" icon="el-icon-edit" circle @click="update2" ></el-button>
       </el-tooltip>
       <el-tooltip class="item" effect="dark" content="删除当前菜单" placement="top-start">
         <el-button type="danger" icon="el-icon-delete" circle @click="deleteone"></el-button>
       </el-tooltip>
       <el-tooltip class="item" effect="dark" content="添加一级菜单" placement="top-start">
         <el-button type="warning" icon="el-icon-star-off" circle @click="addFirst"></el-button>
       </el-tooltip>

       </el-row>

       <el-form
         ref="add" v-show="form1.form1show"
                :inline="true"
                v-model="form1"
                class="demo-form-inline">
          <i class="el-icon-plus" style="margin-top:10px" >添加子菜单</i>
          <br>
          <br>
         <el-form-item label="当前菜单等级:" >
           {{form1.parentLeval}}
         </el-form-item>
         <el-form-item label="当前菜单名称:" >
           {{form1.menuName}}
         </el-form-item>
         <el-form-item label="当前菜单ID:" >
            {{form1.parentId}}
         </el-form-item>
         <el-form-item label="新添加子菜单名称">
           <el-input v-model="form1.currMenuName"  maxlength="30"></el-input>
         </el-form-item>
         <el-form-item label="菜单访问URL">
           <el-input v-model="form1.url" ></el-input>
         </el-form-item>

         <el-form-item>
           <el-button type="primary" @click="saveMenu">保存</el-button>
           <el-button>取消</el-button>
         </el-form-item>
       </el-form>

       <el-form ref="update" v-show="form2.form2show" :inline="true" v-model="form2" class="demo-form-inline">
         <i class="el-icon-edit">修改菜单信息</i>
         <br>
         <br>
         <el-form-item label="当前菜单等级:">
           {{form2.parentLeval}}
         </el-form-item>
         <el-form-item label="当前菜单ID:">
            {{form2.parentId}}
         </el-form-item>
         <el-form-item label="当前菜单名称">
           <el-input v-model="form2.menuName" :style="{width:200+'px'}"></el-input>
         </el-form-item>
         <el-form-item label="菜单访问URL">
           <el-input v-model="form2.url" :style="{width:200+'px'}"></el-input>
         </el-form-item>

         <el-form-item>
           <el-button type="primary" @click="saveUpdate">保存修改</el-button>
           <el-button>取消</el-button>
         </el-form-item>

       </el-form>


       <el-form ref="addFirst" v-show="form4.form4show" :inline="true" v-model="form4" class="demo-form-inline">
         <i class="el-icon-plus" style="margin-top:10px"  >添加一级菜单</i>
         <br>
         <br>

         <el-form-item label="当前菜单名称">
           <el-input v-model="form4.menuName"  maxlength="10"></el-input>
         </el-form-item>

         <el-form-item>
           <el-button type="primary" @click="addFirstInfo">保存</el-button>
           <el-button>取消</el-button>
         </el-form-item>

       </el-form>


       <!--<span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
       </span>-->
   </el-dialog>


   </div>
</template>

<script>
    export default {
        name: "menuManger",
        data() {
          return {
            loading2:false,
            form1:{
              parentLeval:'',
              parentId:'',
              currMenuName:'',
              menuName:'',
              form1show:false,
              url:"",
            },
            form2:{
              parentLeval:'',
              parentId:'',
              menuName:'',
              form2show:false,
              url:"",
            },
            form4:{
              menuName:'',
              form4show:false,
            },
            parent:{
               id:'',
               leval:''
            },
            menuInfo:"",
            dialogVisible: false,
            filterText: '',
            data2: [],
            defaultProps: {
              id:'id',
              children: 'listMenu',
              label: 'label',
              leval:'leval',
              parentMenuId:'parentMenuId',
              url:'url'
            }
          }
        },
        watch: {
          filterText(val) {
            this.$refs.tree2.filter(val);
          }
        },
        methods:{
          deleteone(){//删除一个
            this.$data.form2.form2show=false;
            this.$data.form1.form1show=false;
            this.$data.form4.form4show=false;

             alert(this.$data.form1.parentId)
          },
          flashList(){
            this.$axios.post(this.domain.serverpath+"menu/treeMenu").then((reponse)=>{
              //为data中的listMenu赋值
              this.data2=reponse.data.result;
            }).catch((error)=>{
              console.log("===error==="+error.message);
            })
          },
          saveUpdate(){//保存修改 updateMenuInfo
              let menuIfo=this.$data.form2
              this.$axios.post(this.domain.serverpath+"/menu/updateMenuInfo",JSON.stringify(menuIfo)).then((response)=>{
                  this.$notify.success({
                    title: '提示',
                    message: '更新成功！'
                  });
                  //清空表单
                  this.$data.form2.form1show=false
                  //关闭弹出层
                  this.$data.dialogVisible=false
                  //刷新列表
                  this.flashList()
              }).catch((error)=>{

              })
          },
          addFirst(){
            this.$data.form2.form2show=false;
            this.$data.form1.form1show=false;
            if(this.$data.form4.form4show){
              this.$data.form4.form4show=false;
            }else{
              this.$data.form4.form4show=true;
            }
          },
          addFirstInfo(){
            //打开加载样式
            this.$data.loading2=true;
            //保存新增加的菜单数据
            let form1= this.$data.form4;
            //获取查询参数
            let qs=require("qs");
            this.$axios.post(this.domain.serverpath+"/menu/addMenu",qs.stringify(form1)).then((response)=>{
              this.$data.loading2=false;
              if(response.data.success!=null&&response.data.success=="ok"){
                //清空表单
                this.$data.form4={form1show:false}
                //关闭弹出层
                this.$data.dialogVisible=false
                //刷新列表
                this.flashList()
              }
            }).catch((error)=>{
              this.$data.loading2=false;
              this.$notify.error({
                title: '错误',
                message: '出问题了，数据处理失败！'
              });
            })
          },
          filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
          },
          youjishijian(data){

          },
          nodeClick(node){
              //弹出层
              this.$data.dialogVisible=true;
              this.$data.menuInfo="当前操作的菜单名称-"+node.label;
              this.$data.form1.parentId=node.id;
              this.$data.form1.parentLeval=node.leval;
              this.$data.form1.menuName=node.menuName;
              this.$data.form2.parentId=node.id;
              this.$data.form2.parentLeval=node.leval;
              this.$data.form2.menuName=node.label;
              this.$data.form2.url=node.url;
          },
          add(){
             this.$data.form4.form4show=false;
             this.$data.form2.form2show=false;
             if(this.$data.form1.form1show){
               this.$data.form1.form1show=false;
             }else{
               this.$data.form1.form1show=true;
             }
          },
          update2(){
            this.$data.form4.form4show=false;
            this.$data.form1.form1show=false;
            if(this.$data.form2.form2show){
              this.$data.form2.form2show=false;
            }else{
              this.$data.form2.form2show=true;
            }
          },
          saveMenu(){
             //打开加载样式
             this.$data.loading2=true;
             //保存新增加的菜单数据
             let form1= this.$data.form1;
             //获取查询参数
             let qs=require("qs");
             this.$axios.post(this.domain.serverpath+"/menu/addMenu",qs.stringify(form1)).then((response)=>{
               this.$data.loading2=false;
               if(response.data.success!=null&&response.data.success=="ok"){
                    //清空表单
                    this.$data.form1={form1show:false}
                    //关闭弹出层
                    this.$data.dialogVisible=false
                    //刷新列表
                    this.$axios.post(this.domain.serverpath+"/menu/treeMenu").then((reponse)=>{
                     //为data中的listMenu赋值
                     this.data2=reponse.data.result;
                    }).catch((error)=>{
                     console.log("===error==="+error.message);
                    })
                 }
             }).catch((error)=>{
                this.$data.loading2=false;
                 this.$notify.error({
                   title: '错误',
                   message: '出问题了，数据处理失败！'
                 });
             })
          }
        },
        mounted(){
          this.$axios.post(this.domain.serverpath+"menu/treeMenu").then((reponse)=>{
            //为data中的listMenu赋值
            this.data2=reponse.data.result;

          }).catch((error)=>{
            console.log("===error==="+error.message);

          })
        }
    }
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

</style>
