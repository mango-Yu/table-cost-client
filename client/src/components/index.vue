<template>
  <div class="conent">
    <h3>登陆</h3>
    <!--<h5>这是一个简单的记账本，可以让你知道你的钱花在哪了</h5>-->
    <el-form ref="form" :model="form" label-width="0px">
      <el-form-item label="">
        <el-input v-model="form.name" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.passsword" placeholder="密码" type="password" @keyup.enter.native="onSubmit"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" style="margin-right: 20px" @click="onSubmit">登陆</el-button>
        <router-link to="/register">
          <el-button>注册</el-button>
        </router-link>

      </el-form-item>
    </el-form>
    <a class="footer-a" rel="nofollow" title="鲁ICP备17022870号" href="http://beian.miit.gov.cn"
       target="_blank">鲁ICP备17022870号</a>
  </div>
</template>

<script>
  import {login} from '@/assets/userapi'
  import store from '@/store/store'

  export default {
    name: "index",
    store,
    data: function () {
      return {
        form: {
          name: '',
          passsword: ''
        }
      }
    },
    methods: {
      onSubmit() {
        var that = this;
        var datas = {name: this.form.name, password: this.form.passsword}
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        login(this.form.name, this.form.passsword).then(function (data) {
          loading.close()
          data = data.data
          if (data.code == 1) {
            that.$message.success({
              message: '登陆成功', 'duration': 2000, onClose: function () {
                that.$store.commit('changeName', that.form.name)
                sessionStorage.setItem("name", that.form.name);
                that.$router.push("main")

              }
            })
          } else {
            that.$message.error(data.msg);
          }

        }).catch(function (error) {
          that.$message.error('登陆失败');
          console.log(error);
        });
      }
    },
    mounted: function () {
      console.log(login)
    }
  }
</script>

<style scoped>
  .conent {
    width: 400px;
    margin: auto;
    padding-top: 60px;
  }

  .footer-a {
    position: absolute;
    bottom: 20px;
    left: 50%;
    margin: 0 auto 0 -100px;;
    width: 200px;
  }

  .footer-a:hover {
    color: #f04489;
    text-decoration: underline;
  }
</style>
