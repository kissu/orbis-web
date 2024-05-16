<template>
    <div class="main-container">
      <div class="Gone-animation" @click="GoneClicked">
        <Vue3Lottie
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
      v-model="Name"
      type="text"
      placeholder="Enter Name"
      class="input-field"/>

    <textarea
      v-model="informations"
      placeholder="Add informations (clothes worn, languages spoken, etc.)"
      class="editor-field"></textarea>
    </div>

    <div>

    <label for="image" class="image-upload">
        <img v-if="selectedImage" :src="selectedImageURL" alt="Selected Image"
          class="upload-icon" />
        <span v-else>
          <img src="/src/images/camera.png" alt="Upload Image" class="upload-icon" />
        </span>
      </label>
      <input type="file" id="image" @change="handleImageChange" accept="image/*" class="input"
        style="display: none;" />
    </div>

    <button @click="stopClicked" class="stop-button">Stop</button>

</div>
  </template>

  <script>
  import { defineComponent } from 'vue';
  import Vue3Lottie from 'vue3-lottie'
  import animationData from "@/assets/animations/Gone.json";
  import { Plugins } from '@capacitor/core';
  import axios from 'axios';

  const { Geolocation, Modals, Storage } = Plugins;

  export default defineComponent({
    components: {
      Vue3Lottie,
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
        Name: "",
        informations: "",
        selectedImage: null,
        selectedImageURL: null,
      };
    },
    methods: {
      async GoneClicked() {
        this.GoneActivate = !this.GoneActivate;
        this.showStopButton = true;

        if (this.GoneActivate) {
          try {
            const imageId = await this.uploadImage();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const goneMessage = {
            myLatitude: position.coords.latitude,
            myLongitude: position.coords.longitude,
            Name: this.Name,
            Informations: this.informations,
            ImageId: imageId
          };

          fetch('/api/v1/Users/SendGoneMessages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(goneMessage)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to send SOS messages, status: ${response.status}`);
            }
            return response.json();
          })
          .then(responseData => {
            console.log('SOS messages sent successfully:', responseData);
          })
          .catch(error => {
            console.error('Error sending SOS messages:', error);
          });
        });
      } else {
        console.error("La géolocalisation n'est pas supportée par ce navigateur.");
      }
    } catch (error) {
      console.error('Error sending SOS messages:', error);
    }
  } else {
  }
},
stopClicked() {
  const stopMessage = {
    myLatitude: position.coords.latitude,
    myLongitude: position.coords.longitude,
    Name: this.Name,
    Informations: this.informations,
    ImageId: 0
  };
  fetch('/api/v1/Users/StopGone', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(stopMessage)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to stop Gone messages, status: ${response.status}`);
    }
    return response.json();
  })
  .then(responseData => {
    console.log('Gone messages stopped successfully:', responseData);
  })
  .catch(error => {
    console.error('Error stopping Gone messages:', error);
  });
},
async uploadImage() {
      try {
        const data = {
          "id": 0,
          "category_id": 2,
          "blob": this.selectedImageURL.split(',')[1]
        }
        const response = await axios.post('/api/v1/Images', data);
        return response.data.id;
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
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
    },
  });
  </script>

  <style scoped>
  .main-container {
    background-color: #1D1B1B;
    text-align: center;
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

.stop-button {
  width: 150px;
  margin: 5px;
  margin-top: 10px;
  padding: 5px;
  background-color: red;
  color: white;
}

.upload-icon {
  max-width: 30%;
  height: 30%;
}

  </style>
