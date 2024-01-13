<template>
  <div id="app">
    <search-bar @search="onSearch" />
    <div class="content-container">
      <picker
        v-model="selectedCategory"
        :items="itemCategories"
        item-text="Text"
        item-value="Id"
        label="Categories"
      ></picker>

      <input
        v-model="name"
        class="entry"
        placeholder="Name"
        placeholder-color="Gray"
        :style="{ color: textColor }"
      />
      
      <input
      v-model="userLocation"
      class="entry"
      placeholder="Enter address"
      @input="onTextChanged"
      placeholder-color="Gray"
      :style="{ color: textColor }"
    />

    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="handleFileChange"
    />

    <input type="file" ref="imageInput" style="display: none" @change="handleImageChange" />
    <button class="choose-image-button" @click="openImageInput">Choose Image</button>
    <img v-if="image" :src="image" class="chosen-image" />

      <textarea
        v-model="description"
        class="editor"
        placeholder="Description"
        placeholder-color="Gray"
        :style="{ color: textColor }"
      ></textarea>

      <button class="choose-image-button" @click="chooseImageClicked">
        Choose Image
      </button>
      <img v-if="image" :src="image" class="chosen-image" />

      <img v-if="selectedImage" :src="selectedImage" alt="Selected Image" width="100" height="100" />
      <label class="date-label">Start date</label>
      <date-picker v-model="startDate" :style="{ color: textColor }"></date-picker>
      <time-picker v-model="startTime" :style="{ color: textColor }"></time-picker>

      <label class="date-label">End date</label>
      <date-picker v-model="endDate" :style="{ color: textColor }"></date-picker>
      <time-picker v-model="endTime" :style="{ color: textColor }"></time-picker>

      <input
        v-model="maxParticipants"
        class="entry"
        placeholder="Maximum participant"
        placeholder-color="Gray"
        :style="{ color: textColor }"
      />
      
      <button class="save-button" @click="saveClicked">Save</button>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: null,
      itemCategories: [
        { Id: 1, Text: 'Category1' },
        { Id: 2, Text: 'Category2' },
        { Id: 3, Text: 'Category3' },
      ],
      name: '',
      userLocation: '',
      suggestions: [],
      description: '',
      image: '',
      startDate: new Date(),
      startTime: '',
      endDate: new Date(),
      endTime: '',
      maxParticipants: '',
      loadingViewVisible: false,
    };
  },
  methods: {
    onSearch(query) {
      // Handle search logic
    },
    onTextChanged() {
      // Handle text changed logic
    },
    onItemSelected(suggestion) {
      // Handle item selected logic
    },
    chooseImageClicked() {
      // Handle choose image logic
    },
    saveClicked() {
      // Handle save button clicked logic
    },
    openImageInput() {
    this.$refs.imageInput.click();
  },

  handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = URL.createObjectURL(file);
    }
  },
  },
};
</script>

<style scoped>
#app {
  text-align: center;
  margin-top: 50px;
}

.content-container {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.entry,
.editor,
.choose-image-button,
.date-label,
.save-button {
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  width: 300px;
}

.save-button {
    margin: 20px;
    padding: 15px;
    background: linear-gradient(to right, #FF8C00, #FFD700);
    color: #FFFFFF;
    border: none;
    border-radius: 25px;
    width: 300px;
    cursor: pointer;
}

.save-button:hover {
    background: linear-gradient(to right, #FF4500, #FF8C00);
}

.editor {
  height: 100px;
}

.chosen-image {
  width: 100px;
  height: 100px;
  margin: 5px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  cursor: pointer;
  margin: 5px;
}

</style>
