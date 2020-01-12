<template>
  <div ref="list" class="warp-main">
    <el-row v-loading="loading" element-loading-text="拼命加载中">
      <!--<el-col :span="24" class="toolbar">-->
        <!--<el-form :inline="true" :model="filters">-->
          <!--<el-form-item>-->
            <!--<el-input v-model="filters.number" placeholder="请输入任务编号" auto-complete="off" @keyup.enter.native="handleSearch"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-button type="primary" size="medium" v-on:click="handleSearch">查询</el-button>-->
          <!--</el-form-item>-->
          <!--<el-form-item class="pull-right">-->
            <!--<el-button type="primary" size="medium" @click="showAddDialog" icon="el-icon-plus">新增</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</el-col>-->
      <!--表格数据-->
      <el-col class="table-wrapper" id="table-wrapper">
        <el-table :data="tableData" stripe style="width: 100%" >
          <el-table-column align="center" prop="mId" v-if="idShow" label="ID" ></el-table-column>
          <el-table-column align="center" prop="date" label="日期" sortable  >
            <template slot-scope="scope">
              {{scope.row.date  | formatDateTime}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="user" label="用户"></el-table-column>
          <el-table-column align="center" prop="breakfast" label="早餐"></el-table-column>
          <el-table-column align="center" prop="lunch" label="午餐" ></el-table-column>
          <el-table-column align="center" prop="traffic" label="交通" ></el-table-column>
          <el-table-column align="center" prop="sock" label="零食" ></el-table-column>
          <el-table-column align="center" prop="clothes" label="服装" ></el-table-column>
          <el-table-column align="center" prop="clothesRemind" label="服装费用备注" ></el-table-column>
          <el-table-column align="center" prop="play" label="娱乐" ></el-table-column>
          <el-table-column align="center" prop="playRemind" label="游玩费用备注" ></el-table-column>
          <el-table-column align="center" prop="others" label="其他" ></el-table-column>
          <el-table-column align="center" prop="othersRemind" label="其他费用备注" ></el-table-column>
          <el-table-column align="center" prop="work" label="是否上班" sortable>
            <template slot-scope="scope">
                {{scope.row.work == 1? "上班" : "不上班"}}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="toolbar">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import store from '@/store/store'
  import {formatDate} from '@/assets/js/tool'
  import {getAllSpending} from '@/assets/userapi'
  export default {
    name: "list",
    store,
    data: function () {
      return {
        loading: false,
        idShow: false,
        total: 2,
        currentPage: 1,
        pageSize: 10,
        tableData: [],
        detailId: 0, // 详情ID
        filters: { // 搜索表单
          number: ''
        }
      };
    },
    mounted: function () {

      this.init()

    },
    computed:{

    },
    methods: {

      init(){
        var that=this
        getAllSpending().then(function (data) {
          console.log(data)
          data=data.data
          if(data.code==1){
            if(data.data.length>0){
              that.tableData=data.data
            }else{

            }
          }else{
            that.$message.error('系统异常');
          }

        }).catch(function (error) {
          that.$message.error('系统异常');
        })
      },
      formatInput(val){

      },
      blurInput(val){
        console.log(val)
        let that=this;
        let num=this.form[val]+"";
        console.log(num)
        num=num.replace(/[^\-?\d.]/g,'');
        if(num==""){
          num=0
        }
        this.$set(that.form,val,num)

      },

      // 搜索
      handleSearch(){
        console.info(this.filters.number);
      },

      // 选择每页显示条数
      handleSizeChange(val){
//        this.pageSize = val;
//        this.currentPage = 1;
      },
      // 跳转页
      handleCurrentChange(val){
//        this.currentPage = val;
      },
      // 创建日期转换
      dateFormatter(row, column) {
        return this.getDateValue(row.createTime);
      },
      // 执行日期转换
      activeTateFormatter(row, column) {
        return this.getDateValue(row.activeTime);
      },
      // 获取日期
      getDateValue(datetime) {
        if (datetime) {
          datetime = new Date(datetime);
          let y = datetime.getFullYear() + '-';
          let mon = datetime.getMonth() + 1 + '-';
          let d = datetime.getDate();
          return y + mon + d;
        }
        return ''
      }

    }
  }
</script>

<style scoped>
  .detail-box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 500px;
    height: 100%;
    overflow-y: auto;
    z-index: 2000;
    background-color: #fff;
  }
  .modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: #000;
    opacity: .3;
  }


</style>
