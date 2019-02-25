<template>
    <div>
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
        
            

        </el-table>
    </div>
</template>

<script>
export default {
    name:'protectRecord',
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
            this.$http.post('api/informationBefo/getAllProtectRecord'
                ,{pageNum:this.currentPage,pageSize:this.pagesize
                ,username:this.$store.state.user.username}).then(res=>{
                    console.log(res)
                    this.recordList = []
                    var tempList = res.body.obj
                    for(var i=0;tempList.length;i++){
                        var temp = {}
                        temp.diseaseId = tempList[i].diseaseId
                        temp.time = tempList[i].time
                        temp.medicine = tempList[i].medicine
                        temp.dosage = tempList[i].dosage
                        temp.result = tempList[i].result
                        temp.executor = tempList[i].executor
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
            this.$http.post('api/informationBefo/getProtectRecordNum',{username:this.$store.state.user.username}).then(res=>{
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
            this.$http.post('api/informationBefo/getAllProtectRecord'
                ,{pageNum:this.currentPage,pageSize:this.pagesize
                ,username:this.$store.state.user.username}).then(res=>{
                    console.log(res)
                    this.recordList = []
                    var tempList = res.body.obj
                    for(var i=0;tempList.length;i++){
                        var temp = {}
                        temp.diseaseId = tempList[i].diseaseId
                        temp.time = tempList[i].time
                        temp.medicine = tempList[i].medicine
                        temp.dosage = tempList[i].dosage
                        temp.result = tempList[i].result
                        temp.executor = tempList[i].executor
                        this.recordList.push(temp)
                    }
                })
        },
        sizeChange(size){
            console.log("size:"+size+"this.pageSize"+this.pagesize)
            this.pagesize = size
            this.currentPage = 1
            console.log("size:"+size+"this.pageSize"+this.pagesize)
            this.$http.post('api/informationBefo/getAllProtectRecord'
                ,{pageNum:this.currentPage,pageSize:this.pagesize
                ,username:this.$store.state.user.username}).then(res=>{
                    console.log(res)
                    this.recordList = []
                    var tempList = res.body.obj
                    for(var i=0;tempList.length;i++){
                        var temp = {}
                        temp.diseaseId = tempList[i].diseaseId
                        temp.time = tempList[i].time
                        temp.medicine = tempList[i].medicine
                        temp.dosage = tempList[i].dosage
                        temp.result = tempList[i].result
                        temp.executor = tempList[i].executor
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
