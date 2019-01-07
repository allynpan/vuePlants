<template>
    <div style="height:100%">
        
        
        <div id="midDiv" class="forMidDiv">
            <h1>产前信息化</h1>
        </div>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="选园定植" name="first">
                <el-steps :active="active" align-center>
                    <el-step :title="选园种植" :description="选择对应的种植园并对其进行选园种植"></el-step>
                    <el-step :title="选园种植" :description="选择对应的种植园并对其进行选园种植"></el-step>
                </el-steps>
                 <el-form v-if="show" :model="plantation" ref="plantation" label-width="80px" class="form">
                        <el-form-item label="">
                            <el-input v-model="plantation.name"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">立即创建</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>

        <el-button type="primary" @click="test()">测试用按钮</el-button>
        
        
    </div>


</template>

<script>
export default {
    name:'TSB_info',
    data(){
        return{
            username:'',
            activeName2: 'first',
            active:'',
            plantation:{
                value:'', //果树园的选择
                name:'',
            },
            show:true,

        }
    },
    created(){
        this.username = this.$store.state.user.username
    },
    methods:{
        test(){
            this.show=!this.show
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }


}
</script>

<style>

.forMidDiv{
    padding-left: 35px;
    margin:auto;
    border-style: solid;
    border-color: #D5D6E2;
    border-right: none;
    border-left: none;
}

.row{
    padding: 100px;
    margin: auto;
}

.form{
    padding-top: 35px;
}

</style>
