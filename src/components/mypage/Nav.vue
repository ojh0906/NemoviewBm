<template>
  <div class="mypage-nav-container">
    <div class="nav-wrap" :class="this.active === 'mypage' ? 'active':''">
      <router-link :to="{ name: 'Mypage', query: {} }" class="">광고 페이지</router-link>
    </div>
    <div class="nav-wrap" :class="this.active === 'setting' ? 'active':''">
      <router-link :to="{ name: 'ProfileModify', query: {} }" class="">설정</router-link>
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
    } else if(this.$router.currentRoute.value.path === '/affiliateServices') {
      this.active = 'service';
    }
  }
}
</script>
