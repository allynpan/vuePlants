<script src="//unpkg.com/element-ui@2.4.11/lib/index.js"></script>
<template>
    <div id="home" style="height:100%">
        <el-container id="head" style="height:10%; background-color: rgb(64, 158, 255);">
        <header class="el-header" style="width:42.332%;" >
            <div id="logo">
                农产品管理系统
            </div>
        </header>
        <div id="emnu"></div>
            <div id="menu">
                <el-dropdown style="font-size:14px; display:inline-block; position:relative;" trigger="click">
                    <span class="el-dropdown-link" style="color:#fff; text-align:right;">
                    {{username}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" unique-opened router>
                    <el-dropdown-item @click.native="goPe_info()">个人信息</el-dropdown-item>
                    <el-dropdown-item @click="exit()">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-container>
        <el-row style="height:90%;">
            <el-col :span="4" style="background:#545c64;min-height:100%">
                <el-menu  
                :default-active="['1', '2']" 
                class="el-menu-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                style="min-height: 100%;" router>
                    <el-submenu index="1" style="height:auto;">
                    <template slot="title"><i class="el-icon-message"></i>农产品生产技术服务</template>
                        <el-menu-item index="/Technology_before" >产前技术服务</el-menu-item>
                        <el-menu-item index="/Technology_Mid">产中技术服务</el-menu-item>
                        <el-menu-item index="1-3" >产后技术服务</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2" style="height:auto;">
                    <template slot="title"><i class="el-icon-message"></i>农产品生产信息服务</template>
                    <el-menu-item-group>
                        <template slot="title">产前信息化</template>
                        <el-menu-item index="/info/plantation">果园环境信息查询</el-menu-item>
                        <el-menu-item index="/info/choosePlant">选园定植</el-menu-item>
                        <el-menu-item index="/info/placeRecord">果园信息记录表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">产中信息化</template>
                        
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">产后信息化</template>
                    </el-menu-item-group>
                    
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="20" style="padding:10px">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
						{{ item.name }}
					</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="20" class="content-wrapper" style="height:100%">
                    <transition name="fade" mode="out-in">
                        <router-view> </router-view>
                    </transition>   
            </el-col>
        </el-row>
    </div>
</template>


<script>
export default {
    name: 'home',
    data(){
        return
        {
            username:''
        }
    },
    created(){
        this.username = this.$store.state.user.username
        console.log(this.username)
    },
    methods:{
        goPe_info(){
            this.$router.push({path:'/per_info',query:{username:this.username}})
        },
        exit(){
            this.$store.commit('logout')
            this.$router.push('/login')
        }
    }

    
}
</script>

<style>

#home{
    position:absolute;
    width: 100%;
    height: 80px;
    margin: 0;
    padding: 0;
}
#logo{
    height: 80px;
    font-size: 22px;
    padding-left:20px;
    padding-right: 20px;
    border-color: hsla(62, 77%, 76%, .3);
    border-right-width: 1px;
    border-right-style: solid;
}

#head{
    line-height: 80px;
    color:#fff;
}

#emnu{
    width:41%;
}

#menu{
    text-align: right;
    padding-right: 35px;
    float: right;
    width: 16.667%
}
</style>
