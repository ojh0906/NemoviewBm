<template>
  <div id="mypage">
    <Nav />
    <div class="content-container">
      <div class="mypage-setting-container">
        <span class="page-title">설정</span>
        <span class="submit" @click="modifyMember">저장</span>
        <div class="menu-wrap">
          <router-link :to="{ name: 'ProfileModify', query: {} }" class="menu" >프로필 관리</router-link>
          <router-link :to="{ name: 'TaxSetting', query: {} }" class="menu active" >세금계산서 관리</router-link>
          <router-link :to="{ name: 'AccountSetting', query: {} }" class="menu" >계정 관리</router-link>
          <router-link :to="{ name: 'AlramSetting', query: {} }" class="menu" >알림 관리</router-link>
        </div>
        <div class="modify-box">
          <div class="line">
            <div class="label">
              세금계산서 담당자<span class="required">*</span>
            </div>
            <input type="text" v-model="this.tax_name">
          </div>
          <div class="line">
            <div class="label">
              담당자 연락처<span class="required">*</span>
            </div>
            <input type="text" v-model="this.tax_phone">
          </div>
          <div class="line">
            <div class="label">
              세금계산서 발급 이메일<span class="required">*</span>
            </div>
            <input type="text" v-model="this.tax_email">
          </div>
          <div class="line">
            <div class="label">
              사업자 등록증<span class="required">*</span>
            </div>
            <p class="file-name" v-if="this.tax_file_new.length === 0">{{ getFileName() }}</p>
            <p class="file-name" v-else>{{ this.tax_file_new[0].name }}</p>
            <span class="upload" @click="addFiles()">파일 첨부</span>
            <input type="file" ref="tax_file_new" v-on:change="handleFilesUpload()" class="hidden" style="display: none;"/>
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
      tax_name:'',
      tax_phone:'',
      tax_email:'',
      tax_file:'',
      tax_file_new:[],
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
              .then(() => { this.$forceUpdate(); })
              .catch(({ message }) => alert(message));
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    modifyMember(){
      if(this.tax_name === '' || this.tax_phone === '' || this.tax_email === '' || (this.tax_file === '' && this.tax_file_new.length === 0)){ alert('필수값을 입력해주세요.'); return;}

      let formData = new FormData();
      formData.append("tax_name", this.tax_name);
      formData.append("tax_phone", this.tax_phone);
      formData.append("tax_email", this.tax_email);

      for (var i = 0; i < this.tax_file_new.length; i++) {
        formData.append('tax_file_new', this.tax_file_new[i]);
      }
      http.put("/member/"+this.getLoginMember.member+"/tax", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then((response) => {
        if (response.data.CODE == 200) {
          alert('저장되었습니다.');
          this.getMember();
        } else {
          alert('시스템문제 발생. 관리자에게 문의하세요.');
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getFileName(){
      return this.tax_file === '' ? '-': JSON.parse(this.tax_file)[0].name;
    },
    addFiles() {
      this.$refs.tax_file_new.click();
    },
    handleFilesUpload() {
      let uploadedFiles;
      // photo
      uploadedFiles = this.$refs.tax_file_new.files;
      /*
        Adds the uploaded file to the files array
      */
      this.tax_file_new = [];
      for (var i = 0; i < uploadedFiles.length; i++) {
        // photo
        this.tax_file_new.push(uploadedFiles[i]);
      }
    },
  },
  created() {
    if(this.getLoginMember != null){
      if(this.getLoginMember.tax_name != null) this.tax_name = this.getLoginMember.tax_name;
      if(this.getLoginMember.tax_phone != null) this.tax_phone = this.getLoginMember.tax_phone;
      if(this.getLoginMember.tax_email != null) this.tax_email = this.getLoginMember.tax_email;
      if(this.getLoginMember.tax_file != null) this.tax_file = this.getLoginMember.tax_file;
    }
  }
}
</script>
