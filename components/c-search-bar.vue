<template>
  <div class="c-search-bar">
    <input type="text" class="c-search-bar__input" />
    <div class="c-search-bar__icon-container">
      <img src="../assets/img/search-icon.svg" alt="icono de busqueda" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.c-search-bar {
  width: 400px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: var(--vt-c-white);
  border: solid 2px var(--secondary-color);
  border-radius: 50px;
  overflow: hidden;
  padding-left: 2px;
}
.c-search-bar__input {
  width: 80%;
  height: calc(90%);
  background-color: transparent;
  border: none;
}
.c-search-bar__input:focus {
  outline: none;
  border: none;
  box-shadow: none;
}
.c-search-bar__icon-container {
  width: 10%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-color);
}
</style>
