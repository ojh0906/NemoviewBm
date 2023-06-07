<template>
  <div id="mypage">
    <Nav />
    <div class="content-container">
      <div class="service-page">
        <p class="title">제휴 서비스</p>
        <p class="sub-title">원하는 제휴 서비스가 있으시다면 gajahcompany@gmail.com으로 문의주세요.</p>
        <!-- 1000X100 -->
        <div class="gray-box" v-for="service in this.serviceList" :style="{ background: 'url(' + getImagePath(service.image, 0) + ') no-repeat' }">
          <div v-html="service.content"></div>
          <div class="link-box" @click="goToLink(service.link)">{{ service.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Nav from '/src/components/mypage/Nav.vue';
import { http, http2 } from '@/services';

export default {
  components: {
    Nav,
  },
  props: [''],
  data() {
    return {
      serviceList: [],
    }
  },
  watch: {

  },
  methods: {
    getServiceList() {
      http.post("/service/list", {}).then((response) => {
        if (response.data.CODE == 200) {
          this.serviceList = response.data.BODY.LIST;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    goToLink(link) {
      location.href = link;
    }
  },
  created() {
    this.getServiceList();
  }
}
</script>
