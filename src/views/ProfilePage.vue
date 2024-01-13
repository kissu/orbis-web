<template>
    <div style="display: flex; flex-direction: column; align-items: center;">
      <button class="choose-image" @click="chooseImage" style="margin-top: 20px; margin-bottom: 10px;">Choose Image</button>
      <img :src="image" alt="Selected Image" v-if="image" />

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
      // Format the created date as desired
      return `${this.createdDate.getDate()}/${this.createdDate.getMonth() + 1}/${this.createdDate.getFullYear()}`;
    },
  },
  methods: {
    chooseImage() {
      // Logic to choose an image from the gallery
      // You may use a library or a file input for this
    },
    save() {
      // Logic to save data
    },
    signOut() {
      // Logic for signing out
    },
    deleteAccount() {
      // Logic for deleting the account
    },
  },
};
</script>

<style>
/* Add your styles here */
.choose-image {
  background-color: DarkOrange;
  color: White;
  padding: 10px;
  border: none;
  border-radius: 5px;
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

