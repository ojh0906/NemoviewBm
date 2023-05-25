<template>
  <div id="mypage">
    <Nav />
    <div class="content-container">
      <div class="mypage-top">
        <span class="point">보유 포인트 : <strong>{{ this.addComma(this.getLoginMember != null ? this.getLoginMember.point:0) }}</strong></span>
        <router-link :to="{ name: 'PointCharge', query: {} }" class="charge" >충전하기</router-link>
      </div>
      <div class="mypage-content">
        <p class="page-title-lg">네모뷰에서 <strong>더 정교한 광고를</strong> 진행해 보세요!</p>
        <div class="filter-wrap">
          <span class="filter" :class="this.filter_name === 'all' ? 'active':''" @click="setFilter('all');">전체기간</span>
          <span class="filter" :class="this.filter_name === 'today' ? 'active':''" @click="setFilter('today');">오늘</span>
          <span class="filter" :class="this.filter_name === 'yesterday' ? 'active':''" @click="setFilter('yesterday');">어제</span>
          <span class="filter" :class="this.filter_name === 'last7' ? 'active':''" @click="setFilter('last7');">최근 7일</span>
          <span class="filter" :class="this.filter_name === 'last30' ? 'active':''" @click="setFilter('last30');">최근 한 달</span>
          <span class="filter" :class="this.filter_name === 'custom' ? 'active':''" @click="setFilter('custom');">기간 설정</span>
          <div class="setting-wrap" v-if="this.filter_name === 'custom'">
            <div class="input-date-wrap">
              <input type="date" id="startdate" name="startdate" />
            </div>
            <span class="gap">~</span>
            <div class="input-date-wrap">
              <input type="date" id="startdate" name="startdate" />
            </div>
            <span class="search-btn">조정</span>
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
          <div class="item" v-for="ad in adList" @click="goToAd(ad.ad);">
            <p class="title">{{ ad.title === '' ? '광고명이 미정입니다.':ad.title }}</p>
            <div class="desc">
              <p class="val">클릭 수 : {{ addComma(1000) }}</p>
              <p class="val">노출 수 : {{ addComma(1000) }}</p>
              <div class="result-wrap">
                <div class="wrap">
                  <span class="label">클릭률 : </span>
                  <span class="result">25%</span>
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
                  <span class="status ready">광고 세팅 중</span>
                  <span class="status show">광고 진행 중</span>
                  <span class="status stop">광고 중지</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Nav from '/src/components/mypage/Nav.vue';
import { mapGetters } from "vuex"
import { http,http2 } from '@/services';

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
      filter_name:'all',
      adList:[],
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
        member : this.getLoginMember.member,
      }
      if(this.filter_name !== 'all'){
        param.filter = this.filter_name;
      }
      http.post("/ad/list",param).then((response) => {
        if (response.data.CODE == 200) {
          this.adList = response.data.BODY.LIST;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    setFilter(value){
      this.filter_name = value;
    },
    goToAd(key){
      this.$router.push({ name: 'Step1', query: {key:key} });
    }
  },
  created() {
    this.getMember(); // 회원정보 갱신
    this.getAdList();
  }
}
</script>
