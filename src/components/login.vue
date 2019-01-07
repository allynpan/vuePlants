
<template>
    <div id="app">
        <el-form :model="form" ref="form" label-width="140px" class="form1">
            <el-form-item label="">
                <h1 style="text-align:center">欢迎登录农产品管理系统</h1>
            </el-form-item>
            <el-form-item label="账号：">
                <el-input v-model="form.username"> </el-input>
            </el-form-item>
            <el-form-item label="密码：">
                <el-input type="password" v-model="form.password"> </el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="margin-left:50px" type="primary" @click="login()">登录</el-button>
                <el-button style="margin-left:100px;" @click="displaydialog = true">注册</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            title="注册界面"
            :visible.sync="displaydialog"
            width="30%">
            <el-form :model="register" ref="register" label-width="140px">
                <el-form-item label="账号：">
                    <el-input v-model="register.username"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                    <el-input v-model="register.password"></el-input>
                </el-form-item>
                <el-form-item label="电子邮件：">
                    <el-input v-model="register.emdil"></el-input>
                </el-form-item>
                <el-form-item label="厂商名称：">
                    <el-input v-model="register.nickname"></el-input>
                </el-form-item>
                <el-form-item label="地址：">
                    <el-input v-model="register.address"></el-input>
                </el-form-item>
                <el-form-item label="电话：">
                    <el-input v-model="register.phone"></el-input>
                </el-form-item>
            </el-form>
            
            <span slot="footer">
                <el-button @click="displaydialog = false">取 消</el-button>
                <el-button type="primary" >确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
    
</template>
<script>
import md5 from 'js-md5';
export default {
    name:'admin',
    data(){
        return { 
            form:{
               username:'',
               password:''
            },
            register:{
              username:'',
              password:'',
              email:'',
              nickname:'',
              address:'',
              phone:''  
            },
            radio:'',
            displaydialog:false
        }
    },
    methods:{
        test(username){
            alert(username);
        },
        login(){// 用户登录
            var password = this.form.password
            var pwd = md5(password)
            console.log(pwd)
            this.$http.post('api/login',{username:this.form.username,password:pwd}).then(function(res){
                //document.write(res.body);
                console.log(res);
                if(res.body.status=="success"){
                    this.$message('登录成功')
                    this.$store.commit('login',res.body.msg)
                    this.$router.push({path:'mainpage',query:{username:this.form.username}})
                }else{
                    alert("登录失败")
                }
            },function(res){
                alert(res.status-line)
            });
        },
        //下面设置几个表单验证的代码
        register(){
            var password = this.register.password;
            var pwd = md5(password);
            console.log(pwd);
            this.$http.post('api/User/register',{username:this.register.username,password:pwd,email:this.register.email,
                nickname:this.register.nickname,address:this.register.address,phone:this.register.phone}).then(function(res){
                    console.log(res)
                    if(res.status==200){
                        this.$message({
                            message: 'ok',
                            type: 'info',
                            showClose: true,
                        });
                        
                    }
                })
        },
        checkUsername(){
            if(this.username==null){
                this.$message('用户名不能为空');
            }
        },
        checkPassword(){
            if(this.password==null){
                this.$message('密码不能为空');
            }
        }
    }
}
</script>


<style>

.form1{
    margin: 0 auto;
    width: 500px;   
    height: 300px;
    margin-top: 10%;
}



</style>
