<script>
import Gnb from './components/common/Gnb.vue'
import Footer from './components/common/Footer.vue'

export default {
  components: {
    Gnb,
    Footer
  },
  methods: {
    check(event) {
      this.$refs.gnb.clickSelect(event);
    },
  },
}
</script>

<template>
  <div id="container" @click="check($event)">
    <Gnb ref="gnb" />
    <router-view :key="$route.fullPath"/>
    <Footer ref="footer" />
  </div>
</template>
