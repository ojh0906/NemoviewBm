<template>
  <div id="header-container">
    <div class="wrapper">
      <div class="logo-wrap">
        <img src="/image/common/logo.png">
      </div>
      <div class="menu-container">
        <a class="menu" href="https://sour-potato-420.notion.site/7eed62d4e1b641d58eaa797fed9f3c15" target="_blank">광고 소개</a>
        <a class="menu" href="https://sour-potato-420.notion.site/4bfc4f28513f436784ab9efc1e46f75d" target="_blank">고객센터</a>
        <a class="menu" href="https://sour-potato-420.notion.site/ff5b3e88a6114135a9306d9be4073d96" target="_blank">이 키워드도 추가해 주세요</a>
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
