<template>
  <div id="app">
    <search-bar @search="onSearch" class="flex-item" />
    <img :src="appIconPath" alt="Add Icon" class="add-icon" @click="addClicked" />
    <ul>
      <label for="categoryPicker">Select Category</label>
      <select id="categoryPicker" v-model="selectedCategory" @change="onCategoryChange" style="margin-right: 10px;">
        <option v-for="category in itemCategories" :key="category">{{ category }}</option>
      </select>
      <label for="timePicker">Select Time</label>
      <select id="timePicker" v-model="selectedTime" @change="onTimeChange">
        <option v-for="time in itemTimes" :key="time">{{ time }}</option>
      </select>
      <item v-for="item in items" :key="item.id" :item="item" @share="onShareButtonClick" />
    </ul>

    <div v-if="loading">Loading...</div>
    <div v-else>
        <div>Items:</div>
        <pre>{{ JSON.stringify(items, null, 2) }}</pre>
      </div>
    </div>
</template>


<script>
import Item from '@/components/Item.vue';
import SearchBar from '@/components/SearchBar.vue';

export default {
  components: {
    Item,
    SearchBar,
  },
  data() {
    return {
      suggestions: ["Location1", "Location2", "Location3"],
      itemCategories: ["Category1", "Category2", "Category3"],
      itemTimes: ["Time1", "Time2", "Time3"], 
      selectedCategory: "All",
      selectedTime: "All", 
      appIconPath: 'ic_add.png',
      items: [ { Image: 'image1.png', Text: 'Item 1', Start_date: new Date(), IsNotShared: true, Category: 'Category1' },
        { Image: 'image2.png', Text: 'Item 2', Start_date: new Date(), IsNotShared: true, Category: 'Category2' },
        { Image: 'image1.png', Text: 'Item 3', Start_date: new Date(), IsNotShared: true, Category: 'Category3' },],
      loading: true,
    };
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
    onTimeChange() {
      
    },
  },
  created() {
    fetch('/api/v1/Activities/all')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.items = data; 
        this.loading = false;
      })
      .catch(error => {
        console.error('Error retrieving items:', error);
        this.loading = false;
      });
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
