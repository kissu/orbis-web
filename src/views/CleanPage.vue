<template>
  <div class="main-container">
    <div>
      <div class="header">
        <search-bar @search="onSearch" class="search-bar" />
        <img :src="appIconPath" alt="Add Icon" class="add-icon" @click="addClicked" />
      </div>
      <div v-if="loading" class="loading">
        <lottie :options="defaultOptions" :width="200" :height="200" />
      </div>
      <ul v-if="!loading" class="clean-list">
        <li v-for="clean in this.clean" :key="clean.id" @click="goToCleanDetails(clean.id)">
          <div class="clean-item">
            <div v-if="clean.images.blob" class="clean-image-container">
              <img :src="`data:image/jpeg;base64,${clean.images.blob}`" alt="Clean Image" class="clean-image" />
            </div>
            <div class="clean-details">
              <div class="clean-name">{{ clean.name }}</div>
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
    SearchBar,
    Lottie,
  },
  data() {
    return {
      defaultOptions: {
        animationData: animationData,
      },
      clean: [],
      loading: true,
      appIconPath: '/src/images/ic_add.png',
    };
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  mounted() {
    this.fetchClean();
  },
  methods: {
    async fetchClean() {
  try {
    const axiosResponse = await axios.get('/api/v1/Clean/all');
    const data = axiosResponse.data;

    const userId = this.getUser.userId;
    const userResponse = await fetch(`/api/v1/Users/GetUser/${userId}`);
    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data, status: ${userResponse.status}`);
    }
    const userData = await userResponse.json();
    const blockedUserIds = userData?.Blocked_Users?.map(user => user.id) || [];

    if (navigator.geolocation) {
      for (const clean of data) {
        const location = clean.location;
        const coordinates = await this.geocodeLocation(location);
        clean.latitude = coordinates.latitude;
        clean.longitude = coordinates.longitude;
      }

      navigator.geolocation.getCurrentPosition(position => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        data.forEach(clean => {
          const cleanLatitude = clean.latitude;
          const cleanLongitude = clean.longitude;
          clean.distance = this.calculateDistance(userLatitude, userLongitude, cleanLatitude, cleanLongitude);
        });

        data.sort((a, b) => a.distance - b.distance);
        this.clean = data.filter(clean => {
          return !blockedUserIds.includes(clean.UserId) && clean.Available !== false;
        });
      });
    } else {
      console.warn("Geolocation is not supported.");
      this.clean = data.filter(clean => {
        return !blockedUserIds.includes(clean.UserId) && clean.Available !== false;
      });
    }
  } catch (error) {
    console.error('Error fetching clean data:', error);
    await this.fetchCleanWithoutUserFilter();
  } finally {
    this.loading = false;
  }
},
async fetchCleanWithoutUserFilter() {
  try {
    const axiosResponse = await axios.get('/api/v1/Clean/all');
    const data = axiosResponse.data;

    if (navigator.geolocation) {
      for (const clean of data) {
        const location = clean.location;
        const coordinates = await this.geocodeLocation(location);
        clean.latitude = coordinates.latitude;
        clean.longitude = coordinates.longitude;
      }

      navigator.geolocation.getCurrentPosition(position => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        data.forEach(clean => {
          const cleanLatitude = clean.latitude;
          const cleanLongitude = clean.longitude;
          clean.distance = this.calculateDistance(userLatitude, userLongitude, cleanLatitude, cleanLongitude);
        });

        data.sort((a, b) => a.distance - b.distance);
        this.clean = data;
      });
    } else {
      console.warn("Geolocation is not supported.");
      this.clean = data;
    }
  } catch (error) {
    console.error('Error fetching clean data without user filter:', error);
  } finally {
    this.loading = false;
  }
},
    async geocodeLocation(location) {
      try {
        const cleanedLocation = location.trim();
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURI(cleanedLocation)}`);
        const data = response.data;
        if (data && data.length > 0) {
          const firstResult = data[0];
          return { 
            latitude: parseFloat(firstResult.lat),
            longitude: parseFloat(firstResult.lon)
          };
        } else {
          throw new Error('Aucune coordonnée trouvée pour cette adresse');
        }
      } catch (error) {
        console.error('Erreur lors de la géocodage de l\'adresse:', error);
        return { latitude: 0, longitude: 0 }; 
      }
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; 
      const dLat = this.toRadians(lat2 - lat1);
      const dLon = this.toRadians(lon2 - lon1);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c; 
      return d;
    },
    toRadians(degrees) {
      return degrees * Math.PI / 180;
    },
    goToCleanDetails(id) {
      this.$router.push({ name: 'cleandetails', params: { id } });
    },
    addClicked() {
      this.$router.push('/newclean'); 
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
  width: 300px;
  height: 30px;
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
