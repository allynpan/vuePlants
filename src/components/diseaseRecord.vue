<template>
    <div>
        <div class="block">
            <div style="padding:25px">
                <el-button type="primary" @click="dialogFormVisible = true">添加一个病虫害记录</el-button>
                <div style="display:inline-block;float:right">
                    <div style="display:inline-block;">搜索：</div>
                    <el-input class="inline-input" v-model="search" placeholder="请输入搜索关键词" style="display:inline-block;width:300px;"></el-input>
                    <!-- <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button> -->
                    
                </div>
            </div>
        </div>
        <el-table :data="search1"
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
                prop="place"
                label="地点"
            >
            </el-table-column>
            <el-table-column
                prop="square"
                label="面积"
            >
            </el-table-column>
            <el-table-column
                prop="num"
                label="调查数量"
            >
            </el-table-column>
            <el-table-column
                prop="diseaseNum"
                label="染病数量"
            >
            </el-table-column>
            <el-table-column
                prop="diseaseRate"
                label="染病率"
                :formatter="toPercent"
            >
            </el-table-column>
            <el-table-column
                prop="insectName" 
                label="病虫名"
            >
            </el-table-column>
            <el-table-column
                prop="time"
                label="调查时间"
                :formatter="dateFormat"
            >
            </el-table-column>
            <el-table-column
                prop="isFinish"
                label="是否进行防治"
                :formatter="booleanFormat"
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
            title="增加一个病虫害记录"
            :visible.sync="dialogFormVisible"
            width="40%"
            >
            <el-form :model="form" ref="form" label-width="150px">
                <el-form-item label="记录植株名：">
                    <el-input v-model="form.name" style="width:250px" placeholder="请输入植株名"></el-input>
                </el-form-item>
                 <el-form-item label="地点：">
                    <el-input v-model="form.place" style="width:250px" placeholder="请输入调查地"></el-input>
                </el-form-item>
                <el-form-item label="面积：">
                    <el-input v-model="form.square" style="width:250px" placeholder="请输入调查面积"></el-input>
                </el-form-item>
                <el-form-item label="病虫害调查总株数：">
                    <el-input v-model="form.num" placeholder="请输入病虫害调查总株数" style="width:250px">
                        <template slot="append">株/棵</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="害病植株：">
                    <el-input v-model="form.diseaseNum" style="width:250px" placeholder="请输入植株数目">
                        <template slot="append">株/棵</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="病虫名：">
                    <el-input v-model="form.insectName" style="width:250px" placeholder="请输入对应的病虫名"></el-input>
                </el-form-item>
                <el-form-item label="害病率：">
                    <el-input v-model="form.diseaseRate" style="width:250px" placeholder="">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="调查时间：">
                    <el-date-picker v-model="form.time" type="date" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="是否进行防治：">
                    <el-switch 
                        v-model="form.isFinish"
                        active-text="是"
                        inactive-text="不是"
                        :on-value="1"
                        :off-value="0">
                    </el-switch>
                </el-form-item>
                <el-form-item label="防治时间：">
                    <el-date-picker v-model="form.protectTime" type="date" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="防治药剂:">
                    <el-input v-model="form.medicine" placeholder="" style="width:250px"></el-input>
                </el-form-item>
                <el-form-item label="药剂用量：">
                    <el-input v-model="form.dosage" placeholder="" style="width:250px"></el-input>
                </el-form-item>
                <el-form-item label="施药结果：">
                    <el-input v-model="form.result" placeholder="" style="width:250px"></el-input>
                </el-form-item>
                <el-form-item label="负责人：">
                    <el-input v-model="form.executor" placeholder="" style="width:250px"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="dialogFormVisible= false">取 消</el-button>
                <el-button type="primary" @click="insert()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="查看数据"
            :visible.sync="checkdialogFormVisible"
            width="40%"
            >
            <el-form :model="infoForm" ref="infoForm" label-width="150px">
                <el-form-item label="农产品名：">
                    {{infoForm.name}}
                </el-form-item>
                <el-form-item label="地点：">
                    {{infoForm.place}}
                </el-form-item>
                <el-form-item label="面积：">
                    {{infoForm.square}}m²
                </el-form-item>
                <el-form-item label="调查数量：">
                    {{infoForm.num}} 棵/株
                </el-form-item>
                <el-form-item label="染病数量：">
                    {{infoForm.diseaseNum}} 棵/株
                </el-form-item>
                <el-form-item label="染病率：">
                    {{infoForm.diseaseRate}} %
                </el-form-item>
                <el-form-item label="病虫名：">
                    {{infoForm.insectName}}
                </el-form-item>
                <el-form-item label="调查时间：">
                    {{infoForm.time}}
                </el-form-item>
                <el-form-item label="是否进行防治：">
                    {{infoForm.isFinish}}
                </el-form-item>
                <el-form-item label="防治时间：">
                    {{infoForm.protectTime}}
                </el-form-item>
                <el-form-item label="防治药剂：">
                    {{infoForm.medicine}}
                </el-form-item>
                <el-form-item label="亩用量：">
                    {{infoForm.dosage}}亩
                </el-form-item>
                <el-form-item label="防治效果：">
                    {{infoForm.result}}
                </el-form-item>
                <el-form-item label="喷药人：">
                    {{infoForm.executor}}
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary">修改数据</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="编辑记录"
            :visible.sync="updatedialogFormVisible"
            width="40%"
            >
            <el-form :model="infoForm" ref="infoForm" label-width="150px">
                <el-form-item label="农产品名：">
                    <el-input v-model="infoForm.name"></el-input>
                </el-form-item>
                <el-form-item label="地点：">
                    <el-input v-model="infoForm.place"></el-input>
                </el-form-item>
                <el-form-item label="面积：">
                    <el-input v-model="infoForm.square"></el-input>
                </el-form-item>
                <el-form-item label="调查数量：">
                    <el-input v-model="infoForm.num"></el-input>
                </el-form-item>
                <el-form-item label="染病数量：">
                    <el-input v-model="infoForm.diseaseNum"></el-input>
                </el-form-item>
                <el-form-item label="染病率：">
                    <el-input v-model="infoForm.diseaseRate"></el-input>
                </el-form-item>
                <el-form-item label="病虫名：">
                    <el-input v-model="infoForm.insectName"></el-input>
                </el-form-item>
                <el-form-item label="调查时间：">
                    <el-date-picker v-model="infoForm.time" type="date" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="是否进行防治：">
                    <el-switch 
                        v-model="infoForm.isFinish"
                        active-text="是"
                        inactive-text="不是"
                        active-value=1
                        inactive-value=0>
                    </el-switch>
                </el-form-item>
                <el-form-item label="防治时间：">
                    <el-date-picker v-model="infoForm.protectTime" type="date" placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="防治药剂：">
                    <el-input v-model="infoForm.medicine"></el-input>
                </el-form-item>
                <el-form-item label="亩用量：">
                    <el-input v-model="infoForm.dosage"></el-input>
                </el-form-item>
                <el-form-item label="防治效果：">
                    <el-input v-model="infoForm.result"></el-input>
                </el-form-item>
                <el-form-item label="喷药人：">
                    <el-input v-model="infoForm.executor"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="updatedialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateThings()">确 定</el-button>
            </span>
        </el-dialog>
        
        
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
            recordList:[],
            dialogFormVisible:false,
            updatedialogFormVisible:false,
            checkdialogFormVisible:false,
            infoForm:{
                diseaseNum:'',
                diseaseRate:'',
                dosage:'',
                executor:'',
                id:'',
                insectName:'',
                isFinish:1,
                medicine:'',
                name:'',
                num:'',
                place:'',
                protectTime:'',
                result:'',
                square:'',
                time:'',
            },
            form:{
                place:'',
                square:'',
                num:'',
                diseaseNum:'',
                diseaseRate:'',
                insectName:'',
                time:'',
                name:'',
                isFinish:false,
                protectTime:'',
                medicine:'',
                dosage:'',
                result:'',
                executor:''
            },
            search:''
        }
    },
    watch:{//增加一个监听对象
        
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
                        temp.name = templist[i].name
                        temp.isFinish = templist[i].isFinish
                        temp.protectTime = templist[i].protectTime
                        temp.medicine = templist[i].medicine
                        temp.dosage = templist[i].dosage
                        temp.result = templist[i].result
                        temp.executor = templist[i].executor
                        temp.id = templist[i].id
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
        dateFormatScript(date){
            if(date!=null){
                const year = date.getFullYear();
                const month = date.getMonth()+1;
                const day = date.getDate();
                const timeFormat = year + "/" + month + "/" + day;
                return timeFormat
            }
        },
        booleanFormat(row, column, cellValue, index){
            const string = row[column.property]
            if(string!=null){
                if(string == 1){
                    return "是"
                }else{
                    return "否"
                }
            }
        },
        toPercent(row, column, cellValue, index){
            const num = row[column.property]
            return num*100
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
                        temp.name = templist[i].name
                        temp.isFinish = templist[i].isFinish
                        temp.protectTime = templist[i].protectTime
                        temp.medicine = templist[i].medicine
                        temp.dosage = templist[i].dosage
                        temp.result = templist[i].result
                        temp.executor = templist[i].executor
                        temp.id = templist[i].id
                        this.recordList.push(temp)
                    }
                })
        },
        sizeChange(size){
            console.log("size:"+size+"this.pageSize"+this.pagesize)
            this.pagesize = size
            this.currentPage = 1
            console.log("size:"+size+"this.pageSize"+this.pagesize)
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
                        temp.name = templist[i].name
                        temp.isFinish = templist[i].isFinish
                        temp.protectTime = templist[i].protectTime
                        temp.medicine = templist[i].medicine
                        temp.dosage = templist[i].dosage
                        temp.result = templist[i].result
                        temp.executor = templist[i].executor
                        temp.id = templist[i].id
                        this.recordList.push(temp)
                    }
                })
        },
        check(row){
            //alert("查看!")
            this.$http.post(
                'api/informationBefo/getDiseaseByID',
                {id:row.id}
            ).then(res=>{
                console.log(res)
                var temp = res.body.obj
                if(res.body.msg=="请求成功"){
                    this.infoForm.place = temp.place
                    this.infoForm.square = temp.square
                    this.infoForm.num = temp.num
                    this.infoForm.diseaseNum = temp.diseaseNum
                    this.infoForm.diseaseRate = temp.diseaseRate*100
                    this.infoForm.insectName =temp.insectName
                    if(temp.time==null){
                        this.infoForm.time = null
                    }else{
                        this.infoForm.time = this.dateFormatScript(new Date(temp.time))
                    }
                    this.infoForm.name = temp.name
                    if(temp.isFinish==1){
                        this.infoForm.isFinish = '是'
                    }else{
                        this.infoForm.isFinish = '否'
                    }
                    //this.infoForm.isFinish = (boolean)(temp.isFinish)
                    if(temp.protectTime==null){
                        this.infoForm.protectTime = null
                    }else{
                        this.infoForm.protectTime = this.dateFormatScript(new Date(temp.protectTime))
                    }
                    this.infoForm.medicine = temp.medicine
                    this.infoForm.dosage = temp.dosage
                    this.infoForm.result = temp.result
                    this.infoForm.executor = temp.executor
                    this.infoForm.id = temp.id
                    this.checkdialogFormVisible = true
                    
                }else{
                    <el-alert title="服务器错误！！" type="info" show-icon></el-alert>
                    
                }
            })
        },
        update(row){
            //alert("更新数据!")
            this.$http.post(
                'api/informationBefo/getDiseaseByID',
                {id:row.id}
            ).then(res=>{
                console.log(res)
                var temp = res.body.obj
                if(res.body.msg=="请求成功"){
                    this.infoForm.place = temp.place
                    this.infoForm.square = temp.square
                    this.infoForm.num = temp.num
                    this.infoForm.diseaseNum = temp.diseaseNum
                    this.infoForm.diseaseRate = temp.diseaseRate
                    this.infoForm.insectName =temp.insectName
                    //this.infoForm.time = new Date(temp.time)
                    if(temp.time==null){
                        this.infoForm.time = null
                    }else{
                        this.infoForm.time = new Date(temp.time)
                    }
                    this.infoForm.name = temp.name
                    this.infoForm.isFinish = temp.isFinish
                    if(temp.protectTime==null){
                        this.infoForm.protectTime =''
                    }else{
                        this.infoForm.protectTime = new Date(temp.protectTime)
                    }
                    //this.infoForm.protectTime = new Date(temp.protectTime)
                    this.infoForm.medicine = temp.medicine
                    this.infoForm.dosage = temp.dosage
                    this.infoForm.result = temp.result
                    this.infoForm.executor = temp.executor
                    this.infoForm.id = temp.id
                    console.log(this.infoForm)
                    console.log(this.infoForm.isFinish)
                    this.updatedialogFormVisible = true
                }else{
                    <el-alert title="服务器错误!!" type="info" show-icon></el-alert>
                    
                }
            })
        },
        updateThings(){
            var formData = new FormData()
            formData.append('username',this.$store.state.user.username)
            formData.append('place',this.infoForm.place)
            formData.append('square',this.infoForm.square)
            formData.append('num',this.infoForm.num)
            formData.append('diseaseNum',this.infoForm.diseaseNum)
            formData.append('diseaseRate',this.infoForm.diseaseRate)
            formData.append('insectName',this.infoForm.insectName)
            formData.append('time',new Date(this.infoForm.time))
            formData.append('name',this.infoForm.name)
            formData.append('isFinish',this.infoForm.isFinish)
            formData.append('protectTime',new Date(this.infoForm.protectTi))
            formData.append('medicine',this.infoForm.medicine)
            formData.append('dosage',this.infoForm.dosage)
            formData.append('result',this.infoForm.result)
            formData.append('executor',this.infoForm.executor)
            formData.append('id',this.infoForm.id)
            console.log(formData.get('time'))
            console.log(formData.get('protectTime'))
            console.log(formData.get('id'))
            console.log("isFinish:"+formData.get('isFinish'))
            this.$http.post(
                'api/informationBefo/updateDiseaseById',
                formData,
                {'Content-Type':'Multipart/form-data'}
            ).then(res=>{
                console.log(res)
                if(res.body.msg=="更新成功"){
                    this.$message({
                        message: '更新成功！',
                        type: 'info',
                        showClose: true,
                    });
                    
                }else{
                    this.$message({
                        message: '更新失败！',
                        type: 'info',
                        showClose: true,
                    });
                    
                }
            })
        },
        deleteRow(row){
            alert("删除数据!")
            alert(row.name);
            alert(row.id)
            this.$http.post('api/informationBefo/deleteDisease',{id:row.id}).then(res=>{
                console.log(res)
                if(res.body.msg=="删除成功"){
                    this.$message({
                        message: '删除成功',
                        type: 'info',
                        showClose: true,
                    });
                }else{
                    this.$message({
                        message: '删除失败',
                        type: 'info',
                        showClose: true,
                    });
                    
                }
            })
        this.InitList()
            
        },
        /**
         * 增加数据
         */
        insert(){
            var formTime1 = new Date(this.form.time)
            var formTime2 = new Date(this.form.protectTime)
            formTime1 = formTime1.toUTCString
            formTime2 = formTime2.toUTCString
            var formData = new FormData()
            formData.append('username',this.$store.state.user.username)
            formData.append('place',this.form.place)
            formData.append('square',this.form.square)
            formData.append('num',this.form.num)
            formData.append('diseaseNum',this.form.diseaseNum)
            formData.append('diseaseRate',this.form.diseaseRate)
            formData.append('insectName',this.form.insectName)
            formData.append('time',new Date(this.form.time))
            formData.append('name',this.form.name)
            formData.append('isFinish',this.form.isFinish)
            formData.append('protectTime',new Date(this.form.protectTime))
            formData.append('medicine',this.form.medicine)
            formData.append('dosage',this.form.dosage)
            formData.append('result',this.form.result)
            formData.append('executor',this.form.executor)
            this.$http.post(
                'api/informationBefo/insertDisease',
                formData,
                {'Content-Type':'Multipart/form-data'}
                ).then(res=>{
                console.log(res)
                if(res.body.msg=="插入成功"){
                    this.$message({
                        message: '插入成功！',
                        type: 'info',
                        showClose: true,
                    }); 
                    this.dialogFormVisible=false
                    this.InitList()
                }else{
                    this.$message({
                        message: '插入失败！',
                        type: 'info',
                        showClose: true,
                    });
                }
            })
        
        },
        
        
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

</style>
