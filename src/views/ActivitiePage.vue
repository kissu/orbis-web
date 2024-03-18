<template>
  <div class="main-container"> 
  <div>
    <div class="header">
      <select v-model="selectedCategoryId" @change="filterByCategory" class="category-picker">
          <option value="">Categories</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
        <select v-model="selectedTimeInterval" @change="filterByTimeInterval" class="time-interval-picker">
          <option value="">When</option>
          <option value="Today">Today</option>
          <option value="Tomorrow">Tomorrow</option>
          <option value="This Week">This Week</option>
          <option value="This Weekend">This Weekend</option>
          <option value="This Month">This Month</option>
        </select>
        <search-bar @search="filterByLocation($event)" class="search-bar" />
      <img :src="appIconPath" alt="Add Icon" class="add-icon" @click="addClicked" />
    </div>
    <div v-if="loading" class="loading">
      <lottie :options="defaultOptions" :width="200" :height="200" />
    </div>
    <ul v-if="!loading" class="activity-list">
      <li v-for="activity in filteredActivities" :key="activity.id" @click="goToActivityDetails(activity.id)">
        <div class="activity-item">
          <div class="activity-details">
            <div class="activity-name">{{ activity.name }}</div>
            <div class="activity-date">{{ formatDate(activity.start_date) }}</div>
          </div>
          <div v-if="imageUrl" class="activity-image-container">
            <img :src="imageUrl" alt="Activity Image" class="activity-image" />
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
      let filteredByCategory = this.activities.filter(activity => activity.categoriesId !== 20 && activity.categoriesId !== 26);

      if (this.selectedTimeInterval === '') {
        return filteredByCategory; 
      } else {
        return filteredByCategory.filter(activity => this.isActivityInSelectedTimeInterval(activity));
      }
    },
    ...mapGetters(['getUser']),
  },
  mounted() {
    this.fetchActivities();
    this.getImageUrl();
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
        this.filteredActivities = this.activities.filter(activity => activity.categoriesId !== 20 && activity.categoriesId !== 26);
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
    async getImageUrl() {
      try {
        const imageResponse = await fetch('/api/v1/Images/GetImageBlobById/30');
        if (!imageResponse.ok) {
          throw new Error(`Failed to fetch image, status: ${imageResponse.status}`);
        }
        const imageData = await imageResponse.blob(); 
        const imageUrl = URL.createObjectURL(imageData);
        
        this.imageUrl = imageUrl;
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    },
    addClicked() {
      this.$router.push('/newactivitie'); 
    },
    async fetchActivities() {
    try {
    const response = await fetch('/api/v1/Activities/all');
    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`);
    }
    
    const userId = this.getUser.userId;
    const userResponse = await fetch(`/api/v1/Users/GetUser/${userId}`);
    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data, status: ${userResponse.status}`);
    }
    const userData = await userResponse.json();
    const blockedUserIds = userData?.Blocked_Users?.map(user => user.id) || [];

    const data = await response.json();
    
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
