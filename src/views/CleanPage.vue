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
      <li v-for="clean in this.clean" :key="clean.id" @click="goTocleanDetails(clean.id)">
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
      this.fetchclean();
    },
    methods: {
      async fetchclean() {
        try {
          const response = await fetch('/api/v1/Clean/all');
  
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
          
          this.clean = data.filter(clean => {
            return !blockedUserIds.includes(clean.UserId) && clean.Available !== false;
          });
        } catch (error) {
          console.error('Error fetching clean:', error);
        } finally {
          this.loading = false;
        }
      },
      goTocleanDetails(id) {
        this.$router.push({ name: 'cleandetails', params: { id } });
      },
      addClicked() {
      this.$router.push('/newclean'); 
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