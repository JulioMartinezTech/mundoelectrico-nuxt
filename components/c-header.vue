<template>
  <header :class="currentClass">
    <div class="c-header__logo-nav__container" >
      <img
        src="../assets/img/Mundo-electrico-logo.svg"
        alt="logo"
        class="c-header__logo"
        @click="goToHome"
      />
      <CMenu class="c-header__nav-container" />
    </div>
    <!-- <div class="c-header__nav-container__desktop">
      <CMenu />
      <CSearchBar />
    </div> -->
    <div class="c-header__search-container">
      <CSearchBar />
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import CMenu from "../components/c-menu.vue";
import CSearchBar from "../components/c-search-bar.vue";

// variables de referencia

const isScrolled = ref(false);
const currentClass = ref("");
const route = useRoute();
const router = useRouter();

const goToHome = () => {
  router.push("/");
};

const updateClass = (path) => {
  currentClass.value = {
    // "c-header__home": path == "/",
    "c-header__default": path == "/" || path != "/",
    // "c-header__scrolled": path == "/" && isScrolled,
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  transition: 500ms;
  padding: 0 20px;
  margin-bottom: 30px;
}
.c-header__home {
  width: 100%;
  height: 150px;
  position: fixed;
  z-index: 989;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  transition: 500ms;
  padding: 0 20px;
  margin-bottom: 30px;
}
.c-header__scrolled {
  background: var(--vt-c-white);
  -webkit-box-shadow: -6px 6px 29px 2px rgba(138, 138, 138, 1);
  -moz-box-shadow: -6px 6px 29px 2px rgba(138, 138, 138, 1);
  box-shadow: -6px 6px 29px 2px rgba(138, 138, 138, 1);
  transition: 500ms;
}
.c-header__logo-nav__container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.c-header__logo {
  width: 40%;
  cursor: pointer;
}
// .c-header__nav-container__mobile {
//   display: none;
// }
.c-header__nav-container__desktop {
  display: none;
}
.c-header__search-container {
  // display: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* ---------- Desktop ---------- */

@media (min-width: 768px) {
  .c-header__default,
  .c-header__home {
    justify-content: flex-start;
    gap: 5px;
  }
  .c-header__logo-nav__container {
    padding-top: 30px;
  }
  .c-header__logo {
    width: 15%;
  }
  .c-header__search-container {
    width: 30%;
    align-self: flex-end;
  }
}
// .c-header__default {
//   width: 100%;
//   height: 150px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   transition: 500ms;
//   padding: 0 50px;
//   margin-bottom: 30px;
// }
// .c-header__home {
//   width: 100%;
//   height: 150px;
//   position: fixed;
//   z-index: 989;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   transition: 500ms;
//   padding: 0 50px;
//   margin-bottom: 30px;
// }
// .c-header__scrolled {
//   background: var(--vt-c-white);
//   -webkit-box-shadow: -6px 6px 29px 2px rgba(138, 138, 138, 1);
//   -moz-box-shadow: -6px 6px 29px 2px rgba(138, 138, 138, 1);
//   box-shadow: -6px 6px 29px 2px rgba(138, 138, 138, 1);
//   transition: 500ms;
// }
// .logo-container {
//   width: 40%;
// }
// .c-header__logo {
//   height: 80px;
// }
// .c-header__nav-container {
//   width: 40%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-end;
// }

// @media (max-width: 500px) {
//   .c-header__desktop {
//     display: none;
//   }
// }
</style>
