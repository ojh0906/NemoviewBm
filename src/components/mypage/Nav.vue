<template>
  <div class="mypage-nav-container">
    <div class="nav-wrap" :class="this.active === 'mypage' ? 'active':''">
      <router-link :to="{ name: 'Mypage', query: {} }" class="">광고 페이지</router-link>
    </div>
    <div class="nav-wrap" :class="this.active === 'setting' ? 'active':''">
      <router-link :to="{ name: 'ProfileModify', query: {} }" class="">설정</router-link>
      <ul v-if="this.active === 'setting'">
        <li :class="this.$router.currentRoute.value.path === '/profileModify' ? 'active':''"><router-link :to="{ name: 'ProfileModify', query: {} }">프로필 관리</router-link></li>
        <li :class="this.$router.currentRoute.value.path === '/TaxSetting' ? 'active':''"><router-link :to="{ name: 'TaxSetting', query: {} }" class="">세금계산서 관리</router-link></li>
        <li :class="this.$router.currentRoute.value.path === '/accountSetting' ? 'active':''"><router-link :to="{ name: 'AccountSetting', query: {} }" class="">계정 관리</router-link></li>
        <li :class="this.$router.currentRoute.value.path === '/alramSetting' ? 'active':''"><router-link :to="{ name: 'AlramSetting', query: {} }" class="">알림 관리</router-link></li>
      </ul>
    </div>
    <div class="nav-wrap" :class="this.active === 'service' ? 'active':''">
      <router-link :to="{ name: 'AffiliateServices', query: {} }" class="">제휴 서비스</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: [''],
  data() {
    return {
      active:'mypage'
    }
  },
  watch: {

  },
  methods: {

  },
  created() {
    if(this.$router.currentRoute.value.path === '/mypage'){
      this.active = 'mypage';
    } else if(this.$router.currentRoute.value.path === '/profileModify') {
      this.active = 'setting';
    } else if(this.$router.currentRoute.value.path === '/taxSetting') {
      this.active = 'setting';
    } else if(this.$router.currentRoute.value.path === '/accountSetting') {
      this.active = 'setting';
    } else if(this.$router.currentRoute.value.path === '/alramSetting') {
      this.active = 'setting';
    } else if(this.$router.currentRoute.value.path === '/affiliateServices') {
      this.active = 'service';
    }
  }
}
</script>
