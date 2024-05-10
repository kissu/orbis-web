<template>
  <div class="main-container"> 
    <div class="clean-name">
      <img :src="this.imageUrl" alt="clean Image" class="clean-image" />
      <h2>{{ clean.name }}</h2>
      <p>{{ clean.description }}</p>
    </div>

    <div class="profile">
      <img :src="imageProfileUrl" alt="Image de profil" class="profile-image" />
      <h2>{{ username }}</h2>
    </div>

    <div class="image-container">
      <label for="image" class="image-upload">
        <img v-if="selectedImage" :src="selectedImageURL" alt="Selected Image" class="upload-icon" style="max-width: 150px; max-height: 150px;"/>
        <span v-else>
          <img src="/src/images/camera.png" alt="Upload Image" class="upload-icon" />
        </span>
      </label>
      <input type="file" id="image" @change="handleImageChange" accept="image/*" class="input" style="display: none;" />
    </div>
    <button class="submit-button" @click="sendCleaned">Send</button>

    <div>
      <img v-if="likeItemsVisible" src="/src/images/noliked.png" @click="likeclean" height="50px" width="50px">
      <img v-if="cancelLikeItemsVisible" src="/src/images/like.png" @click="cancelLikeclean" height="50px" width="50px">
    </div>

    <div>
      <img src="/src/images/block.png" height="50px" width="50px">
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
        clean: {},
        selectedFile: null,
        selectedImage: null,
        selectedImageURL: null,
        predefinedReasons: ["I just don't like it", "It's Spam", "Nudity or sexual clean", "False Information", "Scam or Fraud", "Bullying or harassment", "Something else"],
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
      this.fetchcleanDetails(id);
      this.checkLiked();
    },
    computed: {
    ...mapGetters(['getUser']),
  },
    methods: {
      async likeclean() {
    try {
      const userId = this.getUser.userId;
      const response = await fetch(`/api/v1/Users/LikeClean/${this.clean.id}/${userId}`, {
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
  async cancelLikeclean() {
      try {
        const userId = this.getUser.userId;
        const response = await fetch(`/api/v1/Users/CancelLiked/${this.clean.id}/${userId}`, {
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
    async toggleReportForm() {
      this.showReportForm = !this.showReportForm;
    },
    async submitReport() {
      try {
        if (this.selectedReason) {
          const requestUri = `/api/v1/Users/ReportUser/${this.clean.userId}`;
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
    async checkLiked() {
    try {
        const userId = this.getUser.userId;
        const responseLiked = await fetch(`/api/v1/Users/LikedByUsers/${userId}`);

        if (responseLiked.ok) {
            const likedclean = await responseLiked.json();

            if (likedclean.includes(this.clean.id)) {
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
  async uploadImage() {
      try {
        const data = {
          "id": 0,
          "category_id": 2,
          "blob": this.selectedImageURL.split(',')[1]
        }
        const response = await axios.post('/api/v1/Images', data);
        console.log("response",response)
        return response.data.id;
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    },
    handleImageChange(event) {
      const file = event.target.files[0];

      this.selectedImage = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageURL = reader.result;
      };
      reader.readAsDataURL(file);
    },
    async sendCleaned() {
  try {
    const imageId = await this.uploadImage();
    const userId = this.getUser.userId;

    const imageIdsArray = Array.isArray(imageId) ? imageId : [imageId];

    imageIdsArray.push(userId);

    const response = await fetch(`/api/v1/Clean/UpdateCleanImagesId/${this.clean.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageIdsArray),
    });

    if (!response.ok) {
      alert("Not published");
      throw new Error(`Network response was not ok, status: ${response.status}`);
    }

    const data = await response.json();
    alert("Published successfully");
  } catch (error) {
    console.error('Error publishing clean:', error);
    alert("Published successfully");
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
      async fetchcleanDetails(id) {
        try {
          const response = await fetch(`/api/v1/clean/${id}`);
  
          if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
          }
  
          const data = await response.json();
          this.clean = data;
          await this.getImageUrl(this.clean.imagesId);
          this.imageProfileUrl = await this.loadProfileImage(this.clean.userId);
          this.username = await this.getUsername(this.clean.userId);
        } catch (error) {
          console.error('Error fetching clean details:', error);
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
}

.clean-name {
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.image-container {
  display: flex;
  flex-direction: column;
  align-items: center; 
}

.submit-button {
  background-color: darkorange;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 15px; 
  cursor: pointer;
  text-align: center;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 150px;
  height: 35px;
}

.clean-image {
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