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
        <el-table :data="tableData" stripe style="width: 100%"
                  show-summary
                  :summary-method="getSummaries">
          <el-table-column align="center" prop="id" v-if="idShow" label="ID" ></el-table-column>
          <el-table-column align="center" prop="date" label="日期" sortable  >
            <template slot-scope="scope">
              {{scope.row.date  | formatDateTime}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="user" label="用户"></el-table-column>
          <el-table-column align="center" prop="breakfast" label="早餐"></el-table-column>
          <el-table-column align="center" prop="lunch" label="午餐" ></el-table-column>
          <el-table-column align="center" prop="dinner" label="晚餐" ></el-table-column>
          <el-table-column align="center" prop="traffic" label="交通" ></el-table-column>
          <el-table-column align="center" prop="sock" label="零食" ></el-table-column>
          <el-table-column align="center" prop="clothes" label="服装" ></el-table-column>
          <el-table-column align="center" prop="clothesRemind" label="服装费用备注" ></el-table-column>
          <el-table-column align="center" prop="play" label="娱乐" ></el-table-column>
          <el-table-column align="center" prop="playRemind" label="游玩费用备注" ></el-table-column>
          <el-table-column align="center" prop="others" label="其他" ></el-table-column>
          <el-table-column align="center" prop="othersRemind" label="其他费用备注" ></el-table-column>
          <el-table-column align="center" prop="gifts" label="人情礼物" ></el-table-column>
          <el-table-column align="center" prop="giftsRemind" label="人情礼物费用备注" ></el-table-column>
          <el-table-column align="center" prop="work" label="是否上班" sortable>
            <template slot-scope="scope">
                {{scope.row.work == 1? "上班" : "不上班"}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="sumCalc" label="总计" >

          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="toolbar">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
      <el-col :span="24">
        <div id="chartColumn" style="width: 100%; height: 400px;"></div>
      </el-col>
      <el-col :span="24">
        <div id="chartBar" style="width: 100%; height: 400px;"></div>
      </el-col>
      <el-col :span="24">
        <div id="chartPie" style="width: 100%; height: 400px;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import store from '@/store/store'
  import {formatDate} from '@/assets/js/tool'
  import {getAllSpending} from '@/assets/userapi'
  import echarts from 'echarts'
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
        },
        chartColumn: null,
        chartBar: null,
        dateArr: [],
        costArr: []
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
          data=data.data
          if(1 === data.code){
            if(data.data.length>0){
              that.tableData=data.data;
              that.tableData.forEach((item, index) => {
                that.tableData[index].sumCalc = parseFloat(item.breakfast)+parseFloat(item.lunch)+parseFloat(item.dinner)+
                  parseFloat(item.traffic)+parseFloat(item.sock)+parseFloat(item.clothes)+
                  parseFloat(item.play)+parseFloat(item.others)+parseFloat(item.gifts);
                that.dateArr.push(formatDate(new Date(item.date), "yyyy-MM-dd"));
                that.costArr.push(that.tableData[index].sumCalc);
                that.drawShape();
              })
            }else{

            }
          }else{
            that.$message.error('系统异常');
          }

        }).catch(function (error) {
          that.$message.error('系统异常');
        })
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

      // 房间号的合计去掉
      getSummaries (param) {
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计'
          } else if (index === 2 || index === 3 || index === 4 || index === 5
            || index === 6 || index === 7 || index === 9 || index === 11 || index === 14) {
            const values = data.map(item => Number(item[column.property]))
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                  return prev + curr
                } else {
                  return prev
                }
              }, 0)
            }else {
              sums[index] = 'N/A'
            }
          } else {
            sums[index] = '--'
          }
        })
        return sums
      },
      drawShape(){
        var that = this;
        this.chartColumn = echarts.init(document.getElementById('chartColumn'));
        this.chartBar = echarts.init(document.getElementById('chartBar'));
        this.chartPie = echarts.init(document.getElementById('chartPie'));

        this.chartColumn.setOption({
          title: { text: '月度趋势图' },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: that.dateArr
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: that.costArr,
            type: 'line'
          }]
        });

        this.chartBar.setOption({
          title: { text: '日消费图' },
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : that.dateArr,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'日消费',
              type:'bar',
              barWidth: '60%',
              data:that.costArr
            }
          ]
        });
        this.chartPie.setOption({
          title : {
            text: '部门统计',
            subtext: '',
            x:'left',
            textStyle:{
              color:"#222",
              fontStyle:"normal",
              fontWeight:"600",
              fontFamily:"san-serif",
              fontSize:16,
            }
          },
          tooltip : {
            trigger: 'item',
            /* formatter: "{a} <br/>{b} : ({c}门) {d}%"*/
            formatter: "{a} {b} : ({c}门) {d}%"
          },
          legend: {
            x : '70%',
            y : '25%',
            orient: 'vertical',
            left: 'left',
            itemWidth:10,
            itemHeight:10,
            selectedMode:false, //禁止点击
            textStyle: {
              fontSize: 12,
              color:"#999",
            },
            formatter: function (name) { //避免文字太长做省略处理
              return name.length > 4 ? (name.slice(0,4)+"...") : name
            },
            data: []
          },
          series : [
            {
              name: '',
              type: 'pie',
              radius : '75%',
              center: ['60%', '54%'],
              hoverAnimation:false, //是否开启 hover 在扇区上的放大动画效果
              selectedMode:'single',  //选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'，'multiple'，分别表示单选还是多选。
              selectedOffset:5, //选中扇区的偏移距离
              data:[],
              itemStyle: {
                normal:{
                  label:{
                    show:true,
                    textStyle: {
                      fontSize: 12
                    },
                    /* formatter: '{b} : ({c}门) \n {d}%'	*/
                    formatter: function(params){ //避免文字太长做省略处理
                      var name=params.name; //名字
                      var percent=params.percent; //占比
                      var value=params.value; //数量
                      if(name.length>8){
                        return name.slice(0,7)+"..."+"\n"+"("+value+"门)"+percent+"%";
                      }else{
                        return name+"\n"+"("+value+"门)"+percent+"%";
                      }
                    }
                  },
                  labelLine:{
                    show:true
                  }
                },
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
          color: ['rgb(187,140,238)','rgb(134,146,243)','rgb(60,184,255)','rgb(113,171,246)','rgb(255,193,134)'] //饼图分块颜色设置
        })
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
