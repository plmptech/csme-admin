<template>
  <f7-page name="form">
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>View User Enquiries</f7-nav-title>
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
        <f7-list-item v-for="item in enquirylist" :key="item.id">
          <f7-list-item-cell class="item-title">{{item.sellerEmail}}</f7-list-item-cell>
          <f7-list-item-cell class="item-title">{{item.listing}}</f7-list-item-cell>
          <f7-list-item-cell class="item-title">{{item.created}}</f7-list-item-cell>
          <f7-list-item-cell class="item-title">{{item.message}}</f7-list-item-cell>
          <f7-list-item-cell>
            <f7-button @click="markAsDone(item)">Done</f7-button>
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
      enquirylist: [],
      individualUser: [],
      errors: [],
      token: sessionStorage.getItem("loginpage"),
      headers: ["Seller Email", "Listing", "Time", "Message", ""]
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
    markAsDone(item) {
      this.individualUser = item;
      console.log(this.individualUser.status);
      console.log(this.individualUser.type);
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      app.dialog.confirm("Confirm Mark As Done?", () => {
        axios
          .put(
            "https://b2b2c.herokuapp.com/api/v1/enquiry/" +
              this.individualUser._id,
            {
              status: "done",
              token: this.token
            }
          )
          .then(response => {
            app.dialog.alert("Marked User As Done!");
          });
      });
    }
  },
  async mounted() {
    const res = await axios.get(
      `https://b2b2c.herokuapp.com/api/v1/enquiries/search?token=${this.token}&status=pending`
    );
    this.enquirylist = res.data.enquiries;
  }
};
</script>