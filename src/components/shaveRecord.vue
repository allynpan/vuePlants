<template>
    <div>
        <div class="block">
            <el-button type="primary" @click="shaveDialog=true">增加一个记录</el-button>
            <div style="display:inline-block;float:right">
                    <div style="display:inline-block;">搜索：</div>
                    <el-input class="inline-input" v-model="search" placeholder="请输入搜索关键词" style="display:inline-block;width:250px;"></el-input>
                    <!-- <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button> -->
            </div>
        </div>
        <el-table :data="search1"
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
                label="数量（棵/株）"
            >
            </el-table-column>
            <el-table-column
                prop="time"
                label="修剪时间"
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
        <el-dialog
            title="查看修剪记录"
            :visible.sync="checkdialog"
            width="30%"
            >
            <el-form :model="checkForm" ref="checkForm" label-width="120px">
                <el-form-item label="农产品：">
                    {{checkForm.name}}
                </el-form-item>
                <el-form-item label="数量:">
                    {{checkForm.number}}棵/株
                </el-form-item>
                <el-form-item label="修建方法：">
                    {{checkForm.method}}
                </el-form-item>
                <el-form-item label="修剪时间:">
                    {{checkForm.time}}
                </el-form-item>
                <el-form-item label="状态：">
                    {{checkForm.statue}}
                </el-form-item>
                <el-form-item label="备注：">
                    {{checkForm.remark}}
                </el-form-item>
            </el-form>
        </el-dialog>
        
        <el-dialog
            title="增加一个修剪记录"
            :visible.sync="shaveDialog"
            width="40%"
            >
            <el-form :model="insertForm" ref="insertForm" label-width="150px">
                <el-form-item label="裁剪农产品名:">
                    <el-input v-model="insertForm.name"></el-input>
                </el-form-item>
                <el-form-item label="裁剪方法：">
                    <el-input v-model="insertForm.method" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="裁剪数目：">
                    <el-input v-model="insertForm.number" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-input v-model="insertForm.statue" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="时间：">
                    <el-date-picker v-model="insertForm.time" type="date" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input type="textarea" autosize v-model="insertForm.remark" placeholder=""></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click=" shaveDialog = false">取 消</el-button>
                <el-button type="primary" @click="insert()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改一个修剪记录"
            :visible.sync="updateDialog"
            width="40%"
            >
            <el-form :model="updateForm" ref="updateForm" label-width="150px">
                <el-form-item label="裁剪农产品名:">
                    <el-input v-model="updateForm.name"></el-input>
                </el-form-item>
                <el-form-item label="裁剪方法：">
                    <el-input v-model="updateForm.method" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="裁剪数目：">
                    <el-input v-model="updateForm.number" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-input v-model="updateForm.statue" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="时间：">
                    <el-date-picker v-model="updateForm.time" type="date" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input type="textarea" autosize v-model="updateForm.remark" placeholder=""></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click=" updateDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateThing()">确 定</el-button>
            </span>
        </el-dialog>
        
        
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
            recordList:[],
            shaveDialog:false,
            updateDialog:false,
            checkdialog:false,
            checkForm:{
                id:'',
                method:'',
                number:'',
                time:'',
                statue:'',
                remark:'',
                name:'',
            },
            insertForm:{
                id:'',
                method:'',
                number:'',
                time:'',
                statue:'',
                remark:'',
                name:'',
            },
            updateForm:{
                id:'',
                method:'',
                number:'',
                time:'',
                statue:'',
                remark:'',
                name:'',
            },
            search:'',
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
                    temp.id = tempList[i].id
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
                    temp.id = tempList[i].id
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
        },
        dateFormatScript(date){
            if(date!=null){
                const year = date.getFullYear();
                const month = date.getMonth()+1;
                const day = date.getDate();
                const timeFormat = year + "/" + month + "/" + day;
                return timeFormat
            }
        },
        check(row){
            this.$http.post(
                'api/informationBefo/getShaveByID',
                {id:row.id}
            ).then(res=>{
                console.log(res)
                if(res.body.msg=="请求成功"){
                    var temp = res.body.obj
                    this.checkForm.name = temp.name
                    this.checkForm.method = temp.method
                    this.checkForm.time = new Date(temp.time)
                    this.checkForm.statue = temp.statue
                    this.checkForm.remark = temp.remark
                    this.checkForm.number = temp.number
                    this.checkForm.id = temp.id
                    if(temp.time==null){
                        this.checkForm.time = null
                    }else{
                        this.checkForm.time = this.dateFormatScript(new Date(temp.time))
                    }
                    //console.log(temp)
                    //console.log(this.updateForm)
                    //this.updateDialog=true
                    this.checkdialog = true
                }else{
                    this.$message({
                        message: '请求失败',
                        type: 'info',
                        showClose: true,
                    });
                }
            })
        },
        insert(){
            var formtime = new Date(this.insertForm.time)
            var formData = new FormData()
            formData.append('username',this.$store.state.user.username)
            formData.append('method',this.insertForm.method)
            formData.append('number',this.insertForm.number)
            formData.append('time',this.insertForm.time)
            formData.append('statue',this.insertForm.statue)
            formData.append('remark',this.insertForm.remark)
            formData.append('name',this.insertForm.name)
            this.$http.post(
                'api/informationBefo/insertShave',
                formData,
                {'Content-Type':'Multipart/form-data'}
            ).then(res=>{
                console.log(res)
                if(res.body.msg=="插入成功"){
                    this.$message({
                        message: '插入成功',
                        type: 'info',
                        showClose: true,
                    });
                    this.shaveDialog = false
                }else{
                    this.$message({
                        message: '插入失败',
                        type: 'info',
                        showClose: true,
                    });
                }
            })
        },
        deleteRow(row){
            this.$http.post(
                'api/informationBefo/deleteShave',
                {id:row.id}
            ).then(res=>{
                console.log(res)
                if(res.body.msg=="删除成功"){
                    this.$message({
                        message: '删除成功',
                        type: 'info',
                        showClose: true,
                    });
                    this.InitList()
                }else{
                    this.$message({
                        message: '删除失败',
                        type: 'info',
                        showClose: true,
                    });
                }
            })
        },
        update(row){
            this.$http.post(
                'api/informationBefo/getShaveByID',
                {id:row.id}
            ).then(res=>{
                console.log(res)
                if(res.body.msg=="请求成功"){
                    var temp = res.body.obj
                    this.updateForm.name = temp.name
                    this.updateForm.method = temp.method
                    this.updateForm.time = new Date(temp.time)
                    this.updateForm.statue = temp.statue
                    this.updateForm.remark = temp.remark
                    this.updateForm.number = temp.number
                    this.updateForm.id = temp.id
                    console.log(temp)
                    console.log(this.updateForm)
                    this.updateDialog=true
                }else{
                    this.$message({
                        message: '请求失败',
                        type: 'info',
                        showClose: true,
                    });
                }
            })
        },
        updateThing(){
            var formData = new FormData()
            formData.append('username',this.$store.state.user.username)
            formData.append('method',this.updateForm.method)
            formData.append('number',this.updateForm.number)
            formData.append('time',this.updateForm.time)
            formData.append('statue',this.updateForm.statue)
            formData.append('remark',this.updateForm.remark)
            formData.append('name',this.updateForm.name)
            formData.append('id',this.updateForm.id)
            this.$http.post(
                'api/informationBefo/updateShave',
                formData,
                {'Content-Type':'Multipart/form-data'}
            ).then(res=>{
                console.log(res)
                if(res.body.msg=="更新成功"){
                    this.$message({
                        message: '更新成功',
                        type: 'info',
                        showClose: true,
                    });
                    this.updateDialog = false
                }else{
                    this.$message({
                        message: '更新失败',
                        type: 'info',
                        showClose: true,
                    });
                }
            })
        }
    },
    computed:{
        /**
         * 实现表格内容的模糊搜索
         */
        search1(){
            const search = this.search
            if(search){
                return this.recordList.filter(data=>{
                    return Object.keys(data).some(key=>{
                        return String(data[key]).toLowerCase().indexOf(search)>-1
                    })
                })
            }
            return this.recordList
        },
    },
    created(){
        this.InitList()
        this.getNum()
    },
    
}
</script>

<style>
.block{
    padding: 15px;
}
</style>
