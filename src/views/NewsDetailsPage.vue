<template>
  <div>
    <div v-if="loading">Chargement en cours...</div>
    <div v-if="!loading">
      <h2>{{ activity.name }}</h2>
      <p>{{ activity.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      activity: {},
      loading: true,
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.fetchActivityDetails(id);
  },
  methods: {
    async fetchActivityDetails(id) {
      try {
        const response = await fetch(`/api/v1/News/${id}`);

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
