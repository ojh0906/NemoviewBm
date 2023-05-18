<template>
  <div id="mypage">
    <Nav />
    <div class="content-container">
      <div class="mypage-setting-container">
        <span class="page-title">설정</span>
        <span class="submit" @click="modifyMember">저장</span>
        <div class="menu-wrap">
          <router-link :to="{ name: 'ProfileModify', query: {} }" class="menu active" >프로필 관리</router-link>
          <router-link :to="{ name: 'TaxSetting', query: {} }" class="menu" >세금계산서 관리</router-link>
          <router-link :to="{ name: 'AccountSetting', query: {} }" class="menu" >계정 관리</router-link>
          <router-link :to="{ name: 'AlramSetting', query: {} }" class="menu" >알림 관리</router-link>
        </div>
        <div class="modify-box">
          <div class="line">
            <div class="label">
              담당자<span class="required">*</span>
            </div>
            <input type="text" v-model="this.name">
          </div>
          <div class="line">
            <div class="label">
              연락처<span class="required">*</span>
            </div>
            <input type="text" v-model="this.phone">
          </div>
          <div class="line">
            <div class="label">
              회사명<span class="required">*</span>
            </div>
            <input type="text" v-model="this.company">
          </div>
          <div class="line">
            <div class="label">
              직무/직책<span class="sel"> (선택)</span>
            </div>
            <input type="text" v-model="this.position">
          </div>
          <div class="line">
            <span class="label">회사규모<span class="sel"> (선택)</span></span>
            <div class="select-container">
              <div class="select-box" @click="this.company_size_open = !this.company_size_open">
                {{ this.company_size_list.findIndex(i => i.v == this.company_size) >= 0 ? this.company_size_list[this.company_size_list.findIndex(i => i.v == this.company_size)].t:'' }}
                <span class="icn"></span>
              </div>
              <div class="select-list" v-if="this.company_size_open">
                <p v-for="item in this.company_size_list" @click="this.company_size = item.v; this.company_size_open = !this.company_size_open">{{ item.t }}</p>
              </div>
            </div>
          </div>
          <div class="line">
            <span class="label">유입 경로<span class="sel"> (선택)</span></span>
            <div class="select-container">
              <div class="select-box" @click="this.inflow_open = !this.inflow_open">
                {{ this.inflow_list.findIndex(i => i.v == this.inflow) >= 0 ? this.inflow_list[this.inflow_list.findIndex(i => i.v == this.inflow)].t:'' }}
                <span class="icn"></span>
              </div>
              <div class="select-list" v-if="this.inflow_open">
                <p v-for="item in this.inflow_list" @click="this.inflow = item.v; this.inflow_open = !this.inflow_open">{{ item.t }}</p>
              </div>
            </div>
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
  setup() {
    const company_size_list = [
      {t:'1 ~ 10인', v:0},
      {t:'11 ~ 50인', v:1},
      {t:'51 ~ 100인', v:2},
      {t:'101인 이상', v:3},
    ];
    const inflow_list = [
      {t:'지인 소개', v:0},
      {t:'블로그', v:1},
      {t:'인스타그램', v:2},
      {t:'포털 사이트 (네이버, 구글 등)', v:3},
      {t:'기타', v:4},
    ];
    return {
      company_size_list,
      inflow_list,
    }
  },
  data() {
    return {
      name:'',
      phone:'',
      company:'',
      position:'',
      company_size:-1,
      inflow:-1,
      company_size_open:false,
      inflow_open:false,
    }
  },
  watch: {

  },
  methods: {
    getMember() {
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
    modifyMember(){
      if(this.name === '' || this.phone === '' || this.company === '' ){
        alert('필수값을 입력해주세요.');
        return;
      }

      let param = {
        name: this.name,
        phone: this.phone,
        company: this.company,
      }
      if(this.position !== ''){
        param.position = this.position;
      }
      if(this.company_size >= 0){
        param.company_size = this.company_size;
      }
      if(this.inflow >= 0){
        param.inflow = this.inflow;
      }
      http.put("/member/"+this.getLoginMember.member, param).then((response) => {
        if (response.data.CODE == 200) {
          alert('프로필이 변경되었습니다.');
          this.getMember();
        } else {
          alert('시스템문제 발생. 관리자에게 문의하세요.');
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  created() {
    if(this.getLoginMember != null){
      this.name = this.getLoginMember.name;
      this.phone = this.getLoginMember.phone;
      this.company = this.getLoginMember.company;
      if(this.getLoginMember.position != null) this.position = this.getLoginMember.position;
      if(this.getLoginMember.company_size != null) this.company_size = this.getLoginMember.company_size;
      if(this.getLoginMember.inflow != null) this.inflow = this.getLoginMember.inflow;
    }
  }
}
</script>
