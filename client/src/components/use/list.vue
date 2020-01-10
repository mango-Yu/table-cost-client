<template>
     <div ref="list">消费列表</div>
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

      }
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
              that.form=data.data[0]
            }else{
              for(let i in that.form){
                console.log(i)
                if (!(i == "playRemind" || i == "clothesRemind" || i == "othersRemind"||i == "date"||i=='user')) {
                  that.form[i]=0
                }else {
                  if(i != "date"&&i != "user"){
                    that.form[i]=""
                  }
                }

              }
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

      }

    }
  }
</script>

<style scoped>


</style>
