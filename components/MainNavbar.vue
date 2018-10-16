<template>
  <md-toolbar
    id="toolbar"
    :class="extraNavClasses"
    :color-on-scroll="colorOnScroll"
    md-elevation="0"
    class="md-transparent md-absolute">
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">Nuxt Material Kit</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          :class="{toggled: toggledClass}"
          class="md-just-icon md-simple md-toolbar-toggle"
          @click="toggleNavbarMobile()">
          <span class="icon-bar"/>
          <span class="icon-bar"/>
          <span class="icon-bar"/>
        </md-button>

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section-start="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>
            <md-list>
              <li
                v-if="!showDownload"
                class="md-list-item">
                <a
                  href="javascript:void(0)"
                  class="md-list-item-router md-list-item-container md-button-clean dropdown">
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-button md-button-link md-white md-simple dropdown-toggle"
                        data-toggle="dropdown">
                        <i class="material-icons">apps</i>
                        <p>Components</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <li>
                          <a href="/components">
                            <i class="material-icons">layers</i>
                            <p>All Components</p>
                          </a>
                        </li>
                        <li>
                          <a href="https://demos.creative-tim.com/vue-material-kit/documentation/" >
                            <i class="material-icons">content_paste</i>
                            <p>Documentation</p>
                          </a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>

              <md-list-item
                v-if="showDownload"
                href="https://demos.creative-tim.com/vue-material-kit/documentation/"  
                target="_blank">
                <i class="material-icons">content_paste</i>
                <p>Documentation</p>
              </md-list-item>

              <md-list-item
                v-if="showDownload"
                href="javascript:void(0)"
                @click="scrollToElement()">
                <i class="material-icons">cloud_download</i>
                <p>Download</p>
              </md-list-item>

              <li
                v-else
                class="md-list-item">
                <a
                  href="javascript:void(0)"
                  class="md-list-item-router md-list-item-container md-button-clean dropdown">
                  <div class="md-list-item-content">
                    <drop-down direction="down">
                      <md-button
                        slot="title"
                        class="md-button md-button-link md-white md-simple dropdown-toggle"
                        data-toggle="dropdown">
                        <i class="material-icons">view_carousel</i>
                        <p>Examples</p>
                      </md-button>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <li>
                          <a href="/">
                            <i class="material-icons">view_day</i>
                            <p>Landing Page</p>
                          </a>
                        </li>
                        <li>
                          <a href="/login">
                            <i class="material-icons">fingerprint</i>
                            <p>Login Page</p>
                          </a>
                        </li>
                        <li>
                          <a href="/profile">
                            <i class="material-icons">account_circle</i>
                            <p>Profile Page</p>
                          </a>
                        </li>
                      </ul>
                    </drop-down>
                  </div>
                </a>
              </li>

              <md-list-item
                href="https://twitter.com/CreativeTim"
                target="_blank">
                <i class="fab fa-twitter"/>
                <p class="hidden-lg">Twitter</p>
                <md-tooltip md-direction="bottom">Follow us on Twitter</md-tooltip>
              </md-list-item>
              <md-list-item
                href="https://www.facebook.com/CreativeTim"
                target="_blank">
                <i class="fab fa-facebook-square"/>
                <p class="hidden-lg">Facebook</p>
                <md-tooltip md-direction="bottom">Like us on Facebook</md-tooltip>
              </md-list-item>
              <md-list-item
                href="https://www.instagram.com/CreativeTimOfficial"
                target="_blank">
                <i class="fab fa-instagram"/>
                <p class="hidden-lg">Instagram</p>
                <md-tooltip md-direction="bottom">Follow us on Instagram</md-tooltip>
              </md-list-item>
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
let resizeTimeout
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null
      actualResizeHandler()

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66)
  }
}

import MobileMenu from '@/components/MobileMenu'

export default {
  name: 'MainNavbar',
  components: {
    MobileMenu
  },
  props: {
    type: {
      type: String,
      default: 'white',
      validator(value) {
        return [
          'white',
          'default',
          'primary',
          'danger',
          'success',
          'warning',
          'info'
        ].includes(value)
      }
    },
    colorOnScroll: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      extraNavClasses: '',
      toggledClass: false
    }
  },
  computed: {
    showDownload() {
      const excludedRoutes = ['index', 'login', 'profile']
      return excludedRoutes.every(r => r !== this.$route.name)
    }
  },
  mounted() {
    document.addEventListener('scroll', this.scrollListener)
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.scrollListener)
  },
  methods: {
    bodyClick() {
      let bodyClick = document.getElementById('bodyClick')

      if (bodyClick === null) {
        let body = document.querySelector('body')
        let elem = document.createElement('div')
        elem.setAttribute('id', 'bodyClick')
        body.appendChild(elem)

        let bodyClick = document.getElementById('bodyClick')
        bodyClick.addEventListener('click', this.toggleNavbarMobile)
      } else {
        bodyClick.remove()
      }
    },
    toggleNavbarMobile() {
      this.$store.commit('toggleNavbar')
      this.toggledClass = !this.toggledClass
      this.bodyClick()
    },
    handleScroll() {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop
      let navbarColor = document.getElementById('toolbar')
      this.currentScrollValue = scrollValue
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`
        navbarColor.classList.remove('md-transparent')
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = ''
          navbarColor.classList.add('md-transparent')
        }
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll)
    },
    scrollToElement() {
      let element_id = document.getElementById('downloadSection')
      if (element_id) {
        element_id.scrollIntoView({ block: 'end', behavior: 'smooth' })
      }
    }
  }
}
</script>
