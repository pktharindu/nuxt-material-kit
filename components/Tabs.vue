<template>
  <md-card
    :class="[
      {'flex-column': flexColumn},
      {'nav-pills-icons': navPillsIcons},
      {'md-card-plain': plain}
    ]"
    class="md-card-tabs">
    <md-card-header slot="header-title"/>

    <md-card-content>
      <md-list class="nav-tabs">
        <md-list-item
          v-for="(item, index) in tabName"
          :key="item"
          :class="[
            {active: isActivePanel(tabName[index])},
            {[getColorButton(colorButton)]: isActivePanel(tabName[index])}]"
          @click="switchPanel(tabName[index])">
          {{ tabName[index] }}
          <md-icon v-if="navPillsIcons">{{ tabIcon[index] }}</md-icon>
        </md-list-item>
      </md-list>

      <transition
        name="fade"
        mode="out-in">
        <div class="tab-content">
          <div
            v-for="(item, index) in tabName"
            v-if="isActivePanel(tabName[index])"
            :key="item"
            :class="getTabContent(index + 1)">
            <slot :name="getTabContent(index + 1)">
              This is the default text!
            </slot>
          </div>
        </div>
      </transition>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  props: {
    flexColumn: {
      type: Boolean,
      default: false
    },
    navPillsIcons: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    tabName: {
      type: Array,
      default: null
    },
    tabIcon: {
      type: Array,
      default: null
    },
    colorButton: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activePanel: this.tabName[0]
    }
  },
  methods: {
    switchPanel(panel) {
      this.activePanel = panel
    },
    isActivePanel(panel) {
      return this.activePanel == panel
    },
    getColorButton: function(colorButton) {
      return 'md-' + colorButton + ''
    },
    getTabContent: function(index) {
      return 'tab-pane-' + index + ''
    }
  }
}
</script>
