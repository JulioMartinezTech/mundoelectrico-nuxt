<template>
  <div class="c-product-card-skeleton">
    <div class="c-product-card-skeleton__frame"></div>
    <div class="c-product-card-skeleton__image"></div>
    <div class="c-product-card-skeleton__text"></div>
  </div>
</template>

<script setup>
// No necesita script
</script>

<style scoped>
.c-product-card-skeleton {
  width: 250px;
  height: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background-color: var(--vt-c-white);
  border-radius: 15px;
  box-shadow: -4px 4px 19px 2px rgba(138, 138, 138, 1);
  padding: 10px;
  overflow: hidden;
}

/* Frame simulado */
.c-product-card-skeleton__frame {
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border: solid 2px var(--gray);
  border-radius: 15px;
}

/* Imagen simulada */
.c-product-card-skeleton__image {
  width: 70%;
  height: 120px;
  border-radius: 4px;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  margin-bottom: 20px;
}

/* Texto simulando el nombre */
.c-product-card-skeleton__text {
  width: 80%;
  height: 40px;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px 0 0 8px;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
