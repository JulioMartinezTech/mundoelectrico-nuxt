<template>
  <div class="c-main-slider">
    <div class="c-main-slider__card scaled">
      <div class="c-main-slider__text-container">
        <div>
          <h1 class="c-main-slider__title">MUNDO ELÉCTRICO</h1>
          <div class="c-main-slider__title__decoration"></div>
        </div>
        <p class="c-main-slider__text">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use ‘
        </p>
        <div class="c-main-slider__button">Información</div>
      </div>
      <div class="c-main-slider__img-container">
        <img
          src="../assets/img/product01.png"
          alt="product01"
          class="c-main-slider__img-container__img"
        />
      </div>
    </div>
    <div class="c-main-slider__card">
      <div class="c-main-slider__text-container">
        <div>
          <h1 class="c-main-slider__title">MUNDO ELÉCTRICO</h1>
          <div class="c-main-slider__title__decoration"></div>
        </div>
        <p class="c-main-slider__text">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use ‘
        </p>
        <div class="c-main-slider__button">Información</div>
      </div>
      <div class="c-main-slider__img-container">
        <img
          src="../assets/img/product01.png"
          alt="product01"
          class="c-main-slider__img-container__img"
        />
      </div>
    </div>
    <div class="c-main-slider__card scaled">
      <div class="c-main-slider__text-container">
        <div>
          <h1 class="c-main-slider__title">MUNDO ELÉCTRICO</h1>
          <div class="c-main-slider__title__decoration"></div>
        </div>
        <p class="c-main-slider__text">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use ‘
        </p>
        <div class="c-main-slider__button">Información</div>
      </div>
      <div class="c-main-slider__img-container">
        <img
          src="../assets/img/product01.png"
          alt="product01"
          class="c-main-slider__img-container__img"
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style>
.c-main-slider {
  display: flex;
  justify-content: center;
  align-items: center;
}
.c-main-slider__card {
  width: calc(30%);
  height: 500px;
  background-color: var(--vt-c-white);
  border-radius: 33px;
  display: flex;
  align-items: center;
  gap: 40px;
  -webkit-box-shadow: -5px 9px 34px 0px rgba(184, 184, 184, 1);
  -moz-box-shadow: -5px 9px 34px 0px rgba(184, 184, 184, 1);
  box-shadow: -5px 9px 34px 0px rgba(184, 184, 184, 1);
}
.scaled {
  scale: 0.5;
  filter: brightness(0.3);
}
.c-main-slider__text-container {
  width: 70%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 30px;
}
.c-main-slider__title {
  font-family: var(--secondary-font);
  font-size: 2em;
}
.c-main-slider__title__decoration {
  width: 45%;
  height: 3px;
  background-color: var(--secondary-color);
}
.c-main-slider__text {
  text-align: justify;
  margin: 16px 0;
}
.c-main-slider__button {
  width: 70%;
  height: 40px;
  cursor: pointer;
  background-color: var(--secondary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--secondary-font);
  color: var(--vt-c-white);
  border-radius: 50px;
  padding: 5px;
}
.c-main-slider__img-container {
  width: 450px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  margin-right: -100px;
}
.c-main-slider__img-container__img {
  width: 100%;
}
</style>
