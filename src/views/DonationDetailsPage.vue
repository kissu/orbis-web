<template>
  <div class="main-container">
    <div class="charitie-name"> 
    <img :src="this.imageUrl" alt="charitie Image" class="charitie-image" />
    <h2>{{ charitie.name }}</h2>
    <p>{{ charitie.description }}</p>
  </div>

  <div class="profile">
      <img :src="imageProfileUrl" alt="Image de profil" class="profile-image" />
      <h2>{{ username }}</h2>
    </div>

    <div class="charitie-class">
      <input type="number" v-model="donationAmount" placeholder="Enter donation amount">
      <button @click="donate">Donate</button>
    </div>

    <div>
      <div>
      <img v-if="likeItemsVisible" src="/src/images/noliked.png" @click="likecharitie" height="50px" width="50px">
      <img v-if="cancelLikeItemsVisible" src="/src/images/like.png" @click="cancelLikecharitie" height="50px" width="50px">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      charitie: {},
      donationAmount: null,
      predefinedReasons: ["I just don't like it", "It's Spam", "Nudity or sexual charitie", "False Information", "Scam or Fraud", "Bullying or harassment", "Something else"],
      showReportForm: false,
      selectedReason: null,
      likeItemsVisible: true,
      cancelLikeItemsVisible: false,
      imageUrl: '', 
      imageProfileUrl: '',
      username: ''
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.fetchcharitieDetails(id);
    this.checkLiked();
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    async likecharitie() {
    try {
      const userId = this.getUser.userId;
      const response = await fetch(`/api/v1/Users/LikeCharitie/${this.charitie.id}/${userId}`, {
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
  async cancelLikecharitie() {
      try {
        const userId = this.getUser.userId;
        const response = await fetch(`/api/v1/Users/CancelLiked/${this.charitie.id}/${userId}`, {
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
        const response = await fetch(`/api/v1/Users/BlockUser/${this.charitie.userId}/${userId}`, {
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
          const requestUri = `/api/v1/Users/ReportUser/${this.charitie.userId}`;
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
    async fetchcharitieDetails(id) {
      try {
        const response = await fetch(`/api/v1/Charities/${id}`);

        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const data = await response.json();
        this.charitie = data;
        await this.getImageUrl(this.charitie.imagesId);
        this.imageProfileUrl = await this.loadProfileImage(this.charitie.userId);
        this.username = await this.getUsername(this.charitie.userId);
      } catch (error) {
        console.error('Error fetching charitie details:', error);
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
    async checkLiked() {
    try {
        const userId = this.getUser.userId;
        const responseLiked = await fetch(`/api/v1/Users/LikedByUsers/${userId}`);

        if (responseLiked.ok) {
            const likedcharities = await responseLiked.json();

            if (likedcharities.includes(this.charitie.id)) {
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
          const requestUri = `/api/v1/Users/ReportUser/${this.charitie.userId}`;
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
    async getStripeSessionUrl(charitieName) {
      try {
        const amountInCents = this.donationAmount * 100;
        const response = await fetch(`/api/v1/Charities/CheckOut/${amountInCents}/${charitieName}`, { method: 'POST' });
        if (!response.ok) {
          throw new Error(`Failed to get Stripe session URL, status: ${response.status}`);
        }
        const data = await response.json();
        window.location.href = data.stripeSessionUrl;
        this.onOrderConfirmation();
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
      this.getStripeSessionUrl(this.charitie.name);
    },
    async onOrderConfirmation() {
    if (this.currentUrl.includes("OrderConfirmation")) {
      await this.updateUsersDonation();
      await this.incrementPoint();
    }
  },
  async updateUsersDonation() {
    try {
      const loginUserId = this.getUser.userId;
      const charitieID = this.charitie.id;
      
      const updateModel = {
        usersDonationId: loginUserId,
        currency: this.currency
      };

      const response = await axios.put(`/api/v1/Charities/UpdateUsersDonation/${charitieID}`, updateModel);
      
      if (response.status === 200) {
        this.$emit('success', 'Your donation was made successfully');
      } else {
        this.$emit('error', 'Failed to update donation information');
      }
    } catch (error) {
      console.error('Error updating donation information:', error);
      this.$emit('error', 'Failed to update donation information');
    }
  },
  async incrementPoint() {
    try {
      const loginUserId = this.getUser.userId;
      const response = await axios.put(`/api/v1/Users/IncrementPoint/${loginUserId}`);
      
      if (response.status === 200) {
        console.log("True");
      } else {
        console.log("False");
      }
    } catch (error) {
      console.error('Error incrementing point:', error);
    }
  },
  },
};
</script>

<style scoped> 

.main-container {
  background-color: #DD3CD6;
}

.charitie-name {
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.charitie-image {
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

.charitie-class{
  margin: 15px;
}


</style>
