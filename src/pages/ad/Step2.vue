<template>
    <div id="ad-setting">
        <div class="step-container">
            <div class="left-container">
                <div class="menu-wrap">
                    <router-link :to="{ name: 'Mypage', query: {} }" class="menu">마이페이지</router-link>
                    <router-link :to="{ name: '', query: {} }" class="menu">임시 저장</router-link>
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
                            <div class="" v-for="(v, index) in 1">
                                <p>{{ index + 1 }}. 성별</p>
                                <div class="tag-box">
                                    <span class="color-tag tag">성별 전체</span>
                                    <span class="tag">남</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="keyword-hr"></div>
                    <div class="keyword-box-wrap">
                        <p class="title">더 자세한 키워드</p>
                        <div class="keyword-box">
                            <div>
                                <p @click="this.keywordOpenYn = !this.keywordOpenYn">
                                    <img :class="this.keywordOpenYn ? 'arrow-icon' : 'off-arrow-icon'"
                                        src="/image/ad/arrow.png" />
                                    주거 구조
                                </p>
                                <div class="tag-box" :class="this.keywordOpenYn ? 'show' : 'hidden'">
                                    <span class="color-tag2 tag">주거 전체</span>
                                    <span class="tag">원룸거주</span>
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
                  <p class="txt">이렇게 <strong>광고 돼요!</strong></p>

                  <p class="keyword-title">현재까지 선택한 키워드<img class="q-mark" src="/image/ad/q-mark.png" /></p>
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
      console.log(box.clientHeight);
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
  },
  created() {
  },
  mounted() {
    this.fixedMenu();
  }
}
</script>
