<template>
    <div id="ad-setting">
      <div class="step-container">
        <div class="left-container">
          <div class="menu-wrap">
            <router-link :to="{ name: 'Mypage', query: {} }" class="menu" >마이페이지</router-link>
            <router-link :to="{ name: '', query: {} }" class="menu" >임시 저장</router-link>
          </div>
          <div class="title-wrap">
            <p>홍보할 <strong>제품/서비스</strong>를 소개해 주세요!</p>
            <img src="/image/ad/question.png">
          </div>
          <div id="step3">

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


          <div class="edit-wrap">
            <span class="del">삭제</span>
            <span class="modify">수정</span>
          </div>
        </div>
      </div>
    </div>
</template>
