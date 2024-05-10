<template>
  <div class="main-container"> 
    <div class="activity-name">
      <img :src="this.imageUrl" alt="Activity Image" class="activity-image" />
      <h2>{{ activity.name }}</h2>
      <p>{{ activity.description }}</p>
    </div>

    <div class="profile">
      <img :src="imageProfileUrl" alt="Image de profil" class="profile-image" />
      <h2>{{ username }}</h2>
    </div>

    <div>
      <img v-if="joinedItemsVisible" src="/src/images/join.png" @click="joinActivity" height="50px" width="50px">
      <img v-if="cancelJoinItemsVisible" src="/src/images/quit.png" @click="cancelJoinActivity" height="50px" width="50px">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      activity: {},
      predefinedReasons: ["I just don't like it", "It's Spam", "Nudity or sexual activity", "False Information", "Scam or Fraud", "Bullying or harassment", "Something else"],
      showReportForm: false,
      selectedReason: null,
      likeItemsVisible: true,
      cancelLikeItemsVisible: false,
      joinedItemsVisible: true,
      cancelJoinItemsVisible: false,
      imageUrl: '', 
      imageProfileUrl: '',
      username: ''
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.fetchActivityDetails(id);
    this.checkLikedAndJoined();
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
        this.checkLikedAndJoined();
      } else {
        
      }
    } catch (error) {
      console.error('Erreur lors de la tentative de like de l\'activité:', error);
    }
  },
  async joinActivity() {
    try {
        const userId = this.getUser.userId;
        const response = await fetch(`/api/v1/Activities/JoinActivitie/${this.activity.id}/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.oauthToken}`
            }
        });

        if (response.ok) {
            this.checkLikedAndJoined();
        } else {
        }
    } catch (error) {
        console.error('Erreur lors de la tentative de rejoindre l\'activité:', error);
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
          this.checkLikedAndJoined();
        } else {
        
        }
      } catch (error) {
        console.error('Erreur lors de la tentative d\'annulation de like de l\'activité:', error);
      }
    },
    async cancelJoinActivity() {
      try {
        const userId = this.getUser.userId;
        const response = await fetch(`/api/v1/Activities/LeaveActivitie/${this.activity.id}/${userId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.oauthToken}`
          }
        });

        if (response.ok) {
          this.checkLikedAndJoined();
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
    async fetchActivityDetails(id) {
      try {
        const response = await fetch(`/api/v1/Activities/${id}`);

        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const data = await response.json();
        this.activity = data;
        await this.getImageUrl(this.activity.imagesId);
        this.imageProfileUrl = await this.loadProfileImage(this.activity.userId);
        this.username = await this.getUsername(this.activity.userId);
      } catch (error) {
        console.error('Error fetching activity details:', error);
      } finally {
        this.loading = false;
      }
    },
    async loadProfileImage(userId) {
  try {
    const response = await axios.get(`/api/v1/Images/GetImageIdByUserId/${userId}`);
    const imageId = response.data;
    const response2 = await axios.get(`/api/v1/Images/GetImageBlobById/${imageId}`);
    const imageData = response2.data;
    return `data:image/jpeg;base64,${imageData}`;
  } catch (error) {
    console.error('Erreur lors du chargement de l\'image de profil :', error);
    return null;
  }
},
async getUsername(userId) {
  try {
    if (userId) {
      const response = await axios.get(`/api/v1/Activities/GetUserName/${userId}`);
      if (response.status == 200) {
        return response.data;
      }
    }
    return 'Utilisateur inconnu';
  } catch (error) {
    console.error('Erreur lors de la récupération du nom d\'utilisateur :', error);
    return 'Utilisateur inconnu';
  }
},
    async getImageUrl(id) {
    try {             
      const response = await axios.get(`/api/v1/Images/GetImageBlobById/${id}`);
      this.imageUrl = `data:image/jpeg;base64,${response.data}`;
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  },
    async toggleReportForm() {
      this.showReportForm = !this.showReportForm;
    },
    async checkLikedAndJoined() {
    try {
        const userId = this.getUser.userId;
        const responseLiked = await fetch(`/api/v1/Users/LikedByUsers/${userId}`);
        const responseJoined = await fetch(`/api/v1/Activities/JoinActivitieId/${userId}`);

        if (responseLiked.ok && responseJoined.ok) {
            const likedActivities = await responseLiked.json();
            const joinedActivities = await responseJoined.json();

            if (likedActivities.includes(this.activity.id)) {
                this.likeItemsVisible = false;
                this.cancelLikeItemsVisible = true;
            } else {
                this.likeItemsVisible = true;
                this.cancelLikeItemsVisible = false;
            }

            if (joinedActivities.includes(this.activity.id)) {
                this.joinedItemsVisible = false;
                this.cancelJoinItemsVisible = true;
            } else {
                this.joinedItemsVisible = true;
                this.cancelJoinItemsVisible = false;
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
    }
  }
};
</script>

<style scoped> 
.main-container {
  background-color: #fdb213;
}

.activity-name {
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.activity-image {
  width: 350px;
  height: 200px;
  margin-right: 10px;
}

.profile-image {
  height: 50px;
  width: 50px;
  margin: 15px
}

.profile{
  display: flex;
  align-items: center;
  justify-content: center; 
}

</style>
