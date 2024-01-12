<template>
    <div>
      <ScrollView :style="{ backgroundColor: isDarkTheme ? 'black' : 'white' }">
        <StackLayout orientation="vertical">
          <Grid>
            <Grid.RowDefinitions>
              <RowDefinition height="auto"/>
              <RowDefinition height="*"/>
              <RowDefinition height="*"/>
              <RowDefinition height="*"/>
            </Grid.RowDefinitions>
            <BoxView ref="box" />
            <StackLayout gridRow="4" heightRequest="600" verticalOptions="fillAndExpand" horizontalOptions="fillAndExpand" margin="0">
              <SKLottieView v-if="!isEmpty" ref="emptyView"
                            :source="'Empty.json'"
                            repeatCount="-1"
                            heightRequest="250"
                            widthRequest="250"
                            horizontalOptions="center" 
                            verticalOptions="center"
                            :isVisible="false">
              </SKLottieView>
  
              <Label v-if="isEmpty" text="It's empty here" horizontalOptions="center" verticalOptions="center" fontSize="title" :textColor="isDarkTheme ? 'white' : 'black'" :isVisible="false" ref="isEmpty"/>
  
              <ActivityIndicator v-if="isBusy" :isRunning="isBusy" :isVisible="isBusy" color="#404040" verticalOptions="center" horizontalOptions="center" />
              <CollectionView v-if="!isBusy" ref="joinedActivitiesCollectionView" :itemsSource="joinedActivities" selectionMode="none">
                <CollectionView.ItemTemplate>
                  <DataTemplate>
                    <StackLayout padding="10">
  
                      <StackLayout.gestureRecognizers>
                        <TapGestureRecognizer @onTap="itemTapped" />
                      </StackLayout.gestureRecognizers>
  
                      <StackLayout orientation="horizontal">
                        <Image :source="item.Image" heightRequest="50" widthRequest="70"/>
                        <Label :text="item.Name" lineBreakMode="wordWrap" :style="listItemTextStyle" fontSize="16" :textColor="isDarkTheme ? 'white' : 'black'" horizontalOptions="startAndExpand"/>
                      </StackLayout>
  
                    </StackLayout>
                  </DataTemplate>
                </CollectionView.ItemTemplate>
              </CollectionView>
            </StackLayout>
          </Grid>
        </StackLayout>
      </ScrollView>
    </div>
  </template>
  
  <script>
  //import LinearGradientBrush from '@/components/LinearGradientBrush.vue'; // Import LinearGradientBrush component
  
  export default {
    data() {
      return {
        isDarkTheme: false, // You may need to adjust this based on your Vue.js theme setup
        isEmpty: false, // Set to true/false based on your logic
        isBusy: false, // Set to true/false based on your logic
        joinedActivities: [
          // Populate with your data
          { Image: 'image1.png', Name: 'Activity 1' },
          { Image: 'image2.png', Name: 'Activity 2' },
          // ...
        ],
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
      itemTapped(item) {
        // Handle item tap logic
      },
    },
  };
  </script>
  
  <style>
  /* Add any additional styles you need */
  </style>
  
  