<template>
    <div>
        <h1>保花保果记录</h1>
        <div class="block">
            <el-button type="primary">点击测试</el-button>
        </div>
        <el-table :data="recordList"
            border
            style="width:100%"
        >
        <el-table-column
            type="selection">
        </el-table-column>
        <el-table-column
            type="index">
        </el-table-column>
        <el-table-column
            prop="name"
            label="农产品名"
        >
        </el-table-column>
        <el-table-column
            prop="num"
            label="数目（株/棵）"
        >
        </el-table-column>
        <el-table-column
            prop="square"
            label="面积"
        >
        </el-table-column>
        <el-table-column
            prop="time"
            label="时间"
            :formatter="dateFormat"
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
    name:'preserveRecord',
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
            this.$http.post('api/informationBefo/getAllPreserveRecord'
                ,{pageNum:this.currentPage,pageSize:this.pagesize
                ,username:this.$store.state.user.username}).then(res=>{
                    console.log(res)
                    this.recordList = []
                    if(res.status == 200){
                        var temp = res.body.obj
                        for(var i = 0;i<temp.length;i++){
                            var tempList = {}
                            tempList.place = temp[i].place
                            tempList.square = temp[i].square
                            tempList.num = temp[i].num
                            tempList.time = temp[i].time
                            tempList.method = temp[i].method
                            tempList.remark = temp[i].remark
                            tempList.executor = temp[i].executor
                            tempList.name = temp[i].name
                            this.recordList.push(tempList)
                        }
                        console.log(this.recordList)
                    }else{
                        <el-alert title="网络连接失败!" type="info" show-icon></el-alert>
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
            this.$http.post('api/informationBefo/getAllPreserveRecord'
                ,{pageNum:this.currentPage,pageSize:this.pagesize
                ,username:this.$store.state.user.username}).then(res=>{
                    console.log(res)
                    this.recordList = []
                    if(res.status == 200){
                        var temp = res.body.obj
                        for(var i = 0;i<temp.length;i++){
                            var tempList = {}
                            tempList.place = temp[i].place
                            tempList.square = temp[i].square
                            tempList.num = temp[i].num
                            tempList.time = temp[i].time
                            tempList.method = temp[i].method
                            tempList.remark = temp[i].remark
                            tempList.executor = temp[i].executor
                            tempList.name = temp[i].name
                            this.recordList.push(tempList)
                        }
                    }else{
                        <el-alert title="网络连接失败!" type="info" show-icon></el-alert>
                    }
                })
        },
        sizeChange(size){
            console.log("size:"+size+"this.pageSize"+this.pagesize)
            this.pagesize = size
            this.currentPage = 1
            console.log("size:"+size+"this.pageSize"+this.pagesize)
            this.$http.post('api/informationBefo/getAllPreserveRecord'
                ,{pageNum:this.currentPage,pageSize:this.pagesize
                ,username:this.$store.state.user.username}).then(res=>{
                    console.log(res)
                    this.recordList = []
                    if(res.status == 200){
                        var temp = res.body.obj
                        for(var i = 0;i<temp.length;i++){
                            var tempList = {}
                            tempList.place = temp[i].place
                            tempList.square = temp[i].square
                            tempList.num = temp[i].num
                            tempList.time = temp[i].time
                            tempList.method = temp[i].method
                            tempList.remark = temp[i].remark
                            tempList.executor = temp[i].executor
                            tempList.name = temp[i].name
                            this.recordList.push(tempList)
                        }
                    }else{
                        <el-alert title="网络连接失败!" type="info" show-icon></el-alert>
                    }
                })
        },
        getNum(){
            this.$http.post('api/informationBefo/getPreserveNum',{username:this.$store.state.user.username}).then(res=>{
                console.log(res)
                if(res.status==200){
                    var temp = res.body.obj
                    this.length = temp
                }
            })
        },
    },
    created(){
        this.InitList()
        this.getNum()
    },
    
}
</script>

<style>

</style>
