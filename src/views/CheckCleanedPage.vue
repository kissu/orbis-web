<template>
    <div>
      <div v-if="loading" class="loading">
        <lottie :options="defaultOptions" :width="200" :height="200" />
      </div>
      <ul v-if="!loading" class="activity-list">
        <li v-for="activity in activitiesWithCleanImagesId" :key="activity.id">
          {{ activity.name }}
          <button @click="cleanActivity(activity.id)">Clean</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
    import Lottie from 'vue-lottie/src/lottie.vue';
    import animationData from "@/assets/animations/loading.json";
    import { defineComponent } from 'vue';

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
        activitiesWithCleanImagesId: [],
        loading: true,
        };
    },
    mounted() {
        this.getActivities();
    },
    methods: {
        async getActivities() {
        try {
            const response = await fetch('/api/v1/Activities/all');
            const data = await response.json();
            this.activities = data;
            this.filterActivitiesWithCleanImagesId();
        } catch (error) {
            console.error('Error recovering activities:', error);
        } finally {
            this.loading = false;
        }
        },
        filterActivitiesWithCleanImagesId() {
    this.activitiesWithCleanImagesId = this.activities.filter(activity => 
        activity.cleanImagesId !== null && 
        activity.cleanImagesId.length > 0 && 
        activity.cleanImagesId[0] !== 0 
    );
    },
      async cleanActivity(id) {
      try {
          const response = await fetch(`/api/v1/Activities/CleanedValidate/${id}`, {
          method: 'PUT',
          });
          if (response.ok) {
            this.getActivities();
          console.log('Activity cleaned up successfully');
            } else {
            console.error('Error cleaning up activity:', response.statusText);
            }
        } catch (error) {
            console.error('Error cleaning up activity:', error);
      }
      }
    }
    });
    </script>
