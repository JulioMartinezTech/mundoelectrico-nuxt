<template>
  <main class="c-technical-details">
    <dl class="c-technical-details__list">
      <div class="c-technical-details__block" v-for="(d, i) in items" :key="i">
        <dt class="c-technical-details__name">{{ d.name }}</dt>
        <dd class="c-technical-details__value">{{ d.value }}</dd>
      </div>
    </dl>
  </main>
</template>

<script setup lang="ts">
interface SpecItem {
  name: string;
  value: string;
}

const props = withDefaults(defineProps<{ items: SpecItem[] }>(), {
  items: () => [],
});
</script>

<style lang="scss" scoped>
.c-technical-details {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.c-technical-details__list {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
}

.c-technical-details__block {
  width: 90%;
  display: flex;
  justify-content: space-between;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  padding: 0.75rem 1rem;
  border-radius: 8px;
}

.c-technical-details__name {
  font-weight: bold;
  color: #333;
}

.c-technical-details__value {
  color: #666;
}
</style>
