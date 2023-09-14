<template>
  <div class="card-row">
    <div
      v-for="(card, index) in items"
      :key="index"
      :ref="`card_${index}`"
      @mouseover="hoverCard(index)"
      @mouseout="hoverCard(-1)"
      class="card"
    >
      <img
        class="card-image"
        :class="{ selected: isSelected(index) }"
        :src="card.image"
        ref="image"
      />

      <div class="card-footer">
        <p class="card-text">{{ card.locales.title }}</p>
        <h3 class="card-title">{{ card.locales.description }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const selectedCard = ref(-1);
/**
 * @property {Object} sectionData
 */
const props = defineProps({
  items: Array,
});

const hoverCard = function (selectedIndex) {
  selectedCard.value = selectedIndex;
};
const isSelected = function (cardIndex) {
  return selectedCard.value === cardIndex;
};
</script>
<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.card-row {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 780px;
  width: 100%;
  height: 500px;
}
.card {
  position: relative;
  background-color: #ffffff;
  height: 370px;
  width: 240px;
  margin: 10px;
  overflow: hidden;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  transition: height 0.3s, box-shadow 0.3s;
}
.card:hover {
  height: 410px;
  box-shadow: 20px 20px 40px 0px rgba(0, 0, 0, 0.5);
}
.card-image {
  /* center horizontally overflown image */
  position: absolute;
  left: -9999px;
  right: -9999px;
  margin: auto;

  height: 220px;
  min-width: 100%;
}
.card-image {
  /* the other rules */
  transition: height 0.3s, opacity 0.3s;
}
.card-image.selected {
  opacity: 0.3;
  height: 410px;
  -webkit-transition: transform 0.5s ease-in-out;
  -moz-transition: transform 0.5s ease-in-out;
  -ms-transition: transform 0.5s ease-in-out;
}
.card-footer {
  position: absolute;
  bottom: 0;
  height: 150px;
  padding: 10px 15px;
}
.card-title {
  font-size: 1.17em;
  transition: color 0.3s;
}
.card-text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
  transition: color 0.3s;
}

.card-author.selected {
  color: #6a6456;
}
</style>
