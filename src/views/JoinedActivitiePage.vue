<template>
  <div class="main-container">
 
      <item v-for="item in filteredItems" :key="item.Text" :item="item" @share="onShareButtonClick" />
   
  </div>
</template>

<script>
import Item from '@/components/Item.vue';

export default {
  components: {
    Item,
  },
  data() {
    return {
      selectedCategory: "All", 
      appIconPath: 'ic_add.png',
      items: [
        { Image: 'image1.png', Text: 'Item 1', Start_date: new Date(), IsNotShared: true, Category: 'Category1' },
        { Image: 'image2.png', Text: 'Item 2', Start_date: new Date(), IsNotShared: true, Category: 'Category2' },
        { Image: 'image1.png', Text: 'Item 3', Start_date: new Date(), IsNotShared: true, Category: 'Category3' },
        { Image: 'image2.png', Text: 'Item 4', Start_date: new Date(), IsNotShared: true, Category: 'Category4' },
        { Image: 'image1.png', Text: 'Item 5', Start_date: new Date(), IsNotShared: true, Category: 'Category5' },
      ],
    };
  },
  computed: {
    filteredItems() {
      return this.selectedCategory === "All"
        ? this.items
        : this.items.filter(item => item.Category === this.selectedCategory);
    },
  },
  methods: {
    addClicked() {
      this.$router.push('/newactivitie');
    },
    onShareButtonClick(isNotShared) {
      if (isNotShared) {
        alert('Item shared!');
      } else {
        alert('Item is already shared.');
      }
    },
    onSearch(query) {
    },
    onCategoryChange() {
    },
  },
};
</script>


<style>
</style>
