<template>
  <div class="main-container">
    <div>
      <form @submit.prevent="publishcharitie" class="form-container">
        <div className="row text-start">
          <div className="col-lg-6">
            <div className="form-group">
              <label>
                Enter name: <span className="text-danger">*</span>
              </label>
              <input type="text" id="name" v-model="newcharitie.name" class="input" placeholder="Enter name" required />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>
                Select category: <span className="text-danger">*</span>
              </label>
              <select id="category" v-model="newcharitie.categoryId" class="input" required>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="row text-start">
        </div>
        <div className="row text-start">
        </div>

        <div className="row text-start">
          <label className="col-form-label col-md-12">
          </label>
          <div className="col-md-12">
            <textarea id="description" v-model="newcharitie.description" class="input" placeholder="Enter description"
              required></textarea>
          </div>
        </div>

        <ul>
          <li v-for="suggestion in suggestions" :key="suggestion" class="suggestion-item">
            {{ suggestion }}
          </li>
        </ul>

        <label for="image" class="image-upload">
          <img v-if="newcharitie.selectedImage" :src="newcharitie.selectedImageURL" alt="Selected Image"
            class="upload-icon" />
          <span v-else>
            <img src="/src/images/camera.png" alt="Upload Image" class="upload-icon" />
          </span>
        </label>
        <input type="file" id="image" @change="handleImageChange" accept="image/*" class="input"
          style="display: none;" />

        <button type="submit" class="submit-button">Publish charitie</button>

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
    newcharitie: {
      name: "",
      categoryId: null,
      description: "",
      startDate: "",
      endDate: "",
      selectedImage: null,
      selectedImageURL: null,
      categoriesId: null,
    },
    categories: [], 
  };
},
mounted() {
  this.fetchCategories();
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
          "blob": this.newcharitie.selectedImageURL.split(',')[1]
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

    this.newcharitie.selectedImage = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.newcharitie.selectedImageURL = reader.result;
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
  async publishcharitie() {
    try {
      const imageId = await this.uploadImage();
      const userId = this.getUser.userId;
      this.newcharitie.userId = userId;
      this.newcharitie.imageId = imageId;

      this.newcharitie.categoriesId = this.newcharitie.categoryId;

      const response = await fetch('/api/v1/charities', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newcharitie),
      });

      if (!response.ok) {
        alert("No published");
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }

      const data = await response.json();
      alert("published successfully");
      this.$router.go(-1);
    } catch (error) {
      console.error('Error publishing charitie:', error);
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
border-radius: 25px; 
cursor: pointer;
text-align: center;
margin: auto;
width: 300px;
height: 45px;
margin-top: 15px;
}

</style>