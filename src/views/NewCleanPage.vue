<template>
    <div class="main-container"> 
  <div>
    <form @submit.prevent="publishActivity" class="form-container">

      <input type="text" id="name" v-model="newActivity.name" class="input" placeholder="Enter name" required />

      <select id="category" v-model="newActivity.categoryId" class="input" required>
        <option v-for="category in categories" :key="category.id" :value="category.id" >
          {{ category.name }}
        </option>
      </select>

      <input
        v-model="newActivity.location"
        placeholder="Enter location"
        @input="onTextChanged"
        :style="{ color: textColor }"
        class="input" />

    <ul>
      <li v-for="suggestion in suggestions" :key="suggestion" class="suggestion-item">
        {{ suggestion }}
      </li>
    </ul>

        <textarea id="description" v-model="newActivity.description" class="input" placeholder="Enter description" required></textarea>
        <input type="number" id="maxParticipants" v-model="newActivity.maxParticipants" class="input" placeholder="Enter max participants" required />
        <input type="date" id="startDate" v-model="newActivity.startDate" class="input" required />
        <input type="date" id="endDate" v-model="newActivity.endDate" class="input" required />

        <label for="image" class="image-upload">
    <img v-if="newActivity.selectedImage" :src="newActivity.selectedImageURL" alt="Selected Image" class="upload-icon" />
    <span v-else>
      <img src="/src/images/camera.png" alt="Upload Image" class="upload-icon" />
    </span>
  </label>
  <input type="file" id="image" @change="handleImageChange" accept="image/*" class="input" style="display: none;" />

        <button type="submit" class="submit-button">Publish Activity</button>

    </form>
  </div>
  </div>
</template>

<script>
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
        const formData = new FormData();
        formData.append('image', this.newActivity.selectedImage);

        const response = await fetch('/api/v1/Images', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'charset': 'utf-8'},
            body: formData,
        });

        if (!response.ok) {
          console.error('JJJJJJJJJJJJJJJJJJJJJJJJ:', response);
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

this.newActivity.imageId = imageId;

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
        alert("published successfully")
      } catch (error) {
        console.error('Error publishing activity:', error);
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  background-color: #34CF1D;
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
  border-radius: 15px; 
  cursor: pointer;
  text-align: center;
  margin: auto;
  width: 300px;
  height: 45px;
}

</style>