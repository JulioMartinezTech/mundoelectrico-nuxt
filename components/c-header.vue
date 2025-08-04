<template>
  <header :class="currentClass">
    <div class="c-header__logo-container">
      <img src="../assets/img/logo.png" alt="logo" class="c-header__logo" />
    </div>
    <div class="c-header__nav-container">
      <CMenu />
      <CSearchBar />
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import CMenu from "../components/c-menu.vue";
import CSearchBar from "../components/c-search-bar.vue";

// variables de referencia

const isScrolled = ref(false);
const currentClass = ref("");
const route = useRoute();

const updateClass = (path) => {
  currentClass.value = {
    "c-header__home": path == "/",
    "c-header__default": path != "/",
    "c-header__scrolled": path == "/" && isScrolled,
  };
};

watch(route, (newRoute) => {
  updateClass(newRoute.path);
});

onMounted(() => {
  updateClass(route.path);
  window.addEventListener("scroll", () => {
    isScrolled.value = window.scrollY > 100;
  });
});
</script>

<style lang="scss" scoped>
.c-header__default {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 500ms;
  padding: 0 50px;
  margin-bottom: 30px;
}
.c-header__home {
  width: 100%;
  height: 150px;
  position: fixed;
  z-index: 989;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 500ms;
  padding: 0 50px;
  margin-bottom: 30px;
}
.c-header__scrolled {
  background: var(--vt-c-white);
  -webkit-box-shadow: -6px 6px 29px 2px rgba(138, 138, 138, 1);
  -moz-box-shadow: -6px 6px 29px 2px rgba(138, 138, 138, 1);
  box-shadow: -6px 6px 29px 2px rgba(138, 138, 138, 1);
  transition: 500ms;
}
.logo-container {
  width: 40%;
}
.c-header__logo {
  height: 150px;
}
.c-header__nav-container {
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
</style>
