<template>
  <md-list
    v-if="navMobileSectionStart === 'true'"
    class="nav-mobile-menu nav-mobile-section-start">
    <slot/>
  </md-list>
</template>

<script>
export default {
  name: 'MobileMenu',
  props: {
    navMobileSectionStart: {
      type: String,
      default: 'false'
    }
  }
}
</script>
