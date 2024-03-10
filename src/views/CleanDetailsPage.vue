<template>
    <div class="activity-name">
        <h2>{{ activity.name }}</h2>
        <p>{{ activity.description }}</p>
      </div>
  </template>
  
  <script>
  export default {
    props: ['id'],
    data() {
      return {
        activity: {},
      };
    },
    mounted() {
      const id = this.$route.params.id;
      this.fetchActivityDetails(id);
    },
    methods: {
      async fetchActivityDetails(id) {
        try {
          const response = await fetch(`/api/v1/Activities/${id}`);
  
          if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
          }
  
          const data = await response.json();
          this.activity = data;
        } catch (error) {
          console.error('Error fetching activity details:', error);
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  

<style scoped> 

.main-container {
  background-color: #34CF1D;
  height: 100%; 
  width: 197vh;
  overflow: hidden; 
}

.activity-name {
  font-size: 16px;
  font-weight: bold;
  color: white;
}

</style>