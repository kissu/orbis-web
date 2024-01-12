<template>
    <VerticalStackLayout :margin="{ left: 20, right: 20 }"
                        horizontalOptions="center"
                        verticalOptions="center">
  
      <Label text="Username" fontSize="16"
             horizontalOptions="center" 
             :textColor="isDarkTheme ? 'white' : 'black'" />
      <Entry ref="usernameEntry" placeholder="Enter your username" v-model="username"
             horizontalOptions="center" 
             :textColor="isDarkTheme ? 'white' : 'black'" />
  
      <Label text="Email" fontSize="16"
             horizontalOptions="center" 
             :textColor="isDarkTheme ? 'white' : 'black'" />
      <Entry ref="emailEntry" placeholder="Enter your email" v-model="email"
             horizontalOptions="center"
             :textColor="isDarkTheme ? 'white' : 'black'" />
  
      <Label :textColor="isDarkTheme ? 'white' : 'black'" 
             margin="0,10,0,0"
             text="Created from : "
             horizontalOptions="center"/>
  
      <Label :textColor="isDarkTheme ? 'white' : 'black'" 
             :text="createdDateFormatted"
             horizontalOptions="center"/>
  
      <SKLottieView ref="loadingView"
                    source="Loading.json"
                    repeatCount="-1"
                    heightRequest="250"
                    widthRequest="250"
                    horizontalOptions="center" 
                    verticalOptions="center"
                    :isVisible="false">
      </SKLottieView>
  
      <Button :cornerRadius="25"
              grid-column-span="2" 
              grid-row="7" 
              margin="0,35,0,0"  
              ref="save" 
              text="Save" 
              heightRequest="50" 
              verticalOptions="centerAndExpand" 
              widthRequest="300"
              @click="saveClicked" 
              :textColor="isDarkTheme ? 'white' : 'black'" 
              fontSize="body">
        <Button.Background>
          <LinearGradientBrush startPoint="0,0" endPoint="1,0">
            <GradientStop offset="0" color="#FF8C00" />
            <GradientStop offset="1" color="#FFD700" />
          </LinearGradientBrush>
        </Button.Background>
      </Button>
  
      <Button text="Sign out" background-color="OrangeRed" margin="0,30,0,0" widthRequest="300" @click="signOutClicked" 
              :textColor="isDarkTheme ? 'white' : 'black'" heightRequest="50" :cornerRadius="25"/>
  
      <Button text="Delete account" background-color="Red" margin="0,10,0,0" widthRequest="300" @click="deleteAccountClicked"  
              :textColor="isDarkTheme ? 'white' : 'black'" heightRequest="50" :cornerRadius="25"/>
    </VerticalStackLayout>
  </template>
  
  <script>
  //import LinearGradientBrush from '@/components/LinearGradientBrush.vue'; // Import LinearGradientBrush component
  
  export default {
    data() {
      return {
        isDarkTheme: false, // You may need to adjust this based on your Vue.js theme setup
        username: '',
        email: '',
        createdDate: new Date(),
        loadingViewVisible: false,
      };
    },
    computed: {
      createdDateFormatted() {
        // Implement the formatting logic for the created date if needed
        return ''; // Replace with your formatting logic
      },
    },
    methods: {
      saveClicked() {
        // Handle save click event
      },
      signOutClicked() {
        // Handle sign out click event
      },
      deleteAccountClicked() {
        // Handle delete account click event
      },
    },
  };
  </script>
  
  <style>
  /* Add any additional styles you need */
  </style>
  