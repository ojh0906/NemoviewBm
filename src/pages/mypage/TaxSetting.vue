<template>
  <div id="mypage">
    <Nav />
    <div class="content-container">
      <div class="mypage-setting-container">
        <span class="page-title">설정</span>
        <span class="submit">저장</span>
        <div class="menu-wrap">
          <router-link :to="{ name: 'ProfileModify', query: {} }" class="menu" >프로필 관리</router-link>
          <router-link :to="{ name: 'TaxSetting', query: {} }" class="menu active" >세금계산서 관리</router-link>
          <router-link :to="{ name: 'AccountSetting', query: {} }" class="menu" >계정 관리</router-link>        </div>
        <div class="modify-box">
          <div class="line">
            <div class="label">
              세금계산서 담당자<span class="required">*</span>
            </div>
            <input type="text" required>
          </div>
          <div class="line">
            <div class="label">
              담당자 연락처<span class="required">*</span>
            </div>
            <input type="text" required>
          </div>
          <div class="line">
            <div class="label">
              세금계산서 발급 이메일<span class="required">*</span>
            </div>
            <input type="text" required>
          </div>
          <div class="line">
            <div class="label">
              사업자 등록증<span class="required">*</span>
            </div>
            <p class="file-name">[가자] 사업자 등록증.PDF</p>
            <span class="upload">파일 첨부</span>
            <input type="file" value="파일 첨부">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Nav from '/src/components/mypage/Nav.vue';

export default {
  components: {
    Nav,
  },
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
