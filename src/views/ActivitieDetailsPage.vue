<template>
    <div>
      <ScrollView>
        <VerticalStackLayout>
          <Image :source="item.Image" margin="0,0,0,10" width="300" height="200" />
          <Label :text="formatDate(item.Start_date)" lineBreakMode="NoWrap" :style="listItemTextStyle" fontSize="12" />
          <Label :text="formatTime(item.Start_time)" lineBreakMode="NoWrap" :style="listItemTextStyle" fontSize="12" />
          <Label :text="formatDate(item.End_date)" lineBreakMode="NoWrap" :style="listItemTextStyle" fontSize="12" />
          <Label :text="formatTime(item.End_time)" lineBreakMode="NoWrap" :style="listItemTextStyle" fontSize="12" />
          <Label :text="item.Text" fontSize="16" :style="{ color: isDarkTheme ? 'white' : 'black', textAlign: 'center' }" margin="0,0,0,10" />
          <Label :text="item.Description" fontSize="14" :style="{ color: isDarkTheme ? 'white' : 'black', textAlign: 'center' }" margin="0,0,0,10" />
  
          <Button text="Join" @click="joinActivity" textColor="white" backgroundColor="darkorange" widthRequest="250" heightRequest="35" borderRadius="15" margin="0,10,0,0">
            <Button.Background>
              <LinearGradientBrush startPoint="0,0" endPoint="1,0">
                <GradientStop offset="0" color="#FF8C00" />
                <GradientStop offset="1" color="#FFD700" />
              </LinearGradientBrush>
            </Button.Background>
          </Button>
  
          <Button text="Cancel join" @click="cancelJoinActivity" textColor="white" widthRequest="250" heightRequest="35" borderRadius="15" backgroundColor="darkorange">
            <Button.Background>
              <LinearGradientBrush startPoint="0,0" endPoint="1,0">
                <GradientStop offset="0" color="#FF8C00" />
                <GradientStop offset="1" color="#FFD700" />
              </LinearGradientBrush>
            </Button.Background>
          </Button>
  
          <StackLayout orientation="Horizontal" horizontalOptions="Center">
            <Label text="Number of participants :" horizontalOptions="Center" :style="{ color: isDarkTheme ? 'white' : 'black' }" />
            <Label :text="numberOfParticipants" fontSize="14" horizontalOptions="CenterAndExpand" margin="0,0,0,10" :style="{ color: isDarkTheme ? 'white' : 'black' }" />
          </StackLayout>
  
          <Button text="Like" @click="likeActivity" textColor="white" widthRequest="250" heightRequest="35" margin="0,10,0,0" borderRadius="15">
            <Button.Background>
              <LinearGradientBrush startPoint="0,0" endPoint="1,0">
                <GradientStop offset="0" color="#FF8C00" />
                <GradientStop offset="1" color="#FFD700" />
              </LinearGradientBrush>
            </Button.Background>
          </Button>
  
          <Button text="Cancel like" @click="cancelLikeActivity" textColor="white" widthRequest="250" heightRequest="35" margin="0,10,0,0" borderRadius="15">
            <Button.Background>
              <LinearGradientBrush startPoint="0,0" endPoint="1,0">
                <GradientStop offset="0" color="#FF8C00" />
                <GradientStop offset="1" color="#FFD700" />
              </LinearGradientBrush>
            </Button.Background>
          </Button>
  
          <HorizontalStackLayout horizontalOptions="Center">
            <Button text="Report" textColor="white" backgroundColor="orangered" @click="reportUser" widthRequest="130" heightRequest="50" verticalOptions="Center"></Button>
            <Button text="Block" textColor="white" backgroundColor="red" @click="blockUser" widthRequest="130" heightRequest="50" verticalOptions="Center"></Button>
            <Entry v-model="blockUserId" isvisible="false" />
          </HorizontalStackLayout>
        </VerticalStackLayout>
      </ScrollView>
    </div>
  </template>
  
  <script>
  //import LinearGradientBrush from '@/components/LinearGradientBrush.vue'; // Import LinearGradientBrush component
  
  export default {
    data() {
      return {
        isDarkTheme: false, // You may need to adjust this based on your Vue.js theme setup
        blockUserId: '', // Bind this to your blockUserId property
        item: {
          Image: 'image1.png',
          Start_date: new Date(),
          Start_time: new Date(),
          End_date: new Date(),
          End_time: new Date(),
          Text: 'Item 1',
          Description: 'Description of the item',
        },
        numberOfParticipants: 0, // Update this based on your actual number of participants
      };
    },
    computed: {
      listItemTextStyle() {
        return {
          fontSize: '12px',
          color: this.isDarkTheme ? 'white' : 'black',
          // Add any other styles you need for listItemText
        };
      },
    },
    methods: {
      formatDate(date) {
        // Implement your date formatting logic
      },
      formatTime(time) {
        // Implement your time formatting logic
      },
      joinActivity() {
        // Implement your joinActivity logic
      },
      cancelJoinActivity() {
        // Implement your cancelJoinActivity logic
      },
      likeActivity() {
        // Implement your likeActivity logic
      },
      cancelLikeActivity() {
        // Implement your cancelLikeActivity logic
      },
      reportUser() {
        // Implement your reportUser logic
      },
      blockUser() {
        // Implement your blockUser logic
      },
    },
  };
  </script>
  
  <style>
  /* Add any additional styles you need */
  </style>
  
  