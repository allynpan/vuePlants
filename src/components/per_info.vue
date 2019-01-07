<template>
    <div id="personer_info">
        <div>
            <el-form :model="form" ref="user" label-width="120px" style="margin-top:30px;width:700px">
                <el-form-item label="昵称：">
                    {{form.nickname}}
                </el-form-item>
                <el-form-item label="地址：">
                    {{form.address}}
                </el-form-item>
                <el-form-item label="电子邮件：">
                    {{form.email}}
                </el-form-item>
                <el-form-item label="电话：">
                    {{form.phone}}
                </el-form-item>
                <el-form-item>
                    <el-button style="float:left" type="primary" @click="dialogVisible = true">修改信息</el-button>
                </el-form-item>
            </el-form>
            
        </div>
        <el-dialog
        title="修改账号信息"
        :visible.sync="dialogVisible">
        <el-form :model="form" ref="form" label-width="80px">
            <el-form-item label="昵称">
                <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="电子邮件">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateUser()">修改</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
        </el-dialog>
    </div>
    
</template>

<script>
export default {
    name:'per_info',
    data(){
        return{
        username: '',
        name: '',
        address: '',
        email: '',
        phone:'', 
        dialogVisible: false,
        form:{
            nickname:'',
            address:'',
            email:'',
            phone:''
        }

        }
    },
    methods:{
        initPer_info(userName){ //  初始化用户信息
               this.$http.post('api/User/getPer_info',{username:userName}).then(function(res){
                   console.log(res)
                   if(res.status==200){
                    this.name = res.body.obj.nickname
                    this.address=res.body.obj.address
                    this.email=res.body.obj.email
                    this.phone=res.body.obj.phone
                    this.form.nickname=res.body.obj.nickname
                    this.form.address=res.body.obj.address
                    this.form.email=res.body.obj.email
                    this.form.phone=res.body.obj.phone
                   }else{
                       this.$message({
                           message: '网络连接失败！！',
                           type: 'info',
                           showClose: true,
                       });
                   }
               })
        },
        updateUser(){ //  更新用户信息
            this.$http.post('api/User/updatePer_info',{username:this.username,nickname:this.form.nickname,
                address:this.form.address,email:this.form.email,phone:this.form.phone}).then(function(res){
                    console.log(res)
                    if(res.status==200){
                        if(res.body.msg=="ok"){
                            //此时完成更新
                            this.$message({
                                message: '用户信息更新成功',
                                type: 'info',
                                showClose: true,
                            });
                            this.name=this.form.nickname
                            this.address=this.form.address
                            this.email=this.form.email
                            this.dialogVisible=false
                        }else{
                            //用户信息更新失败
                            this.$message({
                                message: '用户信息更新失败',
                                type: 'info',
                                showClose: true,
                            });
                            
                        }
                    }
                })
        }
    },
    beforeCreate(){
       
    },
    created(){
        this.username = this.$store.state.user.username
    },
    mounted(){
        //进入页面首先对数据进行更新
        this.initPer_info(this.username)
    },

}
</script>

<style>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 10px;
  }


</style>
