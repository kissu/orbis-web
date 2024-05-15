<template>
  <div class="main-container">
    <div class="sos-animation" @click="sosClicked">
      <lottie
        :options="defaultOptions"
        ref="sos"
        :isAnimationEnabled="false"
        height="250"
        width="250"
        horizontalOptions="center"
        @click="sosClicked" />
    </div>
    <audio ref="audioPlayer" :src="audioFilePath" preload="auto"></audio>

    <button @click="configureSOS" class="sos-button">Add SOS Number</button>

    <ul>
      <li v-for="number in SOSNumbersList" :key="number" class="number">
        <span>{{ number }}</span>
        <img
          src="/src/images/delete.png"
          height="40px"
          width="40px"
          alt="Delete"
          @click="removeNumber(number)"
          class="delete-icon"
        />
      </li>
    </ul>
      
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Lottie from 'vue3-lottie';
import animationData from "@/assets/animations/SOS.json";
import { Plugins } from '@capacitor/core';
import { mapGetters } from 'vuex';

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
      SOSNumbersList: [],
      sosActivate: false,
      userConfirmed: false,
      audioFilePath: null,
      audioManager: null,
      filePath: '',
      audioRecorder: null,
    };
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    async sosClicked() {
  this.sosActivate = !this.sosActivate;

  if (this.sosActivate) {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const sosMessage = {
            myLatitude: position.coords.latitude,
            myLongitude: position.coords.longitude,
            PhoneNumbers: this.SOSNumbersList
          };

          fetch('/api/v1/Users/SendSOSMessages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(sosMessage)
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
}
,
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
  async updateSOSNumber(numbers) {
    const userId = this.getUser.userId;

    try {
      const response = await fetch(`/api/v1/Users/UpdateSOSNumber/${userId}/${numbers}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating SOS number:', error);
    }
  },
  async displayNumbers() {
  try {
    this.isLoading = true;

    const userId = this.getUser.userId;

    const response = await fetch(`/api/v1/Users/GetUserSOSNumbers/${userId}`);
    
    if (response.ok) {
      const sosNumbers = await response.json();

      sosNumbers.forEach(number => {
        const cleanedNumber = number.trim('"');
        this.SOSNumbersList.push(cleanedNumber);
      });
    } else {
      throw new Error(`Network response was not ok, status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching SOS numbers:', error);
  } finally {
    this.isLoading = false;
  }
}

  },
  mounted() {
    this.displayNumbers();
  },
});
</script>

<style scoped>
.main-container {
  background-color: red;
  text-align: center;
}

.number {
  color: white;
}

.switch-container {
  color: white;
}

.sos-button {
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

</style>
