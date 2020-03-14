<template>
  <f7-page name="form">
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>View Pending Premium User</f7-nav-title>
      <f7-nav-right>
        <a href @click="logout" class="link">
          <span>Logout</span>
          <i class="icon material-icons md-only">last_page</i>
        </a>
      </f7-nav-right>
    </f7-navbar>
    <f7-searchbar
      search-container=".search-list"
      search-in=".item-title"
      :disable-button="!$theme.aurora"
    ></f7-searchbar>

    <f7-list class="searchbar-not-found">
      <f7-list-item title="Nothing found"></f7-list-item>
    </f7-list>
    <f7-list class="search-list searchbar-found">
      <f7-list class="table-header">
        <f7-list-item>
          <f7-list-item-cell v-for="(value, index) in headers" :key="index">{{ value }}</f7-list-item-cell>
        </f7-list-item>
      </f7-list>
      <f7-list class="table-body">
        <f7-list-item v-for="item in premiumUser" :key="item.id">
          <f7-list-item-cell class="item-title">{{item.email}}</f7-list-item-cell>
          <f7-list-item-cell class="item-title">{{item.name}}</f7-list-item-cell>
          <f7-list-item-cell class="item-title">{{item.phone}}</f7-list-item-cell>
          <f7-list-item-cell class="item-title">{{item.status}}</f7-list-item-cell>
          <f7-list-item-cell class="item-title">{{item.type}}</f7-list-item-cell>
          <f7-list-item-cell>
            <f7-button @click="approveUser(item)">Approve</f7-button>
            <f7-button @click="rejectUser(item)">Reject</f7-button>
          </f7-list-item-cell>
        </f7-list-item>
      </f7-list>
    </f7-list>
  </f7-page>
</template>
<script>
export default {
  data() {
    return {
      userlist: [],
      individualUser: [],
      errors: [],
      token: sessionStorage.getItem("loginpage"),
      headers: ["Email", "Name", "Phone", "Status", "Type", ""]
    };
  },
  methods: {
    logout() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      app.dialog.confirm("Confirm Logout?", function() {
        app.dialog.alert("Successfully Logged Out!");
        sessionStorage.removeItem("loginpage");
        router.navigate("/main/");
      });
    },
    approveUser(item) {
      this.individualUser = item;
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      app.dialog.confirm("Confirm Approve?", () => {
        axios
          .put(
            "https://b2b2c.herokuapp.com/api/v1/user/" +
              this.individualUser._id +
              "/approve",
            {
              token: this.token,
              approve: "yes"
            }
          )
          .then(response => {
            app.dialog.alert("Successfully Approved The User!", async () => {
              const res = await axios.get(
                "https://b2b2c.herokuapp.com/api/v1/users/search"
              );
              this.userlist = res.data.users;
            });
          });
      });
    },
    rejectUser(item) {
      this.individualUser = item;
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      app.dialog.confirm("Confirm Reject?", () => {
        axios
          .put(
            "https://b2b2c.herokuapp.com/api/v1/user/" +
              this.individualUser._id +
              "/approve",
            {
              token: this.token,
              approve: "no"
            }
          )
          .then(response => {
            app.dialog.alert("Successfully Rejected User!", async () => {
              const res = await axios.get(
                "https://b2b2c.herokuapp.com/api/v1/users/search"
              );
              this.userlist = res.data.users;
            });
          });
      });
    }
  },
  async mounted() {
    const res = await axios.get(
      "https://b2b2c.herokuapp.com/api/v1/users/search"
    );
    this.userlist = res.data.users;
  },
  computed: {
    premiumUser: function() {
      return this.userlist.filter(function(item) {
        return item.type == "basic" && item.status == "pending";
      });
    }
  }
};
</script>