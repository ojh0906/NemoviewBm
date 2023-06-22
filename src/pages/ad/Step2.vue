<template>
  <div id="ad-setting">
    <div class="step-container">
      <div class="left-container">
        <div class="menu-wrap">
          <a class="menu" @click="goToMyPage();">마이페이지</a>
          <a class="menu" @click="saveAdTemp(false);">임시 저장</a>
        </div>
        <div class="title-wrap">
          <p>홍보할 <strong>타겟의 키워드</strong>를 소개해 주세요!</p>
          <img src="/image/ad/question.png">
        </div>
        <p class="sub-title">아래 키워드 중 선택한 키워드를 가진 사람에게만 노출돼요!</p>
        <div id="step2">
          <div class="keyword-box-wrap">
            <p class="title">기본 키워드</p>
            <div class="keyword-box">
              <div class="" v-for="(h, index) in this.commonHeaderList">
                <p>{{ index + 1 }}. {{ h.name }}</p>
                <div class="tag-box">
                  <span class="tag" :class="k.match ? 'color-tag':''"
                        style="cursor:pointer;"
                        v-for="k in h.keywords"
                        @click="checkKeyword(1, k)">{{ k.name }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="keyword-hr"></div>
          <div class="keyword-box-wrap">
            <p class="title">더 자세한 키워드</p>
            <div class="keyword-box">
              <div v-for="classific in this.classificationList">
                <p @click="classific.open = !classific.open">
                  <img :class="classific.open ? 'arrow-icon' : 'off-arrow-icon'"
                       src="/image/ad/arrow.png" />
                  {{ classific.name }}
                </p>
                <div class="tag-box" :class="classific.open ? 'show' : 'hidden'">
                  <span class="tag" :class="k.match ? 'color-tag2':''"
                        style="cursor:pointer;"
                        v-for="k in classific.keywords"
                        @click="checkKeyword(2, k)">{{ k.name }}</span>
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
          <p class="txt">이렇게 <strong>광고 돼요!</strong></p>

          <p class="keyword-title">현재까지 선택한 키워드<img class="q-mark" src="/image/ad/q-mark.png" /></p>
          <div class="keyword-box">
            <span class="color-tag tag" v-for="(c,i) in this.commonKeywordList">{{ c.name }}<span class="close" style="cursor: pointer;" @click="removeCommonKeyword(i)">X</span></span>
            <span class="color-tag2 tag" v-for="(k,i) in this.keywordList">{{ k.name }}<span class="close" style="cursor: pointer;" @click="removeKeyword(i)">X</span></span>
          </div>
          <div class="edit-wrap">
            <span class="del" @click="goToPrevStep()">이전</span>
            <span class="modify" @click="saveAdTemp(true)">다음</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { http,http2 } from '@/services';

export default {
  computed: {
    ...mapGetters(["getLoginMember","isExpired"]),
  },
  components: {
  },
  props: [''],
  setup() {
    const commonList = [
      { name: '성별', common_keyword: -1,},
      { name: '연령대', common_keyword: -2},
    ];
    return {
      commonList,
    }
  },
  data() {
    return {
      ad:0,
      commonKeywordList:[],
      keywordList:[],
      commonKeywordList_del:[],
      keywordList_del:[],
      keywordOpenYn: false,
      classificationList:[
        {name:'', keywords:[{keyword: 0, name: ''}]}
      ],
      commonHeaderList:[],
      memberCnt:0,
    }
  },
  watch: {

  },
  methods: {
    fixedMenu() {
      let fixedContainer = document.querySelector(".right-wrap");
      let box = document.querySelector("#step2");
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
    getRectTop(el){
      var rect = el.getBoundingClientRect();
      return rect.top;
    },
    goToMyPage(){
      if(confirm('임시저장하지 않은 내용은 적용되지 않습니다.\n진행하시겠습니까?')){
        this.$router.push({ name: 'Mypage', query: {} });
      }
    },
    goToPrevStep(){
      if(confirm('임시저장하지 않은 내용은 적용되지 않습니다.\n진행하시겠습니까?')){
        this.$router.push({ name: 'Step1', query: {key:this.ad} });
      }
    },
    saveAdTemp(next){
      let param = {
        commonKeywordList:this.commonKeywordList,
        commonKeywordList_del:this.commonKeywordList_del,
        keywordList:this.keywordList,
        keywordList_del:this.keywordList_del,
      }
      http.put("/ad/"+this.ad, param).then((response) => {
        if (response.data.CODE == 200) {
          alert('저장되었습니다.');
          if(next){
            this.$router.push({ name: 'Step3', query: {key:this.ad} });
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
    getCommonHeaderList() {
      this.commonHeaderList = [];
      let param = {

      }
      http2.post("/main/common/keyword/list", param).then((response) => {
        if (response.data.CODE == 200) {
          // 성별 , 연령대
          this.commonList.forEach(c => this.commonHeaderList.push({name:c.name, category:c.common_keyword, keywords:[]}))
          // 나머지 공통 키워드
          response.data.BODY.LIST.forEach(c => this.commonHeaderList.push({name:c.name, category:c.common_keyword, keywords:[]}))
          this.commonHeaderList.forEach(h => this.getCommonKeywordList(h));
          this.getCategoryList();
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getCommonKeywordList(header) {
      let param = {
        category:header.category
      }
      http2.post("/main/common/keyword/list", param).then((response) => {
        if (response.data.CODE == 200) {
          header.keywords = response.data.BODY.LIST;
          // 전체 추가
          header.keywords.unshift({name:header.name+' 전체', key:header.category, all:true});
          header.keywords.forEach(keyword =>{
            const filterList = this.commonKeywordList.filter(item => item.common_keyword == keyword.common_keyword);
            if(filterList.length !== 0){
              keyword.match = true;
            }
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getCategoryList() {
      let param = {

      }
      http2.post("/bm/classification/list", param).then((response) => {
        if (response.data.CODE == 200) {
          console.log(response)
          this.classificationList = response.data.BODY.LIST;
          this.classificationList.forEach(classific => {
            // 전체 추가
            classific.keywords.unshift({name:classific.name+' 전체', key:classific.classification, all:true});

            classific.keywords.forEach(keyword =>{
              const filterList = this.keywordList.filter(item => item.keyword == keyword.keyword);
              if(filterList.length !== 0){
                keyword.match = true;
              }
            });
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getAd(){
      http.get("/ad/"+this.ad).then((response) => {
        if (response.data.CODE == 200) {
          this.commonKeywordList = response.data.BODY.commonKeywordList;
          this.keywordList = response.data.BODY.keywordList;
          this.getCommonHeaderList();
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
    removeCommonKeyword(idx){
      const keyword_del = this.commonKeywordList.splice(idx,1);
      const filterList = this.commonKeywordList_del.filter(item => item.common_keyword == keyword_del[0].common_keyword);
      if(filterList.length === 0) {
        this.commonKeywordList_del.push(keyword_del[0]);
      }

      // 체크 해제
      this.commonHeaderList.forEach(header => {
        header.keywords.forEach(keyword =>{
          if(keyword.match && keyword.common_keyword == keyword_del[0].common_keyword){
            keyword.match = false;
          }
        });
      });
    },
    removeKeyword(idx){
      const keyword_del = this.keywordList.splice(idx,1);
      const filterList = this.keywordList_del.filter(item => item.keyword == keyword_del[0].keyword);
      if(filterList.length === 0) {
        this.keywordList_del.push(keyword_del[0]);
      }

      // 체크 해제
      this.classificationList.forEach(classific => {
        classific.keywords.forEach(keyword =>{
          if(keyword.match && keyword.keyword == keyword_del[0].keyword){
            keyword.match = false;
          }
        });
      });
    },
    checkKeyword(type, keyword){
      if(keyword.all){ // 전체 체크
        if(type === 1){
          const checkList = this.commonHeaderList.filter(h => h.category == keyword.key)[0].keywords;

          checkList.forEach(check => {
            if(!check.all){
              check.match = true;
              const filterList = this.commonKeywordList.filter(item => item.common_keyword == check.common_keyword);
              if(filterList.length === 0){
                this.commonKeywordList.push(check);
              }
            }
          })
        } else {
          const checkList = this.classificationList.filter(c => c.classification == keyword.key)[0].keywords;

          checkList.forEach(check => {
            if(!check.all){
              check.match = true;
              const filterList = this.keywordList.filter(item => item.keyword == check.keyword);
              if(filterList.length === 0){
                this.keywordList.push(check);
              }
            }
          })
        }
      } else {
        keyword.match = true;

        if(type === 1){
          const filterList = this.commonKeywordList.filter(item => item.common_keyword == keyword.common_keyword);
          if(filterList.length === 0){
            this.commonKeywordList.push(keyword);
          }
        } else {
          const filterList = this.keywordList.filter(item => item.keyword == keyword.keyword);
          if(filterList.length === 0){
            this.keywordList.push(keyword);
          }
        }
      }
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
