<template>
  <div class="main-container"> 
  <div>
    <div class="row">
      <div class="col-lg-3">
      <select v-model="selectedCategoryId" @change="filterByCategory" class="category-picker form-select">
          <option value="">Categories</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
      <div class="col-lg-3">
        <select v-model="selectedTimeInterval" @change="filterByTimeInterval" class="time-interval-picker form-select">
          <option value="">When</option>
          <option value="Today">Today</option>
          <option value="Tomorrow">Tomorrow</option>
          <option value="This Week">This Week</option>
          <option value="This Weekend">This Weekend</option>
          <option value="This Month">This Month</option>
        </select>
      </div>
      <div class="col-lg-4 d-flex">
        <search-bar @search="filterByLocation($event)" class="search-bar" />
      </div>
      <div class="col-lg-1"><img :src="appIconPath" alt="Add Icon" class="add-icon m-0" @click="addClicked"/>   
      </div>
    </div>
    <div v-if="loading" class="loading">
      <lottie :options="defaultOptions" :width="200" :height="200" />
    </div>
    <ul v-if="!loading" class="activity-list">
      <li v-for="activity in filteredActivities" :key="activity.id" @click="goToActivityDetails(activity.id)">
        <div class="activity-item">
          <div v-if="activity.images.blob" class="activity-image-container">
            <img :src="`data:image/jpeg;base64,${activity.images.blob}`" alt="Activity Image" class="activity-image" />
          </div>
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
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import Lottie from 'vue-lottie/src/lottie.vue';
import animationData from "@/assets/animations/loading.json";
import SearchBar from '@/components/SearchBar.vue';
import axios from 'axios';

export default defineComponent({
  components: {
    Lottie,
    SearchBar,
  },
  data() {
    return {
      defaultOptions: {
        animationData: animationData,
      },
      searchText: '', 
      selectedTimeInterval: '', 
      imageUrl: '', 
      activities: [],
      loading: true,
      appIconPath: '/src/images/ic_add.png',
      selectedCategoryId: '', 
      categories: [ 
        { id: 2, name: 'Poverty' },
        { id: 7, name: 'Ecology' },
        { id: 8, name: 'Health' },
        { id: 9, name: 'Animals' },
        { id: 10, name: 'Food' },
      ],
    };
  },
  computed: {
    filteredActivities() {
      if (this.selectedTimeInterval === '') {
        return this.activities; 
      } else {
        return this.activities.filter(activity => this.isActivityInSelectedTimeInterval(activity));
      }
    },
    ...mapGetters(['getUser']),
  },
  mounted() {
    this.fetchActivities();
  },
  methods: {
    isActivityInSelectedTimeInterval(activity) {
      const activityStartDate = new Date(activity.start_date);

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const thisWeekStart = new Date(today);
      thisWeekStart.setDate(today.getDate() - today.getDay());
      const thisWeekEnd = new Date(today);
      thisWeekEnd.setDate(thisWeekStart.getDate() + 6);
      const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      switch (this.selectedTimeInterval) {
        case 'Today':
          return activityStartDate.toDateString() === today.toDateString();
        case 'Tomorrow':
          return activityStartDate.toDateString() === tomorrow.toDateString();
        case 'This Week':
          return activityStartDate >= thisWeekStart && activityStartDate <= thisWeekEnd;
        case 'This Weekend':
          return activityStartDate.getDay() === 6 || activityStartDate.getDay() === 0;
        case 'This Month':
          return activityStartDate >= thisMonthStart && activityStartDate <= thisMonthEnd;
        default:
          return true; 
      }
    },
    filterByTimeInterval() {
    switch (this.selectedTimeInterval) {
      case 'Today':
      case 'Tomorrow':
      case 'This Week':
      case 'This Weekend':
      case 'This Month':
        this.filteredActivities = this.activities.filter(activity => this.isActivityInSelectedTimeInterval(activity));
        break;
      default:
        this.filteredActivities = this.activities;
        break;
    }
  },
  filterByLocation(searchText) {
  this.filteredActivities = this.activities.filter(activity => {
    return activity.location.toLowerCase().includes(searchText.toLowerCase());
  });
  },
  filterByCategory() {
    if (this.selectedCategoryId !== '') {
      this.activities = this.activities.filter(activity => activity.categoriesId === this.selectedCategoryId);
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
    addClicked() {
      this.$router.push('/newactivitie'); 
    },
    async fetchActivities() {
    try {

    const response = await axios.get('/api/v1/Activities/all');
    
    const userId = this.getUser.userId;
    const userResponse = await fetch(`/api/v1/Users/GetUser/${userId}`);
    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data, status: ${userResponse.status}`);
    }
    const userData = await userResponse.json();
    const blockedUserIds = userData?.Blocked_Users?.map(user => user.id) || [];

    const data = await response?.data;
    console.log("data",data);
    this.activities = data.filter(activity => {
      return !blockedUserIds.includes(activity.UserId) && activity.Available !== false;
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
  } finally {
    this.loading = false;
  }
    },
    goToActivityDetails(id) {
      this.$router.push({ name: 'activitiesdetails', params: { id } });
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
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fdb213;
  padding: 10px;
}

.search-bar {
  height: 35px;
  background-color: #fdb213;
  color: white;
}

.add-icon {
  width: 40px;
  height: 40px;
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
  color: white;
}

.activity-date {
  font-size: 12px;
  color: white;
}

</style>
