<template>
  <div id="register" @click="clickSelect($event)">
    <p class="page-title">회원가입</p>
    <div class="agreement-box">
      <div class="top">
        <label>
          <input type="checkbox" v-model="this.all" @change="setAllCheck($event)">
          전체 동의
        </label>
      </div>
      <div class="bottom">
        <div class="line">
          <label>
            <input type="checkbox" v-model="this.terms1" @change="setCheck($event)">
            <span class="red">[필수]</span>
            약관 동의
          </label>
          <a target="_blank" href="https://sour-potato-420.notion.site/BM-2e3f1ab4d4284e989b7bd982f44b1499?pvs=4"
            class="more">자세히</a>
          <!-- <div class="detail" @click="">
                   약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.            약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.            약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.
          </div> -->
        </div>
        <div class="line">
          <label>
            <input type="checkbox" v-model="this.terms2" @change="setCheck($event)">
            <span class="red">[필수]</span>
            개인정보 처리방침
          </label>
          <a target="_blank" href="https://sour-potato-420.notion.site/BM-2e3f1ab4d4284e989b7bd982f44b1499?pvs=4"
            class="more">자세히</a>
          <!-- <div class="detail" @click="">
              약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.            약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.            약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.
          </div> -->
        </div>
        <div class="line">
          <label>
            <input type="checkbox" v-model="this.terms3" @change="setCheck($event)">
            <span class="red">[필수]</span>
            개인정보 위탁 관리 방침
          </label>
          <a target="_blank" href="https://sour-potato-420.notion.site/BM-2e3f1ab4d4284e989b7bd982f44b1499?pvs=4"
            class="more">자세히</a>
          <!-- <div class="detail" @click="">
              약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.            약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.            약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.             약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.약관내용입니다. 약관내용입니다. 약관내용입니다.
          </div> -->
        </div>
      </div>
    </div>
    <div class="register-box">
      <div class="line">
        <span class="label">이메일<span class="req"> *</span></span>
        <div class="input-wrap">
          <input type="email" v-model="this.email" />
          <img class="confirm" src="/image/common/confirm.png" v-if="this.emailCheck">
        </div>
        <span class="cert-btn" v-if="this.emailCheck && !this.codeCheck">
          {{ this.getDiffDays(this.countEnd, this.countNow, 'm') }} : {{ this.getDiffDays(this.countEnd, this.countNow,
            's') % 60 }}
        </span>
        <span class="cert-btn" @click="checkDuple" v-if="!this.emailCheck">인증번호 전송</span>
        <span class="cert-btn" @click="checkDuple" v-if="this.codeReCheck">인증번호 재전송</span>
      </div>
      <div class="line" v-if="this.emailCheck">
        <span class="label">인증번호 입력<span class="req"> *</span></span>
        <div class="input-wrap">
          <input type="text" v-model="this.code" />
          <img class="confirm" src="/image/common/confirm.png" v-if="this.codeCheck">
        </div>
        <span class="cert-btn" @click="getCheckCode" v-if="this.emailCheck && !this.codeCheck">인증번호 확인</span>
      </div>
      <div class="line">
        <span class="label">비밀번호<span class="req"> *</span></span>
        <input type="password" v-model="this.password" />
      </div>
      <p class="tip">*영문/숫자/특수문자 8~20자리</p>
      <div class="line">
        <span class="label">비밀번호 확인<span class="req"> *</span></span>
        <div class="input-wrap">
          <input type="password" v-model="this.password2" />
          <img class="confirm" src="/image/common/confirm.png"
            v-if="(this.password !== '') && (this.password === this.password2)">
        </div>
      </div>
      <p class="tip" v-if="(this.password !== '') && (this.password !== this.password2)">비밀번호가 일치하지 않습니다.</p>
      <hr>
      <div class="line">
        <span class="label">담당자<span class="req"> *</span></span>
        <input type="text" v-model="this.name" />
      </div>
      <div class="line">
        <span class="label">연락처<span class="req"> *</span></span>
        <input type="text" placeholder="01012341234" v-model="this.phone" />
      </div>
      <div class="line">
        <span class="label">회사명<span class="req"> *</span></span>
        <input type="text" placeholder="" v-model="this.company" />
      </div>
      <div class="line">
        <span class="label">직무/직책<span class="sel"> (선택)</span></span>
        <input type="text" placeholder="" v-model="this.position" />
      </div>
      <div class="line">
        <span class="label">회사규모<span class="sel"> (선택)</span></span>
        <div class="select-container">
          <div class="select-box" @click="this.company_size_open = !this.company_size_open; this.inflow_open = false;">
            {{ this.company_size_list.findIndex(i => i.v == this.company_size) >= 0 ?
              this.company_size_list[this.company_size_list.findIndex(i => i.v == this.company_size)].t : '' }}
            <span class="icn"></span>
          </div>
          <div class="select-list" v-if="this.company_size_open">
            <p v-for="item in this.company_size_list"
              @click="this.company_size = item.v; this.company_size_open = !this.company_size_open">{{ item.t }}</p>
          </div>
        </div>
      </div>
      <div class="line">
        <span class="label">유입 경로<span class="sel"> (선택)</span></span>
        <div class="select-container">
          <div class="select-box" @click="this.inflow_open = !this.inflow_open; this.company_size_open = false;">
            {{ this.inflow_list.findIndex(i => i.v == this.inflow) >= 0 ? this.inflow_list[this.inflow_list.findIndex(i =>
              i.v == this.inflow)].t : '' }}
            <span class="icn"></span>
          </div>
          <div class="select-list" v-if="this.inflow_open">
            <p v-for="item in this.inflow_list" @click="this.inflow = item.v; this.inflow_open = !this.inflow_open">{{
              item.t }}</p>
          </div>
        </div>
      </div>
    </div>
    <a class="submit" @click="saveMember">완료</a>
  </div>
</template>

<script>
import { http } from '@/services';

export default {
  props: [''],
  setup() {
    const company_size_list = [
      { t: '1 ~ 10인', v: 0 },
      { t: '11 ~ 50인', v: 1 },
      { t: '51 ~ 100인', v: 2 },
      { t: '101인 이상', v: 3 },
    ];
    const inflow_list = [
      { t: '지인 소개', v: 0 },
      { t: '블로그', v: 1 },
      { t: '인스타그램', v: 2 },
      { t: '포털 사이트 (네이버, 구글 등)', v: 3 },
      { t: '기타', v: 4 },
    ];
    return {
      company_size_list,
      inflow_list,
    }
  },
  data() {
    return {
      all: false,
      terms1: false,
      terms2: false,
      terms3: false,
      email: '',
      code: '',
      password: '',
      password2: '',
      name: '',
      phone: '',
      company: '',
      position: '',
      company_size: -1,
      inflow: -1,
      emailCheck: false,
      codeCheck: false,
      codeReCheck: false,
      countEnd: null,
      countNow: null,
      company_size_open: false,
      inflow_open: false,
    }
  },
  watch: {

  },
  methods: {
    setAllCheck(event) {
      if (event.target.checked) {
        this.terms1 = true;
        this.terms2 = true;
        this.terms3 = true;
      } else {
        this.terms1 = false;
        this.terms2 = false;
        this.terms3 = false;
      }
    },
    setCheck() {
      if (this.terms1 && this.terms2 && this.terms3) {
        this.all = true;
      } else {
        this.all = false;
      }
    },
    checkDuple() {
      if (this.email === '') {
        alert('이메일을 입력하세요');
        return;
      }
      if (this.checkEmail(this.email)) {
        alert('이메일을 정확히 입력해주세요');
        return;
      }
      let param = {
        email: this.email, //true
      }
      http.post("/member/duple", param).then((response) => {
        if (response.data.CODE == 200) {
          if (response.data.BODY.code != null) { // 신규
            let date = new Date();
            date.setMinutes(date.getMinutes() + 3);
            document.cookie = 'memberRegisterCode=' + response.data.BODY.code + '; expires=' + date.toGMTString();
            this.emailCheck = true;
            this.getCheckTime();

            //if (document.cookie.indexOf('pageHit=true') >= 0) {
          } else {
            alert('중복된 이메일이 있습니다.');
          }
          console.log(response);
        } else {
          alert('시스템문제 발생. 관리자에게 문의하세요.');
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getCheckTime() {
      this.codeReCheck = false;
      if (this.codeCheck) { // 인증완료
        return;
      }
      if (this.countEnd != null && this.countNow != null) {
        if (this.countEnd.getTime() <= this.countNow.getTime()) { // 시간초과
          this.countEnd = null;
          this.countNow = null;
          this.codeReCheck = true;
          return;
        }
      }

      if (this.countEnd == null) { // 초기 셋팅
        this.countEnd = new Date();
        this.countEnd.setMinutes(this.countEnd.getMinutes() + 3);
      }

      this.countNow = new Date();

      setInterval(this.getCheckTime, 1000);
    },
    getCheckCode() {
      if (this.code === '') {
        alert('코드를 입력해주세요.');
        return;
      }
      if (document.cookie.indexOf('memberRegisterCode=') >= 0) {
        //document.cookie.match('(^|;) ?' + 'memberRegisterCode' + '=([^;]*)(;|$)')
        if (this.code == document.cookie.match(new RegExp("(?:^|; )" + 'memberRegisterCode' + "=([^;]*)"))[1]) { // 확인
          this.codeCheck = true;
          document.cookie = 'memberRegisterCode=1; expires=-1';
          alert('확인되었습니다.');
        } else { // 틀림
          alert('인증번호를 확인해주세요.');
        }
      } else {
        alert('인증번호가 만료되었습니다.');
      }
    },
    saveMember() {
      if (!this.terms1 || !this.terms2 || !this.terms3) { alert('약관에 동의해주세요.'); return; }
      if (!this.emailCheck || !this.codeCheck) { alert('이메일 인증을 해주세요.'); return; }
      if (this.password !== this.password2) { alert('비밀번호가 맞지 않습니다.'); return; }
      if (!this.checkPw(this.password)) { alert('비밀번호는 영문+숫자+특수문자 8~20자리입니다.'); return; }
      if (this.email === '' || this.password === '' || this.password2 === '' || this.name === '' || this.phone === '' || this.company === '') {
        alert('필수값을 입력해주세요.');
        return;
      }

      let param = {
        email: this.email,
        password: this.password,
        name: this.name,
        phone: this.phone,
        company: this.company,
      }
      if (this.position !== '') {
        param.position = this.position;
      }
      if (this.company_size >= 0) {
        param.company_size = this.company_size;
      }
      if (this.inflow >= 0) {
        param.inflow = this.inflow;
      }
      http.post("/member/save", param).then((response) => {
        if (response.data.CODE == 200) {
          alert('회원가입 되었습니다.');
          this.$router.push('/login');
        } else {
          alert('시스템문제 발생. 관리자에게 문의하세요.');
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    clickSelect(event) {
      if (!event.target.classList.contains('select-box')) {
        this.company_size_open = false;
        this.inflow_open = false;
      }
    },
    checkEmail(str) {
      if (str == '') {
        return true;
      }
      var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
      if (!reg_email.test(str)) {
        return true;
      }
      else {
        return false;
      }
    },
    checkPw(pw) {
      let number = pw.search(/[0-9]/g);
      let english = pw.search(/[a-z]/ig);
      let spece = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
      let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

      if (pw.length < 8 || pw.length > 20) {
        return false;
      } else if (pw.search(/\s/) != -1) {
        return false;
      } else if (number < 0 || english < 0 || spece < 0) {
        return false;
      } else if ((number < 0 && english < 0) || (english < 0 && spece < 0) || (spece < 0 && number < 0)) {
        return false;
      } else if (/(\w)\1\1\1/.test(pw)) {
        return false;
      } else {
        return true;
      }
      if (false === reg.test(pw)) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
  }
}
</script>
