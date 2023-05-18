<template>
  <div id="ad-setting">
    <div class="step-container">
      <div class="left-container">
        <div class="menu-wrap">
          <router-link :to="{ name: 'Mypage', query: {} }" class="menu">마이페이지</router-link>
          <router-link :to="{ name: '', query: {} }" class="menu">임시 저장</router-link>
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
                    <span class="color-tag tag">원룸거주</span>
                    <span class="color-tag2 tag">주거 전체</span>
                    <span class="color-tag3 tag">원룸거주</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="add-btn-wrap">
            <div class="add-btn">
              추가하기
            </div>
          </div>
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
                    <span class="color-tag tag">원룸거주 <span class="close">X</span></span>
                    <span class="color-tag2 tag">주거 전체 <span class="close">X</span></span>
                    <span class="color-tag3 tag">원룸거주 <span class="close">X</span></span>
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
            10,000
            <span> 명</span>
          </p>
          <p class="txt">이렇게 <strong>광고 돼요!</strong></p>
          <p class="keyword-title">반드시 포함되어야할 키워드<img class="q-mark" src="/image/ad/q-mark.png" /></p>
          <div class="keyword-box">
            <span class="color-tag tag">성별 전체 <span class="close">X</span></span>
            <span class="tag">남 <span class="close">X</span></span>
            <span class="color-tag2 tag">주거 전체 <span class="close">X</span></span>
          </div>
          <div class="edit-wrap">
            <span class="del">이전</span>
            <span class="modify">다음</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: [''],
  data() {
    return {
      keywordOpenYn: false,
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
  },
  created() {
  },
  mounted() {
    this.fixedMenu();
  }
}
</script>
