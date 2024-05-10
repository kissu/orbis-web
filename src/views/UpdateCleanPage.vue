<template>
    <div class="main-container">
      <div>
        <form @submit.prevent="publishClean" class="form-container">
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label>
                  Enter name: <span class="text-danger">*</span>
                </label>
                <input type="text" id="name" v-model="selectedClean.name" class="input" placeholder="Enter name" required />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label>
                  Enter description: <span class="text-danger">*</span>
                </label>
                <textarea id="description" v-model="selectedClean.description" class="input" placeholder="Enter description" required></textarea>
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
  
          <button type="submit" class="submit-button">Publish Clean</button>
  
        </form>
      </div>
    </div>
  </template>
  
  <script>
  
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newClean: {
          name: "",
          categoryId: null,
          description: "",
          maxParticipants: 0,
          location: "",
          startDate: "",
          endDate: "",
          selectedImage: null,
          selectedImageURL: null,
          categoriesId: null,
        },
        selectedClean: {
          name: "", 
          description: "",
          location: "",
        },
        categories: [],
      };
    },
    mounted() {
      this.fetchCategories();
      this.loadSelectedClean();
    },
    methods: {
      async loadSelectedClean() {
        try {
          const CleanId = this.$route.params.id; 
          const response = await axios.get(`/api/v1/Clean/${CleanId}`);
          this.selectedClean = response.data;
        } catch (error) {
          console.error('Error loading selected Clean:', error);
        }
      },
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
      async fetchCategories() {
        try {
          const response = await fetch('/api/v1/Categories/all');
          if (!response.ok) {
            throw new Error(`Network response was not ok, status: ${response.status}`);
          }
          const data = await response.json();
          this.categories = data;
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      },
      async publishClean() {
    try {
      const imageId = await this.uploadImage();
  
      this.newClean.image_id = imageId;
      this.newClean.categoriesId = this.newClean.categoryId;
      this.newClean.location = this.selectedClean.location;
      this.newClean.description = this.selectedClean.description;
      this.newClean.maxParticipants = parseInt(this.selectedClean.MaxJoin);
      this.newClean.startDate = this.selectedClean.startDate;
      this.newClean.endDate = this.selectedClean.endDate;
      this.newClean.name = this.selectedClean.name;
      this.newClean.groupId = 2;
      this.newClean.blob = "10";
  
      const CleanId = this.$route.params.id; 
  
      const url = `/api/v1/Clean/${CleanId}`; 
  
      const requestOptions = {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newClean),
      };
  
      const response = await fetch(url, requestOptions);
  
      if (!response.ok) {
        alert("Not updated");
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
  
      alert("Updated successfully");
  
      this.$router.go(-1);
    } catch (error) {
      console.error('Error updating Clean:', error);
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
    color: white;
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
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
    margin: auto;
    width: 300px;
    height: 45px;
    margin-top: 15px;
  }
  </style>