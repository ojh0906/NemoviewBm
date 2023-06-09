<template>
  <div id="mypage" @click="clickSelect">
    <Nav />
    <div class="content-container">
      <div class="mypage-top">
        <span class="point">보유 포인트 : <strong>{{ this.addComma(this.getLoginMember != null ? this.getLoginMember.point : 0) }}</strong></span>
        <router-link :to="{ name: 'PointCharge', query: {} }" class="charge" >충전하기</router-link>
        <span class="charge refund" @click="onClick">환불하기</span>
      </div>
      <div class="mypage-content">
        <p class="page-title-lg">네모뷰에서 <strong>더 정교한 광고를</strong> 진행해 보세요!</p>
        <div class="filter-wrap">
          <span class="filter" :class="this.filter_name === 'all' ? 'active' : ''" @click="setFilter('all');">전체기간</span>
          <span class="filter" :class="this.filter_name === 'today' ? 'active' : ''" @click="setFilter('today');">오늘</span>
          <span class="filter" :class="this.filter_name === 'yesterday' ? 'active' : ''" @click="setFilter('yesterday');">어제</span>
          <span class="filter" :class="this.filter_name === 'last7' ? 'active' : ''" @click="setFilter('last7');">최근 7일</span>
          <span class="filter" :class="this.filter_name === 'last30' ? 'active' : ''" @click="setFilter('last30');">최근 한 달</span>
          <span class="filter" :class="this.filter_name === 'custom' ? 'active' : ''" @click="setFilter('custom');">기간 설정</span>
          <div class="setting-wrap" v-if="this.filter_name === 'custom'">
            <div class="input-date-wrap">
              <input type="date" id="startdate" name="startdate" v-model="this.start_date" />
            </div>
            <span class="gap">~</span>
            <div class="input-date-wrap">
              <input type="date" id="startdate" name="startdate" v-model="this.end_date" />
            </div>
            <span class="search-btn" @click="checkDate">조회</span>
          </div>
        </div>
        <div class="ad-container">
          <div class="add-new" @click="this.goToPage('Step1')">
            <div class="wrap">
              <i class="fas fa-plus"></i>
              <p>3분 만에 광고 제작</p>
            </div>
          </div>
          <!--   ------    -->
          <div class="item" v-for="ad in adList" @click="goToAd(ad);">
            <p class="title">{{ ad.title === '' ? '광고명이 미정입니다.' : ad.title }}</p>
            <div class="desc">
              <p class="val">클릭 수 : {{ addComma(ad.hits) }}</p>
              <p class="val">노출 수 : {{ addComma(ad.shows) }}</p>
              <div class="result-wrap">
                <div class="wrap">
                  <span class="label">클릭률 : </span>
                  <span class="result">{{ ad.shows === 0 ? 0 : Math.round((ad.hits / ad.shows) * 100) }}%</span>
                </div>
                <div class="wrap">
                  <span class="label">클릭 당 비용 : </span>
                  <span class="result">{{ ad.click_price }}원</span>
                </div>
              </div>
              <div class="bottom-wrap">
                <div class="wrap">
                  <span class="date">{{ getDateFormat(ad.regdate, 'YYYY.MM.DD') }}</span>
                </div>
                <div class="wrap">
                  <span class="status ready" :class="getStatus(ad.state, ad.state_error).class">{{ getStatus(ad.state,
                    ad.state_error).name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 포인트 환불 팝업 -->
  <section :class="this.refundPopup ? 'pop-up' : 'pop-up-off'" @click="clickSelect">
    <article class="point-popup refund-pop" v-if="this.refundPopup">
      <span class="close" @click="this.refundPopup = false">X</span>
      <p class="title">포인트 환불</p>

      <p class="sub-title">환불 금액</p>
      <div class="input-wrap">
        <input type="number" name="num" />
        원
      </div>
      <p class="sub-title">은행</p>
      <div class="input-wrap">
        <input type="text" name="bank" />
        원
      </div>
      <p class="sub-title">계좌번호</p>
      <div class="input-wrap">
        <input type="number" name="account" />
        원
      </div>
      <p class="point1">보유 포인트 : <span> 원</span></p>
      <p class="point2">환불 후 금액 : <span> 원</span></p>

      <div class="btn">
        <span class="charge" @click="this.refundPopup = false;">충전</span>
        <span class="cancle" @click="this.refundPopup = false;">취소</span>
      </div>
    </article>
  </section>
</template>


<script>
import Nav from '/src/components/mypage/Nav.vue';
import { mapGetters } from "vuex"
import { http, http2 } from '@/services';

export default {
  computed: {
    ...mapGetters(["getLoginMember"]),
  },
  components: {
    Nav,
  },
  props: [''],
  data() {
    return {
      filter_name: 'all',
      adList: [],
      start_date: null,
      end_date: null,
      refundPopup: false,
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
            .then(() => { })
            .catch(({ message }) => alert(message));
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getAdList() {
      this.adList = [];
      let param = {
        member: this.getLoginMember.member,
        filter_name: this.filter_name,
        start_date: this.start_date + ' 00:00:00',
        end_date: this.end_date + ' 23:59:59',
      }
      http.post("/ad/list", param).then((response) => {
        if (response.data.CODE == 200) {
          this.adList = response.data.BODY.LIST;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    setFilter(value) {
      this.start_date = null;
      this.end_date = null;
      this.filter_name = value;
      if (value !== 'custom') {
        this.getAdList();
      }
    },
    checkDate() {
      if (this.start_date == null || this.end_date == null || this.start_date > this.end_date) {
        alert('시작일과 종료일을 정확히 설정해주세요.');
        return;
      }
      this.getAdList();
    },
    goToAd(ad) {
      if (ad.state === 4 || ad.state === 0) { // 수정 이동
        this.$router.push({ name: 'Step1', query: { key: ad.ad } });
      } else { // 상세 이동
        this.$router.push({ name: 'AdvertiseDetail', query: { key: ad.ad } });
      }
    },
    getStatus(status, error) {
      // 0: 임시저장(광고셋팅중), 1: 저장완료(검수중), 2: 검수완료(진행중), 3: 광고중지 (STATE_ERROR 수정), 4: 광고반려
      let className = '';
      let name = '';
      switch (status) {
        case 0: className = 'ready'; name = '광고 셋팅 중';
          break;
        case 1: className = 'ready'; name = '광고 검수 중';
          break;
        case 2: className = 'show'; name = '광고 진행 중';
          break;
        case 3: className = 'stop'; name = '광고 중지 (' + error + ')';
          break;
        case 4: className = 'stop'; name = '광고 반려';
          break;
      }

      return { class: className, name: name };
    },
    clickSelect(event) {
      if (event.target.classList.contains('pop-up')) {
        console.log('popup')
        this.refundPopup = false;
      } else {
        console.log('none')
      }
    },
    onClick() {
      console.log('onClick')
      this.refundPopup = true
    }
  },
  created() {
    this.getMember(); // 회원정보 갱신
    this.getAdList();
  }
}
</script>
