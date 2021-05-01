<template>
  <div class="search-list-wrap">
      <div class="user-info">
          <div class="photo">
              <img src="" alt="">
          </div>
          <div class="user-name">
              <div class="name">
                  {{user.username}}
              </div>
              <div class="login-time">
                  {{user.logintime}}
              </div>
          </div>
      </div>
    <div class="search-list-body">
        <div class="list-block">
            <div class="list-title">
                Saved hotels <span>({{userList.length}})</span> 
            </div>
      <div
        class="hotel-card"
        v-for="(hotel, index) in userList"
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
        </div>
        <div id="hotel-name">{{hotel.hotelname}}</div>
        <button type="button" class="btn btn-light" @click="onDeleteList(index)">delete</button>
      </div>
      </div>
      
      <div class="list-block">
            <div class="list-title">
                Browsed History <span>({{userHitory.length}})</span> 
            </div>
      <div
        class="hotel-card"
        v-for="(hotel, index) in userHitory"
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
        </div>
        <div id="hotel-name">{{hotel.hotelname}}</div>
        <button type="button" class="btn btn-light" @click="onDeleteHistory(index)">delete</button>
      </div>
      </div>

      <div class="review-list">
          <div class="list-title">
                My Reviews <span>({{userReviews.length}})</span> 
            </div>
          <div class="review-card" v-for="(review, index) in userReviews" :key="index">
            <div class="review-info">
              <div class="user-info">
                <div class="username">{{review.username}}</div>
                <div class="date">{{review.date}}</div>
              </div>
              <div class="rating">
                <span>rating: {{review.rating}}</span>
                <span>{{review.title}}</span>
              </div>
            </div>
            <div class="review-content">
              <p>{{review.reviewtext}}</p>
            </div>
            <div class="btn">
                <button type="button" class="btn btn-link" data-toggle="modal"
            data-target="#exampleModal" @click="selectedReview = index">edit</button>
                <button type="button" class="btn btn-link" @click="onDeleteReview(index)">delete</button>
            </div>
          </div>
        </div>
        <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit your review</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <select class="form-control" id="exampleFormControlSelect1" v-model="rating">
                    <option disabled value>Select a rating</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter a title"
                    v-model="title"
                  />
                </div>

                <div class="form-group">
                  <textarea
                    v-model="reviewtext"
                    placeholder="Enter your review (less than 300 charactors)"
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                :disabled="rating==''||reviewtext==''||title==''"
                @click="onEditReview()"
              >Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        selectedReview: 0,
        user: JSON,
      userReviews: [],
      userList: [],
      userHitory: [],
      rating: "",
      title: "",
      reviewtext: "",
    };
  },
  mounted() {
      this.user = JSON.parse(localStorage.getItem('user'))
      if(this.user == null){
          this.$router.push('/');
      }
    this.getProfile();
  },
  methods: {
      onDeleteReview(index){
          let _this = this;
      this.$axios({
        methods: "get",
        url:
          "http://localhost:8080/review?" +
          "reviewid=" + _this.userReviews[index].reviewid+
          "&update=false"
          
      })
        .then(function(res) {
          console.log(res);
          if (res.data.success)
          _this.userReviews.splice(index, 1);
        })
        .catch(function(res) {
          console.log(res);
        });
      },
      onEditReview(){
          let _this = this;
      this.$axios({
        methods: "get",
        url:
          "http://localhost:8080/review?" +
          "reviewid=" +
          _this.userReviews[_this.selectedReview].reviewid +
          "&update=true" +
          "&title=" + _this.title +
          "&rating=" + _this.rating +
          "&reviewtext=" + _this.reviewtext
          
      })
        .then(function(res) {
          console.log(res);
          if (res.data.success)
          _this.userReviews[_this.selectedReview].title = _this.title
          _this.userReviews[_this.selectedReview].rating = _this.rating
          _this.userReviews[_this.selectedReview].reviewtext = _this.reviewtext

        })
        .catch(function(res) {
          console.log(res);
        });
      },
      onDeleteList(index){
          let _this = this;
      this.$axios({
        methods: "get",
        url:
          "http://localhost:8080/mylist?" +
          "hotelid=" +
          _this.userList[index].hotelid +
          "&saved=true"
          
      })
        .then(function(res) {
          console.log(res);
          if (res.data.success)
          _this.userList.splice(index, 1);
        })
        .catch(function(res) {
          console.log(res);
        });
      },
      onDeleteHistory(index){
          let _this = this;
      this.$axios({
        methods: "get",
        url: "http://localhost:8080/history?" + "hotelid=" + _this.userHitory[index].hotelid +
        "&insert=false"
      })
        .then(function(res) {
          console.log(res);
          if(res.data.success)
          _this.userHitory.splice(index, 1);
        })
        .catch(function(res) {
          console.log(res);
          
        });
      },
    getProfile() {
      let _this = this;
      this.$axios({
        methods: "get",
        url:
          "http://localhost:8080/profile?" +
          "userid=" +
          _this.user.userid
      })
        .then(function(res) {
          console.log(res);
          _this.userReviews = res.data.userreviews;
          _this.userList = res.data.userlist;
          _this.userHitory = res.data.userhistory;
          
          
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

.list-block{
    margin: 10px 0;
    display: flex;
  flex-wrap: wrap;
  min-height: 200px;
}
.list-title{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid black;
    margin-bottom: 10px;
}
.review-list {
  margin: 10px 0;
  height: auto;
  margin-bottom: 50px;
}
.review-card {
  min-height: 200px;
  padding: 10px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #ebebeb;
  text-align: left;
}
.review-card .rating span {
  margin-right: 10px;
}
</style>