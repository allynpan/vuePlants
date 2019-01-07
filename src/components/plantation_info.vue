<template>
    <div>
        <!--这里主要是用来展示对应的果园信息-->
        <!--
            plantation{
                ID
                PlANTATION
                TERRAIN_PLANTATION
                PLANT_NAME
                TEMPERATURE
                ADDRESS
                HUMIDITY
                SALINITY
                PH
                USERNAME
            }
            -->
            <div class="block" style="padding:10px">
                <el-button type="primary" @click="addList()">新增一个园区数据</el-button>
                
            </div>
        <el-table :data="plantationList"
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
                prop="plantation"
                label="产园名">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
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
</template>

<script>
export default {
    name:'plantation_info',
    data(){
        return{
        username:'',
        plantationList:[],
        pagesize:5,
        currentPage:1,
        length:''
        }
    },
    methods:{
        //获得对应的果园数据
        addList(){
            alert("增加数据")
            //弹出一个框，然后填数据，增加数据
        },
        check(row){
            alert("查看!")
        },
        update(row){
            alert("更新数据!")
        },
        deleteRow(row){
            alert("删除数据!")
        },
        sizeChange(size){
            console.log("size:"+size+"this.pageSize"+this.pagesize)
            this.pagesize = size
            console.log("size:"+size+"this.pageSize"+this.pagesize)
            this.$http.post('api/informationBefo/getAllplantGroup',{pageNum:this.currentPage,pageSize:this.pagesize,username:this.$store.state.user.username}).then(res=>{
                console.log(res)
                this.plantationList = []
                if(res.status==200){
                var temp = res.body.obj
                for(var i=0;i<temp.length;i++){
                    var tempList={}
                    tempList.plantation = temp[i].plantation
                    tempList.salinity = temp[i].salinity
                    tempList.temperature = temp[i].temperature
                    tempList.terrainPlantation = temp[i].terrainPlantation
                    tempList.address = temp[i].address
                    tempList.humidity = temp[i].humidity

                    tempList.ph = temp[i].ph

                    this.plantationList.push(tempList)
                }
                }else{
                    <el-alert title="网络错误！" type="info" show-icon></el-alert>
                }
                console.log(this.plantationList)
            })
        },
        currentChange(currentPage){
            console.log("currentPage:"+currentPage)
            console.log("this.currentPage:"+this.currentPage)
            this.currentPage = currentPage
            this.$http.post('api/informationBefo/getAllplant',{pageNum:this.currentPage,pageSize:this.pagesize,username:this.$store.state.user.username}).then(res=>{
                console.log(res)
                this.plantationList = []
                if(res.status==200){
                var temp = res.body.obj
                for(var i=0;i<temp.length;i++){
                    var tempList={}
                    tempList.plantation = temp[i].plantation
                    tempList.salinity = temp[i].salinity
                    tempList.temperature = temp[i].temperature
                    tempList.terrainPlantation = temp[i].terrainPlantation
                    tempList.address = temp[i].address
                    tempList.humidity = temp[i].humidity
                    this.plantationList.push(tempList)
                }
                }else{
                    <el-alert title="网络错误！" type="info" show-icon></el-alert>
                }
                console.log(this.plantationList)
            })
            console.log(this.currentPage)
        },
        initList(currentPage,pageSize){
            this.$http.post('api/informationBefo/getAllplant',{pageNum:currentPage,pageSize:pageSize,username:this.$store.state.user.username}).then(res=>{
                console.log(res)
                if(res.status==200){
                var temp = res.body.obj
                for(var i=0;i<temp.length;i++){
                    var tempList={}
                    tempList.plantation = temp[i].plantation
                    tempList.salinity = temp[i].salinity
                    tempList.temperature = temp[i].temperature
                    tempList.terrainPlantation = temp[i].terrainPlantation
                    tempList.address = temp[i].address
                    tempList.humidity = temp[i].humidity
                    this.plantationList.push(tempList)
                }
                }else{
                    <el-alert title="网络错误！" type="info" show-icon></el-alert>
                }
                console.log(this.plantationList)
            })
        },
        getNum(){
            this.$http.post('api/informationBefo/getPlantNum',{username:this.$store.state.user.username}).then(res=>{
                console.log(res)
                if(res.status==200){
                    this.length = res.body.obj
                }else{
                    <el-alert title="网络错误！" type="info" show-icon></el-alert>
                }
            })
        }
    },
    created(){
        this.getNum()
        this.initList(this.currentPage,this.pagesize)
    }
}
</script>

<style>
    

</style>
