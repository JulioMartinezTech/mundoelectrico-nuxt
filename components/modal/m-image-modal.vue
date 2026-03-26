<template>
  <Teleport to="body">
    <Transition name="m-image-modal-fade">
      <div v-if="show" class="m-image-modal__overlay" @click.self="closeModal">
        <div class="m-image-modal__content">
          <button
            class="m-image-modal__close"
            @click="closeModal"
            aria-label="Cerrar"
          >
            &times;
          </button>

          <img :src="imageUrl" :alt="altText" class="m-image-modal__image" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  show: { type: Boolean, required: true },
  imageUrl: { type: String, required: true },
  altText: { type: String, default: "Imagen ampliada del producto" },
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

const handleEscKey = (e) => {
  if (props.show && e.key === "Escape") {
    closeModal();
  }
};

watch(
  () => props.show,
  (isShowing) => {
    if (process.client) {
      document.body.style.overflow = isShowing ? "hidden" : "";
    }
  },
);

onMounted(() => {
  window.addEventListener("keydown", handleEscKey);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEscKey);
  if (process.client) {
    document.body.style.overflow = "";
  }
});
</script>

<style scoped>
/* BLOQUE: m-image-modal (implicit en los elementos) */

/* ELEMENTOS */
.m-image-modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: zoom-out;
}

.m-image-modal__content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
}

.m-image-modal__image {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.m-image-modal__close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 3rem;
  font-weight: bold;
  cursor: pointer;
  line-height: 1;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.m-image-modal__close:hover {
  opacity: 1;
}

/* ANIMACIONES DE VUE (El nombre de la transition dicta la clase) */
.m-image-modal-fade-enter-active,
.m-image-modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.m-image-modal-fade-enter-from,
.m-image-modal-fade-leave-to {
  opacity: 0;
}
</style>
