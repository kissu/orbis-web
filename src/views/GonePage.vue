<template>
    <div class="main-container">
      <div class="Gone-animation" @click="GoneClicked">
        <lottie
          :options="defaultOptions"
          ref="Gone"
          :isAnimationEnabled="false"
          height="250"
          width="250"
          horizontalOptions="center"
          @click="GoneClicked" />
      </div>
  
      <audio ref="audioPlayer" :src="audioFilePath" preload="auto"></audio>

      <div class="input-container">
      <input
      v-model="userName"
      type="text"
      placeholder="Enter Name"
      class="input-field"/>

    <textarea
      v-model="information"
      placeholder="Add information (clothes worn, languages spoken, etc.)"
      class="editor-field"></textarea>
        
    </div>

    <label for="image" class="image-upload">
          <img v-if="selectedImage" alt="Selected Image"
            class="upload-icon" />
          <span v-else>
            <img src="/src/images/camera.png" alt="Upload Image" class="upload-icon" />
          </span>
        </label>
        <input type="file" id="image" @change="handleImageChange" accept="image/*" class="input"
          style="display: none;" />

</div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import Lottie from 'vue-lottie/src/lottie.vue';
  import animationData from "@/assets/animations/Gone.json";
  import { Plugins } from '@capacitor/core';
  
  const { Geolocation, Modals, Storage } = Plugins;
  
  export default defineComponent({
    components: {
      Lottie,
    },
    data() {
      return {
        defaultOptions: {
          animationData: animationData,
        },
        isLoading: false,
        GoneActivate: false,
        userConfirmed: false,
        audioFilePath: null,
        audioManager: null,
        filePath: '',
        audioRecorder: null,
        userName: "",
        information: "", 
        selectedImage: null,
        selectedImageURL: null,
      };
    },
    methods: {
      async GoneClicked() {
        this.GoneActivate = !this.GoneActivate;
  
        if (this.GoneActivate) {
          this.audioManager = new AudioManager();
          this.audioRecorder = this.audioManager.CreateRecorder();
          await this.audioRecorder.StartAsync();
        } else {
          /*if (this.audioRecorder && this.audioRecorder.IsRecording) {
            await this.audioRecorder.StopAsync();
            this.filePath = '/recorded_audio.wav'; 
            this.audioFilePath = this.filePath;
            this.audioPlayer.src = this.audioFilePath;
            this.audioPlayer.play();
            this.$refs.audioPlayer.style.display = 'block';*/
  
            //}
          }
          await this.sendTwilioMessagesToNearbyUsers();
      },
    async sendTwilioMessagesToNearbyUsers() {
    const TWILIO_ACCOUNT_SID = 'ACe31235f13fd304e2ecba1c22cf12cd80';
    const TWILIO_AUTH_TOKEN = '706a837c91b616f2325d1e7306b7250a';
  
    try {
      TwilioClient.Init(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  
      const myLatitude = 554;
      const myLongitude = 4545;
  
      const nearbyUsers = await this.getNearbyUsers(myLatitude, myLongitude);
  
      for (const user of nearbyUsers) {
        const cleanedNumber = user.trim('"');
        const toPhoneNumber = new PhoneNumber(cleanedNumber);
  
        const message = MessageResource.Create({
          to: toPhoneNumber,
          from: new PhoneNumber('+16592765399'), 
          body: `There is a Gone near ${myLatitude}, ${myLongitude}`,
        });
  
        console.log(`Message sent to ${cleanedNumber}: ${message.Sid}`);
      }
    } catch (error) {
      console.error('Error sending Twilio messages:', error);
    }
  },
  async reverseGeocode(latitude, longitude) {
    try {
      const coordinates = { latitude, longitude };
      const result = await Geolocation.reverseGeocode(coordinates);
  
      if (result && result.length > 0) {
        const address = result[0].thoroughfare + ', ' + result[0].locality + ', ' + result[0].countryName;
        return address;
      }
  
      return 'Address not found';
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return 'Address not found';
    }
  },
  async getNearbyUsers(latitude, longitude) {
    const userId = 171;
  
    try {
      const response = await fetch(`/api/v1/Users/GetAllUsers`);
      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
      const data = await response.json();
      const nearbyUsers = [];
  
      for (const user of data) {
        if (user.UserId !== userId && user.Latitude && user.Longitude) {
          const distance = this.calculateDistance(latitude, longitude, user.Latitude, user.Longitude);
          if (distance < 1000) {
            const address = await this.reverseGeocode(user.Latitude, user.Longitude);
            user.address = address;
            nearbyUsers.push(user);
          }
        }
      }
      return nearbyUsers;
    } catch (error) {
      console.error('Error fetching nearby users:', error);
      return [];
    }
  },
  calculateDistance(lat1, lon1, lat2, lon2) {
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = 6371 * c * 1000; 
  
    return distance;
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
    async updateGoneNumber(numbers) {
      //const loginUserId = parseInt(await Storage.get({ key: 'UserId' }), 10);
      const loginUserId = 171;
  
      try {
        const response = await fetch(`/api/v1/Users/UpdateGoneNumber/${loginUserId}/${numbers}`, {
          method: 'PUT',
        });
  
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error updating Gone number:', error);
      }
    },
    },
    mounted() {
      this.initializeSwitchToggled();
      this.displayNumbers();
    },
  });
  </script>
  
  <style scoped>
  .main-container {
    background-color: #1D1B1B;
  }

  .Gone-button {
    background-color: darkorange;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 20px; 
    cursor: pointer;
    text-align: center;
    margin: 25px;
    width: 250px;
    height: 40px;
  }

  .input-field,
.editor-field {
  width: 300px;
  margin: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.input-container {
    display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
}
  
  </style>
  