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
    <div class="col-lg-3">
      <select v-model="selectedCategoryId" @change="filterByCategory" class="category-picker form-select">
          <option value="">Categories</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>
    <ul v-if="!loading" class="charities-list">
      <li v-for="charities in this.charities" :key="charities.id" @click="goTocharitiesDetails(charities.id)">
        <div class="charities-item">
          <div v-if="charities.images.blob" class="charities-image-container">
            <img :src="`data:image/jpeg;base64,${charities.images.blob}`" alt="charities Image" class="charities-image" />
          </div>
          <div class="charities-details">
            <div class="charities-name">{{ charities.name }}</div>
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
        charities: [],
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
      ...mapGetters(['getUser']),
    },
    mounted() {
      this.fetchCharities();
    },
    methods: {
      async fetchCharities() {
  try {
    const axiosResponse = await axios.get('/api/v1/Charities/all');
    const data = axiosResponse.data;

    const userId = this.getUser.userId;

    const userResponse = await fetch(`/api/v1/Users/GetUser/${userId}`);
    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data, status: ${userResponse.status}`);
    }
    const userData = await userResponse.json();
    const blockedUserIds = userData?.Blocked_Users?.map(user => user.id) || [];

    this.charities = data.filter(charities => {
      return !blockedUserIds.includes(charities.UserId) && charities.Available !== false;
    });
  } catch (error) {
    console.error('Error fetching charities:', error);
    await this.fetchCharitiesWithoutUserFilter();
  } finally {
    this.loading = false;
  }
},
async fetchCharitiesWithoutUserFilter() {
  try {
    const axiosResponse = await axios.get('/api/v1/Charities/all');
    const data = axiosResponse.data;

    this.charities = data.filter(charities => charities.Available !== false);
  } catch (error) {
    console.error('Error fetching charities without user filter:', error);
  } finally {
    this.loading = false;
  }
  },
      goTocharitiesDetails(id) {
        this.$router.push({ name: 'donationdetails', params: { id } });
      },
      addClicked() {
      this.$router.push('/newdonation'); 
      },
      filterByCategory() {
      if (this.selectedCategoryId !== '') {
        this.charities = this.charities.filter(charitie => charitie.categoriesId === this.selectedCategoryId);
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
    width: 300px;
    height: 30px;
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
  
  .charities-list {
    list-style: none;
    padding: 0;
  }
  
  .charities-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .charities-image {
    width: 150px;
    height: 100px;
    margin-right: 10px;
  }
  
  .charities-details {
    flex-grow: 1;
  }
  
  .charities-name {
  font-size: 16px;
  font-weight: bold;
  color: white;
  }
  
  .charities-date {
    font-size: 12px;
    color: #404040;
  }
  
  </style>