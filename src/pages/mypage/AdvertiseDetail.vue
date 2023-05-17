<template>
  <div id="mypage">
    <Nav />
    <div class="content-container">
      <div class="mypage-top">
        <span class="point">보유 포인트 : <strong>52,000</strong></span>
        <router-link :to="{ name: 'PointCharge', query: {} }" class="charge" >충전하기</router-link>
      </div>
      <div class="ad-detail-container">
        <div class="left-container">
          <a class="go-back">돌아가기</a>
          <div class="switch-wrap">
            <img v-if="switchYn" src="/image/mypage/switch-on.png" @click="switchYn = !switchYn">
            <img v-if="!switchYn" src="/image/mypage/switch-off.png" @click="switchYn = !switchYn">
          </div>
          <p class="name">나이키 신발 광고 그룹 1</p>
          <div class="filter-wrap">
            <span class="filter active">전체기간</span>
            <span class="filter">오늘</span>
            <span class="filter">어제</span>
            <span class="filter">최근 7일</span>
            <span class="filter">최근 한 달</span>
            <span class="setting">기간 설정</span>
          </div>
          <div class="status-box">
            <div class="item">
              <p class="label">노출 수</p>
              <p class="val">11,240</p>
            </div>
            <div class="item">
              <p class="label">노출 수</p>
              <p class="val">113</p>
            </div>
            <div class="item">
              <p class="label">노출 수</p>
              <p class="val">12%</p>
            </div>
          </div>
          <p class="area-title">클릭한 사용자의 보유 키워드 순위</p>
          <div class="rank-table">
             <div class="wrap">
               <div class="item">
                 <span class="rank">1위 (103)</span>
                 <span class="val">원룸거주</span>
               </div>
               <div class="item">
                 <span class="rank">2위 (103)</span>
                 <span class="val">여</span>
               </div>
               <div class="item">
                 <span class="rank">3위 (103)</span>
                 <span class="val">여</span>
               </div>
               <div class="item">
                 <span class="rank">4위 (103)</span>
                 <span class="val">여</span>
               </div>
               <div class="item">
                 <span class="rank">5위 (103)</span>
                 <span class="val">여</span>
               </div>
             </div>
            <div class="wrap">
              <div class="item">
                <span class="rank">1위 (103)</span>
                <span class="val">원룸거주</span>
              </div>
              <div class="item">
                <span class="rank">2위 (103)</span>
                <span class="val">여</span>
              </div>
              <div class="item">
                <span class="rank">3위 (103)</span>
                <span class="val">여</span>
              </div>
              <div class="item">
                <span class="rank">4위 (103)</span>
                <span class="val">여</span>
              </div>
              <div class="item">
                <span class="rank">5위 (103)</span>
                <span class="val">여</span>
              </div>
            </div>
          </div>
          <p class="area-title">설정한 사용자 키워드</p>
          <div class="keyword-table">
            <p class="area-title">선택한 키워드</p>
            <div class="line">
              <span>남</span>
              <span>원룸 거주</span>
            </div>
            <div class="line">
              <span class="chk">3인 가구</span>
              <span class="chk">자녀 있음</span>
              <span class="chk">20대 후반</span>
            </div>
            <p class="area-title">반드시 포함되어야 할 키워드</p>
            <div class="line">
              <span>남</span>
              <span class="chk">원룸 거주</span>
            </div>
          </div>
        </div>
        <div class="right-container">
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
import Nav from '/src/components/mypage/Nav.vue';

export default {
  components: {
    Nav,
  },
  props: [''],
  data() {
    return {
      switchYn: false,
      keywordOpenYn: false,
    }
  },
  watch: {

  },
  methods: {

  },
  created() {
  }
}
</script>
