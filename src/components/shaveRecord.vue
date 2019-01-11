<template>
    <div>
        <div class="block">
            <el-button type="primary" @click="text()">点击测试</el-button>
        </div>
        <el-table :data="recordList"
            border
            style="width:100%">
            <el-table-column
                type="selection">
            </el-table-column>
            <el-table-column
                type="index">
            </el-table-column>
            <el-table-column
                prop="name"
                label="农产品"
            >
            </el-table-column>
            <el-table-column
                prop="method"
                label="修剪方法"
            >
            </el-table-column>
            <el-table-column
                prop="number"
                label="数量"
            >
            </el-table-column>
            <el-table-column
                prop="time"
                label="修剪时间"
            >
            </el-table-column>
            <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button type="text" @click="check(scope.row)" size="small">查看</el-button> -->
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
</template>

<script>
export default {
    name:'shaveRecord',
    data(){
        return{
            username:'',
            pagesize:5,
            currentPage:1,
            length:'',
            recordList:[]
        }
    },
    methods:{
        InitList(){
            this.$http.post('api/informationBefo/getAllShaveRecord',
                {pageNum:this.currentPage,pageSize:this.pagesize,username:this.$store.state.user.username}).then(res=>{
                console.log(res)
                this.recordList = []
                var tempList = res.body.obj
                for(var i=0;i<tempList.length;i++){
                    var temp = {}
                    temp.method = tempList[i].method
                    temp.number = tempList[i].number
                    temp.time = tempList[i].time
                    temp.statue = tempList[i].statue
                    temp.remark = tempList[i].remark
                    temp.name = tempList[i].name
                    this.recordList.push(temp)
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
        getNum(){
            this.$http.post('api/informationBefo/getShaveRecordNum',{username:this.$store.state.user.username}).then(res=>{
                console.log(res)
                if(res.body.status==200){
                    this.length = res.body.obj
                }
                
            })
        },
        currentChange(currentPage){
            console.log("currentPage:"+currentPage)
            console.log("this.currentPage:"+this.currentPage)
            this.currentPage = currentPage
            this.$http.post('api/informationBefo/getAllShaveRecord',{pageNum:this.currentPage,pageSize:this.pagesize,username:this.$store.state.user.username}).then(res=>{
                console.log(res)
                this.recordList = []
                var tempList = res.body.obj
                for(var i=0;i<tempList.length;i++){
                    var temp = {}
                    temp.method = tempList[i].method
                    temp.number = tempList[i].number
                    temp.time = tempList[i].time
                    temp.statue = tempList[i].statue
                    temp.remark = tempList[i].remark
                    temp.name = tempList[i].name
                    this.recordList.push(temp)
                }
            })
        },
        sizeChange(size){
            console.log("size:"+size+"this.pageSize"+this.pagesize)
            this.pagesize = size
            this.currentPage = 1
            console.log("size:"+size+"this.pageSize"+this.pagesize)
            this.$http.post('api/informationBefo/getAllShaveRecord',{pageNum:this.currentPage,pageSize:this.pagesize,username:this.$store.state.user.username}).then(res=>{
                console.log(res)
                this.recordList = []
                var tempList = res.body.obj
                for(var i=0;i<tempList.length;i++){
                    var temp = {}
                    temp.method = tempList[i].method
                    temp.number = tempList[i].number
                    temp.time = tempList[i].time
                    temp.statue = tempList[i].statue
                    temp.remark = tempList[i].remark
                    temp.name = tempList[i].name
                    this.recordList.push(temp)
                }
            })
        }
    },
    created(){
        this.InitList()
        this.getNum()
    },
    
}
</script>

<style>

</style>
