<template>
  <div class="c-cart-item">
    <div class="c-cart-item__image-container">
      <img :src="props.image" alt="producto" class="c-cart-item__image" />
    </div>
    <div class="c-cart-item__description-container">
      <div class="c-cart-item__text-container">
        <p class="c-cart-item__item-nombre">{{ props.name }}</p>
        <p class="c-cart-item__item-code">{{ props.id }}</p>
      </div>
      <div class="c-cart-item__item-counter">
        <button @click="removeItem">
          <img
            v-if="props.quantity === 1"
            src="../assets/img/delete-icon.svg"
            alt="eliminar"
          />
          <img
            v-if="props.quantity >= 2"
            src="../assets/img/remove-icon.svg"
            alt="remover"
          />
        </button>
        {{ props.quantity }}
        <button @click="addItem">
          <img src="../assets/img/add-icon.svg" alt="agregar" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "~/stores/useCartStore";
import { toRefs } from "vue";

interface Props {
  id: string;
  quantity: number;
  name: string;
  image?: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: "",
  quantity: 0,
  name: "",
  image: "",
});

const { id, quantity, name, image } = toRefs(props);

const cart = useCartStore();

const addItem = () => {
  cart.addProduct({ id: id.value, name: name.value, imgUrl: image.value });
};

const removeItem = () => {
  cart.removeProduct(id.value);
};
</script>

<style scoped>
.c-cart-item {
  width: 100%;
  min-height: 200px;
  background-color: var(--vt-c-white);
  border-radius: 12px 12px 0 12px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.c-cart-item__image-container {
  width: 18%;
  padding: 20px;
}
.c-cart-item__image {
  width: 90%;
}
.c-cart-item__description-container {
  width: 75%;
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.c-cart-item__text-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 8px;
}
.c-cart-item__item-name {
  font-family: var(--secondary-font);
}
.c-cart-item__item-counter {
  min-width: 100px;
  height: 40px;
  font-family: var(--secondary-font);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border: solid 2px var(--secondary-color);
  border-radius: 50px;
}
</style>
