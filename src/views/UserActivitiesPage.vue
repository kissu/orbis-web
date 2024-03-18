<template>
  <div>
      <ul>
          <li v-for="activity in activities" :key="activity.id">{{ activity.name }}</li>
      </ul>
  </div>
</template>

<script>
export default {
  props: ['userId'],
  data() {
      return {
          activities: [],
      };
  },
  mounted() {
    const id = this.$route.params.id;
      this.fetchUserActivities(id);
  },
  methods: {
      async fetchUserActivities(userId) {
          try {
              const response = await fetch(`/api/v1/Activities/GetAllActivitiesByUserId/${userId}`);
              if (!response.ok) {
                  throw new Error(`Failed to fetch user activities, status: ${response.status}`);
              }
              this.activities = await response.json();
          } catch (error) {
              console.error('Error fetching user activities:', error);
          }
      },
  },
};
</script>

<style scoped>

</style>
