<template>
  <div class="settings-page">
    <div class="navigation-buttons">
      <button class="setting-button" @click="joinedClicked">Activities Joined</button>
      <button class="setting-button" @click="activitiespublishedClicked">Activities Published</button>
      <button class="setting-button" @click="activitieslikedClicked">Activities Liked</button>

      <button class="setting-button" @click="cleanpublishedClicked">Clean Published</button>
      <button class="setting-button" @click="cleanlikedClicked">Clean Liked</button>

      <button class="setting-button" @click="charitiespublishedClicked">Charities Published</button>
      <button class="setting-button" @click="charitieslikedClicked">Charities Liked</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    activitiesjoinedClicked() {
      this.$router.push('/activitiesjoined');
    },
    activitiespublishedClicked() {
      this.$router.push('/activitiespublished');
    },
    activitieslikedClicked() {
      this.$router.push('/activitiesliked');
    },
    cleanpublishedClicked() {
      this.$router.push('/cleanpublished');
    },
    cleanlikedClicked() {
      this.$router.push('/cleanliked');
    },
    charitiespublishedClicked() {
      this.$router.push('/charitiespublished');
    },
    charitieslikedClicked() {
      this.$router.push('/charitiesliked');
    },
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
  flex-direction: column;
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
