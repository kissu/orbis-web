<template>
  <div class="settings-page">
    <!-- Navigation buttons -->
    <div class="navigation-buttons">
      <button class="setting-button" @click="publishedClicked">Published</button>
      <button class="setting-button" @click="joinedClicked">Joined</button>
      <button class="setting-button" @click="likedClicked">Liked</button>
    </div>

    <!-- Manage buttons -->
    <div class="manage-buttons">
      <img src="/src/images/join.png" @click="manageClicked" class="manage-button" alt="Join" />
      <img src="/src/images/donation.png" @click="manageClicked" class="manage-button" alt="Donation" />
      <img src="/src/images/audio.png" @click="manageClicked" class="manage-button" alt="Audio" />
      <img src="/src/images/ic_edit.png" @click="manageClicked" class="manage-button" alt="Edit" />
      <img src="/src/images/like.png" @click="manageClicked" class="manage-button" alt="Like" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    publishedClicked() {
      this.$router.push('/published');
    },
    joinedClicked() {
      this.$router.push('/joined');
    },
    likedClicked() {
      this.$router.push('/liked');
    },
    manageClicked() {
      // Handle manage button click
    }
  },
};
</script>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  padding: 30px;
}

.navigation-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
}

.manage-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.setting-button {
  margin: 5px;
  padding: 10px;
  background-color: #FFFFFF;
  color: #FF4500;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
}

.setting-button:hover {
  background-color: #FFA07A;
}

.manage-button {
  width: 100px;
  height: 100px;
  margin: 10px;
  cursor: pointer;
}
</style>
