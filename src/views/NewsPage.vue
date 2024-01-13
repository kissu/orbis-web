<template>
  <div id="app">
    <search-bar @search="onSearch" />
    <ul>
      <button class="support-button" style="margin-right: 10px;">Health</button>
      <button class="support-button" style="margin-right: 10px;">Environment</button>
      <button class="support-button">Food</button>

      <li v-for="item in items" :key="item.Text">
        <item :item="item" @share="onShareButtonClick" />
      </li>
    </ul>
  </div>
</template>
  
  <script>
  import Item from '@/components/Item.vue';
  import SearchBar from '@/components/SearchBar.vue';
  
  export default {
    components: {
      Item,
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

  .setting-button {
    margin: 5px;
    padding: 10px;
    background-color: #FFFFFF; 
    color: #FF4500;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 300px;
}

.setting-button:hover {
    background-color: #FFA07A; 
}

.support-button {
    margin: 20px;
    padding: 15px;
    background: linear-gradient(to right, #FF8C00, #FFD700);
    color: #FFFFFF;
    border: none;
    border-radius: 25px;
    width: 150px;
    cursor: pointer;
}

.support-button:hover {
    background: linear-gradient(to right, #FF4500, #FF8C00);
}

  </style>
  