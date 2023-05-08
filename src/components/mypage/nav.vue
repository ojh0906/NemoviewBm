<template>
    <div class="mypage-nav-container">
      <div class="nav-wrap active">
        <router-link :to="{ name: 'Mypage', query: {} }" class="" >광고 페이지</router-link>
      </div>
      <div class="nav-wrap">
        <router-link :to="{ name: 'MemberModify', query: {} }" class="" >설정</router-link>
      </div>
      <div class="nav-wrap">
        <a>제휴 서비스</a>
      </div>
    </div>
</template>


<script>

export default {
  props: [''],
  data() {
    return {
    }
  },
  watch: {

  },
  methods: {

  },
  created() {
  }
}
</script>
