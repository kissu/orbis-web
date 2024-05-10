<template>
  <div class="main-container"> 
    <div>
      <div class="row">
        <div class="col-lg-3">
          <div v-if="loading" class="loading">
            <lottie :options="defaultOptions" :width="200" :height="200" />
          </div>
          <ul v-if="!loading" class="activity-list">
            <li v-for="activity in activities" :key="activity.id">
              <div class="activity-item">
                <div v-if="activity.images.blob" class="activity-image-container">
                  <img :src="`data:image/jpeg;base64,${activity.images.blob}`" alt="Activity Image" class="activity-image" />
                </div>
                <div class="activity-details">
                  <div class="activity-name">{{ activity.name }}</div>
                  <div class="activity-date">{{ formatDate(activity.start_date) }}</div>
                  <img :src="`src/images/update.png`" class="updatd-image" @click="updateActivity(activity.id)"/>
                  <img :src="`src/images/delete.png`" class="delete-image" @click="deleteActivity(activity.id)"/>
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
import Lottie from 'vue-lottie/src/lottie.vue';
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
    async fetchActivities() {
      try {
        const userId = this.getUser.userId;
        const response = await axios.get(`/api/v1/Activities/all`);
        const data = response.data;
        this.activities = data.filter(activity => activity.userId === userId);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        this.loading = false;
      }
    },
    goToActivityDetails(id) {
      this.$router.push({ name: 'activitiesdetails', params: { id } });
    },
    updateActivity(id) {
      this.$router.push({ name: 'updateactivitie', params: { id } });
    },
    async deleteActivity(activityId) {
      try {
        const response = await axios.delete(`/api/v1/Activities/${activityId}`);

        if (response.status === 200) {
          await this.fetchActivities();
          alert("Activity deleted successfully");
        } else {
          alert("Failed to delete activity");
        }
      } catch (error) {
        console.error('Error deleting activity:', error);
        alert("An error occurred while deleting activity");
      }
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
