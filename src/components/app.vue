<template>
  <f7-app :params="f7params">
    <!-- Left panel with cover effect -->
    <!-- Left Panel -->
    <f7-panel left reveal>
      <f7-view id="left-panel-view">
        <f7-page>
          <f7-list>
            <f7-list-item id="header">User</f7-list-item>
            <f7-list-item link @click="addUser()" panel-close>Add User</f7-list-item>
            <f7-list-item link @click="manageUser()" panel-close>Manage User</f7-list-item>
            <f7-list-item link @click="pendingPremium()" panel-close>Pending Premium</f7-list-item>
            <f7-list-item id="header">Listing</f7-list-item>
            <f7-list-item link @click="manageListing()" panel-close>Manage Listing</f7-list-item>
            <f7-list-item id="header">Enquiry</f7-list-item>
            <f7-list-item link @click="userEnquiry()" panel-close>User Enquiry</f7-list-item>
            <f7-list-item link @click="enquirySetting()" panel-close>Enquiry Setting</f7-list-item>
            <f7-list-item id="header">Country</f7-list-item>
            <f7-list-item link @click="manageCountry()" panel-close>Manage Country</f7-list-item>
            <f7-list-item id="header">Industry</f7-list-item>
            <f7-list-item link @click="manageIndustry()" panel-close>Manage Industry</f7-list-item>>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-panel>
  
    <f7-view main class="safe-areas">
      <keep-alive>
        <router-view />
      </keep-alive>
    </f7-view>
    <!-- Your main view, should have "view-main" class -->
  </f7-app>
</template>
<script>
import axios from "axios";
window.axios = axios;
import babelPolyfill from "babel-polyfill";

export default {
  data() {
    return {
      // app params
      f7params: {
        name: "csme",
        theme: 'auto',
        // specify routes for app
      }
    }
  },
  methods: {
    addUser() {
      this.$f7ready($f7 => {
        this.$router.push('adduser')
        //$f7.views.main.router.navigate("/adduser/");
      });
    },
    manageUser() {
      this.$f7ready($f7 => {
        this.$router.push('manageuser')
        //$f7.views.main.router.navigate("/manageuser/");
      });
    },
    manageListing() {
      this.$f7ready($f7 => {
        this.$router.push('managelisting')
        //$f7.views.main.router.navigate("/managelisting/");
      });
    },
    pendingPremium() {
      this.$f7ready($f7 => {
        this.$router.push('pendingpremium')
        //$f7.views.main.router.navigate("/pendingpremium/");
      });
    },
    userEnquiry() {
      this.$f7ready($f7 => {
        this.$router.push('userenquiry')
        //$f7.views.main.router.navigate("/userenquiry/");
      });
    },
    enquirySetting() {
      this.$f7ready($f7 => {
        this.$router.push('enquirysetting')
        //$f7.views.main.router.navigate("/enquirysetting/");
      });
    },
    manageCountry() {
      this.$f7ready($f7 => {
        this.$router.push('managecountry')
        //$f7.views.main.router.navigate("/managecountry/");
      });
    },
    manageIndustry() {
      this.$f7ready($f7 => {
        this.$router.push('manageindustry')
        //$f7.views.main.router.navigate("/manageindustry/");
      });
    }
  },
  mounted(){
    this.$f7ready(($f7) =>{
    });
  }
};
</script>
<style>
#header {
  font-size: 18px;
  font-weight: 600;
  text-align: justify;
}
</style>