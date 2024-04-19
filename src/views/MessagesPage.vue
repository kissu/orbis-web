<template>
    <div class="main-container"> 
    <div>
      <div class="header">
      </div>
      <div v-if="loading" class="loading">
        <lottie :options="defaultOptions" :width="200" :height="200" />
      </div>
      <ul v-if="!loading" class="activity-list">
        <li v-for="activity in activities" :key="activity.id" @click="goToGroupMessage(activity.id)">
          <div class="activity-item">
            <div v-if="activity.images.blob" class="activity-image-container">
            <img :src="`data:image/jpeg;base64,${activity.images.blob}`" alt="Activity Image" class="activity-image" />
            </div>
            <div class="activity-details">
              <div class="activity-name">{{ activity.name }}</div>
            </div>
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
        activities: [],
        loading: true,
        appIconPath: '/src/images/ic_add.png',
      };
    },
    computed: {
      ...mapGetters(['getUser']),
    },
    mounted() {
      this.fetchActivities();
    },
    methods: {
      async fetchActivities() {
        try {
          const userId = this.getUser.userId;
          const response = await fetch(`/api/v1/Activities/GetJoinedActivitiesByUserId/${userId}`);
          if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
          }
          const data = await response.json();
          this.activities = data;
        } catch (error) {
          console.error('Error fetching activities:', error);
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
  
  .activity-list {
    list-style: none;
    padding: 0;
  }
  
  .activity-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .activity-image {
    width: 150px;
    height: 100px;
    margin-right: 10px;
  }
  
  .activity-details {
    flex-grow: 1;
  }
  
  .activity-name {
    font-size: 16px;
    font-weight: bold;
  }
  
  .activity-date {
    font-size: 12px;
    color: white;
  }
  
  </style>
  