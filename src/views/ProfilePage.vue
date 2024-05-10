<template>
  <div class="main-container">
    <h1>Profile Page</h1>
    <div v-if="user">
      <p>Username: {{ user.userName }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Number: {{ user.number }}</p>
      <button @click="showPhoneNumberInput">Change Number</button>
      <input v-model="newPhoneNumber" placeholder="New Phone Number" class="input-field" v-if="showPhoneNumber" required/>
      <input v-model="enterCode" placeholder="Verification Code" class="input-field" v-if="showEnterCodeInput" required/>
      <button @click="changeNumber" v-if="showValidateButton">Validate</button>
      <p>Admin: {{ user.admin }}</p>
    </div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      verificationCode: '',
      enterCode: '',
      showEnterCodeInput: false,
      showPhoneNumber: false,
      newPhoneNumber: '',
      showValidateButton: false 
    };
  },
  computed: {
    ...mapGetters(['getUser']),
    user() {
      return this.getUser;
    },
  },
  methods: {
    async verifyCode() {
      try {
        const response = await fetch('/api/v1/Users/VerifyPhoneNumber', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            enteredCode: this.enterCode,
            verificationCode: this.verificationCode
          })
        });

        if (response.ok) {
          this.enterCode = '';
          this.showEnterCodeInput = false;
          return true; 
        } else {
          console.error('Failed to verify code:', response.statusText);
          return false; 
        }
      } catch (error) {
        console.error('Failed to verify code:', error);
        return false; 
      }
    },
    async changeNumber() {
      try {
        if (!this.showEnterCodeInput) {
          this.verificationCode = this.generateVerificationCode();
          const apiUrl = '/api/v1/Users/VerificationCodeNumber';
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              enteredCode: this.enterCode,
              verificationCode: this.verificationCode,
              phoneNumber: this.newPhoneNumber
            })
          });

          if (response.ok) {
            this.showEnterCodeInput = true;
            this.showValidateButton = true; 
            return await response.json();
          } else {
            const errorMessage = await response.text();
            console.error('Failed to validate verification code:', errorMessage);
            return false;
          }
        } else {
          const isCodeValid = await this.verifyCode();
          if (!isCodeValid) {
            alert("Verification code is not valid or has expired.");
          } else {
            this.changePhoneNumber(); 
          }
        }
      } catch (error) {
        console.error('Failed to change number:', error);
      }
    },
    async changePhoneNumber() {
      try {
        const userId = this.getUser.userId;
        const newPhoneNumber = this.newPhoneNumber;
        const response = await axios.put(`/api/v1/Users/ChangePhoneNumber/${userId}`, null, {
          params: {
            number: newPhoneNumber 
          }
        });
        if (response.status === 200) {
          alert('Phone number updated successfully');
          this.newPhoneNumber = '';
          this.showPhoneNumber = false;
          this.showValidateButton = false;
        } else {
          alert('Failed to update phone number:', response.data);
        }
      } catch (error) {
        console.error('Failed to update phone number:', error);
      }
    },
    generateVerificationCode() {
      return Math.random().toString(36).substring(2, 8);
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/logout');
    },
    showPhoneNumberInput() {
      this.showPhoneNumber = true;
      this.showValidateButton = true;
    },
  }
});
</script>

<style>

.main-container {
  text-align: center;
}

</style>
