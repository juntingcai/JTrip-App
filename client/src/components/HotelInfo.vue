<template>
  <div class="hotel-info-wrap">
    <div class="hotel-info-body">
      <div class="hotel-title-block">
        <div class="hotel-name-rating">
          <div id="hotel-name">{{hotel.hotelname}}</div>
          
        </div>
        <div class="save-btn">
          <button class="save btn btn-primary" @click="onSave()">{{saveBtnTx}}</button>
        </div>
      </div>
      <div class="hotel-info-block">
        <div class="hotel-img">
          <img
            src="https://thumbnails.trvl-media.com/IThrhyzUcfuS-u0rbECqz9ek2lc=/1200x800/smart/images.trvl-media.com/hotels/34000000/33470000/33462100/33462010/0ce4f83d_w.jpg"
            alt
          />
        </div>
        <div class="attraction-block">
          <div class="location-block">
            <div class="location-title">Location</div>
            <div id="location">{{hotel.address}},{{hotel.city}},{{hotel.state}}</div>
            <div id="expedia-link">
              <a
                :href="'https://www.expedia.com/h'+hotel.hotelid+'.Hotel-Information'"
                @click="addHistory()"
                target="_blank"
              >See more info in Expedia</a>
            </div>
          </div>
          <div class="attraction-title">what's nearby</div>
          <div class="attraction-list">
              <div class="attraction-row" v-for="(attraction, index) in attractions" :key="index">
            <div class="attraction-name">{{attraction.name}}</div>
            <div class="attraciton-rating">{{attraction.rating}}</div>
          </div>
          </div>

          
        </div>
      </div>

      <!-- Modal -->
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
                @click="addReview()"
              >Submit</button>
            </div>
          </div>
        </div>
      </div>
      <div class="review-block">
        <div class="review-summary-block">
          <div class="summary-text">Overall reviews</div>
          <div class="rating">{{hotel.avgrating.toFixed(1)}}/5</div>
          
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
          >Add Review</button>
        </div>
        <div class="review-list">
          <div class="review-card" v-for="(review, index) in hotelReviews.slice(10*currentPage, 10*currentPage +11)" :key="index">
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
          </div>
          <div class="btn-group" role="group" aria-label="Basic example">
  <button :disabled="currentPage<=0" type="button" class="btn btn-secondary" @click="currentPage -=1">Left</button>
  <button disabled type="button" class="btn btn-secondary">{{currentPage+1}}</button>
  <button :disabled="currentPage>=(hotelReviews.length/10)" type="button" class="btn btn-secondary" @click="currentPage+=1">Right</button>
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
      currentPage: 0,
      hotel: JSON,
      hotelReviews: JSON,
      attractions: JSON,
      rating: "",
      title: "",
      reviewtext: "",
      saved: Boolean,
      browsed: Boolean
    };
  },
  mounted() {
    this.hotel = JSON.parse(this.$route.query.hotel);
    console.log(this.hotel);
    this.getHotelInfo();
    //this.saveBtnTx = this.saved?"Remove from My Hotel":"Save to My Hotel"
  },
  computed: {
    saveBtnTx: function() {
      if (this.saved) return "Remove from My Hotel";
      else return "Save to My Hotel";
    }
  },
  methods: {
    addHistory() {
        if(this.browsed==false){
      let _this = this;
      this.$axios({
        methods: "get",
        url: "http://localhost:8080/history?" + "hotelid=" + _this.hotel.hotelid +
        "&insert=true"
      })
        .then(function(res) {
          console.log(res);
          if(res.data.success)
          _this.browsed = true
        })
        .catch(function(res) {
          console.log(res);
          
        });
        }
    },
    addReview() {
      var params = new URLSearchParams();
      params.append("hotelid", this.hotel.hotelid);
      params.append("rating", this.rating);
      params.append("title", this.title);
      params.append("reviewtext", this.reviewtext);

      this.$axios({
        method: "post",
        url: "http://localhost:8080/review",
        data: params
      })
        .then(function(res) {
          console.log(res);
        })
        .catch(function(res) {
          console.log(res);
        });
    },
    getHotelInfo() {
      let _this = this;
      this.$axios({
        methods: "get",
        url:
          "http://localhost:8080/hotelinfo?" +
          "hotel=" +
          JSON.stringify(_this.hotel)
      })
        .then(function(res) {
          console.log(res);
          _this.hotelReviews = res.data.reviews;
          _this.attractions = res.data.attractions;
          _this.saved = res.data.saved;
          _this.browsed = res.data.browsed;
        })
        .catch(function(res) {
          console.log(res);
          if(res.response.status==403)
            _this.$router.push("/")
        });
    },
    onSave() {
      let _this = this;
      this.$axios({
        methods: "get",
        url:
          "http://localhost:8080/mylist?" +
          "hotelid=" +
          _this.hotel.hotelid +
          "&saved=" +
          _this.saved
      })
        .then(function(res) {
          console.log(res);
          if (res.data.success) _this.saved = !_this.saved;
        })
        .catch(function(res) {
          console.log(res);
        });
    }
  }
};
</script>

<style scoped>
.hotel-info-wrap {
  margin-top: 75px;
  position: relative;
  width: 100%;
  background: #ebecf0;
}
.hotel-info-body {
  padding: 0 80px;
  width: 100%;
  height: 100%;
}
.hotel-title-block {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  background: white;
  align-items: center;
  border-bottom: 1px solid rgb(235, 235, 235);
  margin-bottom: 15px;
}
.hotel-name-rating {
  width: 70%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
}
#hotel-name {
  font-size: 30px;
  height: 60%;
}
#rating {
  height: 40%;
}
.hotel-info-block {
  width: 100%;
  min-height: 500px;
  display: flex;
  background: white;
  border-bottom: 1px solid rgb(235, 235, 235);
  margin-bottom: 15px;
}
.hotel-img {
  width: 70%;
  height: auto;
}
.hotel-img img {
  width: 100%;
}
.attraction-block {
  width: 30%;
  height: 500px;
  text-align: left;
  padding: 0 15px;
}
.location-block {
  height: 20%;
  border-bottom: 1px solid rgb(235, 235, 235);
}
.location-block .location-title,
.attraction-title {
  font-size: 20px;
  font-weight: bold;
}
.attraction-list{
    height: 75%;
    margin: 10px 0;
    box-sizing: border-box;
    overflow: scroll;
}
.attraction-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 8px;
  color: #6c757d;
  font-weight: 400;
}
#location {
  font-size: 15px;
  color: #6c757d;
  font-weight: 500;
}
.save-btn {
  margin-right: 20px;
}
#expedia-link {
  font-size: 13px;
  font-weight: 500;
  margin-top: 20px;
}
.attraciton-rating {
  color: #dc3545;
}
.review-block {
  margin-top: 15px;
  padding: 10px;
  width: 100%;
  height: auto;
  background: white;
  display: flex;
}
.review-summary-block {
  width: 30%;
  box-sizing: border-box;
  padding: 10px;
}
.review-summary-block .summary-text {
  text-align: left;
  font-size: 30px;
  font-weight: 500;
}
.review-summary-block .rating {
  font-size: 30px;
}
.review-list {
  width: 70%;
}
.review-card {
  min-height: 200px;
  margin: 0 30px;
  padding: 10px 0;
  box-sizing: border-box;
  border-bottom: 1px solid #ebebeb;
  text-align: left;
}
.review-card .rating span {
  margin-right: 10px;
}
</style>