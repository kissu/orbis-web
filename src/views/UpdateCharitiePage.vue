<template>
    <div class="main-container">
      <div>
        <form @submit.prevent="publishCharitie" class="form-container">
          <div className="row text-start">
            <div className="col-lg-6">
              <div className="form-group">
                <label>
                  Enter name: <span className="text-danger">*</span>
                </label>
                <input type="text" id="name" v-model="selectedCharitie.name" class="input" placeholder="Enter name" required />
  
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label>
                  Select category: <span className="text-danger">*</span>
                </label>
                <select id="category" v-model="newCharitie.categoryId" class="input" required>
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
  
          <div className="row text-start">
            <label className="col-form-label col-md-12">
            </label>
            <div className="col-md-12">
              <textarea id="description" v-model="selectedCharitie.description" class="input" placeholder="Enter description"
                required></textarea>
            </div>
          </div>
  
          <ul>
            <li v-for="suggestion in suggestions" :key="suggestion" class="suggestion-item">
              {{ suggestion }}
            </li>
          </ul>
  
          <label for="image" class="image-upload">
            <img v-if="newCharitie.selectedImage" :src="newCharitie.selectedImageURL" alt="Selected Image"
              class="upload-icon" />
            <span v-else>
              <img src="/src/images/camera.png" alt="Upload Image" class="upload-icon" />
            </span>
          </label>
          <input type="file" id="image" @change="handleImageChange" accept="image/*" class="input"
            style="display: none;" />
  
          <button type="submit" class="submit-button">Publish Charitie</button>
  
        </form>
      </div>
    </div>
  </template>
  
  <script>
  
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newCharitie: {
          name: "",
          categoryId: null,
          description: "",
          selectedImage: null,
          selectedImageURL: null,
          categoriesId: null,
        },
        selectedCharitie: {
          name: "", 
          description: "",
        },
        categories: [],
      };
    },
    mounted() {
      this.fetchCategories();
      this.loadSelectedCharitie();
    },
    methods: {
      async loadSelectedCharitie() {
        try {
          const CharitieId = this.$route.params.id; 
          const response = await axios.get(`/api/v1/Charities/${CharitieId}`);
          this.selectedCharitie = response.data;
        } catch (error) {
          console.error('Error loading selected Charitie:', error);
        }
      },
      async uploadImage() {
        try {
          const data = {
            "id": 0,
            "category_id": 2,
            "blob": this.newCharitie.selectedImageURL.split(',')[1]
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
  
        this.newCharitie.selectedImage = file;
  
        const reader = new FileReader();
        reader.onload = () => {
          this.newCharitie.selectedImageURL = reader.result;
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
      async publishCharitie() {
    try {
      const imageId = await this.uploadImage();
  
      this.newCharitie.image_id = imageId;
      this.newCharitie.categoriesId = this.newCharitie.categoryId;
      this.newCharitie.description = this.selectedCharitie.description;
      this.newCharitie.name = this.selectedCharitie.name;
      this.newCharitie.groupId = 2;
      this.newCharitie.blob = "10";
  
      const CharitieId = this.$route.params.id; 
  
      const url = `/api/v1/Charities/${CharitieId}`; 
  
      const requestOptions = {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newCharitie),
      };
  
      const response = await fetch(url, requestOptions);
  
      if (!response.ok) {
        alert("Not updated");
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
  
      alert("Updated successfully");
  
      this.$router.go(-1);
    } catch (error) {
      console.error('Error updating Charitie:', error);
    }
  }, 
  },
  };
  </script>
  
  <style scoped>
  .main-container {
    background-color: #DD3CD6;
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
    background-color: #DD3CD6;
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