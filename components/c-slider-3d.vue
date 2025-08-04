<template>
  <div class="c-slider-container">
    <div class="c-slider__buttons">
      <button
        class="c-slider__button"
        :disabled="isButtonDisabled"
        @click="handleLeftButtom"
      >
        <img src="../assets/img/arrow-back.svg" alt="anterior" />
      </button>
    </div>
    <div class="c-slider">
      <div class="c-slider__slide" :class="animation1">Slide 1</div>
      <div class="c-slider__slide" :class="animation2">Slide 2</div>
      <div class="c-slider__slide" :class="animation3">Slide 3</div>
    </div>
    <div class="c-slider__buttons">
      <button
        class="c-slider__button"
        :disabled="isButtonDisabled"
        @click="handleRightButtom"
      >
        <img src="../assets/img/arrow-forward.svg" alt="siguiente" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const animation1 = ref("animation-forward1");
const animation2 = ref("animation-forward2");
const animation3 = ref("animation-forward3");
const mainSlidePosition = ref(1);
const isButtonDisabled = ref(false);

const handleRightButtom = () => {
  //evaluamos la posicion del c-slider__slide principal para asignarle las animacioes correspondiente a cada c-slider__slide
  if (mainSlidePosition.value === 1) {
    animation1.value = "animation-forward2";
    animation2.value = "animation-forward3";
    animation3.value = "animation-forward1";
    mainSlidePosition.value = 2;
  } else if (mainSlidePosition.value === 2) {
    animation1.value = "animation-forward3";
    animation2.value = "animation-forward1";
    animation3.value = "animation-forward2";
    mainSlidePosition.value = 3;
  } else if (mainSlidePosition.value === 3) {
    animation1.value = "animation-forward1";
    animation2.value = "animation-forward2";
    animation3.value = "animation-forward3";
    mainSlidePosition.value = 1;
  }
  // Deshabilitar el botón
  isButtonDisabled.value = true;

  // Habilitar después de 3 segundos
  setTimeout(() => {
    isButtonDisabled.value = false;
  }, 3000);
};
const handleLeftButtom = () => {
  //evaluamos la posicion del c-slider__slide principal para asignarle las animacioes correspondiente a cada c-slider__slide
  if (mainSlidePosition.value === 1) {
    animation1.value = "animation-backward1";
    animation2.value = "animation-backward2";
    animation3.value = "animation-backward3";
    mainSlidePosition.value = 3;
  } else if (mainSlidePosition.value === 2) {
    animation1.value = "animation-backward2";
    animation2.value = "animation-backward3";
    animation3.value = "animation-backward1";
    mainSlidePosition.value = 1;
  } else if (mainSlidePosition.value === 3) {
    animation1.value = "animation-backward3";
    animation2.value = "animation-backward1";
    animation3.value = "animation-backward2";
    mainSlidePosition.value = 2;
  }
  // Deshabilitar el botón
  isButtonDisabled.value = true;

  // Habilitar después de 3 segundos
  setTimeout(() => {
    isButtonDisabled.value = false;
  }, 3000);
};
</script>

<style lang="scss" scoped>
.c-slider-container {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  //   perspective: 1000px;
}

.c-slider {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  //   transform-style: preserve-3d;
  //   transition: transform 0.6s ease-in-out;
}

.c-slider__slide {
  width: 450px;
  height: 450px;
  position: absolute;
  background-color: var(--secondary-color);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border-radius: 10px;
}

.c-slider__buttons {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.c-slider__button {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  display: flex;
  justify-content: center;
  align-items: center;
}
.animation-forward1 {
  animation: moveSlide1 3s ease-in-out forwards;
}
.animation-forward2 {
  animation: moveSlide2 3s ease-in-out forwards;
}
.animation-forward3 {
  animation: moveSlide3 3s ease-in-out forwards;
}
.animation-backward1 {
  animation: movec-slidereverse1 3s ease-in-out forwards;
}
.animation-backward2 {
  animation: movec-slidereverse2 3s ease-in-out forwards;
}
.animation-backward3 {
  animation: movec-slidereverse3 3s ease-in-out forwards;
}

// animaciones hacia adelante

@keyframes moveSlide1 {
  0% {
    transform: translateX(-400px) scale(0.5);
    z-index: 1;
  }
  100% {
    transform: translateX(0) scale(1);
    z-index: 3;
  }
}
@keyframes moveSlide2 {
  0% {
    transform: translateX(0) scale(1);
    z-index: 3;
  }
  100% {
    transform: translateX(400px) scale(0.5);
    z-index: 2;
  }
}
@keyframes moveSlide3 {
  0% {
    transform: translateX(400px) scale(0.5);
    z-index: 2;
  }
  50% {
    transform: scale(0.2);
    z-index: 1;
  }
  100% {
    transform: translateX(-400px) scale(0.5);
    z-index: 1;
  }
}

//animaciones hacia atras

@keyframes movec-slidereverse1 {
  0% {
    transform: translateX(0) scale(1);
    z-index: 3;
  }
  100% {
    transform: translateX(-400px) scale(0.5);
    z-index: 1;
  }
}
@keyframes movec-slidereverse2 {
  0% {
    transform: translateX(400px) scale(0.5);
    z-index: 2;
  }
  100% {
    transform: translateX(0) scale(1);
    z-index: 3;
  }
}
@keyframes movec-slidereverse3 {
  0% {
    transform: translateX(-400px) scale(0.5);
    z-index: 1;
  }
  50% {
    transform: scale(0.2);
    z-index: 1;
  }
  100% {
    transform: translateX(400px) scale(0.5);
    z-index: 2;
  }
}

// button {
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   background-color: rgba(0, 0, 0, 0.5);
//   color: white;
//   border: none;
//   padding: 10px;
//   cursor: pointer;
//   border-radius: 5px;
//   font-size: 1.2rem;
//   z-index: 10;
// }

// button.prev {
//   left: 10px;
// }

// button.next {
//   right: 10px;
// }
</style>
