<template>
  <div id="app">
    <div class="app-shell">
      <nav class="nav-bar navbar navbar-expand-lg bg-body-tertiary px-5">
        <div class="container-fluid">
              
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
              <li class="nav-item m-2 mx-4">
                <router-link to="/categories" class="tab-bar">
                  <img src="@/images/ic_emoji_people.png" alt="Categories" />
                </router-link>
              </li>
              <li class="nav-item m-2 mx-4">
                <router-link to="/messages" class="tab-bar">
                  <img src="@/images/messages.png" alt="Messages" />
                </router-link>
              </li>
              <li class="nav-item m-2 mx-4">
                <router-link to="/actions" class="tab-bar">
                  <img src="@/images/ic_edit2.png" alt="Actions" />
                </router-link>
              </li>
              <li class="nav-item m-2 mx-4">
                <router-link to="/analysis" class="tab-bar">
                  <img src="@/images/analysis.png" alt="Analysis" />
                </router-link>
              </li>
              <li class="nav-item m-2 mx-4">
                <router-link to="/settings" class="tab-bar">
                  <img src="@/images/gear_apple.png" alt="Profile" />
                </router-link>
                </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <div class="page-content">
      <router-view></router-view>
    </div>

    <footer class="footer">
      <div class="infos-content">
        <div class="social-content">
          <a href="https://www.instagram.com/orbisoff/">
            <img src="/src/images/instagram.png" class="social-icon" alt="Instagram" />
          </a>
          <a href="https://www.youtube.com/@orbisoff">
            <img src="/src/images/tik-tok.png" class="social-icon" alt="TikTok" />
          </a>
          <a href="https://www.youtube.com/@orbisoff">
            <img src="/src/images/youtube.png" class="social-icon" alt="YouTube" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61554704694462">
            <img src="/src/images/facebook.png" class="social-icon" alt="Facebook" />
          </a>
          <a href="https://www.threads.net/@orbisoff">
            <img src="/src/images/threads.png" class="social-icon" alt="Threads" />
          </a>
          <a href="https://www.linkedin.com/in/orbis-activities-81b25b2a4/">
            <img src="/src/images/linkedin.png" class="social-icon" alt="LinkedIn" />
          </a>
          <a href="https://twitter.com/OrbisOff">
            <img src="/src/images/twitter.png" class="social-icon" alt="LinkedIn" />
          </a>
        </div>

        <div class="download-about">
          <div class="download-container">
            <a
              href="https://l.instagram.com/?u=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.companyname.orbis.mobile%26gl%3DFR&e=AT1tC-_vLJOt7RKwSmqu9FEYbkHDD3y-yW23zB0_mHT0IH6HC9T_6zR8c8LcMWtkJN9gV5kTc7e55Y0cyr893BvOVYertacUt7Rvuj5NrOkEboZRVH_AWgk">
              <img src="/src/images/google-play-badge.png" class="manage-button" alt="Manage Message" />
            </a>
            <a href="https://apps.apple.com/fr/app/orbis-activities/id6464130945?l=en-GB">
              <img src="/src/images/download-on-the-app-store.svg" class="manage-button" alt="Manage Message" />
            </a>
          </div>

          <div class="about-container">
            <p>© 2024 Orbis - Activities</p>
            <div class="links-container">
              <a href="https://essama-official.github.io/Settings/Orbis.Privacy.html">Privacy Policy</a>
              <a href="https://essama-official.github.io/Settings/Orbis.EULA.html">Terms of Service</a>
              <a href="https://essama-official.github.io/Settings/Orbis.EULA.html">Cookie Settings</a>
              <a href="https://essama-official.github.io/Settings/Orbis.EULA.html">Cookie Policy</a>
              <a href="https://essama-official.github.io/Settings/Orbis.EULA.html">Help</a>
              <a href="https://essama-official.github.io/Settings/Orbis.EULA.html">Contact Us</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  </div>
</template>

<style scoped>

.app {
  padding: 0px;
  margin: 0px;
}

.nav-bar {
  border-bottom: 1px solid #e1e1e2;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1;
}

.tab-bar {
  text-decoration: none;
  color: white;
}

.tab-bar img {
  width: 30px;
  height: 30px;
}

.page-content {
  margin-top: 60px;
  min-height: 50vh;
}

.footer {
  background-color: #f4f4f4;
  padding: 20px 0;
}

.infos-content {
  margin: 0 auto;
  padding: 20px;
}

.social-content {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.social-icon {
  width: 40px;
  height: 40px;
}

.download-about {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.download-container,
.about-container {
  flex-basis: 45%;
}

.download-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.manage-button {
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: contain;
}

.about-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.links-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.links-container a {
  margin: 5px;
}

@media (max-width: 768px) {
  .download-about {
    flex-direction: column;
    align-items: center;
  }

  .download-container,
  .about-container {
    flex-basis: 100%;
    margin-bottom: 20px;
  }
}
</style>
