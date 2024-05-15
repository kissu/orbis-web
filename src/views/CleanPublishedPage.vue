<template>
  <div class="main-container"> 
    <div>
      <div class="row">
        <div class="col-lg-3">
          <div v-if="loading" class="loading">
            <lottie :options="defaultOptions" :width="200" :height="200" />
          </div>
          <ul v-if="!loading" class="clean-list">
            <li v-for="clean in this.clean" :key="clean.id">
              <div class="clean-item">
                <div v-if="clean.images.blob" class="clean-image-container">
                  <img :src="`data:image/jpeg;base64,${clean.images.blob}`" alt="clean Image" class="clean-image" />
                </div>
                <div class="clean-details">
                  <div class="clean-name">{{ clean.name }}</div>
                  <div class="clean-date">{{ formatDate(clean.start_date) }}</div>
                  <img :src="`src/images/update.png`" class="updatd-image" @click="updateClean(clean.id)"/>
                  <img :src="`src/images/delete.png`" class="delete-image" @click="deleteClean(clean.id)"/>
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
      clean: [],
      loading: true,
    };
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  mounted() {
    this.fetchclean();
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
    async fetchclean() {
    try {
    const userId = this.getUser.userId;
    const response = await axios.get(`/api/v1/Clean/all`);
    const data = await response?.data;
    this.clean = data.filter(clean => clean.userId === userId);
  } catch (error) {
    console.error('Error fetching clean:', error);
  } finally {
    this.loading = false;
  }
    },
    goTocleanDetails(id) {
      this.$router.push({ name: 'cleandetails', params: { id } });
    },
    updateClean(id) {
      this.$router.push({ name: 'updateclean', params: { id } });
    },
    async deleteClean(cleanId) {
      try {
        const response = await axios.delete(`/api/v1/Clean/${cleanId}`);

        if (response.status === 200) {
          await this.fetchActivities();
          alert("Clean deleted successfully");
        } else {
          alert("Failed to delete clean");
        }
      } catch (error) {
        console.error('Error deleting clean:', error);
        alert("An error occurred while deleting clean");
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
  background-color: #34CF1D;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #34CF1D;
  padding: 10px;
}

.search-bar {
  height: 35px;
  background-color: #34CF1D;
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

.clean-list {
  list-style: none;
  padding: 0;
}

.clean-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.clean-image {
  width: 150px;
  height: 100px;
  margin-right: 10px;
}

.clean-details {
  flex-grow: 1;
}

.clean-name {
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.clean-date {
  font-size: 12px;
  color: white;
}

</style>
