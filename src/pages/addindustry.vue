<template>
  <f7-page>
    <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>Add Industry</f7-nav-title>
      <f7-nav-right>
        <a href @click="logout" class="link">
          <span>Logout</span>
          <i class="icon material-icons md-only">last_page</i>
        </a>
      </f7-nav-right>
    </f7-navbar>
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
          </li>
        </ul>
      </div>
    </f7-list>
  </f7-page>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      token: sessionStorage.getItem("loginpage")
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
    async addIndustry() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      if (
        this.name.length == 0
      ) {
        app.dialog.alert("One of the required fields is empty", "Error");
      } else {
        try {
          const response = await axios.post(
            `https://b2b2c.herokuapp.com/api/v1/industry/`,
            {
              name: this.name,
              token: this.token
            }
          );
          console.log(response.data.status);
          if (response.data.status == "ok") {
            app.dialog.alert("Successfully Created Country", "Success!");
            router.navigate("/manageindustry/");
          }
          if (response.data.status == "error") {
            app.dialog.alert(response.data.message);
            this.name = "";
          }
        } catch (err) {
          console.error(err.message);
        }
      }
    }
  }
};
</script>