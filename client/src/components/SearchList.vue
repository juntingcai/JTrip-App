<template>
  <div class="search-list-wrap">
    <div class="search-list-body">
      <div
        class="hotel-card"
        v-for="(hotel, index) in searchList"
        :key="index"
        @click="toDetail(index)"
      >
        <div class="hotel-img">
          <img
            src="https://thumbnails.trvl-media.com/IThrhyzUcfuS-u0rbECqz9ek2lc=/1200x800/smart/images.trvl-media.com/hotels/34000000/33470000/33462100/33462010/0ce4f83d_w.jpg"
            alt
          />
        </div>
        <div class="hotel-info">
          <div id="city">{{hotel.city}}</div>
          <div id="hotel-avgrating">{{hotel.avgrating.toFixed(1)}}</div>
        </div>
        <div id="hotel-name">{{hotel.hotelname}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchList: []
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      var city = this.$route.query.city;
      var keyword = this.$route.query.keyword;
      let _this = this;
      this.$axios({
        methods: "get",
        url:
          "http://localhost:8080/search?" +
          "city=" +
          city +
          "&keyword=" +
          keyword
      })
        .then(function(res) {
          console.log(res);
          if (res.data != null);
          _this.searchList = res.data;
          
        })
        .catch(function(res) {
          console.log(res);
        });
    },
    toDetail(index) {
      this.$router.push({
        name: "HotelInfo",
        query: {
          hotel: JSON.stringify(this.searchList[index])
        }
      });
    }
    // getImgs(){
    //     this.searchList.forEach(hotel => {
    //         if(hotel.imgurl==null)
    //         this.$axios({
    //             methods: 'post',
    //             url: "https://www.expedia.com/h" + hotel.hotelid + ".Hotel-Information",
    //             headers:{
    //                 "Access-Control-Allow-Origin":"*",
    //                 "Access-Control-Allow-Headers": true,
    // }
    //         }).then(function(res){
    //             console.log(res)
    //         }).catch(function(res){
    //             console.log(res);
    //         })
    //     });
    // }
  }
};
</script>

<style scoped>
.search-list-wrap {
  margin-top: 100px;
  position: relative;
  width: 100%;
  height: 100%;
  
}
.search-list-body {
  width: 100%;

  padding: 0 80px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}
.hotel-card {
  width: 25%;
  padding: 10px;
  margin: 0 0 5px 0;
}
.hotel-img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  overflow: hidden;
}
.hotel-img img {
  height: 100%;
  width: 100%;
}
.hotel-info {
  margin-top: 5px;
  text-align: left;
  display: flex;
  font-size: 15px;
}
#city {
  flex: 2.5;
  color: rgb(113, 113, 113);
}
#hotel-avgrating {
  flex: 1;
  color: brown;
  font-weight: bold;
  text-align: right;
}
#hotel-name {
  text-align: left;
  font-size: 20px;
}

</style>