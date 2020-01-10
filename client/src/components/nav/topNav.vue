<template>
  <div>
    <el-menu
      :router="true"
      :default-active="defaultActiveIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/main">消费记录</el-menu-item>
      <el-menu-item index="/list">消费列表</el-menu-item>
      <el-submenu index="/main" style="float: right">
        <template slot="title"><span>欢迎你 {{name}}</span></template>
        <el-menu-item   @click="logout">退出</el-menu-item>
        <el-menu-item    @click="dialogVisible = true">修改密码</el-menu-item>
      </el-submenu>
    </el-menu>
      <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        width="500px"
      >
        <el-form ref="passsword"   :model="passsword"  label-width="80px">
          <el-form-item label="原来密码">
            <el-input type="password"  v-model="passsword.origain"></el-input>
          </el-form-item>
          <el-form-item label="新的密码">
            <el-input type="password" v-model="passsword.newword" ></el-input>
          </el-form-item>
          <el-form-item label="重复密码">
            <el-input type="password" v-model="passsword.remewword" ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changePas">确 定</el-button>
      </span>
      </el-dialog>
  </div>
</template>

<script>
  import store from '@/store/store'
  import {changePassword} from '@/assets/userapi'
    export default {
      store,
      data(){
        return {
          defaultActiveIndex: '/main',
          dialogVisible: false,
          passsword:{
            origain:"",
            newword:"",
            remewword:""
          },
        }
      },
      computed: {
        name() {
          return this.$store.state.name
        }
      },
      created(){
        this.getUrl();
      },
      methods: {
        getUrl(){
          let self = this;
          let currentUrl = window.location.href;
          self.defaultActiveIndex = currentUrl.split('#')[1];
        },
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        logout(){
          this.$confirm('确认退出?', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            this.out();
          }).catch(() => {

          });
        },
        out(){
          sessionStorage.removeItem('name');
          this.$router.push('/')
        },
        changePas(){
          if(this.passsword.origain==''){
            this.$message.error('请输入原来的密码');
            return
          }
          if(this.passsword.newword==''){
            this.$message.error('请输入新的的密码');
            return
          }
          if(this.passsword.remewword==''){
            this.$message.error('重复密码');
            return
          }
          if(this.passsword.remewword!=this.passsword.newword){
            this.$message.error('新的的密码与重复密码不一致');
            return
          }
          let that=this;
          changePassword(this.passsword.origain,this.passsword.newword).then(function (data) {
            console.log(data)
            let  newdata=data.data;
            if(newdata.code==1){
              that.$message.success('修改成功');
              that.dialogVisible=false
            }else{
              that.$message.error(newdata.msg);
            }
          }).catch(function (error) {
            console.log(error)
            that.$message.error('未知异常');

          })

        }
      }
    }
</script>

<style scoped>
  .el-dialog{
    text-align: left;
  }
</style>
