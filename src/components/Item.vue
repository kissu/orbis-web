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
  export default {
    data() {
    return {
      appIconPath: 'ic_share.png' 
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
  };
  </script>
  
  <style>
  </style>
  