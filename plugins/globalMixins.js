import Vue from 'vue'
/**
 * You can register global mixins here
 */

Vue.mixin({
  mounted() {
    let { bodyClass } = this.$options
    if (bodyClass) {
      document.body.classList.add(bodyClass)
    }
  },
  beforeDestroy() {
    let { bodyClass } = this.$options
    if (bodyClass) {
      document.body.classList.remove(bodyClass)
    }
  }
})
