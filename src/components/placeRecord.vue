<template>
    <div class="main">
        <div class="group">
            <el-button type="primary" @click="InitList()">增加一个果园信息记录</el-button>
        </div>
        <div class="table">
            <el-table :data="placeList"
            border
            style="width:100%" >
                <el-table-column
                    type="selection">
                </el-table-column>
                <el-table-column
                    type="index">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="产园名"
                    >
                </el-table-column>
                <el-table-column
                    prop="moisture"
                    label="土壤墒情（即土壤含水量）"
                    >
                </el-table-column>
                <el-table-column
                    prop="temperature"
                    label="产园气温"
                    >
                </el-table-column>
                <el-table-column
                    prop="tech"
                    label="栽种技术"
                    >
                </el-table-column>
                
                <el-table-column
                    prop="time"
                    label="记录时间"
                    :formatter="dateFormat"
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
            </el-table>
            <el-pagination
                    @size-change="sizeChange"
                    @current-change="currentChange"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size= pagesize
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="length" background>
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { formatDate } from '../unit/date.js'
import Vue from 'vue';
export default {
    name:'choosePlant',
    data(){
        return{
            placeList:[],
            username:'',
            pagesize:5,
            currentPage:1,
            length:6
        }
    },
    methods:{
        addPlantAddress(){
            alert("增加一个选园定植记录")
        },
        InitList(){
            this.$http.post('api/informationBefo/getAllPlantRecord',{pageNum:this.currentPage,pageSize:this.pagesize,username:this.$store.state.user.username}).then(res=>{
                console.log(res)
                this.placeList = []
                if(res.status==200){
                    var temp = res.body.obj
                    for(var i=0;i<temp.length;i++){
                        var tempList={}
                        tempList.name = temp[i].name
                        tempList.moisture = temp[i].moisture
                        tempList.temperature = temp[i].temperature
                        tempList.tech = temp[i].tech
                        tempList.time = temp[i].time
                        tempList.remark = temp[i].remark
                        this.placeList.push(tempList)
                    }
                    console.log(this.placeList)
                }else{
                    <el-alert title="网络连接出错" type="info" show-icon></el-alert>      
                }
            })

        },
        dateFormat(row, column, cellValue, index){
            const daterc = row[column.property]
            if(daterc!=null){
                const dateMat = new Date(daterc)
                const year = dateMat.getFullYear();
                const month = dateMat.getMonth() + 1;
                const day = dateMat.getDate();
                const timeFormat= year + "/" + month + "/" + day;
                return timeFormat
            }
        },
        currentChange(currentPage){
            console.log("currentPage:"+currentPage)
            console.log("this.currentPage:"+this.currentPage)
            this.currentPage = currentPage
            this.$http.post('api/informationBefo/getAllPlantRecord',{pageNum:this.currentPage,pageSize:this.pagesize,username:this.$store.state.user.username}).then(res=>{
                console.log(res)
                this.placeList = []
                if(res.status==200){
                    var temp = res.body.obj
                    for(var i=0;i<temp.length;i++){
                        var tempList={}
                        tempList.name = temp[i].name
                        tempList.moisture = temp[i].moisture
                        tempList.temperature = temp[i].temperature
                        tempList.tech = temp[i].tech
                        tempList.time = temp[i].time
                        tempList.remark = temp[i].remark
                        this.placeList.push(tempList)
                    }
                    console.log(this.placeList)
                }else{
                    <el-alert title="网络连接出错" type="info" show-icon></el-alert>      
                }
            })
        },
        sizeChange(size){
            console.log("size:"+size+"this.pageSize"+this.pagesize)
            this.pagesize = size
            this.currentPage = 1
            console.log("size:"+size+"this.pageSize"+this.pagesize)
            this.$http.post('api/informationBefo/getAllPlantRecord',{pageNum:this.currentPage,pageSize:this.pagesize,username:this.$store.state.user.username}).then(res=>{
                console.log(res)
                this.placeList = []
                if(res.status==200){
                    var temp = res.body.obj
                    for(var i=0;i<temp.length;i++){
                        var tempList={}
                        tempList.name = temp[i].name
                        tempList.moisture = temp[i].moisture
                        tempList.temperature = temp[i].temperature
                        tempList.tech = temp[i].tech
                        tempList.time = temp[i].time
                        tempList.remark = temp[i].remark
                        this.placeList.push(tempList)
                    }
                    console.log(this.placeList)
                }else{
                    <el-alert title="网络连接出错" type="info" show-icon></el-alert>      
                }
            })
        },
        getNum(){
            this.$http.post('api/informationBefo/getPlaceRecordNum',{username:this.$store.state.user.username}).then(res=>{
                console.log(res)
                if(res.status==200){
                    var temp = res.body.obj
                    this.length = temp
                }
            })
        },
        update(row){
            alert("编辑数据")
        },
        deleteRow(row){
            alert("删除数据")
        }
    },
    created(){
        this.InitList()
        this.getNum()
    },
    
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
