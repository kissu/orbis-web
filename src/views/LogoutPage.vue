<template>
  <div>
    <lottie :options="defaultOptions" :width="200" :height="200" />
    <input v-model="email" placeholder="Email" class="input-field" required/>
    <input v-model="password" placeholder="Password" type="password" class="input-field" required/>
    <button class="button" @click="login">Login</button>

    <label @click="forgotPassword" class="forget-label">
      Forget password?
    </label>

    <label @click="signIn" class="action-label">
      New user? Register now
    </label>

    <div class="separator-grid">
      <div class="separator-line"></div>
      <label class="separator-label">Use other method</label>
      <div class="separator-line"></div>
    </div>

    <div class="image-stack">
      <img @click="googleClicked" src="/src/images/microsoft.png" alt="Microsoft" class="action-image" />
      <img @click="appleClicked" src="/src/images/apple_logo.png" alt="Apple" class="action-image" />
      <img @click="googleClicked" src="/src/images/google.png" alt="Google" class="action-image" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Lottie from 'vue3-lottie';
import animationData from "@/assets/animations/OrbisWorld.json";

export default defineComponent({
  components: {
    Lottie,
  },
  data() {
    return {
      defaultOptions: {
        animationData: animationData,
      },
      email: '',
      password: '',
    };
  },
  methods: {
    signIn() {
      this.$router.push('/signin'); 
    },
    async login() {
    try {
        const blockedUntil = localStorage.getItem('blockedUntil');
        if (blockedUntil && new Date(blockedUntil) > new Date()) {
            alert('Too many login attempts. Please try again later.');
            return;
        }

        const apiUrl = '/api/v1/users/RecoverWithEmailPassword';
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'email': this.email,
                'password': this.password,
            }),
        });

        if (response.ok) {
            localStorage.removeItem('loginAttempts');

            const user = await response.json();
            this.$store.commit('setUser', user);
            localStorage.setItem('user', JSON.stringify(user));
            this.$router.go(-1);
            return { success: true };
        } else {
            let loginAttempts = localStorage.getItem('loginAttempts');
            loginAttempts = loginAttempts ? parseInt(loginAttempts) + 1 : 1;
            localStorage.setItem('loginAttempts', loginAttempts);

            if (loginAttempts >= 5) {
                const blockedUntil = new Date();
                blockedUntil.setMinutes(blockedUntil.getMinutes() + 5);
                localStorage.setItem('blockedUntil', blockedUntil);
            }

            alert("Invalid credentials. Please try again.");
            const errorData = await response.json();
            console.error('API Error:', errorData);
            return { success: false, error: errorData };
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        return { success: false, error: error.message };
    }
  }},
});
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
    height: 50px;
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
