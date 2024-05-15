
<template>
    <div>
      <h1>Activity List</h1>
      <ul>
        <li v-for="activity in activities" :key="activity.id">
          {{ activity.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activities: [],
      };
    },
    mounted() {
      this.fetchActivities();
    },
    methods: {
      async fetchActivities() {
        try {
          const response = await this.$axios.get('/api/v1/activities/all');
          this.activities = response.data;
        } catch (error) {
          console.error('Error fetching activities:', error);
        }
      },
    },
  };
  </script>
  