<template>
  <div class="main-container"> 
    <div class="activity-name">
      <h2>{{ activity.name }}</h2>
      <p>{{ activity.description }}</p>
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
      <img v-if="likeItemsVisible" src="/src/images/noliked.png" @click="likeActivity" height="50px" width="50px">
      <img v-if="cancelLikeItemsVisible" src="/src/images/like.png" @click="cancelLikeActivity" height="50px" width="50px">
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

  export default {
    props: ['id'],
    data() {
      return {
        activity: {},
        selectedFile: null,
        selectedImage: null,
        selectedImageURL: null,
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
    async toggleReportForm() {
      this.showReportForm = !this.showReportForm;
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
      async uploadImage() {
    try {
        const formData = new FormData();
        formData.append('image', this.selectedImage);

        const response = await fetch('/api/v1/Images', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'charset': 'utf-8'},
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Image upload failed, status: ${response.status}`);
        }

        const data = await response.json();
        return data.imageId; 
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

        const response = await fetch(`/api/v1/Activities/UpdateCleanImagesId/${this.activity.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cleanImagesId: imageId }),
        });

        if (!response.ok) {
          alert("No published");
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const data = await response.json();
        alert("published successfully")
      } catch (error) {
        console.error('Error publishing activity:', error);
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
    },
  };
  </script>
  

<style scoped> 

.main-container {
  background-color: #34CF1D;
}

.activity-name {
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.image-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrer horizontalement les éléments à l'intérieur du conteneur */
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
  width: 150px;
  height: 35px;
}

</style>