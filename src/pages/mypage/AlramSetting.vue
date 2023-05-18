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
            <img src="/image/mypage/switch-on.png">
          </div>
          <div class="alarm-line">
            <p class="title">이메일 알림</p>
            <p class="txt">포인트 소진 및 광고 현황, 업데이트, 이벤트 등의 소식을 이메일로 받을 수 있습니다.</p>
            <img src="/image/mypage/switch-off.png">
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
      password:'',
    }
  },
  watch: {

  },
  methods: {
    showPassword() {
      var x = document.getElementById("password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
    modifyMember(){
      if(this.password === ''){ alert('비밀번호를 입력해주세요.'); return;}

      let param = {
        password: this.password,
      }
      http.put("/member/"+this.getLoginMember.member+"/password", param).then((response) => {
        if (response.data.CODE == 200) {
          alert('비밀번호가 변경되었습니다.');
          this.$store
              .dispatch("logout", {})
              .then(() => {this.$router.push('/login')})
              .catch(({ message }) => alert(message))
        } else {
          alert('시스템문제 발생. 관리자에게 문의하세요.');
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  created() {
  }
}
</script>
