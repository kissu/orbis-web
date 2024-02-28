<template>
  <div class="categories-page">
    <div class="background-image"></div>

    <div class="category-container">
      <div v-for="category in categories" :key="category.id" class="category-item" @click="categoryClicked(category)">
        <img :src="category.image" alt="Category Image" class="category-image">
        <label :style="{ color: category.textColor }">{{ category.name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { id: 1, name: "SOS", image: "sos.png", textColor: "darkorange" },
        { id: 2, name: "Gone", image: "gone.png", textColor: "darkorange" },
        { id: 3, name: "Activities", image: "activities.png", textColor: "darkorange" },
        { id: 4, name: "Clean", image: "ecology.png", textColor: "darkorange" },
        { id: 5, name: "News", image: "news.png", textColor: "darkorange" },
        { id: 6, name: "Donate", image: "donations.png", textColor: "darkorange" },
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

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/categoriesback.jpg') no-repeat center center fixed;
  background-size: cover;
  z-index: -1; 
}

.category-container {
  overflow-x: hidden; 
  white-space: nowrap;
  padding-top: 60px;
  text-align: center;
}

.category-item {
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;
}

.category-image {
  height: 470px;
  width: 470;
}
</style>
