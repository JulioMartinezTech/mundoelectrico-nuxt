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
      <div class="c-slider__slide" :class="animation1">
        <img
          :src="images[0].url"
          alt="imagen carrucel"
          class="c-slider__slider-image"
        />
      </div>
      <div class="c-slider__slide" :class="animation2">
        <img
          :src="images[1].url"
          alt="imagen carrucel"
          class="c-slider__slider-image"
        />
      </div>
      <div class="c-slider__slide" :class="animation3">
        <img
          :src="images[2].url"
          alt="imagen carrucel"
          class="c-slider__slider-image"
        />
      </div>
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

const props = defineProps({
  images: Array,
});

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
  /* --- Mobile first: variables fluidas --- */
  --slide-w: min(84vw, 260px);
  --slide-h: clamp(120px, 56vw, 260px);
  --offset: 95%; /* distancia horizontal de los laterales */
  --tilt: 18deg; /* inclinación Y para sensación de giro */

  position: relative;
  width: 100%;
  height: var(--slide-h);
  display: flex;
  justify-content: center;
  align-items: center;

  /* Clave para el efecto de giro */
  perspective: 900px;
}

.c-slider {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  /* Mantén el 3D dentro del carrusel */
  transform-style: preserve-3d;
}

.c-slider__slide {
  width: var(--slide-w);
  height: var(--slide-h);
  position: absolute;
  background-color: var(--secondary-color);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(1rem, 3.5vw, 1.5rem);
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 20px 25px rgba(0, 0, 0, 0.05);
  text-align: center;

  /* Suaviza las animaciones */
  will-change: transform;
}

.c-slider__slider-image {
  width: 100%;
  height: 100%;
}

.c-slider__buttons {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.c-slider__button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ====== ANIMACIONES (adelante) ====== */
.animation-forward1 {
  animation: moveSlide1 3s ease-in-out forwards;
}
.animation-forward2 {
  animation: moveSlide2 3s ease-in-out forwards;
}
.animation-forward3 {
  animation: moveSlide3 3s ease-in-out forwards;
}

/* ====== ANIMACIONES (atrás) ====== */
.animation-backward1 {
  animation: movec-slidereverse1 3s ease-in-out forwards;
}
.animation-backward2 {
  animation: movec-slidereverse2 3s ease-in-out forwards;
}
.animation-backward3 {
  animation: movec-slidereverse3 3s ease-in-out forwards;
}

/* ---------- Adelante ---------- */
/* Izquierda -> Centro */
@keyframes moveSlide1 {
  0% {
    transform: translateY(calc(-1 * var(--offset))) rotateX(var(--tilt))
      scale(0.82);
    z-index: 2;
  }
  100% {
    transform: translateY(0) rotateX(0deg) scale(1);
    z-index: 3;
  }
}

/* Centro -> Derecha */
@keyframes moveSlide2 {
  0% {
    transform: translateY(0) rotateX(0deg) translateZ(0) scale(1);
    z-index: 3;
  }
  100% {
    transform: translateY(var(--offset)) rotateX(calc(-1 * var(--tilt)))
      translateZ(-120px) scale(0.82);
    z-index: 2;
  }
}

/* Derecha -> Izquierda (pasando “por detrás”) */
@keyframes moveSlide3 {
  0% {
    transform: translateY(var(--offset)) rotateX(calc(-1 * var(--tilt)))
      translateZ(-120px) scale(0.82);
    z-index: 2;
  }
  50% {
    transform: translateY(0) rotateX(0deg) translateZ(-240px) scale(0.55);
    z-index: 1;
  }
  100% {
    transform: translateY(calc(-1 * var(--offset))) rotateX(var(--tilt))
      translateZ(-120px) scale(0.82);
    z-index: 2;
  }
}

/* ---------- Atrás ---------- */
/* Centro -> Izquierda */
@keyframes movec-slidereverse1 {
  0% {
    transform: translateY(0) rotateX(0deg) scale(1);
    z-index: 3;
  }
  100% {
    transform: translateY(calc(-1 * var(--offset))) rotateX(var(--tilt))
      translateZ(-120px) scale(0.82);
    z-index: 2;
  }
}

/* Derecha -> Centro */
@keyframes movec-slidereverse2 {
  0% {
    transform: translateY(var(--offset)) rotateX(calc(-1 * var(--tilt)))
      translateZ(-120px) scale(0.82);
    z-index: 2;
  }
  100% {
    transform: translateY(0) rotateX(0deg) scale(1);
    z-index: 3;
  }
}

/* Izquierda -> Derecha (pasando “por detrás”) */
@keyframes movec-slidereverse3 {
  0% {
    transform: translateY(calc(-1 * var(--offset))) rotateX(var(--tilt))
      translateZ(-120px) scale(0.82);
    z-index: 2;
  }
  50% {
    transform: translateY(0) rotateX(0deg) translateZ(-240px) scale(0.55);
    z-index: 1;
  }
  100% {
    transform: translateY(var(--offset)) rotateX(calc(-1 * var(--tilt)))
      scale(0.82);
    z-index: 2;
  }
}

/* ================= Media queries ================= */

/* Tablet */
@media (min-width: 768px) {
  .c-slider-container {
    --slide-w: min(70vw, 420px);
    --slide-h: clamp(280px, 45vw, 420px);
    --offset: 105%;
    --tilt: 20deg;
    height: var(--slide-h);
    perspective: 1000px;
  }

  .c-slider__buttons {
    width: 50px;
    height: 50px;
  }
  .c-slider__button {
    width: 36px;
    height: 36px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .c-slider-container {
    --slide-w: 400px;
    --slide-h: 400px;
    --offset: 110%;
    --tilt: 22deg;
    height: var(--slide-h);
    perspective: 1100px;
  }

  .c-slider__buttons {
    width: 60px;
    height: 60px;
  }
  .c-slider__button {
    width: 38px;
    height: 38px;
  }

  @keyframes moveSlide1 {
    0% {
      transform: translateX(calc(-1 * var(--offset))) rotateY(var(--tilt))
        scale(0.82);
      z-index: 3;
    }
    100% {
      transform: translateX(0) rotateY(0deg) scale(1);
      z-index: 3;
    }
  }

  /* Centro -> Derecha */
  @keyframes moveSlide2 {
    0% {
      transform: translateX(0) rotateY(0deg) translateZ(0) scale(1);
      z-index: 3;
    }
    100% {
      transform: translateX(var(--offset)) rotateY(calc(-1 * var(--tilt)))
        translateZ(-120px) scale(0.82);
      z-index: 2;
    }
  }

  /* Derecha -> Izquierda (pasando “por detrás”) */
  @keyframes moveSlide3 {
    0% {
      transform: translateX(var(--offset)) rotateY(calc(-1 * var(--tilt)))
        translateZ(-120px) scale(0.82);
      z-index: 2;
    }
    50% {
      transform: translateX(0) rotateY(0deg) translateZ(-240px) scale(0.55);
      z-index: 1;
    }
    100% {
      transform: translateX(calc(-1 * var(--offset))) rotateY(var(--tilt))
        translateZ(-120px) scale(0.82);
      z-index: 2;
    }
  }

  /* ---------- Atrás ---------- */
  /* Centro -> Izquierda */
  @keyframes movec-slidereverse1 {
    0% {
      transform: translateX(0) rotateY(0deg) scale(1);
      z-index: 3;
    }
    100% {
      transform: translateX(calc(-1 * var(--offset))) rotateY(var(--tilt))
        translateZ(-120px) scale(0.82);
      z-index: 3;
    }
  }

  /* Derecha -> Centro */
  @keyframes movec-slidereverse2 {
    0% {
      transform: translateX(var(--offset)) rotateY(calc(-1 * var(--tilt)))
        translateZ(-120px) scale(0.82);
      z-index: 3;
    }
    100% {
      transform: translateX(0) rotateY(0deg) scale(1);
      z-index: 3;
    }
  }

  /* Izquierda -> Derecha (pasando “por detrás”) */
  @keyframes movec-slidereverse3 {
    0% {
      transform: translateX(calc(-1 * var(--offset))) rotateY(var(--tilt))
        translateZ(-120px) scale(0.82);
      z-index: 1;
    }
    50% {
      transform: translateX(0) rotateY(0deg) translateZ(-240px) scale(0.55);
      z-index: 1;
    }
    100% {
      transform: translateX(var(--offset)) rotateY(calc(-1 * var(--tilt)))
        scale(0.82);
      z-index: 2;
    }
  }
}
</style>
