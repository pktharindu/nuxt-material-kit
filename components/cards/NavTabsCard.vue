<template>
  <md-card
    :class="{'no-label': noLabel, 'md-card-plain': tabsPlain}"
    class="md-card-nav-tabs">
    <md-card-content>
      <slot name="content"/>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  name: 'NavTabsCard',
  props: {
    noLabel: {
      type: Boolean,
      default: false
    },
    tabsPlain: {
      type: Boolean,
      default: false
    }
  }
}
</script>
