import { createRouter, createWebHistory } from 'vue-router';
import ActivitiePage from '../views/ActivitiePage.vue';
import LogoutPage from '../views/LogoutPage.vue';
import SettingsPage from '../views/SettingsPage.vue';
import NewsPage from '../views/NewsPage.vue';
import PrivacyPage from '../views/PrivacyPage.vue';
import ActivitieDetailsPage from '../views/ActivitieDetailsPage.vue'
import HelpPage from '../views/HelpPage.vue'
import JoinedActivitiePage from '../views/JoinedActivitiePage.vue'
import LikedActivitiePage from '../views/LikedActivitiePage.vue'
import NewActivitiePage from '../views/NewActivitiePage.vue'
import NewsDetailsPage from '../views/NewsDetailsPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import PublishedPage from '../views/PublishedPage.vue'
import UpdateActivitiePage from '../views/UpdateActivitiePage.vue'
import AboutPage from '../views/AboutPage.vue'

const routes = [
  { path: '/ActivitiePage', component: ActivitiePage },
  { path: '/LogoutPage', component: LogoutPage },
  { path: '/SettingsPage', component: SettingsPage },
  { path: '/NewsPage', component: NewsPage },
  { path: '/PrivacyPage', component: PrivacyPage },
  { path: '/activitiesdetails', component: ActivitieDetailsPage }, 
  { path: '/help', component: HelpPage }, 
  { path: '/joined', component: JoinedActivitiePage }, 
  { path: '/liked', component: LikedActivitiePage }, 
  { path: '/newactivitie', component: NewActivitiePage }, 
  { path: '/newsdetails', component: NewsDetailsPage }, 
  { path: '/profile', component: ProfilePage }, 
  { path: '/publish', component: PublishedPage }, 
  { path: '/update', component: UpdateActivitiePage }, 
  { path: '/about', component: AboutPage }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
