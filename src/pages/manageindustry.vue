<template>
  <f7-view :routes="router">
    <f7-page>
      <f7-navbar :sliding="false">
        <f7-nav-left>
          <f7-link
            icon-ios="f7:menu"
            icon-aurora="f7:menu"
            icon-md="material:menu"
            panel-open="left"
          ></f7-link>
        </f7-nav-left>
        <f7-nav-title>Manage Industry</f7-nav-title>
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
              <f7-button popup-open=".industry-add-popup-push">Add Industry</f7-button>
            </f7-list-item-cell>
          </f7-list-item>
        </f7-list>
        <f7-list class="table-body">
          <ul>
            <f7-list-item v-for="item in industrylist" :key="item.id">
              <f7-list-item-cell class="item-title">{{item.name}}</f7-list-item-cell>
              <f7-list-item-cell>
                <f7-button @click="deleteIndustry(item)">Delete</f7-button>
              </f7-list-item-cell>
            </f7-list-item>
          </ul>
        </f7-list>
      </f7-list>
      <f7-popup class="industry-add-popup-push" push>
        <f7-page>
          <f7-block strong>
            <div>Add Industry</div>
          </f7-block>
          <f7-list no-hairlines-md>
            <f7-list-input
              outline
              label="Industry"
              floating-label
              type="text"
              name="Industry"
              placeholder="Industry"
              :value="name"
              @input="name = $event.target.value"
              required
              validate
              clear-button
            >
              <f7-icon f7="bag_badge_plus" size="36px" slot="media"></f7-icon>
            </f7-list-input>
            <div class="list">
              <ul>
                <li>
                  <f7-button @click="addIndustry">Create Industry</f7-button>
                  <f7-button class="link popup-close" @click="closePopUp()" href="#">Cancel</f7-button>
                </li>
              </ul>
            </div>
          </f7-list>
        </f7-page>
      </f7-popup>
    </f7-page>
  </f7-view>
</template>
<script>
import WelcomePage from "@/pages/login.vue";
export default {
  data() {
    return {
      router: [
        {
          path: "/",
          component: WelcomePage
        }
      ],
      name: "",
      industrylist: [],
      errors: [],
      token: sessionStorage.getItem("loginpage"),
      headers: ["Industry"]
    };
  },
  methods: {
    logout() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      app.dialog.confirm("Confirm Logout?", () => {
        app.dialog.alert("Successfully Logged Out!");
        sessionStorage.removeItem("loginpage");
        this.$router.push("/");
      });
    },
    async closePopUp() {
      this.industrylist = [];
      const res = await axios.get(
        "https://b2b2c.herokuapp.com/api/v1/industries"
      );
      this.industrylist = res.data.industries;
    },
    async addIndustry() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      if (this.name.length == 0) {
        app.dialog.alert("One of the required fields is empty", "Error");
      } else {
        await axios
          .post(`https://b2b2c.herokuapp.com/api/v1/industry/`, {
            name: this.name,
            token: this.token
          })
          .then(response => {
            app.dialog.alert("Successfully Created Industry", "Success!");
            app.popup.close();
            this.name = "";
          })
          .catch(e => {
            this.errors.push(e);
            this.name = "";
          });
        this.industrylist = [];
        const res = await axios.get(
          "https://b2b2c.herokuapp.com/api/v1/industries"
        );
        this.industrylist = res.data.industries;
      }
    },
    deleteIndustry(item) {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      app.dialog.confirm("Confirm Delete?", () => {
        axios
          .delete("https://b2b2c.herokuapp.com/api/v1/industry/" + item._id, {
            params: {
              token: this.token
            }
          })
          .then(response => {
            app.dialog.alert("Successfully Delete Industry!", async () => {
              const res = await axios.get(
                "https://b2b2c.herokuapp.com/api/v1/industries"
              );
              this.industrylist = res.data.industries;
            });
          });
      });
    }
  },
  async created() {
    const res = await axios.get(
      "https://b2b2c.herokuapp.com/api/v1/industries"
    );
    this.industrylist = res.data.industries;
  }
};
</script>