<template>
  <div class="main-container"> 
    <div>
      <div class="row">
        <div class="col-lg-3">
          <div v-if="loading" class="loading">
            <lottie :options="defaultOptions" :width="200" :height="200" />
          </div>
          <ul v-if="!loading" class="charitie-list">
            <li v-for="charitie in this.charities" :key="charitie.id" @click="goTocharitieDetails(charitie.id)">
              <div class="charitie-item">
                <div v-if="charitie.images.blob" class="charitie-image-container">
                  <img :src="`data:image/jpeg;base64,${charitie.images.blob}`" alt="charitie Image" class="charitie-image" />
                </div>
                <div class="charitie-details">
                  <div class="charitie-name">{{ charitie.name }}</div>
                  <div class="charitie-date">{{ formatDate(charitie.start_date) }}</div>
                  <img :src="`src/images/update.png`" class="updatd-image" @click="updateCharitie(charitie.id)"/>
                  <img :src="`src/images/delete.png`" class="delete-image" @click="deleteCharitie(charitie.id)"/>
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
      charities: [],
      loading: true,
    };
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  mounted() {
    this.fetchcharities();
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
    async fetchcharities() {
    try {
    const userId = this.getUser.userId;
    const response = await axios.get(`/api/v1/Charities/all`);
    const data = await response?.data;
    this.charities = data.filter(charitie => charitie.userId === userId);
  } catch (error) {
    console.error('Error fetching charities:', error);
  } finally {
    this.loading = false;
  }
    },
    goTocharitieDetails(id) {
      this.$router.push({ name: 'charitiesdetails', params: { id } });
    },
    updateCharitie(id) {
      this.$router.push({ name: 'updatecharitie', params: { id } });
    },
    async deleteCharitie(charitieId) {
      try {
        const response = await axios.delete(`/api/v1/Charities/${charitieId}`);

        if (response.status === 200) {
          await this.fetchActivities();
          alert("Charitie deleted successfully");
        } else {
          alert("Failed to delete charitie");
        }
      } catch (error) {
        console.error('Error deleting charitie:', error);
        alert("An error occurred while deleting charitie");
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

.charitie-list {
  list-style: none;
  padding: 0;
}

.charitie-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.charitie-image {
  width: 150px;
  height: 100px;
  margin-right: 10px;
}

.charitie-details {
  flex-grow: 1;
}

.charitie-name {
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.charitie-date {
  font-size: 12px;
  color: white;
}

</style>
