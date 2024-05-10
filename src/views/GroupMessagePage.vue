<template>
    <div class="container">
      <div v-if="isLoading" class="loading-container">
        <ActivityIndicator color="#404040" />
      </div>
  
      <ul class="message-list">
        <li v-for="message in messagesList" :key="message" class="message-item">
          {{ message }}
        </li>
      </ul>

    <img src="/src/images/manage.png" @click="manageClicked" class="manage-button" alt="Manage Message" />

    <div class="input-container">
        <input v-model="messageToSend" class="message-input" />
        <img src="/src/images/sendmessage.png" @click="sendMessage" class="send-button" alt="Send Message" />
    </div>

    </div>
</template>
  
  <script>

  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        messagesList: [],
        usersList: [],
        isLoading: false,
        isCurrentUserOwner: false,
        id: "",
        messageToSend: "",
      };
    },
    mounted() {
      this.displayMessages();
    },
    computed: {
      ...mapGetters(['getUser']),
    },
    methods: {
      async displayMessages() {
        this.isLoading = true;
  
        try {
        const response = await fetch(`/api/v1/Activities/GetMessagesContentByActivityId/${this.id}`);
        const data = await response.json();

        await Promise.all(data.map(async (message) => {
          const userName = await this.getUsername(message.userId);
          this.messagesList.push(`${userName}: ${message.content}`);
        }));
      } catch (error) {
        console.error(`Error in displayMessages: ${error}`);
      } finally {
        this.isLoading = false;
      }
    },
    async getUsername(userId) {
      try {
        const userResponse = await fetch(`/api/v1/Users/GetUser/${userId}`);
        const userData = await userResponse.json();
        return userData.name;
      } catch (error) {
        console.error(`Error in getUsername: ${error}`);
        return "Unknown User";
      }
    },
    async sendMessage() {
      const userId = this.getUser.userId;
      if (this.messageToSend.trim() !== "") {
        try {
          const messageResponse = await fetch("/api/v1/Messages", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: this.messageToSend, userId: userId }),
          });

          console.log('Response:', await messageResponse.text());

          await this.updateActivityMessages(activityId, messageId);

          const data = await messageResponse.json();
          const userName = await this.getUsername(data.userId);
          const newMessage = `${data.userName}: ${data.content}`;

          this.messagesList.push(newMessage);
        } catch (error) {
          console.error(`Error in sendMessage: ${error}`);
        }
        this.messageToSend = "";
      }
      },
      async updateActivityMessages(id, messageId) {
    try {
    const response = await fetch(`/api/v1/Activities/AddMessages/${id}/${messageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Update successful');
    } else {
      console.error(`Error updating activity messages. Status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error in updateActivityMessages: ${error}`);
  }
},
    async manageClicked() {
        
      },
    },
  };
  </script>
  
<style scoped>

  .container {
    padding: 20px;
  }
  
  .loading-container {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .message-list {
    list-style: none;
    padding: 0;
  }
  
  .message-item {
    margin-bottom: 10px;
    font-size: 16px;
    color: #404040;
  }
  
  .input-container {
  display: flex;
  flex: 1;
  justify-content: space-between;
  margin-top: auto; 
 }   
  
  .message-input {
    flex: 1;
    margin-right: 10px;
    padding: 5px;
    border: 1px solid #ccc;
  }
  
  .send-button {
  width: 35px; 
  height: 35px; 
    }
  
  .manage-button {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }

</style>
  