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

    <div class="switch-container">
      <label>{{ switchStatusLabel }}</label>
      <input type="checkbox" v-model="isSwitchOn" @change="onSwitchToggled" />
    </div>

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
import Lottie from 'vue-lottie/src/lottie.vue';
import animationData from "@/assets/animations/SOS.json";
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
      switchStatusLabel: 'SOS is Off',
      mySwitch: false,
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
  methods: {
    async initializeSwitchToggled() {
      const initialize = await Storage.get({ key: 'SOS_Switch_State' });
      this.$refs.switchStatusLabel.text = initialize ? 'SOS is On' : 'SOS is Off';
      this.mySwitch = initialize;
    },
    onSwitchToggled(e) {
      const isSwitchOn = e.value;
      Storage.set({ key: 'SOS_Switch_State', value: isSwitchOn.toString() });
    },
    async removeNumberClicked(numberToRemove) {
      const userId = parseInt(await Storage.get({ key: 'UserId' }), 10);
    },
    async displayNumbers() {
      this.isLoading = true;
      //const userId = parseInt(await Storage.get({ key: 'UserId' }), 171);
      const userId = 171;
      try {
        const response = await fetch(`/api/v1/Users/GetUserSOSNumbers/${userId}`);
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
        console.log('Lottie Options:', this.defaultOptions);
        const data = await response.json();
        this.SOSNumbersList = data;
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        this.loading = false;
      }
    },
    async sosClicked() {
      this.sosActivate = !this.sosActivate;

      if (this.sosActivate) {
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
    async configureSOS() {
    let userCancelled = false;

    while (true) {
      const input = prompt("Add a number for SOS");

      if (input === null || input === "") {
        userCancelled = true;
        break;
      }

      if (!input.startsWith("+")) {
        alert("You must put the correct format (with +)");
      }

      const number = parseInt(input, 10);

      if (!isNaN(number)) {
        if (this.SOSNumbersList.length > 0) {
          this.SOSNumbersList.push(number);
        } else {
          this.SOSNumbersList = [number];
        }
      }
    }

    if (this.SOSNumbersList.length > 0) {
      const numbersString = this.SOSNumbersList.join(", ");
      await this.updateSOSNumber(numbersString);
    }
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
        body: `There is a SOS near ${myLatitude}, ${myLongitude}`,
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
  async updateSOSNumber(numbers) {
    //const loginUserId = parseInt(await Storage.get({ key: 'UserId' }), 10);
    const loginUserId = 171;

    try {
      const response = await fetch(`/api/v1/Users/UpdateSOSNumber/${loginUserId}/${numbers}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating SOS number:', error);
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
  background-color: red;
  height: 100%; 
  width: 192vh;
  overflow: hidden; 
  padding: 20px; 
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
