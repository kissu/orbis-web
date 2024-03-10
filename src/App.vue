<template>
  <div id="app">
    <div class="app-shell">
      <router-link to="/categories" class="tab-bar">
        <img src="@/images/ic_emoji_people.png" alt="Categories" />
      </router-link>
      <router-link to="/messages" class="tab-bar">
        <img src="@/images/messages.png" alt="Messages" />
      </router-link>
      <router-link to="/actions" class="tab-bar">
        <img src="@/images/ic_edit2.png" alt="Actions" />
      </router-link>
      <router-link to="/analysis" class="tab-bar">
        <img src="@/images/analysis.png" alt="Analysis" />
      </router-link>
      <router-link to="/settings" class="tab-bar">
        <img src="@/images/gear_apple.png" alt="Settings" />
      </router-link>
      <router-view></router-view>
    </div>
  </div>
</template>


<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.app-shell { 
  display: flex; 
  height: 100vh; 
  flex-direction: row; 
}

.tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  height: 50px;
  text-decoration: none;
}

.tab-bar:hover {
  background-color: #0056b3; 
}

.tab-bar a {
  text-decoration: none;
  color: white;
}

.tab-bar img {
  width: 30px;
  height: 30px;
}

.content {
  flex-grow: 1;
  overflow-y: auto;
}
</style>