<template>
  <div id="app">
    <ul>
      <item v-for="item in filteredItems" :key="item.Text" :item="item" @share="onShareButtonClick" />
    </ul>
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
body {
    display: flex;
    justify-content: center;
    margin: 0;
}

.add-icon {
    width: 35px;
    height: 35px;
    margin-bottom: 10px;
    cursor: pointer;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-item {
  flex-grow: 1;
  margin-right: 10px;
}

#app {
    text-align: center;
    margin-top: 50px;
}

input[type="text"] {
    border-radius: 10px; 
    padding: 10px;
}

.item-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ddd;
    margin: 10px;
}

.item-image {
    max-width: 50px;
    max-height: 50px;
    margin-right: 10px;
}

.item-details {
    flex-grow: 1;
    text-align: left;
}

.share-button {
    padding: 5px 10px;
    color: white;
    border: none;
    cursor: pointer;
}
</style>
