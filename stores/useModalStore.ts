// stores/modal.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  const activeModal = ref(""); // 'login', 'registro', etc.

  const openModal = (name: string) => {
    activeModal.value = name;
  };

  const closeModal = () => {
    activeModal.value = "";
  };

  return {
    activeModal,
    openModal,
    closeModal,
  };
});
