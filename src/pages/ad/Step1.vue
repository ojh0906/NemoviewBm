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
        <div id="step1">
          <p class="title-label">광고를 구분할 광고명을 입력해 주세요 :)</p>
          <input type="text" name="title" />
          <div class="tab-container">
            <span class="label">Q. 무엇을 홍보 하시겠나요?</span>
            <span class="tab" :class="tabSwitch ? 'active' : ''">제출</span>
            <span class="tab" :class="tabSwitch ? '' : 'active'">서비스</span>
          </div>
          <!--   제출   -->
          <div class="input-container" v-if="tabSwitch">
            <p class="label">1. 제품 카테고리</p>
            <input type="text" name="category">
            <p class="label">2. 제품 브랜드</p>
            <input type="text" name="brand"/>
            <p class="label">3. 제품명 <span class="tip">*50자 이내 권장</span></p>
            <textarea name="product-name" maxlength="50"></textarea>
            <div class="numchk">
              <span >0 / 50</span>
            </div>
            <p class="label">4. 제품 가격 <span class="tip">할인율이 큰 제품은 네모뷰 특가상품 영역에 소개됩니다.</span></p>
            <div class="price-wrap">
              <div class="wrap">
                <p>판매 가격</p>
                <input type="text">
              </div>
              <div class="wrap">
                <p>할인율 <span>(선택)</span></p>
                <input type="text">
                %
              </div>
              <div class="wrap">
                <p>최종 판매 가격 <span>(자동)</span></p>
                <input type="text" readonly>
              </div>
            </div>
            <p class="label">5. 제품 링크 <span class="tip">제품 가격의 ‘최종 판매 가격’의 가격과 동일한 제품 링크를 입력해 주세요!</span></p>
            <input type="text" name="link" />
            <span class="chk-btn">연결 확인</span>
            <p class="sub">* 구매를 확인할 수 있는 링크를 첨부해 보세요!</p>
            <p class="label">6. 제품 관련 키워드 <span class="tip2">(선택)</span></p>
            <input type="text" name="link" />
            <span class="chk-btn">추가</span>
            <div class="keyword-list">
              <div class="keyword">#의자 <span>x</span></div>
              <div class="keyword">#의자 <span>x</span></div>
              <div class="keyword">#의자 <span>x</span></div>
            </div>
            <p class="label">7. 홍보 이미지</p>
            <p class="chk-txt">ㅁ 이미지 제작 지원이 필요하신 분은 체크해 주세요. (사이즈 조절 범위, 디자인 지원)</p>
            <div class="img-upload-container">
              <p class="img-txt"><span class="colored">[필수]</span> 이미지1 <span class="tip">(맞춤 추천 페이지에 노출됩니다.)<img src="/image/ad/q-mark.png"></span></p>
              <div class="upload-area">
                <div class="upload-wrap">
                  <img class="" src="/image/ad/img-upload.png">
                </div>
                <div class="info-wrap">
                  <p class="info">
                    *사이즈:0000*000 (px)<br>
                    *파일 형식: jepg, png ..
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!--   서비스    -->
          <div class="input-container" v-if="!tabSwitch">
            <p class="label">1. 제품 카테고리</p>
            <input type="text" name="category">
            <p class="label">2. 제품 브랜드</p>
            <input type="text" name="brand"/>
            <p class="label">3. 제품명 <span class="tip">*50자 이내 권장</span></p>
            <textarea name="product-name" maxlength="50"></textarea>
            <div class="numchk">
              <span >0 / 50</span>
            </div>
            <p class="label">4. 제품 가격 <span class="tip">할인율이 큰 제품은 네모뷰 특가상품 영역에 소개됩니다.</span></p>
            <div class="price-wrap">
              <div class="wrap">
                <p>판매 가격</p>
                <input type="text">
              </div>
              <div class="wrap">
                <p>할인율 <span>(선택)</span></p>
                <input type="text">
                %
              </div>
              <div class="wrap">
                <p>최종 판매 가격 <span>(자동)</span></p>
                <input type="text" readonly>
              </div>
            </div>
            <p class="label">5. 제품 링크 <span class="tip">제품 가격의 ‘최종 판매 가격’의 가격과 동일한 제품 링크를 입력해 주세요!</span></p>
            <input type="text" name="link" />
            <span class="chk-btn">연결 확인</span>
            <p class="sub">* 구매를 확인할 수 있는 링크를 첨부해 보세요!</p>
            <p class="label">6. 제품 관련 키워드 <span class="tip2">(선택)</span></p>
            <input type="text" name="link" />
            <span class="chk-btn">추가</span>
            <div class="keyword-list">
              <div class="keyword">#의자 <span>x</span></div>
              <div class="keyword">#의자 <span>x</span></div>
              <div class="keyword">#의자 <span>x</span></div>
            </div>
            <p class="label">7. 홍보 이미지</p>
            <p class="chk-txt">ㅁ 이미지 제작 지원이 필요하신 분은 체크해 주세요. (사이즈 조절 범위, 디자인 지원)</p>
            <div class="img-upload-container">
              <p class="img-txt"><span class="colored">[필수]</span> 이미지1 <span class="tip">(맞춤 추천 페이지에 노출됩니다.)<img src="/image/ad/q-mark.png"></span></p>
              <div class="upload-area">
                <div class="upload-wrap">
                  <img class="" src="/image/ad/img-upload.png">
                </div>
                <div class="info-wrap">
                  <p class="info">
                    *사이즈:0000*000 (px)<br>
                    *파일 형식: jepg, png ..
                  </p>
                </div>
              </div>
            </div>
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
        <div class="edit-wrap">
          <span class="del">삭제</span>
          <span class="modify">수정</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: [''],
  data() {
    return {
      tabSwitch: true,
      keywordOpenYn: false,
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
