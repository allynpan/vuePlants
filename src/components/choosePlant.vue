<template>
    <div class="main">
        <div class="group">
            <el-button type="primary" @click="addPlantAddress()">增加一个选园定植记录</el-button>
        </div>
        <div class="table">
            <el-table :data="chooseList"
            border
            style="width:100%" >
                <el-table-column
                    type="selection">
                </el-table-column>
                <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column
                    prop="plantName"
                    label="农产品名"
                    >
                </el-table-column>
                <el-table-column
                    prop="plantation"
                    label="产园名"
                    >
                </el-table-column>
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="check(scope.row)" size="small">查看</el-button>
                        <el-button type="text" @click="update(scope.row)" size="small">编辑</el-button>
                        <el-button type="text" @click="deleteRow(scope.row)" size="small">删除</el-button>
                    </template>
                </el-table-column>
                <el-pagination
                    @size-change="sizeChange"
                    @current-change="currentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size= pagesize
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="length" background>
                </el-pagination>
            </el-table>
            
            
        </div>
    </div>


</template>

<script>
export default {
    name:'choosePlant',
    data(){
        return{
            chooseList:[],
            username:'',
            pagesize:5,
            currentPage:1,
            length:''
        }
    },
    methods:{
        addPlantAddress(){
            alert("增加一个选园定植记录")
        },
        InitList(){
            this.$http.push('api/informationBefo/getPlantAndPlace',{username:this.username}).then(res=>{
                console.log(res)
                
            })
        }
    },
    created(){
        
    }
}
</script>

<style>

.main{
    padding: 0;
    margin: 0;
    
}

.Group{
    padding: 10px;
    
}

.table{
    padding-top: 10px;
    
}

</style>
