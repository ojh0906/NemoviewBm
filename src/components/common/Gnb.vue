<template>
  <div id="header-container">
    <div class="wrapper">
      <div class="logo-wrap">
        <img src="/image/common/logo.png" @click="goHome()">
      </div>
      <div class="menu-container">
        <a class="menu" href="https://sour-potato-420.notion.site/7eed62d4e1b641d58eaa797fed9f3c15" target="_blank">광고
          소개</a>
        <a class="menu" href="https://sour-potato-420.notion.site/4bfc4f28513f436784ab9efc1e46f75d"
          target="_blank">고객센터</a>
        <a class="menu" href="https://sour-potato-420.notion.site/ff5b3e88a6114135a9306d9be4073d96" target="_blank">이 키워드도
          추가해 주세요</a>
      </div>
      <div class="side-wrap" v-if="this.getLoginMember == null">
        <router-link :to="{ name: 'Login', query: {} }" class="login">로그인</router-link>
        <span>|</span>
        <router-link :to="{ name: 'Register', query: {} }" class="register">회원가입</router-link>
      </div>
      <div class="login-side-wrap" v-else>
        <div class="profile" @click="onProfilePopup"
          :style="{ background: 'url(' + '/image/common/logo.png' + ') no-repeat' }">
        </div>
        <img class="alarm" @click="onAlarmPopup" src="/image/common/alarm.png" />
        <!-- 알림 핍압 화면 -->
        <div class="alarm-box" :class="this.onAlarmBox ? 'onAlm' : 'offAlm'">
          <div v-for="v in 5">
            <span>포인트를 모두 소진하셨습니다.</span><span class="new">NEW</span>
            <p class="date">2023.02.21</p>
          </div>
        </div>

        <!-- 프로필 팝업 화면 -->
        <div class="alarm-box profile-box" :class="this.onProfileBox ? 'onAlm' : 'offAlm'">
          <div>
            <p class="name">{{ this.getLoginMember != null ? this.getLoginMember.name :'' }}</p>
            <p class="email">{{ this.getLoginMember != null ? this.getLoginMember.email :'' }}</p>
          </div>
          <div>
            <router-link :to="{ name: 'AccountSetting', query: {} }" @click="this.onProfileBox = !this.onProfileBox">
              계정 관리
            </router-link>
          </div>
          <div @click="logout(); this.onProfileBox = !this.onProfileBox" style="cursor: pointer" >로그아웃</div>
        </div>
      </div>
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
      onAlarmBox: false,
      onProfileBox: false,
    }
  },
  watch: {

  },
  methods: {
    onAlarmPopup() {
      this.onAlarmBox = !this.onAlarmBox;
      this.onProfileBox = false;
    },
    onProfilePopup() {
      this.onProfileBox = !this.onProfileBox;
      this.onAlarmBox = false;
    },
    logout() {
      this.$store
          .dispatch("logout", {})
          .then(() => {this.$router.push('/')})
          .catch(({ message }) => alert(message))
    },
    goHome(){
      this.$router.push('/');
    }
  },
  created() {
  }
}
</script>
