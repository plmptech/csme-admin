
//import HomePage from '../pages/home.vue';
import LoginPage from '../pages/login.vue';
import AddUserPage from '../pages/adduser.vue';
import ManageUserPage from '../pages/manageuser.vue';
import ViewPremiumPending from '../pages/pendingpremium.vue';
import ManageListing from '../pages/managelisting.vue';
import UserEnquiry from '../pages/userenquiry.vue';
import EnquirySetting from '../pages/enquirysetting.vue';
import ManageCountry from '../pages/managecountry.vue';
import ManageIndustry from '../pages/manageindustry.vue';
import AddCountry from '../pages/addcountry.vue';
import AddIndustry from '../pages/addindustry.vue';
import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    name: 'main',
    path: '/main',
    pushState: true,
    component: LoginPage,
  },
  {
    name: 'adduser',
    path: '/adduser',
    pushState: true,
    component: AddUserPage,
  },
  {
    name: 'manageuser',
    path: '/manageuser',
    pushState: true,
    component: ManageUserPage,
  },
  {
    name: 'pendingpremium',
    path: '/pendingpremium',
    pushState: true,
    component: ViewPremiumPending,
  },
  {
    name: 'managelisting',
    path: '/managelisting',
    pushState: true,
    component: ManageListing,
  },
  {
    name: 'userenquiry',
    path: '/userenquiry',
    pushState: true,
    component: UserEnquiry,
  },
  {
    name: 'enquirysetting',
    path: '/enquirysetting',
    pushState: true,
    component: EnquirySetting,
  },
  {
    name: 'managecountry',
    path: '/managecountry',
    pushState: true,
    component: ManageCountry,
  },
  {
    name: 'manageindustry',
    path: '/manageindustry',
    pushState: true,
    component: ManageIndustry,
  },
  {
    name: 'addcountry',
    path: '/addcountry',
    pushState: true,
    component: AddCountry,
  },
  {
    name: 'addindustry',
    path: '/addindustry',
    pushState: true,
    component: AddIndustry,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
