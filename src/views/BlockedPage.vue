<template>
    <div class="main-container"> 
    <div>
      <div class="header">
      </div>
      <div v-if="loading" class="loading">
        <lottie :options="defaultOptions" :width="200" :height="200" />
      </div>
      <ul v-if="!loading" class="blocked-list">
        <li v-for="block in blocked" :key="blocked.id" @click="goToGroupblocked(blocked.id)">
          <div class="blocked-item">
            <div class="blocked-details">
              <div class="blocked-name">{{ block }}</div>
            </div>
            <button @click="removeBlockedUser(block)" class="remove-button">Remove</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </template>
  
  <script>
import { defineComponent } from 'vue';
import Lottie from 'vue-lottie/src/lottie.vue';
import animationData from "@/assets/animations/loading.json";
import { mapGetters } from 'vuex';

  export default defineComponent({
    components: {
      Lottie
    },
    data() {
      return {
        defaultOptions: {
          animationData: animationData,
        },
        blocked: [],
        loading: true,
        appIconPath: '/src/images/ic_add.png',
      };
    },
    computed: {
      ...mapGetters(['getUser']),
    },
    mounted() {
      this.fetchblocked();
    },
    methods: {
      async fetchblocked() {
        try {
          const userId = this.getUser.userId;
          const response = await fetch(`/api/v1/Users/BlockedUsers/${userId}`);
          if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
          }
          const data = await response.json();
          this.blocked = data;
        } catch (error) {
          console.error('Error fetching blocked:', error);
        } finally {
          this.loading = false;
        }
      },
      async removeBlockedUser(name) {
      try {
        const userId = this.getUser.userId;
        const response = await fetch(`/api/v1/Users/UnblockUser/${userId}/${name}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error(`Failed to unblock user, status: ${response.status}`);
        }
        this.blocked = this.blocked.filter(user => user !== name);
      } catch (error) {
        console.error('Error removing blocked user:', error);
      }
    },
      async getImageUrl(id) {
      try {             
        const response = axios.get(`/api/v1/Images/GetImageBlobById/${id}`);
        this.imageUrl = `data:image/jpeg;base64,${response.data}`;
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    },
    },
  });
  </script>
  
  
  <style scoped>
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  
  .search-bar {
    width: 300px;
    height: 30px;
    color: white;
  }
  
  .add-icon {
    width: 30px;
    height: 30px;
  }
  
  .loading {
    text-align: center;
    margin-top: 20px;
  }
  
  .blocked-list {
    list-style: none;
    padding: 0;
  }
  
  .blocked-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .blocked-image {
    width: 150px;
    height: 100px;
    margin-right: 10px;
  }
  
  .blocked-details {
    flex-grow: 1;
  }
  
  .blocked-name {
    font-size: 16px;
    font-weight: bold;
  }
  
  .blocked-date {
    font-size: 12px;
    color: white;
  }
  
  </style>
  