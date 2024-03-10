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
            <img :src="activity.image" alt="Activity Image" class="activity-image" />
            <div class="activity-details">
              <div class="activity-name">{{ activity.name }}</div>
              <div class="activity-date">{{ formatDate(activity.start_date) }}</div>
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
      filteredActivities() {
        return this.activities.filter(activity => activity.categoriesId !== 20 && activity.categoriesId !== 26);
      },
    },
    mounted() {
      this.fetchActivities();
    },
    methods: {
      async fetchActivities() {
        try {
          const response = await fetch('/api/v1/Activities/GetJoinedActivitiesByUserId/172');
          if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
          }
          console.log('Lottie Options:', this.defaultOptions);
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
    },
  });
  </script>
  
  
  <style scoped>
  
  .main-container {
    background-color: #fdb213;
    height: 100%; 
    width: 197vh;
    overflow: hidden; 
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fdb213;
    padding: 10px;
  }
  
  .search-bar {
    width: 300px;
    height: 30px;
    background-color: #fdb213;
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
    width: 70px;
    height: 70px;
    margin-right: 10px;
  }
  
  .activity-details {
    flex-grow: 1;
  }
  
  .activity-name {
    font-size: 16px;
    font-weight: bold;
    color: white;
  }
  
  .activity-date {
    font-size: 12px;
    color: white;
  }
  
  </style>
  