<template>
    <div>
      <input v-model="email" placeholder="Email" class="input-field" required/>
      <input v-model="password" placeholder="Password" type="password" class="input-field" required/>
      <button @click="login">Login</button>
  

  <label @click="forgotPassword" class="action-label">
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
  
  export default {
    data() {
      return {
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
        const user = await response.json();
  
        alert("yes");
  
        this.$store.dispatch('setUser', user);
        this.$router.push('/profile'); 
        
        return { success: true };
      } else {
        alert("No");
        const errorData = await response.json();
        console.error('API Error:', errorData);
  
        return { success: false, error: errorData };
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      return { success: false, error: error.message };
    }
      },
    },
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
    height: 100px;
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
