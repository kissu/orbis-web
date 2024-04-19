<template>
  <div class="main-container">
    <div>
      <form @submit.prevent="publishActivity" class="form-container">
        <div className="row text-start">
          <div className="col-lg-6">
            <div className="form-group">
              <label>
                Enter name: <span className="text-danger">*</span>
              </label>
              <input type="text" id="name" v-model="newActivity.name" class="input" placeholder="Enter name" required />

            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>
                Select category: <span className="text-danger">*</span>
              </label>
              <select id="category" v-model="newActivity.categoryId" class="input" required>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="row text-start">
          <div className="col-lg-6">
            <div className="form-group">
              <label>
                Enter location: <span className="text-danger">*</span>
              </label>

              <input v-model="newActivity.location" placeholder="Enter location" @input="onTextChanged"
                :style="{ color: textColor }" class="input" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>
                Max participants: <span className="text-danger">*</span>
              </label>
              <input type="number" id="maxParticipants" v-model="newActivity.MaxJoin" class="input"
                placeholder="Enter max participants" required />
            </div>
          </div>
        </div>
        <div className="row text-start">
          <div className="col-lg-6">
            <div className="form-group">
              <label>
                Start Date: <span className="text-danger">*</span>
              </label>

              <input type="date" id="startDate" v-model="newActivity.startDate" class="input" required />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label>
                End Date: <span className="text-danger">*</span>
              </label>

              <input type="date" id="endDate" v-model="newActivity.endDate" class="input" required />

            </div>
          </div>
        </div>

        <div className="row text-start">
          <label className="col-form-label col-md-12">
          </label>
          <div className="col-md-12">
            <textarea id="description" v-model="newActivity.description" class="input" placeholder="Enter description"
              required></textarea>
          </div>
        </div>

        <ul>
          <li v-for="suggestion in suggestions" :key="suggestion" class="suggestion-item">
            {{ suggestion }}
          </li>
        </ul>

        <label for="image" class="image-upload">
          <img v-if="newActivity.selectedImage" :src="newActivity.selectedImageURL" alt="Selected Image"
            class="upload-icon" />
          <span v-else>
            <img src="/src/images/camera.png" alt="Upload Image" class="upload-icon" />
          </span>
        </label>
        <input type="file" id="image" @change="handleImageChange" accept="image/*" class="input"
          style="display: none;" />

        <button type="submit" class="submit-button">Publish Activity</button>

      </form>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      newActivity: {
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
      categories: [],
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async uploadImage() {
      try {
        const data = {
          "id": 0,
          "category_id": 2,
          "blob": this.newActivity.selectedImageURL.split(',')[1]
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

      this.newActivity.selectedImage = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.newActivity.selectedImageURL = reader.result;
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
    async publishActivity() {
      try {
        const imageId = await this.uploadImage();

        this.newActivity.image_id = imageId;
        this.newActivity.categoriesId = this.newActivity.categoryId;

        const response = await fetch('/api/v1/Activities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newActivity),
        });

        if (!response.ok) {
          alert("No published");
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const data = await response.json();
        alert("published successfully");
        this.$router.go(-1);
      } catch (error) {
        console.error('Error publishing activity:', error);
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  background-color: #fdb213;
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
  background-color: #fdb213;
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