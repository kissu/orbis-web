import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ActivitiePage from './views/ActivitiePage.vue'
import LogoutPage from './views/LogoutPage.vue'
import SettingsPage from './views/SettingsPage.vue'
import PrivacyPage from './views/PrivacyPage.vue'
import ActivitieDetailsPage from './views/ActivitieDetailsPage.vue'
import HelpPage from './views/HelpPage.vue'
import JoinedActivitiePage from './views/JoinedActivitiePage.vue'
import LikedActivitiePage from './views/LikedActivitiePage.vue'
import NewActivitiePage from './views/NewActivitiePage.vue'
import CleanDetailsPage from './views/CleanDetailsPage.vue'
import ProfilePage from './views/ProfilePage.vue'
import PublishedPage from './views/PublishedPage.vue'
import UpdateActivitiePage from './views/UpdateActivitiePage.vue'
import AboutPage from './views/AboutPage.vue'
import SignInPage from './views/SignInPage.vue'
import ApplyPage from '@/views/ApplyPage.vue';
import BlindPage from '@/views/BlindPage.vue';
import CategoriesPage from '@/views/CategoriesPage.vue';
import ContactPage from '@/views/ContactPage.vue';
import DonationDetailsPage from '@/views/DonationDetailsPage.vue';
import NewDonationPage from '@/views/NewDonationPage.vue';
import SOSPage from '@/views/SOSPage.vue';
import TalkPage from '@/views/TalkPage.vue';
import ActionsPage from '@/views/ActionsPage.vue';
import CharitiesPage from '@/views/CharitiesPage.vue';
import CleanPage from '@/views/CleanPage.vue';
import NewCleanPage from '@/views/NewCleanPage.vue';
import Lottie from 'vue-lottie';
import MessagesPage from './views/MessagesPage.vue'
import GroupMessagePage from './views/GroupMessagePage.vue'
import AnalysisPage from './views/AnalysisPage.vue'
import axios from 'axios';
import store from './store'; 
import AdminPage from './views/AdminPage.vue'
import UsersPage from './views/UsersPage.vue'
import UserActivitiesPage from './views/UserActivitiesPage.vue'
import AddAdminPage from './views/AddAdminPage.vue'
import RecoverDonationPage from './views/RecoverDonationPage.vue'
import CheckCleanedPage from './views/CheckCleanedPage.vue'

const app = createApp(App);

app.component('lottie', Lottie);

app.config.globalProperties.$axios = axios;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/admin', component: AdminPage, meta: { requiresAuth: true, isAdmin: true } },
    { path: '/admin/users', component: UsersPage, meta: { requiresAuth: true, isAdmin: true } },
    { path: '/admin/addadmin', component: AddAdminPage, meta: { requiresAuth: true, isAdmin: true } },
    { path: '/admin/recoverdonation', component: RecoverDonationPage, meta: { requiresAuth: true, isAdmin: true } },
    { path: '/admin/useractivities/:id', component: UserActivitiesPage, meta: { requiresAuth: true, isAdmin: true } },
    { path: '/activities', component: ActivitiePage }, 
    { path: '/logout', component: LogoutPage }, 
    { path: '/settings', component: SettingsPage }, 
    { path: '/privacy', component: PrivacyPage }, 
    { path: '/activitiesdetails/:id', name: 'activitiesdetails', component: ActivitieDetailsPage, meta: { requiresAuth: true } },
    { path: '/help', component: HelpPage }, 
    { path: '/joined', component: JoinedActivitiePage, meta: { requiresAuth: true } }, 
    { path: '/liked', component: LikedActivitiePage, meta: { requiresAuth: true } }, 
    { path: '/newactivitie', component: NewActivitiePage, meta: { requiresAuth: true } },
    { path: '/cleandetails/:id', name: 'cleandetails', component: CleanDetailsPage, meta: { requiresAuth: true } },
    { path: '/profile', component: ProfilePage, meta: { requiresAuth: true } }, 
    { path: '/publish', component: PublishedPage, meta: { requiresAuth: true } }, 
    { path: '/update', component: UpdateActivitiePage, meta: { requiresAuth: true } }, 
    { path: '/about', component: AboutPage }, 
    { path: '/signin', component: SignInPage }, 
    { path: '/actions', component: ActionsPage }, 
    { path: '/apply', component: ApplyPage, meta: { requiresAuth: true } }, 
    { path: '/blind', component: BlindPage }, 
    { path: '/categories', component: CategoriesPage }, 
    { path: '/contact', component: ContactPage }, 
    { path: '/donationdetails/:id', name: 'donationdetails', component: DonationDetailsPage, meta: { requiresAuth: true } }, 
    { path: '/newdonation', component: NewDonationPage, meta: { requiresAuth: true } }, 
    { path: '/newclean', component: NewCleanPage, meta: { requiresAuth: true } },  
    { path: '/sos', component: SOSPage, meta: { requiresAuth: true } }, 
    { path: '/talk', component: TalkPage }, 
    { path: '/charities', component: CharitiesPage }, 
    { path: '/clean', component: CleanPage }, 
    { path: '/messages', component: MessagesPage }, 
    { path: '/groupmessage/:id', name: 'groupmessage', component: GroupMessagePage }, 
    { path: '/analysis', component: AnalysisPage }, 
    { path: '/admin/checkcleaned', name: 'checkcleaned', component: CheckCleanedPage, meta: { requiresAuth: true } }, 
  ],
})

router.beforeEach((to, from, next) => {
  const user = store.getters.getUser;
  
  if (to.meta.requiresAuth && !user) {
    next('/logout');
  } else {
    if (to.meta.isAdmin) {
      if (user && !user.admin) {
        next('/logout'); 
      } else {
        next(); 
      }
    } else {
      next();
    }
  }
});

app.use(store);
app.use(router);

const user = JSON.parse(localStorage.getItem('user'));
if (user) {
  store.commit('setUser', user);
}

app.mount('#app');
