<template>
  <footer class="c-footer">
    <p class="c-footer__text">
      Todos los derechos reservados para MUNDO ELÉCTRICO @2025
    </p>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.c-footer {
  width: calc(100%);
  height: 100px;
  background-color: var(--vt-c-indigo);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 10px 0;
  color: var(--vt-c-white);
}
.c-footer__text {
  text-align: center;
  font-size: 0.8rem;
}

@media (min-width: 700px) {
  .c-footer__text {
    font-size: 1rem;
  }
}
</style>
