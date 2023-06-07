<template>
  <div id="login">
    <div class="login-box" v-if="loginYn">
      <p class="title">
        지금 가입하고 <strong>10,000원 상당의</strong><br>
        <strong>무료 광고</strong>를 진행해 보세요!
      </p>
      <form @submit.prevent="formSubmit" method="POST">
        <input type="text" name="email" class="userid" placeholder="아이디" v-model="this.email">
        <input type="password" name="password" class="password" placeholder="비밀번호" v-model="this.password">
        <div class="option">
          <div class="chk-wrap">
            <label>
              <input type="checkbox" v-model="saveId">
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
</template>

<script>
import { mapGetters } from "vuex"
import { http,http2 } from '@/services';

export default {
  computed: {
    ...mapGetters(["getLoginMember","isExpired"]),
  },
  props: [''],
  data() {
    return {
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
              if(this.saveId){
                let date = new Date();
                date.setMonth(date.getMonth() + 1);
                document.cookie = 'saveId=' + this.email + '; expires=' + date.toGMTString();
              }
              this.$router.push('/mypage');
            } else {
              alert('일치하는 회원정보가 없습니다.');
            }
          })
          .catch(({ message }) => alert(message))
      return true
    },
    sendEmail(){
      if(this.findEmail === ''){
        alert('이메일을 입력하세요.')
        return;
      }
      this.findStep1 = false;
      this.findStep2 = true;
      let param = {
        email: this.findEmail,
      }
      http.post("/member/find/password",param).then((response) => {
        if (response.data.CODE == 200) {
        } else {
          alert('일치하는 회원이 없습니다.');
          this.findStep2 = false;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
  },
  created() {
    if(this.getLoginMember != null){
      if(this.isExpired){
        this.$store
            .dispatch("logout", {})
            .then(() => {})
            .catch(({ message }) => alert(message))
      } else {
        this.$router.push('/mypage');
      }
    }
    if (document.cookie.indexOf('saveId=') >= 0) {
      this.saveId = true;
      this.email = document.cookie.match(new RegExp("(?:^|; )" + 'saveId' + "=([^;]*)"))[1];
    } else {

    }
  }
}
</script>
