import { createRouter, createWebHistory } from 'vue-router';
import ActivitiePage from '../views/ActivitiePage.vue';
import LogoutPage from '../views/LogoutPage.vue';
import SettingsPage from '../views/SettingsPage.vue';
import PrivacyPage from '../views/PrivacyPage.vue';
import GonePage from '../views/GonePage.vue';
import ActivitieDetailsPage from '../views/ActivitieDetailsPage.vue'
import CleanDetailsPage from '../views/CleanDetailsPage.vue'
import HelpPage from '../views/HelpPage.vue'
import JoinedActivitiePage from '../views/JoinedActivitiePage.vue'
import LikedActivitiePage from '../views/LikedActivitiePage.vue'
import LikedCleanPage from '../views/LikedCleanPage.vue'
import LikedCharitiesPage from '../views/LikedCharitiesPage.vue'
import NewActivitiePage from '../views/NewActivitiePage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import ActivitiesPublishedPage from './views/ActivitiesPublishedPage.vue'
import CleanPublishedPage from './views/CleanPublishedPage.vue'
import CharitiesPublishedPage from './views/CharitiesPublishedPage.vue'
import UpdateActivitiePage from '../views/UpdateActivitiePage.vue'
import UpdateCleanPage from '../views/UpdateCleanPage.vue'
import UpdateCharitiePage from '../views/UpdateCharitiePage.vue'
import AboutPage from '../views/AboutPage.vue'
import SignInPage from '../views/SignInPage.vue'
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
import Vue3Lottie from 'vue3-lottie';
import MessagesPage from '@/views/MessagesPage.vue';
import GroupMessagePage from '@/views/GroupMessagePage.vue';
import BlockedPage from '@/views/BlockedPage.vue';
import AnalysisPage from '@/views/AnalysisPage.vue';
import AdminPage from '@/views/AdminPage.vue'
import UsersPage from '@/views/UsersPage.vue'
import UserActivitiesPage from '@/views/UserActivitiesPage.vue';
import AddAdminPage from '@/views/AddAdminPage.vue';
import RecoverDonationPage from '@/views/RecoverDonationPage.vue';
import CheckCleanedPage from '@/views/CheckCleanedPage.vue';

app.component('lottie', Vue3Lottie);

const routes = [
  { path: '/activities', component: ActivitiePage }, 
  { path: '/gone', component: GonePage, meta: { requiresAuth: true } }, 
  { path: '/logout', component: LogoutPage }, 
  { path: '/settings', component: SettingsPage }, 
  { path: '/privacy', component: PrivacyPage }, 
  { path: '/activitiesdetails/:id', name: 'activitiesdetails', component: ActivitieDetailsPage },
  { path: '/help', component: HelpPage }, 
  { path: '/joined', component: JoinedActivitiePage }, 
  { path: '/activitiesliked', component: LikedActivitiePage }, 
  { path: '/cleanliked', component: LikedCleanPage }, 
  { path: '/charitiesliked', component: LikedCharitiesPage }, 
  { path: '/newactivitie', component: NewActivitiePage }, 
  { path: '/profile', component: ProfilePage }, 
  { path: '/activitiespublished', component: ActivitiesPublishedPage, meta: { requiresAuth: true } }, 
  { path: '/cleanpublished', component: CleanPublishedPage, meta: { requiresAuth: true } }, 
  { path: '/charitiespublished', component: CharitiesPublishedPage, meta: { requiresAuth: true } }, 
  { path: '/updateactivitie/:id', name: 'updateactivitie', component: UpdateActivitiePage }, 
  { path: '/updateclean/:id', name: 'updateclean', component: UpdateCleanPage, meta: { requiresAuth: true } }, 
  { path: '/updatecharitie/:id', name: 'updatecharitie', component: UpdateCharitiePage, meta: { requiresAuth: true } }, 
  { path: '/about', component: AboutPage }, 
  { path: '/signin', component: SignInPage }, 
  { path: '/actions', component: ActionsPage }, 
  { path: '/apply', component: ApplyPage }, 
  { path: '/blind', component: BlindPage }, 
  { path: '/categories', component: CategoriesPage }, 
  { path: '/contact', component: ContactPage }, 
  { path: '/donationdetails/:id', name: 'donationdetails', component: DonationDetailsPage }, 
  { path: '/cleandetails/:id', name: 'cleandetails', component: CleanDetailsPage },
  { path: '/newdonation', component: NewDonationPage, meta: { requiresAuth: true }}, 
  { path: '/newclean', component: NewCleanPage }, 
  { path: '/sos', component: SOSPage }, 
  { path: '/blocked', component: BlockedPage, meta: { requiresAuth: true } }, 
  { path: '/talk', component: TalkPage }, 
  { path: '/charities', component: CharitiesPage }, 
  { path: '/clean', component: CleanPage }, 
  { path: '/messages', component: MessagesPage }, 
  { path: '/groupmessage/:id', name: 'groupmessage', component: GroupMessagePage }, 
  { path: '/analysis', component: AnalysisPage }, 
  { path: '/admin', component: AdminPage, meta: { requiresAuth: true, isAdmin: true } },
  { path: '/admin/users', component: UsersPage, meta: { requiresAuth: true, isAdmin: true } },
  { path: '/admin/addadmin', component: AddAdminPage, meta: { requiresAuth: true, isAdmin: true } },
  { path: '/admin/useractivities/:id', component: UserActivitiesPage, meta: { requiresAuth: true, isAdmin: true } },
  { path: '/admin/recoverdonation', component: RecoverDonationPage, meta: { requiresAuth: true, isAdmin: true } },
  { path: '/admin/checkcleaned', component: CheckCleanedPage, meta: { requiresAuth: true, isAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
