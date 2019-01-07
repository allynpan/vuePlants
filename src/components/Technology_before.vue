<template>
    <div class="demo" style="100%">
        
                <div class="selfcontainer">
                        <el-autocomplete
                        class="inline-input"
                        v-model="plantName"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="handleSelect"
                        ></el-autocomplete>
                        <el-button type="primary" @click="submitName(plantName)">搜索</el-button>
                    <div style="height:100%" class="text">
                        <el-scrollbar style="height:100%" wrap-class="list" view-style="font-weight: bold;" view-class="view-box" :native="false">
                            <div class="textBorder">
                            <h1>{{plantName}}</h1>
                        </div>
                    <div v-for="(item,head,msg) in items" :key="msg" class="textBorder">
                        <span>
                            <h2>{{item.head}}</h2>
                            <p>{{item.msg}}</p>
                        </span>
                    </div>
                    </el-scrollbar> 
                    </div>
                    
                    <el-footer height="">
                        <!-- Footer content -->
                        
                    </el-footer>
                    
                </div>
            
    </div>
</template>

<script>
export default {
    name:'Technology_before',
    data(){
        return{
            username: '',
            tempeture:'23度的时候比较合适，但是也存在不同温度下的需要',
            divNum:'',
            message:['dasf','fsdfsf'],
            head:['fsadfsdf','fsdfsdf'],
            items:[],
            plants:{
                name:'',
            },
            //搜索框用的属性
            options:[],
            selectName:'',
            plantName:'',
            list:[],
            loading:false,//判断是否处于远程加载的状态
            /**
             *所有的信息存储
             */
            info:{
                id:'',
                plantName:'',
                suitableTem:'',
                suitableLight:'',
                suitableLand:'',
                suitableWater:'',
                shootTime:'',
                shootStatue:'',
                blossomTime:'',
                blossomStatue:'',
                fruitTime:'',
                fruitStatue:'',
                matureTime:'',
                matureStatue:'',
            }
        }
    },
    created(){
        this.username = this.$store.state.user.username
        this.getAllName()
    },
    
    methods:{
        /**
        * 获得对应的农产品名
        */
        getAllName(){
            this.$http.get('api/TSB/getAllplants').then(function(res){
                console.log(res)
                if(res.status==200){
                    var temp = []
                    temp = res.body.obj
                    for(var i = 0;i<temp.length;i++){
                        var z = {}
                        z.value = temp[i]
                        this.list.push(z)
                    }
                }
            })
        },
        querySearch(queryString, cb){
            var list = this.list
            console.log(list)
            var results = queryString ? list.filter(this.createFilter(queryString)):list
            cb(results)
        },
        createFilter(queryString) {
        return (list) => {
                return (list.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        /**
         * 选择对应的农产品
         */
        remoteMethod(query){
            console.log(query)
            if(query!==''){
                this.loading = true
                setTimeout(() => {
                this.loading = false
                this.options = this.list.filter(item => {
                    return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1
                        })
                    }, 200)
                    console.log("options的内容:"+this.options)
            }else{
                this.options = []
            }
        },
        /**
         * 增加一个块
         */
        changeDiv(headName,body){
                console.log("标题："+headName+"内容："+body)
                //这句添加语句有问题
                var temp = []
                temp.msg = body
                temp.head = headName
                this.items.push(temp)
            console.log(this.items)
        },
        /**
         * 提交按钮,主要用于提交对应的产品名并同时返回对应的各项数据
         */
        submitName(name){
            //提交的api是api/TSB/getTSB_info
            console.log("提交的名字："+name)
            this.$http.post('api/TSB/getTSB_info',{plantName:name}).then(function(res){
                this.items = []//先将现在拥有的item清空
                console.log(res)
                if(res.status==200){
                    this.changeDiv('适宜温度',res.body.obj.suitableTem)
                    this.changeDiv('适宜光照',res.body.obj.suitableLight)
                    this.changeDiv('适宜土壤',res.body.obj.suitableLand)
                    this.changeDiv('适宜水源',res.body.obj.suitableWater)
                    this.changeDiv('出梢时间',res.body.obj.shootTime)
                    this.changeDiv('出稍状况',res.body.obj.shootStatue)
                    this.changeDiv('开花时间',res.body.obj.blossomTime)
                    this.changeDiv('开花状况',res.body.obj.blossomStatue)
                    this.changeDiv('结果时间',res.body.obj.fruitTime)
                    this.changeDiv('结果状况',res.body.obj.fruitStatue)
                    this.changeDiv('成熟时间',res.body.obj.matureTime)
                    this.changeDiv('成熟状况',res.body.obj.matureStatue)
                    this.changeDiv('其他信息',res.body.obj.remark)
                }
            })
        }
    }

}
</script>

<style>
    
.left-select{
    margin-right: 25px;
}    

.demo{
	padding: 2em 0;
}

.selfcontainer{
    padding-right: 24px;
    padding-left: 24px;
    margin-left: auto;
    margin-right: auto;
}

.textForm{
    padding-right: 15px;
    padding-left: 15px;
}

.padBorder{
    border-bottom: 1px;
    border-style: solid;
    border-color: #D5D6E2;
    border-top: none;
    border-left: none;
    border-right: none;
    padding-right: 15px;
    padding-left: 15px;
    padding-bottom: 15px;
}

.textBorder{
    border-bottom: 1px;
    border-color: #D5D6E2;
    border-style: solid;
    border-top: none;
    border-left: none;
    border-right: none;
    padding-right: 15px;
    padding-left: 15px;
    padding-bottom: 15px;
}
.list {
  max-height: 500px;
}

.text{
    margin-left: 15px;
    min-height: 500px;
}

</style>
