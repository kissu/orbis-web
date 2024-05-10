<template>
  <div>
    <label for="image" class="image-upload">
      <img v-if="selectedImage" :src="selectedImageURL" alt="Selected Image" class="upload-icon" style="max-width: 150px; max-height: 150px;" />
      <span v-else>
        <img src="/src/images/camera.png" alt="Upload Image" class="upload-icon" />
      </span>
    </label>
    <input type="file" id="image" @change="handleImageChange" accept="image/*" class="input" style="display: none;" />

    <input v-model="email" placeholder="Email" class="input-field" required/>
    <input v-model="name" placeholder="Name" class="input-field" required/>
    <input v-model="password" placeholder="Password" type="password" class="input-field" required/>
    <input v-model="confirmPassword" placeholder="Confirm password" type="password" class="input-field" required/>
    <input v-model="enterCode" placeholder="Verification Code" class="input-field" v-if="showEnterCodeInput" required/>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import { sha512 } from 'js-sha512'; 
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      verificationCode: '',
      enterCode: '',
      showEnterCodeInput: false,
      verificationEmailSent: false,
      selectedImage: null,
      selectedImageURL: null,
    };
  },
  methods: {
    async uploadImage() {
      try {
        const data = {
          "id": 0,
          "category_id": 2,
          "blob": this.selectedImageURL.split(',')[1]
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

      this.selectedImage = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageURL = reader.result;
      };
      reader.readAsDataURL(file);
    },
    async validateVerificationCode() {
      try {
        const apiUrl = '/api/v1/Users/ValidateVerificationCode'; 

        const response = await axios.post(apiUrl, {
          enteredCode: this.enterCode,
          verificationCode: this.verificationCode
        });

        if (response.status === 200) {
          return response.data; 
        } else {
          console.error('Failed to validate verification code:', response.statusText);
          return false;
        }
      } catch (error) {
        console.error('Error validating verification code:', error);
        return false;
      }
    },
    async sendVerificationEmail() {
      try {
        this.verificationCode = this.generateVerificationCode() 
        const apiUrl = '/api/v1/Users/SendVerificationCodeEmail'; 
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            recipientEmail: this.email,
            userName: this.name,
            body: this.verificationCode
          })
        });
        if (response.ok) {
          alert('Verification email sent successfully');
        } else {
          const errorData = await response.json();
          console.error('Error sending verification email:', errorData);
          alert('Error sending verification email');
        }
      } catch (error) {
        console.error('Error sending verification email request:', error);
        alert('Error sending verification email request');
      }
    },
    generateVerificationCode() {
      return Math.random().toString(36).substring(2, 8);
    },
    async register() {
      try {
        if (this.password !== this.confirmPassword) {
          alert("Password and confirm password do not match");
          return;
        }

        if (this.showEnterCodeInput) {
          const isCodeValid = await this.validateVerificationCode();
          if (!isCodeValid) {
            alert("Verification code is not valid or has expired.");
            return;
          }
        }

        if (!this.verificationEmailSent) {
          await this.sendVerificationEmail();
          this.verificationEmailSent = true;
          this.showEnterCodeInput = true; 
          return;
        }

        const imageId = await this.uploadImage();
        const identityId = this.generateGuid();
        const salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const passwordSalted = this.password + salt;
        const passwordHash = sha512(passwordSalted);

        const apiUrl = '/api/v1/Users/AuthenticateWithEmailPasswordWeb';
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Email: this.email, 
            Name: this.name,
            Modified_by: this.password,
            PasswordHash: passwordHash, 
            PasswordSalt : salt, 
            IdentityId: identityId,
            Image_id: imageId,
          })
        });

        if (response.ok) {
          alert("Registration successful!");
          this.$router.push('/logout'); 
        } else {
          const errorData = await response.json();
          console.error('API Error:', errorData);
          alert("Registration failed: " + errorData.message);
        }
      } catch (error) {
        console.error('Fetch Error:', error);
        alert("Registration failed: " + error.message);
      }
    },
    generateGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }
};
</script>


<style scoped>

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #ffd700;
  }

  .input-field {
    width: 300px;
    height: 35px;
    margin: 5px 0; 
    padding: 5px;
    border: 1px solid #404040;
    border-radius: 5px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  input {
    width: 300px;
    height: 35px;
    margin: 10px;
    padding: 5px;
    border: 1px solid #404040;
    border-radius: 5px;
  }

  input[type="password"] {
    width: 300px;
  }

  button {
    width: 270px;
    height: 45px;
    margin: 10px;
    padding: 5px;
    border: none;
    border-radius: 25px;
    background-color: darkorange;
    color: white;
    cursor: pointer;
  }

  label {
    font-size: 12px;
    margin: 10px;
    text-align: center;
    color: black;
  }

  label a {
    color: darkorange;
    text-decoration: none;
  }

  div {
    background: radial-gradient(#ffffff, #ffd700);
    height: 100%; 
    width: 197vh;
  }

  .skottie-view {
    height: 150px;
    width: 150px;
    margin-bottom: 20px;
  }

  #VerificationCodeEntry {
    width: 300px;
    margin: 30px 0 0 0;
  }

  #ValidateCode {
    width: 200px;
    margin: 5px;
  }

  .action-label {
    font-size: 14px;
    text-align: center;
    color: darkorange;
    margin: 0 0 10px 0;
    cursor: pointer;
  }

  .separator-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    margin: 50px 0 0 0;
  }

  .separator-line {
    height: 10px;
    background-color: black;
  }

  .separator-label {
    font-size: 15px;
    text-align: center;
    color: orangered;
  }

  .image-stack {
    display: flex;
    justify-content: center;
    flex-direction: row; 
  }

  .action-image {
    width: 50px;
    height: 50px;
    margin: 10px;
    cursor: pointer;
  }

</style>
