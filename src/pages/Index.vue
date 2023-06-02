<template>
  <div id="main">
    <div class="wrapper">
      <div class="left-container">
        <p class="sub">누구나 쉽고 더 정확하게,</p>
        <p class="title">네모뷰 광고</p>
        <p class="txt1">광고 효과를 제대로 보지 못하시고 계신가요?</p>
        <p class="txt2">
          디테일한 사용자 키워드를 통해<br>
          더 정밀한 타겟팅 광고를 진행해 보세요!
        </p>
        <span class="start" @click="modalOpenYn = true" v-if="this.getLoginMember == null">시작하기</span>
      </div>
      <div class="right-container">
        <img src="/image/common/main.png">
      </div>
    </div>
    <div class="modal-container" :class="modalOpenYn ? 'open' : 'hide'">
      <div class="login-box" v-if="loginYn">
        <p class="title">
          지금 가입하고 <strong>10,000원 상당의</strong><br>
          <strong>무료 광고</strong>를 진행해 보세요!
        </p>
        <form @submit.prevent="formSubmit" method="POST">
          <input type="text" name="email" class="userid" placeholder="아이디" v-model="email">
          <input type="password" name="password" class="password" placeholder="비밀번호" v-model="password" >
          <div class="option">
            <div class="chk-wrap">
              <label>
                <input type="checkbox" v-model="this.saveId">
                아이디 저장
              </label>
            </div>
            <div>
              <a class="find" @click="loginYn = false; findStep1 = true;">비밀번호 찾기</a>
            </div>
          </div>
          <input type="submit" class="submit" value="로그인" />
          <router-link :to="{ name: 'Register', query: {} }" class="register">회원가입</router-link>
        </form>
      </div>
      <div class="login-box" v-if="findStep1">
        <p class="find-title">비밀번호 찾기</p>
        <p class="sub-txt">가입하신 이메일로 비밀번호 재설정 방법을 보내드립니다.</p>
        <p class="label">이메일</p>
        <input type="email" class="email" placeholder="이메일을 입력하세요." v-model="this.findEmail">
        <p class="wrong">올바른 형식의 이메일을 입력하세요.</p>
        <input type="button" class="find-submit" value="임시 비밀번호 메일 전송" @click="sendEmail" />
      </div>
      <div class="login-box" v-if="findStep2">
        <p class="find-title">비밀번호 찾기</p>
        <p class="sub-txt">회원님의 이메일로 임시 비밀번호가 발송되었습니다.</p>
        <p class="email-info">{{ this.findEmail.substring(0,2) }}********{{ this.findEmail.substring(this.findEmail.indexOf('@')) }}</p>
        <span class="find-submit" @click="findStep2 = false; loginYn = true;" >로그인 하기</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import { http,http2 } from '@/services';

export default {
  computed: {
    ...mapGetters(["isAuthenticated", "isExpired", "getLoginMember"]),
  },
  props: [''],
  data() {
    return {
      modalOpenYn: false,
      email:'',
      password:'',
      loginYn: true,
      findStep1: false,
      findStep2: false,
      findStep3: false,
      findStep4: false,
      findEmail:'',
      saveId:false,
    }
  },
  watch: {

  },
  methods: {
    async formSubmit() {
      this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password,
          })
          .then(response => {
            if(response.data.CODE == 200){
              this.modalOpenYn = false;
              if(this.saveId){
                let date = new Date();
                date.setMonth(date.getMonth() + 1);
                document.cookie = 'saveId=' + this.email + '; expires=' + date.toGMTString();
              }
              //this.$forceUpdate();
              this.$router.push('/mypage');
            } else {
              alert('일치하는 회원정보가 없습니다.');
            }
          })
          .catch(({ message }) => alert(message))
      return true
    },
  },
  created() {
    if(this.getLoginMember != null){
      this.$router.push('/mypage');
    }
    if (document.cookie.indexOf('saveId=') >= 0) {
      this.saveId = true;
      this.email = document.cookie.match(new RegExp("(?:^|; )" + 'saveId' + "=([^;]*)"))[1];
    } else {

    }
  }
}
</script>
