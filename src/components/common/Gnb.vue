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
        <!-- 알림 팝업 화면 -->
        <div class="alarm-box aPop" :class="this.onAlarmBox ? 'onAlm' : 'offAlm'">
          <div v-for="info in this.getLoginMember.infoList" class="aPop" @click="chkInfo(info)"> <!--TODO 알림 테이블 컬럼 추가 후 작업 -->
            <span class="aPop">{{ info.content }}</span><span class="new aPop" v-if="!info.chk">NEW</span>
            <p class="date aPop">{{ getDateFormat(info.regdate, 'YYYY.MM.DD') }}</p>
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

  <!-- 광고 반려 사유 팝업 -->
  <section :class="this.rejectPopup ? 'pop-up rPop' : 'pop-up-off'" @click="clickSelect">
    <article class="point-popup reject-pop" v-if="this.rejectPopup">
      <span class="close" @click="this.rejectPopup = false">X</span>
      <p class="title">광고 반려 사유</p>

      <p class="sub-title">아래 내용을 수정해 주세요!</p>
      <div class="content-box">
        <div class="" v-html="replaceContent(this.rejectMsg)">

        </div>
      </div>
      <div class="btn">
        <p class="edit" @click="goToAdEdit(this.ad)">수정하기</p>
      </div>
    </article>
  </section>
</template>

<script>
import { mapGetters } from "vuex"
import dayjs from "dayjs";
import { http, http2 } from '@/services';

export default {
  computed: {
    ...mapGetters(["getLoginMember"]),
  },
  props: [''],
  data() {
    return {
      onAlarmBox: false,
      onProfileBox: false,
      rejectPopup: false, // 리뷰 반려 사유
      rejectMsg: '',
      ad: 0,
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
      } else if (event.target.classList.contains('alarm') || event.target.classList.contains('aPop')) {
        this.onProfileBox = false;
        this.onAlarmBox = true;
      } else {
        this.onProfileBox = false;
        this.onAlarmBox = false;
      }
      if (event.target.classList.contains('rPop')) {
        this.rejectPopup = false;
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
    goToAdEdit(ad) {
      this.rejectPopup = false;
      this.$router.push({ name: 'Step1', query: { key: ad } });
    },
    chkInfo(info){
      let param = {
      }
      http.put("/member/info/" + info.member_info, param).then((response) => {
        if (response.data.CODE == 200) {
          info.chk = true;
          this.onAlarmBox = false;
          if(info.type === 1){
            this.goToAd(info);
          } else if(info.type === 2){
            this.goToPoint(info);
          }
        } else {
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    goToAd(info){
      http.get("/ad/" + info.key).then((response) => {
        if (response.data.CODE == 200) {
          if(response.data.BODY.state === 4){ // 반려
            this.rejectPopup = true;
            this.ad = response.data.BODY.ad;
            this.rejectMsg = response.data.BODY.state_error;
          } else {
            this.$router.push({ name: 'AdvertiseDetail', query: { key: response.data.BODY.ad }  });
          }
        } else {
          console.log('aa');
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    goToPoint(){
      this.rejectPopup = false;
      this.$router.push({ name: 'PointCharge' });
    },
  },
  created() {
  }
}
</script>
