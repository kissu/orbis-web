<template>
    <div style="display: flex; flex-direction: column; align-items: center;">
      <input type="file" ref="imageInput" style="display: none" @change="handleImageChange" />
    <button class="choose-image-button" @click="openImageInput">Choose Image</button>
    
    <img v-if="image" :src="image" class="chosen-image" />
      <button class="choose-image-button" @click="chooseImageClicked">
        Choose Image
      </button>
      
      <img v-if="image" :src="image" class="chosen-image" />
      <img v-if="selectedImage" :src="selectedImage" alt="Selected Image" width="100" height="100" />

      <label for="username">Username</label>
      <input type="text" id="username" v-model="username" />

      <label for="email">Email</label>
      <input type="text" id="email" v-model="email" />

      <p>Created from: {{ createdDateFormatted }}</p>

    <skia-lottie-view
      v-if="loading"
      source="Loading.json"
      repeat-count="-1"
      height-request="250"
      width-request="250"
    ></skia-lottie-view>

    <button @click="save" class="save-button">Save</button>
    <button @click="signOut" class="sign-out-button">Sign out</button>
    <button @click="deleteAccount" class="delete-account-button">Delete account</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: null,
      username: "",
      email: "",
      createdDate: new Date(),
      loading: false,
    };
  },
  computed: {
    createdDateFormatted() {
      return `${this.createdDate.getDate()}/${this.createdDate.getMonth() + 1}/${this.createdDate.getFullYear()}`;
    },
  },
  methods: {
    chooseImage() {

    },
    save() {
      if (!this.email || !this.username) {
        alert("Something is wrong");
        return;
      }

      if (!this.email.includes('@') || !this.email.includes('.')) {
        alert("Invalid email");
        return;
      }

      alert("Registration successful");
    },
    signOut() {
      
    },
    deleteAccount() {
      
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

<style>

.choose-image-button{
    margin: 20px;
    padding: 15px;
    background: linear-gradient(to right, #FF8C00, #FFD700);
    color: #FFFFFF;
    border: none;
    border-radius: 25px;
    width: 150px;
    cursor: pointer;
}

.save-button,
.sign-out-button,
.delete-account-button {
  margin-top: 10px;
  width: 300px;
  height: 50px;
  color: White;
  border: none;
  border-radius: 25px;
  cursor: pointer;
}

.save-button {
  background: linear-gradient(to right, #FF8C00, #FFD700);
}

.sign-out-button {
  background-color: OrangeRed;
}

.delete-account-button {
  background-color: Red;
}
</style>

