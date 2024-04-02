<template>
    <div class="main-container"> 
      <div class="header">
        <input type="text" v-model="searchQuery" placeholder="Search by name" class="search-bar">
      </div>
      <div v-if="loading" class="loading">
        <lottie :options="defaultOptions" :width="200" :height="200" />
      </div>
      <div v-else>
        <ul>
          <li v-for="message in filteredMessages" :key="message.id">
            {{ message.content }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import Lottie from 'vue-lottie/src/lottie.vue';
  import animationData from "@/assets/animations/loading.json";
  
  export default defineComponent({
    components: {
      Lottie
    },
    data() {
      return {
        defaultOptions: {
          animationData: animationData,
        },
        messages: [],
        loading: true,
        searchQuery: '' 
      };
    },
    mounted() {
      this.fetchMessages();
    },
    computed: {
      filteredMessages() {
        return this.messages.filter(message => message.donation === true && message.content.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }
    },
    methods: {
      async fetchMessages() {
        try {
          const response = await fetch('/api/v1/Messages/donations');
          if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
          }
          const data = await response.json();
          this.messages = data;
        } catch (error) {
          console.error('Error fetching donation messages:', error);
        } finally {
          this.loading = false;
        }
      }
    }
  });
  </script>
  
  <style scoped>
  
  </style>
  