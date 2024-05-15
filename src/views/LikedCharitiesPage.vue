<template>
  <div class="main-container"> 
    <div>
      <div class="row">
        <div class="col-lg-3">
          <div v-if="loading" class="loading">
            <lottie :options="defaultOptions" :width="200" :height="200" />
          </div>
          <ul v-if="!loading" class="activity-list">
            <li v-for="activity in this.activities" :key="activity.id" @click="goToActivityDetails(activity.id)">
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import Lottie from 'vue3-lottie';
import animationData from "@/assets/animations/loading.json";
import axios from 'axios';

export default defineComponent({
  components: {
    Lottie,
  },
  data() {
    return {
      defaultOptions: {
        animationData: animationData,
      },
      imageUrl: '', 
      activities: [],
      loading: true,
    };
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  mounted() {
    this.fetchActivities();
  },
  methods: {
  async getImageUrl(id) {
  try {             
    const response = axios.get(`/api/v1/Images/GetImageBlobById/${id}`);
    this.imageUrl = `data:image/jpeg;base64,${response.data}`;
  } catch (error) {
    console.error('Error fetching image:', error);
  }
  },
    async fetchActivities() {
    try {
    const userId = this.getUser.userId;
    const response = await axios.get(`/api/v1/Users/GetLikedCharitiesByUserId/${userId}`);
    const data = await response?.data;
    this.activities = data;
  } catch (error) {
    console.error('Error fetching activities:', error);
  } finally {
    this.loading = false;
  }
    },
    goToActivityDetails(id) {
      this.$router.push({ name: 'donationdetails', params: { id } });
    },
    formatDate(date) {
      return date; 
    },
  },
});
</script>


<style scoped>

.main-container {
  background-color: #DD3CD6;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #DD3CD6;
  padding: 10px;
}

.search-bar {
  height: 35px;
  background-color: #DD3CD6;
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
