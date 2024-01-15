<template>
  <li>
    <div class="item-container">
      <img :src="item.Image" alt="Item Image" class="item-image">
      <div class="item-details">
        <div class="item-text">{{ item.Text }}</div>
        <div class="item-date">{{ formattedDate }}</div>
      </div>
      <img :src="appIconPath" class="share-button" @click="shareButtonClick">
    </div>
  </li>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: true,
      appIconPath: 'ic_share.png',
      items: [],  
      test: [],
    };
  },
  props: {
    item: Object,
  },
  computed: {
    formattedDate() {
      return `${this.item.Start_date.toLocaleDateString()} - ${this.item.Start_date.toLocaleTimeString()}`;
    },
  },
  methods: {
    shareButtonClick() {
      this.$emit('share', this.item.IsNotShared);
    },
  },
  created() {
    fetch('/api/v1/Activities/all')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.test = data; 
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
li {
  list-style-type: none;
  margin-bottom: 20px; 
}

.item-container {
display: flex;
align-items: center;
justify-content: space-between;
padding: 20px; 
border: 2px solid #ddd;
border-radius: 10px;
font-size: 18px; 
}

.item-image {
max-width: 100px; 
max-height: 100px;
margin-right: 20px; 
}

.item-details {
  flex-grow: 1;
  text-align: left;
}

.share-button {
  padding: 10px;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
