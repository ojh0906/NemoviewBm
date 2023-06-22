<template>
    <div id="ad-setting">
      <div class="step-container">
        <div class="left-container">
          <div class="menu-wrap">
            <a class="menu" @click="goToMyPage();">마이페이지</a>
            <a class="menu" @click="saveAdTemp(false);">임시 저장</a>
          </div>
          <div class="title-wrap">
            <p><strong>광고 예산</strong>를 설정해 주세요!</p>
            <img src="/image/ad/question.png">
          </div>
          <div id="step4">
            <p class="txt1">클릭 당 비용 <img src="/image/ad/q-mark.png"></p>
            <p class="txt2">클릭당 비용이 높을 수록 우선 노출됩니다.</p>
            <div class="input-wrap">
              <input type="text" v-model="this.click_price" @keyup="checkNum">
              <span>원</span>
            </div>
            <p class="txt1">하루 예산 <img src="/image/ad/q-mark.png"></p>
            <p class="txt2">하루에 해당 비용 이상 지출되지 않습니다.</p>
            <div class="input-wrap">
              <input type="text" v-model="this.day_price" @keyup="checkNum">
              <span>원</span>
            </div>
          </div>
        </div>
        <div class="right-container">
          <div class="right-wrap">
            <p class="page-title">해당 키워드를 보유한 <span class="colored">회원 수</span></p>
            <p class="peo">
              <span>약 </span>
              {{ addComma(this.memberCnt) }}
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
              <span class="modify" @click="this.background = true; saveAdTemp(true)">최종제출</span>
            </div>
          </div>
        </div>
      </div>
      <!--   Success Modal   -->
      <div class="modal-background" v-if="this.background"></div>
      <div class="modal-container" v-if="this.success">
        <p class="title"><strong>광고 제작이 완료</strong>되었습니다!</p>
        <p class="txt">
          광고 검수 후, 가입 시 입력했던<br>
          메일로 연락드리겠습니다.
        </p>
        <span class="btn" @click="goToPage('Mypage')">확인</span>
      </div>
    </div>
</template>

<script>
import { http,http2 } from '@/services';

export default {
  components: {
  },
  props: [''],
  data() {
    return {
      keywordOpenYn: false,
      background: false,
      success: false,
      ad:0,
      title:'',
      brand:'',
      name:'',
      price:0,
      discount:0,
      keywords:'',
      keywordsList:[],
      images:'',
      images_view:[],
      click_price:0,
      day_price:0,
      memberCnt:0,
    }
  },
  watch: {

  },
  methods: {
    fixedMenu() {
      let fixedContainer = document.querySelector(".right-wrap");
      let box = document.querySelector("#step4");
      let footer = document.querySelector('#footer-container');
      window.onscroll = () => {
        if (window.scrollY >= 80) {
          fixedContainer.classList.add("is-fixed");
        }
        else {
          fixedContainer.classList.remove("is-fixed");
        }
        if(window.scrollY >= box.clientHeight - fixedContainer.clientHeight + 350){
          fixedContainer.classList.add("is-stop");
          fixedContainer.style.top = box.clientHeight - fixedContainer.clientHeight + 350 +'px';
        }
        else {
          fixedContainer.classList.remove("is-stop");
          fixedContainer.style.top = '20px';

        }
      }
    },
    goToMyPage(){
      if(confirm('임시저장하지 않은 내용은 적용되지 않습니다.\n진행하시겠습니까?')){
        this.$router.push({ name: 'Mypage', query: {} });
      }
    },
    goToPrevStep(){
      if(confirm('임시저장하지 않은 내용은 적용되지 않습니다.\n진행하시겠습니까?')){
        this.$router.push({ name: 'Step2', query: {key:this.ad} });
      }
    },
    saveAdTemp(next){
      let param = {
        click_price:this.click_price,
        day_price:this.day_price,
      }
      if(next){
        param.state = 1 // 검수중 진행상태
      }
      http.put("/ad/"+this.ad+"/price", param).then((response) => {
        if (response.data.CODE == 200) {
          alert('제출되었습니다.');
          if(next){
            this.success = true;
          } else { // 임시저장
            this.getAd();
          }
        } else {
          alert('시스템문제 발생. 관리자에게 문의하세요.');
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getAd(){
      http.get("/ad/"+this.ad).then((response) => {
        if (response.data.CODE == 200) {
          this.ad = response.data.BODY.ad;
          this.title = response.data.BODY.title;
          this.brand = response.data.BODY.brand;
          this.name = response.data.BODY.name;
          this.price = response.data.BODY.price;
          this.discount = response.data.BODY.discount;
          this.click_price = response.data.BODY.click_price;
          this.day_price = response.data.BODY.day_price;
          this.keywords = response.data.BODY.keywords;
          this.keywordsList = [];
          if(this.keywords != null) this.keywordsList = JSON.parse(this.keywords);
          this.images = response.data.BODY.images;
          this.images_view = JSON.parse(this.images);
          this.getCntMemberMatchKeyword();
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getCntMemberMatchKeyword(){
      http.get("/ad/"+this.ad+"/cnt/match").then((response) => {
        if (response.data.CODE == 200) {
          this.memberCnt = response.data.BODY;
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
    checkNum(e){
      const v = e.target.value === '' ? 0:Number.parseInt(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));
      if(v != NaN){
        e.target.value = v;
      } else {
        e.target.value = 0;
      }
    },
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
