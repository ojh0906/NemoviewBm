<template>
  <div id="login">
    <div class="login-box">
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
              <input type="checkbox">
              아이디 저장
            </label>
          </div>
          <div>
            <a class="find">아이디/비밀번호 찾기</a>
          </div>
        </div>
        <input type="submit" class="submit" value="로그인" />
        <router-link :to="{ name: 'Register', query: {} }" class="register">회원가입</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters(["getLoginMember"]),
  },
  props: [''],
  data() {
    return {
      email:'',
      password:'',
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
              this.$router.push('/');
            } else {
              this.warning = true;
            }
          })
          .catch(({ message }) => alert(message))
      return true
    },
  },
  created() {
    if(this.getLoginMember != null){
      this.$router.push('/');
    }
  }
}
</script>
