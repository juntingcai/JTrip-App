<template>
  <div id="app">
    <div
      class="header"
      v-bind:style="{color: headerColor, background: headerBg, borderBottom: headerBorder}"
    >
      <div class="logo">
        <img :src="require('../src/assets/facebook_cover_photo_1.png')" alt />
      </div>
      <div class="log-out nav-item" @click="onLogOut()">Log Out</div>
      <div class="my-save nav-item" @click="showLogin=true,showRegister=true">Sign up</div>
      <div class="history nav-item" @click="$router.push('/profile')">My Profile</div>
      <div class="search nav-item" @click="$router.push('/')">Search</div>
    </div>
    <router-view></router-view>

    <div class="dialog" v-show="showLogin">
      <div class="dialog-wrap">
        <div class="dialog-content">
          <div v-if="showRegister==false" class="login-form">
            <div class="title">
              <h1>Sign In to Start!</h1>
            </div>
            <form v-on:submit.prevent="login()">
              <div class="form-group">
                <input
                  v-model="username"
                  type="username"
                  class="form-control"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  placeholder="Enter password"
                />
              </div>
              <div class="form-group form-check">
                <label class="form-check-label">
                  <input class="form-check-input" type="checkbox" /> Remember me
                </label>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <div class="div-line">
              <div class="line"></div>
            </div>
            <div class="link">
              <span class="link-text">Don't have a account?</span>
              <span>
                <span id="signup-btn" @click="onSignUp()">Sign up</span>
              </span>
            </div>
          </div>

          <div v-else class="register-form">
            <div class="title">
              <h1>Create Your Account</h1>
            </div>
            <form v-on:submit.prevent="register()">
              <div class="form-group">
                <input
                  v-model="username"
                  type="username"
                  class="form-control"
                  placeholder="Create a username"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  placeholder="Greate a Password"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="checkpassword"
                  type="password"
                  class="form-control"
                  placeholder="Re-enter Password"
                />
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
              <div class="div-line">
                <div class="line"></div>
              </div>
              <div class="link">
                <span class="link-text">Already have a account?</span>
                <span>
                  <span id="signin-btn" @click="onSignIn()">Sign in</span>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- transition 这里可以加一些简单的动画效果 -->
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  
  data() {
    return {
      headerColor: "white",
      headerBg: "none",
      headerBorder: "none",
      showLogin: false,
      showRegister: false,
      username: "",
      password: "",
      checkpassword: "",
      lastLogin: String,
    };
  },
  mounted() {
    console.log(111);
    this.$router.afterEach((to, from, next) => {
      console.log(to, from, next);
      if (to.meta.title == "home") {
        this.headerColor = "white";
        this.headerBg = "none";
        this.headerBorder = "none";
      } else {
        this.headerColor = "black";
        this.headerBg = "white";
        this.headerBorder = "0.8px solid #ebebeb";
      }
    });
    this.checkLogin();
  },

  methods: {
    checkLogin() {
      if (localStorage.getItem("user") == null) {
        console.log(this.showLogin);
        this.showLogin = true;
      }
    },
    onSignUp() {
      (this.showRegister = true), (this.username = ""), (this.password = "");
    },
    onSignIn() {
      (this.showRegister = false), (this.username = ""), (this.password = "");
    },
    onLogOut() {
      let _this = this;
      this.$axios({
        methods: "get",
        url: "http://localhost:8080/login?logout=true"
      })
        .then(function(res) {
          console.log(res);
          (_this.showLogin = true), localStorage.clear();
        })
        .catch(function(res) {
          console.log(res);
        });
    },
    login() {
      if (this.username.length == 0) console.log("please enter username");
      else if (this.password.length == 0) console.log("please enter password");
      else {
        var params = new URLSearchParams();
        params.append("username", this.username); //你要传给后台的参数值 key/value
        params.append("password", this.password);
        let _this = this;
        this.$axios({
          method: "post",
          url: "http://localhost:8080/login",
          data: params
        })
          .then(function(res) {
            console.log(res);
            localStorage.setItem("user", JSON.stringify(res.data));
            _this.showLogin = false;
            _this.lastLogin = res.data.logintime;
            console.log(_this.lastLogin)
          })
          .catch(function(res) {
            console.log(res);
          });
      }
    },
    register() {
      // var xmlhttp = new XMLHttpRequest();
      // xmlhttp.withCredentials = true;

      // xmlhttp.onreadystatechange = function() {
      //   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //     var response = JSON.parse(xmlhttp.responseText)
      //     if(!response.data.success){
      //       console.log(response.data.invalid)
      //     }
      //     else{
      //       localStorage.setItem("user",response.data)
      //       this.showLogin = false
      //     }
      //   }
      // };
      // xmlhttp.open("post", "http://localhost:8080/register", true);
      // xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      // xmlhttp.send("username="+this.username+"&password="+this.password);
      
      if(!/(?=.*\d)(?=.*[a-z])(?=.*[@#$!^&*]).{5,}/.test(this.password)){
        
        alert("password invalid")
        return;
      }
      if(this.password!=this.checkpassword){
        alert("re-enter password not matched")
        return;
      }
      var params = new URLSearchParams();
      params.append("username", this.username); //你要传给后台的参数值 key/value
      params.append("password", this.password);
      this.$axios({
        method: "post",
        url: "http://localhost:8080/register",
        data: params
      }).then(res => {
        if (res.data != null) {
          if (!res.data.success) {
            alert(res.data.invalid);
          } else {
            var user = res.data;
            delete user["success"];
            localStorage.setItem("user", JSON.stringify(user));
            this.showLogin = false;
            this.showRegister = false;
          }
        }
      });
    }
  }
};
</script>

<style>
#app {
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica Neue, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  min-width: 1000px;
  height: 100vh;
  min-height: 600px;
  width: 100%;
}
.dialog {
  position: fixed !important;
  z-index: 2000 !important;
  top: 0px !important;
  right: 0px !important;
  bottom: 0px !important;
  left: 0px !important;
  overflow-y: auto !important;
  height: 100%;
  width: 100%;

  background: rgba(0, 0, 0, 0.75) !important;
}

.dialog-wrap {
  vertical-align: middle;
  padding: 64px !important;
  height: 100% !important;
  width: 100% !important;
  box-sizing: border-box;
}

.dialog-content {
  background-color: rgb(255, 255, 255) !important;
  max-width: 568px !important;
  width: 100% !important;
  position: relative !important;
  margin: auto !important;
}
.login-form,
.register-form {
  background-color: rgb(255, 255, 255) !important;
  box-sizing: border-box !important;
  padding: 32px !important;
}
.div-line {
  margin: 16px 0;
}
.div-line .line {
  border-bottom: 1px solid #ebebeb;
}
.header {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 75px;
  font-size: 16px;
  padding: 0 10px;

  z-index: 999;
}

.logo {
  height: 100%;
  float: left;
  margin-left: 10px;
  box-sizing: border-box;
  padding: 10px;
}

.logo img {
  height: 100%;
  width: auto;
}
.log-out,
.my-save,
.history,
.my-save,
.search {
  float: right;
  cursor: pointer;
}

.nav-item {
  box-sizing: border-box;
  height: 100%;
  padding: 0 15px;
  text-align: center;
  line-height: 75px;
  font-weight: 500;
}
.title {
  margin-bottom: 20px;
}
.title h1 {
  text-align: left;
  font-size: 30px;
  font-weight: bold;
}
.login-form .form-group,
.register-form .form-group {
  margin-bottom: 20px;
}
.login-form .form-control,
.register-form .form-control {
  height: 50px;

  width: 100%;
  height: 50px;

  font-weight: 500;
  line-height: 50px;
  border-radius: 5px;
}
.dialog button {
  width: 100%;
  height: 45px;
  font-size: 18px;
  line-height: 45px;
  border-radius: 5px;
  padding: 0;
}
.login-form .form-check {
  text-align: right;
}
#signin-btn,
#signup-btn {
  color: #008489;
  font-weight: bold;
  margin-left: 10px;
}
</style>
