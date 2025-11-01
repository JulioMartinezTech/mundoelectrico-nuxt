<template>
  <div class="v-about-us">
    <div class="v-about-us__history-container">
      <div class="v-about-us__image-container"></div>
      <div class="v-about-us__history">
        <h1 class="v-about-us__title">{{ pageTitle }}</h1>
        <p
          class="v-about-us__history__text"
          v-for="(paragraph, index) in historyParagraphs"
          :key="index"
        >
          {{ paragraph }}
        </p>
      </div>
    </div>
    <div class="v-about-us__values">
      <div class="v-about-us__values__container">
        <div class="v-about-us__value">
          <h2 class="v-about-us__value__title">Misión</h2>
          <p
            v-for="(paragraph, index) in missionParagraphs"
            :key="index"
            class="v-about-us__value__paragraph"
          >
            {{ paragraph }}
          </p>
        </div>
        <div class="v-about-us__value">
          <h2 class="v-about-us__value__title">Visión</h2>
          <p
            v-for="(paragraph, index) in visionParagraphs"
            :key="index"
            class="v-about-us__value__paragraph"
          >
            {{ paragraph }}
          </p>
        </div>
        <div class="v-about-us__value">
          <h2 class="v-about-us__value__title">Valores</h2>
          <p
            v-for="(paragraph, index) in valuesParagraphs"
            :key="index"
            class="v-about-us__value__paragraph"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
      <!-- <div class="v-about-us__values__container">
        <div class="v-about-us__value__image-container"></div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import contentService from "~/api/services/contentService";

const pageTitle = ref([]);
const historyParagraphs = ref([]);
const missionParagraphs = ref([]);
const visionParagraphs = ref([]);
const valuesParagraphs = ref([]);

//function to get the page paragraphs
const pageContent = (data, section) => {
  data.forEach((item) => {
    item.children.forEach((node) => {
      section.value.push(node.text);
    });
  });
};

onMounted(async () => {
  try {
    const response = await contentService.fetchPageContent();
    pageTitle.value = response.titulo;

    //call functios
    pageContent(response.historia, historyParagraphs);
    pageContent(response.mision, missionParagraphs);
    pageContent(response.vision, visionParagraphs);
    pageContent(response.valores, valuesParagraphs);
  } catch (error) {
    console.error("Error fetching page content:", error);
  }
});
</script>

<style>
.v-about-us {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 20px;
}

/* History */
.v-about-us__history-container {
  width: 100%;
  display: flex;
  flex-direction: column; /* mobile-first */
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.v-about-us__image-container {
  width: 100%;
  height: 300px; /* más pequeño en mobile */
  background-color: rgb(154, 154, 154);
}

.v-about-us__history {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.v-about-us__title {
  font-weight: 800;
  color: var(--secondary-color);
  font-size: 1.5rem;
  text-align: center;
}
.v-about-us__history__text {
  text-align: justify;
}

/* Values */
.v-about-us__values {
  width: 100%;
  display: flex;
  flex-direction: column; /* mobile-first */
  gap: 20px;
  margin-top: 50px;
}

.v-about-us__values__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.v-about-us__value {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.v-about-us__value__title {
  font-weight: 800;
  color: var(--secondary-color);
  font-size: 1.2rem;
  text-align: center;
}

.v-about-us__value__paragraph {
  width: 100%;
  text-align: justify;
}

.v-about-us__value__image-container {
  width: 100%;
  height: 250px;
  background-color: rgb(154, 154, 154);
}

/* Desktop / Tablet */
@media (min-width: 768px) {
  .v-about-us__image-container {
    height: 500px;
  }
  .v-about-us__history-container {
    flex-direction: row;
  }
  .v-about-us__values__container {
    flex-direction: row;
    justify-content: space-around;
  }
  .v-about-us__value {
    width: 300px;
    gap: 60px;
  }
  .v-about-us__value:nth-child(2) {
    width: 400px;
    border-right: solid 1px var(--third-color);
    border-left: solid 1px var(--third-color);
    padding: 0 20px;
  }
  .v-about-us__value:last-child {
    border-right: none;
  }
}
</style>
