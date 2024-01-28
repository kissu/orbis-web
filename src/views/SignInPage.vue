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

    <label for="password">Password</label>
    <div style="display: flex; align-items: center;">
    <input type="text" id="password" v-model="password" :type="showPassword ? 'text' : 'password'" />
    <input type="checkbox" @change="togglePasswordVisibility" />
    </div>

    <label for="confirmPassword">Confirm password</label>
    <div style="display: flex; align-items: center;">
    <input type="text" id="confirmPassword" v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'confirmPassword'" />
    <input type="checkbox" v-model="showConfirmPassword" />
    </div>

    <button @click="register" class="register-button">Register</button>
    
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
      password: '',
      showPassword: false,
      confirmPassword: '',
      showConfirmPassword: false,
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
    register() {
      if (!this.email || !this.username || !this.password || !this.confirmPassword) {
        alert("Something is wrong");
        return;
      }

      if (!this.email.includes('@') || !this.email.includes('.')) {
        alert("Invalid email");
        return;
      }

      if (this.password.length < 5) {
        alert("Your password is too short");
        return;
      }

      if (this.password !== this.confirmPassword) {
        alert("Password and confirmation password do not match");
        return;
      }

      const accountExists = this.checkIfAccountExists();
      if (accountExists) {
        alert("You already have an account");
        return;
      }

      alert("Registration successful");
    },
    async checkIfAccountExists() {
      try {
        const apiUrl = `/api/v1/users/GetUserByEmail/${this.email}`;
        const response = fetch(apiUrl);

        if (response.ok) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error(`Account Existence Check Error: ${error.message}`);
        return false;
      }
    },
    signOut() {
        
    },
    deleteAccount() {
        
    },
    openImageInput() {
    this.$refs.imageInput.click();
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
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

.chosen-image {
  width: 100px;
  height: 100px;
  margin: 5px;
}

</style>

