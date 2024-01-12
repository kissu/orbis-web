<template>
    <div class="settings-page">
      <img :src="appIconPath" alt="App Icon" class="app-icon" @click="profileClicked"> 
      <button class="setting-button" @click="privacyClicked">Privacy</button>
      <button class="setting-button" @click="aboutClicked">About</button>
      <button class="setting-button" @click="helpClicked">Help</button>
      <button class="setting-button" @click="publishedClicked">Published</button>
      <button class="setting-button" @click="joinedClicked">Joined</button>
      <button class="setting-button" @click="likedClicked">Liked</button>
      <button class="support-button" @click="showInterstitial">Support us!</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
    return {
      appIconPath: 'ic_launcher.png' 
    };
  },
    methods: {
      profileClicked() {
        this.$router.push('/logout');
      },
      privacyClicked() {
        this.$router.push('/privacy');
      },
      aboutClicked() {
        this.$router.push('/about');
      },
      helpClicked() {
        this.$router.push('/help');
      },
      publishedClicked() {
        this.$router.push('/published');
      },
      joinedClicked() {
        this.$router.push('/joined');
      },
      likedClicked() {
        this.$router.push('/liked');
      },
      showInterstitial() {
        console.log('Show Interstitial Clicked');
      },
    },
  };
  </script>
  
<style scoped>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

.settings-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #FFFFFF; 
    height: 100vh;
}

.app-icon {
    width: 35px;
    height: 35px;
    margin-bottom: 10px;
    cursor: pointer;
}

.setting-button {
    margin: 5px;
    padding: 10px;
    background-color: #FFFFFF; 
    color: #FF4500;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 300px;
}

.setting-button:hover {
    background-color: #FFA07A; 
}

.support-button {
    margin: 20px;
    padding: 15px;
    background: linear-gradient(to right, #FF8C00, #FFD700);
    color: #FFFFFF;
    border: none;
    border-radius: 25px;
    width: 300px;
    cursor: pointer;
}

.support-button:hover {
    background: linear-gradient(to right, #FF4500, #FF8C00);
}
</style>
  