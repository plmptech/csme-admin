<template>
  <f7-page>
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Manage Country</f7-nav-title>
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
          <f7-list-item-cell>
            <f7-button @click="addCountry()">Add Country</f7-button>
          </f7-list-item-cell>
        </f7-list-item>
      </f7-list>
      <f7-list class="table-body">
        <ul>
          <f7-list-item v-for="item in countrylist" :key="item.id">
            <f7-list-item-cell class="item-title">{{item.name}}</f7-list-item-cell>
            <f7-list-item-cell>
              <f7-button @click="deleteCountry(item)">Delete</f7-button>
            </f7-list-item-cell>
          </f7-list-item>
        </ul>
      </f7-list>
    </f7-list>
  </f7-page>
</template>
<script>
export default {
  data() {
    return {
      //infinite scroll
      //allowInfinite: true,
      //showPreloader: true,

      countrylist: [],
      errors: [],
      token: sessionStorage.getItem("loginpage"),
      headers: ["Country"]
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
    addCountry() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      router.navigate("/addcountry/");
    },
    deleteCountry(item) {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      app.dialog.confirm("Confirm Delete?", () => {
        axios
          .delete("https://b2b2c.herokuapp.com/api/v1/country/" + item._id, {
            params: {
              token: this.token
            }
          })
          .then(response => {
            app.dialog.alert("Successfully Delete Country!", async () => {
              const res = await axios.get(
                "https://b2b2c.herokuapp.com/api/v1/countries"
              );
              this.countrylist = res.data.countries;
            });
          });
      });
    }
  },
  async created() {
    const res = await axios.get("https://b2b2c.herokuapp.com/api/v1/countries");
    this.countrylist = res.data.countries;
  }
};
</script>