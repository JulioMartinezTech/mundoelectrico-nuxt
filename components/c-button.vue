<template>
  <button
    class="c-button"
    @click="handleClick"
    @mousedown="isClicked = true"
    @animationend="isClicked = false"
    :class="{ 'c-button--clicked': isClicked }"
  >
    {{ props.text }}
  </button>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  text: String,
});

const emit = defineEmits(["actionButton"]);

const isClicked = ref(false);

const handleClick = () => {
  emit("actionButton");
};
</script>

<style lang="scss" scoped>
.c-button {
  width: 100%;
  height: 50px;
  cursor: pointer;
  background-color: var(--secondary-color);
  color: var(--vt-c-white);
  font-weight: bold;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.1s ease;
}

.c-button--clicked {
  animation: click-scale 0.2s ease;
}

@keyframes click-scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.94);
  }
  100% {
    transform: scale(1);
  }
}
</style>
