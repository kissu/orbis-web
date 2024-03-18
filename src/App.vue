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

    <div class="infos-content">
      
    <div class="social-content">
      <a href="https://www.instagram.com/orbisoff/">
        <img src="/src/images/instagram.png" class="social-icon" alt="Instagram" height="40" width="40"/>
      </a>
      <a href="https://www.youtube.com/@orbisoff"> 
        <img src="/src/images/tik-tok.png" class="social-icon" alt="TikTok" height="40" width="40"/>
      </a>
      <a href="https://www.youtube.com/@orbisoff"> 
      <img src="/src/images/youtube.png" class="social-icon" alt="YouTube" height="40" width="40"/>
      </a>
      <a href="https://www.facebook.com/profile.php?id=61554704694462">
      <img src="/src/images/facebook.png" class="social-icon" alt="Facebook" height="40" width="40"/>
      </a>
      <a href="https://www.threads.net/@orbisoff">
        <img src="/src/images/threads.png" class="social-icon" alt="Threads" height="40" width="40"/>
      </a>
      <a href="https://www.linkedin.com/in/orbis-activities-81b25b2a4/">
        <img src="/src/images/linkedin.png" class="social-icon" alt="LinkedIn" height="40" width="40"/>
      </a>
      <a href="https://twitter.com/OrbisOff">
        <img src="/src/images/twitter.png" class="social-icon" alt="LinkedIn" height="40" width="40"/>
      </a>
    </div>

    <div class="download-container">
      <a href="https://l.instagram.com/?u=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.companyname.orbis.mobile%26gl%3DFR&e=AT1tC-_vLJOt7RKwSmqu9FEYbkHDD3y-yW23zB0_mHT0IH6HC9T_6zR8c8LcMWtkJN9gV5kTc7e55Y0cyr893BvOVYertacUt7Rvuj5NrOkEboZRVH_AWgk">
        <img src="/src/images/google-play-badge.png" class="manage-button" alt="Manage Message" height="70" width="190"/>
      </a>
      <a href="https://apps.apple.com/fr/app/orbis-activities/id6464130945?l=en-GB">
        <img src="/src/images/download-on-the-app-store.svg" class="manage-button" alt="Manage Message" height="155" width="335"/>
      </a>
    </div>

    <div class="about-container">
      <p>© 2024 Orbis - Activities</p>

      <a href="https://essama-official.github.io/Settings/Orbis.Privacy.html">
        <p>Privacy Policy</p>
      </a>

      <a href="https://essama-official.github.io/Settings/Orbis.EULA.html">
        <p>Terms of Service</p>
      </a>

      <a href="https://essama-official.github.io/Settings/Orbis.EULA.html">
        <p>Cookie Settings</p>
      </a>

      <a href="https://essama-official.github.io/Settings/Orbis.EULA.html">
        <p>Cookie Policy</p>
      </a>

      <a href="https://essama-official.github.io/Settings/Orbis.EULA.html">
        <p>Help</p>
      </a>

      <a href="https://essama-official.github.io/Settings/Orbis.EULA.html">
        <p>Contact Us</p>
      </a>

    </div>
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

.infos-content {
  flex-grow: 1; 
  width: 100%; 
  padding: 20px; 
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

.download-container {
  display: flex;
  justify-content: center; 
  align-items: center;
  padding: 10px;
}

.about-container {
  display: flex;
  justify-content: space-between; 
}

.about-container p:not(:last-child) {
  margin-right: 15px; 
}

.social-content {
  display: flex;
  justify-content: space-between;
}

.social-icon:not(:last-child) {
  margin-right: 5px;
}

</style>