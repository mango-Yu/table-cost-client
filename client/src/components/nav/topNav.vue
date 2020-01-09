<template>
  <el-menu
    :router="true"
    :default-active="defaultActiveIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="/form">消费记录</el-menu-item>
    <el-menu-item index="/list">消费列表</el-menu-item>
    <el-submenu  index="4" style="float: right">
      <template slot="title"><span>欢迎你 {{name}}</span></template>
      <el-menu-item index="4-1" @click="logout">退出</el-menu-item>
      <el-menu-item index="4-2" @click="dialogVisible = true">修改密码</el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>
  import {road} from '../../road.js'
    export default {
      data(){
        return {
          name: '',
          defaultActiveIndex: '/main',
          dialogVisible: false,
          passsword:{
            origain:"",
            newword:"",
            remewword:""
          }
        }
      },
      created() {
        road.$on('name', (text) => {
          this.name = text;
        });


      },
      methods: {
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
      }
    }
</script>

<style scoped>

</style>
