<template>
  <div class="main-name">
    <h2>{{ activity.name }}</h2>
    <p>{{ activity.description }}</p>
    <div>
      <div>
      <img v-if="likeItemsVisible" src="/src/images/noliked.png" @click="likeActivity" height="50px" width="50px">
      <img v-if="cancelLikeItemsVisible" src="/src/images/like.png" @click="cancelLikeActivity" height="50px" width="50px">
    </div>

    <div>
      <img src="/src/images/block.png" @click="BlockUser" height="50px" width="50px">
      <img src="/src/images/flag.png" @click="toggleReportForm" height="50px" width="50px">
    </div>
    
    <div v-if="showReportForm">
      <select v-model="selectedReason">
        <option v-for="reason in predefinedReasons" :value="reason">{{ reason }}</option>
      </select>
      <button @click="submitReport">Submit Report</button>
    </div>

      <input type="number" v-model="donationAmount" placeholder="Enter donation amount">
      <button @click="donate">Donate</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['id'],
  data() {
    return {
      activity: {},
      donationAmount: null,
      predefinedReasons: ["I just don't like it", "It's Spam", "Nudity or sexual activity", "False Information", "Scam or Fraud", "Bullying or harassment", "Something else"],
      showReportForm: false,
      selectedReason: null,
      likeItemsVisible: true,
      cancelLikeItemsVisible: false,
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.fetchActivityDetails(id);
    this.checkLiked();
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    async likeActivity() {
    try {
      const userId = this.getUser.userId;
      const response = await fetch(`/api/v1/Users/LikeActivitie/${this.activity.id}/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.oauthToken}`
        }
      });

      if (response.ok) {
        this.checkLiked();
      } else {
        
      }
    } catch (error) {
      console.error('Erreur lors de la tentative de like de l\'activité:', error);
    }
  },
  async cancelLikeActivity() {
      try {
        const userId = this.getUser.userId;
        const response = await fetch(`/api/v1/Users/CancelLiked/${this.activity.id}/${userId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.oauthToken}`
          }
        });

        if (response.ok) {
          this.checkLiked();
        } else {
        
        }
      } catch (error) {
        console.error('Erreur lors de la tentative d\'annulation de like de l\'activité:', error);
      }
    },
    async BlockUser() {
      try {
        const userId = this.getUser.userId;
        const response = await fetch(`/api/v1/Users/BlockUser/${this.activity.userId}/${userId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.oauthToken}`
          }
        });

        if (response.ok) {
          
        } else {
        
        }
      } catch (error) {
        console.error('Erreur lors de la tentative d\'annulation de like de l\'activité:', error);
      }
    },
    async submitReport() {
      try {
        if (this.selectedReason) {
          const requestUri = `/api/v1/Users/ReportUser/${this.activity.userId}`;
          const response = await fetch(requestUri, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${this.oauthToken}`
            }
          });

          if (response.ok) {
            this.$emit('success', `Successfully reported this user for: ${this.selectedReason}`);
            this.$router.go(); 
          } else {
            this.$emit('error', 'Failed to report this user');
          }
        }
      } catch (error) {
        console.error('Error reporting user:', error);
      }
    },
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
    async toggleReportForm() {
      this.showReportForm = !this.showReportForm;
    },
    async checkLiked() {
    try {
        const userId = this.getUser.userId;
        const responseLiked = await fetch(`/api/v1/Users/LikedByUsers/${userId}`);

        if (responseLiked.ok) {
            const likedActivities = await responseLiked.json();

            if (likedActivities.includes(this.activity.id)) {
                this.likeItemsVisible = false;
                this.cancelLikeItemsVisible = true;
            } else {
                this.likeItemsVisible = true;
                this.cancelLikeItemsVisible = false;
            }
        } else {
          
        }
    } catch (error) {
        console.error('Erreur lors de la vérification des activités aimées et rejointes par l\'utilisateur:', error);
    }
},
    async submitReport() {
      try {
        if (this.selectedReason) {
          const requestUri = `/api/v1/Users/ReportUser/${this.activity.userId}`;
          const response = await fetch(requestUri, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${this.oauthToken}`
            }
          });

          if (response.ok) {
            this.$emit('success', `Successfully reported this user for: ${this.selectedReason}`);
            this.$router.go(); 
          } else {
            this.$emit('error', 'Failed to report this user');
          }
        }
      } catch (error) {
        console.error('Error reporting user:', error);
      }
    },
    async getStripeSessionUrl(activityName) {
      try {
        const amountInCents = this.donationAmount * 100;
        const response = await fetch(`/api/v1/Activities/CheckOut/${amountInCents}/${activityName}`, { method: 'POST' });
        if (!response.ok) {
          throw new Error(`Failed to get Stripe session URL, status: ${response.status}`);
        }
        const data = await response.json();
        window.location.href = data.stripeSessionUrl;
      } catch (error) {
        console.error('Error getting Stripe session URL:', error);
        throw error;
      }
    },
    async donate() {
      if (!this.donationAmount) {
        alert("Please enter the donation amount.");
        return;
      }
      this.getStripeSessionUrl(this.activity.name);
    },
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
      }
    },
  },
};
</script>

<style scoped> 
.main-container {
  background-color: #517BEB;
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
