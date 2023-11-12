<template>
    <div class="bg-white main-side-nav">
      <div>
        <q-drawer v-model="drawer" show-if-above :mini="!drawer || miniState" :width="drawerWidth" :mini-width="miniWidth"
          :breakpoint="drawerBreakpoint" bordered persistent content-class="bg-grey-3"
          :class="(miniState) ? 'ministatebg' : ''">
          <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
            <div class="flex full-width ">
              <div :class="(miniState) ? 'verticalbgsm' : 'verticalbg'">
                <span />
              </div>
              <div :class="(miniState) ? '' : ''" >
                <q-list padding class="menu-list qlistmenu">
                  <q-item v-ripple clickable class="q-mt-md q-mb-lg">
                    <q-item-section avatar>
                      <img v-if="miniState" src="../assets/rlogow.svg" alt="logo" class="q-pr-md">
                      <img v-if="!miniState" src="../assets/rlogo.svg" alt="logo">
                    </q-item-section>

                    <q-item-section>
                      <span class="drawerlogotext">
                        Forsit
                      </span>
                    </q-item-section>
                  </q-item>

                  <div v-for="navItem in navItems" :key="navItem.id">
                    <q-item clickable class=" q-mt-lg"
                      :class="(miniState) ? '' : 'draweractiveitem' && (navItem.active) ? 'draweractiveitem' : ''"
                      @click="makingActive(navItem)">
                      <div :class="(miniState) ? '' : 'draweractivecurve' && (navItem.active) ? 'draweractivecurve' : ''">
                        <div
                          :class="(miniState) ? '' : 'draweruperactivecurve' && (navItem.active) ? 'draweruperactivecurve' : ''" />
                        <div
                          :class="(miniState) ? '' : 'drawerloweractivecurve' && (navItem.active) ? 'drawerloweractivecurve' : ''" />
                      </div>
                      <q-item-section avatar>
                        <img v-if="!miniState && !navItem.active" :src="navItem.inActiveIcon" alt="dashboard">
                        <img v-if="!miniState && navItem.active" :src="navItem.activeIcon" alt="dashboard">

                        <img v-if="miniState" :src="navItem.activeIcon" alt="dashboard" class="q-pr-md">
                      </q-item-section>

                      <q-item-section>
                        <span :class="(navItem.active) ? 'drawerItemactive' : 'drawerItem'">
                          {{ navItem.name }}
                        </span>
                      </q-item-section>
                    </q-item>
                  </div>

                  <q-item v-ripple clickable class=" flex column">
                    <q-item-section avatar>
                      <img v-if="miniState" src="../assets/marker01small.svg" alt="logo">
                      <img v-if="!miniState" src="../assets/marker01.svg" alt="logo">
                    </q-item-section>

                    <q-item-section>
                      <div class="side-nav-marker-name q-pt-sm" >
                      <div class="q-pl-lg" >
                        <span class="markerprofilename">
                          Forsit
                        </span>
                      </div>
                      <div>
                        <span class="markerprofileemail">
                          test@gmail.com
                        </span>
                      </div>
                      </div>
                    </q-item-section>
                  </q-item>

                  <div class="flex markerprofiledrawer" :class="(miniState) ? 'column q-pl-lg' : 'row q-pl-xl'">
                    <q-item v-ripple clickable class="flex column">
                      <q-item-section avatar>
                        <img v-if="miniState" src="../assets/settingsw.svg" alt="logo">
                        <img v-if="!miniState" src="../assets/settings.svg" alt="logo">
                      </q-item-section>

                      <q-item-section />
                    </q-item>
                    <q-item v-ripple clickable class=" q-mb-lg flex column">
                      <q-item-section avatar>
                        <img v-if="miniState" src="../assets/markerlogoutw.svg" alt="logo">
                        <img v-if="!miniState" src="../assets/markerlogout.svg" alt="logo">
                      </q-item-section>
                      <q-item-section />
                    </q-item>
                  </div>
                </q-list>
              </div>
            </div>
          </q-scroll-area>

          <div class="absolute drawertoggleicon q-pt-md" style="">
            <div v-if="!miniState" @click="miniState = true">
              <img src="../assets/drawer_icon.svg" alt="drawer">
            </div>
            <div v-if="miniState" @click="miniState = false">
              <img src="../assets/drawer_icon_close.svg" alt="drawer">
            </div>
          </div>
        </q-drawer>
      </div>
    </div>
  </template>

<script>
import { reactive, toRefs, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  components: {
  },
  setup (props) {
    const router = useRouter()
    const store = useStore()

    const data = reactive({
      profile: null,
      profileId: computed(() => store.getters['user/getProfileById']),
      drawer: true,
      userProfileLink: null,
      miniState: false,
      miniWidth: 80,
      drawerWidth: 230,
      drawerBreakpoint: 500
    })

    const navItems = computed(() => {
      return store.getters['app/getSideNavItems']
    })

    const drawerClick = (e) => {
      data.miniState = !data.miniState
      e.stopPropagation()
    }

    const makingActive = (navItem) => {
      store.dispatch('app/setSideNavItemsActive', navItem)
      router.replace(navItem.link)
    }

    onMounted(() => {
    })

    return {
      drawerClick,
      ...toRefs(data),
      navItems,
      makingActive
    }
  }
}
</script>

  <style>
  .drawertoggleicon {
    cursor: pointer;
    top: 15px;
    right: -13px
  }

  .ministatebg {
    background: linear-gradient(128.55deg, #FF5106 16.54%, #A40894 143.61%);
  }

  .verticalbg {
    width: 16px;
    background: #FF5106;
  }

  .q-item .q-focus-helper {
    visibility: hidden;
  }

  .q-focusable .q-hoverable {
    visibility: hidden;

  }

  .markerprofiledrawer .q-item {
    padding: 2px 0px;
  }

  .qlistmenu {
    height: 100vh;
  }

  .side-nav-marker-name{
    padding-left: 16px;
  }

  .main-side-nav .q-item__section--avatar{
    min-width: 36px !important;
  }

  </style>
