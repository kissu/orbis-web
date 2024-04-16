<template>
    <input type="text" class="form-control" v-model="searchQuery" @input="onSearchInput" placeholder="Search by location"/>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
      };
    },
    methods: {
      onSearchInput() {
        this.$emit('search', this.searchQuery);
      },
    },
  };
  </script>
  
  <style>
  
  </style>
  