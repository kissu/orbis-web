<template>
    <div>
      <ScrollView>
        <StackLayout :margin="{ left: 20, right: 20 }"
                     orientation="vertical"
                     verticalOptions="center">
          <Picker ref="categories" horizontalOptions="center"
                  title="Categories" 
                  :itemsSource="itemCategories" 
                  itemDisplayBinding="Text" 
                  v-model="selectedCategoryId" />
  
          <Entry margin="5" placeholder="Name" ref="name" placeholderColor="Gray" :textColor="isDarkTheme ? 'white' : 'black'" />
  
          <Entry margin="5" ref="userLocation" placeholder="Enter address" @input="onTextChanged"
                 placeholderColor="Gray" :textColor="isDarkTheme ? 'white' : 'black'" />
  
          <ListView margin="5" ref="suggestionsListView" :itemsSource="suggestions" @itemTapped="onItemSelected">
            <ListView.ItemTemplate>
              <DataTemplate>
                <ViewCell>
                  <Label :text="item" />
                </ViewCell>
              </DataTemplate>
            </ListView.ItemTemplate>
          </ListView>
  
          <Editor margin="5" placeholder="Description" ref="description" heightRequest="100" verticalOptions="start" 
                  placeholderColor="Gray" :textColor="isDarkTheme ? 'white' : 'black'" />
  
          <Button margin="15" text="Choose Image" textColor="White"
                  verticalOptions="center" horizontalOptions="center"
                  @click="chooseImageClicked" >
            <Button.Background>
              <LinearGradientBrush startPoint="0,0" endPoint="1,0">
                <GradientStop offset="0" color="#FF8C00" />
                <GradientStop offset="1" color="#FFD700" />
              </LinearGradientBrush>
            </Button.Background>
          </Button>
  
          <Image ref="image" widthRequest="100" heightRequest="100" />
  
          <Label text="Start date" :textColor="isDarkTheme ? 'white' : 'black'" />
          <DatePicker ref="startDatePicker" :date="startDate" margin="5" :textColor="isDarkTheme ? 'white' : 'black'" />
  
          <TimePicker ref="startTimePicker" :time="startTime" margin="5" :textColor="isDarkTheme ? 'white' : 'black'" />
  
          <Label text="End date" :textColor="isDarkTheme ? 'white' : 'black'" />
          <DatePicker ref="endDatePicker" :date="endDate" margin="5" :textColor="isDarkTheme ? 'white' : 'black'" />
  
          <TimePicker ref="endTimePicker" :time="endTime" margin="5" :textColor="isDarkTheme ? 'white' : 'black'" />
  
          <Entry margin="5" placeholder="Maximum participant" ref="maxParticipant" placeholderColor="Gray" :textColor="isDarkTheme ? 'white' : 'black'" />
  
          <SKLottieView ref="loadingView"
                        source="Loading.json"
                        repeatCount="-1"
                        heightRequest="250"
                        widthRequest="250"
                        horizontalOptions="center" 
                        verticalOptions="center"
                        :isVisible="false">
          </SKLottieView>
  
          <Button gridColumnSpan="2" gridRow="7" margin="0,20,0,0" :cornerRadius="25" ref="save" text="Save" 
                  heightRequest="50" verticalOptions="centerAndExpand" widthRequest="300" 
                  @click="saveClicked" textColor="White" fontSize="body">
            <Button.Background>
              <LinearGradientBrush startPoint="0,0" endPoint="1,0">
                <GradientStop offset="0" color="#FF8C00" />
                <GradientStop offset="1" color="#FFD700" />
              </LinearGradientBrush>
            </Button.Background>
          </Button>
        </StackLayout>
      </ScrollView>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        isDarkTheme: false,
        itemCategories: ["Category1", "Category2", "Category3"], 
        suggestions: ["Location1", "Location2", "Location3"], 
        selectedCategory: null,
        name: '',
        userLocation: '',
        description: '',
        startDate: new Date(),
        startTime: new Date(),
        endDate: new Date(),
        endTime: new Date(),
        maxParticipant: '',
        loadingViewVisible: false,
      };
    },
    computed: {
      selectedCategoryText() {
        return this.selectedCategory ? this.selectedCategory.Text : '';
      },
    },
    methods: {
      onTextChanged() {
        // Handle text changed event
      },
      onItemSelected(item) {
        // Handle item selected event
      },
      chooseImageClicked() {
        // Handle choose image click event
      },
      saveClicked() {
        // Handle save click event
      },
    },
  };
  </script>
  
  <style>
  /* Add any additional styles you need */
  </style>
  