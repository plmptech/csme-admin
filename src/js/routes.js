
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
    path: '/main/',
    component: LoginPage,
  },
  {
    path: '/adduser/',
    component: AddUserPage,
  },
  {
    path: '/manageuser/',
    component: ManageUserPage,
  },
  {
    path: '/pendingpremium/',
    component: ViewPremiumPending,
  },
  {
    path: '/managelisting/',
    component: ManageListing,
  },
  {
    path: '/userenquiry/',
    component: UserEnquiry,
  },
  {
    path: '/enquirysetting/',
    component: EnquirySetting,
  },
  {
    path: '/managecountry/',
    component: ManageCountry,
  },
  {
    path: '/manageindustry/',
    component: ManageIndustry,
  },
  {
    path: '/addcountry/',
    component: AddCountry,
  },
  {
    path: '/addindustry/',
    component: AddIndustry,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
