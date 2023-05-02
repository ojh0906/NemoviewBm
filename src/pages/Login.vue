<template>
  <div id="login">
    <div class="login-box">
      <p class="title">
        지금 가입하고 <strong>10,000원 상당의</strong><br>
        <strong>무료 광고</strong>를 진행해 보세요!
      </p>
      <form>
        <input type="text" name="id" class="userid" placeholder="아이디">
        <input type="password" name="password" class="password" placeholder="비밀번호">
        <div class="option">
          <div class="chk-wrap">
            <label>
              <input type="checkbox">
              아이디 저장
            </label>
          </div>
          <div>
            <a class="find">아이디/비밀번호 찾기</a>
          </div>
        </div>
        <input type="submit" class="submit" value="로그인" />
        <a class="register">회원가입</a>
      </form>
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
