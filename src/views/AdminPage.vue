<template>
  <div class="dashboard">
    <div class="sidebar">
      <router-link to="/admin/users" class="sidebar-item">Users</router-link>
      <router-link to="/admin/addadmin" class="sidebar-item">Admin</router-link>
      <router-link to="/admin/settings" class="sidebar-item">Settings</router-link>
    </div>

    <div class="content">
      <div>
        <h2>Numbers of users : {{ userCount }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      userCount: 0,
      activityCount: 0,
    };
  },
  mounted() {
    this.fetchUserCount();
  },
  methods: {
    async fetchUserCount() {
      try {
        const response = await fetch('/api/v1/Users/all');
        if (!response.ok) {
          throw new Error(`Failed to fetch users, status: ${response.status}`);
        }
        const data = await response.json();
        this.userCount = data.length;
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100%;
}

.search-bar {
  width: 300px;
  height: 30px;
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}

.sidebar {
  width: 200px;
  background-color: #333;
  color: #fff;
}

.sidebar-item {
  display: block;
  padding: 10px;
  color: #fff;
  text-decoration: none;
}

.sidebar-item:hover {
  background-color: #555;
}

.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
