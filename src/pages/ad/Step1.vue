<template>
  <div id="ad-setting">
    <div class="step-container">
      <div class="left-container">
        <div class="menu-wrap">
          <a class="menu" @click="goToMyPage();">마이페이지</a>
          <a class="menu" @click="saveTemp();">임시 저장</a>
        </div>
        <div class="title-wrap">
          <p>홍보할 <strong>제품/서비스</strong>를 소개해 주세요!</p>
          <img src="/image/ad/question.png">
        </div>
        <div id="step1">
          <p class="title-label">광고를 구분할 광고명을 입력해 주세요 :)</p>
          <input type="text" name="title" />
          <div class="tab-container">
            <span class="label">Q. 무엇을 홍보 하시겠나요?</span>
            <span class="tab" :class="this.category === 1 ? 'active' : ''" @click="this.category = 1;">제품</span>
            <span class="tab" :class="this.category === 2 ? 'active' : ''" @click="this.category = 2;">서비스</span>
          </div>
          <!--   제품   -->
          <div class="input-container">
            <p class="label">1. {{ this.category === 1 ? '제품':'서비스' }} 카테고리</p>
            <input type="text" name="category">
            <p class="label">2. {{ this.category === 1 ? '제품 브랜드':'서비스명' }}</p>
            <input type="text" name="brand"/>
            <p class="label">3. {{ this.category === 1 ? '제품명':'서비스 소개' }} <span class="tip">*50자 이내 권장</span></p>
            <textarea name="product-name" maxlength="50"></textarea>
            <div class="numchk">
              <span >0 / 50</span>
            </div>
            <p class="label" v-if="this.category === 1">4. 제품 가격 <span class="tip">할인율이 큰 제품은 네모뷰 특가상품 영역에 소개됩니다.</span></p>
            <div class="price-wrap" v-if="this.category === 1">
              <div class="wrap">
                <p>판매 가격</p>
                <input type="text">
              </div>
              <div class="wrap">
                <p>할인율 <span>(선택)</span></p>
                <input type="text">
                %
              </div>
              <div class="wrap">
                <p>최종 판매 가격 <span>(자동)</span></p>
                <input type="text" readonly>
              </div>
            </div>
            <p class="label">{{ this.category === 1 ? '5. 제품 링크':'4. 연결 링크' }} <span class="tip">제품 가격의 ‘최종 판매 가격’의 가격과 동일한 제품 링크를 입력해 주세요!</span></p>
            <input type="text" name="link" />
            <span class="chk-btn">연결 확인</span>
            <p class="sub">* 구매를 확인할 수 있는 링크를 첨부해 보세요!</p>
            <p class="label">{{ this.category === 1 ? '6. 제품':'5. 서비스' }} 관련 키워드 <span class="tip2">(선택)</span></p>
            <input type="text" name="link" />
            <span class="chk-btn">추가</span>
            <div class="keyword-list">
              <div class="keyword">#의자 <span>x</span></div>
              <div class="keyword">#의자 <span>x</span></div>
              <div class="keyword">#의자 <span>x</span></div>
            </div>
            <p class="label">{{ this.category === 1 ? '7. 홍보 이미지':'6. 홍보 이미지' }}</p>
            <label class="chk-txt"><input type="checkbox"> 이미지 제작 지원이 필요하신 분은 체크해 주세요. (사이즈 조절 범위, 디자인 지원)</label>
            <div class="img-upload-container">
              <p class="img-txt"><span class="colored">[필수]</span> 이미지1 <span class="tip">(맞춤 추천 페이지에 노출됩니다.)<img src="/image/ad/q-mark.png"></span></p>
              <div class="upload-area">
                <div class="upload-wrap">
                  <img class="" src="/image/ad/img-upload.png">
                </div>
                <div class="info-wrap">
                  <p class="info">
                    *사이즈:0000*000 (px)<br>
                    *파일 형식: jepg, png ..
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-container">
        <div class="right-wrap">
          <p class="page-title">해당 키워드를 보유한 <span class="colored">회원 수</span></p>
          <p class="peo">
            <span>약 </span>
            10,000
            <span> 명</span>
          </p>
          <p class="txt">이렇게 <strong>광고 되고 있어요!</strong></p>
          <div class="preview-box">
            <div class="img-wrap" style="background: url('/image/temp/ad-temp.png')">
              <img class="wish" src="/image/mypage/wish.png">
            </div>
            <p class="brand">NIKE</p>
            <p class="preview-title">
              나이키 덩크로우 범고래 PS 에어 포스 111
              PLT.AF.ORM 올화이트 GS 검흰1111111
            </p>
            <div class="hashtag-wrap">
              <span class="hashtag">#운동화</span>
              <span class="hashtag">#농구화</span>
              <span class="hashtag">#덩크로우</span>
            </div>
            <div class="keywordyn" @click="keywordOpenYn = !keywordOpenYn">
              <span class="keyword-title">내 키워드와 </span>
              <span class="skeyword">5개</span>
              <span class="keyword-title"> 일치해요</span>
              <i class="fas fa-chevron-down" v-if="!keywordOpenYn" ></i>
              <i class="fas fa-chevron-up" v-if="keywordOpenYn"></i>
            </div>
            <div class="keyword-wrap" :class="keywordOpenYn ? 'open' : 'close'">
              <span class="keyword">브랜드 중요</span>
              <span class="keyword">직장인</span>
              <span class="keyword">서울</span>
              <span class="keyword">여</span>
              <span class="keyword">남</span>
              <span class="keyword">원룸 거주</span>
            </div>
            <div class="price-wrap">
              <span class="sale">50%</span>
              <span class="cost">90,000원</span>
              <span class="discount">45,000원</span>
            </div>
          </div>
          <div class="edit-wrap">
            <span class="del">삭제</span>
            <span class="modify">수정</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters(["getLoginMember","isExpired"]),
  },
  components: {
  },
  props: [''],
  data() {
    return {
      keywordOpenYn: false,
      ad:0,
      title:'',
      type:0,
      category:1,
      brand:'',
      name:'',
      price:0,
      discount:0,
      link:'',
      keywords:'',
      images:'',
      image_support:false,
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
        if(window.scrollY >= 1200){
          fixedContainer.classList.add("is-stop");
          // fixedContainer.style.top = getRectTop(footer)+'px';
        }
        else {
          fixedContainer.classList.remove("is-stop");
        }
      }
    },
    getMember() {
      http.get("/member/" + this.getLoginMember.member).then((response) => {
        if (response.data.CODE == 200) {
          this.$store
              .dispatch("memberUpdate", { member: response.data.BODY })
              .then(() => { })
              .catch(({ message }) => alert(message));
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    goToMyPage(){
      if(confirm('임시저장하지 않은 내용은 적용되지 않습니다.\n진행하시겠습니까?')){
        this.$router.push({ name: 'Mypage', query: {} });
      }
    }
  },
  created() {
  },
  mounted() {
    this.fixedMenu();
  }
}
</script>
