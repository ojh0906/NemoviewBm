<template>
  <div id="mypage">
    <Nav />
    <div class="content-container">
      <div class="mypage-setting-container">
        <span class="page-title">설정</span>
        <span class="submit">저장</span>
        <div class="menu-wrap">
          <router-link :to="{ name: 'ProfileModify', query: {} }" class="menu active" >프로필 관리</router-link>
          <router-link :to="{ name: 'TaxSetting', query: {} }" class="menu" >세금계산서 관리</router-link>
          <router-link :to="{ name: 'AccountSetting', query: {} }" class="menu" >계정 관리</router-link>
        </div>
        <div class="modify-box">
          <div class="line">
            <div class="label">
              담당자<span class="required">*</span>
            </div>
            <input type="text" required>
          </div>
          <div class="line">
            <div class="label">
              연락처<span class="required">*</span>
            </div>
            <input type="text" required>
          </div>
          <div class="line">
            <div class="label">
              회사명<span class="required">*</span>
            </div>
            <input type="text" required>
          </div>
          <div class="line">
            <div class="label">
              직무/직책<span class="sel"> (선택)</span>
            </div>
            <input type="text">
          </div>
          <div class="line">
            <span class="label">직무/직책<span class="sel"> (선택)</span></span>
            <div class="select-container">
              <div class="select-box">
                1-10인
                <span class="icn"></span>
              </div>
              <div class="select-list">
                <p>1 ~ 10인</p>
                <p>11 ~ 50인</p>
                <p>51 ~ 100인</p>
                <p>101인 이상</p>
              </div>
            </div>
          </div>
          <div class="line">
            <span class="label">직무/직책<span class="sel"> (선택)</span></span>
            <div class="select-container">
              <div class="select-box">
                유입경로
                <span class="icn"></span>
              </div>
              <div class="select-list">
                <p>지인 소개</p>
                <p>블로그</p>
                <p>인스타그램</p>
                <p>포털 사이트 (네이버, 구글 등)</p>
                <p>기타</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Nav from '/src/components/mypage/nav.vue';

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
