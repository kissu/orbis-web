<template>
    <div>
    <div v-if="loading">
      <lottie :options="defaultOptions" :width="200" :height="200"/>
    </div>
      <ul v-if="!loading">
        <li v-for="activity in filteredActivities" :key="activity.id" @click="goToActivityDetails(activity.id)">
          {{ activity.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>


import { defineComponent } from 'vue';
import Lottie from 'vue-lottie/src/lottie.vue';
import animationData from "@/assets/animations/loading.json";


export default defineComponent({
  components: {
    Lottie,
  },
  data() {
    return {
      defaultOptions: {
        animationData: animationData,
      },
        activities: [],
        loading: true,
      };
    },
    computed: {
      filteredActivities() {
        return this.activities.filter(activity => activity.categoriesId === 20);
      },
    },
    mounted() {
      this.fetchActivities();
    },
    methods: {
      async fetchActivities() {
        try {
          const response = await fetch('/api/v1/Activities/all');
  
          if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
          }
  
          const data = await response.json();
          this.activities = data;
        } catch (error) {
          console.error('Error fetching activities:', error);
        } finally {
          this.loading = false;
        }
      },
      goToActivityDetails(id) {
        this.$router.push({ name: 'donationdetails', params: { id } });
      },
    },
  });
  </script>
  