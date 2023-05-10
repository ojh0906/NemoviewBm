<template>
    <div id="ad-setting">
      <div class="step-container">
        <div class="left-container">
          <div class="menu-wrap">
            <router-link :to="{ name: 'Mypage', query: {} }" class="menu" >마이페이지</router-link>
            <router-link :to="{ name: '', query: {} }" class="menu" >임시 저장</router-link>
          </div>
          <div class="title-wrap">
            <p><strong>광고 예산</strong>를 설정해 주세요!</p>
            <img src="/image/ad/question.png">
          </div>
          <div id="step4">
            <p class="txt1">클릭 당 비용 <img src="/image/ad/q-mark.png"></p>
            <p class="txt2">클릭당 비용이 높을 수록 우선 노출됩니다.</p>
            <div class="input-wrap">
              <input type="text">
              <span>원</span>
            </div>
            <p class="txt1">하루 예산 <img src="/image/ad/q-mark.png"></p>
            <p class="txt2">하루에 해당 비용 이상 지출되지 않습니다.</p>
            <div class="input-wrap">
              <input type="text">
              <span>원</span>
            </div>
          </div>
        </div>
        <div class="right-container">
          <p class="page-title">해당 키워드를 보유한 <span class="colored">회원 수</span></p>
          <p class="peo">
            <span>약 </span>
            10,000
            <span> 명</span>
          </p>
          <p class="txt">이렇게 <strong>광고 되고 있어요!</strong></p>
          <div class="preview-box">
            <div class="img-wrap" style="background: url('/image/temp/ad-temp.png')">
              <img class="wish" src="/image/mypage/wish.png">
            </div>
            <p class="brand">NIKE</p>
            <p class="preview-title">
              나이키 덩크로우 범고래 PS 에어 포스 111
              PLT.AF.ORM 올화이트 GS 검흰1111111
            </p>
            <div class="hashtag-wrap">
              <span class="hashtag">#운동화</span>
              <span class="hashtag">#농구화</span>
              <span class="hashtag">#덩크로우</span>
            </div>
            <div class="keywordyn" @click="keywordOpenYn = !keywordOpenYn">
              <span class="keyword-title">내 키워드와 </span>
              <span class="skeyword">5개</span>
              <span class="keyword-title"> 일치해요</span>
              <i class="fas fa-chevron-down" v-if="!keywordOpenYn" ></i>
              <i class="fas fa-chevron-up" v-if="keywordOpenYn"></i>
            </div>
            <div class="keyword-wrap" :class="keywordOpenYn ? 'open' : 'close'">
              <span class="keyword">브랜드 중요</span>
              <span class="keyword">직장인</span>
              <span class="keyword">서울</span>
              <span class="keyword">여</span>
              <span class="keyword">남</span>
              <span class="keyword">원룸 거주</span>
            </div>
            <div class="price-wrap">
              <span class="sale">50%</span>
              <span class="cost">90,000원</span>
              <span class="discount">45,000원</span>
            </div>
          </div>
          <div class="edit-wrap">
            <span class="del">삭제</span>
            <span class="modify">최종 제출</span>
          </div>
        </div>
      </div>
      <!--   Success Modal   -->
      <div class="modal-container">
        <p class="title"><strong>광고 제작이 완료</strong>되었습니다!</p>
        <p class="txt">
          광고 검수 후, 가입 시 입력했던<br>
          메일로 연락드리겠습니다.
        </p>
        <span class="btn">확인</span>
      </div>

    </div>
</template>
