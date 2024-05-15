<template>
    <div class="main-container"> 
    <div>
      <div class="header">
      </div>
      <div v-if="loading" class="loading">
        <lottie :options="defaultOptions" :width="200" :height="200" />
      </div>
      <ul v-if="!loading" class="message-list">
        <li v-for="message in messages" :key="message.id" @click="goToGroupMessage(message.id)">
          <div class="message-item">
            <div v-if="message.images.blob" class="message-image-container">
            <img :src="`data:image/jpeg;base64,${message.images.blob}`" alt="message Image" class="message-image" />
            </div>
            <div class="message-details">
              <div class="message-name">{{ message.name }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </template>
  
  <script>
import { defineComponent } from 'vue';
import Lottie from 'vue3-lottie';
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
        messages: [],
        loading: true,
        appIconPath: '/src/images/ic_add.png',
      };
    },
    computed: {
      ...mapGetters(['getUser']),
    },
    mounted() {
      this.fetchmessages();
    },
    methods: {
      async fetchmessages() {
        try {
          const userId = this.getUser.userId;
          const response = await fetch(`/api/v1/Activities/GetJoinedActivitiesByUserId/${userId}`);
          if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
          }
          const data = await response.json();
          this.messages = data;
        } catch (error) {
          console.error('Error fetching messages:', error);
        } finally {
          this.loading = false;
        }
      },
      goToGroupMessage(id) {
        this.$router.push({ name: 'groupmessage', params: { id } });
      },
      formatDate(date) {
        return date; 
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
  
  .message-list {
    list-style: none;
    padding: 0;
  }
  
  .message-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .message-image {
    width: 150px;
    height: 100px;
    margin-right: 10px;
  }
  
  .message-details {
    flex-grow: 1;
  }
  
  .message-name {
    font-size: 16px;
    font-weight: bold;
  }
  
  .message-date {
    font-size: 12px;
    color: white;
  }
  
  </style>
  