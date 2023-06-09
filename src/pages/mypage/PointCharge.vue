<template>
  <div id="mypage">
    <Nav />
    <div class="content-container">
      <div class="mypage-top">
        <span class="point">보유 포인트 : <strong>{{ this.addComma(this.getLoginMember != null ? this.getLoginMember.point:0) }}</strong></span>
        <router-link :to="{ name: 'PointCharge', query: {} }" class="charge" >충전하기</router-link>
        <span class="charge refund" @click="this.refundPopup = true; this.point = 0; this.bank = ''; this.account = '';">환불하기</span>
      </div>
      <div class="mypage-content">
        <p class="page-title-lg">포인트 충전</p>
        <div class="point-charge-container">
          <p class="title">현재 포인트</p>
          <p class="point"><strong>{{ this.addComma(this.getLoginMember != null ? this.getLoginMember.point:0) }}</strong> 원</p>
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
            <router-link :to="{ name: 'TaxSetting', query: {} }" class="account-setting" >세금계산서 정보 등록하기 ></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 포인트 환불 팝업 -->
  <section :class="this.refundPopup ? 'pop-up' : 'pop-up-off'" @click="clickSelect">
    <article class="point-popup refund-pop" v-if="this.refundPopup">
      <span class="close" @click="this.refundPopup = false">X</span>
      <p class="title">포인트 환불</p>

      <p class="sub-title">환불 금액</p>
      <div class="input-wrap">
        <input type="number" name="num" v-model="this.point" />
        원
      </div>
      <p class="sub-title">은행</p>
      <div class="input-wrap">
        <input type="text" name="bank" v-model="this.bank" />
      </div>
      <p class="sub-title">계좌번호</p>
      <div class="input-wrap">
        <input type="text" name="account" v-model="this.account"/>
      </div>
      <p class="point1">보유 포인트 : <span> {{ addComma(this.getLoginMember.point) }}원</span></p>
      <p class="point2">환불 후 금액 : <span> {{ addComma(this.getLoginMember.point - (this.point === '' ? 0 : this.point)) }}원</span></p>

      <div class="btn">
        <span class="charge" @click="saveRefund">환불신청</span>
        <span class="cancle" @click="this.refundPopup = false;">취소</span>
      </div>
    </article>
  </section>
</template>


<script>
import Nav from '/src/components/mypage/Nav.vue';
import { mapGetters } from "vuex"
import { http,http2 } from '@/services';

export default {
  computed: {
    ...mapGetters(["getLoginMember"]),
  },
  components: {
    Nav,
  },
  props: [''],
  data() {
    return {
      refundPopup: false,
      point:0,
      bank:'',
      account:'',
    }
  },
  watch: {

  },
  methods: {
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
    clickSelect(event) {
      if (event.target.classList.contains('pop-up')) {
        console.log('popup')
        this.refundPopup = false;
      } else {
        console.log('none')
      }
    },
    saveRefund() {
      if(this.point === '' || this.point === 0){
        alert('환불금액을 입력해주세요.');
        return;
      }
      if(this.bank === '' || this.account === ''){
        alert('환불계좌정보를 입력해주세요.');
        return;
      }
      if((this.getLoginMember.point - this.point) < 0){
        alert('환불할 포인트가 부족합니다.');
        return;
      }
      let param = {
        type: 3,
        point: this.point * (-1),
        content: '사용자 환불',
        bank: this.bank,
        account: this.account
      }
      http.put("/member/" + this.getLoginMember.member + "/point", param).then((response) => {
        if (response.data.CODE == 200) {
          alert('환불 신청 되었습니다.');
          this.refundPopup = false;
          this.point = 0;
          this.bank = '';
          this.account = '';
          this.getMember();
        } else {
          this.getMember();
          alert('포인트 부족이거나 네트워크 이상으로 인한 환불 실패. 네트워크 담당자에게 문의하세요.');
        }
      }).catch((error) => {
        console.log(error);
        alert('환불 실패. 네트워크 담당자에게 문의하세요.');
      });
    }
  },
  created() {
    this.getMember(); // 회원정보 갱신
  }
}
</script>
