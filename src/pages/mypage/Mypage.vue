<template>
  <div id="mypage">
    <Nav />
    <div class="content-container">
      <div class="mypage-top">
        <span class="point">보유 포인트 : <strong>52,000</strong></span>
        <a class="charge">충전하기</a>
      </div>
      <div class="mypage-content">
        <p class="page-title-lg">네모뷰에서 <strong>더 정교한 광고를</strong> 진행해 보세요!</p>
        <div class="filter-wrap">
          <span class="filter active">전체기간</span>
          <span class="filter">오늘</span>
          <span class="filter">어제</span>
          <span class="filter">최근 7일</span>
          <span class="filter">최근 한 달</span>
          <span class="setting">기간 설정</span>
        </div>
        <div class="ad-container">
          <div class="add-new">
            <div class="wrap">
              <i class="fas fa-plus"></i>
              <p>3분 만에 광고 제작</p>
            </div>
          </div>
          <!--   ------    -->
          <div class="item">
            <p class="title">미술 작가 추천, 아트픽하소</p>
            <div class="desc">
              <p class="val">클릭 수 : 0</p>
              <p class="val">노출 수 : 0</p>
              <div class="result-wrap">
                <div class="wrap">
                  <span class="label">클릭률 : </span>
                  <span class="result">0%</span>
                </div>
                <div class="wrap">
                  <span class="label">클릭 당 비용 : </span>
                  <span class="result">0원</span>
                </div>
              </div>
              <div class="bottom-wrap">
                <div class="wrap">
                  <span class="date">2023.01.01</span>
                </div>
                <div class="wrap">
                  <span class="status ready">광고 세팅 중</span>
                </div>
              </div>
            </div>
          </div>
          <!--   ------    -->
          <div class="item">
            <p class="title">미술 작가 추천, 아트픽하소</p>
            <div class="desc">
              <p class="val">클릭 수 : 0</p>
              <p class="val">노출 수 : 0</p>
              <div class="result-wrap">
                <div class="wrap">
                  <span class="label">클릭률 : </span>
                  <span class="result">10%</span>
                </div>
                <div class="wrap">
                  <span class="label">클릭 당 비용 : </span>
                  <span class="result">100원</span>
                </div>
              </div>
              <div class="bottom-wrap">
                <div class="wrap">
                  <span class="date">2023.01.01</span>
                </div>
                <div class="wrap">
                  <span class="status show">광고 진행 중</span>
                </div>
              </div>
            </div>
          </div>
          <!--   ------    -->
          <div class="item">
            <p class="title">미술 작가 추천, 아트픽하소</p>
            <div class="desc">
              <p class="val">클릭 수 : 0</p>
              <p class="val">노출 수 : 0</p>
              <div class="result-wrap">
                <div class="wrap">
                  <span class="label">클릭률 : </span>
                  <span class="result">10%</span>
                </div>
                <div class="wrap">
                  <span class="label">클릭 당 비용 : </span>
                  <span class="result">100원</span>
                </div>
              </div>
              <div class="bottom-wrap">
                <div class="wrap">
                  <span class="date">2023.01.01</span>
                </div>
                <div class="wrap">
                  <span class="status stop">광고 중지</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Nav from '/src/components/mypage/nav.vue';

export default {
  components: {
    Nav,
  },
  props: [''],
  data() {
    return {
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
