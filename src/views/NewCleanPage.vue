<template>
  <div class="main-container">
    <div>
      <form @submit.prevent="publishClean" class="form-container">
        <div class="row text-start">
          <div class="col-lg-6">
            <div class="form-group">
              <label class="align-label">
                Enter name: <span class="text-danger">*</span>
              </label>
              <input type="text" id="name" v-model="newClean.name" class="input" placeholder="Enter name" required />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label class="align-label">
                Enter location: <span class="text-danger">*</span>
              </label>
              <input v-model="newClean.location" placeholder="Enter location" @input="onTextChanged" :style="{ color: textColor }" class="input" />
            </div>
          </div>
        </div>
        <div class="row text-start">
          <div class="col-lg-12">
            <div class="form-group">
              <label class="align-label">
                Enter description: <span class="text-danger">*</span>
              </label>
              <textarea id="description" v-model="newClean.description" class="input" placeholder="Enter description" required></textarea>
            </div>
          </div>
        </div>

        <ul>
          <li v-for="suggestion in suggestions" :key="suggestion" class="suggestion-item">
            {{ suggestion }}
          </li>
        </ul>

        <label for="image" class="image-upload">
          <img v-if="newClean.selectedImage" :src="newClean.selectedImageURL" alt="Selected Image"
            class="upload-icon" />
          <span v-else>
            <img src="/src/images/camera.png" alt="Upload Image" class="upload-icon" />
          </span>
        </label>
        <input type="file" id="image" @change="handleImageChange" accept="image/*" class="input"
          style="display: none;" />

        <button type="submit" class="submit-button">Publish clean</button>

      </form>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      newClean: {
        name: "",
        description: "",
        location: "",
        selectedImage: null,
        selectedImageURL: null,
        startDate: "",
        endDate: "",
      },
    };
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    async uploadImage() {
      try {
        const data = {
          "id": 0,
          "category_id": 2,
          "blob": this.newClean.selectedImageURL.split(',')[1]
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

      this.newClean.selectedImage = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.newClean.selectedImageURL = reader.result;
      };
      reader.readAsDataURL(file);
    },
    async publishClean() {
      try {
        const imageId = await this.uploadImage();
        const userId = this.getUser.userId;
        this.newClean.userId = userId;
        this.newClean.imageId = imageId;

        const response = await fetch('/api/v1/Clean', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.newClean),
        });

        if (!response.ok) {
          alert("No published");
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const data = await response.json();
        alert("published successfully");
        this.$router.go(-1);
      } catch (error) {
        console.error('Error publishing clean:', error);
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  background-color: #34CF1D;
  text-align: center;
}

.upload-icon {
  max-width: 10%;
  height: 20%; 
}

.form-container {
  display: flex;
  flex-direction: column;
}

.label {
  margin-top: 10px;
  color: white;
}

.input {
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
  background-color: #34CF1D; 
  color: white; 
  border: 1px solid white; 
  height: 35px;
}

.input::placeholder {
  color: white;
}

.suggestions {
  list-style: none;
  padding: 0;
}

.suggestion-item {
  color: white;
}

.submit-button {
  background-color: darkorange;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 25px; 
  cursor: pointer;
  text-align: center;
  margin: auto;
  width: 300px;
  height: 45px;
  margin-top: 15px;
}

</style>