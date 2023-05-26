<template>
  <div id="mypage">
    <Nav />
    <div class="content-container">
      <div class="mypage-top">
        <span class="point">보유 포인트 : <strong>{{ this.addComma(this.getLoginMember != null ? this.getLoginMember.point:0) }}</strong></span>
        <router-link :to="{ name: 'PointCharge', query: {} }" class="charge" >충전하기</router-link>
      </div>
      <div class="ad-detail-container">
        <div class="left-container">
          <a class="go-back" @click="goToPage('Mypage')">돌아가기</a>
          <div class="switch-wrap">
            <img :src="switchYn ? '/image/mypage/switch-on.png':'/image/mypage/switch-off.png'" @click="setAdState">
          </div>
          <p class="name">나이키 신발 광고 그룹 1</p>
          <div class="filter-wrap">
            <span class="filter" :class="this.filter_name === 'all' ? 'active':''" @click="setFilter('all');">전체기간</span>
            <span class="filter" :class="this.filter_name === 'today' ? 'active':''" @click="setFilter('today');">오늘</span>
            <span class="filter" :class="this.filter_name === 'yesterday' ? 'active':''" @click="setFilter('yesterday');">어제</span>
            <span class="filter" :class="this.filter_name === 'last7' ? 'active':''" @click="setFilter('last7');">최근 7일</span>
            <span class="filter" :class="this.filter_name === 'last30' ? 'active':''" @click="setFilter('last30');">최근 한 달</span>
            <span class="filter" :class="this.filter_name === 'custom' ? 'active':''" @click="setFilter('custom');">기간 설정</span>
            <div class="setting-wrap" v-if="this.filter_name === 'custom'">
              <div class="input-date-wrap">
                <input type="date" id="startdate" name="startdate" v-model="this.start_date"/>
              </div>
              <span class="gap">~</span>
              <div class="input-date-wrap">
                <input type="date" id="startdate" name="startdate" v-model="this.end_date"/>
              </div>
              <span class="search-btn" @click="checkDate">조회</span>
            </div>
          </div>
          <div class="status-box">
            <div class="item">
              <p class="label">노출 수</p>
              <p class="val">{{ addComma(this.shows) }}</p>
            </div>
            <div class="item">
              <p class="label">클릭 수</p>
              <p class="val">{{ addComma(this.hits) }}</p>
            </div>
            <div class="item">
              <p class="label">클릭률 (CTR)</p>
              <p class="val">{{ this.shows === 0 ? 0 : Math.round((this.hits / this.shows) * 100) }}%</p>
            </div>
          </div>
          <p class="area-title">클릭한 사용자의 보유 키워드 순위</p>
          <div class="rank-table">
            <div class="wrap">
              <div class="item" v-for="(k,i) in this.keywordCntList.slice(0,5)">
                <span class="rank">{{ i+1 }}위 ({{ k.cnt }})</span>
                <span class="val">{{ k.name }}</span>
              </div>
            </div>
            <div class="wrap">
              <div class="item" v-for="(k,i) in this.keywordCntList.slice(5,10)">
                <span class="rank">{{ i+6 }}위 ({{ k.cnt }})</span>
                <span class="val">{{ k.name }}</span>
              </div>
            </div>
          </div>
          <p class="area-title">설정한 사용자 키워드</p>
          <div class="keyword-table">
            <p class="area-title">선택한 키워드</p>
            <div class="line">
              <span v-for="k in this.commonKeywordList">{{ k.name }}</span>
            </div>
            <div class="line">
              <span class="chk" v-for="k in this.keywordList">{{ k.name }}</span>
            </div>
            <p class="area-title">반드시 포함되어야 할 키워드</p>
            <div class="line">
              <span v-for="k in this.commonKeywordList.filter(item => item.mandatory)">{{ k.name }}</span>
              <span class="chk" v-for="k in this.keywordList.filter(item => item.mandatory)">{{ k.name }}</span>
            </div>
          </div>
        </div>
        <div class="right-container">
          <div class="right-wrap">
            <p class="page-title">해당 키워드를 보유한 <span class="colored">회원 수</span></p>
            <p class="peo">
              <span>약 </span>
              0,000
              <span> 명</span>
            </p>
            <p class="txt">이렇게 <strong>광고 되고 있어요!</strong></p>
            <div class="preview-box">
              <div class="img-wrap" style="background: url('/image/ad/img-upload.png')" v-if="this.images_view.length === 0"></div>
              <div class="img-wrap" :style="'background: url('+getOneImagePath(this.images_view[0].path)+')'" v-else></div>
              <p class="brand">{{ this.brand }}</p>
              <p class="preview-title" v-html="this.replaceContent(this.name)"></p>
              <div class="hashtag-wrap">
                <span class="hashtag" v-for="keyword in this.keywordsList">#{{keyword.value}}</span>
              </div>
              <div class="keywordyn" @click="keywordOpenYn = !keywordOpenYn">
                <span class="keyword-title">내 키워드와 </span>
                <span class="skeyword">*개</span>
                <span class="keyword-title"> 일치해요</span>
                <i class="fas fa-chevron-down" v-if="!keywordOpenYn" ></i>
                <i class="fas fa-chevron-up" v-if="keywordOpenYn"></i>
              </div>
              <div class="keyword-wrap" :class="keywordOpenYn ? 'open' : 'close'">
                <span class="keyword">키워드1</span>
                <span class="keyword">키워드2</span>
                <span class="keyword">키워드3</span>
                <span class="keyword">키워드4</span>
                <span class="keyword">키워드5</span>
              </div>
              <div class="price-wrap">
                <span class="sale">{{ this.discount }}%</span>
                <span class="cost">{{ addComma(this.price/1) }}원</span>
                <span class="discount">{{ this.addComma(Math.round(this.price * ( 1 - (this.discount / 100) ))) }}원</span>
              </div>
            </div>
            <div class="edit-wrap">
              <span class="del" @click="removeAd">삭제</span>
              <span class="modify" @click="goToStep1">수정</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '/src/components/mypage/Nav.vue';
import { mapGetters } from "vuex"
import { http,http2 } from '@/services';

export default {
  computed: {
    ...mapGetters(["getLoginMember"]),
  },
  components: {
    Nav,
  },
  props: [''],
  data() {
    return {
      switchYn: false,
      keywordOpenYn: false,
      filter_name:'all',
      start_date:null,
      end_date:null,
      ad:0,
      title:'',
      type:1,
      categoryName:'',
      category:0,
      brand:'',
      name:'',
      price:0,
      discount:0,
      link:'',
      shows:0,
      hits:0,
      state:0,
      keyword_input:'',
      keywords:'',
      keywordsList:[],
      images:'',
      images_view:[],
      image_support:false,
      categoryYn: false,
      categoryList:[],
      commonKeywordList:[],
      keywordList:[],
      keywordCntList:[],
    }
  },
  watch: {

  },
  methods: {
    fixedMenu() {
      let fixedContainer = document.querySelector(".right-wrap");
      let footer = document.querySelector('#footer-container');
      window.onscroll = () => {
        if (window.scrollY >= 80) {
          fixedContainer.classList.add("is-fixed");
        }
        else {
          fixedContainer.classList.remove("is-fixed");
        }
        if(window.scrollY >= 600){
          fixedContainer.classList.add("is-stop");
          // fixedContainer.style.top = getRectTop(footer)+'px';
        }
        else {
          fixedContainer.classList.remove("is-stop");
        }
      }
    },
    getRectTop(el){
      var rect = el.getBoundingClientRect();
      return rect.top;
    },
    setFilter(value){
      this.start_date = null;
      this.end_date = null;
      this.filter_name = value;
      if(value !== 'custom'){
        this.getAd();
      }
    },
    checkDate(){
      if(this.start_date == null || this.end_date == null || this.start_date > this.end_date){
        alert('시작일과 종료일을 정확히 설정해주세요.');
        return;
      }
      this.getAd();
    },
    getAd(){
      http.get("/ad/"+this.ad+"/"+this.filter_name+"/"+this.start_date+"/"+this.end_date).then((response) => {
        if (response.data.CODE == 200) {
          this.ad = response.data.BODY.ad;
          this.title = response.data.BODY.title;
          this.brand = response.data.BODY.brand;
          this.name = response.data.BODY.name;
          this.price = response.data.BODY.price;
          this.discount = response.data.BODY.discount;
          this.keywords = response.data.BODY.keywords;
          this.keywordsList = [];
          if(this.keywords != null) this.keywordsList = JSON.parse(this.keywords);
          this.images = response.data.BODY.images;
          this.images_view = JSON.parse(this.images);
          this.image_support = response.data.BODY.image_support;
          this.click_price = response.data.BODY.click_price;
          this.day_price = response.data.BODY.day_price;
          this.shows = response.data.BODY.shows;
          this.hits = response.data.BODY.hits;
          this.state = response.data.BODY.state;
          if(this.state === 2){
            this.switchYn = true;
          }
          if(response.data.BODY.commonKeywordList != null){
            this.commonKeywordList = response.data.BODY.commonKeywordList;
          }
          if(response.data.BODY.keywordList != null){
            this.keywordList = response.data.BODY.keywordList;
          }
          this.getAdClickMemberKeywordCnt();
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    removeAd(){
      http.delete("/ad/"+this.ad).then((response) => {
        if (response.data.CODE == 200) {
          alert('삭제되었습니다.');
          this.$router.push({ name: 'Mypage', query: {} });
        } else {
          alert('시스템문제 발생. 관리자에게 문의하세요.');
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    goToStep1(){
      this.$router.push({ name: 'Step1', query: {key:this.ad} });
    },
    getAdClickMemberKeywordCnt(){
      http.get("/ad/"+this.ad+"/click/member/keyword").then((response) => {
        if (response.data.CODE == 200) {
          this.keywordCntList = response.data.BODY;
          if(this.keywordCntList.length < 10){
            let cnt = 10 - this.keywordCntList.length;
            for(let i=0; i<cnt; i++){
              this.keywordCntList.push({name:'-',cnt:0})
            }
          }
        } else {
          alert('시스템문제 발생. 관리자에게 문의하세요.');
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    setAdState(){
      if(this.state !== 2 && this.state !== 3){
        alert('해당 광고는 아직 검수중입니다.');
        return;
      }
      let param = {

      }
      if(this.switchYn){ // 진행중 -> 중지
        param.state = 3;
        param.state_error = '사용자 직접 중지';
      } else { // 중지 -> 진행중
        param.state = 2;
      }

      http.put("/ad/"+this.ad+"/state", param).then((response) => {
        if (response.data.CODE == 200) {
          alert('상태가 변경되었습니다.');
          this.getAd();
        } else {
          alert('시스템문제 발생. 관리자에게 문의하세요.');
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  created() {
  },
  mounted() {
    this.fixedMenu();
    if(this.$route.query.key != null){
      this.ad = this.$route.query.key;
      this.getAd();
    } else {
      alert('잘못된 접근입니다.');
      this.$router.push({ name: 'Mypage', query: {} });
    }
  }
}
</script>
