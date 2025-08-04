<template>
  <div class="m-auth-response-modal" v-if="visible">
    <div class="m-auth-response-modal__backdrop" @click="close" />
    <div class="m-auth-response__form-container">
      <div class="m-auth-response__form-card">
        <button class="m-auth-response__close" @click="close">✕</button>
        <div class="m-auth-response__form__img-container">
          <img
            v-if="isError"
            src="../../assets/img/error-icon.svg"
            alt="done-icon"
            class="m-auth-response__form__logo"
          />
          <img
            v-else
            src="../../assets/img/done-icon.svg"
            alt="done-icon"
            class="m-auth-response__form__logo"
          />
        </div>
        <h1 class="m-auth-response__form__title">{{ props.text }}</h1>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  visible: Boolean,
  text: String,
  isError: Boolean,
});
const emit = defineEmits(["close"]);

const close = () => emit("close");
</script>
<style lang="scss" scoped>
.m-auth-response-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 990;
}
.m-auth-response-modal__backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.m-auth-response__close {
  position: absolute;
  top: 10px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  z-index: 998;
}
.m-auth-response {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.m-auth-response__form-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.m-auth-response__form-card {
  width: 450px;
  height: 500px;
  background-color: var(--vt-c-white);
  border-radius: 16px;
  -webkit-box-shadow: -6px 6px 29px 2px rgba(138, 138, 138, 1);
  -moz-box-shadow: -6px 6px 29px 2px rgba(138, 138, 138, 1);
  box-shadow: -6px 6px 29px 2px rgba(138, 138, 138, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  z-index: 999;
}
.m-auth-response__form__img-container {
  width: 150px;
  height: 150px;
}
.m-auth-response__form__logo {
  width: 100%;
  height: 100%;
}
.m-auth-response__form__title {
  color: var(--secondary-color);
  font-family: "ItcDemi";
  font-size: 1.7rem;
  font-weight: 800;
  text-align: center;
}
</style>
