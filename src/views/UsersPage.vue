<template>
    <div class="main-container"> 
      <div class="header">
        <input type="text" v-model="searchQuery" placeholder="Search by name" class="search-bar">
      </div>
      <div v-if="loading" class="loading">
        <lottie :options="defaultOptions" :width="200" :height="200" />
      </div>
      <div v-else>
        <ul>
        <li v-for="user in filteredUsers" :key="user.id" @click="navigateToUserActivities(user.id)">
        {{ user.name }} : 
        {{ user.email }} :
        {{ user.number }}
        <button @click="blockUser(user.id)">Block</button>
        <button @click="unblockUser(user.id)" v-if="user.blocked">Unblock</button>
        <button @click="deleteUser(user.id)">Delete</button>
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
        users: [],
        loading: true,
        searchQuery: '' 
      };
    },
    mounted() {
      this.fetchUsers();
    },
    computed: {
      filteredUsers() {
        return this.users.filter(user => user.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }
    },
    methods: {
        navigateToUserActivities(userId) {
            this.$router.push({ path: `/admin/useractivities/${userId}` });

    },
      async fetchUsers() {
        try {
          const response = await fetch('/api/v1/Users/all');
          if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
          }
          const data = await response.json();
          this.users = data;
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          this.loading = false;
        }
      },
      async blockUser(userId) {
        try {
          const response = await fetch(`/api/v1/Users/BlockUserData/${userId}`, {
            method: 'PUT',
          });
          if (!response.ok) {
            throw new Error(`Failed to block user, status: ${response.status}`);
          }
          await this.fetchUsers();
        } catch (error) {
          console.error('Error blocking user:', error);
        }
      },
      async unblockUser(userId) {
      try {
        const response = await fetch(`/api/v1/Users/UnblockUserData/${userId}`, {
          method: 'PUT',
        });
        if (!response.ok) {
          throw new Error(`Failed to unblock user, status: ${response.status}`);
        }
        const userIndex = this.users.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
          this.users[userIndex].blocked = false;
        }
      } catch (error) {
        console.error('Error unblocking user:', error);
      }
    },
      async deleteUser(userId) {
        try {
          const response = await fetch(`/api/v1/Users/UsersEntityDelete/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error(`Failed to delete user, status: ${response.status}`);
          }
          await this.fetchUsers();
        } catch (error) {
          console.error('Error deleting user:', error);
        }
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
  