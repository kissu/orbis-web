<template>
    <div id="app">
      <search-bar @search="onSearch" />
      <ul>
        <item v-for="item in items" :key="item.Text" :item="item" @share="onShareButtonClick" />
      </ul>
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
        items: [
          { Image: 'image1.png', Text: 'Item 1', Start_date: new Date(), IsNotShared: true },
          { Image: 'image2.png', Text: 'Item 2', Start_date: new Date(), IsNotShared: true },
          { Image: 'image1.png', Text: 'Item 3', Start_date: new Date(), IsNotShared: true },
          { Image: 'image2.png', Text: 'Item 4', Start_date: new Date(), IsNotShared: true },
          { Image: 'image1.png', Text: 'Item 5', Start_date: new Date(), IsNotShared: true },
        ],
      };
    },
    methods: {
      onShareButtonClick(isNotShared) {
        if (isNotShared) {
          alert('Item shared!');
        } else {
          alert('Item is already shared.');
        }
      },
      onSearch(query) {
  
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
  