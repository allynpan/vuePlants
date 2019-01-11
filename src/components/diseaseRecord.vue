<template>
import { constants } from 'http2';
    <div>
        <h1>病虫害记录</h1>
    </div>
</template>

<script>
export default {
    name:'diseaseRecord',
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
            this.$http.post('api/informationBefo/getAllDiseaseRecord'
                ,{pageNum:this.currentPage,pageSize:this.pagesize
                ,username:this.$store.state.user.username}).then(res=>{
                    console.log(res)
                    this.recordList = []
                    var templist = res.body.obj
                    for(var i=0;i<templist.length;i++){
                        var temp = {}
                        temp.place = templist[i].place
                        temp.square = templist[i].square
                        temp.num = templist[i].num
                        temp.diseaseNum = templist[i].diseaseNum
                        temp.diseaseRate = templist[i].diseaseRate
                        temp.insectName = templist[i].insectName
                        temp.time = templist[i].time
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
            this.$http.post('api/informationBefo/getDiseaseRecordNum',{username:this.$store.state.user.username}).then(res=>{
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
            this.$http.post('api/informationBefo/getAllDiseaseRecord'
                ,{pageNum:this.currentPage,pageSize:this.pagesize
                ,username:this.$store.state.user.username}).then(res=>{
                    console.log(res)
                    this.recordList = []
                    var templist = res.body.obj
                    for(var i=0;i<templist.length;i++){
                        var temp = {}
                        temp.place = templist[i].place
                        temp.square = templist[i].square
                        temp.num = templist[i].num
                        temp.diseaseNum = templist[i].diseaseNum
                        temp.diseaseRate = templist[i].diseaseRate
                        temp.insectName = templist[i].insectName
                        temp.time = templist[i].time
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
