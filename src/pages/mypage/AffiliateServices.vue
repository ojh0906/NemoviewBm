<template>
  <div id="mypage">
    <Nav />
    <div class="content-container">
      <div class="service-page">
        <p class="title">제휴 서비스</p>
        <p class="sub-title">원하는 제휴 서비스가 있으시다면 gajahcompany@gmail.com으로 문의주세요.</p>
        <div class="gray-box">
          <p class="">광고 효율이 좋지 않으신가요?<img class="zoom" src="/image/mypage/zoom.png" /></p>
          <p>그린테스터 서비스를 통해 제품/서비스를 검증해 보세요!</p>
          <div class="link-box">'그린테스터' 바로가기</div>
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
