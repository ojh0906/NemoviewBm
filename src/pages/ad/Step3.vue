<template>
  <div id="ad-setting">
    <div class="step-container">
      <div class="left-container">
        <div class="menu-wrap">
          <a class="menu" @click="goToMyPage();">마이페이지</a>
          <a class="menu" @click="saveAdTemp(false);">임시 저장</a>
        </div>
        <div class="title-wrap step3-title-wrap">
          <p>홍보할 <strong>타겟의 키워드</strong>를 소개해 주세요!</p>
          <img src="/image/ad/question.png">
        </div>
        <div>
          <p class="sub-title2">현재까지 선택한 키워드<img class="q-mark" src="/image/ad/q-mark.png" /></p>
          <p class="sub-title3">해당 키워드를 1개 이상 보유한 사용자에게만 노출됩니다.</p>
          <div id="step2" class="step3">

            <div class="keyword-box-wrap">
              <div class="keyword-box">
                <div>
                  <div class="tag-box">
                    <span class="tag" :class="k.mandatory ? 'color-tag3':'color-tag'" v-for="k in commonKeywordList" @click="k.mandatory = !k.mandatory; this.getCntMemberMatchKeywordChange();">{{ k.name }}</span>
                    <span class="tag" :class="k.mandatory ? 'color-tag3':'color-tag2'" v-for="k in keywordList" @click="k.mandatory = !k.mandatory; this.getCntMemberMatchKeywordChange();">{{ k.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
<!--          <div class="add-btn-wrap">
            <div class="add-btn">
              추가하기
            </div>
          </div>-->
        </div>

        <!-- 선택 -->
        <div class="step3-2-box">
          <p class="sub-title2">
            현재까지 선택한 키워드에서 해당 광고를 클릭할 사용자가<br />
            ‘반드시 포함해야될 키워드’가 있다면 상단 영역에서 해당 키워드를 선택해 주세요 (선택)
            <img class="q-mark" src="/image/ad/q-mark.png" />
          </p>
          <p class="sub-title3">해당 키워드를 1개 이상 보유한 사용자에게만 노출됩니다.</p>
          <div id="step2" class="step3">
            <div class="keyword-box-wrap">
              <div class="keyword-box">
                <div>
                  <div class="tag-box">
                    <span class="color-tag3 tag" v-for="(k,i) in commonKeywordList.filter(item => item.mandatory)">{{ k.name }}<span class="close" @click="k.mandatory = false; this.getCntMemberMatchKeywordChange();">X</span></span>
                    <span class="color-tag3 tag" v-for="(k,i) in keywordList.filter(item => item.mandatory)">{{ k.name }}<span class="close" @click="k.mandatory = false; this.getCntMemberMatchKeywordChange();">X</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul type="disc">
            ex) 만약 ‘소형견’ 키워드를 ‘반드시 포함해야될 키워드’로 설정 시
            <li>
              ‘소형견’ 키워드가 없는 사람에게는 현재까지 선택한 키워드와 관계없이 노출 X
            </li>
            <li>
              ‘소형견’ 키워드가 있는 사람에게는 ‘소형견 키워드 + 현재까지 선택한 키워드’
            </li>
          </ul>
          <div class="tip">
            <p>* 반드시 포함해야될 키워드를 많이 선택할수록 광고 효율은 올라가지만,</p>
            <p>노출되는 회원은 줄어듭니다.</p>
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
          <p class="keyword-title">반드시 포함되어야할 키워드<img class="q-mark" src="/image/ad/q-mark.png" /></p>
          <div class="keyword-box">
            <span class="color-tag3 tag" v-for="(k,i) in commonKeywordList.filter(item => item.mandatory)">{{ k.name }}<span class="close" @click="k.mandatory = false;">X</span></span>
            <span class="color-tag3 tag" v-for="(k,i) in keywordList.filter(item => item.mandatory)">{{ k.name }}<span class="close" @click="k.mandatory = false;">X</span></span>
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
  components: {
  },
  props: [''],
  data() {
    return {
      ad:0,
      commonKeywordList:[],
      keywordList:[],
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
        this.$router.push({ name: 'Step2', query: {key:this.ad} });
      }
    },
    saveAdTemp(next){
      let param = {
        commonKeywordList:this.commonKeywordList,
        keywordList:this.keywordList,
      }
      http.put("/ad/"+this.ad+"/keyword/mandatory", param).then((response) => {
        if (response.data.CODE == 200) {
          if(next){
            this.$router.push({ name: 'Step4', query: {key:this.ad} });
          } else { // 임시저장
            alert('저장되었습니다.');
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
          this.commonKeywordList = response.data.BODY.commonKeywordList;
          this.keywordList = response.data.BODY.keywordList;
          this.getCntMemberMatchKeywordChange();
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
    getCntMemberMatchKeywordChange(){
      let params = {
        commonKeywordList:this.commonKeywordList,
        keywordList:this.keywordList
      };
      http.post("/ad/member/cnt/match",params).then((response) => {
        if (response.data.CODE == 200) {
          this.memberCnt = response.data.BODY;
        }
      }).catch((error) => {
        console.log(error);
      });
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
