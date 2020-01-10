<template>
  <el-container style="height: 100%">
    <el-main>
      <div class="main">
         <div class="mian-content">
             <forms @goinit="init"></forms>
         </div>
        <div class="main-remind">
          <div class="remind">
            <div class="remind-title">整月小结</div>
            <ul>
              <li >月份<el-date-picker   type="month" placeholder="选择日期" format="yyyy-MM"  value-format="yyyy-MM" v-model="month" @change="change" style="width: 150px;float: right"></el-date-picker></li>
              <li >吃饭费用：{{eat}}  &nbsp;早中晚:({{form.breakfast}},{{form.lunch}},{{form.dinner}} )</li>
              <li >交通费用：{{form.traffic}}</li>
              <li >零食费用：{{form.sock}}</li>
              <li >衣服费用：{{form.clothes}}</li>
              <li >游玩费用：{{form.play}}</li>
              <li >其他费用：{{form.others}}</li>
              <li >费用总计：{{count}}</li>
            </ul>
          </div>
        </div>
      </div>
    </el-main>

  </el-container>
</template>

<script>
  import store from '@/store/store'
  import {getSumByDate} from '@/assets/userapi'
  import forms from  '@/components/use/forms'

  export default {
    name: "mains",
    store,
    data:function(){
      return {
        month:"",
        count:0,
        now:"",
        form: {
          breakfast: 0,
          lunch: 0,
          dinner: 0,
          traffic: 0,
          sock: 0,
          clothes: 0,
          play: 0,
          others: 0,
        }
      }
    },
    mounted(){
      let date=new Date();
      let month=date.getMonth()+1
      let year=date.getFullYear()
      month=(month <10)?("0"+month):month
      this.month=year+'-'+month
      console.log(this.nextmonth)
      this.now=year+'-'+month;
      this.init();

    },
    computed: {
      eat(){
        return (this.form.breakfast+this.form.lunch+this.form.dinner).toFixed(2)
      },
      nextmonth(){
        let arr=this.month.split("-")
        let time=""
         if(parseInt(arr[1])==12){
           time= (parseInt(arr[0])+1)+'-01'
         }else {
          let m=(parseInt(arr[1])+1);
           time= arr[0]+'-'+((m<10)?('0'+m):m)
         }
         return time
      }
    },
    methods: {

      init(){
        let that=this;
        that.count=0;
        getSumByDate(this.month,this.nextmonth).then(function (data) {
          console.log(data.data.data[0])
          let obj=data.data.data[0]
          let newObj={}
          for(let i in obj){
            if(obj[i]==null){
              that.count+=0;
              let str=i.split(')')[0].split('(')[1]
              that.form[str]=0
            }else{
              that.count+=obj[i];
              console.log(obj[i])
              let str=i.split(')')[0].split('(')[1]

              that.form[str]=obj[i]
            }

          }
        }).catch(function (data) {
          console.log(data)
        })
      },
      change(){
        console.log(this.nextmonth)
        if(this.month<'2018-05'){
          this.month='2018-05';
          this.$message.error('2018-05是最早时间');

        }
        if(this.month>this.now){
          this.month=this.now;
          this.$message.error(this.now+'是最晚时间');

        }
        this.init()
      },
      getTwo(val){
        return parseInt(val*100)/100.0
      }

    },
    components:{
      forms
    }


  }
</script>

<style scoped>

  .el-header {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 100px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
  .main{
    width: 1000px;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    margin: 10px auto;
    padding: 0 16px;
    min-height: 100vh;
  }
  .mian-content{
    width: 694px;
    padding-bottom: 20px;
  }
  .main-remind{
    width: 296px;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
  .mian-content{
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    text-align: left;
  }


  .remind .remind-title{
    line-height: 40px;
    font-weight: 600;
  }
  .remind ul{
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
  .remind li{
    line-height: 40px;
    list-style: none;
    overflow: hidden;
    height: 40px;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid #ddd;
    text-align: left;

  }



</style>
