<template>
    <ScrollView :backgroundColor="isDarkTheme ? 'black' : 'white'" >
      <StackLayout orientation="vertical" >
        <Grid>
          <Grid.RowDefinitions>
            <RowDefinition height="auto"/>
            <RowDefinition height="*" />
            <RowDefinition height="*" />
            <RowDefinition height="*" />
          </Grid.RowDefinitions>
  
          <BoxView ref="box" />
  
          <StackLayout gridRow="4" heightRequest="600" verticalOptions="fillAndExpand" horizontalOptions="fillAndExpand" margin="0">
            
            <SKLottieView ref="emptyView"
                          source="Empty.json"
                          repeatCount="-1"
                          heightRequest="250"
                          widthRequest="250"
                          horizontalOptions="center" 
                          verticalOptions="center"
                          :isVisible="false">
            </SKLottieView>
  
            <Label text="It's empty here" horizontalOptions="center" verticalOptions="center" fontSize="title" :textColor="isDarkTheme ? 'white' : 'black'" :isVisible="false" ref="isEmpty"/>
  
            <ActivityIndicator :isRunning="isLoading" :isVisible="isLoading" color="#404040" verticalOptions="center" horizontalOptions="center" />
            <CollectionView ref="itemsListView" :itemsSource="items" selectionMode="none">
              <CollectionView.ItemTemplate>
                <DataTemplate>
                  <StackLayout padding="10" @tap="onItemTapped">
  
                    <StackLayout.GestureRecognizers>
                      <TapGestureRecognizer @tapped="onItemTapped" />
                    </StackLayout.GestureRecognizers>
  
                    <StackLayout orientation="horizontal" >
                      <Image :source="item.Image" heightRequest="50" widthRequest="70"/>
                      <Label :text="item.Text" lineBreakMode="wordWrap" :style="{ fontSize: '16px', textColor: isDarkTheme ? 'white' : 'black' }" horizontalOptions="startAndExpand"/>
                      <Button text="Update" horizontalOptions="end" backgroundColor="DarkOrange" margin="0,20,0,0" textColor="white"
                              @click="onUpdateClick(item)" :isVisible="item.isUpdated"></Button>
                      <Button text="Delete" horizontalOptions="end" backgroundColor="Red" margin="0,20,0,0" textColor="white" @click="onDeleteClick(item)"    
                              :isVisible="item.isUpdated"></Button>
                    </StackLayout>
  
                  </StackLayout>
                </DataTemplate>
              </CollectionView.ItemTemplate>
            </CollectionView>
          </StackLayout>
        </Grid>
      </StackLayout>
    </ScrollView>
  </template>
  
  <script>
  //import SKLottieView from '@/components/SKLottieView.vue'; // Import SKLottieView component
  
  export default {
    data() {
      return {
        isDarkTheme: false, // You may need to adjust this based on your Vue.js theme setup
        isLoading: false,
        items: [],
      };
    },
    methods: {
      onItemTapped() {
        // Handle item tapped event
      },
      onUpdateClick(item) {
        // Handle update click event
      },
      onDeleteClick(item) {
        // Handle delete click event
      },
    },
  };
  </script>
  
  <style>
  /* Add any additional styles you need */
  </style>
  