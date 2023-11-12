<template>
  <q-layout view="lHh Lpr lFf">

    <main-side-nav />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MainSideNav from 'src/components/MainSideNav.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    MainSideNav
  },

  setup () {
    const leftDrawerOpen = ref(false)

    const greetingMessage = () => {
      const time = new Date().getHours()
      let greeting
      if (time < 11) {
        greeting = 'Good Morning'
      } else if (time < 16) {
        greeting = 'Good Afternoon'
      } else if (time < 19) {
        greeting = 'Good Evening'
      } else {
        greeting = 'Good Night'
      }
      return greeting
    }

    return {
      greetingMessage,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style scoped>
.q-layout__section--marginal{
  background-color: #fff;
  color: black;
}
.q-layout__shadow{
  box-shadow: none !important;
}
</style>
