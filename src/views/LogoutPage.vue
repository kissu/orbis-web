<template>
    <div class="container">
      <div class="lottie-container">
      <img :src="appIconPath" alt="App Icon" width="400" height="400"> 
      </div>
  
      <div class="signin-container">
        <div class="signin-button apple" @click="signInWithApple">
          <img :src="appleIconPath" alt="Apple Logo" width="50" height="50">
          <span>Sign in with Apple</span>
        </div>
  
        <div class="signin-button microsoft" @click="signInWithMicrosoft">
          <img :src="microsoftIconPath" alt="Microsoft Logo" width="45" height="45">
          <span>Sign in with Microsoft</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
    return {
      appIconPath: 'OrbisWorld.jpg',
      appleIconPath: 'apple_logo.png', 
      microsoftIconPath: 'microsoft_logo.png' 
    };
  },
    methods: {
      signInWithApple() {
        console.log("Sign in with Apple clicked");
      },
      signInWithMicrosoft() {
        console.log("Sign in with Microsoft clicked");
      },
    },
  };
  </script>
  
<style scoped>
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.signin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.signin-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
    padding: 5px;
    cursor: pointer;
}

.signin-button img {
    margin-right: 10px;
}

.apple {
    background-color: black;
    color: white;
}

.microsoft {
    background-color: deepskyblue;
    color: white;
}

.go-back-button {
    margin-top: 20px;
    padding: 10px;
    background-color: darkorange;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
}
</style>
  