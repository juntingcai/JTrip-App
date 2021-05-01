<template>
  <div class="home-wrap">
    <div class="outer-search-wrap">
      <div class="inner-search-wrap">
        <div class="search-block">
          <div class="search-title">
            <div class="text">Explore your trip for cities in Bay Area.</div>
          </div>
          <form v-on:submit.prevent="search()">
            <div class="form-group">
              <label for="city">City:</label>
              <input
                v-model="city"
                type="text"
                class="form-control"
                placeholder="San Francisco"
                id="city"
                
              />
            </div>
            <div class="form-group">
              <label for="text">Keyword:</label>
              <input
                v-model="keyword"
                type="text"
                class="form-control"
                placeholder="i.e Hillton"
                id="keyword"
                
              />
            </div>
            <div class="div-line">
              <div class="line"></div>
            </div>

            <button type="submit" class="btn btn-danger">Search</button>
          </form>
        </div>
      </div>

    </div>
    <div class="foot-block">
        <div class="login-time">
            Last loggned in at {{lastLogin}}
        </div>
        <div class="copy-right">
            @Copyright from JTripe
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "",
      keyword: "",
      lastLogin: "",
    };
  },
  mounted(){
      var user = JSON.parse(localStorage.getItem('user'))
      if(user.logintime!=null){
          this.lastLogin = user.logintime
      }
      else
      this.lastLogin = 'First time login'
  },
  methods: {
    search() {
      if (this.city.length == 0) alert("Please enter a city");
        else
        this.$router.push({
            name: "SearchList",
            query:{
                city: this.city,
                keyword: this.keyword
            }
        })
    }
  }
};
</script>

<style scoped>
.home-wrap {
  background: url("../assets/bg.jpg");
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100%;
  background-size: 100% auto;
  color: #484848;
}
.outer-search-wrap {
  position: relative;
  top: 150px;
  width: 100%;
}
.inner-search-wrap {
  width: 100%;
  padding: 0 100px;
  box-sizing: border-box;
}
.search-block {
  background: #ffffff !important;
  border-radius: 4px !important;
  padding: 32px !important;
  padding-bottom: 24px !important;
  width: 441px !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12) !important;
}
.search-title{
    margin-bottom: 10px;
}
.search-title .text {
  text-align: left;
  font-size: 2em;
  font-weight: bold;
}
.search-block .form-group{
  margin-bottom: 20px;
  
}
.search-block .form-control{
  height: 50px;
  
    width: 100%;
    height: 50px;
    
    font-weight: 500;
    line-height: 50px;
    border-radius: 5px;
}
.search-block button{
  width: 100%;
  height: 40px;
  font-size: 18px;
  line-height: 40px;
  padding:0;
  margin-bottom: 10px;
}
.search-block label{
    float: left;
    font-size: 15px;
    font-weight: bold;
    padding-left: 10px;
}
.div-line {
  margin: 16px 0;
}
.div-line .line {
  border-bottom: 1px solid #ebebeb;
}
.foot-block{
    color: #ebebeb;
    text-align: right;
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 10px;
}
</style>