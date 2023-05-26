<template>
  <div id="mypage">
    <Nav />
    <div class="content-container">
      <div class="mypage-setting-container">
        <span class="page-title">설정</span>
<!--        <span class="submit">저장</span>-->
        <div class="menu-wrap">
          <router-link :to="{ name: 'ProfileModify', query: {} }" class="menu" >프로필 관리</router-link>
          <router-link :to="{ name: 'TaxSetting', query: {} }" class="menu" >세금계산서 관리</router-link>
          <router-link :to="{ name: 'AccountSetting', query: {} }" class="menu" >계정 관리</router-link>
          <router-link :to="{ name: 'AlramSetting', query: {} }" class="menu active" >알림 관리</router-link>
        </div>
        <div class="modify-box">
          <div class="alarm-line">
            <p class="title">모바일 알림</p>
            <p class="txt">포인트 소진 및 광고 현황, 업데이트, 이벤트 등의 소식을 휴대폰 번호로 받을 수 있습니다.</p>
            <img :src="this.info_mobile ? '/image/mypage/switch-on.png':'/image/mypage/switch-off.png'" @click="this.info_mobile = !this.info_mobile; modifyMember(1)">
          </div>
          <div class="alarm-line">
            <p class="title">이메일 알림</p>
            <p class="txt">포인트 소진 및 광고 현황, 업데이트, 이벤트 등의 소식을 이메일로 받을 수 있습니다.</p>
            <img :src="this.info_email ? '/image/mypage/switch-on.png':'/image/mypage/switch-off.png'" @click="this.info_email = !this.info_email; modifyMember(2)">
          </div>
        </div>
      </div>
    </div>
  </div>
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
      info_mobile:false,
      info_email:false,
    }
  },
  watch: {

  },
  methods: {
    modifyMember(type){
      let param = {

      }
      if(type === 1){
        param.info_mobile = this.info_mobile;
      } else {
        param.info_email = this.info_email;
      }
      http.put("/member/"+this.getLoginMember.member+"/info", param).then((response) => {
        if (response.data.CODE == 200) {
          this.getMember();
        } else {
          alert('시스템문제 발생. 관리자에게 문의하세요.');
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getMember() {
      console.log(this.getLoginMember.member)

      http.get("/member/" + this.getLoginMember.member).then((response) => {
        if (response.data.CODE == 200) {
          this.$store
              .dispatch("memberUpdate", { member: response.data.BODY })
              .then(() => { this.$forceUpdate(); })
              .catch(({ message }) => alert(message));
        }
      }).catch((error) => {
        console.log(error);
      });
    },
  },
  created() {
    if(this.getLoginMember != null){
      this.info_mobile = this.getLoginMember.info_mobile;
      this.info_email = this.getLoginMember.info_email;
    }
  }
}
</script>
