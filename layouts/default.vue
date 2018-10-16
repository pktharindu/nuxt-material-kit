<template>
  <div :class="{'nav-open': this.$store.state.navbar}">
    <MainNavbar/>
    <nuxt/>
    <MainFooter/>
  </div>
</template>

<script>
import { MainNavbar, MainFooter } from '@/components'

export default {
  components: {
    MainNavbar,
    MainFooter
  }
}
</script>
