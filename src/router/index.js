import { createRouter, createWebHistory } from 'vue-router';
import ActivitiePage from '../views/ActivitiePage.vue';
import LogoutPage from '../views/LogoutPage.vue';
import SettingsPage from '../views/SettingsPage.vue';
import NewsPage from '../views/NewsPage.vue';
import PrivacyPage from '../views/PrivacyPage.vue';
import ActivitieDetailsPage from '../views/ActivitieDetailsPage.vue'
import CleanDetailsPage from '../views/CleanDetailsPage.vue'
import HelpPage from '../views/HelpPage.vue'
import JoinedActivitiePage from '../views/JoinedActivitiePage.vue'
import LikedActivitiePage from '../views/LikedActivitiePage.vue'
import NewActivitiePage from '../views/NewActivitiePage.vue'
import NewsDetailsPage from '../views/NewsDetailsPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import PublishedPage from '../views/PublishedPage.vue'
import UpdateActivitiePage from '../views/UpdateActivitiePage.vue'
import AboutPage from '../views/AboutPage.vue'
import SignInPage from '../views/SignInPage.vue'
import ApplyPage from '@/views/ApplyPage.vue';
import BlindPage from '@/views/BlindPage.vue';
import CategoriesPage from '@/views/CategoriesPage.vue';
import ContactPage from '@/views/ContactPage.vue';
import DonationDetailsPage from '@/views/DonationDetailsPage.vue';
import NewDonationPage from '@/views/NewDonationPage.vue';
import NewNewsPage from '@/views/NewNewsPage.vue';
import NewsLikedPage from '@/views/NewsLikedPage.vue';
import NewsPublishedPage from '@/views/NewsPublishedPage.vue';
import SOSPage from '@/views/SOSPage.vue';
import TalkPage from '@/views/TalkPage.vue';
import UpdateNewsPage from '@/views/UpdateNewsPage.vue';
import ActionsPage from '@/views/ActionsPage.vue';
import DonatePage from '@/views/DonatePage.vue';
import CleanPage from '@/views/CleanPage.vue';
import NewCleanPage from '@/views/NewCleanPage.vue';
import Lottie from 'vue-lottie';
import MessagesPage from '@/views/MessagesPage.vue';
import GroupMessagePage from '@/views/GroupMessagePage.vue';
import AnalysisPage from '@/views/AnalysisPage.vue';

app.component('lottie', Lottie);

const routes = [
  { path: '/activities', component: ActivitiePage }, 
  { path: '/logout', component: LogoutPage }, 
  { path: '/settings', component: SettingsPage }, 
  { path: '/news', component: NewsPage }, 
  { path: '/privacy', component: PrivacyPage }, 
  { path: '/activitiesdetails/:id', name: 'activitiesdetails', component: ActivitieDetailsPage },
  { path: '/help', component: HelpPage }, 
  { path: '/joined', component: JoinedActivitiePage }, 
  { path: '/liked', component: LikedActivitiePage }, 
  { path: '/newactivitie', component: NewActivitiePage }, 
  { path: '/newsdetails/:id', name: 'newsdetails', component: NewsDetailsPage }, 
  { path: '/profile', component: ProfilePage }, 
  { path: '/publish', component: PublishedPage }, 
  { path: '/update', component: UpdateActivitiePage }, 
  { path: '/about', component: AboutPage }, 
  { path: '/signin', component: SignInPage }, 
  { path: '/actions', component: ActionsPage }, 
  { path: '/apply', component: ApplyPage }, 
  { path: '/blind', component: BlindPage }, 
  { path: '/categories', component: CategoriesPage }, 
  { path: '/contact', component: ContactPage }, 
  { path: '/donationdetails/:id', name: 'donationdetails', component: DonationDetailsPage }, 
  { path: '/cleandetails/:id', name: 'cleandetails', component: CleanDetailsPage },
  { path: '/newdonation', component: NewDonationPage }, 
  { path: '/newnews', component: NewNewsPage }, 
  { path: '/newclean', component: NewCleanPage }, 
  { path: '/newsliked', component: NewsLikedPage }, 
  { path: '/newspublished', component: NewsPublishedPage }, 
  { path: '/sos', component: SOSPage }, 
  { path: '/talk', component: TalkPage }, 
  { path: '/updatenews', component: UpdateNewsPage }, 
  { path: '/donate', component: DonatePage }, 
  { path: '/clean', component: CleanPage }, 
  { path: '/messages', component: MessagesPage }, 
  { path: '/groupmessage/:id', name: 'groupmessage', component: GroupMessagePage }, 
  { path: '/analysis', component: AnalysisPage }, 
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
