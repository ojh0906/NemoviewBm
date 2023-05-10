<template>
  <div id="header-container">
    <div class="wrapper">
      <div class="logo-wrap">
        <img src="/image/common/logo.png">
      </div>
      <div class="menu-container">
        <a class="menu">광고 소개</a>
        <a class="menu">고객센터</a>
        <a class="menu">이 키워드도 추가해 주세요</a>
      </div>
      <div class="side-wrap" v-if="false">
        <a class="login">로그인</a>
        <span>|</span>
        <a class="register">회원가입</a>
      </div>
      <div class="login-side-wrap" v-if="true">
        <div class="profile" :style="{ background: 'url(' + '/image/common/logo.png' + ') no-repeat' }">
        </div>
        <img class="alarm" @click="this.onAlarmPopup" src="/image/common/alarm.png" />
        <!-- 알림 화면 -->
        <div class="alarm-box" :class="this.onAlarmBox ? 'onAlm' : 'offAlm'">
          <div v-for="v in 5">
            <span>포인트를 모두 소진하셨습니다.</span><span class="new">NEW</span>
            <p class="date">2023.02.21</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: [''],
  data() {
    return {
      onAlarmBox: false,
    }
  },
  watch: {

  },
  methods: {
    onAlarmPopup() {
      this.onAlarmBox ? this.onAlarmBox = false : this.onAlarmBox = true;
    }
  },
  created() {
  }
}
</script>
