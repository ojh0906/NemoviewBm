<template>
  <div id="header-container" @click="clickSelect">
    <div class="wrapper">
      <div class="logo-wrap">
        <img src="/image/common/logo.png" @click="this.goToPage('index')">
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
          <div v-for="info in this.getLoginMember.infoList">
            <span>{{ info.content }}</span><span class="new" v-if="getNew(info.regdate)">NEW</span>
            <p class="date">{{ getDateFormat(info.regdate,'YYYY.MM.DD') }}</p>
          </div>
        </div>

        <!-- 프로필 팝업 화면 -->
        <div class="alarm-box profile-box" :class="this.onProfileBox ? 'onAlm' : 'offAlm'">
          <div>
            <p class="name">{{ this.getLoginMember != null ? this.getLoginMember.name : '' }}</p>
            <p class="email">{{ this.getLoginMember != null ? this.getLoginMember.email : '' }}</p>
          </div>
          <div>
            <router-link :to="{ name: 'AccountSetting', query: {} }" @click="this.onProfileBox = !this.onProfileBox">
              계정 관리
            </router-link>
          </div>
          <div @click="logout(); this.onProfileBox = !this.onProfileBox" style="cursor: pointer">로그아웃</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import dayjs from "dayjs";

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
        .then(() => { this.$router.push('/') })
        .catch(({ message }) => alert(message))
    },
    clickSelect(event) {
      if (event.target.classList.contains('profile') || event.target.classList.contains('alarm-box')) {
        this.onAlarmBox = false;
        this.onProfileBox = true;
      } else if (event.target.classList.contains('alarm') || event.target.classList.contains('alarm-box')) {
        this.onProfileBox = false;
        this.onAlarmBox = true;
      } else {
        this.onProfileBox = false;
        this.onAlarmBox = false;
      }
    },
    getNew(date) {
      const now = dayjs(new Date());
      const dateTime = dayjs(date);
      const h = now.diff(dateTime.add(-9, 'h'), 'h');
      if (h < 24) {
        return true;
      }
      return false;
    },
  },
  created() {
  }
}
</script>
