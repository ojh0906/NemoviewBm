<template>
  <div id="mypage">
    <Nav />
    <div class="content-container">
      <div class="mypage-top">
        <span class="point">보유 포인트 : <strong>52,000</strong></span>
        <router-link :to="{ name: 'PointCharge', query: {} }" class="charge" >충전하기</router-link>
      </div>
      <div class="mypage-content">
        <p class="page-title-lg">포인트 충전</p>
        <div class="point-charge-container">
          <p class="title">현재 포인트</p>
          <p class="point"><strong>52,000</strong> 원</p>
          <p class="title">포인트 충전 방법</p>
          <p class="txt">
            현재 포인트 충전은 계좌이체를 통해서만 가능합니다.<br>
            충전하고자 하는 금액을 아래 계좌로 입금 후 카카오톡 채널로 말씀해 주세요.
          </p>
          <p class="account">
            입금 계좌: 481 -054497 - 04 - 018 (기업은행) <br>
            예금주: 고수열
          </p>
          <div class="bottom-wrap">
            <a href="http://pf.kakao.com/_xojDkxj/chat" target="_blank">
              <img src="/image/mypage/ch.png">
            </a>
            <router-link :to="{ name: 'AccountSetting', query: {} }" class="account-setting" >세금계산서 정보 등록하기 ></router-link>
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
