<script setup>
import Gnb from './components/common/Gnb.vue'
import Footer from './components/common/Footer.vue'


</script>

<template>
  <div id="container">
    <Gnb ref="gnb" />
    <router-view />
    <Footer ref="footer" />
  </div>
</template>
