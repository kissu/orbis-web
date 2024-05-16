<template>
  <div class="categories-page">
    <div class="background-image"></div>

    <div class="category-container hide-scrollbar">
      <div v-for="category in categories" :key="category.id" class="category-item" @click="categoryClicked(category)">
        <img :src="category.image" alt="Category Image" class="category-image">
        <div class="category-title-container">
          <label :style="{ color: category.textColor }">{{ category.name }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sosImage from '@/images/sos.png'
import goneImage from '@/images/gone.png'
import activitiesImage from '@/images/activities.png'
import cleanImage from '@/images/ecology.png'
import charitiesImage from '@/images/donations.png'

export default {
  data() {
    return {
      categories: [
        { id: 1, name: "SOS", image: sosImage, textColor: "darkorange" },
        { id: 2, name: "Gone", image: goneImage, textColor: "darkorange" },
        { id: 3, name: "Activities", image: activitiesImage, textColor: "darkorange" },
        { id: 4, name: "Clean", image: cleanImage, textColor: "darkorange" },
        { id: 6, name: "Charities", image: charitiesImage, textColor: "darkorange" },
      ],
    };
  },
  methods: {
    categoryClicked(category) {
      this.$router.push({ path: `/${category.name.toLowerCase()}` });
    },
  },
};
</script>

<style scoped>

.categories-page {
  position: relative;
}

.category-title-container {
  display: flex;
  justify-content: center;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/src/images/categoriesback.jpg') no-repeat center center fixed;
  background-size: cover;
  z-index: -1;
}

.category-container {
  overflow-x: scroll;
  white-space: nowrap;
  padding: 50px 0px;
  text-align: center;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.category-item {
  display: inline-block;
  margin: 0 10px;
  width: 350px;
  cursor: pointer;
  margin: 50px;
}

.category-image {
  height: 470px;
  flex-shrink: 0;
}

</style>
