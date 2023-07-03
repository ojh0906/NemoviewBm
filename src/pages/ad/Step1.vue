<template>
  <div id="ad-setting" @click="clickSelect">
    <div class="step-container">
      <div class="left-container">
        <div class="menu-wrap">
          <a class="menu" @click="goToMyPage();">마이페이지</a>
          <a class="menu" @click="saveAdTemp(false);">임시 저장</a>
        </div>
        <div class="title-wrap">
          <p>홍보할 <strong>제품/서비스</strong>를 소개해 주세요!</p>
          <img src="/image/ad/question.png">
        </div>
        <div id="step1">
          <p class="title-label">광고를 구분할 광고명을 입력해 주세요 :)</p>
          <input type="text" name="title" v-model="this.title" maxlength="30"/>
          <div class="tab-container">
            <span class="label">Q. 무엇을 홍보 하시겠나요?</span>
            <span class="tab" :class="this.type === 1 ? 'active' : ''" @click="this.type = 1; this.category = 0;">제품</span>
            <span class="tab" :class="this.type === 2 ? 'active' : ''" @click="this.type = 2; this.category = 0;">서비스</span>
          </div>
          <!--   제품   -->
          <div class="input-container">
            <p class="label">1. {{ this.type === 1 ? '제품' : '서비스' }} 카테고리</p>
            <div class="select-container">
              <div class="select-box" @click="this.categoryYn = !this.categoryYn">
                {{ this.categoryName }}
                <span class="icn"></span>
              </div>
              <div class="select-list" v-if="this.categoryYn && this.type === 1">
                <p v-for="category in this.categoryList" @click="this.categoryYn = false;
                this.categoryName = category.name;
                this.category = category.category;">{{ category.name }}</p>
              </div>
              <div class="select-list" v-if="this.categoryYn && this.type === 2">
                <p v-for="category in this.serviceCategoryList" @click="this.categoryYn = false;
                this.categoryName = category.name;
                this.category = category.category;">{{ category.name }}</p>
              </div>
            </div>
            <p class="label">2. {{ this.type === 1 ? '제품 브랜드' : '서비스명' }}</p>
            <input type="text" name="brand" v-model="this.brand" />
            <p class="label">3. {{ this.type === 1 ? '제품명' : '서비스 소개' }} <span class="tip">*50자 이내 권장</span></p>
            <textarea name="product-name" maxlength="50" v-model="this.name"></textarea>
            <div class="numchk">
              <span>{{ this.name.length }} / 50</span>
            </div>
            <p class="label" v-if="this.type === 1">4. 제품 가격 <span class="tip">할인율이 큰 제품은 네모뷰 특가상품 영역에 소개됩니다.</span></p>
            <div class="price-wrap" v-if="this.type === 1">
              <div class="wrap">
                <p>판매 가격</p>
                <input type="text" v-model="this.price" @keyup="checkNum">
              </div>
              <div class="wrap">
                <p>할인율 <span>(선택)</span></p>
                <input type="text" v-model="this.discount" @keyup="checkNum">
                %
              </div>
              <div class="wrap">
                <p>최종 판매 가격 <span>(자동)</span></p>
                <input type="text" readonly :value="this.price * (1 - (this.discount / 100))">
              </div>
            </div>
            <p class="label">{{ this.type === 1 ? '5. 제품 링크' : '4. 연결 링크' }} <span class="tip">제품 가격의 ‘최종 판매 가격’의 가격과 동일한
                제품
                링크를 입력해 주세요!</span></p>
            <input type="text" name="link" v-model="this.link" />
            <span class="chk-btn" @click="goToLink(this.link)">연결 확인</span>
            <p class="sub">* 구매를 확인할 수 있는 링크를 첨부해 보세요!</p>
            <p class="label">{{ this.type === 1 ? '6. 제품' : '5. 서비스' }} 관련 키워드 <span class="tip2">(선택)</span></p>
            <input type="text" name="link" v-model="this.keyword_input" @keypress.enter="addKeyword" />
            <span class="chk-btn" @click="addKeyword">추가</span>
            <div class="keyword-list">
              <div class="keyword" v-for="(k, i) in keywordsList">#{{ k.value }} <span @click="removeKeyword(i)">x</span>
              </div>
            </div>
            <p class="label">{{ this.type === 1 ? '7. 홍보 이미지' : '6. 홍보 이미지' }}</p>
            <label class="chk-txt"><input type="checkbox" v-model="this.image_support"> 이미지 제작 지원이 필요하신 분은 체크해 주세요. (사이즈
              조절 범위, 디자인 지원)</label>
            <div class="img-upload-container">
              <p class="img-txt"><span class="colored">[필수]</span> 이미지1 <span class="tip">(맞춤 추천 페이지에 노출됩니다.)<img
                    src="/image/ad/q-mark.png"></span></p>
              <div class="upload-area">
                <input type="file" ref="images_new" v-on:change="handleFilesUpload()" class="hidden"
                  style="display: none;" accept="image/*" />
                <div class="upload-wrap" @click="addFiles">
                  <img class="" src="/image/ad/img-upload.png"
                    v-if="this.images_new.length === 0 && this.images_view.length === 0">
                  <img class="" :src="this.images_new[0].preview"
                    v-if="this.images_new.length !== 0 && this.images_view.length === 0">
                  <img class="" :src="getOneImagePath(this.images_view[0].path)"
                    v-if="this.images_new.length === 0 && this.images_view.length !== 0">
                </div>
                <div class="info-wrap">
                  <p class="info">
                    *사이즈:240*150 (px)<br>
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
            {{ addComma(this.memberCnt) }}
            <span> 명</span>
          </p>
          <p class="txt">이렇게 <strong>광고 되고 있어요!</strong></p>
          <div class="preview-box">
            <div class="img-wrap" style="background: url('/image/ad/img-upload.png')"
              v-if="this.images_new.length === 0 && this.images_view.length === 0"></div>
            <div class="img-wrap" :style="'background: url(' + this.images_new[0].preview + ')'"
              v-if="this.images_new.length !== 0 && this.images_view.length === 0"></div>
            <div class="img-wrap" :style="'background: url(' + getOneImagePath(this.images_view[0].path) + ')'"
              v-if="this.images_new.length === 0 && this.images_view.length !== 0"></div>
            <p class="brand">{{ this.brand }}</p>
            <p class="preview-title" v-html="this.replaceContent(this.name)"></p>
            <div class="hashtag-wrap">
              <span class="hashtag" v-for="keyword in this.keywordsList">#{{ keyword.value }}</span>
            </div>
            <div class="keywordyn" @click="keywordOpenYn = !keywordOpenYn">
              <span class="keyword-title">내 키워드와 </span>
              <span class="skeyword">*개</span>
              <span class="keyword-title"> 일치해요</span>
              <i class="fas fa-chevron-down" v-if="!keywordOpenYn"></i>
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
              <span class="cost">{{ addComma(this.price / 1) }}원</span>
              <span class="discount">{{ this.addComma(Math.round(this.price * (1 - (this.discount / 100)))) }}원</span>
            </div>
          </div>
          <div class="edit-wrap">
            <span class="del" @click="removeAd">삭제</span>
            <span class="modify" @click="saveAdTemp(true)">다음</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { http, http2 } from '@/services';

export default {
  computed: {
    ...mapGetters(["getLoginMember", "isExpired"]),
  },
  components: {
  },
  props: [''],
  setup() {
    const serviceCategoryList = [
      { category: 1, name: '라이프스타일' },
      { category: 2, name: '쇼핑' },
      { category: 3, name: '여행' },
      { category: 4, name: '건강 / 운동 / 스포츠' },
      { category: 5, name: '게임' },
      { category: 6, name: '교육' },
      { category: 7, name: '데이트' },
      { category: 8, name: '소셜네트워킹' },
      { category: 9, name: '출산 / 육아' },
      { category: 10, name: '반려동물' },
      { category: 12, name: '자동차' },
      { category: 13, name: '음식 및 음료' },
      { category: 14, name: '음악 / 영화 / OTT' },
      { category: 15, name: '금융' },
      { category: 16, name: '부동산/홈인테리어' },
      { category: 17, name: '사진 및 비디오' },
      { category: 18, name: '그래픽 및 디자인' },
      { category: 19, name: '날씨' },
      { category: 20, name: '내비게이션' },
      { category: 21, name: '뉴스 / 신문 / 잡지' },
      { category: 22, name: '도서 / 만화' },
      { category: 23, name: '비즈니스' },
      { category: 24, name: '생산성' },
      { category: 25, name: '엔터테인먼트' },
      { category: 26, name: '유틸리티' },
      { category: 27, name: '의료' },
    ];
    return {
      serviceCategoryList,
    }
  },
  data() {
    return {
      keywordOpenYn: false,
      ad: 0,
      title: '',
      type: 1,
      categoryName: '',
      category: 0,
      brand: '',
      name: '',
      price: 0,
      discount: 0,
      link: '',
      keyword_input: '',
      keywords: '',
      keywordsList: [],
      images: '',
      images_view: [],
      images_new: [],
      images_del: [],
      image_support: false,
      categoryYn: false,
      categoryList: [],
      memberCnt: 0,
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
        if (window.scrollY >= 1200) {
          fixedContainer.classList.add("is-stop");
          // fixedContainer.style.top = getRectTop(footer)+'px';
        }
        else {
          fixedContainer.classList.remove("is-stop");
        }
      }
    },
    goToMyPage() {
      if (confirm('임시저장하지 않은 내용은 적용되지 않습니다.\n진행하시겠습니까?')) {
        this.$router.push({ name: 'Mypage', query: {} });
      }
    },
    saveAdTemp(next) {
      let formData = new FormData();
      formData.append("member", this.getLoginMember.member);
      formData.append("title", this.title);
      formData.append("type", this.type);
      formData.append("category", this.category);
      formData.append("brand", this.brand);
      formData.append("name", this.name);
      formData.append("price", this.price);
      formData.append("discount", this.discount);
      formData.append("link", this.link);
      formData.append("keywords", JSON.stringify(this.keywordsList));
      formData.append("image_support", this.image_support);
      for (var i = 0; i < this.images_new.length; i++) {
        formData.append('images_new', this.images_new[i]);
      }

      if (this.ad !== 0) { // 수정시
        if (this.title === '' || this.category === 0 || this.brand === '' || this.name === '' || this.link === '') {
          alert('필수값을 입력해주세요.');
          return;
        }
        if (this.type === 1) { // 제품일시
          if (this.price === 0) {
            alert('필수값을 입력해주세요.');
            return;
          }
        }
        if (!this.image_support) {
          if (this.images_new.length === 0 && this.images_view.length === 0) {
            alert('이미지 업로드는 필수입니다.\n이미지 제작 지원을 원하시면 상단 체크박스를 클릭해주세요.');
            return;
          }
        }

        formData.append("images_del", JSON.stringify(this.images_del));
        http.put("/ad/" + this.ad, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((response) => {
          if (response.data.CODE == 200) {
            alert('저장되었습니다.');
            if (next) {
              this.$router.push({ name: 'Step2', query: { key: this.ad } });
            } else { // 임시저장
              this.getAd();
            }
          } else {
            alert('시스템문제 발생. 관리자에게 문의하세요.');
          }
        }).catch((error) => {
          console.log(error);
        });
      } else { // 신규
        http.post("/ad/save", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((response) => {
          if (response.data.CODE == 200) {
            alert('저장되었습니다.');
            if (next) {
              this.$router.push({ name: 'Step2', query: { key: response.data.BODY.ad } });
            } else { // 임시저장
              this.getAd();
            }
          } else {
            alert('시스템문제 발생. 관리자에게 문의하세요.');
          }
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    removeAd() {
      if (this.ad === 0) { // 마이페이지로 이동
        this.goToPage('Mypage')
      } else {
        http.delete("/ad/" + this.ad).then((response) => {
          if (response.data.CODE == 200) {
            alert('삭제되었습니다.');
            this.$router.push({ name: 'Mypage', query: {} });
          } else {
            alert('시스템문제 발생. 관리자에게 문의하세요.');
          }
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    getCategoryList() {
      let param = {
        state: '1', //true
      }
      http2.post("/bm/category/list", param).then((response) => {
        if (response.data.CODE == 200) {
          this.categoryList = response.data.BODY.LIST;
          if (this.$route.query.key != null) {
            this.ad = this.$route.query.key;
            this.getAd();
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getAd() {
      http.get("/ad/" + this.ad).then((response) => {
        if (response.data.CODE == 200) {
          this.ad = response.data.BODY.ad;
          this.title = response.data.BODY.title;
          this.type = response.data.BODY.type;
          this.category = response.data.BODY.category;
          if (this.type === 1) { // 제품
            const filterItem = this.categoryList.filter(item => item.category === this.category);
            if (filterItem.length === 0) {
              this.categoryName = '';
            } else {
              this.categoryName = filterItem[0].name;
            }
          } else { // 서비스
            const filterItem = this.serviceCategoryList.filter(item => item.category === this.category);
            if (filterItem.length === 0) {
              this.categoryName = 'error';
            } else {
              this.categoryName = filterItem[0].name;
            }
          }
          this.brand = response.data.BODY.brand;
          this.name = response.data.BODY.name;
          this.price = response.data.BODY.price;
          this.discount = response.data.BODY.discount;
          this.link = response.data.BODY.link;
          this.keywords = response.data.BODY.keywords;
          this.keywordsList = [];
          if (this.keywords != null) this.keywordsList = JSON.parse(this.keywords);
          this.images = response.data.BODY.images;
          this.images_view = JSON.parse(this.images);
          this.image_support = response.data.BODY.image_support;
          this.images_new = [];
          this.getCntMemberMatchKeyword();
        } else {
          console.log('aa');
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
    checkNum(e) {
      const v = e.target.value === '' ? 0 : Number.parseInt(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));
      if (v != NaN) {
        e.target.value = v;
      } else {
        e.target.value = 0;
      }
    },
    addKeyword() {
      if (this.keyword_input === '') {
        alert('키워드를 입력하세요.');
        return;
      }
      const keyword = {
        type: 3, key: 0, value: this.keyword_input
      }
      this.keywordsList.push(keyword);
      this.keyword_input = '';
    },
    removeKeyword(i) {
      this.keywordsList.splice(i, 1);
    },
    addFiles() {
      this.$refs.images_new.click();
    },
    handleFilesUpload() {
      let uploadedFiles;
      // photo
      uploadedFiles = this.$refs.images_new.files;
      /*
        Adds the uploaded file to the files array
      */
      this.images_new = [];
      this.images_view = [];
      for (var i = 0; i < uploadedFiles.length; i++) {
        // photo
        uploadedFiles[i].preview = URL.createObjectURL(uploadedFiles[i]);
        this.images_new.push(uploadedFiles[i]);
      }
    },
    goToLink(link) {
      if (link === '') {
        alert('제품링크를 입력해주세요.');
        return;
      }
      window.open(link, '_blank')
    },
    clickSelect(event) {
      if (!event.target.classList.contains('select-box')) {
        this.categoryYn = false;
      }
    }
  },
  created() {
  },
  mounted() {
    this.fixedMenu();
    this.getCategoryList();
  }
}
</script>
