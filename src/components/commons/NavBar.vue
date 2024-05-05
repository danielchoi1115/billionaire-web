<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { computed, reactive } from 'vue'
import { ThreeBarsSvg, CloseSvg, NoticeBellSvg } from '@/svg'
import { StockUtil } from '@/utils/index.js'
import LogoSvg from '@/svg/LogoSvg.vue'

const router = useRouter()
const route = useRoute()
const currentRoute = computed(() => route.path)
const show = reactive({
  mobileMenu: false,
  profileDropdown: false
})
</script>

<template>
  <nav class="bg-gray-800">
    <div class="mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button
            type="button"
            @click="show.mobileMenu = !show.mobileMenu"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <ThreeBarsSvg v-if="!show.mobileMenu" />
            <CloseSvg v-if="show.mobileMenu" />
          </button>
        </div>
        <div class="nav-wrapper flex flex-1">
          <div class="flex flex-shrink-0 items-center">
            <RouterLink to="/">
              <LogoSvg class="" />
            </RouterLink>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-2">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <RouterLink
                v-for="(r, idx) in router.options.routes"
                :key="idx"
                :to="r.path"
                :class="
                  r.path === currentRoute
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                "
                class="rounded-md py-2 text-sm font-medium px-3"
              >
                {{ r.displayName }}
              </RouterLink>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <button
            type="button"
            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="absolute -inset-1.5"></span>
            <span class="sr-only">View notifications</span>
            <NoticeBellSvg />
          </button>

          <!-- Profile dropdown -->
          <div class="ml-3">
            <div>
              <button
                type="button"
                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  :src="StockUtil.makeUrl('avatar-person.svg')"
                  alt=""
                />
              </button>
            </div>

            <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
            <div
              v-if="show.profileDropdown"
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <!-- Active: "bg-gray-100", Not Active: "" -->

              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-0"
                >Your Profile</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-1"
                >Settings</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-2"
                >Sign out</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div v-if="show.mobileMenu" class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <RouterLink
          @click="show.mobileMenu = false"
          v-for="(r, idx) in router.options.routes"
          :key="idx"
          :to="r.path"
          :class="
            r.path === currentRoute
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          "
          class="block rounded-md py-2 px-3 text-base font-medium"
          aria-current="page"
        >
          {{ r.displayName }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-wrapper {
  justify-content: center;
  align-items: center;
}

@media (min-width: 640px) {
  .nav-wrapper {
    justify-content: flex-start;
    align-items: stretch;
  }
}
</style>
